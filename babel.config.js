module.exports = {
	presets: [
		[require('@babel/preset-env'), { targets: { node: 'current' } }],
		require('@babel/preset-typescript'),
		require('@babel/preset-react'),
	],
}
