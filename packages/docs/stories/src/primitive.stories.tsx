/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { number, withKnobs, boolean, radios } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React, { useEffect, useRef, useState } from 'react'

import { getRandomArbitrary, getRandomInt } from './utils'
import { NodeImpl, EdgeImpl, AnimatableNodeImpl } from '@graspologic/graph'
import {
	WebGLGraphRenderer,
	GraphRenderer,
	CameraAdjustmentMode,
	enablePanZoomEvents,
} from '@graspologic/renderer'

const node = () => new AnimatableNodeImpl()
const edge = () => new EdgeImpl()

interface WithGraphRendererProps {
	onRender?: (renderer: GraphRenderer, renderTimeDelta: number) => number | void
	onRendererReady?: (renderer: GraphRenderer) => void
	onDestroy?: (renderer: GraphRenderer) => void
	nodeCountHint?: number
	edgeCountHint?: number
	dependencies?: any[]
	width?: number
	height?: number
	cameraAdjustmentMode?: CameraAdjustmentMode
}
const WithGraphRenderer = ({
	onRender,
	onRendererReady,
	width = 500,
	height = 500,
	nodeCountHint,
	edgeCountHint,
	onDestroy,
	dependencies = [],
	cameraAdjustmentMode = CameraAdjustmentMode.Viewport,
}: WithGraphRendererProps) => {
	const renderRef = useRef<HTMLDivElement>(null)
	const [, setRenderer] = useState<GraphRenderer | undefined>(undefined)

	// Create the Renderer Instance when the ref changes
	useEffect(() => {
		let rafId: any
		let newRenderer: GraphRenderer | undefined
		let destroyed = false
		const { current } = renderRef
		if (current) {
			newRenderer = WebGLGraphRenderer.createInstance({
				nodeCountHint,
				edgeCountHint,
				width,
				height,
				cameraAdjustmentMode,
			})
			current.append(newRenderer.view)
			setRenderer(newRenderer)

			let lastRender: number | undefined = undefined
			// eslint-disable-next-line no-inner-declarations
			function loop() {
				if (!lastRender) {
					lastRender = Date.now()
				}
				if (!destroyed) {
					let engineDelta = undefined
					const renderDelta = Date.now() - lastRender
					if (onRender) {
						engineDelta = onRender(newRenderer!, renderDelta)
					}
					lastRender = Date.now()

					newRenderer!.render(
						typeof engineDelta === undefined
							? undefined
							: (engineDelta as number),
					)
					rafId = requestAnimationFrame(loop)
				}
			}

			rafId = requestAnimationFrame(loop)

			if (onRendererReady) {
				onRendererReady(newRenderer)
			}
		}
		return () => {
			destroyed = true
			if (rafId !== undefined) {
				if (current) {
					current.innerHTML = ''
				}
				cancelAnimationFrame(rafId)
			}
			if (newRenderer) {
				if (onDestroy) {
					onDestroy(newRenderer)
				}
				newRenderer.destroy()
			}
		}
	}, [
		cameraAdjustmentMode,
		edgeCountHint,
		height,
		nodeCountHint,
		onDestroy,
		onRender,
		onRendererReady,
		renderRef,
		width,
	])
	return (
		<div
			ref={renderRef}
			style={{ width: `${width}px`, height: `${height}px` }}
		></div>
	)
}

storiesOf('Primitive API', module)
	.addDecorator(withKnobs)
	.add('single node', () => {
		const n1 = new NodeImpl()
		n1.id = 'A'
		n1.position = [0, 0, 0]
		n1.color = 0xff0000ff
		n1.radius = 2
		return (
			<WithGraphRenderer
				onRendererReady={renderer => {
					renderer.scene.add([n1])
				}}
			/>
		)
	})
	.add('layout test', () => {
		const shapeRadio = radios(
			'Shape',
			{
				Square: '1',
				Diamond: '2',
				Circle: '3',
			},
			'3',
		)
		const shape = parseInt(shapeRadio, 10)
		const offsetX = number('Offset X', 0, {
			min: -500,
			max: 500,
			step: 1,
			range: true,
		})
		const offsetY = number('Offset Y', 0, {
			min: -500,
			max: 500,
			step: 1,
			range: true,
		})

		const n1 = node()
		n1.id = 'CENTER'
		n1.position = [0 + offsetX, 0 + offsetY, 0]
		n1.color = 0xff0000ff
		n1.shape = shape
		n1.radius = 1

		const n2 = node()
		n2.id = 'LOWER_LEFT'
		n2.position = [-2 + offsetX, -2 + offsetY, 0]
		n2.color = 0xff00ff00
		n2.shape = shape
		n2.radius = 1

		const n3 = node()
		n3.id = 'LOWER_RIGHT'
		n3.position = [2 + offsetX, -2 + offsetY, 0]
		n3.color = 0xffff0000
		n3.shape = shape
		n3.radius = 1

		const n4 = node()
		n4.id = 'UPPER_LEFT'
		n4.position = [-2 + offsetX, 2 + offsetY, 0]
		n4.color = 0xffffff00
		n4.shape = shape
		n4.radius = 1

		const n5 = node()
		n5.id = 'UPPER_RIGHT'
		n5.position = [2 + offsetX, 2 + offsetY, 0]
		n5.color = 0xff00ffff
		n5.shape = shape
		n5.radius = 1

		const nodes = [n1, n2, n3, n4, n5]
		let cachedRenderer: GraphRenderer | undefined
		return (
			<div>
				<button onClick={() => cachedRenderer?.zoomToGraph()}>
					Zoom to extents
				</button>
				<WithGraphRenderer
					cameraAdjustmentMode={CameraAdjustmentMode.None}
					dependencies={[shape, offsetX, offsetY]}
					onRendererReady={renderer => {
						cachedRenderer = renderer
						renderer.config.backgroundColor = [0, 0, 0, 1]
						renderer.config.interpolationTime = 0
						renderer.scene.add(nodes)
						renderer.onInitialize(() => {
							enablePanZoomEvents(renderer)
							renderer.zoomToGraph()
						})
					}}
				/>
			</div>
		)
	})
	.add('static nodes', () => {
		const n1 = node()
		n1.id = 'BLUE'
		n1.position = [0, 0, 0]
		n1.color = 0xffff0000
		n1.weight = 1

		const n2 = node()
		n2.id = 'RED'
		n2.position = [0, 50, 0]
		n2.color = 0xff0000ff
		n2.weight = 2

		const n3 = node()
		n3.id = 'GREEN'
		n3.position = [0, 100, 0]
		n3.color = 0xff00ff00
		n3.weight = 3

		const nodes = [n1, n2, n3]
		return (
			<WithGraphRenderer
				onRendererReady={renderer => {
					renderer.onInitialize(() => {
						renderer.scene.add(nodes)
						renderer.updateWeights()
					})
				}}
			/>
		)
	})
	.add('hex colors', () => {
		const n1 = node()
		n1.id = 'GREEN'
		n1.position = [0, 150, 0]
		n1.color = 0xff00ff00
		n1.weight = 3

		const e1 = edge()
		e1.sourcePosition = [-50, 120, 0]
		e1.targetPosition = [50, 120, 0]
		e1.color = 0xff00ff00
		e1.weight = 3

		const n2 = node()
		n2.id = 'RED'
		n2.position = [0, 100, 0]
		n2.color = 0xffff0000
		n2.weight = 1.5

		const e2 = edge()
		e2.sourcePosition = [-50, 80, 0]
		e2.targetPosition = [50, 80, 0]
		e2.color = 0xffff0000
		e2.weight = 3

		const n3 = node()
		n3.id = 'BLUE'
		n3.position = [0, 60, 0]
		n3.color = 0xff0000ff
		n3.weight = 0.75

		const e3 = edge()
		e3.sourcePosition = [-50, 40, 0]
		e3.targetPosition = [50, 40, 0]
		e3.color = 0xff0000ff
		e3.weight = 3

		const n4 = node()
		n4.id = 'CYAN'
		n4.position = [0, 25, 0]
		n4.color = 0xff00ffff
		n4.weight = 0.375

		const e4 = edge()
		e4.sourcePosition = [-50, 12.5, 0]
		e4.targetPosition = [50, 12.5, 0]
		e4.color = 0xff00ffff
		e4.weight = 3

		const n5 = node()
		n5.id = 'WHITE'
		n5.position = [0, 0, 0]
		n5.color = 0xffffffff
		n5.weight = 0.1875

		const e5 = edge()
		e5.sourcePosition = [-50, -15, 0]
		e5.targetPosition = [50, -15, 0]
		e5.color = 0xffffffff
		e5.weight = 3

		const nodes = [n1, e1, n2, e2, n3, e3, n4, e4, n5, e5]
		return (
			<WithGraphRenderer
				onRendererReady={renderer => {
					renderer.scene.add(nodes)
				}}
			/>
		)
	})
	.add('dynamic nodes', () => {
		const nodeCount = number('Node Count', 10, {
			min: 10,
			max: 100000,
			step: 1,
			range: false,
		})
		const randomizeLayout = boolean('Random layout each render?', false)
		const nodes = Array.from({ length: nodeCount }).map((a, i) => {
			const n = node()
			n.position = [Math.random() * 200, Math.random() * 200, 0]
			n.color = 0x0000ffff
			n.weight = 0.1
			return n
		})
		return (
			<WithGraphRenderer
				onRendererReady={renderer => {
					nodes.forEach(newNode => {
						renderer.scene.add(newNode)
					})
				}}
				onRender={renderer => {
					if (randomizeLayout) {
						nodes.forEach(n => {
							n.position = [Math.random() * 200, Math.random() * 200, 0]
						})
					}
					renderer.zoomToGraph()
				}}
				dependencies={[nodeCount, randomizeLayout]}
			/>
		)
	})
	.add('zoom to extents', () => {
		const nodeCount = number('Node Count', 10, {
			min: 10,
			max: 100000,
			step: 1,
			range: false,
		})

		function randComp() {
			return getRandomArbitrary(10000, 10500)
		}
		const randomizeLayout = boolean('Random layout each render?', false)
		const nodes = Array.from({ length: nodeCount }).map((a, i) => {
			const n = node()
			n.position = [randComp(), randComp(), 0]
			n.color = 0x00
			n.weight = 0.1
			return n
		})
		return (
			<WithGraphRenderer
				onRendererReady={renderer => {
					renderer.scene.add(nodes)

					renderer.onInitialize(() => {
						renderer.zoomToGraph()
					})
				}}
				onRender={renderer => {
					if (randomizeLayout) {
						nodes.forEach(n => {
							n.position = [randComp(), randComp(), 0]
						})
						renderer.zoomToGraph()
					}
				}}
				dependencies={[nodeCount, randomizeLayout]}
			/>
		)
	})
	.add('single node position animation, with initial duration', () => {
		const n1 = node()
		n1.id = 'CENTER'
		n1.color = 0xff0000ff
		n1.radius = 5
		// Without the initial position position, the default is 0, 0, 0
		// so this will animate from 0, 0, 0 to 200, 200, 0
		n1.animatePosition([200, 200, 0], 2000)

		const nodes = [n1]
		return (
			<WithGraphRenderer
				onRendererReady={renderer => {
					renderer.scene.add(nodes)
				}}
			/>
		)
	})
	.add('single node position animation', () => {
		const n1 = node()
		n1.id = 'CENTER'
		n1.position = [-200, -200, 0]
		n1.color = 0xff0000ff
		n1.radius = 5
		const nodes = [n1]

		return (
			<WithGraphRenderer
				onRendererReady={renderer => {
					nodes.forEach(newNode => {
						renderer.scene.add(newNode)
					})
					n1.animatePosition([200, 200, 0], 2000)
				}}
			/>
		)
	})
	.add('multiple node position tweening', () => {
		function randComp() {
			return getRandomArbitrary(-200, 200)
		}
		const nodeCount = number('Node Count', 50, {
			min: 10,
			max: 100000,
			step: 1,
			range: false,
		})
		const tweenDuration = number('Tween Duration', 2000, {
			min: 100,
			max: 100000,
			step: 1,
			range: false,
		})
		let timeout: unknown

		return (
			<WithGraphRenderer
				onRendererReady={renderer => {
					const nodes = Array.from({ length: nodeCount }).map((a, i) => {
						const n = node()
						n.color = 0xffff0000
						n.shape = getRandomInt(0, 2)
						n.radius = 1 / (Math.log(nodeCount) / Math.log(400))
						n.animatePosition([randComp(), randComp(), 0], tweenDuration)
						return n
					})

					function randomize() {
						const startTime = Date.now()
						nodes.forEach(n => {
							n.animatePosition(
								[randComp(), randComp(), 0],
								Math.max(tweenDuration - (Date.now() - startTime), 0),
							)
						})
						timeout = setTimeout(
							randomize,
							tweenDuration - (Date.now() - startTime),
						)
					}
					randomize()
					nodes.forEach(newNode => {
						renderer.scene.add(newNode)
					})
				}}
				onDestroy={() => {
					if (timeout) {
						clearTimeout(timeout as any)
						timeout = undefined
					}
				}}
				dependencies={[nodeCount, tweenDuration]}
			/>
		)
	})

	.add('multiple node color tweening', () => {
		function randComp() {
			return getRandomArbitrary(-200, 200)
		}
		const nodeCount = number('Node Count', 5, {
			min: 10,
			max: 100000,
			step: 1,
			range: false,
		})
		const tweenDuration = number('Tween Duration', 2000, {
			min: 100,
			max: 100000,
			step: 1,
			range: false,
		})
		let timeout: unknown

		return (
			<WithGraphRenderer
				onRendererReady={renderer => {
					const nodes = Array.from({ length: nodeCount }).map((a, i) => {
						const n = node()
						n.position = [randComp(), randComp(), 0]
						n.color = 0xffff0000
						n.radius = 1 / (Math.log(nodeCount) / Math.log(400))
						return n
					})

					function randomize() {
						nodes.forEach(n => {
							n.animatePosition([randComp(), randComp(), 0], tweenDuration)
							n.animateColor(
								// 0xFF << 24 +
								// getRandomArbitrary(0, 255) << 16 +
								// getRandomArbitrary(0, 255) << 8 +
								// getRandomArbitrary(0, 255),
								0xff000000 +
									getRandomArbitrary(0, 255) +
									(getRandomArbitrary(0, 255) << 8) +
									(getRandomArbitrary(0, 255) << 16),
								tweenDuration,
							)
						})
						timeout = setTimeout(randomize, tweenDuration)
					}
					randomize()
					nodes.forEach(newNode => {
						renderer.scene.add(newNode)
					})
				}}
				onDestroy={() => {
					if (timeout) {
						clearTimeout(timeout as any)
						timeout = undefined
					}
				}}
				dependencies={[nodeCount, tweenDuration]}
			/>
		)
	})

	.add('engine time', () => {
		let timeout: unknown
		const examples = [
			{
				engineTimeScale: 1,
			},
			{
				engineTimeScale: 1000,
			},
			{
				engineTimeScale: 50000,
			},
		]

		return (
			<>
				{examples.map(({ engineTimeScale }) => (
					<>
						<WithGraphRenderer
							key={engineTimeScale}
							height={50}
							onRendererReady={renderer => {
								const n = node()
								n.id = 'node_1'
								n.position = [-1, 0, 0]

								// Travel to the other side over *1* engine time
								n.animatePosition([1, 0, 0], engineTimeScale)
								n.color = 0xffff0000
								n.radius = 0.25
								renderer.scene.add(n)
							}}
							onRender={(renderer, renderTimeDelta) => {
								// We are scaling the real time by 1000
								// so 1 engineTime === 1000 real time
								renderer.camera.fitToView({
									x: { min: -1, max: 1 },
									y: { min: -1, max: 1 },
								})
								return renderTimeDelta * (engineTimeScale / 1000)
							}}
							onDestroy={() => {
								if (timeout) {
									clearTimeout(timeout as any)
									timeout = undefined
								}
							}}
						/>
						<div>
							<b>{`${engineTimeScale} engine time == 1000ms real time`}</b>
						</div>
					</>
				))}
			</>
		)
	})

	.add('update performance', () => {
		const count = 2000000
		let ourRenderer: any

		const runTest = () => {
			const list = []
			let start = Date.now()
			for (let i = 0; i < count; i++) {
				const n = node()
				n.animatePosition([500, 0, 0], 100)
				n.radius = 1

				list.push(n)
			}
			let end = Date.now()
			console.log(`Construction took ${end - start}ms`)

			start = Date.now()
			ourRenderer.scene.add(list)
			end = Date.now()
			console.log(`Adding to scene took ${end - start}ms`)

			start = Date.now()
			for (let i = 0; i < count; i++) {
				list[i].animatePosition([500, 500, 0], 100)
				list[i].radius = 10
			}
			end = Date.now()
			console.log(`Updates took ${end - start}ms`)
		}
		return (
			<>
				<button onClick={runTest}>Run Test</button>
				<WithGraphRenderer
					nodeCountHint={count}
					height={50}
					onRendererReady={renderer => {
						ourRenderer = renderer
					}}
				/>
			</>
		)
	})
	.add('starfield', () => {
		function randComp() {
			return getRandomArbitrary(-1000, 1000)
		}
		const nodeCount = number('Density', 100000, {
			min: 10,
			max: 100000,
			step: 1,
			range: false,
		})
		const speed = number('Speed', 1, {
			min: 1,
			max: 100000,
			step: 1,
			range: false,
		})
		let timeout: unknown

		return (
			<WithGraphRenderer
				onRendererReady={renderer => {
					renderer.config.interpolationTime = 0
					renderer.config.backgroundColor = [0, 0, 0, 1.0]
					renderer.config.is3D = true
					renderer.config.nodeOutline = false
					enablePanZoomEvents(renderer)
					const nodes = Array.from({ length: nodeCount }).map((a, i) => {
						const n = node()
						n.position = [
							randComp() * 2,
							randComp() * 2,
							-(Math.random() * 100000),
						]
						n.color = 0xffffffff
						n.radius = 5
						return n
					})

					function randomize() {
						nodes.forEach(n => {
							const oldCenter = [randComp() * 2, randComp() * 2]
							n.position = [
								oldCenter[0],
								oldCenter[1],
								-(Math.random() * 100000),
							]
							n.animatePosition(
								[oldCenter[0], oldCenter[1], Math.random() * 100000],
								100000 / speed,
							)
						})
					}
					randomize()
					nodes.forEach(newNode => {
						renderer.scene.add(newNode)
					})
				}}
				onDestroy={() => {
					if (timeout) {
						clearTimeout(timeout as any)
						timeout = undefined
					}
				}}
				dependencies={[nodeCount, speed]}
			/>
		)
	})
