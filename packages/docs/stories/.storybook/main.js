const path = require('path')

module.exports = {
	babel: () => ({
		presets: [
			[
				'@babel/preset-env',
				{
					targets: 'last 2 Chrome versions',
				},
			],
		],
	}),
	stories: [path.join(__dirname, '../src/**/*.stories.@(mdx|js|jsx|ts|tsx)')],
	addons: [
		'@storybook/addon-essentials',
		//'@storybook/addon-a11y',
	],
}
