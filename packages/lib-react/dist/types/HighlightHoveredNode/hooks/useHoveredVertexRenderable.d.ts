import { VertexSetRenderable } from '@graspologic/renderables-support';
/**
 * Adds a renderable to GraphView which will highlight nodes as they are hovered over
 * @param onHover A vertex hover event handler
 */
export declare function useHoveredVertexRenderable(onHover: undefined | ((id: string | undefined) => void)): VertexSetRenderable | undefined;
