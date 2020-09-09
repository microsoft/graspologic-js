/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import path from 'path'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
// import { terser } from 'rollup-plugin-terser'

const rollupConfig = [
	{
		input: path.join(__dirname, 'dist/esm/worker.js'),
		output: {
			file: path.join(__dirname, 'dist/fa2_worker.js'),
			format: 'iife',
		},
		plugins: [
			replace({
				values: { 'process.env.NODE_ENV': JSON.stringify('production') },
				delimiters: ['', ''],
			}),
			resolve({
				rootDir: path.join(process.cwd(), '../../..'),
			}),
			commonjs(),
			//			terser(),
		],
	},
]
export default rollupConfig
