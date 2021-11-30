import { GraphContainer } from './GraphContainer';
import { InputGraph } from './types';
/**
 * The set of graph options to intern a pojo graph into a GraphContainer
 */
export interface InternGraphOptions {
    /**
     * A flag indicating to use SharedArrayBuffer memory,
     *
     * @defaultValue true
     */
    shareable?: boolean;
    /**
     * If present, randomizes non-existing node positions within the given range.
     * Arg=[minx, maxx, miny, maxy]
     */
    randomize?: [number, number, number, number];
    /**
     * The default value to use when edge weights are not present.
     *
     * @defaultValue 1
     */
    defaultEdgeWeight?: number;
}
export declare const DEFAULT_INTERN_GRAPH_OPTIONS: Readonly<{
    defaultEdgeWeight: number;
    shareable: boolean;
}>;
/**
 * @internal
 *
 * Interns a raw graph into a GraphContainer, used by graspologic
 * @param input A raw input graph
 * @param options: internization options
 * @returns The GraphContainer
 */
export declare function internGraph(input: InputGraph, { shareable, randomize, defaultEdgeWeight, }?: Partial<InternGraphOptions>): GraphContainer;
