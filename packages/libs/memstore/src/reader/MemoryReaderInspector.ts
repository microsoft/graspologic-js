/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AttributeName, AttributeType } from '../specification'
import { MemoryReader } from './types'

const FLOAT_BYTE_SIZE = Float32Array.BYTES_PER_ELEMENT

/**
 * A utility class for reading/writing individual properties of a MemoryReader
 */
export class MemoryReaderInspector {
	/**
	 * Calculates the byte offset for the given item's attribute
	 * @param itemIndex The item index of the item
	 * @param attribute The attribute
	 */
	public getByteOffset(item: MemoryReader, attribute: AttributeName) {
		const attr = item.layout.get(attribute)
		if (process.env.NODE_ENV !== 'production') {
			if (!attr) {
				throw new Error('unknown attribute: ' + attribute)
			}
		}
		return item.byteOffset + attr!.offset
	}

	public getWordOffset(item: MemoryReader, attribute: AttributeName) {
		return this.getByteOffset(item, attribute) / FLOAT_BYTE_SIZE
	}

	// #region Read/Write Generic Property

	/**
	 * Reads the __property__ for the __item__
	 * @param item The item to get the property for
	 * @param property The property to read
	 */
	public readProperty<P>(
		item: MemoryReader,
		property: AttributeName,
	): P | undefined {
		const itemProperties = item.store.propertyBags[item.storeId]
		if (itemProperties != null) {
			return itemProperties[property] as P
		}
	}

	/**
	 * Writes the __property__ for the __item__
	 * @param item The item to update
	 * @param property The property to update
	 * @param value The value of the property
	 */
	public writeProperty<P>(
		item: MemoryReader,
		property: AttributeName,
		value: P,
	): void {
		let itemProperties = item.store.propertyBags[item.storeId]
		if (!itemProperties) {
			itemProperties = {}
			item.store.propertyBags[item.storeId] = itemProperties
		}
		itemProperties[property] = value
		item.store?.notify(item.storeId, property, value)
	}

	// #endregion

	// #region Number
	/**
	 * Reads __attribute__ from __item__ as a number
	 * @param item The item to get the attribute for
	 * @param attribute The attribute to read
	 */
	public readNumber(item: MemoryReader, attribute: AttributeName): number {
		if (!item.layout.has(attribute)) {
			return this.readProperty<number>(item, attribute) || 0
		} else {
			const attrib = item.layout.get(attribute)!
			if (attrib.type === AttributeType.Uint8) {
				return this.readUint8Attr(item, attribute)
			} else if (attrib.type === AttributeType.Uint32) {
				return this.readUint32Attr(item, attribute)
			} else {
				return this.readFloat32Attr(item, attribute)
			}
		}
	}

	/**
	 * Writes __attribute__ for __item__ as a number
	 * @param item The item to update
	 * @param attribute The attribute to update
	 * @param value The attribute value
	 */
	public writeNumber(
		item: MemoryReader,
		attribute: AttributeName,
		value: number,
	): void {
		const attrib = item.layout.get(attribute)
		if (!attrib) {
			this.writeProperty(item, attribute, value)
		} else {
			if (attrib.type === AttributeType.Uint8) {
				this.writeUint8Attr(item, attribute, value)
			} else if (attrib.type === AttributeType.Uint32) {
				this.writeUint32Attr(item, attribute, value)
			} else {
				this.writeFloat32Attr(item, attribute, value)
			}
		}
		item.store?.notify(item.storeId, attribute, value)
	}

	// #endregion

	// #region String

	/**
	 * Reads __attribute__ from __item__ as a string
	 * @param item The item to get the attribute for
	 * @param attribute The attribute to read
	 */
	public readString(
		item: MemoryReader,
		attribute: AttributeName,
	): string | undefined {
		return this.readProperty<string>(item, attribute)
	}

	/**
	 * Writes __attribute__ for __item__ as a string
	 * @param item The item to update
	 * @param attribute The attribute to update
	 * @param value The attribute value
	 */
	public writeString(
		item: MemoryReader,
		attribute: AttributeName,
		value: string,
	): void {
		this.writeProperty(item, attribute, value)
		item.store?.notify(item.storeId, attribute, value)
	}

	// #endregion

	// #region Boolean

	/**
	 * Reads __attribute__ from __item__ as a boolean
	 * @param item The item to get the attribute for
	 * @param attribute The attribute to read
	 */
	public readBoolAttr(item: MemoryReader, attribute: AttributeName): boolean {
		return Boolean(this.readUint8Attr(item, attribute))
	}

	/**
	 * Writes __attribute__ for __item__ as a boolean
	 * @param item The item to update
	 * @param attribute The attribute to update
	 * @param value The attribute value
	 */
	public writeBoolAttr(
		item: MemoryReader,
		attribute: AttributeName,
		value: boolean,
	) {
		this.writeUint8Attr(item, attribute, value ? 1 : 0)
	}

	// #endregion

	// #region Float32 Single Value
	/**
	 * Reads __attribute__ from __item__ as a float32
	 * @param item The item to get the attribute for
	 * @param attribute The attribute to read
	 */
	public readFloat32Attr(item: MemoryReader, attribute: AttributeName) {
		return item.float32Array[this.getWordOffset(item, attribute)]
	}

	/**
	 * Writes __attribute__ for __item__ as a float32
	 * @param item The item to update
	 * @param attribute The attribute to update
	 * @param value The attribute value
	 */
	public writeFloat32Attr(
		item: MemoryReader,
		attribute: AttributeName,
		value: number,
	) {
		item.float32Array[this.getWordOffset(item, attribute)] = value
	}

	// #endregion

	// #region Float32 Vec2

	/**
	 * Reads __attribute__ from __item__ as a float32[2]
	 * @param item The item to get the attribute for
	 * @param attribute The attribute to read
	 */
	public readFloat32Vec2Attr(
		item: MemoryReader,
		attribute: AttributeName,
	): [number, number] {
		const offset = this.getWordOffset(item, attribute)
		return [item.float32Array[offset], item.float32Array[offset + 1]]
	}

	/**
	 * Writes __attribute__ for __item__ as a float32[2]
	 * @param item The item to update
	 * @param attribute The attribute to update
	 * @param x The x component to update
	 * @param y The y component to update
	 */
	public writeFloat32Vec2Attr(
		item: MemoryReader,
		attribute: AttributeName,
		x: number,
		y: number,
	): void {
		const offset = this.getWordOffset(item, attribute)
		item.float32Array[offset] = x
		item.float32Array[offset + 1] = y
	}

	// #endregion

	// #region Float32 Vec3

	/**
	 * Copies the data from the sourceAttribute to targetAttribute
	 * @param item The item to update
	 * @param sourceAttribute The source attribute to copy from
	 * @param targetAttribute The target attribute to copy to
	 */
	public copyFloat32Vec3Attr(
		item: MemoryReader,
		sourceAttribute: AttributeName,
		targetAttribute: AttributeName
	): Float32Array {
		const offset = this.getWordOffset(item, sourceAttribute)
		const subarray = item.float32Array.subarray(offset, offset + 2)
		item.float32Array.set(
			subarray,
			this.getWordOffset(item, targetAttribute)
		)
		return subarray
	}

	/**
	 * Writes __attribute__ for __item__ as a float32[3]
	 * @param item The item to update
	 * @param attribute The attribute to update
	 * @param x The x component to update
	 * @param y The y component to update
	 * @param z The z component to update
	 */
	public writeFloat32Vec3Attr(
		item: MemoryReader,
		attribute: AttributeName,
		x: number,
		y: number,
		z: number,
	): void {
		const offset = this.getWordOffset(item, attribute)
		item.float32Array[offset] = x
		item.float32Array[offset + 1] = y
		item.float32Array[offset + 2] = z
	}

	/**
	 * Reads __attribute__ from __item__ as a float32[3]
	 * @param item The item to get the attribute for
	 * @param attribute The attribute to read
	 */
	public readFloat32Vec3Attr(
		item: MemoryReader,
		attribute: AttributeName,
	): [number, number, number] {
		const offset = this.getWordOffset(item, attribute)
		return [
			item.float32Array[offset],
			item.float32Array[offset + 1],
			item.float32Array[offset + 2],
		]
	}

	// #endregion

	// #region Uint8 Single Value

	/**
	 * Reads __attribute__ from __item__ as a unit8
	 * @param item The item to get the attribute for
	 * @param attribute The attribute to read
	 */
	public readUint8Attr(item: MemoryReader, attribute: AttributeName): number {
		return item.uint8Array[this.getByteOffset(item, attribute)]
	}

	/**
	 * Writes __attribute__ for __item__ as a unit8
	 * @param item The item to update
	 * @param attribute The attribute to update
	 * @param value The attribute value
	 */
	public writeUint8Attr(
		item: MemoryReader,
		attribute: AttributeName,
		value: number,
	): void {
		item.uint8Array[this.getByteOffset(item, attribute)] = value
	}

	// #endregion

	// #region Uint8 Vec2

	/**
	 * Reads __attribute__ from __item__ as a unit8[2]
	 * @param item The item to get the attribute for
	 * @param attribute The attribute to read
	 */
	public readUint8Vec2Attr(
		item: MemoryReader,
		attribute: AttributeName,
	): [number, number] {
		const offset = this.getByteOffset(item, attribute)
		return [item.uint8Array[offset], item.uint8Array[offset + 1]]
	}

	/**
	 * Writes __attribute__ for __item__ as a uint8[2]
	 * @param item The item to update
	 * @param attribute The attribute to update
	 * @param x The x component to update
	 * @param y The y component to update
	 * @param z The z component to update
	 */
	public writeUint8Vec2Attr(
		item: MemoryReader,
		attribute: AttributeName,
		x: number,
		y: number,
	): void {
		const offset = this.getByteOffset(item, attribute)
		item.uint8Array[offset] = x
		item.uint8Array[offset + 1] = y
	}

	// #endregion

	// #region Uint8 Vec3

	/**
	 * Reads __attribute__ from __item__ as a unit8[3]
	 * @param item The item to get the attribute for
	 * @param attribute The attribute to read
	 */
	public readUint8Vec3Attr(
		item: MemoryReader,
		attribute: AttributeName,
	): [number, number, number] | undefined {
		const offset = this.getByteOffset(item, attribute)
		return [
			item.uint8Array[offset],
			item.uint8Array[offset + 1],
			item.uint8Array[offset + 2],
		]
	}

	/**
	 * Writes __attribute__ for __item__ as a uint8[3]
	 * @param item The item to update
	 * @param attribute The attribute to update
	 * @param x The x component to update
	 * @param y The y component to update
	 * @param z The z component to update
	 */
	public writeUint8Vec3Attr(
		item: MemoryReader,
		attribute: AttributeName,
		x: number,
		y: number,
		z: number,
	): void {
		const offset = this.getByteOffset(item, attribute)
		item.uint8Array[offset] = x
		item.uint8Array[offset + 1] = y
		item.uint8Array[offset + 2] = z
	}

	// #endregion

	// #region Uint8 Vec4

	/**
	 * Reads __attribute__ from __item__ as a unit8[4]
	 * @param item The item to get the attribute for
	 * @param attribute The attribute to read
	 */
	public readUint8Vec4Attr(
		item: MemoryReader,
		attribute: AttributeName,
	): [number, number, number, number] | undefined {
		const offset = this.getByteOffset(item, attribute)
		return [
			item.uint8Array[offset],
			item.uint8Array[offset + 1],
			item.uint8Array[offset + 2],
			item.uint8Array[offset + 3],
		]
	}

	/**
	 * Writes __attribute__ for __item__ as a uint8[4]
	 * @param item The item to update
	 * @param attribute The attribute to update
	 * @param x The x component to update
	 * @param y The y component to update
	 * @param z The z component to update
	 * @param zz The zz component to update
	 */
	public writeUint8Vec4Attr(
		item: MemoryReader,
		attribute: AttributeName,
		x: number,
		y: number,
		z: number,
		zz: number,
	): void {
		const offset = this.getByteOffset(item, attribute)
		item.uint8Array[offset] = x
		item.uint8Array[offset + 1] = y
		item.uint8Array[offset + 2] = z
		item.uint8Array[offset + 3] = zz
	}

	// #endregion

	// #region Uint32 Single Value

	/**
	 * Reads __attribute__ from __item__ as a uint32
	 * @param item The item to get the attribute for
	 * @param attribute The attribute to read
	 */
	public readUint32Attr(item: MemoryReader, attribute: AttributeName): number {
		return item.uint32Array[this.getWordOffset(item, attribute)]
	}

	/**
	 * Writes __attribute__ for __item__ as a unit32
	 * @param item The item to update
	 * @param attribute The attribute to update
	 * @param value The attribute value
	 */
	public writeUint32Attr(
		item: MemoryReader,
		attribute: AttributeName,
		value: number,
	): void {
		item.uint32Array[this.getWordOffset(item, attribute)] = value
	}

	// #endregion
}
