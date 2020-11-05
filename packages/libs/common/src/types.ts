/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { PropertyChangeHandler } from './utils'
import { SubscriptionLike } from 'rxjs'

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export enum CameraAdjustmentMode {
	/**
	 * Camera is automatically adjusted to fit the graph to the window
	 */
	Graph,

	/**
	 * Camera is adjusted such that the graph coordinate space is a 1 to 1 mapping of the coordinate space to pixel space
	 * i.e. A node at (1000, 1000) will show up at (1000, 1000) on the screen
	 */
	Viewport,

	/**
	 * Camera is not adjusted automatically
	 */
	None,
}

/**
 * A WebGL RGBA color vector. Each slot contains a float value from 0-1.
 */
export type ColorVector = [number, number, number, number]

/**
 * Represents a set of configuration options to control the graph renderer
 */
export interface RenderConfiguration extends RenderConfigurationOptions {
	onBackgroundColorChanged(
		handler: PropertyChangeHandler<ColorVector>,
	): SubscriptionLike
	onDrawEdgesChanged(handler: PropertyChangeHandler<boolean>): SubscriptionLike
	onHideEdgesOnMoveChanged(
		handler: PropertyChangeHandler<boolean>,
	): SubscriptionLike
	onDrawNodesChanged(handler: PropertyChangeHandler<boolean>): SubscriptionLike
	onHideNodesOnMoveChanged(
		handler: PropertyChangeHandler<boolean>,
	): SubscriptionLike
	onHideDeselectedChanged(
		handler: PropertyChangeHandler<boolean>,
	): SubscriptionLike
	onEdgeConstantWidthChanged(
		handler: PropertyChangeHandler<boolean>,
	): SubscriptionLike
	onEdgeDepthWriteChanged(
		handler: PropertyChangeHandler<boolean>,
	): SubscriptionLike
	onEdgeAlphaChanged(handler: PropertyChangeHandler<number>): SubscriptionLike
	onEdgeAntialiasChanged(
		handler: PropertyChangeHandler<boolean>,
	): SubscriptionLike
	onEdgeMinWidthChanged(
		handler: PropertyChangeHandler<number>,
	): SubscriptionLike
	onEdgeMaxWidthChanged(
		handler: PropertyChangeHandler<number>,
	): SubscriptionLike
	onNodeMinRadiusChanged(
		handler: PropertyChangeHandler<number>,
	): SubscriptionLike
	onNodeMaxRadiusChanged(
		handler: PropertyChangeHandler<number>,
	): SubscriptionLike
	onNodeOutlineChanged(
		handler: PropertyChangeHandler<boolean>,
	): SubscriptionLike
	onCornerAxesChanged(handler: PropertyChangeHandler<boolean>): SubscriptionLike
	onDrawAxesChanged(handler: PropertyChangeHandler<boolean>): SubscriptionLike
	onInterpolationTimeChanged(
		handler: PropertyChangeHandler<number>,
	): SubscriptionLike
	onHoverHighlightColorChanged(
		handler: PropertyChangeHandler<number[]>,
	): SubscriptionLike
	onIs3DChanged(handler: PropertyChangeHandler<boolean>): SubscriptionLike
	onEdgeFilteredOutSaturationChanged(
		handler: PropertyChangeHandler<number>,
	): SubscriptionLike
	onEdgeFilteredInSaturationChanged(
		handler: PropertyChangeHandler<number>,
	): SubscriptionLike
	onNodeFilteredOutSaturationChanged(
		handler: PropertyChangeHandler<number>,
	): SubscriptionLike
	onNodeFilteredInSaturationChanged(
		handler: PropertyChangeHandler<number>,
	): SubscriptionLike
	onNodeFilteredIdsChanged(
		handler: PropertyChangeHandler<string[] | undefined>,
	): SubscriptionLike
	onNodeCountHintChanged(
		handler: PropertyChangeHandler<number>,
	): SubscriptionLike
	onEdgeCountHintChanged(
		handler: PropertyChangeHandler<number>,
	): SubscriptionLike
	onWidthChanged(handler: PropertyChangeHandler<number>): SubscriptionLike
	onHeightChanged(handler: PropertyChangeHandler<number>): SubscriptionLike
	onCameraAdjustmentModeChanged(
		handler: PropertyChangeHandler<CameraAdjustmentMode>,
	): SubscriptionLike
	copy(): RenderConfigurationOptions
	load(options: Partial<RenderConfigurationOptions>): void
}

/**
 * The set of graph renderer configuration options
 */
export interface RenderConfigurationOptions {
	/**
	 * The background color of the renderer
	 */
	backgroundColor: ColorVector

	/**
	 * If true, the axes will be shown in the corner
	 */
	cornerAxes: boolean

	/**
	 * If true, the axes will be drawn
	 */
	drawAxes: boolean

	/**
	 * If true, the edges will be drawn
	 */
	drawEdges: boolean

	/**
	 * If true, the nodes will be drawn
	 */
	drawNodes: boolean

	/**
	 * The opacity to apply to the edges, 0 (fully transparent) -> 1 (fully opaque)
	 */
	edgeAlpha: number

	/**
	 * If true, edges will be antialiased
	 */
	edgeAntialias: boolean

	/**
	 * If true, edges will be drawn with a constant width, regardless of zoom
	 */
	edgeConstantWidth: boolean

	/**
	 * If true, edges closer to the camera will occlude further edges
	 */
	edgeDepthWrite: boolean

	/**
	 * The saturation of edges which are _in_ the filtered set
	 */
	edgeFilteredInSaturation: number

	/**
	 * The saturation of edges which are _not in_ the filtered set
	 */
	edgeFilteredOutSaturation: number

	/**
	 * The maximum width of the edges
	 */
	edgeMaxWidth: number

	/**
	 * The minimum width of the edges
	 */
	edgeMinWidth: number

	/**
	 * If true, non-selected vertices will be hidden
	 */
	hideDeselected: boolean

	/**
	 * If true, edges will be hidden while the user is panning/zooming
	 */
	hideEdgesOnMove: boolean

	/**
	 * If true, nodes will be hidden while the user is panning/zooming
	 */
	hideNodesOnMove: boolean

	/**
	 * The default color to highlight nodes when they are hovered
	 */
	hoverHighlightColor: ColorVector

	/**
	 * The amount of time to transition between 3d mode and 2d mode
	 */
	interpolationTime: number

	/**
	 * If true, the graph should be rendered in 3d
	 */
	is3D: boolean

	/**
	 * The set of filtered node ids
	 */
	nodeFilteredIds: string[] | undefined

	/**
	 * The saturation of nodes which are _in_ the filtered set
	 */
	nodeFilteredInSaturation: number

	/**
	 * The saturation of nodes which are _not in_ the filtered set
	 */
	nodeFilteredOutSaturation: number

	/**
	 * The maximum radius of the nodes
	 */
	nodeMaxRadius: number

	/**
	 * The minimum radius of the nodes
	 */
	nodeMinRadius: number

	/**
	 * If true, nodes will be drawn with an outline
	 */
	nodeOutline: boolean

	/**
	 * Provides a hint to the renderer about how many nodes are expected
	 * so data buffers can be preallocated with the optimal size, default = 10000
	 */
	nodeCountHint: number

	/**
	 * Provides a hint to the renderer about how many edges are expected
	 * so data buffers can be preallocated with the optimal size, default = 10000
	 */
	edgeCountHint: number

	/**
	 * The width of the canvas, default = 500
	 */
	width: number

	/**
	 * The height of the canvas, default = 500
	 */
	height: number

	/**
	 * The camera mode to use
	 */
	cameraAdjustmentMode: CameraAdjustmentMode

	/**
	 * If true, when nodes/edges are dynamically changed, the data will automatically be rebound to the renderer
	 */
	autoBind: boolean
}

export interface NumberRange {
	/**
	 * The minimum value of the range
	 */
	min: number

	/**
	 * The maximum value of the range
	 */
	max: number
}

export interface Bounds2D {
	/**
	 * Represents the bounds in the x direction
	 */
	x: NumberRange

	/**
	 * Represents the bounds in the y direction
	 */
	y: NumberRange
}

export interface Bounds3D extends Bounds2D {
	/**
	 * Represents the bounds in the z direction
	 */
	z: NumberRange
}

/**
 * A generic set of bounds
 */
export type Bounds = Bounds2D & Partial<Bounds3D>


/**
 * The set of options used while rendering
 */
export interface RenderOptions {
	/**
	 * @internal
	 * The model view matrix
	 */
	modelViewMatrix: any /* Matrix4 */

	/**
	 * @internal
	 * The projection matrix
	 */
	projectionMatrix: any /* Matrix4 */

	/**
	 * @internal
	 * The current interpolation percentage for the camera transitioning from 3d to 2d
	 */
	interpolation: number

	/**
	 * @internal
	 * If true, deselected nodes should be hidden
	 */
	hideDeselected: boolean

	/**
	 * @internal
	 * The min radius of nodes
	 */
	minRadius: number

	/**
	 * @internal
	 * The max radius of nodes
	 */
	maxRadius: number

	/**
	 * @internal
	 * The size in pixels of the canvas [width, height]
	 */
	canvasPixelSize: [number, number]

	/**
	 * @internal
	 * The framebuffer to render to
	 */
	framebuffer: any

	/**
	 * @internal
	 * If true, device pixels should be used
	 */
	useDevicePixels: boolean | number

	/**
	 * @internal
	 * The current mouse position
	 */
	_mousePosition: any

	/**
	 * @internal
	 * Scale of weight to pixel size
	 */
	weightToPixel: number

	/**
	 * @internal
	 * The engine time
	 */
	engineTime: number

	/**
	 * @internal
	 * The real time
	 */
	time: number
}

export interface Renderable {
	/* @internal */ enabled: boolean
	/* @internal */ needsRedraw: boolean
	/* @internal */ draw(options: RenderOptions): void
	/* @internal */ resize(width: number, height: number): void
	/* @internal */ destroy?(): void
}