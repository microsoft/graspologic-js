/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Disconnect } from '@graspologic/common'
// @ts-ignore
import { EventManager } from 'mjolnir.js'
import type { GraphRenderer } from '../types/index.js'

/**
 * Enables click events on the given graph renderer
 * @param renderer The graph renderer
 * @returns A disconnect function
 */
export function enableClickEvents(renderer: GraphRenderer): Disconnect {
	const eventManager = new EventManager(renderer.view)
	eventManager.on({
		click: () => renderer.handleClicked(),
	})
	return (): void => eventManager.destroy()
}
