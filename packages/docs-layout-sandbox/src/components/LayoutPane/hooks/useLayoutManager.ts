/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable @typescript-eslint/no-var-requires */
import { LayoutWorkerManager } from '@graspologic/layout-core'
import {
	OpenOrdConfiguration,
	OpenOrdTickProgress,
} from '@graspologic/layout-openord'
import { useMemo, useEffect, useContext } from 'react'
import { LayoutAlgorithm } from '../../../types'
import {
	OpenOrdConfigurationContext,
	FA2ConfigurationContext,
} from '../../context'

declare const require: any

export function useLayoutManager(
	algorithm: LayoutAlgorithm,
): LayoutWorkerManager<any, any> {
	const manager = useOpenOrdManagerInstance(algorithm)
	useApplyConfiguration(algorithm, manager)
	return manager
}

function getWorker(algorithm: LayoutAlgorithm) {
	return algorithm === LayoutAlgorithm.OpenOrd
		? require('worker-loader!@graspologic/layout-openord/src/worker').default()
		: require('worker-loader!@graspologic/layout-fa2/src/worker').default()
}

function useOpenOrdManagerInstance(
	algorithm: LayoutAlgorithm,
): LayoutWorkerManager<OpenOrdConfiguration, OpenOrdTickProgress> {
	return useMemo(() => {
		return new LayoutWorkerManager(() => getWorker(algorithm))
	}, [algorithm])
}

function useApplyConfiguration(
	algorithm: LayoutAlgorithm,
	manager: LayoutWorkerManager<OpenOrdConfiguration, OpenOrdTickProgress>,
) {
	const openOrdConfig = useContext(OpenOrdConfigurationContext)
	const fa2Config = useContext(FA2ConfigurationContext)
	useEffect(() => {
		if (algorithm === LayoutAlgorithm.OpenOrd) {
			manager.configure(openOrdConfig as any)
		} else {
			manager.configure(fa2Config as any)
		}
	}, [algorithm, fa2Config, manager, openOrdConfig])
}
