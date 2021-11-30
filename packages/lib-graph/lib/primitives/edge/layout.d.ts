/**
 * The unique symbol for an edge
 */
export declare const edgeType: unique symbol;
/**
 * @internal
 *
 * The additional edge props
 */
export declare const ADDITIONAL_EDGE_PROPS: string[];
/**
 * @internal
 * The internal memory layout for storing edges
 */
export declare const edgeMemoryLayout: any;
/**
 * Gets the typed offset for the given attribute
 */
export declare function edgeTypedOffset(attribute: string): number | undefined;
