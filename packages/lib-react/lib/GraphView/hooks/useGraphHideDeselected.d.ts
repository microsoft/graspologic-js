import { GraphRenderer } from '@graspologic/renderer';
/**
 * Hides/shows deselected nodes in __renderer__ based on __hideDeselected__
 * @param renderer The renderer
 * @param hideDeselected If true, deselected vertices will be hidden
 */
export declare function useGraphHideDeselected(renderer: GraphRenderer | undefined, hideDeselected: boolean): void;
