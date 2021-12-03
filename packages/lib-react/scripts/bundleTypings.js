/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const dts = require('dts-bundle')

dts.bundle({
	name: '@graspologic/react',
	out: 'bundle.d.ts',
	main: 'lib/index.d.ts',
})
