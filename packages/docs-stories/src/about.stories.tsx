/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable @typescript-eslint/no-var-requires, import/no-anonymous-default-export */
import * as React from 'react'

const ReactMarkdown = require('react-markdown')
const readmeText = require('../../../README.md').default
const pkg = require('../../../package.json')

function About() {
	return (
		<div style={{ padding: 20 }}>
			<h1>{pkg.name}</h1>
			<h2>{pkg.description}</h2>
			<h3>{pkg.repository}</h3>

			<div style={{ border: '1px solid grey', padding: 20 }}>
				<ReactMarkdown source={readmeText} />
			</div>
		</div>
	)
}

export default {
	title: 'About Graspologic.js',
	component: About,
}

export const Main = () => <About />
