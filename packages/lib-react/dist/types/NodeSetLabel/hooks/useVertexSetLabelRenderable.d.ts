import { VertexSetLabelRenderable } from '@graspologic/renderables-support';
import type { GraphRenderer, UsesWebGL } from '@graspologic/renderer';
export declare function useVertexSetHighlightRenderable(renderer: (GraphRenderer & Partial<UsesWebGL>) | undefined): VertexSetLabelRenderable | undefined;
