import type { DataboundRenderable } from '@graspologic/renderables-base';
import type { GraphRenderer, Node } from '@graspologic/renderer';
/**
 * Updates __renderable__ with the set of nodes which match the __vertexIds__ ids, when __vertexIds__ changes
 * @param renderer The renderer
 * @param renderable The renderable to syncronize
 * @param vertexIds The set of vertex ids
 */
export declare function useVertexSelectionSynchronization(renderer: GraphRenderer | undefined, renderable: DataboundRenderable<Node[]> | undefined, vertexIds: string[]): void;
