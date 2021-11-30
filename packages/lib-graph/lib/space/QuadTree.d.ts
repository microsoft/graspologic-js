import { Node } from '../primitives';
/**
 * @internal
 *
 * An implementation of a quad tree
 */
export declare class QuadTree {
    node: Node | undefined;
    nwChild: QuadTree | undefined;
    neChild: QuadTree | undefined;
    swChild: QuadTree | undefined;
    seChild: QuadTree | undefined;
    mass: number;
    /**
     * Center of mass X
     */
    cx: number;
    /**
     * Center of mass Y
     */
    cy: number;
    x0: number;
    x1: number;
    y0: number;
    y1: number;
    readonly level: number;
    /**
     * Constructor for QuadTree
     * @param nodes The nodes in the tree
     * @param level The level of this quad tree
     */
    constructor(nodes: Node[], level?: number);
    /**
     * Gets the depth of this quad tree
     * @returns The depth
     */
    get depth(): number;
    /**
     * Gets the size of the quad tree
     */
    get size(): number;
    /**
     * True if the quad tree is a leaf
     */
    get isLeaf(): boolean;
    /**
     * Applies a visitor to the quad tree
     * @param callback The visitor
     */
    visit(callback: (qt: QuadTree) => boolean): void;
}
