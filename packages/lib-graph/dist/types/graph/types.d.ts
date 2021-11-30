/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Shape } from '../primitives';
export declare type NodeId = string;
export declare type NodeIndex = number;
export declare type EdgeWeight = number;
/**
 * A graph representation to use for worker-wire transport.
 * Workers should use SharedArrayBuffer to minimize serialization/deserialization
 */
export interface TransportGraph {
    nodes: ArrayBuffer;
    edges: ArrayBuffer;
}
/**
 * An unprocessed graph
 */
export interface InputGraph {
    nodes: InputNode[];
    edges: InputEdge[];
}
/**
 * An unprocessed node
 */
export interface InputNode {
    id: string;
    size?: number;
    radius?: number;
    weight?: number;
    label?: string;
    group?: string;
    shape?: Shape | 'square' | 'diamond' | 'circle';
    color?: number;
    x?: number;
    y?: number;
    z?: number;
}
/**
 * An unprocessed edge
 */
export interface InputEdge {
    source: string;
    target: string;
    weight?: number;
    color?: number;
    sourceColor?: number;
    color2?: number;
    targetColor?: number;
}
/**
 * A mapping between every node to the nodes it's connected to
 */
export declare type AdjacencyMap = Map<NodeIndex, Record<NodeIndex, EdgeWeight>>;
