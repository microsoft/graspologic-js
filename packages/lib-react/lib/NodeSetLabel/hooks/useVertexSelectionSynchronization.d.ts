import type { DataboundRenderable } from '@graspologic/renderables-base';
import type { GraphRenderer, Node } from '@graspologic/renderer';
export declare function useVertexSelectionSynchronization(renderer: GraphRenderer | undefined, renderable: DataboundRenderable<Node[]> | undefined, vertexIds: string[]): void;
