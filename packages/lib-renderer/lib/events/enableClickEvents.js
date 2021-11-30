/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
// @ts-ignore
import { EventManager } from 'mjolnir.js';
/**
 * Enables click events on the given graph renderer
 * @param renderer The graph renderer
 * @returns A disconnect function
 */
export function enableClickEvents(renderer) {
    const eventManager = new EventManager(renderer.view);
    eventManager.on({
        click: () => renderer.handleClicked(),
    });
    return () => eventManager.destroy();
}
