/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
module.exports = {
	presets: [
		['@babel/preset-react', { runtime: 'automatic' }],
		[
			'@babel/preset-env',
			{
				targets: {
					esmodules: true,
				},
			},
		],
		['@babel/preset-typescript', {}],
	],
}
