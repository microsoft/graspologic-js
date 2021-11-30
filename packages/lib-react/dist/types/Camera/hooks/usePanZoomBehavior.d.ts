import { GraphRenderer } from '@graspologic/renderer';
/**
 * Enables pan-zoom behavior on __renderer__ of __interactive__ is true
 * @param renderer The renderer
 * @param interactive If true, the pan-zoom behavior should be enabled
 * @param doubleClickZoom If true, the double click zoom behavior will be enabled
 */
export declare function usePanZoomBehavior(renderer: GraphRenderer | undefined, interactive: boolean, doubleClickZoom: boolean): void;
