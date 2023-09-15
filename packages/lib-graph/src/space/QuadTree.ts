/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { jiggle } from '../helpers/index.js'
import type { Node } from '../primitives/index.js'

/**
 * @internal
 *
 * An implementation of a quad tree
 */
export class QuadTree {
	public node: Node | undefined

	public nwChild: QuadTree | undefined
	public neChild: QuadTree | undefined
	public swChild: QuadTree | undefined
	public seChild: QuadTree | undefined

	public mass = 0

	/**
	 * Center of mass X
	 */
	public cx = 0
	/**
	 * Center of mass Y
	 */
	public cy = 0

	public x0: number = Number.POSITIVE_INFINITY
	public x1: number = Number.NEGATIVE_INFINITY
	public y0: number = Number.POSITIVE_INFINITY
	public y1: number = Number.NEGATIVE_INFINITY

	public readonly level: number

	/**
	 * Constructor for QuadTree
	 * @param nodes The nodes in the tree
	 * @param level The level of this quad tree
	 */
	public constructor(nodes: Node[], level = 0) {
		this.level = level
		let node: Node
		let prevNode: Node | undefined
		let newMass
		let numNodes = 0

		for (node of nodes) {
			numNodes++

			// jiggle nodes if they are co-located
			if (prevNode?.x === node.x && prevNode?.y === node.y) {
				node.x += jiggle(1e-3)
				node.y += jiggle(1e-3)
			}

			// Update center of mass
			newMass = node.mass + this.mass
			this.cx = (node.x * node.mass + this.cx * this.mass) / newMass
			this.cy = (node.y * node.mass + this.cy * this.mass) / newMass
			this.mass = newMass

			// Update bounds
			this.x0 = Math.min(this.x0, node.x)
			this.x1 = Math.max(this.x1, node.x)
			this.y0 = Math.min(this.y0, node.y)
			this.y1 = Math.max(this.y1, node.y)
			prevNode = node
		}

		if (numNodes === 0) {
			throw new Error('there should be at least one node in a QuadTree node')
		} else if (numNodes === 1) {
			this.node = nodes[0]
		} else {
			const nwChildren: Node[] = []
			const neChildren: Node[] = []
			const swChildren: Node[] = []
			const seChildren: Node[] = []

			for (node of nodes) {
				if (node.y > this.cy) {
					if (node.x > this.cx) {
						neChildren.push(node)
					} else {
						nwChildren.push(node)
					}
				} else {
					if (node.x > this.cx) {
						seChildren.push(node)
					} else {
						swChildren.push(node)
					}
				}
			}

			if (neChildren.length > 0) {
				this.neChild = new QuadTree(neChildren, this.level + 1)
			}
			if (nwChildren.length > 0) {
				this.nwChild = new QuadTree(nwChildren, this.level + 1)
			}
			if (seChildren.length > 0) {
				this.seChild = new QuadTree(seChildren, this.level + 1)
			}
			if (swChildren.length > 0) {
				this.swChild = new QuadTree(swChildren, this.level + 1)
			}
		}
	}

	/**
	 * Gets the depth of this quad tree
	 * @returns The depth
	 */
	public get depth(): number {
		if (this.isLeaf) {
			return 0
		} else {
			return (
				1 +
				Math.max(
					this.nwChild ? this.nwChild.depth : 0,
					this.neChild ? this.neChild.depth : 0,
					this.swChild ? this.swChild.depth : 0,
					this.seChild ? this.seChild.depth : 0,
				)
			)
		}
	}

	/**
	 * Gets the size of the quad tree
	 */
	public get size() {
		return (this.x1 - this.x0) / 2
	}

	/**
	 * True if the quad tree is a leaf
	 */
	public get isLeaf(): boolean {
		return !this.nwChild && !this.neChild && !this.swChild && !this.seChild
	}

	/**
	 * Applies a visitor to the quad tree
	 * @param callback The visitor
	 */
	public visit(callback: (qt: QuadTree) => boolean) {
		const queue: QuadTree[] = [this]
		while (queue.length > 0) {
			const qt = queue.pop()!
			const halt = callback(qt)
			if (!halt) {
				if (qt.nwChild) {
					queue.push(qt.nwChild)
				}
				if (qt.neChild) {
					queue.push(qt.neChild)
				}
				if (qt.swChild) {
					queue.push(qt.swChild)
				}
				if (qt.seChild) {
					queue.push(qt.seChild)
				}
			}
		}
	}
}
