import { build, buildSync, serve } from 'esbuild'
import { resolve } from 'node:path'

import StartEndPlugin from '../plugins/start-end-plugin'

/* 
	常用配置：
		absWorkingDir: 指定当前项目根目录
		entryPoints  : 入口文件列表
		outdir			 : 打包产物的目录
		bundle			 : 是否需要打包（常用: true）
		format			 : 打包后的模块类型（iife / cjs / esm）
		minify			 : 是否进行代码压缩
		sourcemap		 : 是否生成 SourceMap 文件
		external		 : 指定排除打包的依赖列表
		loader			 : 不同文件类型，调用不同 loader 进行加载
									内置 loader:(base64、binary、css、dataurl、file、js(x)、ts(x)、text、json)
		plugins			 : 插件

		define			 : 提供常量替换全局标识符
		splitting		 : 是否开启自动拆包（esm）
		metafile		 : 是否生成打包的元信息文件
		watch				 : 是否开启 watch 模式，在 watch 模式下代码变动则会触发重新打包
		write				 : 是否将产物写入磁盘
*/

async function runBuild() {
  const result = await build({
    absWorkingDir: resolve(process.cwd(), 'src'),
    entryPoints: ['./index.js'],
    outdir: resolve(process.cwd(), 'dist'),
    bundle: true,
    format: 'esm',
    external: [],
    splitting: true,
    sourcemap: false,
    metafile: true,
    minify: false,
    watch: false,
    write: true,
    loader: {
      '.js': 'jsx',
    },
    plugins: [StartEndPlugin],
  })

  // console.log('buildResult:::', result)
}
runBuild()
