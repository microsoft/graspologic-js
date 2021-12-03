/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { GraphRendererContext } from '@graspologic/react'
import { attachNodeSettings } from '@graspologic/render-controls'
import { memo, useContext, useEffect } from 'react'
import { DatGuiContext } from '../context'

export interface NodeSettingsProps {
	/**
	 * The range of values to allow for the min-radius settings
	 */
	minRadiusRange?: [number, number]
	/**
	 * The range of values to allow for the max-radius settings
	 */
	maxRadiusRange?: [number, number]
}

/**
 * Attaches the graph renderer node settings to the SettingsPane
 */
export const NodeSettings: React.FC<NodeSettingsProps> = memo(
	function NodeSettings({ minRadiusRange, maxRadiusRange }) {
		const gui = useContext(DatGuiContext)
		const renderer = useContext(GraphRendererContext)

		useEffect(() => {
			if (gui && renderer) {
				return attachNodeSettings(gui, renderer, {
					minRadiusRange,
					maxRadiusRange,
				})
			}
		}, [gui, renderer, minRadiusRange, maxRadiusRange])

		return null
	},
)
