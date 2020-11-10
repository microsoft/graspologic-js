/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	MemoryLayout,
	SpacerAttributeName,
	AttributeType,
	InterpretationHint,
} from '../specification'
import {
	MemoryReaderClass,
	MemoryReader,
	ReaderStore,
	SetterFn,
	GetterFn,
} from './types'

/**
 * Describes a property
 */
export type PropertySpecification =
	| string
	| { name: string; initialValue?: any; ephemeral?: boolean }

/**
 * Creates a MemoryReader implementation which can read the given memory layout efficiently
 * @param readerType The type of reader
 * @param layout The memory layout
 * @param additionalProperties The additional properties to add to the implementation
 * @param setterAugmenter The setter augmenter, which can be used to manipulate the underlying generated property setters
 */
export function createReader<P>(
	readerType: symbol,
	layout: MemoryLayout,
	additionalProperties: PropertySpecification[] = [],
): MemoryReaderClass<P> {
	class Impl implements MemoryReader {
		/** the store this item belongs to */
		public store!: ReaderStore<any>
		/**
		 * A flag to indicate that this item's buffer is waiting to be copied to a store.
		 * This should be idempotent across connect() invocatinos
		 */
		protected isFlushNeeded: boolean
		// cached array aliases
		public uint8Array!: Uint8Array
		public float32Array!: Float32Array
		public uint32Array!: Uint32Array
		protected propertyBag!: any

		// item data
		public storeId = -1
		public byteOffset = 0
		public wordOffset = 0

		/**
		 * Constructor for the MemoryReader implementation
		 * @param store The backing data store
		 * @param storeId The id to use when accessing the store
		 */
		public constructor(
			store: ReaderStore<any> | undefined = undefined,
			storeId = -1,
		) {
			const autobuffer = store == null
			if (autobuffer) {
				this.isFlushNeeded = true
				const buffer = new ArrayBuffer(layout.stride)
				this.uint8Array = new Uint8Array(buffer)
				this.uint32Array = new Uint32Array(buffer)
				this.float32Array = new Float32Array(buffer)
				this.propertyBag = {}
			} else {
				this.isFlushNeeded = false
				this.connect(storeId, store!)
			}

			additionalProperties.forEach(property => {
				if (typeof property !== 'string') {
					const { name, initialValue, ephemeral } = property
					if (ephemeral) {
						;(this as any)[name] = initialValue
					} else {
						this.propertyBag[name] = initialValue
					}
				}
			})
		}

		/**
		 * @inheritdoc
		 * @see {@link MemoryReader.type}
		 */
		public get type(): symbol {
			return readerType
		}

		/**
		 * @inheritdoc
		 * @see {@link MemoryReader.layout}
		 */
		public get layout(): MemoryLayout {
			return layout
		}

		/**
		 * @inheritdoc
		 * @see {@link MemoryReader.buffer}
		 */
		public get buffer(): ArrayBuffer {
			return this.uint8Array.buffer
		}

		/**
		 * @inheritdoc
		 * @see {@link MemoryReader.connect}
		 */
		public connect(storeId: number, store: ReaderStore<any>) {
			if (this.storeId !== storeId) {
				this.byteOffset = storeId * store.store.bytesPerItem
				this.wordOffset = this.byteOffset / 4
				this.storeId = storeId

				// flush this items buffer out if we're waiting for a store connection
				if (this.isFlushNeeded) {
					store.slurp(storeId, this.uint8Array.buffer, this.propertyBag)
					this.isFlushNeeded = false
				}

				// copy property bag
				this.propertyBag = store.propertyBags[storeId]
			}

			// It is important to not have " if (this.store != store) "
			// It's possible that the store doesn't change, but the underlying arrays do
			// copy array aliases
			this.store = store
			this.uint32Array = store.store.uint32Array
			this.float32Array = store.store.float32Array
			this.uint8Array = store.store.uint8Array
		}

		/**
		 * Handles an attribute being set
		 * @param name The name of the attribute
		 * @param value The value of the attribute
		 */
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		protected handleAttributeUpdated(name: string, value: unknown): void {}
	}

	const proto = Impl.prototype as any

	/**
	 * Wire layout properties into the memory layout
	 */
	layout.forEach(attribute => {
		if (attribute.name === SpacerAttributeName) {
			return
		}

		const { name, size, type, typedOffset, hint } = attribute
		let setter: SetterFn<any, Impl> | undefined
		let getter: GetterFn | undefined

		if (type === AttributeType.Float32) {
			if (size === 1) {
				//
				// Singular Float Values
				//
				getter = function (this: Impl): number {
					return this.float32Array[this.wordOffset + typedOffset]
				}
				setter = function (this: Impl, value: number) {
					this.float32Array[this.wordOffset + typedOffset] = value || 0
					this.handleAttributeUpdated(name, value)
				}
			} else if (size === 2) {
				//
				// Vec2 Float Values
				//
				getter = function (this: Impl): [number, number] {
					return [
						this.float32Array[this.wordOffset + typedOffset],
						this.float32Array[this.wordOffset + typedOffset + 1],
					]
				}
				setter = function (this: Impl, value: [number, number]) {
					this.float32Array[this.wordOffset + typedOffset] = value[0] || 0
					this.float32Array[this.wordOffset + typedOffset + 1] = value[1] || 0
					this.handleAttributeUpdated(name, value)
				}
			} else if (size === 3) {
				//
				// Vec3 Float Values
				//
				getter = function (this: Impl): [number, number, number] {
					return [
						this.float32Array[this.wordOffset + typedOffset],
						this.float32Array[this.wordOffset + typedOffset + 1],
						this.float32Array[this.wordOffset + typedOffset + 2],
					]
				}
				setter = function (this: Impl, value: [number, number, number]) {
					this.float32Array[this.wordOffset + typedOffset] = value[0] || 0
					this.float32Array[this.wordOffset + typedOffset + 1] = value[1] || 0
					this.float32Array[this.wordOffset + typedOffset + 2] = value[2] || 0
					this.handleAttributeUpdated(name, value)
				}
			}
		} else if (type === AttributeType.Uint8) {
			if (size === 1) {
				if (hint === InterpretationHint.Boolean) {
					//
					// Single Byte Boolean
					//
					getter = function (this: Impl): boolean {
						return this.uint8Array[this.byteOffset + typedOffset] > 0
					}
					setter = function (this: Impl, value: boolean) {
						this.uint8Array[this.byteOffset + typedOffset] = value ? 1 : 0
						this.handleAttributeUpdated(name, value)
					}
				} else {
					//
					// Single Byte Number
					//
					getter = function (this: Impl): number {
						return this.uint8Array[this.byteOffset + typedOffset]
					}
					setter = function (this: Impl, value: number) {
						this.uint8Array[this.byteOffset + typedOffset] = value
						this.handleAttributeUpdated(name, value)
					}
				}
			} else if (size === 2) {
				//
				// Vec2 Byte Values
				//
				getter = function (this: Impl): [number, number] {
					return [
						this.uint8Array[this.byteOffset + typedOffset],
						this.uint8Array[this.byteOffset + typedOffset + 1],
					]
				}
				setter = function (this: Impl, value: [number, number]) {
					this.uint8Array[this.byteOffset + typedOffset] = value[0] || 0
					this.uint8Array[this.byteOffset + typedOffset + 1] = value[1] || 0
					this.handleAttributeUpdated(name, value)
				}
			} else if (size === 3) {
				//
				// Vec3 Byte Values
				//
				getter = function (this: Impl) {
					return [
						this.uint8Array[this.byteOffset + typedOffset],
						this.uint8Array[this.byteOffset + typedOffset + 1],
						this.uint8Array[this.byteOffset + typedOffset + 2],
					]
				}
				setter = function (this: Impl, value: [number, number, number]) {
					this.uint8Array[this.byteOffset + typedOffset] = value[0] || 0
					this.uint8Array[this.byteOffset + typedOffset + 1] = value[1] || 0
					this.uint8Array[this.byteOffset + typedOffset + 2] = value[2] || 0
					this.handleAttributeUpdated(name, value)
				}
			} else if (size === 4) {
				//
				// Vec4 Byte Values
				//
				getter = function (this: Impl) {
					return [
						this.uint8Array[this.byteOffset + typedOffset],
						this.uint8Array[this.byteOffset + typedOffset + 1],
						this.uint8Array[this.byteOffset + typedOffset + 2],
						this.uint8Array[this.byteOffset + typedOffset + 3],
					]
				}
				setter = function (
					this: Impl,
					value: [number, number, number, number],
				) {
					this.uint8Array[this.byteOffset + typedOffset] = value[0] || 0
					this.uint8Array[this.byteOffset + typedOffset + 1] = value[1] || 0
					this.uint8Array[this.byteOffset + typedOffset + 2] = value[2] || 0
					this.uint8Array[this.byteOffset + typedOffset + 3] = value[3] || 0
					this.handleAttributeUpdated(name, value)
				}
			}
		} else if (type === AttributeType.Uint32) {
			if (size === 1) {
				//
				// Uint32 Single Values
				//
				getter = function (this: Impl) {
					return this.uint32Array[this.wordOffset + typedOffset]
				}
				setter = function (this: Impl, value: number) {
					this.uint32Array[this.wordOffset + typedOffset] = value || 0
					this.handleAttributeUpdated(name, value)
				}
			}
		}

		if (setter) {
			proto.__defineSetter__(name, setter)
		}

		if (getter) {
			proto.__defineGetter__(name, getter)
		}
	})

	/**
	 * Wire additional properties into the property bag
	 */
	additionalProperties.forEach(property => {
		const name: string = typeof property === 'string' ? property : property.name
		const ephemeral: boolean =
			typeof property !== 'string' ? Boolean(property.ephemeral) : false

		if (!ephemeral) {
			proto.__defineGetter__(name, function (this: Impl) {
				return this.propertyBag[name]
			})
			proto.__defineSetter__(name, function (this: Impl, value: any) {
				this.propertyBag[name] = value
			})
		}
	})
	return (Impl as any) as MemoryReaderClass<P>
}
