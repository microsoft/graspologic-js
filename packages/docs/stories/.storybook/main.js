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
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-a11y',
		'@storybook/addon-knobs',
	],
}
