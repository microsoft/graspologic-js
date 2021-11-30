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
  var renderer = useContext(GraphRendererContext);
  var guiRef = useRef(null);
  var gui = useMemo(function () {
    return new dat.GUI({
      autoPlace: false
    });
  }, []); // Start out closed

  useEffect(function () {
    gui.close();
  }, [gui]); // Synchronize GUI width

  useEffect(function () {
    gui.width = guiWidth;
  }, [gui, guiWidth]); // Attach dat.gui to DOM

  useEffect(function () {
    if (guiRef && guiRef.current && gui && gui.domElement) {
      guiRef.current.appendChild(gui.domElement);
      gui.domElement.style.pointerEvents = 'visible';
    }
  }, [guiRef, gui]); // Synchronize dat.gui with renderer state

  useEffect(function () {
    if (renderer && gui) {
      renderer.on('dirty', function () {
        return gui.updateDisplay();
      });
    }
  }, [renderer, gui]);
  return [gui, guiRef];
}