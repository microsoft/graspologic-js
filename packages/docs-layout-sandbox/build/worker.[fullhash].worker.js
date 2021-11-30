/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../../../.yarn/__virtual__/cache-loader-virtual-a44cf2d551/0/cache/cache-loader-npm-4.1.0-82c3da90d8-0339778bdd.zip/node_modules/cache-loader/dist/cjs.js!../../../.yarn/__virtual__/babel-loader-virtual-9514560f53/0/cache/babel-loader-npm-8.1.0-e8c38740ba-fdbcae91cc.zip/node_modules/babel-loader/lib/index.js?!../../../.yarn/__virtual__/ts-loader-virtual-5ef653d34a/0/cache/ts-loader-npm-8.0.11-a6f1286fbd-2a5b570816.zip/node_modules/ts-loader/index.js?!../../../.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/worker.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/RenderConfiguration.ts":
/*!***************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/RenderConfiguration.ts ***!
  \***************************************************************************************************************************************************/
/*! exports provided: createConfiguration */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createConfiguration", function() { return createConfiguration; });
/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaults */ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/defaults.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/index.ts");
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

 // TODO: These need to be documented
// TODO: Theres got to be a way to auto gen this stuff

/**
 * Container for the render configuration
 */

class RenderConfigurationImpl {
  constructor() {
    // Configurable properties
    this._drawEdges = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_DRAW_EDGES"]);
    this._hideEdgesOnMove = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_HIDE_EDGES_ON_MOVE"]);
    this._drawNodes = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_DRAW_NODES"]);
    this._hideNodesOnMove = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_HIDE_NODES_ON_MOVE"]);
    this._hideDeselected = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_HIDE_DESELECTED"]);
    this._is3D = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_IS_3D"]);
    this._backgroundColor = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_BG_COLOR"], _utils__WEBPACK_IMPORTED_MODULE_1__["areColorsEqual"]); // Edge Properties

    this._edgeConstantWidth = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_EDGE_CONSTANT_WIDTH"]);
    this._edgeDepthWrite = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_EDGE_DEPTH_WRITE"]);
    this._edgeAntialias = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_EDGE_ANTIALIAS"]);
    this._edgeAlpha = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_EDGE_ALPHA"]);
    this._edgeMinWidth = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_EDGE_MIN_WIDTH"]);
    this._edgeMaxWidth = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_EDGE_MAX_WIDTH"]);
    this._edgeFilteredOutSaturation = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_EDGE_FILTERED_OUT_SATURATION"]);
    this._edgeFilteredInSaturation = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_EDGE_FILTERED_IN_SATURATION"]); // Node Properties

    this._nodeMinRadius = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_NODE_MIN_RADIUS"]);
    this._nodeMaxRadius = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_NODE_MAX_RADIUS"]);
    this._nodeOutline = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_NODE_OUTLINE"]);
    this._nodeFilteredOutSaturation = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_NODE_FILTERED_OUT_SATURATION"]);
    this._nodeFilteredInSaturation = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_NODE_FILTERED_IN_SATURATION"]);
    this._nodeFilteredIds = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](undefined);
    this._nodeCountHint = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_NODE_COUNT_HINT"]);
    this._edgeCountHint = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_EDGE_COUNT_HINT"]);
    this._width = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_WIDTH"]);
    this._height = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_HEIGHT"]);
    this._dataBounds = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_BOUNDS"]); // Axis Properties

    this._cornerAxes = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_CORNER_AXES"]);
    this._drawAxes = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_DRAW_AXES"]); // Other

    this._interpolationTime = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_INTERPOLATION_TIME"]);
    this._hoverHighlightColor = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_HOVER_HIGHLIGHT_COLOR"]);
    this._autoBind = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_AUTO_BIND"]);
    this._cameraAdjustmentMode = new _utils__WEBPACK_IMPORTED_MODULE_1__["PropertyContainer"](_defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_CAMERA_MODE"]);
  }

  get backgroundColor() {
    return this._backgroundColor.value;
  }

  set backgroundColor(value) {
    this._backgroundColor.value = value;
  }

  onBackgroundColorChanged(handler) {
    return this._backgroundColor.on('change', handler);
  }

  get drawEdges() {
    return this._drawEdges.value;
  }

  set drawEdges(value) {
    this._drawEdges.value = value;
  }

  onDrawEdgesChanged(handler) {
    return this._drawEdges.on('change', handler);
  }

  get hideEdgesOnMove() {
    return this._hideEdgesOnMove.value;
  }

  set hideEdgesOnMove(value) {
    this._hideEdgesOnMove.value = value;
  }

  onHideEdgesOnMoveChanged(handler) {
    return this._hideEdgesOnMove.on('change', handler);
  }

  get drawNodes() {
    return this._drawNodes.value;
  }

  set drawNodes(value) {
    this._drawNodes.value = value;
  }

  onDrawNodesChanged(handler) {
    return this._drawNodes.on('change', handler);
  }

  get hideNodesOnMove() {
    return this._hideNodesOnMove.value;
  }

  set hideNodesOnMove(value) {
    this._hideNodesOnMove.value = value;
  }

  onHideNodesOnMoveChanged(handler) {
    return this._hideNodesOnMove.on('change', handler);
  }

  get hideDeselected() {
    return this._hideDeselected.value;
  }

  set hideDeselected(value) {
    this._hideDeselected.value = value;
  }

  onHideDeselectedChanged(handler) {
    return this._hideDeselected.on('change', handler);
  }

  get edgeConstantWidth() {
    return this._edgeConstantWidth.value;
  }

  set edgeConstantWidth(value) {
    this._edgeConstantWidth.value = value;
  }

  onEdgeConstantWidthChanged(handler) {
    return this._edgeConstantWidth.on('change', handler);
  }

  get edgeDepthWrite() {
    return this._edgeDepthWrite.value;
  }

  set edgeDepthWrite(value) {
    this._edgeDepthWrite.value = value;
  }

  onEdgeDepthWriteChanged(handler) {
    return this._edgeDepthWrite.on('change', handler);
  }

  get edgeAlpha() {
    return this._edgeAlpha.value;
  }

  set edgeAlpha(value) {
    this._edgeAlpha.value = value;
  }

  onEdgeAlphaChanged(handler) {
    return this._edgeAlpha.on('change', handler);
  }

  get dataBounds() {
    return this._dataBounds.value;
  }

  set dataBounds(value) {
    this._dataBounds.value = value;
  }

  onDataBoundsChanged(handler) {
    return this._dataBounds.on('change', handler);
  }

  get edgeAntialias() {
    return this._edgeAntialias.value;
  }

  set edgeAntialias(value) {
    this._edgeAntialias.value = value;
  }

  onEdgeAntialiasChanged(handler) {
    return this._edgeAntialias.on('change', handler);
  }

  get edgeMinWidth() {
    return this._edgeMinWidth.value;
  }

  set edgeMinWidth(value) {
    this._edgeMinWidth.value = value;
  }

  onEdgeMinWidthChanged(handler) {
    return this._edgeMinWidth.on('change', handler);
  }

  get edgeMaxWidth() {
    return this._edgeMaxWidth.value;
  }

  set edgeMaxWidth(value) {
    this._edgeMaxWidth.value = value;
  }

  onEdgeMaxWidthChanged(handler) {
    return this._edgeMaxWidth.on('change', handler);
  }

  get nodeMinRadius() {
    return this._nodeMinRadius.value;
  }

  set nodeMinRadius(value) {
    this._nodeMinRadius.value = value;
  }

  onNodeMinRadiusChanged(handler) {
    return this._nodeMinRadius.on('change', handler);
  }

  get autoBind() {
    return this._autoBind.value;
  }

  set autoBind(value) {
    this._autoBind.value = value;
  }

  get nodeMaxRadius() {
    return this._nodeMaxRadius.value;
  }

  set nodeMaxRadius(value) {
    this._nodeMaxRadius.value = value;
  }

  onNodeMaxRadiusChanged(handler) {
    return this._nodeMaxRadius.on('change', handler);
  }

  get nodeOutline() {
    return this._nodeOutline.value;
  }

  set nodeOutline(value) {
    this._nodeOutline.value = value;
  }

  onNodeOutlineChanged(handler) {
    return this._nodeOutline.on('change', handler);
  }

  get cornerAxes() {
    return this._cornerAxes.value;
  }

  set cornerAxes(value) {
    this._cornerAxes.value = value;
  }

  onCornerAxesChanged(handler) {
    return this._cornerAxes.on('change', handler);
  }

  get drawAxes() {
    return this._drawAxes.value;
  }

  set drawAxes(value) {
    this._drawAxes.value = value;
  }

  onDrawAxesChanged(handler) {
    return this._drawAxes.on('change', handler);
  }

  get interpolationTime() {
    return this._interpolationTime.value;
  }

  set interpolationTime(value) {
    this._interpolationTime.value = value;
  }

  onInterpolationTimeChanged(handler) {
    return this._interpolationTime.on('change', handler);
  }

  get hoverHighlightColor() {
    return this._hoverHighlightColor.value;
  }

  set hoverHighlightColor(value) {
    this._hoverHighlightColor.value = value;
  }

  onHoverHighlightColorChanged(handler) {
    return this._hoverHighlightColor.on('change', handler);
  }

  get is3D() {
    return this._is3D.value;
  }

  set is3D(value) {
    this._is3D.value = value;
  }

  onIs3DChanged(handler) {
    return this._is3D.on('change', handler);
  }

  validateOn3DChanged(predicate) {
    this._is3D.checkValidity(predicate);
  }

  get edgeFilteredOutSaturation() {
    return this._edgeFilteredOutSaturation.value;
  }

  set edgeFilteredOutSaturation(value) {
    this._edgeFilteredOutSaturation.value = value;
  }

  onEdgeFilteredOutSaturationChanged(handler) {
    return this._edgeFilteredOutSaturation.on('change', handler);
  }

  get edgeFilteredInSaturation() {
    return this._edgeFilteredInSaturation.value;
  }

  set edgeFilteredInSaturation(value) {
    this._edgeFilteredInSaturation.value = value;
  }

  onEdgeFilteredInSaturationChanged(handler) {
    return this._edgeFilteredInSaturation.on('change', handler);
  }

  get nodeFilteredOutSaturation() {
    return this._nodeFilteredOutSaturation.value;
  }

  set nodeFilteredOutSaturation(value) {
    this._nodeFilteredOutSaturation.value = value;
  }

  onNodeFilteredOutSaturationChanged(handler) {
    return this._nodeFilteredOutSaturation.on('change', handler);
  }

  get nodeFilteredInSaturation() {
    return this._nodeFilteredInSaturation.value;
  }

  set nodeFilteredInSaturation(value) {
    this._nodeFilteredInSaturation.value = value;
  }

  onNodeFilteredInSaturationChanged(handler) {
    return this._edgeFilteredInSaturation.on('change', handler);
  }

  get nodeFilteredIds() {
    return this._nodeFilteredIds.value;
  }

  set nodeFilteredIds(value) {
    this._nodeFilteredIds.value = value;
  }

  onNodeFilteredIdsChanged(handler) {
    return this._nodeFilteredIds.on('change', handler);
  }

  get nodeCountHint() {
    return this._nodeCountHint.value;
  }

  set nodeCountHint(value) {
    this._nodeCountHint.value = value;
  }

  onNodeCountHintChanged(handler) {
    return this._nodeCountHint.on('change', handler);
  }

  get edgeCountHint() {
    return this._edgeCountHint.value;
  }

  set edgeCountHint(value) {
    this._edgeCountHint.value = value;
  }

  onEdgeCountHintChanged(handler) {
    return this._edgeCountHint.on('change', handler);
  }

  get width() {
    return this._width.value;
  }

  set width(value) {
    this._width.value = value;
  }

  onWidthChanged(handler) {
    return this._width.on('change', handler);
  }

  get height() {
    return this._height.value;
  }

  set height(value) {
    this._height.value = value;
  }

  onHeightChanged(handler) {
    return this._height.on('change', handler);
  }

  get cameraAdjustmentMode() {
    return this._cameraAdjustmentMode.value;
  }

  set cameraAdjustmentMode(value) {
    this._cameraAdjustmentMode.value = value;
  }

  onCameraAdjustmentModeChanged(handler) {
    return this._cameraAdjustmentMode.on('change', handler);
  }

  copy() {
    const {
      backgroundColor,
      cornerAxes,
      drawAxes,
      drawEdges,
      drawNodes,
      edgeAlpha,
      edgeAntialias,
      edgeConstantWidth,
      edgeDepthWrite,
      edgeFilteredInSaturation,
      edgeFilteredOutSaturation,
      edgeMaxWidth,
      edgeMinWidth,
      hideDeselected,
      hideEdgesOnMove,
      hideNodesOnMove,
      hoverHighlightColor,
      interpolationTime,
      is3D,
      nodeFilteredIds,
      nodeFilteredInSaturation,
      nodeFilteredOutSaturation,
      nodeMaxRadius,
      nodeMinRadius,
      nodeOutline,
      nodeCountHint,
      edgeCountHint,
      width,
      height,
      cameraAdjustmentMode,
      autoBind,
      dataBounds
    } = this;
    return {
      backgroundColor,
      cornerAxes,
      drawAxes,
      drawEdges,
      drawNodes,
      edgeAlpha,
      edgeAntialias,
      edgeConstantWidth,
      edgeDepthWrite,
      edgeFilteredInSaturation,
      edgeFilteredOutSaturation,
      edgeMaxWidth,
      edgeMinWidth,
      hideDeselected,
      hideEdgesOnMove,
      hideNodesOnMove,
      hoverHighlightColor,
      interpolationTime,
      is3D,
      nodeFilteredIds,
      nodeFilteredInSaturation,
      nodeFilteredOutSaturation,
      nodeMaxRadius,
      nodeMinRadius,
      nodeOutline,
      nodeCountHint,
      edgeCountHint,
      width,
      height,
      cameraAdjustmentMode,
      autoBind,
      dataBounds
    };
  }
  /**
   * Loads the configuration options into the configuration
   * @param options The partial set of render configuration options
   */


  load(options) {
    Object.keys(options || {}).forEach(key => {
      ;
      this[key] = options[key];
    });
  }

}
/**
 * @internal
 *
 * Creates a new render configuration
 * @param props The partial set of render configuration options
 */


function createConfiguration(props) {
  const config = new RenderConfigurationImpl();
  config.load(props || {});
  return config;
}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/defaults.ts":
/*!****************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/defaults.ts ***!
  \****************************************************************************************************************************************/
/*! exports provided: DEFAULT_BG_COLOR, DEFAULT_DRAW_EDGES, DEFAULT_HIDE_EDGES_ON_MOVE, DEFAULT_DRAW_NODES, DEFAULT_HIDE_NODES_ON_MOVE, DEFAULT_HIDE_DESELECTED, DEFAULT_IS_3D, DEFAULT_INTERPOLATION_TIME, DEFAULT_HOVER_HIGHLIGHT_COLOR, DEFAULT_DRAW_AXES, DEFAULT_CORNER_AXES, DEFAULT_EDGE_CONSTANT_WIDTH, DEFAULT_EDGE_DEPTH_WRITE, DEFAULT_EDGE_ANTIALIAS, DEFAULT_EDGE_ALPHA, DEFAULT_EDGE_MIN_WIDTH, DEFAULT_EDGE_MAX_WIDTH, DEFAULT_EDGE_FILTERED_OUT_SATURATION, DEFAULT_EDGE_FILTERED_IN_SATURATION, DEFAULT_NODE_MIN_RADIUS, DEFAULT_NODE_MAX_RADIUS, DEFAULT_NODE_OUTLINE, DEFAULT_NODE_FILTERED_OUT_SATURATION, DEFAULT_NODE_FILTERED_IN_SATURATION, DEFAULT_NODE_COUNT_HINT, DEFAULT_EDGE_COUNT_HINT, DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_BOUNDS, DEFAULT_USE_DEVICE_PIXELS, DEFAULT_SCALE_VIEW_ON_INIT, DEFAULT_CAMERA_MODE, DEFAULT_AUTO_BIND */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_BG_COLOR", function() { return DEFAULT_BG_COLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_DRAW_EDGES", function() { return DEFAULT_DRAW_EDGES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_HIDE_EDGES_ON_MOVE", function() { return DEFAULT_HIDE_EDGES_ON_MOVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_DRAW_NODES", function() { return DEFAULT_DRAW_NODES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_HIDE_NODES_ON_MOVE", function() { return DEFAULT_HIDE_NODES_ON_MOVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_HIDE_DESELECTED", function() { return DEFAULT_HIDE_DESELECTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_IS_3D", function() { return DEFAULT_IS_3D; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_INTERPOLATION_TIME", function() { return DEFAULT_INTERPOLATION_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_HOVER_HIGHLIGHT_COLOR", function() { return DEFAULT_HOVER_HIGHLIGHT_COLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_DRAW_AXES", function() { return DEFAULT_DRAW_AXES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_CORNER_AXES", function() { return DEFAULT_CORNER_AXES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_EDGE_CONSTANT_WIDTH", function() { return DEFAULT_EDGE_CONSTANT_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_EDGE_DEPTH_WRITE", function() { return DEFAULT_EDGE_DEPTH_WRITE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_EDGE_ANTIALIAS", function() { return DEFAULT_EDGE_ANTIALIAS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_EDGE_ALPHA", function() { return DEFAULT_EDGE_ALPHA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_EDGE_MIN_WIDTH", function() { return DEFAULT_EDGE_MIN_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_EDGE_MAX_WIDTH", function() { return DEFAULT_EDGE_MAX_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_EDGE_FILTERED_OUT_SATURATION", function() { return DEFAULT_EDGE_FILTERED_OUT_SATURATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_EDGE_FILTERED_IN_SATURATION", function() { return DEFAULT_EDGE_FILTERED_IN_SATURATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_NODE_MIN_RADIUS", function() { return DEFAULT_NODE_MIN_RADIUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_NODE_MAX_RADIUS", function() { return DEFAULT_NODE_MAX_RADIUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_NODE_OUTLINE", function() { return DEFAULT_NODE_OUTLINE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_NODE_FILTERED_OUT_SATURATION", function() { return DEFAULT_NODE_FILTERED_OUT_SATURATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_NODE_FILTERED_IN_SATURATION", function() { return DEFAULT_NODE_FILTERED_IN_SATURATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_NODE_COUNT_HINT", function() { return DEFAULT_NODE_COUNT_HINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_EDGE_COUNT_HINT", function() { return DEFAULT_EDGE_COUNT_HINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_WIDTH", function() { return DEFAULT_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_HEIGHT", function() { return DEFAULT_HEIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_BOUNDS", function() { return DEFAULT_BOUNDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_USE_DEVICE_PIXELS", function() { return DEFAULT_USE_DEVICE_PIXELS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_SCALE_VIEW_ON_INIT", function() { return DEFAULT_SCALE_VIEW_ON_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_CAMERA_MODE", function() { return DEFAULT_CAMERA_MODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_AUTO_BIND", function() { return DEFAULT_AUTO_BIND; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/types.ts");
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
 // Default color is transparent

const DEFAULT_BG_COLOR = [0, 0, 0, 0];
const DEFAULT_DRAW_EDGES = true;
const DEFAULT_HIDE_EDGES_ON_MOVE = false;
const DEFAULT_DRAW_NODES = true;
const DEFAULT_HIDE_NODES_ON_MOVE = false;
const DEFAULT_HIDE_DESELECTED = false;
const DEFAULT_IS_3D = false;
const DEFAULT_INTERPOLATION_TIME = 1000;
const DEFAULT_HOVER_HIGHLIGHT_COLOR = [160 / 255, 240 / 255, 255 / 255, 207 / 255];
const DEFAULT_DRAW_AXES = true;
const DEFAULT_CORNER_AXES = true;
const DEFAULT_EDGE_CONSTANT_WIDTH = true;
const DEFAULT_EDGE_DEPTH_WRITE = false;
const DEFAULT_EDGE_ANTIALIAS = false;
const DEFAULT_EDGE_ALPHA = 0.15;
const DEFAULT_EDGE_MIN_WIDTH = 1.0;
const DEFAULT_EDGE_MAX_WIDTH = 2.0;
const DEFAULT_EDGE_FILTERED_OUT_SATURATION = 0.1;
const DEFAULT_EDGE_FILTERED_IN_SATURATION = 1.0;
const DEFAULT_NODE_MIN_RADIUS = 4.0;
const DEFAULT_NODE_MAX_RADIUS = 8.0;
const DEFAULT_NODE_OUTLINE = true;
const DEFAULT_NODE_FILTERED_OUT_SATURATION = 0.1;
const DEFAULT_NODE_FILTERED_IN_SATURATION = 1.0;
const DEFAULT_NODE_COUNT_HINT = 10000;
const DEFAULT_EDGE_COUNT_HINT = 10000;
const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 500;
const DEFAULT_BOUNDS = undefined;
const DEFAULT_USE_DEVICE_PIXELS = true;
const DEFAULT_SCALE_VIEW_ON_INIT = true;
const DEFAULT_CAMERA_MODE = _types__WEBPACK_IMPORTED_MODULE_0__["CameraAdjustmentMode"].Graph;
const DEFAULT_AUTO_BIND = true;

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/index.ts":
/*!*************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/index.ts ***!
  \*************************************************************************************************************************************/
/*! exports provided: PropertyContainer, areColorsEqual, processMinMax, processMinMaxBounds, Interpolator, fastDebounce, EventEmitter, EventsMixin, DEFAULT_BG_COLOR, DEFAULT_DRAW_EDGES, DEFAULT_HIDE_EDGES_ON_MOVE, DEFAULT_DRAW_NODES, DEFAULT_HIDE_NODES_ON_MOVE, DEFAULT_HIDE_DESELECTED, DEFAULT_IS_3D, DEFAULT_INTERPOLATION_TIME, DEFAULT_HOVER_HIGHLIGHT_COLOR, DEFAULT_DRAW_AXES, DEFAULT_CORNER_AXES, DEFAULT_EDGE_CONSTANT_WIDTH, DEFAULT_EDGE_DEPTH_WRITE, DEFAULT_EDGE_ANTIALIAS, DEFAULT_EDGE_ALPHA, DEFAULT_EDGE_MIN_WIDTH, DEFAULT_EDGE_MAX_WIDTH, DEFAULT_EDGE_FILTERED_OUT_SATURATION, DEFAULT_EDGE_FILTERED_IN_SATURATION, DEFAULT_NODE_MIN_RADIUS, DEFAULT_NODE_MAX_RADIUS, DEFAULT_NODE_OUTLINE, DEFAULT_NODE_FILTERED_OUT_SATURATION, DEFAULT_NODE_FILTERED_IN_SATURATION, DEFAULT_NODE_COUNT_HINT, DEFAULT_EDGE_COUNT_HINT, DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_BOUNDS, DEFAULT_USE_DEVICE_PIXELS, DEFAULT_SCALE_VIEW_ON_INIT, DEFAULT_CAMERA_MODE, DEFAULT_AUTO_BIND, createConfiguration, CameraAdjustmentMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyContainer", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["PropertyContainer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "areColorsEqual", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["areColorsEqual"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "processMinMax", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["processMinMax"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "processMinMaxBounds", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["processMinMaxBounds"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Interpolator", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["Interpolator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fastDebounce", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["fastDebounce"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventEmitter", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventsMixin", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["EventsMixin"]; });

/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaults */ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/defaults.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_BG_COLOR", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_BG_COLOR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_DRAW_EDGES", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_DRAW_EDGES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_HIDE_EDGES_ON_MOVE", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_HIDE_EDGES_ON_MOVE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_DRAW_NODES", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_DRAW_NODES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_HIDE_NODES_ON_MOVE", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_HIDE_NODES_ON_MOVE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_HIDE_DESELECTED", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_HIDE_DESELECTED"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_IS_3D", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_IS_3D"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_INTERPOLATION_TIME", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_INTERPOLATION_TIME"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_HOVER_HIGHLIGHT_COLOR", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_HOVER_HIGHLIGHT_COLOR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_DRAW_AXES", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_DRAW_AXES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_CORNER_AXES", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CORNER_AXES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_EDGE_CONSTANT_WIDTH", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_EDGE_CONSTANT_WIDTH"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_EDGE_DEPTH_WRITE", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_EDGE_DEPTH_WRITE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_EDGE_ANTIALIAS", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_EDGE_ANTIALIAS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_EDGE_ALPHA", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_EDGE_ALPHA"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_EDGE_MIN_WIDTH", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_EDGE_MIN_WIDTH"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_EDGE_MAX_WIDTH", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_EDGE_MAX_WIDTH"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_EDGE_FILTERED_OUT_SATURATION", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_EDGE_FILTERED_OUT_SATURATION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_EDGE_FILTERED_IN_SATURATION", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_EDGE_FILTERED_IN_SATURATION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_NODE_MIN_RADIUS", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_NODE_MIN_RADIUS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_NODE_MAX_RADIUS", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_NODE_MAX_RADIUS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_NODE_OUTLINE", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_NODE_OUTLINE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_NODE_FILTERED_OUT_SATURATION", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_NODE_FILTERED_OUT_SATURATION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_NODE_FILTERED_IN_SATURATION", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_NODE_FILTERED_IN_SATURATION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_NODE_COUNT_HINT", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_NODE_COUNT_HINT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_EDGE_COUNT_HINT", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_EDGE_COUNT_HINT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_WIDTH", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_WIDTH"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_HEIGHT", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_HEIGHT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_BOUNDS", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_BOUNDS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_USE_DEVICE_PIXELS", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_USE_DEVICE_PIXELS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_SCALE_VIEW_ON_INIT", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_SCALE_VIEW_ON_INIT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_CAMERA_MODE", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_CAMERA_MODE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_AUTO_BIND", function() { return _defaults__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_AUTO_BIND"]; });

/* harmony import */ var _RenderConfiguration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RenderConfiguration */ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/RenderConfiguration.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createConfiguration", function() { return _RenderConfiguration__WEBPACK_IMPORTED_MODULE_2__["createConfiguration"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/types.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CameraAdjustmentMode", function() { return _types__WEBPACK_IMPORTED_MODULE_3__["CameraAdjustmentMode"]; });

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */





/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/types.ts":
/*!*************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/types.ts ***!
  \*************************************************************************************************************************************/
/*! exports provided: CameraAdjustmentMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CameraAdjustmentMode", function() { return CameraAdjustmentMode; });
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
var CameraAdjustmentMode;

(function (CameraAdjustmentMode) {
  /**
   * Camera is automatically adjusted to fit the graph to the window
   */
  CameraAdjustmentMode[CameraAdjustmentMode["Graph"] = 0] = "Graph";
  /**
   * Camera is adjusted such that the graph coordinate space is a 1 to 1 mapping of the coordinate space to pixel space
   * i.e. A node at (1000, 1000) will show up at (1000, 1000) on the screen
   */

  CameraAdjustmentMode[CameraAdjustmentMode["Viewport"] = 1] = "Viewport";
  /**
   * Camera is not adjusted automatically
   */

  CameraAdjustmentMode[CameraAdjustmentMode["None"] = 2] = "None";
})(CameraAdjustmentMode || (CameraAdjustmentMode = {}));

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/Interpolator.ts":
/*!**************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/Interpolator.ts ***!
  \**************************************************************************************************************************************************/
/*! exports provided: Interpolator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Interpolator", function() { return Interpolator; });
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
class Interpolator {
  /**
   * Constructor
   * @param config The render configuration
   */
  constructor(_interpolationTime) {
    this._interpolationTime = _interpolationTime;
    this._frameTime = 0;
    this._current = 0;
    this._target = 1;
  }
  /**
   * Resets the interpolation state
   */


  reset() {
    this._frameTime = 0;
    this.current = 0;
  }
  /**
   * Gets the current value of the interpolator
   */


  get current() {
    return this._current;
  }
  /**
   * Sets the current value of the interpolator
   */


  set current(value) {
    this._current = value;
  }
  /**
   * Gets the target value of the interpolator
   */


  set target(value) {
    this._target = value;
  }
  /**
   * Sets the target value of the interpolator
   */


  get target() {
    return this._target;
  }
  /**
   * Gets whether or not interpolation is complete
   */


  get isComplete() {
    return this._current === this.target;
  }
  /**
   * Gets the interpolation time
   */


  get interpolationTime() {
    return this._interpolationTime;
  }
  /**
   * Sets the interpolation time
   */


  set interpolationTime(value) {
    this._interpolationTime = value;
  }
  /**
   * Updates the interpolation state based on the current time
   * @param time The current time
   */


  tick(time) {
    if (this._frameTime === 0) {
      this._frameTime = time;
    }

    if (this._interpolationTime > 0) {
      this.current += (time - this._frameTime) / this._interpolationTime;

      if (this.current > this.target) {
        this.current = this.target;
      }
    } else {
      this._frameTime = 0;
      this._current = this.target;
    }

    this._frameTime = time;
  }

}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/Properties.ts":
/*!************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/Properties.ts ***!
  \************************************************************************************************************************************************/
/*! exports provided: PropertyContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyContainer", function() { return PropertyContainer; });
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/events.ts");
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * @internal
 *
 * A class for managing a property that emits an event when it changes
 */

class PropertyContainer extends _events__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"] {
  /**
   * Constructor
   * @param _value The current value
   * @param areEqual An equality function
   */
  constructor(_value, areEqual = (a, b) => a === b) {
    super();
    this._value = _value;
    this.areEqual = areEqual;

    this.isValid = () => true;
  }
  /**
   * Sets the validator which validates whether or not a value is a valid value for this property container
   * @param isValid The validator
   */


  checkValidity(isValid) {
    this.isValid = isValid;
  }
  /**
   * Gets the value contained in the container
   */


  get value() {
    return this._value;
  }
  /**
   * Sets the value in the container
   */


  set value(newValue) {
    if (this.isValid(newValue) && !this.areEqual(newValue, this._value)) {
      this._value = newValue;
      this.emit('change', newValue);
    }
  }

}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/equality.ts":
/*!**********************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/equality.ts ***!
  \**********************************************************************************************************************************************/
/*! exports provided: areColorsEqual */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "areColorsEqual", function() { return areColorsEqual; });
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
function areColorsEqual(a, b) {
  for (let i = 0; i < 4; ++i) {
    if (b[i] !== a[i]) {
      return false;
    }
  }

  return true;
}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/events.ts":
/*!********************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/events.ts ***!
  \********************************************************************************************************************************************/
/*! exports provided: EventEmitter, EventsMixin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventEmitter", function() { return EventEmitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventsMixin", function() { return EventsMixin; });
/* harmony import */ var _mixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mixin */ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/mixin.ts");
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * An implementation of an object which emits a set of events
 */

class EventEmitter {
  constructor() {
    this.listeners = {};
  }
  /**
   * Adds an event listener for the given event
   */


  on(name, handler) {
    this.listeners[name] = this.listeners[name] || [];
    this.listeners[name].push(handler);
    return () => this.off(name, handler);
  }
  /**
   * Removes an event listener for the given event
   */


  off(name, handler) {
    const listeners = this.listeners[name];

    if (listeners) {
      const idx = listeners.indexOf(handler);

      if (idx >= 0) {
        listeners.splice(idx, 1);
      }
    }
  }
  /**
   * Raises the given event
   */


  emit(name, payload) {
    const listeners = this.listeners[name];

    if (listeners) {
      listeners.forEach(l => {
        ;
        l.call(this, payload);
      });
    }
  }
  /**
   * Returns true if there are any listeners for the given event
   * @param name The event name
   */


  hasListeners(name) {
    this.listeners = this.listeners || {};
    const listeners = this.listeners[name];

    if (listeners) {
      return listeners.length > 0;
    }

    return false;
  }

}
/**
 * A mixin that adds support for event emitting
 * @param Base The base class to mixin the EventEmitter into
 */

function EventsMixin(Base) {
  class EventImpl extends Base {
    constructor() {
      super(...arguments); // This is a necessary evil, to ensure that the "listeners" fields gets added

      this.listeners = {};
    }

  }

  Object(_mixin__WEBPACK_IMPORTED_MODULE_0__["applyMixins"])(EventImpl, [EventEmitter]);
  return EventImpl;
}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/fastDebounce.ts":
/*!**************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/fastDebounce.ts ***!
  \**************************************************************************************************************************************************/
/*! exports provided: fastDebounce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fastDebounce", function() { return fastDebounce; });
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
function fastDebounce(callback, delay = 100) {
  let lastUpdate;
  let startLoop = true;

  function loop() {
    const timeSinceLastUpdate = Date.now() - lastUpdate;

    if (timeSinceLastUpdate < delay) {
      // Set timeout for the remaining time
      setTimeout(loop, delay - timeSinceLastUpdate);
    } else {
      startLoop = true;
      callback();
    }
  }

  return function () {
    lastUpdate = Date.now();

    if (startLoop) {
      startLoop = false;
      loop();
    }
  };
}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/index.ts":
/*!*******************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/index.ts ***!
  \*******************************************************************************************************************************************/
/*! exports provided: PropertyContainer, areColorsEqual, processMinMax, processMinMaxBounds, Interpolator, fastDebounce, EventEmitter, EventsMixin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Properties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Properties */ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/Properties.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyContainer", function() { return _Properties__WEBPACK_IMPORTED_MODULE_0__["PropertyContainer"]; });

/* harmony import */ var _equality__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./equality */ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/equality.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "areColorsEqual", function() { return _equality__WEBPACK_IMPORTED_MODULE_1__["areColorsEqual"]; });

/* harmony import */ var _processMinMax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./processMinMax */ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/processMinMax.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "processMinMax", function() { return _processMinMax__WEBPACK_IMPORTED_MODULE_2__["processMinMax"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "processMinMaxBounds", function() { return _processMinMax__WEBPACK_IMPORTED_MODULE_2__["processMinMaxBounds"]; });

/* harmony import */ var _Interpolator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Interpolator */ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/Interpolator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Interpolator", function() { return _Interpolator__WEBPACK_IMPORTED_MODULE_3__["Interpolator"]; });

/* harmony import */ var _fastDebounce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fastDebounce */ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/fastDebounce.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fastDebounce", function() { return _fastDebounce__WEBPACK_IMPORTED_MODULE_4__["fastDebounce"]; });

/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./events */ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/events.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventEmitter", function() { return _events__WEBPACK_IMPORTED_MODULE_5__["EventEmitter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventsMixin", function() { return _events__WEBPACK_IMPORTED_MODULE_5__["EventsMixin"]; });

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */







/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/mixin.ts":
/*!*******************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/mixin.ts ***!
  \*******************************************************************************************************************************************/
/*! exports provided: applyMixins */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyMixins", function() { return applyMixins; });
function applyMixins(derivedCtor, constructors) {
  constructors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
    });
  });
  return derivedCtor;
}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/processMinMax.ts":
/*!***************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/utils/processMinMax.ts ***!
  \***************************************************************************************************************************************************/
/*! exports provided: processMinMax, processMinMaxBounds */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processMinMax", function() { return processMinMax; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processMinMaxBounds", function() { return processMinMaxBounds; });
/**
 * Updates the given bounds based on the new x, y, z values
 * @param bounds The current bounds
 * @param x The new x to be added
 * @param y The new y to be added
 * @param z The new z to be added
 */
function processMinMax(bounds, x, y, z) {
  bounds.x.min = Math.min(bounds.x.min, x);
  bounds.x.max = Math.max(bounds.x.max, x);
  bounds.y.min = Math.min(bounds.y.min, y);
  bounds.y.max = Math.max(bounds.y.max, y);
  bounds.z.min = Math.min(bounds.z.min, z);
  bounds.z.max = Math.max(bounds.z.max, z);
}
/**
 * Updates the given bounds based on the new bounds
 * @param target The current bounds
 * @param newBounds The new bounds
 */

function processMinMaxBounds(target, newBounds) {
  // X
  target.x.max = Math.max(newBounds.x.min, newBounds.x.max, target.x.max);
  target.x.min = Math.min(newBounds.x.min, newBounds.x.max, target.x.min); // X

  target.y.max = Math.max(newBounds.y.min, newBounds.y.max, target.y.max);
  target.y.min = Math.min(newBounds.y.min, newBounds.y.max, target.y.min); // Z

  target.z.max = Math.max(newBounds.z.min, newBounds.z.max, target.z.max);
  target.z.min = Math.min(newBounds.z.min, newBounds.z.max, target.z.min);
}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/graph/GraphContainer.ts":
/*!**************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/graph/GraphContainer.ts ***!
  \**************************************************************************************************************************************************/
/*! exports provided: GraphContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphContainer", function() { return GraphContainer; });
/* harmony import */ var _primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../primitives */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/index.ts");
/* harmony import */ var _space_measure__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../space/measure */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/space/measure.ts");
/* harmony import */ var _internGraph__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internGraph */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/graph/internGraph.ts");
/* harmony import */ var _populateAdjacency__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./populateAdjacency */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/graph/populateAdjacency.ts");
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */




/**
 * The datastructure which contains all the internal graph data required for the GraphRenderer
 */

class GraphContainer {
  // #endregion

  /**
   * @internal
   * Constructs a new instance of the GraphContainer
   * @param nodes The initial node data store
   * @param edges The initial edge data store
   */
  constructor(nodes, edges) {
    this._nodes = nodes;
    this._edges = edges;
  }
  /**
   * @internal
   * Gets the underlying node store
   */


  get nodes() {
    return this._nodes;
  }
  /**
   * @internal
   * Gets the underlying edge store
   */


  get edges() {
    return this._edges;
  }
  /**
   * Creates an instance of the GraphContainer using the given input graph
   * @param inputGraph The pojo graph to intern
   * @param options The set of options controlling how the graph is interned, defaults to @see {@link DEFAULT_INTERN_GRAPH_OPTIONS}
   * @returns The GraphContainer
   */


  static intern(inputGraph, options = _internGraph__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_INTERN_GRAPH_OPTIONS"]) {
    return Object(_internGraph__WEBPACK_IMPORTED_MODULE_2__["internGraph"])(inputGraph, options);
  }
  /**
   * @internal
   * Serializes the GraphContainer instance
   * @returns The serialized version of the GraphContainer
   */


  serialize() {
    return {
      nodes: this.nodes.store.buffer,
      edges: this.edges.store.buffer
    };
  }
  /**
   * @internal
   * Deserializes the GraphContainer instance
   * @param graph The serialized version of the GraphContainer
   * @returns The deserialized GraphContainer
   */


  static deserialize(graph) {
    const nodeStore = Object(_primitives__WEBPACK_IMPORTED_MODULE_0__["createNodeStore"])({
      buffer: graph.nodes,
      allocatedOnCreate: true
    });
    const edgeStore = Object(_primitives__WEBPACK_IMPORTED_MODULE_0__["createEdgeStore"])({
      buffer: graph.edges,
      allocatedOnCreate: true
    });
    return new GraphContainer(nodeStore, edgeStore);
  }
  /**
   * @internal
   * Retrieve neigbors of the given node. This may be reflect edge-cutting
   * performed by the algorithm
   * @param n The node index to retrieve neighbors for
   * @returns A list of neighbor node indices
   */


  getNeighbors(n) {
    const result = this.getAdjacencyMap(false).get(n);
    return result ? Object.keys(result).map(k => parseInt(k, 10)) : [];
  }
  /**
   * @internal
   * Retrieve neigbors of the given node. This will not reflect any edge-cutting
   * performed by the algorithm
   * @param n The node index to retrieve neighbors for
   * @returns A list of neighbor node indices
   */


  getNeighborsObjective(id) {
    const result = this.getAdjacencyMap(true).get(id);

    if (!result) {
      throw new Error(`could not get adjacency for node ${id}`);
    }

    return Object.keys(result).map(k => parseInt(k, 10));
  }
  /**
   * @internal
   * Gets the edge weight between two nodes, which may reflect edge-cutting.
   * @throws if source and target are not connected
   * @param source The source node index
   * @param target The target node index
   * @returns The edge weight
   */


  getEdgeWeight(source, target) {
    const result = this.getAdjacencyMap(false).get(source);

    if (!result) {
      throw new Error(`could not get adjacency for node ${source}`);
    }

    return result[target];
  }
  /**
   * @internal
   * Gets the edge weight between two nodes, ignoring reflect edge-cutting
   * @throws if source and target are not connected
   * @param source The source node index
   * @param target The target node index
   * @returns The edge weight
   */


  getEdgeWeightObjective(source, target) {
    const result = this.getAdjacencyMap(true).get(source);

    if (!result) {
      throw new Error(`could not get objective adjacency for node ${source}`);
    }

    return result[target];
  }
  /**
   * @internal
   * Returns the computed cetroid of the neighborhood that the given node is a part of
   * @param n The node to get the neighborhood centroid for
   * @returns The centroid
   */


  getNeighborhoodCentroid(n) {
    const neighbors = this.getNeighbors(n);
    const node = this.nodes.itemAt(n);

    if (!node) {
      throw new Error('could not get node ' + n);
    } else if (neighbors.length === 0) {
      return {
        x: node.x,
        y: node.y
      };
    } else {
      const neighborPositions = [node];
      const neighborWeights = [1];
      neighbors.forEach(nid => {
        const neighbor = this.nodes.itemAt(nid);
        const edgeWeight = this.getEdgeWeight(n, nid);
        neighborPositions.push(neighbor);
        neighborWeights.push(edgeWeight);
      });
      const result = Object(_space_measure__WEBPACK_IMPORTED_MODULE_1__["weightedCentroid"])(neighborPositions, neighborWeights);
      return result;
    }
  }
  /**
   * @internal
   * Prunes an edge
   * @param from The source node
   * @param to The target node
   */


  pruneEdge(from, to) {
    const fromList = this.getAdjacencyMap(false).get(from);
    const toList = this.getAdjacencyMap(false).get(to);

    if (!fromList || !toList) {
      throw new Error(`could not get edge for (${from}, ${to})`);
    }

    delete fromList[to];
    delete toList[from];
  }
  /**
   * @internal
   * Gets an adjacency map
   * @param original If the original adjacency map is required
   * @returns The adjacency map
   */


  getAdjacencyMap(original) {
    if (!this._originalAdjacency) {
      this._originalAdjacency = Object(_populateAdjacency__WEBPACK_IMPORTED_MODULE_3__["populateAdjacency"])(this.nodes, this.edges);
    }

    if (!this._adjacency && !original) {
      this._adjacency = Object(_populateAdjacency__WEBPACK_IMPORTED_MODULE_3__["populateAdjacency"])(this.nodes, this.edges);
    }

    return original ? this._originalAdjacency : this._adjacency;
  }

}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/graph/index.ts":
/*!*****************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/graph/index.ts ***!
  \*****************************************************************************************************************************************/
/*! exports provided: GraphContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GraphContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GraphContainer */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/graph/GraphContainer.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphContainer", function() { return _GraphContainer__WEBPACK_IMPORTED_MODULE_0__["GraphContainer"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/graph/types.ts");
/* empty/unused harmony star reexport *//*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */



/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/graph/internGraph.ts":
/*!***********************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/graph/internGraph.ts ***!
  \***********************************************************************************************************************************************/
/*! exports provided: DEFAULT_INTERN_GRAPH_OPTIONS, internGraph */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_INTERN_GRAPH_OPTIONS", function() { return DEFAULT_INTERN_GRAPH_OPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "internGraph", function() { return internGraph; });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/helpers/index.ts");
/* harmony import */ var _primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../primitives */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/index.ts");
/* harmony import */ var _GraphContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GraphContainer */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/graph/GraphContainer.ts");
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */



const DEFAULT_INTERN_GRAPH_OPTIONS = Object.freeze({
  defaultEdgeWeight: 1,
  shareable: true
});
/**
 * @internal
 *
 * Interns a raw graph into a GraphContainer, used by graspologic
 * @param input A raw input graph
 * @param options: internization options
 * @returns The GraphContainer
 */

function internGraph(input, {
  shareable = DEFAULT_INTERN_GRAPH_OPTIONS.shareable,
  randomize,
  defaultEdgeWeight = DEFAULT_INTERN_GRAPH_OPTIONS.defaultEdgeWeight
} = DEFAULT_INTERN_GRAPH_OPTIONS) {
  const graph = getEmptyGraphContainer(input.nodes.length, input.edges.length, shareable);
  let i = 0;
  const nodeIdToIndex = new Map();

  if (input.nodes.length > 0) {
    let node;
    let inputNode;
    i = 0;

    for (node of graph.nodes.scan()) {
      if (i >= input.nodes.length) {
        break;
      }

      inputNode = input.nodes[i];

      if (input.edges.length > 0) {
        nodeIdToIndex.set(inputNode.id, i);
      }

      node.connect(i, graph.nodes);
      node.load(inputNode);

      if (randomize && node.x === 0 && node.y === 0) {
        node.x = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["randBetween"])(randomize[0], randomize[1]);
        node.y = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["randBetween"])(randomize[2], randomize[3]);
      }

      ++i;
    }
  }

  if (input.edges.length > 0) {
    let edge;
    i = 0;

    for (edge of graph.edges.scan()) {
      if (i >= input.edges.length) {
        break;
      }

      edge.connect(i, graph.edges);
      edge.load(input.edges[i], nodeIdToIndex, defaultEdgeWeight);
      ++i;
    }
  }

  return graph;
}
/**
 * Creates an empty graph container
 * @param numNodes The number of nodes to preallocate
 * @param numEdges The number of edges to preallocate
 * @param shareable Whether to use shared-memory
 * @returns An empty graph container
 */

function getEmptyGraphContainer(numNodes, numEdges, shareable = true) {
  return new _GraphContainer__WEBPACK_IMPORTED_MODULE_2__["GraphContainer"](Object(_primitives__WEBPACK_IMPORTED_MODULE_1__["createNodeStore"])({
    capacity: numNodes,
    shared: shareable,
    allocatedOnCreate: true
  }), Object(_primitives__WEBPACK_IMPORTED_MODULE_1__["createEdgeStore"])({
    capacity: numEdges,
    shared: shareable,
    allocatedOnCreate: true
  }));
}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/graph/populateAdjacency.ts":
/*!*****************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/graph/populateAdjacency.ts ***!
  \*****************************************************************************************************************************************************/
/*! exports provided: populateAdjacency */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "populateAdjacency", function() { return populateAdjacency; });
/**
 * @internal
 * Populates an adjacency map
 * @param nodes the nodes data
 * @param edges the edges data
 * @returns An adjacency map
 */
function populateAdjacency(nodes, edges) {
  const adj = new Map();
  let node;

  for (node of nodes) {
    adj.set(node.storeId, {});
  } // Load the adjacency matrix


  let maxWeight = 0.000001;
  let sourceList;
  let targetList;
  let edge;

  for (edge of edges) {
    const {
      sourceIndex,
      targetIndex,
      weight
    } = edge;
    sourceList = adj.get(sourceIndex);
    targetList = adj.get(targetIndex);

    if (weight > maxWeight) {
      maxWeight = weight;
    }

    sourceList[targetIndex] = weight;
    targetList[sourceIndex] = weight;
  } // Nomalize the edge weights


  let value;
  let key;

  for (value of adj.values()) {
    for (key of Object.keys(value)) {
      value[parseInt(key, 10)] /= maxWeight;
    }
  }

  return adj;
}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/graph/types.ts":
/*!*****************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/graph/types.ts ***!
  \*****************************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/helpers/computeBounds.ts":
/*!***************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/helpers/computeBounds.ts ***!
  \***************************************************************************************************************************************************/
/*! exports provided: computeBounds */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computeBounds", function() { return computeBounds; });
/**
 * Computes the bounds of the given graph
 * @param graph The graph to compute the bounds from
 */
function computeBounds(graph) {
  if (graph) {
    let bounds;

    for (const node of graph.nodes) {
      if (!bounds) {
        bounds = {
          x: {
            min: node.x,
            max: node.x
          },
          y: {
            min: node.y,
            max: node.y
          },
          z: {
            min: node.z,
            max: node.z
          }
        };
      } else {
        bounds.x.min = Math.min(node.x, bounds.x.min);
        bounds.x.max = Math.max(node.x, bounds.x.max);
        bounds.y.min = Math.min(node.y, bounds.y.min);
        bounds.y.max = Math.max(node.y, bounds.y.max);
        bounds.z.min = Math.min(node.z, bounds.z.min);
        bounds.z.max = Math.max(node.z, bounds.z.max);
      }
    }

    return bounds;
  }

  return undefined;
}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/helpers/index.ts":
/*!*******************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/helpers/index.ts ***!
  \*******************************************************************************************************************************************/
/*! exports provided: jiggle, randBetween, computeBounds */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rand */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/helpers/rand.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "jiggle", function() { return _rand__WEBPACK_IMPORTED_MODULE_0__["jiggle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randBetween", function() { return _rand__WEBPACK_IMPORTED_MODULE_0__["randBetween"]; });

/* harmony import */ var _computeBounds__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./computeBounds */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/helpers/computeBounds.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "computeBounds", function() { return _computeBounds__WEBPACK_IMPORTED_MODULE_1__["computeBounds"]; });

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */



/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/helpers/rand.ts":
/*!******************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/helpers/rand.ts ***!
  \******************************************************************************************************************************************/
/*! exports provided: jiggle, randBetween */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jiggle", function() { return jiggle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randBetween", function() { return randBetween; });
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
function jiggle(factor = 1e-6) {
  return (Math.random() - 0.5) * factor;
}
/**
 * @internal
 *
 * Generates a random number between the min and max values
 * @param min The minimum value of the number
 * @param max The maximum value of the number
 * @returns The random number
 */

function randBetween(min, max) {
  return Math.random() * (max - min) + min;
}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/index.ts":
/*!***********************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/index.ts ***!
  \***********************************************************************************************************************************/
/*! exports provided: squareDistanceTo, distanceTo, weightedCentroid, QuadTree, GraphContainer, jiggle, randBetween, computeBounds, createNodeStore, NodeImpl, parseShape, AnimatableNodeImpl, nodeType, ADDITIONAL_NODE_PROPS, nodeMemoryLayout, nodeTypedOffset, createEdgeStore, EdgeImpl, AnimatableEdgeImpl, edgeType, ADDITIONAL_EDGE_PROPS, edgeMemoryLayout, edgeTypedOffset, Shape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _space__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./space */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/space/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "squareDistanceTo", function() { return _space__WEBPACK_IMPORTED_MODULE_0__["squareDistanceTo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "distanceTo", function() { return _space__WEBPACK_IMPORTED_MODULE_0__["distanceTo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "weightedCentroid", function() { return _space__WEBPACK_IMPORTED_MODULE_0__["weightedCentroid"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuadTree", function() { return _space__WEBPACK_IMPORTED_MODULE_0__["QuadTree"]; });

/* harmony import */ var _graph__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graph */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/graph/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphContainer", function() { return _graph__WEBPACK_IMPORTED_MODULE_1__["GraphContainer"]; });

/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/helpers/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "jiggle", function() { return _helpers__WEBPACK_IMPORTED_MODULE_2__["jiggle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randBetween", function() { return _helpers__WEBPACK_IMPORTED_MODULE_2__["randBetween"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "computeBounds", function() { return _helpers__WEBPACK_IMPORTED_MODULE_2__["computeBounds"]; });

/* harmony import */ var _primitives__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./primitives */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createNodeStore", function() { return _primitives__WEBPACK_IMPORTED_MODULE_3__["createNodeStore"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NodeImpl", function() { return _primitives__WEBPACK_IMPORTED_MODULE_3__["NodeImpl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseShape", function() { return _primitives__WEBPACK_IMPORTED_MODULE_3__["parseShape"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimatableNodeImpl", function() { return _primitives__WEBPACK_IMPORTED_MODULE_3__["AnimatableNodeImpl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nodeType", function() { return _primitives__WEBPACK_IMPORTED_MODULE_3__["nodeType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ADDITIONAL_NODE_PROPS", function() { return _primitives__WEBPACK_IMPORTED_MODULE_3__["ADDITIONAL_NODE_PROPS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nodeMemoryLayout", function() { return _primitives__WEBPACK_IMPORTED_MODULE_3__["nodeMemoryLayout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nodeTypedOffset", function() { return _primitives__WEBPACK_IMPORTED_MODULE_3__["nodeTypedOffset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createEdgeStore", function() { return _primitives__WEBPACK_IMPORTED_MODULE_3__["createEdgeStore"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EdgeImpl", function() { return _primitives__WEBPACK_IMPORTED_MODULE_3__["EdgeImpl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimatableEdgeImpl", function() { return _primitives__WEBPACK_IMPORTED_MODULE_3__["AnimatableEdgeImpl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "edgeType", function() { return _primitives__WEBPACK_IMPORTED_MODULE_3__["edgeType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ADDITIONAL_EDGE_PROPS", function() { return _primitives__WEBPACK_IMPORTED_MODULE_3__["ADDITIONAL_EDGE_PROPS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "edgeMemoryLayout", function() { return _primitives__WEBPACK_IMPORTED_MODULE_3__["edgeMemoryLayout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "edgeTypedOffset", function() { return _primitives__WEBPACK_IMPORTED_MODULE_3__["edgeTypedOffset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Shape", function() { return _primitives__WEBPACK_IMPORTED_MODULE_3__["Shape"]; });

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */





/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/impl/AnimatableEdgeImpl.ts":
/*!*********************************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/impl/AnimatableEdgeImpl.ts ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: AnimatableEdgeImpl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimatableEdgeImpl", function() { return AnimatableEdgeImpl; });
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../layout */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/layout.ts");
/* harmony import */ var _EdgeImpl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EdgeImpl */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/impl/EdgeImpl.ts");
/* harmony import */ var _graspologic_memstore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @graspologic/memstore */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/index.ts");


 // Cache several frequently accessed names / offsets

const allAttributes = '*';
const sourcePositionAttr = 'sourcePosition';
const sourcePositionStartAttr = 'sourcePosition.start';
const sourcePositionTweenAttr = 'sourcePosition.tween';
const targetPositionAttr = 'targetPosition';
const targetPositionStartAttr = 'targetPosition.start';
const targetPositionTweenAttr = 'targetPosition.tween';
const sourcePositionTypedOffset = Object(_layout__WEBPACK_IMPORTED_MODULE_0__["edgeTypedOffset"])(sourcePositionAttr);
const sourcePositionStartTypedOffset = Object(_layout__WEBPACK_IMPORTED_MODULE_0__["edgeTypedOffset"])(sourcePositionStartAttr);
const sourcePositionTweenTypedOffset = Object(_layout__WEBPACK_IMPORTED_MODULE_0__["edgeTypedOffset"])(sourcePositionTweenAttr);
const targetPositionTypedOffset = Object(_layout__WEBPACK_IMPORTED_MODULE_0__["edgeTypedOffset"])(targetPositionAttr);
const targetPositionStartTypedOffset = Object(_layout__WEBPACK_IMPORTED_MODULE_0__["edgeTypedOffset"])(targetPositionStartAttr);
const targetPositionTweenTypedOffset = Object(_layout__WEBPACK_IMPORTED_MODULE_0__["edgeTypedOffset"])(targetPositionTweenAttr);
const inspector = new _graspologic_memstore__WEBPACK_IMPORTED_MODULE_2__["MemoryReaderInspector"]();
/**
 * An implementation of an Edge that has animation capabilities
 */

class AnimatableEdgeImplInternal extends _EdgeImpl__WEBPACK_IMPORTED_MODULE_1__["EdgeImpl"] {
  /**
   * @inheritDoc
   * @see {@link AnimatableEdge.animateSourcePosition}
   */
  animateSourcePosition(position, duration) {
    var _this$store;

    // Set the start to the old position
    inspector.copyFloat32Vec3Offset(this, sourcePositionTypedOffset, sourcePositionStartTypedOffset);
    this.handleAttributeUpdated(sourcePositionStartAttr); // Update the tween

    inspector.writeFloat32Vec2Offset(this, sourcePositionTweenTypedOffset, duration || 0, ((_this$store = this.store) === null || _this$store === void 0 ? void 0 : _this$store.engineTime) || 0);
    this.handleAttributeUpdated(sourcePositionTweenAttr); // Update the end sourcePosition

    inspector.writeFloat32Vec3Offset(this, sourcePositionTypedOffset, position[0] || 0, position[1] || 0, position[2] || 0);
    this.handleAttributeUpdated(sourcePositionAttr);
  }
  /**
   * @inheritDoc
   * @see {@link AnimatableEdge.animateTargetPosition}
   */


  animateTargetPosition(position, duration) {
    var _this$store2;

    // Set the start to the old position
    inspector.copyFloat32Vec3Offset(this, targetPositionTypedOffset, targetPositionStartTypedOffset);
    this.handleAttributeUpdated(targetPositionStartAttr); // Update the tween

    inspector.writeFloat32Vec2Offset(this, targetPositionTweenTypedOffset, duration || 0, ((_this$store2 = this.store) === null || _this$store2 === void 0 ? void 0 : _this$store2.engineTime) || 0);
    this.handleAttributeUpdated(targetPositionTweenAttr); // Update the end targetPosition

    inspector.writeFloat32Vec3Offset(this, targetPositionTypedOffset, position[0] || 0, position[1] || 0, position[2] || 0);
    this.handleAttributeUpdated(targetPositionAttr);
  }
  /**
   * @inheritDoc
   * @see {@link Edge.load}
   */


  load(data, nodeIndexMap, defaultEdgeWeight = 1) {
    super.load(data, nodeIndexMap, defaultEdgeWeight);
    this.handleAttributeUpdated(allAttributes);
  }
  /**
   * Handler for when an attribute is updated
   * @param name The name of the attribute
   */


  handleAttributeUpdated(name) {
    if (this.store) {
      this.store.notify(this.storeId, name);
    }
  }

}
/**
 * An implementation of an Edge that has animation capabilities
 */


const AnimatableEdgeImpl = AnimatableEdgeImplInternal;

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/impl/EdgeImpl.ts":
/*!***********************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/impl/EdgeImpl.ts ***!
  \***********************************************************************************************************************************************************/
/*! exports provided: EdgeImpl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EdgeImpl", function() { return EdgeImpl; });
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../layout */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/layout.ts");
/* harmony import */ var _graspologic_memstore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @graspologic/memstore */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/index.ts");

 // Cache some of the attributes for the "load"

const sourceIndexTypedOffset = _layout__WEBPACK_IMPORTED_MODULE_0__["edgeMemoryLayout"].get('sourceIndex').typedOffset;
const targetIndexTypedOffset = _layout__WEBPACK_IMPORTED_MODULE_0__["edgeMemoryLayout"].get('targetIndex').typedOffset;
const colorTypedOffset = _layout__WEBPACK_IMPORTED_MODULE_0__["edgeMemoryLayout"].get('color').typedOffset;
const color2TypedOffset = _layout__WEBPACK_IMPORTED_MODULE_0__["edgeMemoryLayout"].get('color2').typedOffset;
const weightTypedOffset = _layout__WEBPACK_IMPORTED_MODULE_0__["edgeMemoryLayout"].get('weight').typedOffset;
/**
 * An implementation of an Edge
 */

const BaseEdgeImpl = Object(_graspologic_memstore__WEBPACK_IMPORTED_MODULE_1__["createReader"])(_layout__WEBPACK_IMPORTED_MODULE_0__["edgeType"], _layout__WEBPACK_IMPORTED_MODULE_0__["edgeMemoryLayout"], _layout__WEBPACK_IMPORTED_MODULE_0__["ADDITIONAL_EDGE_PROPS"]);
class EdgeImpl extends BaseEdgeImpl {
  /**
   * @inheritDoc
   * @see {@link Edge.load}
   */
  load(data, nodeIndexMap, defaultEdgeWeight = 1) {
    ;
    this.propertyBag = this.store.propertyBags[this.storeId] || {};
    this.store.propertyBags[this.storeId] = this.propertyBag;
    this.propertyBag.source = data.source;
    this.propertyBag.target = data.target;
    this.uint32Array[this.wordOffset + sourceIndexTypedOffset] = nodeIndexMap.get(data.source);
    this.uint32Array[this.wordOffset + targetIndexTypedOffset] = nodeIndexMap.get(data.target);
    this.float32Array[this.wordOffset + weightTypedOffset] = data.weight != null ? data.weight : defaultEdgeWeight;
    this.uint32Array[this.wordOffset + colorTypedOffset] = data.color || data.sourceColor || 0;
    this.uint32Array[this.wordOffset + color2TypedOffset] = data.color2 || data.targetColor || 0;
  }

}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/impl/index.ts":
/*!********************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/impl/index.ts ***!
  \********************************************************************************************************************************************************/
/*! exports provided: EdgeImpl, AnimatableEdgeImpl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EdgeImpl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EdgeImpl */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/impl/EdgeImpl.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EdgeImpl", function() { return _EdgeImpl__WEBPACK_IMPORTED_MODULE_0__["EdgeImpl"]; });

/* harmony import */ var _AnimatableEdgeImpl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AnimatableEdgeImpl */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/impl/AnimatableEdgeImpl.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimatableEdgeImpl", function() { return _AnimatableEdgeImpl__WEBPACK_IMPORTED_MODULE_1__["AnimatableEdgeImpl"]; });

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */



/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/index.ts":
/*!***************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/index.ts ***!
  \***************************************************************************************************************************************************/
/*! exports provided: createEdgeStore, EdgeImpl, AnimatableEdgeImpl, edgeType, ADDITIONAL_EDGE_PROPS, edgeMemoryLayout, edgeTypedOffset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/store.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createEdgeStore", function() { return _store__WEBPACK_IMPORTED_MODULE_0__["createEdgeStore"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/types.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _impl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./impl */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/impl/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EdgeImpl", function() { return _impl__WEBPACK_IMPORTED_MODULE_2__["EdgeImpl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimatableEdgeImpl", function() { return _impl__WEBPACK_IMPORTED_MODULE_2__["AnimatableEdgeImpl"]; });

/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layout */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/layout.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "edgeType", function() { return _layout__WEBPACK_IMPORTED_MODULE_3__["edgeType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ADDITIONAL_EDGE_PROPS", function() { return _layout__WEBPACK_IMPORTED_MODULE_3__["ADDITIONAL_EDGE_PROPS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "edgeMemoryLayout", function() { return _layout__WEBPACK_IMPORTED_MODULE_3__["edgeMemoryLayout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "edgeTypedOffset", function() { return _layout__WEBPACK_IMPORTED_MODULE_3__["edgeTypedOffset"]; });

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */





/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/layout.ts":
/*!****************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/layout.ts ***!
  \****************************************************************************************************************************************************/
/*! exports provided: edgeType, ADDITIONAL_EDGE_PROPS, edgeMemoryLayout, edgeTypedOffset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "edgeType", function() { return edgeType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADDITIONAL_EDGE_PROPS", function() { return ADDITIONAL_EDGE_PROPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "edgeMemoryLayout", function() { return edgeMemoryLayout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "edgeTypedOffset", function() { return edgeTypedOffset; });
/* harmony import */ var _graspologic_memstore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @graspologic/memstore */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/index.ts");
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * The unique symbol for an edge
 */

const edgeType = Symbol('@graspologic::edge');
/**
 * @internal
 *
 * The additional edge props
 */

const ADDITIONAL_EDGE_PROPS = ['id', 'source', 'target', 'data'];
/**
 * @internal
 * The internal memory layout for storing edges
 */

const edgeMemoryLayout = Object(_graspologic_memstore__WEBPACK_IMPORTED_MODULE_0__["createLayoutBuilder"])().addUint32('sourceIndex').addUint32('targetIndex').addFloat32('weight').addFloat32('trueWeight').addFloat32('saturation').addFloat32('saturation2').addUint32('color').addUint32('color2').addUint8('visible', {
  hint: _graspologic_memstore__WEBPACK_IMPORTED_MODULE_0__["InterpretationHint"].Boolean
}).addFloat32Vec3('sourcePosition.start').addFloat32Vec3('sourcePosition').addFloat32Vec2('sourcePosition.tween', {
  components: ['sourcePosition.duration', 'sourcePosition.startTime']
}).addFloat32Vec3('targetPosition.start').addFloat32Vec3('targetPosition').addFloat32Vec2('targetPosition.tween', {
  components: ['targetPosition.duration', 'targetPosition.startTime']
}).build();
/**
 * Gets the typed offset for the given attribute
 */

function edgeTypedOffset(attribute) {
  var _edgeMemoryLayout$get;

  return (_edgeMemoryLayout$get = edgeMemoryLayout.get(attribute)) === null || _edgeMemoryLayout$get === void 0 ? void 0 : _edgeMemoryLayout$get.typedOffset;
}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/store.ts":
/*!***************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/store.ts ***!
  \***************************************************************************************************************************************************/
/*! exports provided: createEdgeStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEdgeStore", function() { return createEdgeStore; });
/* harmony import */ var _impl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./impl */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/impl/index.ts");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layout */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/layout.ts");
/* harmony import */ var _graspologic_memstore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @graspologic/memstore */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/index.ts");
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */



/**
 * @internal
 *
 * Returns a data buffer to keep track of Edges
 * @param capacity The initial capacity of the data buffer
 * @param engineTime Function to return the current engine time
 * @returns A data store capable of storing Edge objects
 */

function createEdgeStore(config) {
  const store = new _graspologic_memstore__WEBPACK_IMPORTED_MODULE_2__["ArrayStoreImpl"](_layout__WEBPACK_IMPORTED_MODULE_1__["edgeMemoryLayout"], config);
  const slotAllocator = new _graspologic_memstore__WEBPACK_IMPORTED_MODULE_2__["SlotAllocator"]( // We use the store capacity, cause it does some defaulting
  store.config.capacity, // If the user explicitly wanted capacity of 0,
  // ignore the allocatedOnCreate and assume nothing is used
  (config === null || config === void 0 ? void 0 : config.capacity) === 0 ? false : Boolean(config === null || config === void 0 ? void 0 : config.allocatedOnCreate));
  const Impl = (config === null || config === void 0 ? void 0 : config.animation) !== false ? _impl__WEBPACK_IMPORTED_MODULE_0__["AnimatableEdgeImpl"] : _impl__WEBPACK_IMPORTED_MODULE_0__["EdgeImpl"];
  return new _graspologic_memstore__WEBPACK_IMPORTED_MODULE_2__["ReaderStoreImpl"](Impl, store, slotAllocator);
}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/types.ts":
/*!***************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/types.ts ***!
  \***************************************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/index.ts":
/*!**********************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/index.ts ***!
  \**********************************************************************************************************************************************/
/*! exports provided: createNodeStore, NodeImpl, parseShape, AnimatableNodeImpl, nodeType, ADDITIONAL_NODE_PROPS, nodeMemoryLayout, nodeTypedOffset, createEdgeStore, EdgeImpl, AnimatableEdgeImpl, edgeType, ADDITIONAL_EDGE_PROPS, edgeMemoryLayout, edgeTypedOffset, Shape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createNodeStore", function() { return _node__WEBPACK_IMPORTED_MODULE_0__["createNodeStore"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NodeImpl", function() { return _node__WEBPACK_IMPORTED_MODULE_0__["NodeImpl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseShape", function() { return _node__WEBPACK_IMPORTED_MODULE_0__["parseShape"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimatableNodeImpl", function() { return _node__WEBPACK_IMPORTED_MODULE_0__["AnimatableNodeImpl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nodeType", function() { return _node__WEBPACK_IMPORTED_MODULE_0__["nodeType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ADDITIONAL_NODE_PROPS", function() { return _node__WEBPACK_IMPORTED_MODULE_0__["ADDITIONAL_NODE_PROPS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nodeMemoryLayout", function() { return _node__WEBPACK_IMPORTED_MODULE_0__["nodeMemoryLayout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nodeTypedOffset", function() { return _node__WEBPACK_IMPORTED_MODULE_0__["nodeTypedOffset"]; });

/* harmony import */ var _edge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edge */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/edge/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createEdgeStore", function() { return _edge__WEBPACK_IMPORTED_MODULE_1__["createEdgeStore"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EdgeImpl", function() { return _edge__WEBPACK_IMPORTED_MODULE_1__["EdgeImpl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimatableEdgeImpl", function() { return _edge__WEBPACK_IMPORTED_MODULE_1__["AnimatableEdgeImpl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "edgeType", function() { return _edge__WEBPACK_IMPORTED_MODULE_1__["edgeType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ADDITIONAL_EDGE_PROPS", function() { return _edge__WEBPACK_IMPORTED_MODULE_1__["ADDITIONAL_EDGE_PROPS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "edgeMemoryLayout", function() { return _edge__WEBPACK_IMPORTED_MODULE_1__["edgeMemoryLayout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "edgeTypedOffset", function() { return _edge__WEBPACK_IMPORTED_MODULE_1__["edgeTypedOffset"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/types.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Shape", function() { return _types__WEBPACK_IMPORTED_MODULE_2__["Shape"]; });

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */




/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/impl/AnimatableNodeImpl.ts":
/*!*********************************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/impl/AnimatableNodeImpl.ts ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: AnimatableNodeImpl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimatableNodeImpl", function() { return AnimatableNodeImpl; });
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../layout */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/layout.ts");
/* harmony import */ var _NodeImpl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NodeImpl */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/impl/NodeImpl.ts");
/* harmony import */ var _graspologic_memstore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @graspologic/memstore */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/index.ts");



const allAttributes = '*';
const colorAttr = 'color';
const colorStartAttr = 'color.start';
const colorTweenAttr = 'color.tween';
const positionAttr = 'position';
const positionStartAttr = 'position.start';
const positionTweenAttr = 'position.tween'; // For fast lookup

const positionTypedOffset = Object(_layout__WEBPACK_IMPORTED_MODULE_0__["nodeTypedOffset"])(positionAttr);
const positionStartTypedOffset = Object(_layout__WEBPACK_IMPORTED_MODULE_0__["nodeTypedOffset"])(positionStartAttr);
const positionTweenTypedOffset = Object(_layout__WEBPACK_IMPORTED_MODULE_0__["nodeTypedOffset"])(positionTweenAttr);
const colorTypedOffset = Object(_layout__WEBPACK_IMPORTED_MODULE_0__["nodeTypedOffset"])(colorAttr);
const colorStartTypedOffset = Object(_layout__WEBPACK_IMPORTED_MODULE_0__["nodeTypedOffset"])(colorStartAttr);
const colorTweenTypedOffset = Object(_layout__WEBPACK_IMPORTED_MODULE_0__["nodeTypedOffset"])(colorTweenAttr);
const inspector = new _graspologic_memstore__WEBPACK_IMPORTED_MODULE_2__["MemoryReaderInspector"]();
/**
 * An implementation of a Node that has animation capabilities
 */

class AnimatableNodeImplInternal extends _NodeImpl__WEBPACK_IMPORTED_MODULE_1__["NodeImpl"] {
  /**
   * @inheritDoc
   * @see {@link AnimatableNode.animatePosition}
   */
  animatePosition(position, duration = 0) {
    var _this$store;

    // Set the start to the old position
    inspector.copyFloat32Vec3Offset(this, positionTypedOffset, positionStartTypedOffset);
    this.handleAttributeUpdated(positionStartAttr); // Update the tween

    inspector.writeFloat32Vec2Offset(this, positionTweenTypedOffset, duration, ((_this$store = this.store) === null || _this$store === void 0 ? void 0 : _this$store.engineTime) || 0);
    this.handleAttributeUpdated(positionTweenAttr); // Update the end position

    inspector.writeFloat32Vec3Offset(this, positionTypedOffset, position[0] || 0, position[1] || 0, position[2] || 0);
    this.handleAttributeUpdated(positionAttr);
  }
  /**
   * @inheritDoc
   * @see {@link AnimatableNode.animateColor}
   */


  animateColor(color, duration = 0) {
    var _this$store2;

    // Set the start to the old color
    inspector.copyUint32Offset(this, colorTypedOffset, colorStartTypedOffset);
    this.handleAttributeUpdated(colorStartAttr); // Update the tween

    inspector.writeFloat32Vec2Offset(this, colorTweenTypedOffset, duration, ((_this$store2 = this.store) === null || _this$store2 === void 0 ? void 0 : _this$store2.engineTime) || 0);
    this.handleAttributeUpdated(colorTweenAttr); // Update the end color

    inspector.writeUint32Offset(this, colorTypedOffset, color);
    this.handleAttributeUpdated(colorAttr);
  }
  /**
   * @inheritDoc
   * @see {@link Node.load}
   */


  load(data) {
    super.load(data);
    this.handleAttributeUpdated(allAttributes);
  }
  /**
   * Handler for when an attribute is updated
   * @param name The name of the attribute
   * @param value The value of the attribute
   */


  handleAttributeUpdated(name) {
    if (this.store) {
      this.store.notify(this.storeId, name);
    }
  }

}
/**
 * An implementation of a Node that has animation capabilities
 */


const AnimatableNodeImpl = AnimatableNodeImplInternal;

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/impl/NodeImpl.ts":
/*!***********************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/impl/NodeImpl.ts ***!
  \***********************************************************************************************************************************************************/
/*! exports provided: NodeImpl, parseShape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeImpl", function() { return NodeImpl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseShape", function() { return parseShape; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/types.ts");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layout */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/layout.ts");
/* harmony import */ var _graspologic_memstore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @graspologic/memstore */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/index.ts");


 // Cache some of the attributes for the "load"

const positionTypedOffset = _layout__WEBPACK_IMPORTED_MODULE_1__["nodeMemoryLayout"].get('position').typedOffset;
const radiusTypedOffset = _layout__WEBPACK_IMPORTED_MODULE_1__["nodeMemoryLayout"].get('radius').typedOffset;
const shapeTypedOffset = _layout__WEBPACK_IMPORTED_MODULE_1__["nodeMemoryLayout"].get('shape').typedOffset;
const weightTypedOffset = _layout__WEBPACK_IMPORTED_MODULE_1__["nodeMemoryLayout"].get('weight').typedOffset;
const colorTypedOffset = _layout__WEBPACK_IMPORTED_MODULE_1__["nodeMemoryLayout"].get('color').typedOffset;
const visibleTypedOffset = _layout__WEBPACK_IMPORTED_MODULE_1__["nodeMemoryLayout"].get('visible').typedOffset;
/**
 * An implementation of a Node
 */

const BaseNodeImpl = Object(_graspologic_memstore__WEBPACK_IMPORTED_MODULE_2__["createReader"])(_layout__WEBPACK_IMPORTED_MODULE_1__["nodeType"], _layout__WEBPACK_IMPORTED_MODULE_1__["nodeMemoryLayout"], _layout__WEBPACK_IMPORTED_MODULE_1__["ADDITIONAL_NODE_PROPS"]);
class NodeImpl extends BaseNodeImpl {
  /**
   * @inheritDoc
   * @see {@link Node.load}
   */
  load(data) {
    ;
    this.propertyBag = this.store.propertyBags[this.storeId] || {};
    this.store.propertyBags[this.storeId] = this.propertyBag;
    this.propertyBag.id = data.id;
    this.propertyBag.group = data.group;
    this.propertyBag.label = data.label;
    this.float32Array[this.wordOffset + radiusTypedOffset] = data.size || data.radius || 0;
    this.float32Array[this.wordOffset + positionTypedOffset] = data.x || 0;
    this.float32Array[this.wordOffset + positionTypedOffset + 1] = data.y || 0;
    this.float32Array[this.wordOffset + positionTypedOffset + 2] = data.z || 0;
    this.float32Array[this.wordOffset + weightTypedOffset] = data.weight || 1;
    this.uint32Array[this.wordOffset + colorTypedOffset] = data.color || 0;
    this.uint8Array[this.byteOffset + shapeTypedOffset] = parseShape(data.shape);
    this.uint8Array[this.byteOffset + visibleTypedOffset] = 1;
  }

}
/**
 * Parses a Shape from an unparsed shape value
 * @param unparsedShape
 */

function parseShape(unparsedShape) {
  if (typeof unparsedShape === 'string') {
    unparsedShape = unparsedShape.toLocaleLowerCase();

    if (unparsedShape === 'square') {
      return _types__WEBPACK_IMPORTED_MODULE_0__["Shape"].Square;
    } else if (unparsedShape === 'diamond') {
      return _types__WEBPACK_IMPORTED_MODULE_0__["Shape"].Diamond;
    }
  } else if (unparsedShape === _types__WEBPACK_IMPORTED_MODULE_0__["Shape"].Square || unparsedShape === _types__WEBPACK_IMPORTED_MODULE_0__["Shape"].Diamond || unparsedShape === _types__WEBPACK_IMPORTED_MODULE_0__["Shape"].Circle) {
    return unparsedShape;
  }

  return _types__WEBPACK_IMPORTED_MODULE_0__["Shape"].Circle;
}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/impl/index.ts":
/*!********************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/impl/index.ts ***!
  \********************************************************************************************************************************************************/
/*! exports provided: NodeImpl, parseShape, AnimatableNodeImpl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NodeImpl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NodeImpl */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/impl/NodeImpl.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NodeImpl", function() { return _NodeImpl__WEBPACK_IMPORTED_MODULE_0__["NodeImpl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseShape", function() { return _NodeImpl__WEBPACK_IMPORTED_MODULE_0__["parseShape"]; });

/* harmony import */ var _AnimatableNodeImpl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AnimatableNodeImpl */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/impl/AnimatableNodeImpl.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimatableNodeImpl", function() { return _AnimatableNodeImpl__WEBPACK_IMPORTED_MODULE_1__["AnimatableNodeImpl"]; });

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */



/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/index.ts":
/*!***************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/index.ts ***!
  \***************************************************************************************************************************************************/
/*! exports provided: createNodeStore, NodeImpl, parseShape, AnimatableNodeImpl, nodeType, ADDITIONAL_NODE_PROPS, nodeMemoryLayout, nodeTypedOffset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/store.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createNodeStore", function() { return _store__WEBPACK_IMPORTED_MODULE_0__["createNodeStore"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/types.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _impl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./impl */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/impl/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NodeImpl", function() { return _impl__WEBPACK_IMPORTED_MODULE_2__["NodeImpl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseShape", function() { return _impl__WEBPACK_IMPORTED_MODULE_2__["parseShape"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimatableNodeImpl", function() { return _impl__WEBPACK_IMPORTED_MODULE_2__["AnimatableNodeImpl"]; });

/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layout */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/layout.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nodeType", function() { return _layout__WEBPACK_IMPORTED_MODULE_3__["nodeType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ADDITIONAL_NODE_PROPS", function() { return _layout__WEBPACK_IMPORTED_MODULE_3__["ADDITIONAL_NODE_PROPS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nodeMemoryLayout", function() { return _layout__WEBPACK_IMPORTED_MODULE_3__["nodeMemoryLayout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nodeTypedOffset", function() { return _layout__WEBPACK_IMPORTED_MODULE_3__["nodeTypedOffset"]; });

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */





/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/layout.ts":
/*!****************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/layout.ts ***!
  \****************************************************************************************************************************************************/
/*! exports provided: nodeType, ADDITIONAL_NODE_PROPS, nodeMemoryLayout, nodeTypedOffset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nodeType", function() { return nodeType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADDITIONAL_NODE_PROPS", function() { return ADDITIONAL_NODE_PROPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nodeMemoryLayout", function() { return nodeMemoryLayout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nodeTypedOffset", function() { return nodeTypedOffset; });
/* harmony import */ var _graspologic_memstore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @graspologic/memstore */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/index.ts");
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * The unique symbol for a node
 */

const nodeType = Symbol('@graspologic::node');
/**
 * @internal
 *
 * The set of additional node properties
 */

const ADDITIONAL_NODE_PROPS = ['id', 'group', 'label', 'data', {
  name: 'mass',
  ephemeral: true,
  initialValue: 0
}, {
  name: 'dx',
  ephemeral: true,
  initialValue: 0
}, {
  name: 'dy',
  ephemeral: true,
  initialValue: 0
}, {
  name: 'old_dx',
  ephemeral: true,
  initialValue: 0
}, {
  name: 'old_dy',
  ephemeral: true,
  initialValue: 0
}, {
  name: 'convergence',
  ephemeral: true,
  initialValue: 1
}];
/**
 * @internal
 *
 * The internal memory layout of a Node
 */

const nodeMemoryLayout = Object(_graspologic_memstore__WEBPACK_IMPORTED_MODULE_0__["createLayoutBuilder"])() // Properties
.addFloat32('weight').addFloat32('radius', {
  aliases: [{
    name: 'size',
    type: _graspologic_memstore__WEBPACK_IMPORTED_MODULE_0__["AttributeType"].Float32
  }]
}).addUint8('fixed') // Colors
.addUint32('color').addUint32('color.start').addFloat32Vec2('color.tween', {
  components: ['color.duration', 'color.startTime']
}) // Position
.addFloat32Vec3('position', {
  components: ['x', 'y', 'z']
}).addFloat32Vec3('position.start').addFloat32Vec2('position.tween', {
  components: ['position.duration', 'position.startTime']
}) // Rendering Properties
.addFloat32('saturation').addUint8('shape').addUint8('visible', {
  hint: _graspologic_memstore__WEBPACK_IMPORTED_MODULE_0__["InterpretationHint"].Boolean
}).addUint8Vec3('pickingColor').build();
/**
 * Gets the typed offset for the given attribute
 */

function nodeTypedOffset(attribute) {
  var _nodeMemoryLayout$get;

  return (_nodeMemoryLayout$get = nodeMemoryLayout.get(attribute)) === null || _nodeMemoryLayout$get === void 0 ? void 0 : _nodeMemoryLayout$get.typedOffset;
}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/store.ts":
/*!***************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/store.ts ***!
  \***************************************************************************************************************************************************/
/*! exports provided: createNodeStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNodeStore", function() { return createNodeStore; });
/* harmony import */ var _impl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./impl */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/impl/index.ts");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layout */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/layout.ts");
/* harmony import */ var _graspologic_memstore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @graspologic/memstore */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/index.ts");
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */



/**
 * @internal
 *
 * Returns a data buffer to keep track of Nodes
 * @param capacity The initial capacity of the data buffer
 * @param engineTime Function to return the current engine time
 * @returns A data store capable of storing Node objects
 */

function createNodeStore(config) {
  const store = new _graspologic_memstore__WEBPACK_IMPORTED_MODULE_2__["ArrayStoreImpl"](_layout__WEBPACK_IMPORTED_MODULE_1__["nodeMemoryLayout"], config);
  const slotAllocator = new _graspologic_memstore__WEBPACK_IMPORTED_MODULE_2__["SlotAllocator"]( // We use the store capacity, cause it does some defaulting
  store.config.capacity, // If the user explicitly wanted capacity of 0,
  // ignore the allocatedOnCreate and assume nothing is used
  (config === null || config === void 0 ? void 0 : config.capacity) === 0 ? false : Boolean(config === null || config === void 0 ? void 0 : config.allocatedOnCreate));
  const Impl = (config === null || config === void 0 ? void 0 : config.animation) !== false ? _impl__WEBPACK_IMPORTED_MODULE_0__["AnimatableNodeImpl"] : _impl__WEBPACK_IMPORTED_MODULE_0__["NodeImpl"];
  return new _graspologic_memstore__WEBPACK_IMPORTED_MODULE_2__["ReaderStoreImpl"](Impl, store, slotAllocator);
}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/types.ts":
/*!***************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/node/types.ts ***!
  \***************************************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/types.ts":
/*!**********************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/primitives/types.ts ***!
  \**********************************************************************************************************************************************/
/*! exports provided: Shape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Shape", function() { return Shape; });
/**
 * The shape of an object
 */
var Shape;

(function (Shape) {
  Shape[Shape["Circle"] = 0] = "Circle";
  Shape[Shape["Square"] = 1] = "Square";
  Shape[Shape["Diamond"] = 2] = "Diamond";
})(Shape || (Shape = {}));

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/space/QuadTree.ts":
/*!********************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/space/QuadTree.ts ***!
  \********************************************************************************************************************************************/
/*! exports provided: QuadTree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuadTree", function() { return QuadTree; });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/helpers/index.ts");
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * @internal
 *
 * An implementation of a quad tree
 */

class QuadTree {
  /**
   * Constructor for QuadTree
   * @param nodes The nodes in the tree
   * @param level The level of this quad tree
   */
  constructor(nodes, level = 0) {
    this.mass = 0;
    /**
     * Center of mass X
     */

    this.cx = 0;
    /**
     * Center of mass Y
     */

    this.cy = 0;
    this.x0 = Number.POSITIVE_INFINITY;
    this.x1 = Number.NEGATIVE_INFINITY;
    this.y0 = Number.POSITIVE_INFINITY;
    this.y1 = Number.NEGATIVE_INFINITY;
    this.level = level;
    let node;
    let prevNode;
    let newMass;
    let numNodes = 0;

    for (node of nodes) {
      var _prevNode, _prevNode2;

      numNodes++; // jiggle nodes if they are co-located

      if (((_prevNode = prevNode) === null || _prevNode === void 0 ? void 0 : _prevNode.x) === node.x && ((_prevNode2 = prevNode) === null || _prevNode2 === void 0 ? void 0 : _prevNode2.y) === node.y) {
        node.x += Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["jiggle"])(1e-3);
        node.y += Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["jiggle"])(1e-3);
      } // Update center of mass


      newMass = node.mass + this.mass;
      this.cx = (node.x * node.mass + this.cx * this.mass) / newMass;
      this.cy = (node.y * node.mass + this.cy * this.mass) / newMass;
      this.mass = newMass; // Update bounds

      this.x0 = Math.min(this.x0, node.x);
      this.x1 = Math.max(this.x1, node.x);
      this.y0 = Math.min(this.y0, node.y);
      this.y1 = Math.max(this.y1, node.y);
      prevNode = node;
    }

    if (numNodes === 0) {
      throw new Error('there should be at least one node in a QuadTree node');
    } else if (numNodes === 1) {
      this.node = nodes[0];
    } else {
      const nwChildren = [];
      const neChildren = [];
      const swChildren = [];
      const seChildren = [];

      for (node of nodes) {
        if (node.y > this.cy) {
          if (node.x > this.cx) {
            neChildren.push(node);
          } else {
            nwChildren.push(node);
          }
        } else {
          if (node.x > this.cx) {
            seChildren.push(node);
          } else {
            swChildren.push(node);
          }
        }
      }

      if (neChildren.length > 0) {
        this.neChild = new QuadTree(neChildren, this.level + 1);
      }

      if (nwChildren.length > 0) {
        this.nwChild = new QuadTree(nwChildren, this.level + 1);
      }

      if (seChildren.length > 0) {
        this.seChild = new QuadTree(seChildren, this.level + 1);
      }

      if (swChildren.length > 0) {
        this.swChild = new QuadTree(swChildren, this.level + 1);
      }
    }
  }
  /**
   * Gets the depth of this quad tree
   * @returns The depth
   */


  get depth() {
    if (this.isLeaf) {
      return 0;
    } else {
      return 1 + Math.max(this.nwChild ? this.nwChild.depth : 0, this.neChild ? this.neChild.depth : 0, this.swChild ? this.swChild.depth : 0, this.seChild ? this.seChild.depth : 0);
    }
  }
  /**
   * Gets the size of the quad tree
   */


  get size() {
    return (this.x1 - this.x0) / 2;
  }
  /**
   * True if the quad tree is a leaf
   */


  get isLeaf() {
    return !this.nwChild && !this.neChild && !this.swChild && !this.seChild;
  }
  /**
   * Applies a visitor to the quad tree
   * @param callback The visitor
   */


  visit(callback) {
    const queue = [this];

    while (queue.length > 0) {
      const qt = queue.pop();
      const halt = callback(qt);

      if (!halt) {
        if (qt.nwChild) {
          queue.push(qt.nwChild);
        }

        if (qt.neChild) {
          queue.push(qt.neChild);
        }

        if (qt.swChild) {
          queue.push(qt.swChild);
        }

        if (qt.seChild) {
          queue.push(qt.seChild);
        }
      }
    }
  }

}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/space/index.ts":
/*!*****************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/space/index.ts ***!
  \*****************************************************************************************************************************************/
/*! exports provided: squareDistanceTo, distanceTo, weightedCentroid, QuadTree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _measure__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./measure */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/space/measure.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "squareDistanceTo", function() { return _measure__WEBPACK_IMPORTED_MODULE_0__["squareDistanceTo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "distanceTo", function() { return _measure__WEBPACK_IMPORTED_MODULE_0__["distanceTo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "weightedCentroid", function() { return _measure__WEBPACK_IMPORTED_MODULE_0__["weightedCentroid"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/space/types.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _QuadTree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./QuadTree */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/space/QuadTree.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuadTree", function() { return _QuadTree__WEBPACK_IMPORTED_MODULE_2__["QuadTree"]; });

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */




/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/space/measure.ts":
/*!*******************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/space/measure.ts ***!
  \*******************************************************************************************************************************************/
/*! exports provided: squareDistanceTo, distanceTo, weightedCentroid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squareDistanceTo", function() { return squareDistanceTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distanceTo", function() { return distanceTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "weightedCentroid", function() { return weightedCentroid; });
/**
 * @internal
 *
 * Computes the square distance between the two points
 * @param pos1 The first position
 * @param pos2 The second position
 * @returns The square distance
 */
function squareDistanceTo(pos1, pos2) {
  const dx = pos2.x - pos1.x;
  const dy = pos2.y - pos1.y;
  return dx ** 2 + dy ** 2;
}
/**
 * @internal
 *
 * Computes the euclidean distance between the two points
 * @param pos1 The first position
 * @param pos2 The second position
 * @returns The distance
 */

function distanceTo(pos1, pos2) {
  return Math.sqrt(squareDistanceTo(pos1, pos2));
}
/**
 * @internal
 * Computes the the weighted center of the given positions, using the given weights
 * @param points The list of points
 * @param weights The list of weights
 * @returns The weighted centroid
 */

function weightedCentroid(points, weights) {
  if (points.length === 0) {
    throw new Error('could not compute centroid out of zero points');
  }

  if (points.length !== weights.length) {
    throw new Error('points array and weights array must be the same length');
  }

  let xSum = 0.0;
  let ySum = 0.0;
  let totalWeight = 0.0;
  points.forEach((point, index) => {
    const weight = weights[index];
    totalWeight += weight;
    xSum += point.x * weight;
    ySum += point.y * weight;
  });
  const x = xSum / totalWeight;
  const y = ySum / totalWeight;
  return {
    x,
    y
  };
}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/space/types.ts":
/*!*****************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/space/types.ts ***!
  \*****************************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/clock/CountdownClock.ts":
/*!**************************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/clock/CountdownClock.ts ***!
  \**************************************************************************************************************************************************************/
/*! exports provided: CountdownClock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CountdownClock", function() { return CountdownClock; });
/**
 * @internal
 *
 * An implementation of a clock which will tick until it reaches a target tick count
 */
class CountdownClock {
  /**
   * Constructor for the countdown clock
   * @param targetTicks The target number of ticks to run
   */
  constructor(targetTicks) {
    this._ticks = 0;
    this._targetTicks = targetTicks;
  }
  /**
   * Gets the current ticks
   */


  get currentTicks() {
    return this._ticks;
  }
  /**
   * Gets the target ticks
   */


  get targetTicks() {
    return this._targetTicks;
  }
  /**
   * Ticks the current clock
   */


  tick() {
    this._ticks++;
    return this._ticks < this._targetTicks;
  }

}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/clock/index.ts":
/*!*****************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/clock/index.ts ***!
  \*****************************************************************************************************************************************************/
/*! exports provided: CountdownClock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CountdownClock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CountdownClock */ "../../../.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/clock/CountdownClock.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CountdownClock", function() { return _CountdownClock__WEBPACK_IMPORTED_MODULE_0__["CountdownClock"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "../../../.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/clock/types.ts");
/* empty/unused harmony star reexport *//*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */



/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/clock/types.ts":
/*!*****************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/clock/types.ts ***!
  \*****************************************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/index.ts":
/*!***********************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/index.ts ***!
  \***********************************************************************************************************************************************/
/*! exports provided: LayoutWorkerManager, workerFactoryFromScript, WorkerMessageType, BaseExecutor, CountdownClock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _workers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./workers */ "../../../.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/workers/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayoutWorkerManager", function() { return _workers__WEBPACK_IMPORTED_MODULE_0__["LayoutWorkerManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "workerFactoryFromScript", function() { return _workers__WEBPACK_IMPORTED_MODULE_0__["workerFactoryFromScript"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WorkerMessageType", function() { return _workers__WEBPACK_IMPORTED_MODULE_0__["WorkerMessageType"]; });

/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layout */ "../../../.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/layout/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseExecutor", function() { return _layout__WEBPACK_IMPORTED_MODULE_1__["BaseExecutor"]; });

/* harmony import */ var _clock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./clock */ "../../../.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/clock/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CountdownClock", function() { return _clock__WEBPACK_IMPORTED_MODULE_2__["CountdownClock"]; });

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */




/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/layout/BaseExecutor.ts":
/*!*************************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/layout/BaseExecutor.ts ***!
  \*************************************************************************************************************************************************************/
/*! exports provided: BaseExecutor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseExecutor", function() { return BaseExecutor; });
/* harmony import */ var _graspologic_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @graspologic/common */ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/index.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/**
 * @internal
 *
 * Base class for layout executors
 */

class BaseExecutor extends _graspologic_common__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"] {
  /**
   * Constructor for the base executor
   * @param graph The graph to run the layout on
   * @param config The configuration for the layout
   * @param clock The clock which is used to indicate when a layout cycle has occurred
   * @param globalObject The "global" object environment
   */
  constructor(graph, config, clock, globalObject) {
    super();
    this._halted = false;
    this._complete = false;
    this._clock = clock;
    this._graph = graph;
    this._global = globalObject;
    this._configuration = config;
    this.executeStep = this.executeStep.bind(this);
    globalObject.console.log(`create new ${this.getName()} instance`, this._configuration);
  }
  /**
   * Halts the layout process
   */


  halt() {
    this._halted = true;
  }
  /**
   * Returns true if the layout is halted
   */


  get isHalted() {
    return this._halted;
  }
  /**
   * Returns true if the layout is completed
   */


  get isComplete() {
    return this._complete;
  }
  /**
   * Gets the current clock
   */


  get clock() {
    return this._clock;
  }
  /**
   * Gets the current graph
   */


  get graph() {
    return this._graph;
  }
  /**
   * Gets the current global object
   */


  get globalObject() {
    return this._global;
  }
  /**
   * Gets the current configuration
   */


  get configuration() {
    return this._configuration;
  }
  /**
   * Configures the executor
   * @param config The layout config
   */


  configure(config) {
    this._configuration = _objectSpread(_objectSpread({}, this.defaultConfiguration), config);
  }
  /**
   * Executes the layout process
   */


  execute() {
    this._global.console.log(`execute ${this.getName()}, %s nodes, %s edges`, this.graph.nodes.count, this.graph.edges.count);

    this._halted = false;
    this._complete = false;
    this.clearTickListener();
    return new Promise(resolve => {
      this.executeStep();
      this._tickListener = this.on('tick', () => {
        if (this._complete) {
          resolve(this.getProgress());
          this.clearTickListener();
        }
      });
    });
  }
  /**
   * Clears the tick listener
   */


  clearTickListener() {
    if (this._tickListener) {
      this._tickListener();

      this._tickListener = undefined;
    }
  }
  /**
   * Executes one step of the layout algorithm
   */


  executeStep() {
    this.performUnitOfWork(); // Advance the annealing clock

    const ticking = this._clock.tick();

    if (!ticking) {
      this._complete = true;
    } // Perform the next layout step on the event queue


    if (ticking && !this._halted) {
      this._global.setTimeout(this.executeStep, 0);
    } // Emit the tick event


    this.emit('tick', this.getProgress());
  }

}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/layout/index.ts":
/*!******************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/layout/index.ts ***!
  \******************************************************************************************************************************************************/
/*! exports provided: BaseExecutor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BaseExecutor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseExecutor */ "../../../.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/layout/BaseExecutor.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseExecutor", function() { return _BaseExecutor__WEBPACK_IMPORTED_MODULE_0__["BaseExecutor"]; });

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */


/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/workers/LayoutWorkerManager.ts":
/*!*********************************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/workers/LayoutWorkerManager.ts ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: LayoutWorkerManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutWorkerManager", function() { return LayoutWorkerManager; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "../../../.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/workers/types.ts");
/* harmony import */ var _graspologic_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @graspologic/common */ "../../../.yarn/__virtual__/@graspologic-common-virtual-0d8c0ab72a/1/packages/libs/common/src/index.ts");
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */


/**
 * A manager class for using webworker-based layout execution
 */

class LayoutWorkerManager extends _graspologic_common__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"] {
  /**
   * Constructor for the LayoutWorkerManager
   * @param createWorker A callback for instantiating the worker
   */
  constructor(createWorker) {
    super();
    this._configuration = {};
    this._createWorker = createWorker;
  }
  /**
   * Configures the layout worker
   * @param configuration The configuration options for the layout worker
   */


  configure(configuration) {
    this._configuration = configuration;
  }
  /**
   * Performs the layout on the given graph
   * @param graph The graph to perform the layout on
   * @returns A promise for when the layout is completed
   */


  layout(graph) {
    this._worker = this._createWorker(); // Listen for completion

    const result = new Promise((resolve, reject) => {
      this._worker.onmessage = ev => {
        const {
          type,
          payload
        } = ev.data;

        if (type === _types__WEBPACK_IMPORTED_MODULE_0__["WorkerMessageType"].Progress) {
          this.emit('progress', payload);
        } else if (type === _types__WEBPACK_IMPORTED_MODULE_0__["WorkerMessageType"].Complete) {
          this.reset();
          resolve(payload);
        } else if (type === _types__WEBPACK_IMPORTED_MODULE_0__["WorkerMessageType"].Error) {
          this.reset();
          reject(payload);
        }
      };
    }); // kick off the layout

    this.sendMessage(_types__WEBPACK_IMPORTED_MODULE_0__["WorkerMessageType"].Execute, {
      graph: graph.serialize(),
      configuration: this._configuration
    });
    return result;
  }
  /**
   * Resets the layout worker to it's initial state
   */


  reset() {
    if (this._worker) {
      this._worker.terminate();

      this._worker = undefined;
    }
  }
  /**
   * Stops the current layout process
   */


  halt() {
    this.sendMessage(_types__WEBPACK_IMPORTED_MODULE_0__["WorkerMessageType"].Halt);
  }
  /**
   * Resumes the current layout process
   */


  resume() {
    this.sendMessage(_types__WEBPACK_IMPORTED_MODULE_0__["WorkerMessageType"].Resume);
  }
  /**
   * Sends a message to the layout worker
   * @param type The message type
   * @param payload The payload
   * @param share The data to share
   */


  sendMessage(type, payload, share) {
    if (this._worker) {
      this._worker.postMessage({
        type,
        payload
      }, share || []);
    }
  }

}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/workers/index.ts":
/*!*******************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/workers/index.ts ***!
  \*******************************************************************************************************************************************************/
/*! exports provided: LayoutWorkerManager, workerFactoryFromScript, WorkerMessageType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LayoutWorkerManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LayoutWorkerManager */ "../../../.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/workers/LayoutWorkerManager.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayoutWorkerManager", function() { return _LayoutWorkerManager__WEBPACK_IMPORTED_MODULE_0__["LayoutWorkerManager"]; });

/* harmony import */ var _workerFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./workerFactory */ "../../../.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/workers/workerFactory.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "workerFactoryFromScript", function() { return _workerFactory__WEBPACK_IMPORTED_MODULE_1__["workerFactoryFromScript"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "../../../.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/workers/types.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WorkerMessageType", function() { return _types__WEBPACK_IMPORTED_MODULE_2__["WorkerMessageType"]; });

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */




/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/workers/types.ts":
/*!*******************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/workers/types.ts ***!
  \*******************************************************************************************************************************************************/
/*! exports provided: WorkerMessageType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkerMessageType", function() { return WorkerMessageType; });
/**
 * @internal
 *
 * The type of message for Manager <-> Worker communication
 */
var WorkerMessageType;

(function (WorkerMessageType) {
  // Manager -> Worker

  /**
   * Tells the worker to configure itself
   */
  WorkerMessageType["Configure"] = "CONFIGURE";
  /**
   * Tells the worker to execute the layout
   */

  WorkerMessageType["Execute"] = "EXECUTE";
  /**
   * Tells the worker to halt layout
   */

  WorkerMessageType["Halt"] = "HALT";
  /**
   * Tells the worker to resume layout
   */

  WorkerMessageType["Resume"] = "RESUME";
  /**
   * Tells the worker to reset it's to the initial state
   */

  WorkerMessageType["Reset"] = "RESET"; // Worker -> Manager

  /**
   * Tells the manager that the worker experienced an error
   */

  WorkerMessageType["Error"] = "ERROR";
  /**
   * Tells the manager that progress has occurred on the graph layout
   */

  WorkerMessageType["Progress"] = "PROGRESS";
  /**
   * Tells the manager that the worker has completed layout of the graph
   */

  WorkerMessageType["Complete"] = "COMPLETE";
})(WorkerMessageType || (WorkerMessageType = {}));

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/workers/workerFactory.ts":
/*!***************************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/workers/workerFactory.ts ***!
  \***************************************************************************************************************************************************************/
/*! exports provided: workerFactoryFromScript */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "workerFactoryFromScript", function() { return workerFactoryFromScript; });
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
function workerFactoryFromScript(workerScript) {
  const blob = new Blob([workerScript], {
    type: 'text/javascript'
  });
  const blobUrl = window.URL.createObjectURL(blob);
  return () => new Worker(blobUrl);
}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/AnnealingClock.ts":
/*!**************************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/AnnealingClock.ts ***!
  \**************************************************************************************************************************************************************/
/*! exports provided: AnnealingClock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnealingClock", function() { return AnnealingClock; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "../../../.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/types.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * @internal
 *
 * A type of clock that uses simulated annealing through several phases
 */

class AnnealingClock {
  constructor(edgeCut = 0.8, schedule = {}) {
    this._phase = _types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Initial;
    this._iteration = 0;
    this._phaseIteration = 0; // annealing state

    this._temperature = 0;
    this._attraction = 0;
    this._damping = 0; // establish the schedule

    this._schedule = _objectSpread(_objectSpread({}, DEFAULT_SCHEDULE), schedule);
    this._targetIterations = Object.values(this._schedule).map(v => v.iterations).reduce((prev, curr) => prev + curr, 0); // Taken from the python init_params method

    this._minEdges = 20.000001;
    this._cutEnd = 40000.0 * (1.0 - edgeCut);
    this._cutLengthEnd = this._cutEnd < 1 ? 1 : this._cutEnd;
    this._cutLengthStart = 4.0 * this._cutLengthEnd;
    this._cutOffLength = this._cutLengthStart;
    this._cutRate = (this._cutLengthStart - this._cutLengthEnd) / 400;
    this.schedulePhase(_types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Initial);
  }
  /**
   * Gets the current phase
   */


  get phase() {
    return this._phase;
  }
  /**
   * Determines if annealing is complete
   */


  get isComplete() {
    return this._phase === _types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Complete;
  }
  /**
   * Gets the current iteration
   */


  get iteration() {
    return this._iteration;
  }
  /**
   * Gets the current phase iteration
   */


  get phaseIteration() {
    return this._phaseIteration;
  }
  /**
   * Gets the target phase iterations
   */


  get targetPhaseIterations() {
    return this.phase != null ? this.schedule[this.phase].iterations : 0;
  }
  /**
   * Gets the target number of iterations
   */


  get targetIterations() {
    return this._targetIterations;
  }

  get attraction() {
    return this._attraction;
  }

  get temperature() {
    return this._temperature;
  }

  get damping() {
    return this._damping;
  }

  get minEdges() {
    return this._minEdges;
  }
  /**
   * Gets the annealing schedule
   */


  get schedule() {
    return this._schedule;
  }

  get cutEnd() {
    return this._cutEnd;
  }

  get cutOffLength() {
    return this._cutOffLength;
  }

  get neighborCutsEnabled() {
    switch (this.phase) {
      case _types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Liquid:
      case _types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Expansion:
      case _types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Cooldown:
      case _types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Crunch:
        return true;

      default:
        return false;
    }
  }
  /**
   * Runs an annealing iteration
   * @returns True if an iteration was run
   */


  tick() {
    if (this.isComplete) {
      return false;
    } else {
      this._iteration += 1;
      this._phaseIteration += 1;

      if (this.phaseIteration >= this.targetPhaseIterations) {
        this.handlePhaseComplete();
      } else {
        this.handlePhaseTick();
      }

      return true;
    }
  }
  /**
   * Handler for when a tick occurs
   */


  handlePhaseTick() {
    if (this.phase === _types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Expansion) {
      this._cutLengthEnd -= this._cutRate;

      if (this.attraction > 1.0) {
        this._attraction -= 0.05;
      }

      if (this.minEdges > 12.0) {
        this._minEdges -= 0.05;
      }

      if (this.damping > 0.1) {
        this._damping -= 0.005;
      }
    } else if (this.phase === _types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Cooldown) {
      if (this.temperature > 50.0) {
        this._temperature -= 10.0;
      }

      if (this._cutOffLength > this._cutLengthEnd) {
        this._cutOffLength -= this._cutRate * 2.0;
      }

      if (this.minEdges > 1.0) {
        this._minEdges -= 0.2;
      }
    }
  }
  /**
   * Handler for when a phase has completed
   */


  handlePhaseComplete() {
    this._phaseIteration = 0;

    if (this.phase === _types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Initial) {
      return this.schedulePhase(_types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Liquid);
    } else if (this.phase === _types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Liquid) {
      return this.schedulePhase(_types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Expansion);
    } else if (this.phase === _types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Expansion) {
      this._minEdges = 12.0000000001;
      return this.schedulePhase(_types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Cooldown);
    } else if (this.phase === _types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Cooldown) {
      this._minEdges = 1.0 + 0.00000000000001;
      this._cutOffLength = this._cutLengthEnd;
      return this.schedulePhase(_types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Crunch);
    } else if (this.phase === _types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Crunch) {
      // TODO REMOVE, this is functionally eliminated
      this._minEdges = 99.0;
      return this.schedulePhase(_types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Simmer);
    } else if (this.phase === _types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Simmer) {
      return this.schedulePhase(_types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Complete);
    }
  }
  /**
   * Schedules __phase__ to run on the next iteration
   * @param phase The phase to schedule
   */


  schedulePhase(phase) {
    var _this$schedule$phase;

    this._phase = phase;

    if (((_this$schedule$phase = this.schedule[phase]) === null || _this$schedule$phase === void 0 ? void 0 : _this$schedule$phase.iterations) > 0) {
      this._temperature = this.schedule[phase].temperature;
      this._attraction = this.schedule[phase].attraction;
      this._damping = this.schedule[phase].damping;
    } else {
      if (phase === _types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Initial) {
        this.schedulePhase(_types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Liquid);
      } else if (phase === _types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Liquid) {
        this.schedulePhase(_types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Expansion);
      } else if (phase === _types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Cooldown) {
        this.schedulePhase(_types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Crunch);
      } else if (phase === _types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Crunch) {
        this.schedulePhase(_types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Simmer);
      } else if (phase === _types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Simmer) {
        this._phase = _types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Complete;
      }
    }
  }

  get energyDistancePower() {
    switch (this.phase) {
      case _types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Liquid:
        return 4;

      case _types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Expansion:
        return 2;

      default:
        return 1;
    }
  }

  get useFineDensity() {
    return this.phase === _types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Simmer;
  }

}
/**
 * @internal
 *
 * The default schedule used during layout
 */

const DEFAULT_SCHEDULE = {
  [_types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Initial]: {
    iterations: 1,
    temperature: 2000,
    attraction: 10,
    damping: 1
  },
  [_types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Liquid]: {
    iterations: 200,
    temperature: 2000,
    attraction: 2,
    damping: 1
  },
  [_types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Expansion]: {
    iterations: 200,
    temperature: 2000,
    attraction: 10,
    damping: 1
  },
  [_types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Cooldown]: {
    iterations: 200,
    temperature: 2000,
    attraction: 1,
    damping: 0.1
  },
  [_types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Crunch]: {
    iterations: 50,
    temperature: 250,
    attraction: 1.0,
    damping: 0.25
  },
  [_types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Simmer]: {
    iterations: 100,
    temperature: 250,
    attraction: 0.5,
    damping: 0
  },
  [_types__WEBPACK_IMPORTED_MODULE_0__["AnnealingPhase"].Complete]: {
    iterations: 0,
    temperature: 0,
    attraction: 0,
    damping: 0
  }
};

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/DensityGrid.ts":
/*!***********************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/DensityGrid.ts ***!
  \***********************************************************************************************************************************************************/
/*! exports provided: GRID_SIZE, RADIUS, DIAMETER, FALLOFF, DensityGrid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GRID_SIZE", function() { return GRID_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RADIUS", function() { return RADIUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DIAMETER", function() { return DIAMETER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FALLOFF", function() { return FALLOFF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DensityGrid", function() { return DensityGrid; });
/* harmony import */ var _graspologic_graph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @graspologic/graph */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/index.ts");
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

const GRID_SIZE = 1000;
const RADIUS = 10;
const DIAMETER = 2 * RADIUS;
const FALLOFF = getInitialFalloffStructure();
/**
 * @internal
 *
 * A node density grid to track the density of nodes in a grid pattern
 */

class DensityGrid {
  constructor() {
    this.initialLoad = true;
    this._bitmap = getInitialDensityBitmap();
    this._bins = getInitialDensityBins();
    this._trackedNodes = new Set();
  }
  /**
   * Determines whether the given node is in the denisty grid
   * @param id The node id
   */


  contains(node) {
    return this._trackedNodes.has(node.storeId);
  }
  /**
   * Gets the number of tracked nodes in the grid
   */


  get size() {
    return this._trackedNodes.size;
  }
  /**
   * Gets the density bitmap
   */


  get bitmap() {
    return this._bitmap;
  }

  get checksum() {
    let result = 0;

    for (let i = 0; i < GRID_SIZE; ++i) {
      for (let j = 0; j < GRID_SIZE; ++j) {
        result += this._bitmap[i][j];
      }
    }

    return result;
  }
  /**
   * Adds a node to the density grid
   * @param node The node to add to the density grid
   */


  add(node) {
    if (this.contains(node)) {
      throw new Error(`cannot add node ${node.storeId} to density grid twice`);
    }

    this._trackedNodes.add(node.storeId);

    this.addToBins(node);
    this.addToBitmap(node);
  }
  /**
   * Subtracts a node from the density grid
   */


  subtract(node) {
    if (!this.contains(node)) {
      throw new Error(`cannot remove node ${node.storeId}from density grid`);
    }

    this._trackedNodes.delete(node.storeId);

    this.subtractFromBitmap(node);
    this.subtractFromBins(node);
  }

  addToBitmap(node) {
    const xGrid = gridIndex(node.x) - RADIUS;
    const yGrid = gridIndex(node.y) - RADIUS;

    for (let i = 0; i <= DIAMETER; ++i) {
      for (let j = 0; j <= DIAMETER; ++j) {
        const xIndex = xGrid + j;
        const yIndex = yGrid + i;

        if (isValidIndex(xIndex, yIndex)) {
          this._bitmap[yIndex][xIndex] += FALLOFF[i][j];
        }
      }
    }
  }

  subtractFromBitmap(node) {
    const xGrid = gridIndex(node.x) - RADIUS;
    const yGrid = gridIndex(node.y) - RADIUS;

    for (let i = 0; i <= DIAMETER; ++i) {
      for (let j = 0; j <= DIAMETER; ++j) {
        const xIndex = xGrid + j;
        const yIndex = yGrid + i;

        if (isValidIndex(xIndex, yIndex)) {
          this.bitmap[yIndex][xIndex] -= FALLOFF[i][j];
        }
      }
    }
  }

  addToBins(node) {
    const xGrid = gridIndex(node.x);
    const yGrid = gridIndex(node.y);
    verifyGridIndices(xGrid, yGrid);
    const bin = this._bins[yGrid][xGrid];
    bin[node.storeId] = node;
  }

  subtractFromBins(node) {
    const xGrid = gridIndex(node.x);
    const yGrid = gridIndex(node.y);
    verifyGridIndices(xGrid, yGrid);
    const bin = this._bins[yGrid][xGrid];

    if (bin[node.storeId]) {
      delete bin[node.storeId];
    }
  } // gets the density at a given position excluding the given node's contribution.
  // the node must be inserted into the denisty grid


  getDensity(node, testPosition, fine = false) {
    const INFINITE_DENSITY = 10000.0;

    if (Number.isNaN(testPosition.x) || Number.isNaN(testPosition.y)) {
      throw new Error('test position has NaN component');
    } else if (!isQueryInBounds(testPosition)) {
      return INFINITE_DENSITY;
    } else if (fine) {
      return this.getFineDensity(node, testPosition);
    } else {
      return this.getCoarseDensity(node, testPosition);
    }
  }

  getFineDensity(node, position) {
    const xGrid = gridIndex(position.x);
    const yGrid = gridIndex(position.y);
    let density = 0.0;
    let i;
    let j;
    let id;

    for (i = yGrid - 1; i <= yGrid + 1; ++i) {
      for (j = xGrid - 1; j <= xGrid + 1; ++j) {
        const bin = this._bins[i][j];

        for (id of Object.keys(bin)) {
          // exclude the current id so we don't have to do removals before density checks
          // This allows the density grid to be read-only in the update phase
          if (parseInt(id, 10) !== node.storeId) {
            const binItemPos = bin[id];
            const distance = Object(_graspologic_graph__WEBPACK_IMPORTED_MODULE_0__["squareDistanceTo"])(position, binItemPos);
            density += 1e-4 / (distance + 1e-50);
          }
        }
      }
    }

    return density;
  }

  getOverlap(node, position) {
    const xGrid = gridIndex(position.x);
    const yGrid = gridIndex(position.y);
    let overlap = 0.0;
    let i;
    let j;
    let id;

    for (i = yGrid - 1; i <= yGrid + 1; ++i) {
      for (j = xGrid - 1; j <= xGrid + 1; ++j) {
        const bin = this._bins[i][j];

        for (id of Object.keys(bin)) {
          // exclude the current id so we don't have to do removals before density checks
          // This allows the density grid to be read-only in the update phase
          if (parseInt(id, 10) !== node.storeId) {
            const other = bin[id];
            const distance = Object(_graspologic_graph__WEBPACK_IMPORTED_MODULE_0__["distanceTo"])(position, other);
            const nodeEdgeDistance = distance - node.size - other.size;

            if (nodeEdgeDistance < 0) {
              overlap += Math.abs(nodeEdgeDistance);
            }
          }
        }
      }
    }

    return overlap;
  }

  getCoarseDensity(node, position) {
    const xGrid = gridIndex(position.x);
    const yGrid = gridIndex(position.y); // Ignore the splash density of the node value

    const ignorable = this.getDensityToExcludeAtPoint(node, position);
    const gridValue = this._bitmap[yGrid][xGrid];
    const density = gridValue - ignorable;
    return density ** 2;
  } // density queries ignore the density of the node being moved. This calculates the density value
  // to ignore


  getDensityToExcludeAtPoint(node, position) {
    const nxGrid = gridIndex(node.x);
    const nyGrid = gridIndex(node.y);
    const xGrid = gridIndex(position.x);
    const yGrid = gridIndex(position.y);
    const xDist = xGrid - nxGrid;
    const yDist = yGrid - nyGrid;
    const isNodeApplicable = !this.initialLoad && this.contains(node) && Math.abs(xDist) < RADIUS && Math.abs(yDist) < RADIUS;
    return isNodeApplicable ? FALLOFF[Math.floor(RADIUS + yDist)][Math.floor(RADIUS + xDist)] : 0.0;
  }

}
/**
 * Gets the initial density bitmap to use
 */

function getInitialDensityBitmap() {
  const result = []; // Set up a density grid of zero-values and empty bins for each grid cell

  for (let i = 0; i < GRID_SIZE; ++i) {
    const row = new Float32Array(GRID_SIZE);
    result.push(row);

    for (let j = 0; j < GRID_SIZE; ++j) {
      row[j] = 0;
    }
  }

  return result;
}
/**
 * Gets the initial density bins to use
 */


function getInitialDensityBins() {
  const result = []; // Set up a density grid of zero-values and empty bins for each grid cell

  for (let i = 0; i < GRID_SIZE; ++i) {
    const row = [];
    result.push(row);

    for (let j = 0; j < GRID_SIZE; ++j) {
      row.push({});
    }
  }

  return result;
}
/**
 * gets the falloff structure to use for density insertion
 */


function getInitialFalloffStructure() {
  const result = [];

  for (let i = -RADIUS; i <= RADIUS; ++i) {
    result[i + RADIUS] = [];

    for (let j = -RADIUS; j <= RADIUS; ++j) {
      const radius = RADIUS;
      const iAbs = Math.abs(i);
      const jAbs = Math.abs(j);
      const iFac = (radius - iAbs) / radius;
      const jFac = (radius - jAbs) / radius;
      const falloffValue = iFac * jFac;
      result[i + RADIUS][j + RADIUS] = falloffValue;
    }
  }

  return result;
}

function gridIndex(value) {
  const viewToGrid = 0.25;
  const halfView = GRID_SIZE * 2.0;
  const result = Math.floor((value + halfView + 0.5) * viewToGrid);
  return Math.max(0, Math.min(result, GRID_SIZE - 1));
}

function verifyGridIndices(xGrid, yGrid) {
  if (xGrid >= GRID_SIZE || yGrid >= GRID_SIZE) {
    throw new Error(`invalid grid storeId: (${xGrid}, ${yGrid})`);
  }
}

function isQueryInBounds(position) {
  const boundary = 10;
  const xGrid = gridIndex(position.x);
  const yGrid = gridIndex(position.y);

  const isOutOfBounds = idx => idx > GRID_SIZE - boundary || idx < boundary;

  return !isOutOfBounds(xGrid) && !isOutOfBounds(yGrid);
}

function isValidIndex(xIndex, yIndex) {
  return yIndex >= 0 && xIndex >= 0 && yIndex < GRID_SIZE && xIndex < GRID_SIZE;
}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/OpenOrdLayoutExecutor.ts":
/*!*********************************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/OpenOrdLayoutExecutor.ts ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: OpenOrdLayoutExecutor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpenOrdLayoutExecutor", function() { return OpenOrdLayoutExecutor; });
/* harmony import */ var _jumps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jumps */ "../../../.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/jumps.ts");
/* harmony import */ var _sampleBitmap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sampleBitmap */ "../../../.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/sampleBitmap.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "../../../.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/types.ts");
/* harmony import */ var _graspologic_graph__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @graspologic/graph */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/index.ts");
/* harmony import */ var _graspologic_layout_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @graspologic/layout-core */ "../../../.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/index.ts");





/**
 * @internal
 *
 * A layout executor which will run the OpenOrd layout on a graph
 */

class OpenOrdLayoutExecutor extends _graspologic_layout_core__WEBPACK_IMPORTED_MODULE_4__["BaseExecutor"] {
  /**
   * Constructor for the OpenOrdLayoutExecutor
   * @param graph The graph to layout
   * @param configuration The configuration for the algorithm
   * @param clock The annealing clock which controls how long phases are run
   * @param globalObject The global object
   * @param densityGrid The node density grid
   */
  constructor(graph, configuration, clock, globalObject, densityGrid) {
    super(graph, configuration, clock, globalObject);
    this._densityGrid = densityGrid; // Randomize the graph layout if it's zeroed out

    let isZeroed = true;
    let node; // Randomize the graph layout if it's zeroed out

    for (node of this.graph.nodes) {
      if (node.x !== 0 || node.y !== 0) {
        isZeroed = false;
        break;
      }
    }

    if (isZeroed) {
      this.globalObject.console.log('randomizing layouts');

      for (node of this.graph.nodes) {
        node.x = Object(_graspologic_graph__WEBPACK_IMPORTED_MODULE_3__["randBetween"])(0, 1024);
        node.y = Object(_graspologic_graph__WEBPACK_IMPORTED_MODULE_3__["randBetween"])(0, 1024);
      }
    }

    this.initializeDensityGrid();
  }
  /**
   * Gets the name of the layout algorithm
   */


  getName() {
    return 'OpenOrd';
  }
  /**
   * Gets the density grid
   */


  get densityGrid() {
    return this._densityGrid;
  }
  /**
   * Gets the default configuration
   */


  get defaultConfiguration() {
    return _types__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_CONFIGURATION"];
  }
  /**
   * Constructs the tick progress object
   */


  getProgress() {
    const {
      phase,
      iteration,
      phaseIteration,
      targetPhaseIterations,
      targetIterations
    } = this.clock;
    const {
      emitDensitySnapshots,
      densitySnapshotSamplingRate,
      densitySnapshotEmitRate,
      emitEnergy,
      emitObjectiveEnergy
    } = this.configuration;
    const result = {
      clock: {
        phase,
        iteration,
        phaseIteration,
        targetIterations,
        targetPhaseIterations
      },
      densityGrid: {},
      metrics: {}
    };

    if (emitDensitySnapshots) {
      if (densitySnapshotEmitRate == null || this.clock.iteration % densitySnapshotEmitRate === 0) {
        result.densityGrid.bitmap = Object(_sampleBitmap__WEBPACK_IMPORTED_MODULE_1__["sampleBitmap"])(this.densityGrid, densitySnapshotSamplingRate);
      }
    }

    if (emitEnergy) {
      const energy = this.energy;
      result.metrics.energy = energy;
    }

    if (emitObjectiveEnergy) {
      const [objectiveEnergy, attractiveEnergy, repulsiveEnergy, overlapEnergy] = this.objectiveEnergy;
      result.metrics.objectiveEnergy = objectiveEnergy;
      result.metrics.attractiveEnergy = attractiveEnergy;
      result.metrics.repulsiveEnergy = repulsiveEnergy;
      result.metrics.overlapEnergy = overlapEnergy;
    }

    return result;
  }
  /**
   * Performs a single unit of work
   */


  performUnitOfWork() {
    if (this.configuration.iterativeForceModel) {
      this.performIterativeUnitOfWork();
    } else {
      this.performConcurrentUnitOfWork();
    }
  }
  /**
   * Initializes the internal density grid
   */


  initializeDensityGrid() {
    let node;

    for (node of this.graph.nodes) {
      this.densityGrid.add(node);
    }
  }
  /**
   * perform the unit of work (layout step) with a concurrent force model - updates are applied after they have all been computed
   */


  performConcurrentUnitOfWork() {
    let node;

    for (node of this.graph.nodes) {
      const update = this.computeNodeUpdate(node);
      this.applyUpdate(update);
    }
  }
  /**
   * perform the unit of work (layout step) with a iterative force model - updates are applied in series
   */


  performIterativeUnitOfWork() {
    let update;

    for (update of this.computeIterativeUpdates()) {
      this.applyUpdate(update);
    }
  }
  /**
   * This is a generator so that we can either resolve the updates iteratively using
   * a stochastic gradient descent method, or all at the same time using a force modeling
   * approach
   * @returns The updates for each of the nodes
   */


  *computeIterativeUpdates() {
    let node;

    for (node of this.graph.nodes) {
      yield this.computeNodeUpdate(node);
    }
  }

  computeNodeUpdate(node) {
    const [centroidJump, centroidEdgeCut] = this.computeCentroidJump(node);
    const centroidJumpEnergy = this.computeNodePosEnergy(node, centroidJump);
    const jumpScale = 0.01 * this.clock.temperature;
    const randJumpPosition = Object(_jumps__WEBPACK_IMPORTED_MODULE_0__["jumpRandom"])(centroidJump, jumpScale);
    const randJumpEnergy = this.computeNodePosEnergy(node, randJumpPosition);

    if (randJumpEnergy < centroidJumpEnergy) {
      return {
        node,
        kind: _types__WEBPACK_IMPORTED_MODULE_2__["NodeUpdateKind"].RandomJump,
        position: randJumpPosition,
        energy: randJumpEnergy
      };
    } else {
      return {
        node,
        kind: _types__WEBPACK_IMPORTED_MODULE_2__["NodeUpdateKind"].CentroidJump,
        position: centroidJump,
        energy: centroidJumpEnergy,
        prunedEdge: centroidEdgeCut
      };
    }
  }

  computeNodePosEnergy(node, position) {
    const attractive = this.nodeAttractiveForce(node, position);
    const repulsive = this.nodeRepulsiveForce(node, position);
    return attractive + repulsive;
  }

  nodeAttractiveForce(node, position) {
    //const attractionFactor = this.clock.attraction ** 4 * 2e-2
    const energyDistancePower = this.clock.energyDistancePower;
    let sum = 0.0;
    let neighborId;
    let neighbor;
    let weight;

    for (neighborId of this.graph.getNeighbors(node.storeId)) {
      neighbor = this.graph.nodes.itemAt(neighborId);
      weight = this.graph.getEdgeWeight(node.storeId, neighborId);

      if (weight != null) {
        const energyDistance = Object(_graspologic_graph__WEBPACK_IMPORTED_MODULE_3__["squareDistanceTo"])(position, neighbor) ** energyDistancePower;
        const neighborEnergy = weight * energyDistance; // * attractionFactor

        sum += neighborEnergy;
      }
    }

    return sum;
  }

  nodeRepulsiveForce(node, position) {
    return this.densityGrid.getDensity(node, position, this.clock.useFineDensity);
  }

  computeCentroidJump(node) {
    const isNeighborCutRequired = () => {
      // TODO: This turns on when users set the edge cut manually. It doesn't fire with the default
      // value of 0.8. Is this even useful?
      const cutEndActive = this.clock.cutEnd < 39500.9;

      const numNeighborsExceedsMin = () => {
        const numNeighbors = this.graph.getNeighbors(node.storeId).length;
        return numNeighbors > this.clock.minEdges;
      };

      return this.clock.neighborCutsEnabled && cutEndActive && numNeighborsExceedsMin();
    };

    const centroidPos = this.graph.getNeighborhoodCentroid(node.storeId);
    const jumpPos = Object(_jumps__WEBPACK_IMPORTED_MODULE_0__["jumpTowards"])(node, centroidPos, this.clock.damping);
    const jumpDist = Object(_graspologic_graph__WEBPACK_IMPORTED_MODULE_3__["squareDistanceTo"])(centroidPos, jumpPos);
    const prunedEdge = jumpDist > 0 && isNeighborCutRequired() ? this.getEdgeToCut(node, centroidPos) : undefined;
    return [jumpPos, prunedEdge];
  }

  getEdgeToCut(node, centroidPos) {
    const neighbors = this.graph.getNeighbors(node.storeId);
    const squareConnections = Math.sqrt(neighbors.length);
    let maxDistance = 0.0;
    let maxNeighbor;
    neighbors.forEach(neighborId => {
      const neighbor = this.graph.nodes.itemAt(neighborId);
      const distance = Object(_graspologic_graph__WEBPACK_IMPORTED_MODULE_3__["squareDistanceTo"])(centroidPos, neighbor) * squareConnections;

      if (distance > maxDistance && distance > this.clock.cutOffLength) {
        maxDistance = distance;
        maxNeighbor = neighborId;
      }
    });
    return maxNeighbor;
  }

  applyUpdate({
    node,
    position,
    prunedEdge
  }) {
    if (this.densityGrid.contains(node)) {
      this.densityGrid.subtract(node);
    } // Move node position


    node.x = position.x;
    node.y = position.y;

    if (prunedEdge) {
      this.graph.pruneEdge(node.storeId, prunedEdge);
    }

    this.densityGrid.add(node);
  }
  /**
   * Gets the working energy. This differs from the objective energy in that we cull low-weight edges as the
   * algorithm progresses. The objective energy keep these in tact.
   */


  get energy() {
    let result = 0;
    let node;

    for (node of this.graph.nodes) {
      result += this.computeNodePosEnergy(node, node);
    }

    return result;
  }
  /**
   * Gets the objective energy according to Equation 1 of the OpenOrd Paper
   *
   * https://www.researchgate.net/publication/253087985_OpenOrd_An_Open-Source_Toolbox_for_Large_Graph_Layout
   */


  get objectiveEnergy() {
    let attractiveEnergy = 0;
    let repulsiveEnergy = 0;
    let overlapEnergy = 0.001;
    let node;
    let neighbor;

    for (node of this.graph.nodes) {
      repulsiveEnergy += this.densityGrid.getDensity(node, node, false);

      if (this.clock.phase && this.clock.phase > _types__WEBPACK_IMPORTED_MODULE_2__["AnnealingPhase"].Liquid) {
        overlapEnergy += this.densityGrid.getOverlap(node, node);
      }

      for (neighbor of this.graph.getNeighborsObjective(node.storeId).map(nid => this.graph.nodes.itemAt(nid))) {
        const distance = Object(_graspologic_graph__WEBPACK_IMPORTED_MODULE_3__["squareDistanceTo"])(node, neighbor);
        const weight = this.graph.getEdgeWeightObjective(node.storeId, neighbor.storeId);
        attractiveEnergy += distance * weight;
      }
    }

    const objectiveEnergy = attractiveEnergy + repulsiveEnergy;
    return [objectiveEnergy, attractiveEnergy, repulsiveEnergy, overlapEnergy];
  }

}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/factory.ts":
/*!*******************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/factory.ts ***!
  \*******************************************************************************************************************************************************/
/*! exports provided: createInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createInstance", function() { return createInstance; });
/* harmony import */ var _AnnealingClock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnnealingClock */ "../../../.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/AnnealingClock.ts");
/* harmony import */ var _DensityGrid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DensityGrid */ "../../../.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/DensityGrid.ts");
/* harmony import */ var _OpenOrdLayoutExecutor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OpenOrdLayoutExecutor */ "../../../.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/OpenOrdLayoutExecutor.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "../../../.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/types.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */




/**
 * @internal
 *
 * Creates an instance of the OpenOrdLayoutExector
 * @param graph The graph to layout
 * @param configuration The layout configuration
 * @param globalObject The global object to use
 */

function createInstance(graph, configuration = {}, globalObject = window) {
  const finalConfig = _objectSpread(_objectSpread({}, _types__WEBPACK_IMPORTED_MODULE_3__["DEFAULT_CONFIGURATION"]), configuration);

  return new _OpenOrdLayoutExecutor__WEBPACK_IMPORTED_MODULE_2__["OpenOrdLayoutExecutor"](graph, finalConfig, new _AnnealingClock__WEBPACK_IMPORTED_MODULE_0__["AnnealingClock"](configuration.edgeCut, configuration.schedule), globalObject, new _DensityGrid__WEBPACK_IMPORTED_MODULE_1__["DensityGrid"]());
}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/jumps.ts":
/*!*****************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/jumps.ts ***!
  \*****************************************************************************************************************************************************/
/*! exports provided: jumpTowards, jumpRandom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jumpTowards", function() { return jumpTowards; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jumpRandom", function() { return jumpRandom; });
/**
 * @internal
 *
 * Moves __pos1__ closer to __pos2__ by a __damping__ factor
 * @param pos1 The start position
 * @param pos2 The end position
 * @param damping The damping factor
 */
function jumpTowards(pos1, pos2, damping) {
  if (damping < 0.0 || damping > 1.0) {
    throw new Error('jump factor must be between 0-1');
  } else {
    const inverse = 1.0 - damping;
    return {
      x: pos1.x * inverse + damping * pos2.x,
      y: pos1.y * inverse + damping * pos2.y
    };
  }
}
/**
 * @internal
 *
 * Moves __source__ a random __distance__ away from it's current position
 * @param source The source position
 * @param distance The distance of the jump
 */

function jumpRandom(source, distance) {
  const r1 = Math.random();
  const r2 = Math.random();
  const x = source.x + (0.5 - r1) * distance;
  const y = source.y + (0.5 - r2) * distance;
  return {
    x,
    y
  };
}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/sampleBitmap.ts":
/*!************************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/sampleBitmap.ts ***!
  \************************************************************************************************************************************************************/
/*! exports provided: sampleBitmap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sampleBitmap", function() { return sampleBitmap; });
/**
 * @internal
 *
 * Generates a sample bitmap from the given density grid
 * @param densityGrid The density grid to sample
 * @param rate The sampling rate. 1=full sample. 2=skip every other row+column
 */
function sampleBitmap(densityGrid, rate) {
  const bitmap = densityGrid.bitmap;
  const result = [];

  for (let rowIndex = 0; rowIndex < bitmap.length; rowIndex += rate) {
    const row = [];
    result.push(row);

    for (let colIndex = 0; colIndex < bitmap[0].length; colIndex += rate) {
      row.push(bitmap[rowIndex][colIndex]);
    }
  }

  return result;
}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/types.ts":
/*!*****************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/types.ts ***!
  \*****************************************************************************************************************************************************/
/*! exports provided: DEFAULT_CONFIGURATION, AnnealingPhase, getAnnealingPhaseString, NodeUpdateKind */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_CONFIGURATION", function() { return DEFAULT_CONFIGURATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnealingPhase", function() { return AnnealingPhase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAnnealingPhaseString", function() { return getAnnealingPhaseString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeUpdateKind", function() { return NodeUpdateKind; });
/**
 * @internal
 *
 * The default set of configuration options for the layout
 */
const DEFAULT_CONFIGURATION = Object.freeze({
  emitDensitySnapshots: false,
  densitySnapshotSamplingRate: 4,
  edgeCut: 0.8,
  schedule: {}
});
/**
 * @internal
 *
 * The phase of the layout
 */

var AnnealingPhase;

(function (AnnealingPhase) {
  AnnealingPhase[AnnealingPhase["Initial"] = 0] = "Initial";
  AnnealingPhase[AnnealingPhase["Liquid"] = 1] = "Liquid";
  AnnealingPhase[AnnealingPhase["Expansion"] = 2] = "Expansion";
  AnnealingPhase[AnnealingPhase["Cooldown"] = 3] = "Cooldown";
  AnnealingPhase[AnnealingPhase["Crunch"] = 4] = "Crunch";
  AnnealingPhase[AnnealingPhase["Simmer"] = 5] = "Simmer";
  AnnealingPhase[AnnealingPhase["Complete"] = 6] = "Complete";
})(AnnealingPhase || (AnnealingPhase = {}));
/**
 * @internal
 *
 * Gets a user friendly string of the given annealing phase
 * @param input The annealing phase
 */


function getAnnealingPhaseString(input) {
  switch (input) {
    case AnnealingPhase.Initial:
      return 'initial';

    case AnnealingPhase.Liquid:
      return 'liquid';

    case AnnealingPhase.Expansion:
      return 'expansion';

    case AnnealingPhase.Cooldown:
      return 'cooldown';

    case AnnealingPhase.Crunch:
      return 'crunch';

    case AnnealingPhase.Simmer:
      return 'simmer';

    default:
      return 'unknown';
  }
}
var NodeUpdateKind;

(function (NodeUpdateKind) {
  NodeUpdateKind[NodeUpdateKind["CentroidJump"] = 0] = "CentroidJump";
  NodeUpdateKind[NodeUpdateKind["RandomJump"] = 1] = "RandomJump";
})(NodeUpdateKind || (NodeUpdateKind = {}));

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/index.ts":
/*!*****************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/index.ts ***!
  \*****************************************************************************************************************************************/
/*! exports provided: DATA_TYPE_TO_BYTES, getAttributeTypeByteSize, SpacerAttributeName, createLayoutBuilder, getBytesPerItem, AttributeType, InterpretationHint, SlotAllocator, ArrayStoreImpl, IdStoreImpl, createReader, ReaderStoreImpl, MemoryReaderInspector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _specification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./specification */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/specification/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DATA_TYPE_TO_BYTES", function() { return _specification__WEBPACK_IMPORTED_MODULE_0__["DATA_TYPE_TO_BYTES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getAttributeTypeByteSize", function() { return _specification__WEBPACK_IMPORTED_MODULE_0__["getAttributeTypeByteSize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SpacerAttributeName", function() { return _specification__WEBPACK_IMPORTED_MODULE_0__["SpacerAttributeName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createLayoutBuilder", function() { return _specification__WEBPACK_IMPORTED_MODULE_0__["createLayoutBuilder"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getBytesPerItem", function() { return _specification__WEBPACK_IMPORTED_MODULE_0__["getBytesPerItem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AttributeType", function() { return _specification__WEBPACK_IMPORTED_MODULE_0__["AttributeType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InterpretationHint", function() { return _specification__WEBPACK_IMPORTED_MODULE_0__["InterpretationHint"]; });

/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/store/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SlotAllocator", function() { return _store__WEBPACK_IMPORTED_MODULE_1__["SlotAllocator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ArrayStoreImpl", function() { return _store__WEBPACK_IMPORTED_MODULE_1__["ArrayStoreImpl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IdStoreImpl", function() { return _store__WEBPACK_IMPORTED_MODULE_1__["IdStoreImpl"]; });

/* harmony import */ var _reader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reader */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/reader/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createReader", function() { return _reader__WEBPACK_IMPORTED_MODULE_2__["createReader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReaderStoreImpl", function() { return _reader__WEBPACK_IMPORTED_MODULE_2__["ReaderStoreImpl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MemoryReaderInspector", function() { return _reader__WEBPACK_IMPORTED_MODULE_2__["MemoryReaderInspector"]; });

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */




/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/reader/MemoryReaderInspector.ts":
/*!****************************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/reader/MemoryReaderInspector.ts ***!
  \****************************************************************************************************************************************************************/
/*! exports provided: MemoryReaderInspector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemoryReaderInspector", function() { return MemoryReaderInspector; });
/* harmony import */ var _specification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../specification */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/specification/index.ts");
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

const FLOAT_BYTE_SIZE = Float32Array.BYTES_PER_ELEMENT;
/**
 * A utility class for reading/writing individual properties of a MemoryReader
 */

class MemoryReaderInspector {
  /**
   * Calculates the byte offset for the given item's attribute
   * @param itemIndex The item index of the item
   * @param attribute The attribute
   */
  getByteOffset(item, attribute) {
    const attr = item.layout.get(attribute);

    if (true) {
      if (!attr) {
        throw new Error('unknown attribute: ' + attribute);
      }
    }

    return item.byteOffset + attr.offset;
  }
  /**
   * Calculates the typed offset for the given attribute
   * @param itemIndex The item index of the item
   * @param attribute The attribute
   */


  getTypedOffset(item, attribute) {
    const attr = item.layout.get(attribute);

    if (true) {
      if (!attr) {
        throw new Error('unknown attribute: ' + attribute);
      }
    }

    return attr.typedOffset;
  }

  getWordOffset(item, attribute) {
    return this.getByteOffset(item, attribute) / FLOAT_BYTE_SIZE;
  } // #region Read/Write Generic Property

  /**
   * Reads the __property__ for the __item__
   * @param item The item to get the property for
   * @param property The property to read
   */


  readProperty(item, property) {
    const itemProperties = item.store.propertyBags[item.storeId];

    if (itemProperties != null) {
      return itemProperties[property];
    }
  }
  /**
   * Writes the __property__ for the __item__
   * @param item The item to update
   * @param property The property to update
   * @param value The value of the property
   */


  writeProperty(item, property, value) {
    var _item$store;

    let itemProperties = item.store.propertyBags[item.storeId];

    if (!itemProperties) {
      itemProperties = {};
      item.store.propertyBags[item.storeId] = itemProperties;
    }

    itemProperties[property] = value;
    (_item$store = item.store) === null || _item$store === void 0 ? void 0 : _item$store.notify(item.storeId, property);
  } // #endregion
  // #region Number

  /**
   * Reads __attribute__ from __item__ as a number
   * @param item The item to get the attribute for
   * @param attribute The attribute to read
   */


  readNumber(item, attribute) {
    if (!item.layout.has(attribute)) {
      return this.readProperty(item, attribute) || 0;
    } else {
      const attrib = item.layout.get(attribute);

      if (attrib.type === _specification__WEBPACK_IMPORTED_MODULE_0__["AttributeType"].Uint8) {
        return this.readUint8Attr(item, attribute);
      } else if (attrib.type === _specification__WEBPACK_IMPORTED_MODULE_0__["AttributeType"].Uint32) {
        return this.readUint32Attr(item, attribute);
      } else {
        return this.readFloat32Attr(item, attribute);
      }
    }
  }
  /**
   * Writes __attribute__ for __item__ as a number
   * @param item The item to update
   * @param attribute The attribute to update
   * @param value The attribute value
   */


  writeNumber(item, attribute, value) {
    var _item$store2;

    const attrib = item.layout.get(attribute);

    if (!attrib) {
      this.writeProperty(item, attribute, value);
    } else {
      if (attrib.type === _specification__WEBPACK_IMPORTED_MODULE_0__["AttributeType"].Uint8) {
        this.writeUint8Attr(item, attribute, value);
      } else if (attrib.type === _specification__WEBPACK_IMPORTED_MODULE_0__["AttributeType"].Uint32) {
        this.writeUint32Attr(item, attribute, value);
      } else {
        this.writeFloat32Attr(item, attribute, value);
      }
    }

    (_item$store2 = item.store) === null || _item$store2 === void 0 ? void 0 : _item$store2.notify(item.storeId, attribute);
  } // #endregion
  // #region String

  /**
   * Reads __attribute__ from __item__ as a string
   * @param item The item to get the attribute for
   * @param attribute The attribute to read
   */


  readString(item, attribute) {
    return this.readProperty(item, attribute);
  }
  /**
   * Writes __attribute__ for __item__ as a string
   * @param item The item to update
   * @param attribute The attribute to update
   * @param value The attribute value
   */


  writeString(item, attribute, value) {
    var _item$store3;

    this.writeProperty(item, attribute, value);
    (_item$store3 = item.store) === null || _item$store3 === void 0 ? void 0 : _item$store3.notify(item.storeId, attribute);
  } // #endregion
  // #region Boolean

  /**
   * Reads __attribute__ from __item__ as a boolean
   * @param item The item to get the attribute for
   * @param attribute The attribute to read
   */


  readBoolAttr(item, attribute) {
    return Boolean(this.readUint8Attr(item, attribute));
  }
  /**
   * Writes __attribute__ for __item__ as a boolean
   * @param item The item to update
   * @param attribute The attribute to update
   * @param value The attribute value
   */


  writeBoolAttr(item, attribute, value) {
    this.writeUint8Attr(item, attribute, value ? 1 : 0);
  } // #endregion
  // #region Float32 Single Value

  /**
   * Reads __attribute__ from __item__ as a float32
   * @param item The item to get the attribute for
   * @param attribute The attribute to read
   */


  readFloat32Attr(item, attribute) {
    return item.float32Array[this.getWordOffset(item, attribute)];
  }
  /**
   * Writes __attribute__ for __item__ as a float32
   * @param item The item to update
   * @param attribute The attribute to update
   * @param value The attribute value
   */


  writeFloat32Attr(item, attribute, value) {
    item.float32Array[this.getWordOffset(item, attribute)] = value;
  } // #endregion
  // #region Float32 Vec2

  /**
   * Reads __attribute__ from __item__ as a float32[2]
   * @param item The item to get the attribute for
   * @param attribute The attribute to read
   */


  readFloat32Vec2Attr(item, attribute) {
    const offset = this.getWordOffset(item, attribute);
    return [item.float32Array[offset], item.float32Array[offset + 1]];
  }
  /**
   * Writes __attribute__ for __item__ as a float32[2]
   * @param item The item to update
   * @param attribute The attribute to update
   * @param x The x component to update
   * @param y The y component to update
   */


  writeFloat32Vec2Attr(item, attribute, x, y) {
    const offset = this.getWordOffset(item, attribute);
    item.float32Array[offset] = x;
    item.float32Array[offset + 1] = y;
  }
  /**
   * Writes the float32[2] to the __typedOffset__ of the item
   * @param item The item to update
   * @param typedOffset The offset into the array to write the float32[2]
   * @param x The x component to update
   * @param y The y component to update
   */


  writeFloat32Vec2Offset(item, typedOffset, x, y) {
    item.float32Array[item.wordOffset + typedOffset] = x;
    item.float32Array[item.wordOffset + typedOffset + 1] = y;
  } // #endregion
  // #region Float32 Vec3

  /**
   * Copies the float32[3] from the sourceAttribute to targetAttribute
   * @param item The item to update
   * @param sourceAttribute The source attribute to copy from
   * @param targetAttribute The target attribute to copy to
   */


  copyFloat32Vec3Attr(item, sourceAttribute, targetAttribute) {
    const offset = this.getWordOffset(item, sourceAttribute);
    const subarray = item.float32Array.subarray(offset, offset + 3);
    item.float32Array.set(subarray, this.getWordOffset(item, targetAttribute));
    return subarray;
  }
  /**
   * Copies the float32[2] from sourceTypedOffset to targetTypedOffset
   * @param item The item to update
   * @param sourceTypedOffset The typed offset for the source attribute
   * @param targetTypedOffset typed offset for the target attribute
   */


  copyFloat32Vec3Offset(item, sourceTypedOffset, targetTypedOffset) {
    const subarray = item.float32Array.subarray(item.wordOffset + sourceTypedOffset, item.wordOffset + sourceTypedOffset + 3);
    item.float32Array.set(subarray, item.wordOffset + targetTypedOffset);
    return subarray;
  }
  /**
   * Writes __attribute__ for __item__ as a float32[3]
   * @param item The item to update
   * @param attribute The attribute to update
   * @param x The x component to update
   * @param y The y component to update
   * @param z The z component to update
   */


  writeFloat32Vec3Attr(item, attribute, x, y, z) {
    const offset = this.getWordOffset(item, attribute);
    item.float32Array[offset] = x;
    item.float32Array[offset + 1] = y;
    item.float32Array[offset + 2] = z;
  }
  /**
   * Writes the float32[3] to the __typedOffset__ of the item
   * @param item The item to update
   * @param typedOffset The offset into the array to write the float32[3]
   * @param x The x component to update
   * @param y The y component to update
   * @param z The z component to update
   */


  writeFloat32Vec3Offset(item, typedOffset, x, y, z) {
    item.float32Array[item.wordOffset + typedOffset] = x;
    item.float32Array[item.wordOffset + typedOffset + 1] = y;
    item.float32Array[item.wordOffset + typedOffset + 2] = z;
  }
  /**
   * Reads __attribute__ from __item__ as a float32[3]
   * @param item The item to get the attribute for
   * @param attribute The attribute to read
   */


  readFloat32Vec3Attr(item, attribute) {
    const offset = this.getWordOffset(item, attribute);
    return [item.float32Array[offset], item.float32Array[offset + 1], item.float32Array[offset + 2]];
  } // #endregion
  // #region Uint8 Single Value

  /**
   * Reads __attribute__ from __item__ as a unit8
   * @param item The item to get the attribute for
   * @param attribute The attribute to read
   */


  readUint8Attr(item, attribute) {
    return item.uint8Array[this.getByteOffset(item, attribute)];
  }
  /**
   * Writes __attribute__ for __item__ as a unit8
   * @param item The item to update
   * @param attribute The attribute to update
   * @param value The attribute value
   */


  writeUint8Attr(item, attribute, value) {
    item.uint8Array[this.getByteOffset(item, attribute)] = value;
  } // #endregion
  // #region Uint8 Vec2

  /**
   * Reads __attribute__ from __item__ as a unit8[2]
   * @param item The item to get the attribute for
   * @param attribute The attribute to read
   */


  readUint8Vec2Attr(item, attribute) {
    const offset = this.getByteOffset(item, attribute);
    return [item.uint8Array[offset], item.uint8Array[offset + 1]];
  }
  /**
   * Writes __attribute__ for __item__ as a uint8[2]
   * @param item The item to update
   * @param attribute The attribute to update
   * @param x The x component to update
   * @param y The y component to update
   * @param z The z component to update
   */


  writeUint8Vec2Attr(item, attribute, x, y) {
    const offset = this.getByteOffset(item, attribute);
    item.uint8Array[offset] = x;
    item.uint8Array[offset + 1] = y;
  } // #endregion
  // #region Uint8 Vec3

  /**
   * Reads __attribute__ from __item__ as a unit8[3]
   * @param item The item to get the attribute for
   * @param attribute The attribute to read
   */


  readUint8Vec3Attr(item, attribute) {
    const offset = this.getByteOffset(item, attribute);
    return [item.uint8Array[offset], item.uint8Array[offset + 1], item.uint8Array[offset + 2]];
  }
  /**
   * Writes __attribute__ for __item__ as a uint8[3]
   * @param item The item to update
   * @param attribute The attribute to update
   * @param x The x component to update
   * @param y The y component to update
   * @param z The z component to update
   */


  writeUint8Vec3Attr(item, attribute, x, y, z) {
    const offset = this.getByteOffset(item, attribute);
    item.uint8Array[offset] = x;
    item.uint8Array[offset + 1] = y;
    item.uint8Array[offset + 2] = z;
  } // #endregion
  // #region Uint8 Vec4

  /**
   * Reads __attribute__ from __item__ as a unit8[4]
   * @param item The item to get the attribute for
   * @param attribute The attribute to read
   */


  readUint8Vec4Attr(item, attribute) {
    const offset = this.getByteOffset(item, attribute);
    return [item.uint8Array[offset], item.uint8Array[offset + 1], item.uint8Array[offset + 2], item.uint8Array[offset + 3]];
  }
  /**
   * Writes __attribute__ for __item__ as a uint8[4]
   * @param item The item to update
   * @param attribute The attribute to update
   * @param x The x component to update
   * @param y The y component to update
   * @param z The z component to update
   * @param zz The zz component to update
   */


  writeUint8Vec4Attr(item, attribute, x, y, z, zz) {
    const offset = this.getByteOffset(item, attribute);
    item.uint8Array[offset] = x;
    item.uint8Array[offset + 1] = y;
    item.uint8Array[offset + 2] = z;
    item.uint8Array[offset + 3] = zz;
  } // #endregion
  // #region Uint32 Single Value

  /**
   * Reads __attribute__ from __item__ as a uint32
   * @param item The item to get the attribute for
   * @param attribute The attribute to read
   */


  readUint32Attr(item, attribute) {
    return item.uint32Array[this.getWordOffset(item, attribute)];
  }
  /**
   * Writes __attribute__ for __item__ as a unit32
   * @param item The item to update
   * @param attribute The attribute to update
   * @param value The attribute value
   */


  writeUint32Attr(item, attribute, value) {
    item.uint32Array[this.getWordOffset(item, attribute)] = value;
  }
  /**
   * Writes the unit32 at the given __typedOffset__ for the item
   * @param item The item to update
   * @param typedOffset The offset into the array to write the uint32
   * @param value The attribute value
   */


  writeUint32Offset(item, typedOffset, value) {
    item.uint32Array[item.wordOffset + typedOffset] = value;
  }
  /**
   * Copies the uint32 from sourceTypedOffset to targetTypedOffset
   * @param item The item to update
   * @param sourceTypedOffset The typed offset for the source attribute
   * @param targetTypedOffset typed offset for the target attribute
   */


  copyUint32Offset(item, sourceTypedOffset, targetTypedOffset) {
    item.uint32Array[item.wordOffset + targetTypedOffset] = item.uint32Array[item.wordOffset + sourceTypedOffset];
  }

}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/reader/ReaderStore.ts":
/*!******************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/reader/ReaderStore.ts ***!
  \******************************************************************************************************************************************************/
/*! exports provided: ReaderStoreImpl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReaderStoreImpl", function() { return ReaderStoreImpl; });
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/store/index.ts");
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * @inheritdoc
 * @see {@link ReaderStore}
 */

class ReaderStoreImpl extends _store__WEBPACK_IMPORTED_MODULE_0__["IdStoreImpl"] {
  /**
   * Constructor for the ReaderStoreImpl
   * @param itemClass The class of the item, used when constructing new items
   * @param store The underlying store to use
   * @param allocator The allocator to use for allocating new ids
   */
  constructor(itemClass, store, allocator = new _store__WEBPACK_IMPORTED_MODULE_0__["SlotAllocator"](store.config.capacity)) {
    super(store, allocator);
    this.propertyBags = {};
    this.items = new Array(store.config.capacity);
    this.itemClass = itemClass; // reconnect items on resize

    store.onResize(() => {
      this.items.forEach(i => i && i.connect(i.storeId, this));
    });
  }
  /**
   * @inheritdoc
   * @see {@link ReaderStore.receive}
   */


  receive(primitive) {
    const storeId = this.add(false);
    this.slurp(storeId, primitive.buffer, primitive.byteOffset);
    primitive.connect(storeId, this);
    this.fireAddHandlers(storeId);
    return storeId;
  }
  /**
   * @inheritdoc
   * @see {@link ReaderStore.itemAt}
   */


  itemAt(storeId) {
    if (true) {
      if (!this.slotAllocator.has(storeId)) {
        throw new Error(`Element ${storeId} does not exist`);
      }
    }

    return this.items[storeId] || (this.items[storeId] = this.createConnectedItem(storeId));
  }
  /**
   * @inheritdoc
   * @see {@link ReaderStore.createConnectedItem}
   */


  createConnectedItem(storeId) {
    if (!this.propertyBags[storeId]) {
      this.propertyBags[storeId] = {};
    }

    return new this.itemClass(this, storeId);
  }

  *[Symbol.iterator]() {
    let idx;

    for (idx of this.itemIds()) {
      yield this.itemAt(idx);
    }
  }

  *scan() {
    let idx;
    let item;

    if (this.count > 0) {
      item = this.createConnectedItem(0);
    }

    if (item) {
      for (idx of this.itemIds()) {
        if (!this.propertyBags[idx]) {
          this.propertyBags[idx] = {};
        }

        item.connect(idx, this);
        yield item;
      }
    }
  }
  /**
   * @inheritdoc
   * @see {@link ReaderStore.slurp}
   */


  slurp(targetId, sourceBuffer, propertyBag = {}, sourceOffset = 0) {
    this.store.slurp(targetId, sourceBuffer, sourceOffset);

    if (propertyBag) {
      this.propertyBags[targetId] = propertyBag;
    } else {
      this.propertyBags[targetId] = undefined;
    } // All the attributes for this item were updated


    this.notify(targetId);
  }
  /**
   * @inheritdoc
   * @see {@link IdStore.add}
   */


  add(events = true) {
    const id = super.add(false);
    this.propertyBags[id] = {};

    if (events) {
      this.fireAddHandlers(id);
    }

    return id;
  }
  /**
   * @inheritdoc
   * @see {@link IdStore.remove}
   */


  remove(idx) {
    super.remove(idx); // TODO - handle with onRemove hook?
    // this.writeBool(idx, this.visibleAttrib as T, false)

    this.propertyBags[idx] = undefined;
  }
  /**
   * @inheritdoc
   * @see {@link IdStore.reset}
   */


  reset() {
    super.reset();
    this.propertyBags = {};
  }
  /**
   * @inheritdoc
   * @see {@link IdStore.destroy}
   */


  destroy() {
    super.destroy();
    this.propertyBags = {};
  }

}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/reader/createReader.ts":
/*!*******************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/reader/createReader.ts ***!
  \*******************************************************************************************************************************************************/
/*! exports provided: createReader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createReader", function() { return createReader; });
/* harmony import */ var _specification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../specification */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/specification/index.ts");
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Creates a MemoryReader implementation which can read the given memory layout efficiently
 * @param readerType The type of reader
 * @param layout The memory layout
 * @param additionalProperties The additional properties to add to the implementation
 * @param setterAugmenter The setter augmenter, which can be used to manipulate the underlying generated property setters
 */

function createReader(readerType, layout, additionalProperties = []) {
  class Impl {
    /**
     * Constructor for the MemoryReader implementation
     * @param store The backing data store
     * @param storeId The id to use when accessing the store
     */
    constructor(store = undefined, storeId = -1) {
      // item data
      this.storeId = -1;
      this.byteOffset = 0;
      this.wordOffset = 0;
      const autobuffer = store == null;

      if (autobuffer) {
        this.isFlushNeeded = true;
        const buffer = new ArrayBuffer(layout.stride);
        this.uint8Array = new Uint8Array(buffer);
        this.uint32Array = new Uint32Array(buffer);
        this.float32Array = new Float32Array(buffer);
        this.propertyBag = {};
      } else {
        this.isFlushNeeded = false;
        this.connect(storeId, store);
      }

      additionalProperties.forEach(property => {
        if (typeof property !== 'string') {
          const {
            name,
            initialValue,
            ephemeral
          } = property;

          if (ephemeral) {
            ;
            this[name] = initialValue;
          } else {
            this.propertyBag[name] = initialValue;
          }
        }
      });
    }
    /**
     * @inheritdoc
     * @see {@link MemoryReader.type}
     */


    get type() {
      return readerType;
    }
    /**
     * @inheritdoc
     * @see {@link MemoryReader.layout}
     */


    get layout() {
      return layout;
    }
    /**
     * @inheritdoc
     * @see {@link MemoryReader.buffer}
     */


    get buffer() {
      return this.uint8Array.buffer;
    }
    /**
     * @inheritdoc
     * @see {@link MemoryReader.connect}
     */


    connect(storeId, store) {
      if (this.storeId !== storeId) {
        this.byteOffset = storeId * store.store.bytesPerItem;
        this.wordOffset = this.byteOffset / 4;
        this.storeId = storeId; // flush this items buffer out if we're waiting for a store connection

        if (this.isFlushNeeded) {
          store.slurp(storeId, this.uint8Array.buffer, this.propertyBag);
          this.isFlushNeeded = false;
        } // copy property bag


        this.propertyBag = store.propertyBags[storeId];
      } // It is important to not have " if (this.store != store) "
      // It's possible that the store doesn't change, but the underlying arrays do
      // copy array aliases


      this.store = store;
      this.uint32Array = store.store.uint32Array;
      this.float32Array = store.store.float32Array;
      this.uint8Array = store.store.uint8Array;
    }
    /**
     * Handles an attribute being set
     * @param name The name of the attribute
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function


    handleAttributeUpdated(name) {}

  }

  const proto = Impl.prototype;
  /**
   * Wire layout properties into the memory layout
   */

  layout.forEach(attribute => {
    if (attribute.name === _specification__WEBPACK_IMPORTED_MODULE_0__["SpacerAttributeName"]) {
      return;
    }

    const {
      name,
      size,
      type,
      typedOffset,
      hint
    } = attribute;
    let setter;
    let getter;

    if (type === _specification__WEBPACK_IMPORTED_MODULE_0__["AttributeType"].Float32) {
      if (size === 1) {
        //
        // Singular Float Values
        //
        getter = function () {
          return this.float32Array[this.wordOffset + typedOffset];
        };

        setter = function (value) {
          this.float32Array[this.wordOffset + typedOffset] = value || 0;
          this.handleAttributeUpdated(name);
        };
      } else if (size === 2) {
        //
        // Vec2 Float Values
        //
        getter = function () {
          return [this.float32Array[this.wordOffset + typedOffset], this.float32Array[this.wordOffset + typedOffset + 1]];
        };

        setter = function (value) {
          this.float32Array[this.wordOffset + typedOffset] = value[0] || 0;
          this.float32Array[this.wordOffset + typedOffset + 1] = value[1] || 0;
          this.handleAttributeUpdated(name);
        };
      } else if (size === 3) {
        //
        // Vec3 Float Values
        //
        getter = function () {
          return [this.float32Array[this.wordOffset + typedOffset], this.float32Array[this.wordOffset + typedOffset + 1], this.float32Array[this.wordOffset + typedOffset + 2]];
        };

        setter = function (value) {
          this.float32Array[this.wordOffset + typedOffset] = value[0] || 0;
          this.float32Array[this.wordOffset + typedOffset + 1] = value[1] || 0;
          this.float32Array[this.wordOffset + typedOffset + 2] = value[2] || 0;
          this.handleAttributeUpdated(name);
        };
      }
    } else if (type === _specification__WEBPACK_IMPORTED_MODULE_0__["AttributeType"].Uint8) {
      if (size === 1) {
        if (hint === _specification__WEBPACK_IMPORTED_MODULE_0__["InterpretationHint"].Boolean) {
          //
          // Single Byte Boolean
          //
          getter = function () {
            return this.uint8Array[this.byteOffset + typedOffset] > 0;
          };

          setter = function (value) {
            this.uint8Array[this.byteOffset + typedOffset] = value ? 1 : 0;
            this.handleAttributeUpdated(name);
          };
        } else {
          //
          // Single Byte Number
          //
          getter = function () {
            return this.uint8Array[this.byteOffset + typedOffset];
          };

          setter = function (value) {
            this.uint8Array[this.byteOffset + typedOffset] = value;
            this.handleAttributeUpdated(name);
          };
        }
      } else if (size === 2) {
        //
        // Vec2 Byte Values
        //
        getter = function () {
          return [this.uint8Array[this.byteOffset + typedOffset], this.uint8Array[this.byteOffset + typedOffset + 1]];
        };

        setter = function (value) {
          this.uint8Array[this.byteOffset + typedOffset] = value[0] || 0;
          this.uint8Array[this.byteOffset + typedOffset + 1] = value[1] || 0;
          this.handleAttributeUpdated(name);
        };
      } else if (size === 3) {
        //
        // Vec3 Byte Values
        //
        getter = function () {
          return [this.uint8Array[this.byteOffset + typedOffset], this.uint8Array[this.byteOffset + typedOffset + 1], this.uint8Array[this.byteOffset + typedOffset + 2]];
        };

        setter = function (value) {
          this.uint8Array[this.byteOffset + typedOffset] = value[0] || 0;
          this.uint8Array[this.byteOffset + typedOffset + 1] = value[1] || 0;
          this.uint8Array[this.byteOffset + typedOffset + 2] = value[2] || 0;
          this.handleAttributeUpdated(name);
        };
      } else if (size === 4) {
        //
        // Vec4 Byte Values
        //
        getter = function () {
          return [this.uint8Array[this.byteOffset + typedOffset], this.uint8Array[this.byteOffset + typedOffset + 1], this.uint8Array[this.byteOffset + typedOffset + 2], this.uint8Array[this.byteOffset + typedOffset + 3]];
        };

        setter = function (value) {
          this.uint8Array[this.byteOffset + typedOffset] = value[0] || 0;
          this.uint8Array[this.byteOffset + typedOffset + 1] = value[1] || 0;
          this.uint8Array[this.byteOffset + typedOffset + 2] = value[2] || 0;
          this.uint8Array[this.byteOffset + typedOffset + 3] = value[3] || 0;
          this.handleAttributeUpdated(name);
        };
      }
    } else if (type === _specification__WEBPACK_IMPORTED_MODULE_0__["AttributeType"].Uint32) {
      if (size === 1) {
        //
        // Uint32 Single Values
        //
        getter = function () {
          return this.uint32Array[this.wordOffset + typedOffset];
        };

        setter = function (value) {
          this.uint32Array[this.wordOffset + typedOffset] = value || 0;
          this.handleAttributeUpdated(name);
        };
      }
    }

    if (setter) {
      proto.__defineSetter__(name, setter);
    }

    if (getter) {
      proto.__defineGetter__(name, getter);
    }
  });
  /**
   * Wire additional properties into the property bag
   */

  additionalProperties.forEach(property => {
    const name = typeof property === 'string' ? property : property.name;
    const ephemeral = typeof property !== 'string' ? Boolean(property.ephemeral) : false;

    if (!ephemeral) {
      proto.__defineGetter__(name, function () {
        return this.propertyBag[name];
      });

      proto.__defineSetter__(name, function (value) {
        this.propertyBag[name] = value;
      });
    }
  });
  return Impl;
}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/reader/index.ts":
/*!************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/reader/index.ts ***!
  \************************************************************************************************************************************************/
/*! exports provided: createReader, ReaderStoreImpl, MemoryReaderInspector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createReader */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/reader/createReader.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createReader", function() { return _createReader__WEBPACK_IMPORTED_MODULE_0__["createReader"]; });

/* harmony import */ var _ReaderStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReaderStore */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/reader/ReaderStore.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReaderStoreImpl", function() { return _ReaderStore__WEBPACK_IMPORTED_MODULE_1__["ReaderStoreImpl"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/reader/types.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _MemoryReaderInspector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MemoryReaderInspector */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/reader/MemoryReaderInspector.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MemoryReaderInspector", function() { return _MemoryReaderInspector__WEBPACK_IMPORTED_MODULE_3__["MemoryReaderInspector"]; });

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */





/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/reader/types.ts":
/*!************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/reader/types.ts ***!
  \************************************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/specification/AttributeType.ts":
/*!***************************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/specification/AttributeType.ts ***!
  \***************************************************************************************************************************************************************/
/*! exports provided: DATA_TYPE_TO_BYTES, getAttributeTypeByteSize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATA_TYPE_TO_BYTES", function() { return DATA_TYPE_TO_BYTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAttributeTypeByteSize", function() { return getAttributeTypeByteSize; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/specification/types.ts");
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * @internal
 *
 * A mapping from AttributeType to the number of bytes required to store it
 */

const DATA_TYPE_TO_BYTES = {
  [_types__WEBPACK_IMPORTED_MODULE_0__["AttributeType"].Float32]: 4,
  [_types__WEBPACK_IMPORTED_MODULE_0__["AttributeType"].Uint32]: 4,
  [_types__WEBPACK_IMPORTED_MODULE_0__["AttributeType"].Uint8]: 1
};
/**
 * @internal
 *
 * Gets the size in bytes for the given data type
 * @param type The data type to inspect
 */

function getAttributeTypeByteSize(type) {
  return DATA_TYPE_TO_BYTES[type];
}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/specification/LayoutBuilder.ts":
/*!***************************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/specification/LayoutBuilder.ts ***!
  \***************************************************************************************************************************************************************/
/*! exports provided: SpacerAttributeName, createLayoutBuilder, getBytesPerItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpacerAttributeName", function() { return SpacerAttributeName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLayoutBuilder", function() { return createLayoutBuilder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBytesPerItem", function() { return getBytesPerItem; });
/* harmony import */ var _AttributeType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AttributeType */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/specification/AttributeType.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/specification/types.ts");
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */


const SpacerAttributeName = '__SPACER__';
/**
 * @internal
 *
 * Creates a LayoutBuilder which can be used to construct a MemoryLayout
 */

function createLayoutBuilder() {
  const toBuild = new Map();

  function addAttribute(name, type, size, options) {
    toBuild.set(name, {
      name,
      size,
      type,
      options
    });
  }

  const me = {
    addUint8(name, options) {
      addAttribute(name, _types__WEBPACK_IMPORTED_MODULE_1__["AttributeType"].Uint8, 1, options);
      return me;
    },

    addUint8Vec2(name, options) {
      addAttribute(name, _types__WEBPACK_IMPORTED_MODULE_1__["AttributeType"].Uint8, 2, options);
      return me;
    },

    addUint8Vec3(name, options) {
      addAttribute(name, _types__WEBPACK_IMPORTED_MODULE_1__["AttributeType"].Uint8, 3, options);
      return me;
    },

    addUint8Vec4(name, options) {
      addAttribute(name, _types__WEBPACK_IMPORTED_MODULE_1__["AttributeType"].Uint8, 4, options);
      return me;
    },

    addFloat32(name, options) {
      addAttribute(name, _types__WEBPACK_IMPORTED_MODULE_1__["AttributeType"].Float32, 1, options);
      return me;
    },

    addFloat32Vec2(name, options) {
      addAttribute(name, _types__WEBPACK_IMPORTED_MODULE_1__["AttributeType"].Float32, 2, options);
      return me;
    },

    addFloat32Vec3(name, options) {
      addAttribute(name, _types__WEBPACK_IMPORTED_MODULE_1__["AttributeType"].Float32, 3, options);
      return me;
    },

    addUint32(name, options) {
      addAttribute(name, _types__WEBPACK_IMPORTED_MODULE_1__["AttributeType"].Uint32, 1, options);
      return me;
    },

    build() {
      const built = new Map(); // Organize so the FLOAT types come before the BYTE types
      // The reason we do this is because FLOAT offsets have to be multiples of 4 (bytes)
      // so, we pack the floats first, so that all their offsets are multiples of 4
      // then we fill in the rest with the bytes

      let offset = 0; // Float32 first

      toBuild.forEach(attr => {
        if (attr.type === _types__WEBPACK_IMPORTED_MODULE_1__["AttributeType"].Float32) {
          offset += buildAttribute(attr, offset, built);
        }
      }); // Uint32 next

      toBuild.forEach(attr => {
        if (attr.type === _types__WEBPACK_IMPORTED_MODULE_1__["AttributeType"].Uint32) {
          offset += buildAttribute(attr, offset, built);
        }
      }); // Uint8 Bytes last

      toBuild.forEach(attr => {
        if (attr.type === _types__WEBPACK_IMPORTED_MODULE_1__["AttributeType"].Uint8) {
          offset += buildAttribute(attr, offset, built);
        }
      });
      const align = offset % 4;

      if (offset % 4 !== 0) {
        offset += buildAttribute({
          name: SpacerAttributeName,
          type: _types__WEBPACK_IMPORTED_MODULE_1__["AttributeType"].Uint8,
          size: 4 - align
        }, offset, built);
      }

      built.stride = offset;
      return built;
    }

  };
  return me;
}
/**
 * Gets the total number of bytes required to represent a single item in memory
 * @param layout The memory layout
 */

function getBytesPerItem(layout) {
  let byteSizePerItem = 0;
  layout.forEach(attribData => {
    byteSizePerItem = Math.max(byteSizePerItem, attribData.offset + attribData.size * Object(_AttributeType__WEBPACK_IMPORTED_MODULE_0__["getAttributeTypeByteSize"])(attribData.type));
  });
  return byteSizePerItem;
}
/**
 * Builds a attribute specification from __attr__ build configuration
 * @param attr The attribute specification
 * @param offset The offset for the attribute
 * @param built The current mapping of all the attributes
 */

function buildAttribute(attr, offset, built) {
  const bytesPerItem = Object(_AttributeType__WEBPACK_IMPORTED_MODULE_0__["getAttributeTypeByteSize"])(attr.type);
  const typedOffset = offset / bytesPerItem; // add the primary attribute

  built.set(attr.name, {
    name: attr.name,
    size: attr.size,
    type: attr.type,
    hint: attr.hint,
    typedOffset,
    offset
  }); // add any vector component aliases

  let componentIndex = 0;
  let component;

  for (component of ((_attr$options = attr.options) === null || _attr$options === void 0 ? void 0 : _attr$options.components) || []) {
    var _attr$options;

    built.set(component, {
      name: component,
      size: 1,
      type: attr.type,
      typedOffset: typedOffset + componentIndex,
      offset: offset + componentIndex * bytesPerItem
    });
    componentIndex++;
  } // add any reinterpretation aliases


  let alias;

  for (alias of ((_attr$options2 = attr.options) === null || _attr$options2 === void 0 ? void 0 : _attr$options2.aliases) || []) {
    var _attr$options2;

    built.set(alias.name, {
      name: alias.name,
      size: alias.size || 1,
      type: alias.type,
      hint: alias.hint,
      typedOffset: offset / Object(_AttributeType__WEBPACK_IMPORTED_MODULE_0__["getAttributeTypeByteSize"])(alias.type),
      offset
    });
  }

  return attr.size * bytesPerItem;
}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/specification/index.ts":
/*!*******************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/specification/index.ts ***!
  \*******************************************************************************************************************************************************/
/*! exports provided: DATA_TYPE_TO_BYTES, getAttributeTypeByteSize, SpacerAttributeName, createLayoutBuilder, getBytesPerItem, AttributeType, InterpretationHint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AttributeType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AttributeType */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/specification/AttributeType.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DATA_TYPE_TO_BYTES", function() { return _AttributeType__WEBPACK_IMPORTED_MODULE_0__["DATA_TYPE_TO_BYTES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getAttributeTypeByteSize", function() { return _AttributeType__WEBPACK_IMPORTED_MODULE_0__["getAttributeTypeByteSize"]; });

/* harmony import */ var _LayoutBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LayoutBuilder */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/specification/LayoutBuilder.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SpacerAttributeName", function() { return _LayoutBuilder__WEBPACK_IMPORTED_MODULE_1__["SpacerAttributeName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createLayoutBuilder", function() { return _LayoutBuilder__WEBPACK_IMPORTED_MODULE_1__["createLayoutBuilder"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getBytesPerItem", function() { return _LayoutBuilder__WEBPACK_IMPORTED_MODULE_1__["getBytesPerItem"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/specification/types.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AttributeType", function() { return _types__WEBPACK_IMPORTED_MODULE_2__["AttributeType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InterpretationHint", function() { return _types__WEBPACK_IMPORTED_MODULE_2__["InterpretationHint"]; });

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */




/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/specification/types.ts":
/*!*******************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/specification/types.ts ***!
  \*******************************************************************************************************************************************************/
/*! exports provided: AttributeType, InterpretationHint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttributeType", function() { return AttributeType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InterpretationHint", function() { return InterpretationHint; });
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
var AttributeType;

(function (AttributeType) {
  AttributeType[AttributeType["Float32"] = 0] = "Float32";
  AttributeType[AttributeType["Uint8"] = 1] = "Uint8";
  AttributeType[AttributeType["Uint32"] = 2] = "Uint32";
})(AttributeType || (AttributeType = {}));
/**
 * Indicates how a value should be interpreted
 */


var InterpretationHint;

(function (InterpretationHint) {
  /**
   * Interpret a uint8 value as a boolean
   */
  InterpretationHint[InterpretationHint["Boolean"] = 0] = "Boolean";
})(InterpretationHint || (InterpretationHint = {}));

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/store/ArrayStore.ts":
/*!****************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/store/ArrayStore.ts ***!
  \****************************************************************************************************************************************************/
/*! exports provided: ArrayStoreImpl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayStoreImpl", function() { return ArrayStoreImpl; });
/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaults */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/store/defaults.ts");

const DEFAULT_OPTIONS = {
  shared: _defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_SHARED"],
  capacity: _defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_CAPACITY"]
};
/**
 * Implementation of an ArrayStore
 * @see {@link ArrayStore} for more info
 */

class ArrayStoreImpl {
  /**
   * Constructor for the ItemArrayBuffer
   * @param layout The memory layout
   * @param options The store options
   */
  constructor(layout, options = DEFAULT_OPTIONS) {
    var _options$buffer;

    this.layout = layout;
    this.onResizeHandlers = []; // determine capacity based on the following:
    // * if an explicit value is provided, use that
    // * if a buffer is provided, calculate the buffer capacity
    // * else use default capacity

    const capacity = options.capacity || (((_options$buffer = options.buffer) === null || _options$buffer === void 0 ? void 0 : _options$buffer.byteLength) || 0) / layout.stride || _defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_CAPACITY"];
    this.config = {
      capacity,
      shared: typeof options.shared === 'boolean' ? options.shared : _defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_SHARED"]
    };
    this.bytesPerItem = layout.stride;

    if (options.buffer) {
      this._buffer = options.buffer;
    }

    this.resize(this.config.capacity);
  }
  /**
   * @inheritdoc
   * @see {@link ArrayStore.buffer}
   */


  get buffer() {
    return this._buffer;
  }
  /**
   * @inheritdoc
   * @see {@link ArrayStore.dataView}
   */


  get dataView() {
    return this._dataView;
  }
  /**
   * @inheritdoc
   * @see {@link ArrayStore.float32Array}
   */


  get float32Array() {
    return this._float32Array;
  }
  /**
   * @inheritdoc
   * @see {@link ArrayStore.uint8Array}
   */


  get uint8Array() {
    return this._uint8Array;
  }
  /**
   * @inheritdoc
   * @see {@link ArrayStore.uint32Array}
   */


  get uint32Array() {
    return this._uint32Array;
  }
  /**
   * @inheritdoc
   * @see {@link ArrayStore.onResize}
   */


  onResize(handler) {
    this.onResizeHandlers.push(handler);
    return () => {
      this.onResizeHandlers = this.onResizeHandlers.filter(h => h !== handler);
    };
  }
  /**
   * @inheritdoc
   * @see {@link ArrayStore.resize}
   */


  resize(newSize) {
    if (this.count === newSize) {
      // existing buffer is correct size, don't resize buffer
      if (!this.uint8Array) {
        // when initializing, the array aliases may be undefined when the buffer is
        this._uint8Array = new Uint8Array(this._buffer);
        this._uint32Array = new Uint32Array(this._buffer);
        this._float32Array = new Float32Array(this._buffer);
      }

      return;
    } else {
      const oldSize = this.count;
      const oldData = this.buffer; // create a new byte array

      const numBytes = newSize * this.bytesPerItem;

      if (numBytes % 4 !== 0) {
        throw new Error(`buffer size ${numBytes} must be word-aligned. size=${newSize}, bpi=${this.bytesPerItem}`);
      }

      const newBuffer = this.config.shared && typeof SharedArrayBuffer !== 'undefined' ? new SharedArrayBuffer(numBytes) : new ArrayBuffer(numBytes);

      if (oldSize > 0 && newSize > oldSize) {
        // copy the old data in
        const newByteArray = new Uint8Array(newBuffer);
        newByteArray.set(new Uint8Array(oldData));
      } // set a new data view


      this._buffer = newBuffer;
      this._dataView = new DataView(newBuffer);
      this._float32Array = new Float32Array(newBuffer);
      this._uint8Array = new Uint8Array(newBuffer);
      this._uint32Array = new Uint32Array(newBuffer);
      this.onResizeHandlers.forEach(h => h());
    }
  }
  /**
   * @inheritdoc
   * @see {@link ArrayStore.itemData}
   */


  itemData(idx) {
    if (idx < 0 || idx * this.bytesPerItem > this.buffer.byteLength - this.bytesPerItem) {
      throw new Error('Index out of range');
    }

    const byteOffset = idx * this.bytesPerItem;
    return this.buffer.slice(byteOffset, byteOffset + this.bytesPerItem);
  }
  /**
   * @inheritdoc
   * @see {@link ArrayStore.getByteOffset}
   */


  getByteOffset(idx) {
    if (false) {}

    return idx * this.bytesPerItem;
  }
  /**
   * @inheritdoc
   * @see {@link ArrayStore.getByteOffsetAttr}
   */


  getByteOffsetAttr(idx, attribute) {
    const attribLayout = this.layout.get(attribute);

    if (false) {}

    return idx * this.bytesPerItem + (attribLayout === null || attribLayout === void 0 ? void 0 : attribLayout.offset);
  }
  /**
   * @inheritdoc
   * @see {@link ArrayStore.count}
   */


  get count() {
    if (this.buffer) {
      return this.buffer.byteLength / this.bytesPerItem;
    } else {
      return 0;
    }
  }
  /**
   * @inheritdoc
   * @see {@link ArrayStore.destroy}
   */


  destroy() {
    // Set the capacity to zero
    this.config.capacity = 0; // Force the data to be empty

    this.resize(0);
  }
  /**
   * @inheritdoc
   * @see {@link ArrayStore.slurp}
   */


  slurp(targetIdx, sourceBuffer, sourceOffset = 0) {
    if (true) {
      if (!sourceBuffer) {
        throw new Error(`Invalid store ${sourceBuffer}`);
      }
    } // TODO: Check if they have compatible attributes


    this.uint8Array.set(new Uint8Array(sourceBuffer, sourceOffset, this.bytesPerItem), targetIdx * this.bytesPerItem);
  }

}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/store/IdStore.ts":
/*!*************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/store/IdStore.ts ***!
  \*************************************************************************************************************************************************/
/*! exports provided: IdStoreImpl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdStoreImpl", function() { return IdStoreImpl; });
/**
 * __&commat;internal__
 *
 * An implementation of an IdStore
 */
class IdStoreImpl {
  // #region construction

  /**
   * Constructor for the IdStoreImpl
   * @param store The backing ArrayStore
   * @param allocator The allocator for allocating new ids
   */
  constructor(store, allocator) {
    this._count = 0;
    /** callbacks and handlers */

    this.onUpdateHandlers = [];
    this.onAddHandlers = [];
    this.onRemoveHandlers = [];
    this._store = store;
    this.slotAllocator = allocator;
    this._count = allocator.usedCount;
  } // #endregion

  /**
   * @inheritdoc
   * @see {@link IdStore.store}
   */


  get store() {
    return this._store;
  }
  /**
   * @inheritdoc
   * @see {@link IdStore.count}
   */


  get count() {
    return this._count;
  }
  /**
   * @inheritdoc
   * @see {@link IdStore.itemIds}
   */


  itemIds() {
    return this.slotAllocator.used();
  } // #region pubsub events

  /**
   * @inheritdoc
   * @see {@link IdStore.onAttributeUpdated}
   */


  onAttributeUpdated(handler) {
    this.onUpdateHandlers.push(handler);
    return () => {
      this.onUpdateHandlers = this.onUpdateHandlers.filter(h => h !== handler);
    };
  }
  /**
   * @inheritdoc
   * @see {@link IdStore.onAddItem}
   */


  onAddItem(handler) {
    this.onAddHandlers.push(handler);
    return () => {
      this.onAddHandlers = this.onAddHandlers.filter(h => h !== handler);
    };
  }
  /**
   * @inheritdoc
   * @see {@link IdStore.onRemoveItem}
   */


  onRemoveItem(handler) {
    this.onRemoveHandlers.push(handler);
    return () => {
      this.onRemoveHandlers = this.onRemoveHandlers.filter(h => h !== handler);
    };
  } // #endregion

  /**
   * @inheritdoc
   * @see {@link IdStore.add}
   */


  add(events = true) {
    if (!this.slotAllocator.hasFreeSpace) {
      const prevNumItems = this.store.count;
      const newNumItems = prevNumItems + this.store.config.capacity;
      this.store.resize(newNumItems);
      this.slotAllocator.grow(newNumItems);
    }

    const itemIndex = this.slotAllocator.alloc();
    this._count++;

    if (events) {
      this.fireAddHandlers(itemIndex);
    }

    return itemIndex;
  }
  /**
   * @inheritdoc
   * @see {@link IdStore.remove}
   */


  remove(idx, events = true) {
    if (events) {
      this.fireRemoveHandlers(idx);
    }

    this.slotAllocator.free(idx);
    this._count--;
  }
  /**
   * @inheritdoc
   * @see {@link IdStore.reset}
   */


  reset() {
    const numItems = this._store.config.capacity;

    for (const id of this.itemIds()) {
      this.fireRemoveHandlers(id);
    }

    this._store.resize(numItems);

    this.slotAllocator.reset(numItems);
    this._count = 0;
  }
  /**
   * @inheritdoc
   * @see {@link IdStore.destroy}
   */


  destroy() {
    this.store.destroy();
    this.slotAllocator.destroy();
    this.onRemoveHandlers = [];
    this.onAddHandlers = [];
    this.onUpdateHandlers = [];
  }
  /**
   * @inheritdoc
   * @see {@link IdStore.notify}
   */


  notify(id, attribute) {
    for (const handler of this.onUpdateHandlers) {
      try {
        handler(id, attribute);
      } catch (e) {
        console.error('caught error', e);
      }
    }
  }
  /**
   * Raises the add event
   * @param itemIndex The added item index
   */


  fireAddHandlers(itemIndex) {
    this.onAddHandlers.forEach(h => h(itemIndex));
  }
  /**
   * Raises the add event
   * @param itemIndex The added item index
   */


  fireRemoveHandlers(itemIndex) {
    this.onRemoveHandlers.forEach(h => h(itemIndex));
  }

}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/store/SlotAllocator.ts":
/*!*******************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/store/SlotAllocator.ts ***!
  \*******************************************************************************************************************************************************/
/*! exports provided: SlotAllocator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlotAllocator", function() { return SlotAllocator; });
/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaults */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/store/defaults.ts");
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * A class for managing id allocation
 */

class SlotAllocator {
  /**
   * Constructor for the SlotAllocator
   * @param capacity The number of ids to support
   * @param consumed If true, the allocator is assumed to be full
   * @throws If an invalid capacity is passed to the constructor
   */
  constructor(capacity = _defaults__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_CAPACITY"], consumed = false) {
    this.availableIndices = new Map();
    this.capacity = 0;

    if (capacity == null || capacity <= 0) {
      throw new Error(`Invalid capacity ${capacity}, capacity must be > 0`);
    }

    this.capacity = capacity; // if the allocator starts out consumed, don't reset its capacity

    if (!consumed) {
      this.reset(capacity);
    }
  }
  /**
   * Resets the allocator back to the default state
   * @param capacity The number of items to support
   * @throws If an invalid capacity is passed to the function
   */


  reset(capacity) {
    if (capacity == null || capacity <= 0) {
      throw new Error(`Invalid capacity ${capacity}, capacity must be > 0`);
    }

    this.capacity = capacity;

    for (let i = 0; i < this.capacity - 1; i++) {
      this.availableIndices.set(i, i + 1);
    }

    this.availableIndices.set(this.capacity - 1, -1);
    this.nextAvailableIndex = 0;
  }
  /**
   * Grow the capacity of the slot allocator by __newCapacity__
   * @param newCapacity The new capacity of the allocator
   * @throws If an invalid capacity is passed to the function
   */


  grow(newCapacity) {
    if (newCapacity == null || newCapacity <= 0) {
      throw new Error(`Invalid capacity ${newCapacity}, newCapacity must be > 0`);
    }

    for (let i = this.capacity; i < newCapacity - 1; i++) {
      this.availableIndices.set(i, i + 1);
    }

    this.nextAvailableIndex = this.capacity;
    this.capacity = newCapacity;
  }
  /**
   * Returns true if there are available ids
   */


  get hasFreeSpace() {
    return this.nextAvailableIndex != null;
  }
  /**
   * Frees __index__ for re-use
   * @param index The index to free
   * @throws An error for an invalid index
   */


  free(index) {
    if (index == null || index < 0 || index > this.capacity - 1) {
      throw new Error(`Invalid index ${index}`);
    }

    this.availableIndices.set(index, this.nextAvailableIndex);
    this.nextAvailableIndex = index;
  }
  /**
   * Allocates a new index
   *
   * @throws An error if there is no space available
   */


  alloc() {
    if (this.nextAvailableIndex == null) {
      throw new Error('error allocating index, no space available');
    }

    const freeIndex = this.nextAvailableIndex;
    this.nextAvailableIndex = this.availableIndices.get(freeIndex) > 0 ? this.availableIndices.get(freeIndex) : undefined;
    this.availableIndices.delete(freeIndex);
    return freeIndex;
  }
  /**
   * Returns an iterator for the used slots
   */


  *used() {
    // Shortcut
    if (this.availableIndices.size === 0 && (this.nextAvailableIndex === -1 || this.nextAvailableIndex === undefined)) {
      for (let i = 0; i < this.capacity; ++i) {
        yield i;
      }
    } else {
      for (let i = 0; i < this.capacity; ++i) {
        if (!this.availableIndices.has(i) && this.nextAvailableIndex !== i) {
          yield i;
        }
      }
    }
  }
  /**
   * Returns true if the given index has been allocated
   * @param index The index to check
   */


  has(index) {
    return index >= 0 && index < this.capacity && !this.availableIndices.has(index);
  }
  /**
   * Returns the number of used indices
   */


  get usedCount() {
    return this.capacity - this.availableIndices.size;
  }
  /**
   * Destroy's the allocator
   */


  destroy() {
    this.availableIndices = new Map();
    this.nextAvailableIndex = -1;
  }

}

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/store/defaults.ts":
/*!**************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/store/defaults.ts ***!
  \**************************************************************************************************************************************************/
/*! exports provided: DEFAULT_CAPACITY, DEFAULT_SHARED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_CAPACITY", function() { return DEFAULT_CAPACITY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_SHARED", function() { return DEFAULT_SHARED; });
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const DEFAULT_CAPACITY = 10000;
/**
 * The default shared value of our stores
 */

const DEFAULT_SHARED = true;

/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/store/index.ts":
/*!***********************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/store/index.ts ***!
  \***********************************************************************************************************************************************/
/*! exports provided: SlotAllocator, ArrayStoreImpl, IdStoreImpl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/store/types.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _SlotAllocator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SlotAllocator */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/store/SlotAllocator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SlotAllocator", function() { return _SlotAllocator__WEBPACK_IMPORTED_MODULE_1__["SlotAllocator"]; });

/* harmony import */ var _ArrayStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ArrayStore */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/store/ArrayStore.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ArrayStoreImpl", function() { return _ArrayStore__WEBPACK_IMPORTED_MODULE_2__["ArrayStoreImpl"]; });

/* harmony import */ var _IdStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./IdStore */ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/store/IdStore.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IdStoreImpl", function() { return _IdStore__WEBPACK_IMPORTED_MODULE_3__["IdStoreImpl"]; });

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */





/***/ }),

/***/ "../../../.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/store/types.ts":
/*!***********************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-memstore-virtual-221945d339/1/packages/libs/memstore/src/store/types.ts ***!
  \***********************************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "../../../.yarn/__virtual__/cache-loader-virtual-a44cf2d551/0/cache/cache-loader-npm-4.1.0-82c3da90d8-0339778bdd.zip/node_modules/cache-loader/dist/cjs.js!../../../.yarn/__virtual__/babel-loader-virtual-9514560f53/0/cache/babel-loader-npm-8.1.0-e8c38740ba-fdbcae91cc.zip/node_modules/babel-loader/lib/index.js?!../../../.yarn/__virtual__/ts-loader-virtual-5ef653d34a/0/cache/ts-loader-npm-8.0.11-a6f1286fbd-2a5b570816.zip/node_modules/ts-loader/index.js?!../../../.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/worker.ts":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /home/chtrevin/ws/graspologic-js/.yarn/__virtual__/cache-loader-virtual-a44cf2d551/0/cache/cache-loader-npm-4.1.0-82c3da90d8-0339778bdd.zip/node_modules/cache-loader/dist/cjs.js!/home/chtrevin/ws/graspologic-js/.yarn/__virtual__/babel-loader-virtual-9514560f53/0/cache/babel-loader-npm-8.1.0-e8c38740ba-fdbcae91cc.zip/node_modules/babel-loader/lib??ref--4-1!/home/chtrevin/ws/graspologic-js/.yarn/__virtual__/ts-loader-virtual-5ef653d34a/0/cache/ts-loader-npm-8.0.11-a6f1286fbd-2a5b570816.zip/node_modules/ts-loader??ref--4-2!/home/chtrevin/ws/graspologic-js/.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/worker.ts ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factory */ "../../../.yarn/__virtual__/@graspologic-layout-openord-virtual-d415035778/1/packages/libs/layout-openord/src/factory.ts");
/* harmony import */ var _graspologic_graph__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @graspologic/graph */ "../../../.yarn/__virtual__/@graspologic-graph-virtual-3961d3c38a/1/packages/libs/graph/src/index.ts");
/* harmony import */ var _graspologic_layout_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @graspologic/layout-core */ "../../../.yarn/__virtual__/@graspologic-layout-core-virtual-a126a25cb9/1/packages/libs/layout-core/src/index.ts");



let executor;
let subscription;
self.console.log('openord worker bootstrapping');
/**
 * Listens for messages from the layout exectuor
 */

self.onmessage = message => {
  const {
    type,
    payload
  } = message.data;
  self.console.log('openord receive message', type);

  switch (type) {
    case _graspologic_layout_core__WEBPACK_IMPORTED_MODULE_2__["WorkerMessageType"].Configure:
      {
        var _executor;

        (_executor = executor) === null || _executor === void 0 ? void 0 : _executor.configure(payload);
        break;
      }

    case _graspologic_layout_core__WEBPACK_IMPORTED_MODULE_2__["WorkerMessageType"].Execute:
      {
        stopExecution();
        terminateExecution();
        startExecution(payload);
        break;
      }

    case _graspologic_layout_core__WEBPACK_IMPORTED_MODULE_2__["WorkerMessageType"].Halt:
      {
        haltExecution();
        break;
      }

    case _graspologic_layout_core__WEBPACK_IMPORTED_MODULE_2__["WorkerMessageType"].Reset:
      {
        stopExecution();
        executor = undefined;
        subscription = undefined;
        break;
      }

    case _graspologic_layout_core__WEBPACK_IMPORTED_MODULE_2__["WorkerMessageType"].Resume:
      {
        resumeExecution();
        break;
      }

    default:
      self.console.log('openord worker - unhandled message type', type);
  }
};
/**
 * Halts the execution of the layout
 */


function haltExecution() {
  if (executor != null) {
    executor.halt();
  } else {
    self.console.log('could not halt oord, instance not defined');
  }
}
/**
 * Resumes the execution of the layout
 */


function resumeExecution() {
  if (executor != null) {
    if (!executor.isHalted && !executor.isComplete) {
      executor.execute();
    } else {
      self.console.log('executor is not in a resumable state');
    }
  } else {
    self.console.log('could not resume executor, instance not defined');
  }
}
/**
 * Halts the execution of the layout
 */


function stopExecution() {
  if (executor != null) {
    executor.halt();
  } else {
    self.console.log('could not stop oord, instance not defined');
  }
}
/**
 * Terminates the execution of the layout
 */


function terminateExecution() {
  if (subscription != null) {
    subscription();
  }

  subscription = undefined;
  executor = undefined;
}
/**
 * Starts the execution of the layout
 * @param param0 The execute payload
 */


function startExecution({
  graph,
  configuration
}) {
  try {
    executor = Object(_factory__WEBPACK_IMPORTED_MODULE_0__["createInstance"])(_graspologic_graph__WEBPACK_IMPORTED_MODULE_1__["GraphContainer"].deserialize(graph), configuration, self);
    subscription = executor.on('tick', data => {
      sendMessage(_graspologic_layout_core__WEBPACK_IMPORTED_MODULE_2__["WorkerMessageType"].Progress, data);
    });
    executor.execute().then(data => {
      // clean up after execution
      if (subscription) {
        subscription();
      } // clear out execution state


      executor = undefined;
      subscription = undefined; // emit completion event

      sendMessage(_graspologic_layout_core__WEBPACK_IMPORTED_MODULE_2__["WorkerMessageType"].Complete, data);
    });
  } catch (err) {
    self.console.log('caught error', err);
    self.postMessage(_graspologic_layout_core__WEBPACK_IMPORTED_MODULE_2__["WorkerMessageType"].Error, err);
  }
}
/**
 * Sends a message to the layout executor
 * @param type The type of message
 * @param payload The payload for the message
 */


function sendMessage(type, payload) {
  self.postMessage({
    type,
    payload
  }, undefined);
}

/***/ })

/******/ });
//# sourceMappingURL=worker.[fullhash].worker.js.map