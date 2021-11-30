/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as dat from 'dat.gui';
import { useMemo, useEffect, useRef, useContext } from 'react';
import { GraphRendererContext } from '@graspologic/react';
/**
 * @internal
 *
 * A hook which manages an instance of dat.gui
 * @param guiWidth The width of dat.gui
 */
export function useDatGui(guiWidth) {
    const renderer = useContext(GraphRendererContext);
    const guiRef = useRef(null);
    const gui = useMemo(() => new dat.GUI({ autoPlace: false }), []);
    // Start out closed
    useEffect(() => {
        gui.close();
    }, [gui]);
    // Synchronize GUI width
    useEffect(() => {
        gui.width = guiWidth;
    }, [gui, guiWidth]);
    // Attach dat.gui to DOM
    useEffect(() => {
        if (guiRef && guiRef.current && gui && gui.domElement) {
            guiRef.current.appendChild(gui.domElement);
            gui.domElement.style.pointerEvents = 'visible';
        }
    }, [guiRef, gui]);
    // Synchronize dat.gui with renderer state
    useEffect(() => {
        if (renderer && gui) {
            renderer.on('dirty', () => gui.updateDisplay());
        }
    }, [renderer, gui]);
    return [gui, guiRef];
}
