import { useRef, useEffect, useState } from 'react';
import { WebGLGraphRenderer, } from '@graspologic/renderer';
/**
 * Creates a new GraphRenderer instance
 * @param nodeCountHint The number of nodes in the graph
 * @param edgeCountHint The number of edges in the graph
 * @param container The graph container to use
 * @param drawEdges If true, edges will be drawn
 */
export function useGraphRenderer(nodeCountHint, edgeCountHint, drawEdges, container, dataBounds) {
    const ref = useRef(null);
    const [renderer, setRenderer] = useState(undefined);
    // Create the Renderer Instance when the ref changes
    useEffect(() => {
        let newRenderer;
        if (ref.current) {
            const current = ref.current;
            newRenderer = WebGLGraphRenderer.createInstance({
                nodeCountHint,
                edgeCountHint,
                drawEdges,
                dataBounds,
            }, container);
            current.appendChild(newRenderer.view);
            setRenderer(newRenderer);
            return () => {
                if (newRenderer) {
                    current.removeChild(newRenderer.view);
                    newRenderer.destroy();
                }
            };
        }
    }, [nodeCountHint, edgeCountHint, drawEdges, dataBounds, container]);
    return [ref, renderer];
}
