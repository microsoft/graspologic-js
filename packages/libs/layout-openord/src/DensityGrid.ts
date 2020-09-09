/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Node, Position, distanceTo, squareDistanceTo } from '@graspologic/graph'

export const GRID_SIZE = 1000
export const RADIUS = 10
export const DIAMETER = 2 * RADIUS
export const FALLOFF = getInitialFalloffStructure()

/**
 * @internal
 *
 * A node density grid to track the density of nodes in a grid pattern
 */
export class DensityGrid {
	public initialLoad = true
	private _bitmap = getInitialDensityBitmap()
	private _bins = getInitialDensityBins()
	private _trackedNodes = new Set<number>()

	/**
	 * Determines whether the given node is in the denisty grid
	 * @param id The node id
	 */
	public contains(node: Node) {
		return this._trackedNodes.has(node.storeId)
	}

	/**
	 * Gets the number of tracked nodes in the grid
	 */
	public get size(): number {
		return this._trackedNodes.size
	}

	/**
	 * Gets the density bitmap
	 */
	public get bitmap(): Float32Array[] {
		return this._bitmap
	}

	public get checksum(): number {
		let result = 0
		for (let i = 0; i < GRID_SIZE; ++i) {
			for (let j = 0; j < GRID_SIZE; ++j) {
				result += this._bitmap[i][j]
			}
		}
		return result
	}

	/**
	 * Adds a node to the density grid
	 * @param node The node to add to the density grid
	 */
	public add(node: Node): void {
		if (this.contains(node)) {
			throw new Error(`cannot add node ${node.storeId} to density grid twice`)
		}
		this._trackedNodes.add(node.storeId)
		this.addToBins(node)
		this.addToBitmap(node)
	}

	/**
	 * Subtracts a node from the density grid
	 */
	public subtract(node: Node): void {
		if (!this.contains(node)) {
			throw new Error(`cannot remove node ${node.storeId}from density grid`)
		}
		this._trackedNodes.delete(node.storeId)
		this.subtractFromBitmap(node)
		this.subtractFromBins(node)
	}

	private addToBitmap(node: Node): void {
		const xGrid = gridIndex(node.x) - RADIUS
		const yGrid = gridIndex(node.y) - RADIUS

		for (let i = 0; i <= DIAMETER; ++i) {
			for (let j = 0; j <= DIAMETER; ++j) {
				const xIndex = xGrid + j
				const yIndex = yGrid + i
				if (isValidIndex(xIndex, yIndex)) {
					this._bitmap[yIndex][xIndex] += FALLOFF[i][j]
				}
			}
		}
	}

	private subtractFromBitmap(node: Node): void {
		const xGrid = gridIndex(node.x) - RADIUS
		const yGrid = gridIndex(node.y) - RADIUS

		for (let i = 0; i <= DIAMETER; ++i) {
			for (let j = 0; j <= DIAMETER; ++j) {
				const xIndex = xGrid + j
				const yIndex = yGrid + i
				if (isValidIndex(xIndex, yIndex)) {
					this.bitmap[yIndex][xIndex] -= FALLOFF[i][j]
				}
			}
		}
	}

	private addToBins(node: Node): void {
		const xGrid = gridIndex(node.x)
		const yGrid = gridIndex(node.y)
		verifyGridIndices(xGrid, yGrid)
		const bin = this._bins[yGrid][xGrid]
		bin[node.storeId] = node
	}

	private subtractFromBins(node: Node): void {
		const xGrid = gridIndex(node.x)
		const yGrid = gridIndex(node.y)
		verifyGridIndices(xGrid, yGrid)

		const bin = this._bins[yGrid][xGrid]
		if (bin[node.storeId]) {
			delete bin[node.storeId]
		}
	}

	// gets the density at a given position excluding the given node's contribution.
	// the node must be inserted into the denisty grid
	public getDensity(node: Node, testPosition: Position, fine = false): number {
		const INFINITE_DENSITY = 10000.0

		if (Number.isNaN(testPosition.x) || Number.isNaN(testPosition.y)) {
			throw new Error('test position has NaN component')
		} else if (!isQueryInBounds(testPosition)) {
			return INFINITE_DENSITY
		} else if (fine) {
			return this.getFineDensity(node, testPosition)
		} else {
			return this.getCoarseDensity(node, testPosition)
		}
	}
	private getFineDensity(node: Node, position: Position): number {
		const xGrid = gridIndex(position.x)
		const yGrid = gridIndex(position.y)

		let density = 0.0
		let i: number
		let j: number
		let id: string
		for (i = yGrid - 1; i <= yGrid + 1; ++i) {
			for (j = xGrid - 1; j <= xGrid + 1; ++j) {
				const bin = this._bins[i][j]
				for (id of Object.keys(bin)) {
					// exclude the current id so we don't have to do removals before density checks
					// This allows the density grid to be read-only in the update phase
					if (parseInt(id, 10) !== node.storeId) {
						const binItemPos = bin[id]
						const distance = squareDistanceTo(position, binItemPos)
						density += 1e-4 / (distance + 1e-50)
					}
				}
			}
		}
		return density
	}

	public getOverlap(node: Node, position: Position): number {
		const xGrid = gridIndex(position.x)
		const yGrid = gridIndex(position.y)

		let overlap = 0.0
		let i: number
		let j: number
		let id: string
		for (i = yGrid - 1; i <= yGrid + 1; ++i) {
			for (j = xGrid - 1; j <= xGrid + 1; ++j) {
				const bin = this._bins[i][j]
				for (id of Object.keys(bin)) {
					// exclude the current id so we don't have to do removals before density checks
					// This allows the density grid to be read-only in the update phase
					if (parseInt(id, 10) !== node.storeId) {
						const other = bin[id]
						const distance = distanceTo(position, other)
						const nodeEdgeDistance = distance - node.size - other.size
						if (nodeEdgeDistance < 0) {
							overlap += Math.abs(nodeEdgeDistance)
						}
					}
				}
			}
		}
		return overlap
	}

	private getCoarseDensity(node: Node, position: Position): number {
		const xGrid = gridIndex(position.x)
		const yGrid = gridIndex(position.y)

		// Ignore the splash density of the node value
		const ignorable = this.getDensityToExcludeAtPoint(node, position)
		const gridValue = this._bitmap[yGrid][xGrid]
		const density = gridValue - ignorable
		return density ** 2
	}

	// density queries ignore the density of the node being moved. This calculates the density value
	// to ignore
	private getDensityToExcludeAtPoint(node: Node, position: Position): number {
		const nxGrid = gridIndex(node.x)
		const nyGrid = gridIndex(node.y)
		const xGrid = gridIndex(position.x)
		const yGrid = gridIndex(position.y)
		const xDist = xGrid - nxGrid
		const yDist = yGrid - nyGrid
		const isNodeApplicable =
			!this.initialLoad &&
			this.contains(node) &&
			Math.abs(xDist) < RADIUS &&
			Math.abs(yDist) < RADIUS

		return isNodeApplicable
			? FALLOFF[Math.floor(RADIUS + yDist)][Math.floor(RADIUS + xDist)]
			: 0.0
	}
}

/**
 * Gets the initial density bitmap to use
 */
function getInitialDensityBitmap(): Float32Array[] {
	const result: Float32Array[] = []
	// Set up a density grid of zero-values and empty bins for each grid cell
	for (let i = 0; i < GRID_SIZE; ++i) {
		const row = new Float32Array(GRID_SIZE)
		result.push(row)
		for (let j = 0; j < GRID_SIZE; ++j) {
			row[j] = 0
		}
	}
	return result
}

/**
 * Gets the initial density bins to use
 */
function getInitialDensityBins(): Record<string, Node>[][] {
	const result: Record<string, Node>[][] = []
	// Set up a density grid of zero-values and empty bins for each grid cell
	for (let i = 0; i < GRID_SIZE; ++i) {
		const row: Record<string, Node>[] = []
		result.push(row)
		for (let j = 0; j < GRID_SIZE; ++j) {
			row.push({})
		}
	}
	return result
}

/**
 * gets the falloff structure to use for density insertion
 */
function getInitialFalloffStructure() {
	const result: number[][] = []
	for (let i = -RADIUS; i <= RADIUS; ++i) {
		result[i + RADIUS] = []
		for (let j = -RADIUS; j <= RADIUS; ++j) {
			const radius = RADIUS
			const iAbs = Math.abs(i)
			const jAbs = Math.abs(j)
			const iFac = (radius - iAbs) / radius
			const jFac = (radius - jAbs) / radius
			const falloffValue = iFac * jFac
			result[i + RADIUS][j + RADIUS] = falloffValue
		}
	}
	return result
}

function gridIndex(value: number): number {
	const viewToGrid = 0.25
	const halfView = (GRID_SIZE as number) * 2.0
	const result = Math.floor((value + halfView + 0.5) * viewToGrid)
	return Math.max(0, Math.min(result, GRID_SIZE - 1))
}

function verifyGridIndices(xGrid: number, yGrid: number): void {
	if (xGrid >= GRID_SIZE || yGrid >= GRID_SIZE) {
		throw new Error(`invalid grid storeId: (${xGrid}, ${yGrid})`)
	}
}

function isQueryInBounds(position: Position): boolean {
	const boundary = 10
	const xGrid = gridIndex(position.x)
	const yGrid = gridIndex(position.y)
	const isOutOfBounds = (idx: number) =>
		idx > GRID_SIZE - boundary || idx < boundary
	return !isOutOfBounds(xGrid) && !isOutOfBounds(yGrid)
}

function isValidIndex(xIndex: number, yIndex: number): boolean {
	return yIndex >= 0 && xIndex >= 0 && yIndex < GRID_SIZE && xIndex < GRID_SIZE
}
