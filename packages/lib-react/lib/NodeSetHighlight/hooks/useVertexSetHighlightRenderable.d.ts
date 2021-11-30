import { VertexSetRenderable } from '@graspologic/renderables-support';
import { GraphRenderer, UsesWebGL } from '@graspologic/renderer';
/**
 * Creates a VertexSetRenderable
 * @param renderer The renderer
 */
export declare function useVertexSetHighlightRenderable(renderer: (GraphRenderer & Partial<UsesWebGL>) | undefined): VertexSetRenderable | undefined;
