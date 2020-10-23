
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
// @ts-ignore
import * as GL from '@luma.gl/constants'

/**
 * @internal
 *
 * How we represent color in webgl land
 */
export const uint32ColorTypeMapping = {
	glType: GL.UNSIGNED_BYTE,
	size: 4,
}
