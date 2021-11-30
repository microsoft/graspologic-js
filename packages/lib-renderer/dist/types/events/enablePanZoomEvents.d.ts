import { GraphRenderer } from '../types';
import { Disconnect } from '@graspologic/common';
export interface EnablePanZoomEventOptions {
    /**
     * Enable the zoom to graph operation
     *
     * @defaultValue true
     */
    zoomToGraph: boolean;
}
/**
 * Enables pan & zoom events on the given graph renderer
 * @param renderer The graph renderer
 * @returns A disconnect function
 */
export declare function enablePanZoomEvents(renderer: GraphRenderer, options?: Partial<EnablePanZoomEventOptions>): Disconnect;
