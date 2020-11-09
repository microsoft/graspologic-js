/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	useCallback,
	useEffect,
	useContext,
	useState,
	RefObject,
	useMemo,
} from 'react'
import { animationFrameScheduler, Observable } from 'rxjs'
import { throttleTime } from 'rxjs/operators'
import { InputGraphContext } from '../../context'
import { NodeId, Position, GraphContainer } from '@graspologic/graph'
import { LayoutWorkerManager } from '@graspologic/layout-core'
import { PositionMap, GraphRenderer } from '@graspologic/renderer'

export function useLayoutPositionChanges(
	api: RefObject<GraphRenderer>,
	manager: LayoutWorkerManager<any, any>,
) {
	const updatePositions = usePositionChangeCallback(api)
	const graphContainer = useGraphContainer()
	const positionMap = usePositionMap()

	usePositionChangeSynchronization(manager, positionMap, updatePositions)
	return useLayoutControls(
		manager,
		graphContainer,
		positionMap,
		updatePositions,
	)
}

function usePositionMap() {
	return useMemo(() => {
		const posMap: Record<NodeId, Position> = {}
		// TODO: with shared mem workers and renderer, this should no longer be necessary
		// gc.nodes.toArray().forEach((node, index) => {
		// 	posMap[gc.idMap[index]] = node
		// })
		return posMap
	}, [])
}

function usePositionChangeCallback(
	api: RefObject<GraphRenderer>,
): (positions: Record<NodeId, Position>) => void {
	return useCallback(
		(positions: Record<NodeId, Position>) => {
			if (api.current) {
				console.log('set positions', positions)
				api.current.changePositions(positions)
			}
		},
		[api],
	)
}

function usePositionChangeSynchronization(
	manager: LayoutWorkerManager<any, any>,
	positionMap: any,
	updatePositions: (positions: Record<NodeId, Position>) => void,
): void {
	/**
	 * Wire position changes into the graph api
	 */
	useEffect(
		function listenToPositionChanges() {
			const subscription = new Observable(observer =>
				manager.on('progress', val => observer.next(val)),
			)
				.pipe(throttleTime(0, animationFrameScheduler))
				.subscribe(() => updatePositions(positionMap))

			return () => subscription.unsubscribe()
		},
		[manager, positionMap, updatePositions],
	)
}

function useLayoutControls(
	manager: LayoutWorkerManager<any, any>,
	graph: GraphContainer,
	positionMap: Record<string, Position>,
	updatePositions: (postions: PositionMap) => void,
): [
	// Start
	() => void,
	// Stop
	() => void,
	// Resume
	() => void,
	// isRunning
	boolean,
] {
	const [isRunning, setIsRunning] = useState(false)
	const handleOnStart = useCallback(() => {
		setIsRunning(true)
		manager
			.layout(graph)
			.then(() => {
				console.log('done')
				updatePositions(positionMap)
				setIsRunning(false)
			})
			.catch(err => {
				console.log('caught error', err)
				setIsRunning(false)
			})
		return () => {
			manager.halt()
			manager.reset()
		}
	}, [manager, graph, positionMap, updatePositions])
	const handleOnStop = useCallback(() => {
		manager.halt()
	}, [manager])
	const handleOnResume = useCallback(() => {
		manager.resume()
	}, [manager])

	return [handleOnStart, handleOnStop, handleOnResume, isRunning]
}

function useGraphContainer(): GraphContainer {
	const graphData = useContext(InputGraphContext)
	return useMemo<GraphContainer>(
		() => GraphContainer.intern(graphData, { shareable: true }),
		[graphData],
	)
}
