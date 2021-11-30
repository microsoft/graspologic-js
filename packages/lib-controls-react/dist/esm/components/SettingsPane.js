import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react';
import { memo } from 'react';
import { DatGuiContext } from '../context';
import { useDatGui } from '../hooks/useDatGui';
var defaultStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  height: '100%',
  maxHeight: '100%',
  minHeight: 20,
  overflow: 'auto',
  pointerEvents: 'none'
};
var DEFAULT_GUI_WIDTH = 250;
/**
 * Attaches a settings pane to the GraphView component
 */

export var SettingsPane = memo(function SettingsPane(_ref) {
  var className = _ref.className,
      children = _ref.children,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? defaultStyle : _ref$style,
      _ref$guiWidth = _ref.guiWidth,
      guiWidth = _ref$guiWidth === void 0 ? DEFAULT_GUI_WIDTH : _ref$guiWidth;

  var _useDatGui = useDatGui(guiWidth),
      _useDatGui2 = _slicedToArray(_useDatGui, 2),
      gui = _useDatGui2[0],
      guiRef = _useDatGui2[1];

  return React.createElement("div", {
    ref: guiRef,
    className: className,
    style: style
  }, React.createElement(DatGuiContext.Provider, {
    value: gui
  }, children));
});