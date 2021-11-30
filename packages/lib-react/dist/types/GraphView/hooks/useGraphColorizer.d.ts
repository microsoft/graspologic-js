import { GraphRenderer, NodeColorizer } from '@graspologic/renderer';
/**
 * This hook will apply colors to the edges/nodes of __renderer__ using the __colorizerFn__
 * @param renderer The graph renderer
 * @param colorizerFn The colorize function
 */
export declare function useGraphColorizer(renderer: GraphRenderer | undefined, colorizerFn?: NodeColorizer): void;
