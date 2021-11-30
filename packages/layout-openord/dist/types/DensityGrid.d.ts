/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Node, Position } from '@graspologic/graph';
export declare const GRID_SIZE = 1000;
export declare const RADIUS = 10;
export declare const DIAMETER: number;
export declare const FALLOFF: number[][];
/**
 * @internal
 *
 * A node density grid to track the density of nodes in a grid pattern
 */
export declare class DensityGrid {
    initialLoad: boolean;
    private _bitmap;
    private _bins;
    private _trackedNodes;
    /**
     * Determines whether the given node is in the denisty grid
     * @param id The node id
     */
    contains(node: Node): boolean;
    /**
     * Gets the number of tracked nodes in the grid
     */
    get size(): number;
    /**
     * Gets the density bitmap
     */
    get bitmap(): Float32Array[];
    get checksum(): number;
    /**
     * Adds a node to the density grid
     * @param node The node to add to the density grid
     */
    add(node: Node): void;
    /**
     * Subtracts a node from the density grid
     */
    subtract(node: Node): void;
    private addToBitmap;
    private subtractFromBitmap;
    private addToBins;
    private subtractFromBins;
    getDensity(node: Node, testPosition: Position, fine?: boolean): number;
    private getFineDensity;
    getOverlap(node: Node, position: Position): number;
    private getCoarseDensity;
    private getDensityToExcludeAtPoint;
}
