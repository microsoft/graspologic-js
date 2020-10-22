/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { createContext } from 'react'
import { GraphRenderer } from '@graspologic/renderer'

export const GraphRendererContext = createContext<GraphRenderer | undefined>(
	undefined,
)
