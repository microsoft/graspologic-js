/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { scaleLinear, ScaleLinear } from 'd3-scale'
import { interpolateOranges } from 'd3-scale-chromatic'
import { useMemo, useCallback } from 'react'
import { Dimensions } from '../types'
import { useDataDimensions } from './useDataDimensions'

export function usePixelPainter(
	snapshot: number[][],
	ctx: CanvasRenderingContext2D | null,
	scale: ScaleLinear<number, number>,
	{ width, height }: Dimensions,
) {
	const [samplesWide, samplesHigh] = useDataDimensions(snapshot)
	const pixelDimensions = useMemo(
		() => ({
			width: width / samplesWide,
			height: height / samplesHigh,
		}),
		[samplesWide, samplesHigh, width, height],
	)

	const xScale = useMemo(
		() => scaleLinear().domain([0, samplesWide]).range([0, width]),
		[samplesWide, width],
	)

	const yScale = useMemo(
		() =>
			scaleLinear()
				.domain([0, samplesHigh])
				.range([height - pixelDimensions.height, 0]),
		[samplesHigh, height, pixelDimensions.height],
	)

	return usePaintPixelFunction(
		snapshot,
		ctx,
		scale as (input: number) => number,
		xScale as (input: number) => number,
		yScale as (input: number) => number,
		pixelDimensions,
	)
}

function usePaintPixelFunction(
	snapshot: number[][],
	ctx: CanvasRenderingContext2D | null,
	valueScale: (input: number) => number,
	xScale: (input: number) => number,
	yScale: (input: number) => number,
	{ width: pixelWidth, height: pixelHeight }: Dimensions,
) {
	return useCallback(
		(x: number, y: number) => {
			if (ctx) {
				ctx.fillStyle = interpolateOranges(valueScale(snapshot[y][x]))
				ctx.fillRect(xScale(x), yScale(y), pixelWidth, pixelHeight)
				ctx.stroke()
			}
		},
		[ctx, valueScale, snapshot, xScale, yScale, pixelWidth, pixelHeight],
	)
}
