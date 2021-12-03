/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { memo, useRef } from 'react'
import styled from 'styled-components'
import { useDataScale } from './hooks/useDataScale'
import { useDrawingContext } from './hooks/useDrawingContext'
import { usePanZoom } from './hooks/usePanZoom'
import { usePixelField } from './hooks/usePixelField'
import { usePixelPainter } from './hooks/usePixelPainter'
import { Dimensions } from './types'

export interface ScalarFieldProps {
	dimensions: Dimensions
	data: number[][]
	style?: React.CSSProperties
	className?: string
}

export const ScalarField: React.FC<ScalarFieldProps> = memo(
	({ className, style, dimensions, data }) => {
		const scale = useDataScale(data)
		const ref = useRef<HTMLCanvasElement>(null)
		const ctx = useDrawingContext(ref)
		const drawPixel = usePixelPainter(data, ctx, scale, dimensions)
		const [panZoomHandlers, panX, panY, zoom] = usePanZoom(ref, ctx)
		usePixelField(data, drawPixel, zoom, panX, panY)

		return (
			<Container style={style} className={className}>
				<canvas
					{...panZoomHandlers}
					ref={ref}
					width={dimensions.width}
					height={dimensions.height}
				/>
				<ZoomLabel>Zoom: {zoom.toFixed(2)}x</ZoomLabel>
			</Container>
		)
	},
)
ScalarField.displayName = 'ScalarField'

const Container = styled.div`
	position: relative;
`

const ZoomLabel = styled.div`
	font-family: sans-serif;
	font-weight: 100;
	position: absolute;
	bottom: 0;
	right: 0;
`
