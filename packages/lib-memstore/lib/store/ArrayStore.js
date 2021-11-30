import { DEFAULT_SHARED, DEFAULT_CAPACITY } from './defaults';
const DEFAULT_OPTIONS = {
    shared: DEFAULT_SHARED,
    capacity: DEFAULT_CAPACITY,
};
/**
 * Implementation of an ArrayStore
 * @see {@link ArrayStore} for more info
 */
export class ArrayStoreImpl {
    layout;
    config;
    bytesPerItem;
    /** the underlying data storage buffer */
    _buffer;
    _dataView;
    _float32Array;
    _uint8Array;
    _uint32Array;
    onResizeHandlers = [];
    /**
     * Constructor for the ItemArrayBuffer
     * @param layout The memory layout
     * @param options The store options
     */
    constructor(layout, options = DEFAULT_OPTIONS) {
        this.layout = layout;
        // determine capacity based on the following:
        // * if an explicit value is provided, use that
        // * if a buffer is provided, calculate the buffer capacity
        // * else use default capacity
        const capacity = options.capacity ||
            (options.buffer?.byteLength || 0) / layout.stride ||
            DEFAULT_CAPACITY;
        this.config = {
            capacity,
            shared: typeof options.shared === 'boolean' ? options.shared : DEFAULT_SHARED,
        };
        this.bytesPerItem = layout.stride;
        if (options.buffer) {
            this._buffer = options.buffer;
        }
        this.resize(this.config.capacity);
    }
    /**
     * @inheritdoc
     * @see {@link ArrayStore.buffer}
     */
    get buffer() {
        return this._buffer;
    }
    /**
     * @inheritdoc
     * @see {@link ArrayStore.dataView}
     */
    get dataView() {
        return this._dataView;
    }
    /**
     * @inheritdoc
     * @see {@link ArrayStore.float32Array}
     */
    get float32Array() {
        return this._float32Array;
    }
    /**
     * @inheritdoc
     * @see {@link ArrayStore.uint8Array}
     */
    get uint8Array() {
        return this._uint8Array;
    }
    /**
     * @inheritdoc
     * @see {@link ArrayStore.uint32Array}
     */
    get uint32Array() {
        return this._uint32Array;
    }
    /**
     * @inheritdoc
     * @see {@link ArrayStore.onResize}
     */
    onResize(handler) {
        this.onResizeHandlers.push(handler);
        return () => {
            this.onResizeHandlers = this.onResizeHandlers.filter(h => h !== handler);
        };
    }
    /**
     * @inheritdoc
     * @see {@link ArrayStore.resize}
     */
    resize(newSize) {
        if (this.count === newSize) {
            // existing buffer is correct size, don't resize buffer
            if (!this.uint8Array) {
                // when initializing, the array aliases may be undefined when the buffer is
                this._uint8Array = new Uint8Array(this._buffer);
                this._uint32Array = new Uint32Array(this._buffer);
                this._float32Array = new Float32Array(this._buffer);
            }
            return;
        }
        else {
            const oldSize = this.count;
            const oldData = this.buffer;
            // create a new byte array
            const numBytes = newSize * this.bytesPerItem;
            if (numBytes % 4 !== 0) {
                throw new Error(`buffer size ${numBytes} must be word-aligned. size=${newSize}, bpi=${this.bytesPerItem}`);
            }
            const newBuffer = this.config.shared && typeof SharedArrayBuffer !== 'undefined'
                ? new SharedArrayBuffer(numBytes)
                : new ArrayBuffer(numBytes);
            if (oldSize > 0 && newSize > oldSize) {
                // copy the old data in
                const newByteArray = new Uint8Array(newBuffer);
                newByteArray.set(new Uint8Array(oldData));
            }
            // set a new data view
            this._buffer = newBuffer;
            this._dataView = new DataView(newBuffer);
            this._float32Array = new Float32Array(newBuffer);
            this._uint8Array = new Uint8Array(newBuffer);
            this._uint32Array = new Uint32Array(newBuffer);
            this.onResizeHandlers.forEach(h => h());
        }
    }
    /**
     * @inheritdoc
     * @see {@link ArrayStore.itemData}
     */
    itemData(idx) {
        if (idx < 0 ||
            idx * this.bytesPerItem > this.buffer.byteLength - this.bytesPerItem) {
            throw new Error('Index out of range');
        }
        const byteOffset = idx * this.bytesPerItem;
        return this.buffer.slice(byteOffset, byteOffset + this.bytesPerItem);
    }
    /**
     * @inheritdoc
     * @see {@link ArrayStore.getByteOffset}
     */
    getByteOffset(idx) {
        if (process.env.NODE_ENV === 'production') {
            if (idx < 0 ||
                idx * this.bytesPerItem > this.buffer.byteLength - this.bytesPerItem) {
                throw new Error('Index out of range');
            }
        }
        return idx * this.bytesPerItem;
    }
    /**
     * @inheritdoc
     * @see {@link ArrayStore.getByteOffsetAttr}
     */
    getByteOffsetAttr(idx, attribute) {
        const attribLayout = this.layout.get(attribute);
        if (process.env.NODE_ENV === 'production') {
            if (idx < 0 ||
                idx * this.bytesPerItem > this.buffer.byteLength - this.bytesPerItem) {
                throw new Error('Index out of range');
            }
            if (!attribLayout) {
                throw new Error(`Layout does not contain ${attribute}`);
            }
        }
        return idx * this.bytesPerItem + attribLayout?.offset;
    }
    /**
     * @inheritdoc
     * @see {@link ArrayStore.count}
     */
    get count() {
        if (this.buffer) {
            return this.buffer.byteLength / this.bytesPerItem;
        }
        else {
            return 0;
        }
    }
    /**
     * @inheritdoc
     * @see {@link ArrayStore.destroy}
     */
    destroy() {
        // Set the capacity to zero
        this.config.capacity = 0;
        // Force the data to be empty
        this.resize(0);
    }
    /**
     * @inheritdoc
     * @see {@link ArrayStore.slurp}
     */
    slurp(targetIdx, sourceBuffer, sourceOffset = 0) {
        if (process.env.NODE_ENV !== 'production') {
            if (!sourceBuffer) {
                throw new Error(`Invalid store ${sourceBuffer}`);
            }
        }
        // TODO: Check if they have compatible attributes
        this.uint8Array.set(new Uint8Array(sourceBuffer, sourceOffset, this.bytesPerItem), targetIdx * this.bytesPerItem);
    }
}
