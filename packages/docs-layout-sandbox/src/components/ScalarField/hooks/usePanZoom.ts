/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect, Ref, useMemo } from 'react'
import usePanZoomEvents from 'use-pan-and-zoom'

export function usePanZoom(
	ref: Ref<HTMLCanvasElement>,
	ctx: CanvasRenderingContext2D | null,
): [
	(
		| {
				onTouchStart: (event: React.TouchEvent) => void
				onTouchMove: (event: React.TouchEvent) => void
				onTouchEnd: (event: React.TouchEvent) => void
				onTouchCancel: (event: React.TouchEvent) => void
				onMouseDown: (event: React.MouseEvent) => void
				onMouseMove: (event: React.MouseEvent) => void
				onMouseUp: () => void
				onMouseLeave: () => void
				onClickCapture: (event: React.MouseEvent) => void
		  }
		| {
				onTouchStart?: undefined
				onTouchMove?: undefined
				onTouchEnd?: undefined
				onTouchCancel?: undefined
				onMouseDown?: undefined
				onMouseMove?: undefined
				onMouseUp?: undefined
				onMouseLeave?: undefined
				onClickCapture?: undefined
		  }
	),
	number,
	number,
	number,
] {
	const panZoomConfig = useMemo(
		() => ({
			container: ref,
			minZoom: 1,
			maxZoom: 7,
		}),
		[ref],
	)
	const {
		pan: { x: panX, y: panY },
		zoom,
		panZoomHandlers,
	} = usePanZoomEvents(panZoomConfig)

	useEffect(() => {
		if (ctx) {
			console.log(`set zoom=${zoom}x, pan=(${panX}, ${panY})`)
			ctx.setTransform(zoom, 0, 0, zoom, panX, panY)
		}
	}, [ctx, zoom, panX, panY])

	return [panZoomHandlers, panX, panY, zoom]
}
