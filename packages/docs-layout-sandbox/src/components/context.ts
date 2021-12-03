/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { InputGraph } from '@graspologic/graph'
import { FA2Configuration } from '@graspologic/layout-fa2'
import { OpenOrdConfiguration } from '@graspologic/layout-openord'
import { createContext } from 'react'

export const InputGraphContext = createContext<InputGraph>({
	nodes: [],
	edges: [],
})

export const OpenOrdConfigurationContext = createContext<
	Partial<OpenOrdConfiguration>
>({})

export const FA2ConfigurationContext = createContext<Partial<FA2Configuration>>(
	{},
)
