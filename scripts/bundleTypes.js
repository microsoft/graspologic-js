/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const { join } = require('path')
const dts = require('dts-bundle')
const pkg = require(join(process.cwd(), './package.json'))

dts.bundle({
	name: pkg.name,
	out: 'bundle.d.ts',
	main: 'dist/types/index.d.ts',
})
