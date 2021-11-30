/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AttributeType } from '../specification';
const FLOAT_BYTE_SIZE = Float32Array.BYTES_PER_ELEMENT;
/**
 * A utility class for reading/writing individual properties of a MemoryReader
 */
export class MemoryReaderInspector {
    /**
     * Calculates the byte offset for the given item's attribute
     * @param itemIndex The item index of the item
     * @param attribute The attribute
     */
    getByteOffset(item, attribute) {
        const attr = item.layout.get(attribute);
        if (process.env.NODE_ENV !== 'production') {
            if (!attr) {
                throw new Error('unknown attribute: ' + attribute);
            }
        }
        return item.byteOffset + attr.offset;
    }
    /**
     * Calculates the typed offset for the given attribute
     * @param itemIndex The item index of the item
     * @param attribute The attribute
     */
    getTypedOffset(item, attribute) {
        const attr = item.layout.get(attribute);
        if (process.env.NODE_ENV !== 'production') {
            if (!attr) {
                throw new Error('unknown attribute: ' + attribute);
            }
        }
        return attr.typedOffset;
    }
    getWordOffset(item, attribute) {
        return this.getByteOffset(item, attribute) / FLOAT_BYTE_SIZE;
    }
    // #region Read/Write Generic Property
    /**
     * Reads the __property__ for the __item__
     * @param item The item to get the property for
     * @param property The property to read
     */
    readProperty(item, property) {
        const itemProperties = item.store.propertyBags[item.storeId];
        if (itemProperties != null) {
            return itemProperties[property];
        }
    }
    /**
     * Writes the __property__ for the __item__
     * @param item The item to update
     * @param property The property to update
     * @param value The value of the property
     */
    writeProperty(item, property, value) {
        let itemProperties = item.store.propertyBags[item.storeId];
        if (!itemProperties) {
            itemProperties = {};
            item.store.propertyBags[item.storeId] = itemProperties;
        }
        itemProperties[property] = value;
        item.store?.notify(item.storeId, property);
    }
    // #endregion
    // #region Number
    /**
     * Reads __attribute__ from __item__ as a number
     * @param item The item to get the attribute for
     * @param attribute The attribute to read
     */
    readNumber(item, attribute) {
        if (!item.layout.has(attribute)) {
            return this.readProperty(item, attribute) || 0;
        }
        else {
            const attrib = item.layout.get(attribute);
            if (attrib.type === AttributeType.Uint8) {
                return this.readUint8Attr(item, attribute);
            }
            else if (attrib.type === AttributeType.Uint32) {
                return this.readUint32Attr(item, attribute);
            }
            else {
                return this.readFloat32Attr(item, attribute);
            }
        }
    }
    /**
     * Writes __attribute__ for __item__ as a number
     * @param item The item to update
     * @param attribute The attribute to update
     * @param value The attribute value
     */
    writeNumber(item, attribute, value) {
        const attrib = item.layout.get(attribute);
        if (!attrib) {
            this.writeProperty(item, attribute, value);
        }
        else {
            if (attrib.type === AttributeType.Uint8) {
                this.writeUint8Attr(item, attribute, value);
            }
            else if (attrib.type === AttributeType.Uint32) {
                this.writeUint32Attr(item, attribute, value);
            }
            else {
                this.writeFloat32Attr(item, attribute, value);
            }
        }
        item.store?.notify(item.storeId, attribute);
    }
    // #endregion
    // #region String
    /**
     * Reads __attribute__ from __item__ as a string
     * @param item The item to get the attribute for
     * @param attribute The attribute to read
     */
    readString(item, attribute) {
        return this.readProperty(item, attribute);
    }
    /**
     * Writes __attribute__ for __item__ as a string
     * @param item The item to update
     * @param attribute The attribute to update
     * @param value The attribute value
     */
    writeString(item, attribute, value) {
        this.writeProperty(item, attribute, value);
        item.store?.notify(item.storeId, attribute);
    }
    // #endregion
    // #region Boolean
    /**
     * Reads __attribute__ from __item__ as a boolean
     * @param item The item to get the attribute for
     * @param attribute The attribute to read
     */
    readBoolAttr(item, attribute) {
        return Boolean(this.readUint8Attr(item, attribute));
    }
    /**
     * Writes __attribute__ for __item__ as a boolean
     * @param item The item to update
     * @param attribute The attribute to update
     * @param value The attribute value
     */
    writeBoolAttr(item, attribute, value) {
        this.writeUint8Attr(item, attribute, value ? 1 : 0);
    }
    // #endregion
    // #region Float32 Single Value
    /**
     * Reads __attribute__ from __item__ as a float32
     * @param item The item to get the attribute for
     * @param attribute The attribute to read
     */
    readFloat32Attr(item, attribute) {
        return item.float32Array[this.getWordOffset(item, attribute)];
    }
    /**
     * Writes __attribute__ for __item__ as a float32
     * @param item The item to update
     * @param attribute The attribute to update
     * @param value The attribute value
     */
    writeFloat32Attr(item, attribute, value) {
        item.float32Array[this.getWordOffset(item, attribute)] = value;
    }
    // #endregion
    // #region Float32 Vec2
    /**
     * Reads __attribute__ from __item__ as a float32[2]
     * @param item The item to get the attribute for
     * @param attribute The attribute to read
     */
    readFloat32Vec2Attr(item, attribute) {
        const offset = this.getWordOffset(item, attribute);
        return [item.float32Array[offset], item.float32Array[offset + 1]];
    }
    /**
     * Writes __attribute__ for __item__ as a float32[2]
     * @param item The item to update
     * @param attribute The attribute to update
     * @param x The x component to update
     * @param y The y component to update
     */
    writeFloat32Vec2Attr(item, attribute, x, y) {
        const offset = this.getWordOffset(item, attribute);
        item.float32Array[offset] = x;
        item.float32Array[offset + 1] = y;
    }
    /**
     * Writes the float32[2] to the __typedOffset__ of the item
     * @param item The item to update
     * @param typedOffset The offset into the array to write the float32[2]
     * @param x The x component to update
     * @param y The y component to update
     */
    writeFloat32Vec2Offset(item, typedOffset, x, y) {
        item.float32Array[item.wordOffset + typedOffset] = x;
        item.float32Array[item.wordOffset + typedOffset + 1] = y;
    }
    // #endregion
    // #region Float32 Vec3
    /**
     * Copies the float32[3] from the sourceAttribute to targetAttribute
     * @param item The item to update
     * @param sourceAttribute The source attribute to copy from
     * @param targetAttribute The target attribute to copy to
     */
    copyFloat32Vec3Attr(item, sourceAttribute, targetAttribute) {
        const offset = this.getWordOffset(item, sourceAttribute);
        const subarray = item.float32Array.subarray(offset, offset + 3);
        item.float32Array.set(subarray, this.getWordOffset(item, targetAttribute));
        return subarray;
    }
    /**
     * Copies the float32[2] from sourceTypedOffset to targetTypedOffset
     * @param item The item to update
     * @param sourceTypedOffset The typed offset for the source attribute
     * @param targetTypedOffset typed offset for the target attribute
     */
    copyFloat32Vec3Offset(item, sourceTypedOffset, targetTypedOffset) {
        const subarray = item.float32Array.subarray(item.wordOffset + sourceTypedOffset, item.wordOffset + sourceTypedOffset + 3);
        item.float32Array.set(subarray, item.wordOffset + targetTypedOffset);
        return subarray;
    }
    /**
     * Writes __attribute__ for __item__ as a float32[3]
     * @param item The item to update
     * @param attribute The attribute to update
     * @param x The x component to update
     * @param y The y component to update
     * @param z The z component to update
     */
    writeFloat32Vec3Attr(item, attribute, x, y, z) {
        const offset = this.getWordOffset(item, attribute);
        item.float32Array[offset] = x;
        item.float32Array[offset + 1] = y;
        item.float32Array[offset + 2] = z;
    }
    /**
     * Writes the float32[3] to the __typedOffset__ of the item
     * @param item The item to update
     * @param typedOffset The offset into the array to write the float32[3]
     * @param x The x component to update
     * @param y The y component to update
     * @param z The z component to update
     */
    writeFloat32Vec3Offset(item, typedOffset, x, y, z) {
        item.float32Array[item.wordOffset + typedOffset] = x;
        item.float32Array[item.wordOffset + typedOffset + 1] = y;
        item.float32Array[item.wordOffset + typedOffset + 2] = z;
    }
    /**
     * Reads __attribute__ from __item__ as a float32[3]
     * @param item The item to get the attribute for
     * @param attribute The attribute to read
     */
    readFloat32Vec3Attr(item, attribute) {
        const offset = this.getWordOffset(item, attribute);
        return [
            item.float32Array[offset],
            item.float32Array[offset + 1],
            item.float32Array[offset + 2],
        ];
    }
    // #endregion
    // #region Uint8 Single Value
    /**
     * Reads __attribute__ from __item__ as a unit8
     * @param item The item to get the attribute for
     * @param attribute The attribute to read
     */
    readUint8Attr(item, attribute) {
        return item.uint8Array[this.getByteOffset(item, attribute)];
    }
    /**
     * Writes __attribute__ for __item__ as a unit8
     * @param item The item to update
     * @param attribute The attribute to update
     * @param value The attribute value
     */
    writeUint8Attr(item, attribute, value) {
        item.uint8Array[this.getByteOffset(item, attribute)] = value;
    }
    // #endregion
    // #region Uint8 Vec2
    /**
     * Reads __attribute__ from __item__ as a unit8[2]
     * @param item The item to get the attribute for
     * @param attribute The attribute to read
     */
    readUint8Vec2Attr(item, attribute) {
        const offset = this.getByteOffset(item, attribute);
        return [item.uint8Array[offset], item.uint8Array[offset + 1]];
    }
    /**
     * Writes __attribute__ for __item__ as a uint8[2]
     * @param item The item to update
     * @param attribute The attribute to update
     * @param x The x component to update
     * @param y The y component to update
     * @param z The z component to update
     */
    writeUint8Vec2Attr(item, attribute, x, y) {
        const offset = this.getByteOffset(item, attribute);
        item.uint8Array[offset] = x;
        item.uint8Array[offset + 1] = y;
    }
    // #endregion
    // #region Uint8 Vec3
    /**
     * Reads __attribute__ from __item__ as a unit8[3]
     * @param item The item to get the attribute for
     * @param attribute The attribute to read
     */
    readUint8Vec3Attr(item, attribute) {
        const offset = this.getByteOffset(item, attribute);
        return [
            item.uint8Array[offset],
            item.uint8Array[offset + 1],
            item.uint8Array[offset + 2],
        ];
    }
    /**
     * Writes __attribute__ for __item__ as a uint8[3]
     * @param item The item to update
     * @param attribute The attribute to update
     * @param x The x component to update
     * @param y The y component to update
     * @param z The z component to update
     */
    writeUint8Vec3Attr(item, attribute, x, y, z) {
        const offset = this.getByteOffset(item, attribute);
        item.uint8Array[offset] = x;
        item.uint8Array[offset + 1] = y;
        item.uint8Array[offset + 2] = z;
    }
    // #endregion
    // #region Uint8 Vec4
    /**
     * Reads __attribute__ from __item__ as a unit8[4]
     * @param item The item to get the attribute for
     * @param attribute The attribute to read
     */
    readUint8Vec4Attr(item, attribute) {
        const offset = this.getByteOffset(item, attribute);
        return [
            item.uint8Array[offset],
            item.uint8Array[offset + 1],
            item.uint8Array[offset + 2],
            item.uint8Array[offset + 3],
        ];
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
    writeUint8Vec4Attr(item, attribute, x, y, z, zz) {
        const offset = this.getByteOffset(item, attribute);
        item.uint8Array[offset] = x;
        item.uint8Array[offset + 1] = y;
        item.uint8Array[offset + 2] = z;
        item.uint8Array[offset + 3] = zz;
    }
    // #endregion
    // #region Uint32 Single Value
    /**
     * Reads __attribute__ from __item__ as a uint32
     * @param item The item to get the attribute for
     * @param attribute The attribute to read
     */
    readUint32Attr(item, attribute) {
        return item.uint32Array[this.getWordOffset(item, attribute)];
    }
    /**
     * Writes __attribute__ for __item__ as a unit32
     * @param item The item to update
     * @param attribute The attribute to update
     * @param value The attribute value
     */
    writeUint32Attr(item, attribute, value) {
        item.uint32Array[this.getWordOffset(item, attribute)] = value;
    }
    /**
     * Writes the unit32 at the given __typedOffset__ for the item
     * @param item The item to update
     * @param typedOffset The offset into the array to write the uint32
     * @param value The attribute value
     */
    writeUint32Offset(item, typedOffset, value) {
        item.uint32Array[item.wordOffset + typedOffset] = value;
    }
    /**
     * Copies the uint32 from sourceTypedOffset to targetTypedOffset
     * @param item The item to update
     * @param sourceTypedOffset The typed offset for the source attribute
     * @param targetTypedOffset typed offset for the target attribute
     */
    copyUint32Offset(item, sourceTypedOffset, targetTypedOffset) {
        item.uint32Array[item.wordOffset + targetTypedOffset] =
            item.uint32Array[item.wordOffset + sourceTypedOffset];
    }
}
