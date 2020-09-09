/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Matrix4 } from 'math.gl'

/**
 * A 3d position
 */
export interface Position {
	/* @internal */ x: number
	/* @internal */ y: number
	/* @internal */ z: number
}

/**
 * The set of options used while rendering
 */
export interface RenderOptions {
	/**
	 * @internal
	 * The model view matrix
	 */
	modelViewMatrix: Matrix4

	/**
	 * @internal
	 * The projection matrix
	 */
	projectionMatrix: Matrix4

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
