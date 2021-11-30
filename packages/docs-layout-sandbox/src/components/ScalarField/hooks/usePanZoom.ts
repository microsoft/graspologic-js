/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect, Ref, useMemo } from 'react'
// @ts-ignore
import usePanZoomEvents from 'use-pan-and-zoom'

export function usePanZoom(
	ref: Ref<HTMLCanvasElement>,
	ctx: CanvasRenderingContext2D | null,
) {
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
