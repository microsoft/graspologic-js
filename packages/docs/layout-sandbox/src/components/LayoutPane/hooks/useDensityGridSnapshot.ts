/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect, useState } from 'react'
import { animationFrameScheduler, Observable } from 'rxjs'
import { throttleTime } from 'rxjs/operators'
import { LayoutWorkerManager } from '@graspologic/layout-core'

export function useDensityGridSnapshot(manager: LayoutWorkerManager<any, any>) {
	const [densityGridSnapshot, setDensityGridSnapshot] = useState<number[][]>([])

	/**
	 * Wire position changes into the graph api
	 */
	useEffect(
		function listenToDensityGridChanges() {
			const subscription = new Observable<any>(observer =>
				manager.on('progress', val => observer.next(val)),
			)
				.pipe(throttleTime(0, animationFrameScheduler))
				.subscribe(data => {
					if (data.densityGrid?.bitmap) {
						setDensityGridSnapshot(data.densityGrid.bitmap!)
					}
				})
			return () => subscription.unsubscribe()
		},
		[manager],
	)

	return densityGridSnapshot
}
