/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const fs = require('fs/promises')
const path = require('path')

const DTS_CONTENT = `
	declare const _default: string;
	export default _default;
`
function createOutputFolders() {
	return Promise.all([
		fs.mkdir('dist/cjs/easings', { recursive: true }),
		fs.mkdir('dist/cjs/shaders', { recursive: true }),
		fs.mkdir('dist/cjs/tween', { recursive: true }),
		fs.mkdir('dist/esm/easings', { recursive: true }),
		fs.mkdir('dist/esm/shaders', { recursive: true }),
		fs.mkdir('dist/esm/tween', { recursive: true }),
	])
}

function cjsify(content) {
	return `module.exports = \`${content}\``
}

function esmify(content) {
	return `export default \`${content}\``
}

async function processGlslFiles(src, cjsDest, esmDest) {
	const files = await fs.readdir(src)

	return Promise.all(
		files.map(async file => {
			const fullSrcPath = path.join(src, file)
			const content = await fs.readFile(fullSrcPath, { encoding: 'utf-8' })

			const fullCjsDestPath = path.join(cjsDest, file + '.js')
			const writeCjsPromise = fs.writeFile(fullCjsDestPath, cjsify(content), {
				encoding: 'utf-8',
			})

			const fullEsmDestPath = path.join(esmDest, file + '.js')
			const fullEsmDtsPath = path.join(esmDest, file + '.d.ts')
			const writeEsmPromise = fs.writeFile(fullEsmDestPath, esmify(content), {
				encoding: 'utf-8',
			})
			const writeEsmDtsPromise = fs.writeFile(fullEsmDtsPath, DTS_CONTENT)
			return Promise.all([writeCjsPromise, writeEsmPromise, writeEsmDtsPromise])
		}),
	)
}

async function execute() {
	await createOutputFolders()
	await Promise.all([
		processGlslFiles('src/easings', 'dist/cjs/easings', 'dist/esm/easings'),
		processGlslFiles('src/shaders', 'dist/cjs/shaders', 'dist/esm/shaders'),
		processGlslFiles('src/tween', 'dist/cjs/tween', 'dist/esm/tween'),
	])
}

execute()
