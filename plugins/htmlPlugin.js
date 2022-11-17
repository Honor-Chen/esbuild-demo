import { writeFile } from 'node:fs/promises'
import { join, parse } from 'node:path'

const htmlPlugin = {
  name: 'esbuild:html',
  setup(build) {
    build.onEnd(async (buildResult) => {
      if (buildResult.errors.length) return

      // 1：拿到 metafile 对象中所有的 .js / .css 产物路径

      // 2：拼接 HTML 内容

      // 3：写入磁盘

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
