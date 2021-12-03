/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const path = require('path')
const { promisify } = require('util')
const fs = require('fs-extra')
const g = require('glob')

const SRC_DIR = path.resolve(path.join(__dirname, '../src'))
const srcGlobPattern = `${SRC_DIR}/**/*.glsl`

const glob = promisify(g)

const DTS_CONTENT = `
	declare const _default: string;
	export default _default;
`

function cjsify(content) {
	return `module.exports = \`${content}\``
}

function esmify(content) {
	return `export default \`${content}\``
}

function emit(filename, content, silent = false) {
	if (!silent) {
		console.log(`emit ${filename}`)
	}
	return fs.writeFile(filename, content, { encoding: 'utf-8' })
}

async function processGlslFile(srcGlsl, silent = false) {
	const srcRelativeFile = path.relative(SRC_DIR, srcGlsl)
	const subDirectory = path.dirname(srcRelativeFile)
	const cjsDir = `dist/cjs/${subDirectory}`
	const esmDir = `dist/esm/${subDirectory}`

	await Promise.all([
		fs.mkdir(cjsDir, { recursive: true }),
		fs.mkdir(esmDir, { recursive: true }),
	])

	const file = path.basename(srcGlsl)
	const content = await fs.readFile(srcGlsl, { encoding: 'utf-8' })

	const fullCjsDestPath = path.join(cjsDir, `${file}.js`)
	const writeCjsPromise = emit(fullCjsDestPath, cjsify(content), silent)

	const fullEsmDestPath = path.join(esmDir, `${file}.js`)
	const fullEsmDtsPath = path.join(esmDir, `${file}.d.ts`)
	const writeEsmPromise = emit(fullEsmDestPath, esmify(content), silent)
	const writeEsmDtsPromise = emit(fullEsmDtsPath, DTS_CONTENT, silent)
	return Promise.all([writeCjsPromise, writeEsmPromise, writeEsmDtsPromise])
}

async function findGlslFiles() {
	return glob(srcGlobPattern)
}

module.exports = {
	srcGlobPattern,
	async buildAll(silent = false) {
		const files = await findGlslFiles()
		await Promise.all(files.map(f => processGlslFile(f, silent)))
	},
	async build(glslFile, silent = false) {
		return processGlslFile(glslFile, silent)
	},
}
