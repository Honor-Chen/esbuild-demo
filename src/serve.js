import { serve } from 'esbuild'
import { resolve } from 'node:path'

/* 
	为 esbuild 构建出的所有内容提供服务
*/
async function runServeAll() {
  const app = await serve(
    {
      port: 8001,
      servedir: 'dist', // 开发服务器所指向的静态资源目录
    },
    {
      entryPoints: [resolve(process.cwd(), 'example/main.ts')],
      outdir: 'dist', // 打包产物目录
      bundle: true,
    }
  )
  const { host, port } = app
  //   app.stop(); // 是否停止静态服务
}
// runServeAll()

/* 
	仅为 esbuild 生成的文件提供服务
*/
async function runServeOnly() {
  const app = await serve(
    {
      port: 8001,
    },
    {
      entryPoints: [resolve(process.cwd(), 'example/main.ts'), resolve(process.cwd(), 'example/mulEntry.ts')],
      // outfile: '',
      // outfile: 'dist/main.js', // 仅仅只会生成 main.js 文件。通过访问 localhost:8001 也只能看见生成的 main.js 文件。
      bundle: true,
    }
  )
  const { host, port } = app
  //   app.stop(); // 是否停止静态服务
}
runServeOnly()
