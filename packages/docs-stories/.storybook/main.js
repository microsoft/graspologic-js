module.exports = {
	stories: ['../src/**/*.stories.@(mdx|js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-essentials',
		//'@storybook/addon-a11y',
	],
	webpackFinal: async (config, { configType }) => {
		config.module.rules.push({
			test: /\.glsl/,
			use: ['webpack-glsl-loader'],
		})
		return config
	},
}
