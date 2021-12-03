/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { GUI } from 'dat.gui'
import { createContext } from 'react'

/**
 * @internal
 *
 * The dat.gui context
 */
export const DatGuiContext = createContext<GUI | undefined>(undefined)
