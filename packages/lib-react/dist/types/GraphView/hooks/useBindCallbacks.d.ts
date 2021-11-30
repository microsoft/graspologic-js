import { GraphRenderer, Node } from '@graspologic/renderer';
interface CallbacksArgs {
    renderer?: GraphRenderer;
    callbacks?: {
        onInitialize?: (renderer: GraphRenderer) => void;
        onLoad?: () => void;
        onResize?: () => void;
        onNodeClick?: (node?: Node) => void;
        onNodeHover?: (node?: Node) => void;
    };
}
/**
 * This hook binds callbacks passed as React props to our underlying renderer instance
 * @param renderer
 * @param onInitialize
 */
export declare function useBindCallbacks({ renderer, callbacks }: CallbacksArgs): void;
export {};
