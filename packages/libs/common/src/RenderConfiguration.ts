/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	DEFAULT_DRAW_EDGES,
	DEFAULT_HIDE_EDGES_ON_MOVE,
	DEFAULT_DRAW_NODES,
	DEFAULT_HIDE_NODES_ON_MOVE,
	DEFAULT_HIDE_DESELECTED,
	DEFAULT_IS_3D,
	DEFAULT_BG_COLOR,
	DEFAULT_EDGE_CONSTANT_WIDTH,
	DEFAULT_EDGE_DEPTH_WRITE,
	DEFAULT_EDGE_ANTIALIAS,
	DEFAULT_EDGE_ALPHA,
	DEFAULT_EDGE_MIN_WIDTH,
	DEFAULT_EDGE_MAX_WIDTH,
	DEFAULT_EDGE_FILTERED_OUT_SATURATION,
	DEFAULT_EDGE_FILTERED_IN_SATURATION,
	DEFAULT_NODE_MIN_RADIUS,
	DEFAULT_NODE_MAX_RADIUS,
	DEFAULT_NODE_OUTLINE,
	DEFAULT_NODE_FILTERED_OUT_SATURATION,
	DEFAULT_NODE_FILTERED_IN_SATURATION,
	DEFAULT_CORNER_AXES,
	DEFAULT_DRAW_AXES,
	DEFAULT_INTERPOLATION_TIME,
	DEFAULT_HOVER_HIGHLIGHT_COLOR,
	DEFAULT_NODE_COUNT_HINT,
	DEFAULT_EDGE_COUNT_HINT,
	DEFAULT_WIDTH,
	DEFAULT_HEIGHT,
	DEFAULT_CAMERA_MODE,
	DEFAULT_AUTO_BIND,
} from './defaults'
import {
	ColorVector,
	CameraAdjustmentMode,
	RenderConfiguration,
	RenderConfigurationOptions,
} from './types'
import {
	PropertyContainer,
	PropertyChangeHandler,
	PropertyChangeValidator,
	areColorsEqual,
	Disconnect,
} from './utils'

// TODO: These need to be documented

// TODO: Theres got to be a way to auto gen this stuff
/**
 * Container for the render configuration
 */
class RenderConfigurationImpl implements RenderConfiguration {
	// Configurable properties
	private _drawEdges = new PropertyContainer(DEFAULT_DRAW_EDGES)
	private _hideEdgesOnMove = new PropertyContainer(DEFAULT_HIDE_EDGES_ON_MOVE)
	private _drawNodes = new PropertyContainer(DEFAULT_DRAW_NODES)
	private _hideNodesOnMove = new PropertyContainer(DEFAULT_HIDE_NODES_ON_MOVE)
	private _hideDeselected = new PropertyContainer(DEFAULT_HIDE_DESELECTED)
	private _is3D = new PropertyContainer(DEFAULT_IS_3D)
	private _backgroundColor = new PropertyContainer<ColorVector>(
		DEFAULT_BG_COLOR,
		areColorsEqual,
	)

	// Edge Properties
	private _edgeConstantWidth = new PropertyContainer(
		DEFAULT_EDGE_CONSTANT_WIDTH,
	)
	private _edgeDepthWrite = new PropertyContainer(DEFAULT_EDGE_DEPTH_WRITE)
	private _edgeAntialias = new PropertyContainer(DEFAULT_EDGE_ANTIALIAS)
	private _edgeAlpha = new PropertyContainer(DEFAULT_EDGE_ALPHA)
	private _edgeMinWidth = new PropertyContainer(DEFAULT_EDGE_MIN_WIDTH)
	private _edgeMaxWidth = new PropertyContainer(DEFAULT_EDGE_MAX_WIDTH)
	private _edgeFilteredOutSaturation = new PropertyContainer(
		DEFAULT_EDGE_FILTERED_OUT_SATURATION,
	)
	private _edgeFilteredInSaturation = new PropertyContainer(
		DEFAULT_EDGE_FILTERED_IN_SATURATION,
	)

	// Node Properties
	private _nodeMinRadius = new PropertyContainer(DEFAULT_NODE_MIN_RADIUS)
	private _nodeMaxRadius = new PropertyContainer(DEFAULT_NODE_MAX_RADIUS)
	private _nodeOutline = new PropertyContainer(DEFAULT_NODE_OUTLINE)
	private _nodeFilteredOutSaturation = new PropertyContainer(
		DEFAULT_NODE_FILTERED_OUT_SATURATION,
	)
	private _nodeFilteredInSaturation = new PropertyContainer(
		DEFAULT_NODE_FILTERED_IN_SATURATION,
	)
	private _nodeFilteredIds = new PropertyContainer<string[] | undefined>(
		undefined,
	)
	private _nodeCountHint = new PropertyContainer<number>(
		DEFAULT_NODE_COUNT_HINT,
	)
	private _edgeCountHint = new PropertyContainer<number>(
		DEFAULT_EDGE_COUNT_HINT,
	)
	private _width = new PropertyContainer<number>(DEFAULT_WIDTH)
	private _height = new PropertyContainer<number>(DEFAULT_HEIGHT)

	// Axis Properties
	private _cornerAxes = new PropertyContainer(DEFAULT_CORNER_AXES)
	private _drawAxes = new PropertyContainer(DEFAULT_DRAW_AXES)

	// Other
	private _interpolationTime = new PropertyContainer(DEFAULT_INTERPOLATION_TIME)
	private _hoverHighlightColor = new PropertyContainer<ColorVector>(
		DEFAULT_HOVER_HIGHLIGHT_COLOR,
	)
	private _autoBind = new PropertyContainer(DEFAULT_AUTO_BIND)

	private _cameraAdjustmentMode = new PropertyContainer(DEFAULT_CAMERA_MODE)

	public get backgroundColor(): ColorVector {
		return this._backgroundColor.value
	}

	public set backgroundColor(value: ColorVector) {
		this._backgroundColor.value = value
	}

	public onBackgroundColorChanged(
		handler: PropertyChangeHandler<ColorVector>,
	): Disconnect {
		return this._backgroundColor.on('change', handler)
	}

	public get drawEdges(): boolean {
		return this._drawEdges.value
	}

	public set drawEdges(value: boolean) {
		this._drawEdges.value = value
	}

	public onDrawEdgesChanged(
		handler: PropertyChangeHandler<boolean>,
	): Disconnect {
		return this._drawEdges.on('change', handler)
	}

	public get hideEdgesOnMove(): boolean {
		return this._hideEdgesOnMove.value
	}

	public set hideEdgesOnMove(value: boolean) {
		this._hideEdgesOnMove.value = value
	}

	public onHideEdgesOnMoveChanged(
		handler: PropertyChangeHandler<boolean>,
	): Disconnect {
		return this._hideEdgesOnMove.on('change', handler)
	}

	public get drawNodes(): boolean {
		return this._drawNodes.value
	}

	public set drawNodes(value: boolean) {
		this._drawNodes.value = value
	}

	public onDrawNodesChanged(
		handler: PropertyChangeHandler<boolean>,
	): Disconnect {
		return this._drawNodes.on('change', handler)
	}

	public get hideNodesOnMove(): boolean {
		return this._hideNodesOnMove.value
	}

	public set hideNodesOnMove(value: boolean) {
		this._hideNodesOnMove.value = value
	}

	public onHideNodesOnMoveChanged(
		handler: PropertyChangeHandler<boolean>,
	): Disconnect {
		return this._hideNodesOnMove.on('change', handler)
	}

	public get hideDeselected(): boolean {
		return this._hideDeselected.value
	}

	public set hideDeselected(value: boolean) {
		this._hideDeselected.value = value
	}

	public onHideDeselectedChanged(
		handler: PropertyChangeHandler<boolean>,
	): Disconnect {
		return this._hideDeselected.on('change', handler)
	}

	public get edgeConstantWidth(): boolean {
		return this._edgeConstantWidth.value
	}

	public set edgeConstantWidth(value: boolean) {
		this._edgeConstantWidth.value = value
	}

	public onEdgeConstantWidthChanged(
		handler: PropertyChangeHandler<boolean>,
	): Disconnect {
		return this._edgeConstantWidth.on('change', handler)
	}

	public get edgeDepthWrite(): boolean {
		return this._edgeDepthWrite.value
	}

	public set edgeDepthWrite(value: boolean) {
		this._edgeDepthWrite.value = value
	}

	public onEdgeDepthWriteChanged(
		handler: PropertyChangeHandler<boolean>,
	): Disconnect {
		return this._edgeDepthWrite.on('change', handler)
	}

	public get edgeAlpha(): number {
		return this._edgeAlpha.value
	}

	public set edgeAlpha(value: number) {
		this._edgeAlpha.value = value
	}

	public onEdgeAlphaChanged(
		handler: PropertyChangeHandler<number>,
	): Disconnect {
		return this._edgeAlpha.on('change', handler)
	}

	public get edgeAntialias(): boolean {
		return this._edgeAntialias.value
	}

	public set edgeAntialias(value: boolean) {
		this._edgeAntialias.value = value
	}

	public onEdgeAntialiasChanged(
		handler: PropertyChangeHandler<boolean>,
	): Disconnect {
		return this._edgeAntialias.on('change', handler)
	}

	public get edgeMinWidth(): number {
		return this._edgeMinWidth.value
	}

	public set edgeMinWidth(value: number) {
		this._edgeMinWidth.value = value
	}

	public onEdgeMinWidthChanged(
		handler: PropertyChangeHandler<number>,
	): Disconnect {
		return this._edgeMinWidth.on('change', handler)
	}

	public get edgeMaxWidth(): number {
		return this._edgeMaxWidth.value
	}

	public set edgeMaxWidth(value: number) {
		this._edgeMaxWidth.value = value
	}

	public onEdgeMaxWidthChanged(
		handler: PropertyChangeHandler<number>,
	): Disconnect {
		return this._edgeMaxWidth.on('change', handler)
	}

	public get nodeMinRadius(): number {
		return this._nodeMinRadius.value
	}

	public set nodeMinRadius(value: number) {
		this._nodeMinRadius.value = value
	}

	public onNodeMinRadiusChanged(
		handler: PropertyChangeHandler<number>,
	): Disconnect {
		return this._nodeMinRadius.on('change', handler)
	}

	public get autoBind(): boolean {
		return this._autoBind.value
	}

	public set autoBind(value: boolean) {
		this._autoBind.value = value
	}

	public get nodeMaxRadius(): number {
		return this._nodeMaxRadius.value
	}

	public set nodeMaxRadius(value: number) {
		this._nodeMaxRadius.value = value
	}

	public onNodeMaxRadiusChanged(
		handler: PropertyChangeHandler<number>,
	): Disconnect {
		return this._nodeMaxRadius.on('change', handler)
	}

	public get nodeOutline(): boolean {
		return this._nodeOutline.value
	}

	public set nodeOutline(value: boolean) {
		this._nodeOutline.value = value
	}

	public onNodeOutlineChanged(
		handler: PropertyChangeHandler<boolean>,
	): Disconnect {
		return this._nodeOutline.on('change', handler)
	}

	public get cornerAxes(): boolean {
		return this._cornerAxes.value
	}

	public set cornerAxes(value: boolean) {
		this._cornerAxes.value = value
	}

	public onCornerAxesChanged(
		handler: PropertyChangeHandler<boolean>,
	): Disconnect {
		return this._cornerAxes.on('change', handler)
	}

	public get drawAxes(): boolean {
		return this._drawAxes.value
	}

	public set drawAxes(value: boolean) {
		this._drawAxes.value = value
	}

	public onDrawAxesChanged(
		handler: PropertyChangeHandler<boolean>,
	): Disconnect {
		return this._drawAxes.on('change', handler)
	}

	public get interpolationTime(): number {
		return this._interpolationTime.value
	}

	public set interpolationTime(value: number) {
		this._interpolationTime.value = value
	}

	public onInterpolationTimeChanged(
		handler: PropertyChangeHandler<number>,
	): Disconnect {
		return this._interpolationTime.on('change', handler)
	}

	public get hoverHighlightColor(): ColorVector {
		return this._hoverHighlightColor.value
	}

	public set hoverHighlightColor(value: ColorVector) {
		this._hoverHighlightColor.value = value
	}

	public onHoverHighlightColorChanged(
		handler: PropertyChangeHandler<number[]>,
	): Disconnect {
		return this._hoverHighlightColor.on('change', handler as any)
	}

	public get is3D(): boolean {
		return this._is3D.value
	}

	public set is3D(value: boolean) {
		this._is3D.value = value
	}

	public onIs3DChanged(handler: PropertyChangeHandler<boolean>): Disconnect {
		return this._is3D.on('change', handler)
	}

	public validateOn3DChanged(
		predicate: PropertyChangeValidator<boolean>,
	): void {
		this._is3D.checkValidity(predicate)
	}

	public get edgeFilteredOutSaturation(): number {
		return this._edgeFilteredOutSaturation.value
	}

	public set edgeFilteredOutSaturation(value: number) {
		this._edgeFilteredOutSaturation.value = value
	}

	public onEdgeFilteredOutSaturationChanged(
		handler: PropertyChangeHandler<number>,
	): Disconnect {
		return this._edgeFilteredOutSaturation.on('change', handler)
	}

	public get edgeFilteredInSaturation(): number {
		return this._edgeFilteredInSaturation.value
	}

	public set edgeFilteredInSaturation(value: number) {
		this._edgeFilteredInSaturation.value = value
	}

	public onEdgeFilteredInSaturationChanged(
		handler: PropertyChangeHandler<number>,
	): Disconnect {
		return this._edgeFilteredInSaturation.on('change', handler)
	}

	public get nodeFilteredOutSaturation(): number {
		return this._nodeFilteredOutSaturation.value
	}

	public set nodeFilteredOutSaturation(value: number) {
		this._nodeFilteredOutSaturation.value = value
	}

	public onNodeFilteredOutSaturationChanged(
		handler: PropertyChangeHandler<number>,
	): Disconnect {
		return this._nodeFilteredOutSaturation.on('change', handler)
	}

	public get nodeFilteredInSaturation(): number {
		return this._nodeFilteredInSaturation.value
	}

	public set nodeFilteredInSaturation(value: number) {
		this._nodeFilteredInSaturation.value = value
	}

	public onNodeFilteredInSaturationChanged(
		handler: PropertyChangeHandler<number>,
	): Disconnect {
		return this._edgeFilteredInSaturation.on('change', handler)
	}

	public get nodeFilteredIds(): string[] | undefined {
		return this._nodeFilteredIds.value
	}

	public set nodeFilteredIds(value: string[] | undefined) {
		this._nodeFilteredIds.value = value
	}

	public onNodeFilteredIdsChanged(
		handler: PropertyChangeHandler<string[] | undefined>,
	): Disconnect {
		return this._nodeFilteredIds.on('change', handler)
	}

	public get nodeCountHint(): number {
		return this._nodeCountHint.value
	}

	public set nodeCountHint(value: number) {
		this._nodeCountHint.value = value
	}

	public onNodeCountHintChanged(
		handler: PropertyChangeHandler<number>,
	): Disconnect {
		return this._nodeCountHint.on('change', handler)
	}

	public get edgeCountHint(): number {
		return this._edgeCountHint.value
	}

	public set edgeCountHint(value: number) {
		this._edgeCountHint.value = value
	}

	public onEdgeCountHintChanged(
		handler: PropertyChangeHandler<number>,
	): Disconnect {
		return this._edgeCountHint.on('change', handler)
	}

	public get width(): number {
		return this._width.value
	}

	public set width(value: number) {
		this._width.value = value
	}

	public onWidthChanged(handler: PropertyChangeHandler<number>): Disconnect {
		return this._width.on('change', handler)
	}

	public get height(): number {
		return this._height.value
	}

	public set height(value: number) {
		this._height.value = value
	}

	public onHeightChanged(handler: PropertyChangeHandler<number>): Disconnect {
		return this._height.on('change', handler)
	}

	public get cameraAdjustmentMode(): CameraAdjustmentMode {
		return this._cameraAdjustmentMode.value
	}

	public set cameraAdjustmentMode(value: CameraAdjustmentMode) {
		this._cameraAdjustmentMode.value = value
	}

	public onCameraAdjustmentModeChanged(
		handler: PropertyChangeHandler<CameraAdjustmentMode>,
	): Disconnect {
		return this._cameraAdjustmentMode.on('change', handler)
	}

	public copy(): RenderConfigurationOptions {
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
		} = this
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
		}
	}

	/**
	 * Loads the configuration options into the configuration
	 * @param options The partial set of render configuration options
	 */
	public load(options?: Partial<RenderConfigurationOptions>) {
		Object.keys(options || {}).forEach(key => {
			;(this as any)[key] = (options as any)[key]
		})
	}
}

/**
 * @internal
 *
 * Creates a new render configuration
 * @param props The partial set of render configuration options
 */
export function createConfiguration(
	props?: Partial<RenderConfigurationOptions>,
): RenderConfiguration {
	const config = new RenderConfigurationImpl()
	config.load(props || {})
	return config
}
