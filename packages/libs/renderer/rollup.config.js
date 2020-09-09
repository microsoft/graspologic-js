/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as fs from 'fs'
import cjsResolve from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import glob from 'glob'
import webWorkerLoader from 'rollup-plugin-web-worker-loader'
import pkg from './package.json'

const SHADER_DIR = 'src/renderables/shaders'
const GLSL_FILES = glob.sync(`${SHADER_DIR}/**/*.glsl`)

const STRINGIFY_MATCHER = /\.(glsl|d\.ts|base64)$/

function copyFile(file, target) {
	return new Promise((resolve, reject) => {
		fs.createReadStream(file)
			.pipe(fs.createWriteStream(target))
			.on('end', () => resolve())
			.on('error', err => reject(err))
	})
}

function copyToOutputDirectory(fileOrFile) {
	const files = Array.isArray(fileOrFile) ? fileOrFile : [fileOrFile]
	Promise.all(
		files.map(file =>
			Promise.all([
				copyFile(file, file.replace('src/', 'lib/')),
				copyFile(file, file.replace('src/', 'dist/esm/')),
				copyFile(file, file.replace('src/', 'dist/cjs/')),
			]),
		),
	)
}

copyToOutputDirectory(GLSL_FILES)

// https://github.com/rollup/rollup/blob/3ad2246585f7ed9cf33b313a54597de4e3785965/docs/01-command-line-reference.md#-w--watch
if (process.env.ROLLUP_WATCH) {
	fs.watch(
		SHADER_DIR,
		{
			recursive: true,
		},
		(evt, file) => {
			copyToOutputDirectory(`${SHADER_DIR}/${file}`)
		},
	)
}

const rollupConfig = [
	{
		input: 'dist/esm/index.js',
		external: [
			// Externalize Libraries - the rollup process is really to roll up _this_ library with its WebGL shader code
			'luma.gl',
			'@luma.gl/constants',
			'@luma.gl/core',
			'@luma.gl/webgl',
			'math.gl',
			'rxjs',
			'mjolnir.js',
			'@graspologic/graph',
			'@graspologic/memstore',
			'@graspologic/primitivestore',
		],
		plugins: [
			replace({
				values: { 'process.env.NODE_ENV': JSON.stringify('production') },
				delimiters: ['', ''],
			}),
			nodeResolve(),
			cjsResolve(),
			{
				transform(code, id) {
					if (STRINGIFY_MATCHER.test(id)) {
						return {
							code: `export default ${JSON.stringify(code)};`,
							map: { mappings: '' },
						}
					}
				},
			},
			webWorkerLoader(),
		],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' },
		],
	},
]
export default rollupConfig
