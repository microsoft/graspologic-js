/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable @typescript-eslint/no-var-requires */
import { storiesOf } from '@storybook/react'
import * as React from 'react'
const ReactMarkdown = require('react-markdown')
const readmeText = require('../../../../README.md').default
const lerna = require('../../../../lerna.json')
const pkg = require('../../../../package.json')

storiesOf('About Library', module).add('about', () => (
	<div style={{ padding: 20 }}>
		<h1>
			{pkg.name} - {lerna.version}
		</h1>
		<h2>{pkg.description}</h2>
		<h3>{pkg.repository}</h3>

		<div style={{ border: '1px solid grey', padding: 20 }}>
			<ReactMarkdown source={readmeText} />
		</div>
	</div>
))
