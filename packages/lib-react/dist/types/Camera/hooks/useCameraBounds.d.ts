import { GraphRenderer, Bounds } from '@graspologic/renderer';
/**
 * Updates the renderer's camera to use __bounds__ as it's bounds
 * @param renderer The graph renderer
 * @param bounds The new bounds
 * @param transitionDuration The time to take to transition between the camera's old position to the new one
 */
export declare function useCameraBounds(renderer: GraphRenderer | undefined, bounds?: Bounds, transitionDuration?: number): void;
