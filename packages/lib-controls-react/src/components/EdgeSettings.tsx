/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { GraphRendererContext } from '@graspologic/react'
import { attachEdgeSettings } from '@graspologic/render-controls'
import { memo, useContext, useEffect } from 'react'
import { DatGuiContext } from '../context'

export interface EdgeSettingsProps {
	alphaRange?: [number, number]
	minWidthRange?: [number, number]
	maxWidthRange?: [number, number]
}
/**
 * Attaches the graph renderer edge settings to the SettingsPane
 */
export const EdgeSettings: React.FC<EdgeSettingsProps> = memo(
	function EdgeSettings({ alphaRange, minWidthRange, maxWidthRange }) {
		const gui = useContext(DatGuiContext)
		const renderer = useContext(GraphRendererContext)

		useEffect(() => {
			if (gui && renderer) {
				return attachEdgeSettings(gui, renderer, {
					alphaRange,
					minWidthRange,
					maxWidthRange,
				})
			}
		}, [gui, renderer, alphaRange, minWidthRange, maxWidthRange])

		return null
	},
)
