/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { MemoryLayout } from '../specification/index.js'
import { DEFAULT_SHARED, DEFAULT_CAPACITY } from './defaults.js'
import type { Detach , StoreConfig } from './types.js'

const DEFAULT_OPTIONS: StoreConfig = {
	shared: DEFAULT_SHARED,
	capacity: DEFAULT_CAPACITY,
}

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
	readonly config: StoreConfig

	/**
	 * The number of bytes each item consumes
	 */
	readonly bytesPerItem: number

	/**
	 * Returns the number of items which should be rendered
	 */
	readonly count: number

	/**
	 * The internal memory structure of the store
	 */
	readonly layout: MemoryLayout

	/**
	 * Adds a resize handler for when the store resizes
	 * @param handler The resize handler
	 * @returns A callback for removing the handler
	 */
	onResize(handler: () => void): Detach

	/**
	 * Resizes the array store
	 * @param newSize The new size the ArrayStore should be
	 */
	resize(newSize: number): void

	/**
	 * Returns raw item data for the given item
	 * @param idx The index of the item
	 * @returns An array buffer containing just the contents of the item in the memory layout of this ArrayStore
	 */
	itemData(idx: number): ArrayBuffer

	/**
	 * Slurps data from the source buffer into this buffer
	 * @param targetIdx The target index
	 * @param sourceBuffer The source arraybuffer
	 * @param sourceOffset The offset at which to start copying. Default=0
	 */
	slurp(
		targetIdx: number,
		sourceBuffer: ArrayBuffer,
		sourceOffset?: number,
	): void

	/**
	 * Computes the byte offset for the given item
	 * @param idx The idx of the byte offset to get
	 */
	getByteOffset(idx: number): number

	/**
	 * Gets the byte offset for the given attribute and item
	 * @param idx The index of the item
	 * @param attribute The attribute to get the byte offset for
	 */
	getByteOffsetAttr(idx: number, attribute: string): number

	/**
	 * Destroys this ArrayStore
	 */
	destroy(): void

	// #region internal

	/**
	 * The backing buffer
	 */
	readonly buffer: ArrayBuffer

	/**
	 * @internal
	 *
	 * Returns a dataview of the underlying buffer
	 */
	readonly dataView: DataView

	/**
	 * @internal
	 *
	 * Returns the Float32Array view of the buffer
	 */
	readonly float32Array: Float32Array

	/**
	 * @internal
	 *
	 * Returns the Uint8Array view of the buffer
	 */
	readonly uint8Array: Uint8Array

	/**
	 * @internal
	 *
	 * Returns the Uint32Array view of the buffer
	 */
	readonly uint32Array: Uint32Array

	// #endregion
}
/**
 * Implementation of an ArrayStore
 * @see {@link ArrayStore} for more info
 */
export class ArrayStoreImpl implements ArrayStore {
	public readonly config: StoreConfig
	public readonly bytesPerItem: number

	/** the underlying data storage buffer */
	private _buffer!: ArrayBuffer
	private _dataView!: DataView
	private _float32Array!: Float32Array
	private _uint8Array!: Uint8Array
	private _uint32Array!: Uint32Array
	private onResizeHandlers: Array<() => void> = []

	/**
	 * Constructor for the ItemArrayBuffer
	 * @param layout The memory layout
	 * @param options The store options
	 */
	public constructor(
		public readonly layout: MemoryLayout,
		options: Partial<StoreConfig> = DEFAULT_OPTIONS,
	) {
		// determine capacity based on the following:
		// * if an explicit value is provided, use that
		// * if a buffer is provided, calculate the buffer capacity
		// * else use default capacity
		const capacity =
			options.capacity ||
			(options.buffer?.byteLength || 0) / layout.stride ||
			DEFAULT_CAPACITY

		this.config = {
			capacity,
			shared:
				typeof options.shared === 'boolean' ? options.shared : DEFAULT_SHARED,
		}
		this.bytesPerItem = layout.stride

		if (options.buffer) {
			this._buffer = options.buffer
		}
		this.resize(this.config.capacity)
	}

	/**
	 * @inheritdoc
	 * @see {@link ArrayStore.buffer}
	 */
	public get buffer(): ArrayBuffer {
		return this._buffer
	}

	/**
	 * @inheritdoc
	 * @see {@link ArrayStore.dataView}
	 */
	public get dataView(): DataView {
		return this._dataView
	}

	/**
	 * @inheritdoc
	 * @see {@link ArrayStore.float32Array}
	 */
	public get float32Array(): Float32Array {
		return this._float32Array
	}

	/**
	 * @inheritdoc
	 * @see {@link ArrayStore.uint8Array}
	 */
	public get uint8Array(): Uint8Array {
		return this._uint8Array
	}

	/**
	 * @inheritdoc
	 * @see {@link ArrayStore.uint32Array}
	 */
	public get uint32Array(): Uint32Array {
		return this._uint32Array
	}

	/**
	 * @inheritdoc
	 * @see {@link ArrayStore.onResize}
	 */
	public onResize(handler: () => void): () => void {
		this.onResizeHandlers.push(handler)
		return () => {
			this.onResizeHandlers = this.onResizeHandlers.filter(h => h !== handler)
		}
	}

	/**
	 * @inheritdoc
	 * @see {@link ArrayStore.resize}
	 */
	public resize(newSize: number) {
		if (this.count === newSize) {
			// existing buffer is correct size, don't resize buffer
			if (!this.uint8Array) {
				// when initializing, the array aliases may be undefined when the buffer is
				this._uint8Array = new Uint8Array(this._buffer)
				this._uint32Array = new Uint32Array(this._buffer)
				this._float32Array = new Float32Array(this._buffer)
			}
			return
		} else {
			const oldSize = this.count
			const oldData = this.buffer

			// create a new byte array
			const numBytes = newSize * this.bytesPerItem
			if (numBytes % 4 !== 0) {
				throw new Error(
					`buffer size ${numBytes} must be word-aligned. size=${newSize}, bpi=${this.bytesPerItem}`,
				)
			}
			const newBuffer =
				this.config.shared && typeof SharedArrayBuffer !== 'undefined'
					? new SharedArrayBuffer(numBytes)
					: new ArrayBuffer(numBytes)

			if (oldSize > 0 && newSize > oldSize) {
				// copy the old data in
				const newByteArray = new Uint8Array(newBuffer)
				newByteArray.set(new Uint8Array(oldData))
			}

			// set a new data view
			this._buffer = newBuffer
			this._dataView = new DataView(newBuffer)
			this._float32Array = new Float32Array(newBuffer)
			this._uint8Array = new Uint8Array(newBuffer)
			this._uint32Array = new Uint32Array(newBuffer)

			this.onResizeHandlers.forEach(h => h())
		}
	}

	/**
	 * @inheritdoc
	 * @see {@link ArrayStore.itemData}
	 */
	public itemData(idx: number): ArrayBuffer {
		if (
			idx < 0 ||
			idx * this.bytesPerItem > this.buffer.byteLength - this.bytesPerItem
		) {
			throw new Error('Index out of range')
		}
		const byteOffset = idx * this.bytesPerItem
		return this.buffer.slice(byteOffset, byteOffset + this.bytesPerItem)
	}

	/**
	 * @inheritdoc
	 * @see {@link ArrayStore.getByteOffset}
	 */
	public getByteOffset(idx: number) {
		if (process.env.NODE_ENV === 'production') {
			if (
				idx < 0 ||
				idx * this.bytesPerItem > this.buffer.byteLength - this.bytesPerItem
			) {
				throw new Error('Index out of range')
			}
		}
		return idx * this.bytesPerItem
	}

	/**
	 * @inheritdoc
	 * @see {@link ArrayStore.getByteOffsetAttr}
	 */
	public getByteOffsetAttr(idx: number, attribute: string) {
		const attribLayout = this.layout.get(attribute)
		if (process.env.NODE_ENV === 'production') {
			if (
				idx < 0 ||
				idx * this.bytesPerItem > this.buffer.byteLength - this.bytesPerItem
			) {
				throw new Error('Index out of range')
			}

			if (!attribLayout) {
				throw new Error(`Layout does not contain ${attribute}`)
			}
		}
		return idx * this.bytesPerItem + attribLayout?.offset!
	}

	/**
	 * @inheritdoc
	 * @see {@link ArrayStore.count}
	 */
	public get count(): number {
		if (this.buffer) {
			return this.buffer.byteLength / this.bytesPerItem
		} else {
			return 0
		}
	}

	/**
	 * @inheritdoc
	 * @see {@link ArrayStore.destroy}
	 */
	public destroy() {
		// Set the capacity to zero
		this.config.capacity = 0

		// Force the data to be empty
		this.resize(0)
	}

	/**
	 * @inheritdoc
	 * @see {@link ArrayStore.slurp}
	 */
	public slurp(targetIdx: number, sourceBuffer: ArrayBuffer, sourceOffset = 0) {
		if (process.env.NODE_ENV !== 'production') {
			if (!sourceBuffer) {
				throw new Error('invalid source buffer')
			}
		}

		// TODO: Check if they have compatible attributes
		this.uint8Array.set(
			new Uint8Array(sourceBuffer, sourceOffset, this.bytesPerItem),
			targetIdx * this.bytesPerItem,
		)
	}
}
