import { VertexClickHandler } from '../types';
import { GraphRenderer } from '@graspologic/renderer';
/**
 * Subscribes to vertex click events on __renderer__
 * @param renderer The renderer
 * @param onVertexClick The vertex click handler
 */
export declare function useVertexClickHandler(renderer: GraphRenderer | undefined, onVertexClick: VertexClickHandler): void;
