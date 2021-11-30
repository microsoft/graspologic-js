/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { MemoryLayout } from '../specification';
import { Detach } from './types';
import { StoreConfig } from '.';
/**
 * Interface for buffer-backed array storage. Access to data is limited to primitive size-declared values
 * (e.g. Uint8, Uint32, Float32).
 *
 * Each size-declared type may be also define accessors in Vec2 and Vec3 formats, which indicate that we will
 * allocate 2x or 3x the space of a single value respectively, and interpret the data as a fixed-size array of 2 or 3.
 *
 * Each getter/setter combination should be named in the following way:
 *   (read|write)<type><vec?>(Offset|Attr) - e.g. readUint8Vec2Offset writeFloat32Attr()
 *
 * __Offset__ indicates that we are using the given buffer offset directly without consulting
 * with a memory layout specification. Care should be used when using this option.
 *-
 * __Attr__ indicates that we are referencing a memory layout specification and the item index to
 * determine the correct memory reference.
 */
export interface ArrayStore {
    /**
     * The store configuration
     */
    readonly config: StoreConfig;
    /**
     * The number of bytes each item consumes
     */
    readonly bytesPerItem: number;
    /**
     * Returns the number of items which should be rendered
     */
    readonly count: number;
    /**
     * The internal memory structure of the store
     */
    readonly layout: MemoryLayout;
    /**
     * Adds a resize handler for when the store resizes
     * @param handler The resize handler
     * @returns A callback for removing the handler
     */
    onResize(handler: () => void): Detach;
    /**
     * Resizes the array store
     * @param newSize The new size the ArrayStore should be
     */
    resize(newSize: number): void;
    /**
     * Returns raw item data for the given item
     * @param idx The index of the item
     * @returns An array buffer containing just the contents of the item in the memory layout of this ArrayStore
     */
    itemData(idx: number): ArrayBuffer;
    /**
     * Slurps data from the source buffer into this buffer
     * @param targetIdx The target index
     * @param sourceBuffer The source arraybuffer
     * @param sourceOffset The offset at which to start copying. Default=0
     */
    slurp(targetIdx: number, sourceBuffer: ArrayBuffer, sourceOffset?: number): void;
    /**
     * Computes the byte offset for the given item
     * @param idx The idx of the byte offset to get
     */
    getByteOffset(idx: number): number;
    /**
     * Gets the byte offset for the given attribute and item
     * @param idx The index of the item
     * @param attribute The attribute to get the byte offset for
     */
    getByteOffsetAttr(idx: number, attribute: string): number;
    /**
     * Destroys this ArrayStore
     */
    destroy(): void;
    /**
     * The backing buffer
     */
    readonly buffer: ArrayBuffer;
    /**
     * @internal
     *
     * Returns a dataview of the underlying buffer
     */
    readonly dataView: DataView;
    /**
     * @internal
     *
     * Returns the Float32Array view of the buffer
     */
    readonly float32Array: Float32Array;
    /**
     * @internal
     *
     * Returns the Uint8Array view of the buffer
     */
    readonly uint8Array: Uint8Array;
    /**
     * @internal
     *
     * Returns the Uint32Array view of the buffer
     */
    readonly uint32Array: Uint32Array;
}
/**
 * Implementation of an ArrayStore
 * @see {@link ArrayStore} for more info
 */
export declare class ArrayStoreImpl implements ArrayStore {
    readonly layout: MemoryLayout;
    readonly config: StoreConfig;
    readonly bytesPerItem: number;
    /** the underlying data storage buffer */
    private _buffer;
    private _dataView;
    private _float32Array;
    private _uint8Array;
    private _uint32Array;
    private onResizeHandlers;
    /**
     * Constructor for the ItemArrayBuffer
     * @param layout The memory layout
     * @param options The store options
     */
    constructor(layout: MemoryLayout, options?: Partial<StoreConfig>);
    /**
     * @inheritdoc
     * @see {@link ArrayStore.buffer}
     */
    get buffer(): ArrayBuffer;
    /**
     * @inheritdoc
     * @see {@link ArrayStore.dataView}
     */
    get dataView(): DataView;
    /**
     * @inheritdoc
     * @see {@link ArrayStore.float32Array}
     */
    get float32Array(): Float32Array;
    /**
     * @inheritdoc
     * @see {@link ArrayStore.uint8Array}
     */
    get uint8Array(): Uint8Array;
    /**
     * @inheritdoc
     * @see {@link ArrayStore.uint32Array}
     */
    get uint32Array(): Uint32Array;
    /**
     * @inheritdoc
     * @see {@link ArrayStore.onResize}
     */
    onResize(handler: () => void): () => void;
    /**
     * @inheritdoc
     * @see {@link ArrayStore.resize}
     */
    resize(newSize: number): void;
    /**
     * @inheritdoc
     * @see {@link ArrayStore.itemData}
     */
    itemData(idx: number): ArrayBuffer;
    /**
     * @inheritdoc
     * @see {@link ArrayStore.getByteOffset}
     */
    getByteOffset(idx: number): number;
    /**
     * @inheritdoc
     * @see {@link ArrayStore.getByteOffsetAttr}
     */
    getByteOffsetAttr(idx: number, attribute: string): number;
    /**
     * @inheritdoc
     * @see {@link ArrayStore.count}
     */
    get count(): number;
    /**
     * @inheritdoc
     * @see {@link ArrayStore.destroy}
     */
    destroy(): void;
    /**
     * @inheritdoc
     * @see {@link ArrayStore.slurp}
     */
    slurp(targetIdx: number, sourceBuffer: ArrayBuffer, sourceOffset?: number): void;
}
