import { MemoryLayout, LayoutBuilder } from './types';
export declare const SpacerAttributeName = "__SPACER__";
/**
 * @internal
 *
 * Creates a LayoutBuilder which can be used to construct a MemoryLayout
 */
export declare function createLayoutBuilder(): LayoutBuilder;
/**
 * Gets the total number of bytes required to represent a single item in memory
 * @param layout The memory layout
 */
export declare function getBytesPerItem(layout: MemoryLayout): number;
