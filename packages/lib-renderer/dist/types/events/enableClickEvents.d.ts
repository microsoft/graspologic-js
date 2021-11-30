import { GraphRenderer } from '../types';
import { Disconnect } from '@graspologic/common';
/**
 * Enables click events on the given graph renderer
 * @param renderer The graph renderer
 * @returns A disconnect function
 */
export declare function enableClickEvents(renderer: GraphRenderer): Disconnect;
