/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable @typescript-eslint/no-var-requires, import/no-anonymous-default-export */
import React, { FC } from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

const ReactMarkdown = require('react-markdown').default
const readmeText = require('../../../README.md').default
const pkg = require('../../../package.json')

const About: FC = function About() {
	return (
		<div style={{ padding: 20 }}>
			<h1>{pkg.name}</h1>
			<h2>{pkg.description}</h2>
			<h3>{pkg.repository}</h3>

			<div style={{ border: '1px solid grey', padding: 20 }}>
				<ReactMarkdown>{readmeText}</ReactMarkdown>
			</div>
		</div>
	)
}

export default {
	title: 'About Graspologic.js',
	component: About,
} as ComponentMeta<typeof About>

export const Main: ComponentStory<typeof About> = () => <About />
