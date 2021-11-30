import { GraphContainer } from '@graspologic/graph';
import { Bounds3D } from '@graspologic/renderer';
/**
 * Hook for computing the data bounds of the given container
 * @param container The data to compute the data bounds for
 */
export declare function useDataBounds(container: GraphContainer): Bounds3D | undefined;
