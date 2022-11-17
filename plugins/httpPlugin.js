const { default: axios } = require('axios');

module.exports = {
	name: 'http-url',
	setup(build) {
		// onStart onResolve onLoad onEnd
		build.onResolve({ filter: /^https?:\/\// }, args => {
			return {
				path: args.path,
				namespace: 'http-url' // 疑问：可以写成除 file / http-url 外的其他字段吗？？
			}
		})

		// 注意：此时是在解析阶段做的路径拼接。若是多个路径，则需要在加载前，通过解析将路径组装
		build.onResolve({ filter: /.*/, namespace: 'http-url' }, args => {
			return {
				namespace: 'http-url',
				path: new URL(args.path, args.importer).toString()
			}
		})

		build.onLoad({ filter: /.*/, namespace: 'http-url' }, async args => {
			const { data } = await axios(args.path)
			// console.log('data', data)
			return {
				contents: data
			}
		})
	}
}