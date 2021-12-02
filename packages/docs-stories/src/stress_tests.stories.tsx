/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { componentColorToBGRA } from '@graspologic/renderer'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { StressTestVertices2D } from './components/StressTestVertices2D'
import { StressTestVertices3D } from './components/StressTestVertices3D'

export default {
	title: 'Stress Tests',
} as ComponentMeta<null>

export const StressTest2D: ComponentStory<null> = () => <StressTestVertices2D />
StressTest2D.storyName = 'Stress Test 2D'

export const StressTest3D: ComponentStory<null> = () => <StressTestVertices3D />
StressTest3D.storyName = 'Stress Test 3D'

export const StressTest2DWithColorizer: ComponentStory<null> = ({
	r,
	g,
	b,
	a,
}) => {
	const color = componentColorToBGRA([r, g, b, a])
	return <StressTestVertices2D colorizer={() => color} />
}
StressTest2DWithColorizer.storyName = 'Stress Test 2D With Colorizer'
StressTest2DWithColorizer.args = {
	r: 1,
	g: 0,
	b: 0,
	a: 1,
}
StressTest2DWithColorizer.argTypes = {
	r: { component: { type: 'range', min: 0, max: 1, step: 0.01 } },
	g: { component: { type: 'range', min: 0, max: 1, step: 0.01 } },
	b: { component: { type: 'range', min: 0, max: 1, step: 0.01 } },
	a: { component: { type: 'range', min: 0, max: 1, step: 0.01 } },
}
