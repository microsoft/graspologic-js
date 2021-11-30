import { VertexLabelRenderable } from '@graspologic/renderables-support';
/**
 * Adds a renderable to GraphView which will show a label on nodes as they are hovered over
 * @param onHover A vertex hover event handler
 */
export declare function useHoveredVertexRenderable(onHover: undefined | ((id: string | undefined) => void)): VertexLabelRenderable | undefined;
