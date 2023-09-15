/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { GraphRenderer } from '@graspologic/renderer'
import { createContext } from 'react'

export const GraphRendererContext = createContext<GraphRenderer | undefined>(
	undefined,
)
