/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { GL_UNSIGNED_BYTE } from './glConstants.js'

/**
 * @internal
 *
 * How we represent color in webgl land
 */
export const uint32ColorTypeMapping = {
	glType: GL_UNSIGNED_BYTE,
	size: 4,
}
