/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { DEFAULT_DRAW_EDGES, DEFAULT_HIDE_EDGES_ON_MOVE, DEFAULT_DRAW_NODES, DEFAULT_HIDE_NODES_ON_MOVE, DEFAULT_HIDE_DESELECTED, DEFAULT_IS_3D, DEFAULT_BG_COLOR, DEFAULT_EDGE_CONSTANT_WIDTH, DEFAULT_EDGE_DEPTH_WRITE, DEFAULT_EDGE_ANTIALIAS, DEFAULT_EDGE_ALPHA, DEFAULT_EDGE_MIN_WIDTH, DEFAULT_EDGE_MAX_WIDTH, DEFAULT_EDGE_FILTERED_OUT_SATURATION, DEFAULT_EDGE_FILTERED_IN_SATURATION, DEFAULT_NODE_MIN_RADIUS, DEFAULT_NODE_MAX_RADIUS, DEFAULT_NODE_OUTLINE, DEFAULT_NODE_FILTERED_OUT_SATURATION, DEFAULT_NODE_FILTERED_IN_SATURATION, DEFAULT_CORNER_AXES, DEFAULT_DRAW_AXES, DEFAULT_INTERPOLATION_TIME, DEFAULT_HOVER_HIGHLIGHT_COLOR, DEFAULT_NODE_COUNT_HINT, DEFAULT_EDGE_COUNT_HINT, DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_CAMERA_MODE, DEFAULT_AUTO_BIND, DEFAULT_BOUNDS, } from './defaults';
import { PropertyContainer, areColorsEqual, } from './utils';
// TODO: These need to be documented
// TODO: Theres got to be a way to auto gen this stuff
/**
 * Container for the render configuration
 */
class RenderConfigurationImpl {
    // Configurable properties
    _drawEdges = new PropertyContainer(DEFAULT_DRAW_EDGES);
    _hideEdgesOnMove = new PropertyContainer(DEFAULT_HIDE_EDGES_ON_MOVE);
    _drawNodes = new PropertyContainer(DEFAULT_DRAW_NODES);
    _hideNodesOnMove = new PropertyContainer(DEFAULT_HIDE_NODES_ON_MOVE);
    _hideDeselected = new PropertyContainer(DEFAULT_HIDE_DESELECTED);
    _is3D = new PropertyContainer(DEFAULT_IS_3D);
    _backgroundColor = new PropertyContainer(DEFAULT_BG_COLOR, areColorsEqual);
    // Edge Properties
    _edgeConstantWidth = new PropertyContainer(DEFAULT_EDGE_CONSTANT_WIDTH);
    _edgeDepthWrite = new PropertyContainer(DEFAULT_EDGE_DEPTH_WRITE);
    _edgeAntialias = new PropertyContainer(DEFAULT_EDGE_ANTIALIAS);
    _edgeAlpha = new PropertyContainer(DEFAULT_EDGE_ALPHA);
    _edgeMinWidth = new PropertyContainer(DEFAULT_EDGE_MIN_WIDTH);
    _edgeMaxWidth = new PropertyContainer(DEFAULT_EDGE_MAX_WIDTH);
    _edgeFilteredOutSaturation = new PropertyContainer(DEFAULT_EDGE_FILTERED_OUT_SATURATION);
    _edgeFilteredInSaturation = new PropertyContainer(DEFAULT_EDGE_FILTERED_IN_SATURATION);
    // Node Properties
    _nodeMinRadius = new PropertyContainer(DEFAULT_NODE_MIN_RADIUS);
    _nodeMaxRadius = new PropertyContainer(DEFAULT_NODE_MAX_RADIUS);
    _nodeOutline = new PropertyContainer(DEFAULT_NODE_OUTLINE);
    _nodeFilteredOutSaturation = new PropertyContainer(DEFAULT_NODE_FILTERED_OUT_SATURATION);
    _nodeFilteredInSaturation = new PropertyContainer(DEFAULT_NODE_FILTERED_IN_SATURATION);
    _nodeFilteredIds = new PropertyContainer(undefined);
    _nodeCountHint = new PropertyContainer(DEFAULT_NODE_COUNT_HINT);
    _edgeCountHint = new PropertyContainer(DEFAULT_EDGE_COUNT_HINT);
    _width = new PropertyContainer(DEFAULT_WIDTH);
    _height = new PropertyContainer(DEFAULT_HEIGHT);
    _dataBounds = new PropertyContainer(DEFAULT_BOUNDS);
    // Axis Properties
    _cornerAxes = new PropertyContainer(DEFAULT_CORNER_AXES);
    _drawAxes = new PropertyContainer(DEFAULT_DRAW_AXES);
    // Other
    _interpolationTime = new PropertyContainer(DEFAULT_INTERPOLATION_TIME);
    _hoverHighlightColor = new PropertyContainer(DEFAULT_HOVER_HIGHLIGHT_COLOR);
    _autoBind = new PropertyContainer(DEFAULT_AUTO_BIND);
    _cameraAdjustmentMode = new PropertyContainer(DEFAULT_CAMERA_MODE);
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
        const { backgroundColor, cornerAxes, drawAxes, drawEdges, drawNodes, edgeAlpha, edgeAntialias, edgeConstantWidth, edgeDepthWrite, edgeFilteredInSaturation, edgeFilteredOutSaturation, edgeMaxWidth, edgeMinWidth, hideDeselected, hideEdgesOnMove, hideNodesOnMove, hoverHighlightColor, interpolationTime, is3D, nodeFilteredIds, nodeFilteredInSaturation, nodeFilteredOutSaturation, nodeMaxRadius, nodeMinRadius, nodeOutline, nodeCountHint, edgeCountHint, width, height, cameraAdjustmentMode, autoBind, dataBounds, } = this;
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
            dataBounds,
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
export function createConfiguration(props) {
    const config = new RenderConfigurationImpl();
    config.load(props || {});
    return config;
}
