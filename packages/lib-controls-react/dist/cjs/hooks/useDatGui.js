"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDatGui = useDatGui;

var dat = _interopRequireWildcard(require("dat.gui"));

var _react = require("react");

var _react2 = require("@graspologic/react");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * @internal
 *
 * A hook which manages an instance of dat.gui
 * @param guiWidth The width of dat.gui
 */
function useDatGui(guiWidth) {
  var renderer = (0, _react.useContext)(_react2.GraphRendererContext);
  var guiRef = (0, _react.useRef)(null);
  var gui = (0, _react.useMemo)(function () {
    return new dat.GUI({
      autoPlace: false
    });
  }, []); // Start out closed

  (0, _react.useEffect)(function () {
    gui.close();
  }, [gui]); // Synchronize GUI width

  (0, _react.useEffect)(function () {
    gui.width = guiWidth;
  }, [gui, guiWidth]); // Attach dat.gui to DOM

  (0, _react.useEffect)(function () {
    if (guiRef && guiRef.current && gui && gui.domElement) {
      guiRef.current.appendChild(gui.domElement);
      gui.domElement.style.pointerEvents = 'visible';
    }
  }, [guiRef, gui]); // Synchronize dat.gui with renderer state

  (0, _react.useEffect)(function () {
    if (renderer && gui) {
      renderer.on('dirty', function () {
        return gui.updateDisplay();
      });
    }
  }, [renderer, gui]);
  return [gui, guiRef];
}