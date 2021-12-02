/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { GraphRendererContext } from '@graspologic/react'
import { attachDisplaySettings } from '@graspologic/render-controls'
import { memo, useContext, useEffect } from 'react'
import { DatGuiContext } from '../context'

export interface DisplaySettingsProps {
	interpolationTimeRange?: [number, number]
}
/**
 * Attaches the graph renderer display settings to the SettingsPane
 */
export const DisplaySettings: React.FC<DisplaySettingsProps> = memo(
	function DisplaySettings({ interpolationTimeRange }) {
		const gui = useContext(DatGuiContext)
		const renderer = useContext(GraphRendererContext)

		useEffect(() => {
			if (gui && renderer) {
				return attachDisplaySettings(gui, renderer, { interpolationTimeRange })
			}
		}, [gui, renderer, interpolationTimeRange])

		return null
	},
)
