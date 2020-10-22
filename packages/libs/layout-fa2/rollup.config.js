/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import path from 'path'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import sucrase from '@rollup/plugin-sucrase'
import { terser } from 'rollup-plugin-terser'

const rollupConfig = [createConfig(true), createConfig(false)]
export default rollupConfig

function createConfig(minified) {
	return {
		input: path.join(__dirname, 'src/worker.ts'),
		output: {
			file:
				path.join(__dirname, 'dist/fa2_worker') +
				(minified ? '.min.js' : '.js'),
			format: 'iife',
		},
		plugins: [
			sucrase({ transforms: ['typescript'] }),
			replace({
				values: { 'process.env.NODE_ENV': JSON.stringify('production') },
				delimiters: ['', ''],
			}),
			resolve({
				rootDir: path.join(process.cwd(), '../../..'),
				extensions: ['.js', '.ts'],
			}),
			commonjs({ extensions: ['.js', '.ts'], include: [/core-js/] }),
			minified ? terser() : undefined,
		].filter(t => !!t),
	}
}
