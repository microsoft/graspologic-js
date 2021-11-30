/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { jiggle } from '../helpers';
/**
 * @internal
 *
 * An implementation of a quad tree
 */
export class QuadTree {
    node;
    nwChild;
    neChild;
    swChild;
    seChild;
    mass = 0;
    /**
     * Center of mass X
     */
    cx = 0;
    /**
     * Center of mass Y
     */
    cy = 0;
    x0 = Number.POSITIVE_INFINITY;
    x1 = Number.NEGATIVE_INFINITY;
    y0 = Number.POSITIVE_INFINITY;
    y1 = Number.NEGATIVE_INFINITY;
    level;
    /**
     * Constructor for QuadTree
     * @param nodes The nodes in the tree
     * @param level The level of this quad tree
     */
    constructor(nodes, level = 0) {
        this.level = level;
        let node;
        let prevNode;
        let newMass;
        let numNodes = 0;
        for (node of nodes) {
            numNodes++;
            // jiggle nodes if they are co-located
            if (prevNode?.x === node.x && prevNode?.y === node.y) {
                node.x += jiggle(1e-3);
                node.y += jiggle(1e-3);
            }
            // Update center of mass
            newMass = node.mass + this.mass;
            this.cx = (node.x * node.mass + this.cx * this.mass) / newMass;
            this.cy = (node.y * node.mass + this.cy * this.mass) / newMass;
            this.mass = newMass;
            // Update bounds
            this.x0 = Math.min(this.x0, node.x);
            this.x1 = Math.max(this.x1, node.x);
            this.y0 = Math.min(this.y0, node.y);
            this.y1 = Math.max(this.y1, node.y);
            prevNode = node;
        }
        if (numNodes === 0) {
            throw new Error('there should be at least one node in a QuadTree node');
        }
        else if (numNodes === 1) {
            this.node = nodes[0];
        }
        else {
            const nwChildren = [];
            const neChildren = [];
            const swChildren = [];
            const seChildren = [];
            for (node of nodes) {
                if (node.y > this.cy) {
                    if (node.x > this.cx) {
                        neChildren.push(node);
                    }
                    else {
                        nwChildren.push(node);
                    }
                }
                else {
                    if (node.x > this.cx) {
                        seChildren.push(node);
                    }
                    else {
                        swChildren.push(node);
                    }
                }
            }
            if (neChildren.length > 0) {
                this.neChild = new QuadTree(neChildren, this.level + 1);
            }
            if (nwChildren.length > 0) {
                this.nwChild = new QuadTree(nwChildren, this.level + 1);
            }
            if (seChildren.length > 0) {
                this.seChild = new QuadTree(seChildren, this.level + 1);
            }
            if (swChildren.length > 0) {
                this.swChild = new QuadTree(swChildren, this.level + 1);
            }
        }
    }
    /**
     * Gets the depth of this quad tree
     * @returns The depth
     */
    get depth() {
        if (this.isLeaf) {
            return 0;
        }
        else {
            return (1 +
                Math.max(this.nwChild ? this.nwChild.depth : 0, this.neChild ? this.neChild.depth : 0, this.swChild ? this.swChild.depth : 0, this.seChild ? this.seChild.depth : 0));
        }
    }
    /**
     * Gets the size of the quad tree
     */
    get size() {
        return (this.x1 - this.x0) / 2;
    }
    /**
     * True if the quad tree is a leaf
     */
    get isLeaf() {
        return !this.nwChild && !this.neChild && !this.swChild && !this.seChild;
    }
    /**
     * Applies a visitor to the quad tree
     * @param callback The visitor
     */
    visit(callback) {
        const queue = [this];
        while (queue.length > 0) {
            const qt = queue.pop();
            const halt = callback(qt);
            if (!halt) {
                if (qt.nwChild) {
                    queue.push(qt.nwChild);
                }
                if (qt.neChild) {
                    queue.push(qt.neChild);
                }
                if (qt.swChild) {
                    queue.push(qt.swChild);
                }
                if (qt.seChild) {
                    queue.push(qt.seChild);
                }
            }
        }
    }
}
