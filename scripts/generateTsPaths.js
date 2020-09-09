/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const { readFileSync, writeFileSync } = require('fs')
const { join } = require('path')
const commentJson = require('comment-json')
const glob = require('glob')

function readJSON(path) {
	return commentJson.parse(readFileSync(path).toString())
}

const PACKAGE_PATH = join(__dirname, '../package.json')
const TSCONFIG_PATH = join(__dirname, '../tsconfig.json')
const packageJSON = readJSON(PACKAGE_PATH)
const tsconfigJSON = readJSON(TSCONFIG_PATH)

async function run() {
	const packages = packageJSON.workspaces.packages
	return Promise.all(
		packages.map(packageGlob => {
			return new Promise((resolve, reject) => {
				glob(packageGlob, (err, files) => {
					if (err) {
						reject(err)
					} else {
						const paths = tsconfigJSON.compilerOptions.paths || {}
						files.forEach(file => {
							const pkgName = readJSON(
								join(__dirname, `../${file}/package.json`),
							).name
							paths[`${pkgName}`] = [`${file}/lib`]
							paths[`${pkgName}/*`] = [`${file}/lib/*`]
						})
						tsconfigJSON.compilerOptions.baseUrl = '.'
						tsconfigJSON.compilerOptions.paths = paths
						resolve()
					}
				})
			})
		}),
	)
}

run().then(() => {
	writeFileSync(TSCONFIG_PATH, commentJson.stringify(tsconfigJSON, null, '\t'))
})
