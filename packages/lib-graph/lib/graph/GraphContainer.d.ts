import { EdgeStore } from '../primitives/edge';
import { NodeStore } from '../primitives/node';
import { Position } from '../space/types';
import { InternGraphOptions } from './internGraph';
import { NodeIndex, TransportGraph, InputGraph } from './types';
/**
 * The datastructure which contains all the internal graph data required for the GraphRenderer
 */
export declare class GraphContainer {
    private _nodes;
    private _edges;
    private _originalAdjacency;
    private _adjacency;
    /**
     * @internal
     * Constructs a new instance of the GraphContainer
     * @param nodes The initial node data store
     * @param edges The initial edge data store
     */
    constructor(nodes: NodeStore, edges: EdgeStore);
    /**
     * @internal
     * Gets the underlying node store
     */
    get nodes(): NodeStore;
    /**
     * @internal
     * Gets the underlying edge store
     */
    get edges(): EdgeStore;
    /**
     * Creates an instance of the GraphContainer using the given input graph
     * @param inputGraph The pojo graph to intern
     * @param options The set of options controlling how the graph is interned, defaults to @see {@link DEFAULT_INTERN_GRAPH_OPTIONS}
     * @returns The GraphContainer
     */
    static intern(inputGraph: InputGraph, options?: InternGraphOptions): GraphContainer;
    /**
     * @internal
     * Serializes the GraphContainer instance
     * @returns The serialized version of the GraphContainer
     */
    serialize(): TransportGraph;
    /**
     * @internal
     * Deserializes the GraphContainer instance
     * @param graph The serialized version of the GraphContainer
     * @returns The deserialized GraphContainer
     */
    static deserialize(graph: TransportGraph): GraphContainer;
    /**
     * @internal
     * Retrieve neigbors of the given node. This may be reflect edge-cutting
     * performed by the algorithm
     * @param n The node index to retrieve neighbors for
     * @returns A list of neighbor node indices
     */
    getNeighbors(n: NodeIndex): NodeIndex[];
    /**
     * @internal
     * Retrieve neigbors of the given node. This will not reflect any edge-cutting
     * performed by the algorithm
     * @param n The node index to retrieve neighbors for
     * @returns A list of neighbor node indices
     */
    getNeighborsObjective(id: NodeIndex): NodeIndex[];
    /**
     * @internal
     * Gets the edge weight between two nodes, which may reflect edge-cutting.
     * @throws if source and target are not connected
     * @param source The source node index
     * @param target The target node index
     * @returns The edge weight
     */
    getEdgeWeight(source: NodeIndex, target: NodeIndex): number;
    /**
     * @internal
     * Gets the edge weight between two nodes, ignoring reflect edge-cutting
     * @throws if source and target are not connected
     * @param source The source node index
     * @param target The target node index
     * @returns The edge weight
     */
    getEdgeWeightObjective(source: NodeIndex, target: NodeIndex): number;
    /**
     * @internal
     * Returns the computed cetroid of the neighborhood that the given node is a part of
     * @param n The node to get the neighborhood centroid for
     * @returns The centroid
     */
    getNeighborhoodCentroid(n: NodeIndex): Position;
    /**
     * @internal
     * Prunes an edge
     * @param from The source node
     * @param to The target node
     */
    pruneEdge(from: NodeIndex, to: NodeIndex): void;
    /**
     * @internal
     * Gets an adjacency map
     * @param original If the original adjacency map is required
     * @returns The adjacency map
     */
    private getAdjacencyMap;
}
