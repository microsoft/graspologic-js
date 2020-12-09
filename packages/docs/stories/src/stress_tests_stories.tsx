/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { number } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { StressTestVertices2D } from './components/StressTestVertices2D'
import { StressTestVertices3D } from './components/StressTestVertices3D'
import { componentColorToBGRA } from '@graspologic/graph'

const COL_RANGE = { range: true, min: 0.0, max: 1.0, step: 0.01 }

storiesOf('Stress Tests', module)
	.add('2D view with dynamic vertex count', () => <StressTestVertices2D />)
	.add('3D view with dynamic vertex count', () => <StressTestVertices3D />)
	.add('2D view with colorizer', () => {
		const r = number('R', 1, COL_RANGE)
		const g = number('G', 0, COL_RANGE)
		const b = number('B', 0, COL_RANGE)
		const a = number('A', 1, COL_RANGE)
		const color = componentColorToBGRA([r, g, b, a])
		return <StressTestVertices2D colorizer={() => color} />
	})
