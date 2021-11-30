/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { memo } from 'react'
import styled from 'styled-components'
import { ScalarField } from '../ScalarField'
import { Dimensions } from '../ScalarField/types'

export interface ScalarFieldPaneProps {
	data: number[][]
	style?: React.CSSProperties
	className?: string
}

export const ScalarFieldPane: React.FC<ScalarFieldPaneProps> = memo(
	({ data, className, style }) => (
		<Container className={className} style={style}>
			<ScalarFieldStyled dimensions={SCALAR_FIELD_DIMENSIONS} data={data} />
		</Container>
	),
)
ScalarFieldPane.displayName = 'ScalarFieldPane'

const Container = styled.div``

const ScalarFieldStyled = styled(ScalarField)`
	border: 1px solid lightgrey;
`

const SCALAR_FIELD_DIMENSIONS: Dimensions = { width: 500, height: 500 }
