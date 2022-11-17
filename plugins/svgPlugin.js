const fs = require('fs');
const path = require('path');
const { optimize } = require('svgo');

module.exports = (options = {
	isCustomEle: false,
	namespace: 'icon',
	isMinify: false,
	minifyOpt: {},
}) => ({
	name: 'svg',
	setup(build) {
		const {
			isCustomEle,
			namespace,
			isMinify,
			minifyOpt
		} = options
		const loader = isCustomEle ? 'js' : 'text'

		build.onLoad({ filter: /\.svg$/ }, async args => {
			// 
			const fileName = path.basename(args.path, '.svg')
			let contents = await fs.promises.readFile(args.path, 'utf-8')

			if(isMinify) {
				contents = optimize(contents, {
					path: args.path,
					...minifyOpt
				}).data
			}

			if(isCustomEle) {
				contents = `
					class SvgIcon extends HTMLElement {
						connectedCallback() {
							this.innerHTML = \`${contents}\`;
						}
					}
					window.customElements.define('${namespace ? `${namespace}-` : ''}${fileName}', SvgIcon);
					export default SvgIcon;
				`
			}
			return {
				contents,
				loader
			}
		})
	}
})