import { get } from 'node:https'

const httpImportPlugin = {
  name: 'esbuild::https',
  setup(build) {
    // 1：拦截 CDN 请求
    build.onResolve({ filter: /^https:\/\// }, (args) => {
      return {
        path: args.path,
        namespace: 'https-url',
      }
    })

    // 3：再次解析间接路径
    build.onResolve({ filter: /.*/, namespace: 'https-url' }, (args) => {
      // console.log('------->', args)
      return {
        path: new URL(args.path, args.importer).toString(),
        namespace: 'https-url',
      }
    })

    // 2：在加载时，通过 fetch 请求加载 CDN 资源
    build.onLoad({ filter: /.*/, namespace: 'https-url' }, async (args) => {
      const contents = await new Promise((resolve, reject) => {
        function fetch(url) {
          const req = get(url, (res) => {
            if ([302, 301].includes(res.statusCode)) {
              // 重定向
              fetch(new URL(res.headers.location, url).toString())

              req.abort()
            } else if (res.statusCode === 200) {
              let chunks = []
              res.on('data', (chunk) => chunks.push(chunk))
              res.on('end', () => resolve(Buffer.concat(chunks)))
            } else {
              reject(new Error(`GET ${url} failed: status ${res.statusCode}`))
            }
          }).on('error', (err) => {
            console.error(err)
          })
        }

        fetch(args.path)
      })

      return { contents }
    })
  },
}

export default httpImportPlugin
