/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const { watch } = require('chokidar')
const { srcGlobPattern, build, buildAll } = require('./process_files')

async function start() {
	await buildAll(false)

	watch(srcGlobPattern).on('change', path => {
		build(path, true)
	})
}

start()
