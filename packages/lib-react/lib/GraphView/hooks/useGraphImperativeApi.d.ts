/// <reference types="react" />
import { GraphRenderer } from '@graspologic/renderer';
/**
 * Assigns a GraphRenderer imperative api for __renderer__ to __ref__
 * @param renderer The graph renderer
 * @param ref The ref for a graph renderer
 */
export declare function useGraphImperativeApi(renderer: GraphRenderer | undefined, ref: React.Ref<GraphRenderer>): void;
