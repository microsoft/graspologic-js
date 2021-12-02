/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { memo } from 'react'
import { DatGuiContext } from '../context'
import { useDatGui } from '../hooks/useDatGui'

/**
 * The SettingsPane props
 */
export interface SettingsPaneProps {
	/**
	 * The classname to attach to the settings pane
	 */
	className?: string

	/**
	 * The styles to apply to the settings pane
	 */
	style?: React.CSSProperties

	/**
	 * The width of the settings pane
	 */
	guiWidth?: number
}

const defaultStyle: React.CSSProperties = {
	position: 'absolute',
	top: 0,
	right: 0,
	height: '100%',
	maxHeight: '100%',
	minHeight: 20,
	overflow: 'auto',
	pointerEvents: 'none',
}

const DEFAULT_GUI_WIDTH = 250

/**
 * Attaches a settings pane to the GraphView component
 */
export const SettingsPane: React.FC<SettingsPaneProps> = memo(
	function SettingsPane({
		className,
		children,
		style = defaultStyle,
		guiWidth = DEFAULT_GUI_WIDTH,
	}) {
		const [gui, guiRef] = useDatGui(guiWidth)
		return (
			<div ref={guiRef} className={className} style={style}>
				<DatGuiContext.Provider value={gui}>{children}</DatGuiContext.Provider>
			</div>
		)
	},
)
