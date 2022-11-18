import { writeFile } from 'node:fs/promises'
import { join, basename } from 'node:path'

const htmlPlugin = {
  name: 'esbuild:html',
  setup(build) {
    build.onEnd(async (buildResult) => {
      if (buildResult.errors.length) return

      // 1：拿到 metafile 对象中所有的 .js / .css 产物路径
      const { metafile } = buildResult

      const scripts = []
      const links = []
      if (metafile) {
        const { outputs } = metafile
        const assets = Reflect.ownKeys(outputs)

        assets.forEach((asset) => {
          const _asset = `./${basename(asset)}`
          if (asset.endsWith('.js')) {
            scripts.push(createScript(_asset))
          } else if (asset.endsWith('.css')) {
            links.push(createLink(_asset))
          }
        })
      }

      // 2：拼接 HTML 内容
      const htmlContent = generateHTML(scripts, links)

      // 3：写入磁盘
      const htmlPath = join(process.cwd(), 'dist/newIndex.html')
      await writeFile(htmlPath, htmlContent)

      console.log('onEnd finished....')
    })
  },
}

export default htmlPlugin

function createScript(src) {
  return `<script src="${src}"></script>`
}

function createLink(src) {
  return `<link rel="stylesheet" href="${src}"></link>`
}

function generateHTML(scripts, links) {
  return `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>html-plugin 插件</title>
			${links.join('\n')}
		</head>
		<body>
			<div id="root"></div>
			${scripts.join('\n')}
		</body>
		</html>
	`
}
