import { AxesRenderable } from '@graspologic/renderables-support';
import { UsesWebGL, GraphRenderer } from '@graspologic/renderer';
/**
 * Adds an AxesRenderable to __renderer__ which will display a set of Axes on the renderer.
 * @param renderer The graph renderer
 */
export declare function useAxesRenderable(renderer: (GraphRenderer & Partial<UsesWebGL>) | undefined): AxesRenderable | undefined;
