"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReader = createReader;

var _specification = require("../specification");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Creates a MemoryReader implementation which can read the given memory layout efficiently
 * @param readerType The type of reader
 * @param layout The memory layout
 * @param additionalProperties The additional properties to add to the implementation
 * @param setterAugmenter The setter augmenter, which can be used to manipulate the underlying generated property setters
 */
function createReader(readerType, layout, additionalProperties = []) {
  class Impl {
    /** the store this item belongs to */

    /**
     * A flag to indicate that this item's buffer is waiting to be copied to a store.
     * This should be idempotent across connect() invocatinos
     */
    // cached array aliases
    // item data

    /**
     * Constructor for the MemoryReader implementation
     * @param store The backing data store
     * @param storeId The id to use when accessing the store
     */
    constructor(store = undefined, storeId = -1) {
      _defineProperty(this, "store", void 0);

      _defineProperty(this, "isFlushNeeded", void 0);

      _defineProperty(this, "uint8Array", void 0);

      _defineProperty(this, "float32Array", void 0);

      _defineProperty(this, "uint32Array", void 0);

      _defineProperty(this, "propertyBag", void 0);

      _defineProperty(this, "storeId", -1);

      _defineProperty(this, "byteOffset", 0);

      _defineProperty(this, "wordOffset", 0);

      const autobuffer = store == null;

      if (autobuffer) {
        this.isFlushNeeded = true;
        const buffer = new ArrayBuffer(layout.stride);
        this.uint8Array = new Uint8Array(buffer);
        this.uint32Array = new Uint32Array(buffer);
        this.float32Array = new Float32Array(buffer);
        this.propertyBag = {};
      } else {
        this.isFlushNeeded = false;
        this.connect(storeId, store);
      }

      additionalProperties.forEach(property => {
        if (typeof property !== 'string') {
          const {
            name,
            initialValue,
            ephemeral
          } = property;

          if (ephemeral) {
            ;
            this[name] = initialValue;
          } else {
            this.propertyBag[name] = initialValue;
          }
        }
      });
    }
    /**
     * @inheritdoc
     * @see {@link MemoryReader.type}
     */


    get type() {
      return readerType;
    }
    /**
     * @inheritdoc
     * @see {@link MemoryReader.layout}
     */


    get layout() {
      return layout;
    }
    /**
     * @inheritdoc
     * @see {@link MemoryReader.buffer}
     */


    get buffer() {
      return this.uint8Array.buffer;
    }
    /**
     * @inheritdoc
     * @see {@link MemoryReader.connect}
     */


    connect(storeId, store) {
      if (this.storeId !== storeId) {
        this.byteOffset = storeId * store.store.bytesPerItem;
        this.wordOffset = this.byteOffset / 4;
        this.storeId = storeId; // flush this items buffer out if we're waiting for a store connection

        if (this.isFlushNeeded) {
          store.slurp(storeId, this.uint8Array.buffer, this.propertyBag);
          this.isFlushNeeded = false;
        } // copy property bag


        this.propertyBag = store.propertyBags[storeId];
      } // It is important to not have " if (this.store != store) "
      // It's possible that the store doesn't change, but the underlying arrays do
      // copy array aliases


      this.store = store;
      this.uint32Array = store.store.uint32Array;
      this.float32Array = store.store.float32Array;
      this.uint8Array = store.store.uint8Array;
    }
    /**
     * Handles an attribute being set
     * @param name The name of the attribute
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function


    handleAttributeUpdated(name) {}

  }

  const proto = Impl.prototype;
  /**
   * Wire layout properties into the memory layout
   */

  layout.forEach(attribute => {
    if (attribute.name === _specification.SpacerAttributeName) {
      return;
    }

    const {
      name,
      size,
      type,
      typedOffset,
      hint
    } = attribute;
    let setter;
    let getter;

    if (type === _specification.AttributeType.Float32) {
      if (size === 1) {
        //
        // Singular Float Values
        //
        getter = function () {
          return this.float32Array[this.wordOffset + typedOffset];
        };

        setter = function (value) {
          this.float32Array[this.wordOffset + typedOffset] = value || 0;
          this.handleAttributeUpdated(name);
        };
      } else if (size === 2) {
        //
        // Vec2 Float Values
        //
        getter = function () {
          return [this.float32Array[this.wordOffset + typedOffset], this.float32Array[this.wordOffset + typedOffset + 1]];
        };

        setter = function (value) {
          this.float32Array[this.wordOffset + typedOffset] = value[0] || 0;
          this.float32Array[this.wordOffset + typedOffset + 1] = value[1] || 0;
          this.handleAttributeUpdated(name);
        };
      } else if (size === 3) {
        //
        // Vec3 Float Values
        //
        getter = function () {
          return [this.float32Array[this.wordOffset + typedOffset], this.float32Array[this.wordOffset + typedOffset + 1], this.float32Array[this.wordOffset + typedOffset + 2]];
        };

        setter = function (value) {
          this.float32Array[this.wordOffset + typedOffset] = value[0] || 0;
          this.float32Array[this.wordOffset + typedOffset + 1] = value[1] || 0;
          this.float32Array[this.wordOffset + typedOffset + 2] = value[2] || 0;
          this.handleAttributeUpdated(name);
        };
      }
    } else if (type === _specification.AttributeType.Uint8) {
      if (size === 1) {
        if (hint === _specification.InterpretationHint.Boolean) {
          //
          // Single Byte Boolean
          //
          getter = function () {
            return this.uint8Array[this.byteOffset + typedOffset] > 0;
          };

          setter = function (value) {
            this.uint8Array[this.byteOffset + typedOffset] = value ? 1 : 0;
            this.handleAttributeUpdated(name);
          };
        } else {
          //
          // Single Byte Number
          //
          getter = function () {
            return this.uint8Array[this.byteOffset + typedOffset];
          };

          setter = function (value) {
            this.uint8Array[this.byteOffset + typedOffset] = value;
            this.handleAttributeUpdated(name);
          };
        }
      } else if (size === 2) {
        //
        // Vec2 Byte Values
        //
        getter = function () {
          return [this.uint8Array[this.byteOffset + typedOffset], this.uint8Array[this.byteOffset + typedOffset + 1]];
        };

        setter = function (value) {
          this.uint8Array[this.byteOffset + typedOffset] = value[0] || 0;
          this.uint8Array[this.byteOffset + typedOffset + 1] = value[1] || 0;
          this.handleAttributeUpdated(name);
        };
      } else if (size === 3) {
        //
        // Vec3 Byte Values
        //
        getter = function () {
          return [this.uint8Array[this.byteOffset + typedOffset], this.uint8Array[this.byteOffset + typedOffset + 1], this.uint8Array[this.byteOffset + typedOffset + 2]];
        };

        setter = function (value) {
          this.uint8Array[this.byteOffset + typedOffset] = value[0] || 0;
          this.uint8Array[this.byteOffset + typedOffset + 1] = value[1] || 0;
          this.uint8Array[this.byteOffset + typedOffset + 2] = value[2] || 0;
          this.handleAttributeUpdated(name);
        };
      } else if (size === 4) {
        //
        // Vec4 Byte Values
        //
        getter = function () {
          return [this.uint8Array[this.byteOffset + typedOffset], this.uint8Array[this.byteOffset + typedOffset + 1], this.uint8Array[this.byteOffset + typedOffset + 2], this.uint8Array[this.byteOffset + typedOffset + 3]];
        };

        setter = function (value) {
          this.uint8Array[this.byteOffset + typedOffset] = value[0] || 0;
          this.uint8Array[this.byteOffset + typedOffset + 1] = value[1] || 0;
          this.uint8Array[this.byteOffset + typedOffset + 2] = value[2] || 0;
          this.uint8Array[this.byteOffset + typedOffset + 3] = value[3] || 0;
          this.handleAttributeUpdated(name);
        };
      }
    } else if (type === _specification.AttributeType.Uint32) {
      if (size === 1) {
        //
        // Uint32 Single Values
        //
        getter = function () {
          return this.uint32Array[this.wordOffset + typedOffset];
        };

        setter = function (value) {
          this.uint32Array[this.wordOffset + typedOffset] = value || 0;
          this.handleAttributeUpdated(name);
        };
      }
    }

    if (setter) {
      proto.__defineSetter__(name, setter);
    }

    if (getter) {
      proto.__defineGetter__(name, getter);
    }
  });
  /**
   * Wire additional properties into the property bag
   */

  additionalProperties.forEach(property => {
    const name = typeof property === 'string' ? property : property.name;
    const ephemeral = typeof property !== 'string' ? Boolean(property.ephemeral) : false;

    if (!ephemeral) {
      proto.__defineGetter__(name, function () {
        return this.propertyBag[name];
      });

      proto.__defineSetter__(name, function (value) {
        this.propertyBag[name] = value;
      });
    }
  });
  return Impl;
}