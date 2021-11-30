/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AttributeName } from '../specification';
import { MemoryReader } from './types';
/**
 * A utility class for reading/writing individual properties of a MemoryReader
 */
export declare class MemoryReaderInspector {
    /**
     * Calculates the byte offset for the given item's attribute
     * @param itemIndex The item index of the item
     * @param attribute The attribute
     */
    getByteOffset(item: MemoryReader, attribute: AttributeName): number;
    /**
     * Calculates the typed offset for the given attribute
     * @param itemIndex The item index of the item
     * @param attribute The attribute
     */
    getTypedOffset(item: MemoryReader, attribute: AttributeName): number;
    getWordOffset(item: MemoryReader, attribute: AttributeName): number;
    /**
     * Reads the __property__ for the __item__
     * @param item The item to get the property for
     * @param property The property to read
     */
    readProperty<P>(item: MemoryReader, property: AttributeName): P | undefined;
    /**
     * Writes the __property__ for the __item__
     * @param item The item to update
     * @param property The property to update
     * @param value The value of the property
     */
    writeProperty<P>(item: MemoryReader, property: AttributeName, value: P): void;
    /**
     * Reads __attribute__ from __item__ as a number
     * @param item The item to get the attribute for
     * @param attribute The attribute to read
     */
    readNumber(item: MemoryReader, attribute: AttributeName): number;
    /**
     * Writes __attribute__ for __item__ as a number
     * @param item The item to update
     * @param attribute The attribute to update
     * @param value The attribute value
     */
    writeNumber(item: MemoryReader, attribute: AttributeName, value: number): void;
    /**
     * Reads __attribute__ from __item__ as a string
     * @param item The item to get the attribute for
     * @param attribute The attribute to read
     */
    readString(item: MemoryReader, attribute: AttributeName): string | undefined;
    /**
     * Writes __attribute__ for __item__ as a string
     * @param item The item to update
     * @param attribute The attribute to update
     * @param value The attribute value
     */
    writeString(item: MemoryReader, attribute: AttributeName, value: string): void;
    /**
     * Reads __attribute__ from __item__ as a boolean
     * @param item The item to get the attribute for
     * @param attribute The attribute to read
     */
    readBoolAttr(item: MemoryReader, attribute: AttributeName): boolean;
    /**
     * Writes __attribute__ for __item__ as a boolean
     * @param item The item to update
     * @param attribute The attribute to update
     * @param value The attribute value
     */
    writeBoolAttr(item: MemoryReader, attribute: AttributeName, value: boolean): void;
    /**
     * Reads __attribute__ from __item__ as a float32
     * @param item The item to get the attribute for
     * @param attribute The attribute to read
     */
    readFloat32Attr(item: MemoryReader, attribute: AttributeName): number;
    /**
     * Writes __attribute__ for __item__ as a float32
     * @param item The item to update
     * @param attribute The attribute to update
     * @param value The attribute value
     */
    writeFloat32Attr(item: MemoryReader, attribute: AttributeName, value: number): void;
    /**
     * Reads __attribute__ from __item__ as a float32[2]
     * @param item The item to get the attribute for
     * @param attribute The attribute to read
     */
    readFloat32Vec2Attr(item: MemoryReader, attribute: AttributeName): [number, number];
    /**
     * Writes __attribute__ for __item__ as a float32[2]
     * @param item The item to update
     * @param attribute The attribute to update
     * @param x The x component to update
     * @param y The y component to update
     */
    writeFloat32Vec2Attr(item: MemoryReader, attribute: AttributeName, x: number, y: number): void;
    /**
     * Writes the float32[2] to the __typedOffset__ of the item
     * @param item The item to update
     * @param typedOffset The offset into the array to write the float32[2]
     * @param x The x component to update
     * @param y The y component to update
     */
    writeFloat32Vec2Offset(item: MemoryReader, typedOffset: number, x: number, y: number): void;
    /**
     * Copies the float32[3] from the sourceAttribute to targetAttribute
     * @param item The item to update
     * @param sourceAttribute The source attribute to copy from
     * @param targetAttribute The target attribute to copy to
     */
    copyFloat32Vec3Attr(item: MemoryReader, sourceAttribute: AttributeName, targetAttribute: AttributeName): Float32Array;
    /**
     * Copies the float32[2] from sourceTypedOffset to targetTypedOffset
     * @param item The item to update
     * @param sourceTypedOffset The typed offset for the source attribute
     * @param targetTypedOffset typed offset for the target attribute
     */
    copyFloat32Vec3Offset(item: MemoryReader, sourceTypedOffset: number, targetTypedOffset: number): Float32Array;
    /**
     * Writes __attribute__ for __item__ as a float32[3]
     * @param item The item to update
     * @param attribute The attribute to update
     * @param x The x component to update
     * @param y The y component to update
     * @param z The z component to update
     */
    writeFloat32Vec3Attr(item: MemoryReader, attribute: AttributeName, x: number, y: number, z: number): void;
    /**
     * Writes the float32[3] to the __typedOffset__ of the item
     * @param item The item to update
     * @param typedOffset The offset into the array to write the float32[3]
     * @param x The x component to update
     * @param y The y component to update
     * @param z The z component to update
     */
    writeFloat32Vec3Offset(item: MemoryReader, typedOffset: number, x: number, y: number, z: number): void;
    /**
     * Reads __attribute__ from __item__ as a float32[3]
     * @param item The item to get the attribute for
     * @param attribute The attribute to read
     */
    readFloat32Vec3Attr(item: MemoryReader, attribute: AttributeName): [number, number, number];
    /**
     * Reads __attribute__ from __item__ as a unit8
     * @param item The item to get the attribute for
     * @param attribute The attribute to read
     */
    readUint8Attr(item: MemoryReader, attribute: AttributeName): number;
    /**
     * Writes __attribute__ for __item__ as a unit8
     * @param item The item to update
     * @param attribute The attribute to update
     * @param value The attribute value
     */
    writeUint8Attr(item: MemoryReader, attribute: AttributeName, value: number): void;
    /**
     * Reads __attribute__ from __item__ as a unit8[2]
     * @param item The item to get the attribute for
     * @param attribute The attribute to read
     */
    readUint8Vec2Attr(item: MemoryReader, attribute: AttributeName): [number, number];
    /**
     * Writes __attribute__ for __item__ as a uint8[2]
     * @param item The item to update
     * @param attribute The attribute to update
     * @param x The x component to update
     * @param y The y component to update
     * @param z The z component to update
     */
    writeUint8Vec2Attr(item: MemoryReader, attribute: AttributeName, x: number, y: number): void;
    /**
     * Reads __attribute__ from __item__ as a unit8[3]
     * @param item The item to get the attribute for
     * @param attribute The attribute to read
     */
    readUint8Vec3Attr(item: MemoryReader, attribute: AttributeName): [number, number, number] | undefined;
    /**
     * Writes __attribute__ for __item__ as a uint8[3]
     * @param item The item to update
     * @param attribute The attribute to update
     * @param x The x component to update
     * @param y The y component to update
     * @param z The z component to update
     */
    writeUint8Vec3Attr(item: MemoryReader, attribute: AttributeName, x: number, y: number, z: number): void;
    /**
     * Reads __attribute__ from __item__ as a unit8[4]
     * @param item The item to get the attribute for
     * @param attribute The attribute to read
     */
    readUint8Vec4Attr(item: MemoryReader, attribute: AttributeName): [number, number, number, number] | undefined;
    /**
     * Writes __attribute__ for __item__ as a uint8[4]
     * @param item The item to update
     * @param attribute The attribute to update
     * @param x The x component to update
     * @param y The y component to update
     * @param z The z component to update
     * @param zz The zz component to update
     */
    writeUint8Vec4Attr(item: MemoryReader, attribute: AttributeName, x: number, y: number, z: number, zz: number): void;
    /**
     * Reads __attribute__ from __item__ as a uint32
     * @param item The item to get the attribute for
     * @param attribute The attribute to read
     */
    readUint32Attr(item: MemoryReader, attribute: AttributeName): number;
    /**
     * Writes __attribute__ for __item__ as a unit32
     * @param item The item to update
     * @param attribute The attribute to update
     * @param value The attribute value
     */
    writeUint32Attr(item: MemoryReader, attribute: AttributeName, value: number): void;
    /**
     * Writes the unit32 at the given __typedOffset__ for the item
     * @param item The item to update
     * @param typedOffset The offset into the array to write the uint32
     * @param value The attribute value
     */
    writeUint32Offset(item: MemoryReader, typedOffset: number, value: number): void;
    /**
     * Copies the uint32 from sourceTypedOffset to targetTypedOffset
     * @param item The item to update
     * @param sourceTypedOffset The typed offset for the source attribute
     * @param targetTypedOffset typed offset for the target attribute
     */
    copyUint32Offset(item: MemoryReader, sourceTypedOffset: number, targetTypedOffset: number): void;
}
