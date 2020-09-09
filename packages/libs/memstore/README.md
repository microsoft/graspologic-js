# @graspologic/memstore

A fast, memory efficient, data storage library that utilizes ArrayBuffer instances as its storage medium.

## Usage

First we create an implementation that users will directly interact with.

### Rectangle Implementation

```js
import {
	createLayoutBuilder,
	InterpretationHint,
	AttributeType,
	PropertySpecification,
	createReader
} from '@graspologic/memstore'

// create a unique symbol for our type we are defining
export const type = Symbol('Rectangle')

// Create a memory layout descriptor which describes the
// properties of a rectangle
export const memoryLayout = createLayoutBuilder()
	.addUint32('color')
	.addFloat32Vec2('position', { components: ['x', 'y'] })
	.addFloat32('width')
	.addFloat32('height')

	.build()


// Set up an interface which represents a rectangle that matches
// the data of the memory layout defined above
export interface Rectangle {
	// uint32
	color: number

	// float32[2]
	position: [number, number]

	// float32
	width: number

	// float32
	height: number
}

// Create a class implementation using the layout you created earlier
export const RectangleImpl = createReader<Rectangle>(
	type,
	memoryLayout,
)
```

Now we create a store around our Rectangle implementation so we can store their data in the
underlying ArrayBuffer

### Rectangle Store

```js
import {
	ArrayStore,
	ArrayStoreImpl,
	SlotAllocator,
	ReaderStoreImpl,
} from '@graspologic/memstore'

// Defined above
import { RectangleImpl, memoryLayout } from './rectangle'

export function createStore() {
	// Constructs an underlying ArrayBuffer backed store for storing data
	// in the format of the memoryLayout you created earlier
	const store: ArrayStore = new ArrayStoreImpl(memoryLayout)

	const initialCapacity = 1
	const slotAllocator = new SlotAllocator(initialCapacity)

	// Constructs a store which interacts directly with your implementation you created earlier
	return new ReaderStoreImpl(RectangleImpl, store, slotAllocator)
}
```

Finally we construct our Rectangle store and add instances of it

### Use the store

```js
import { RectangleImpl } from './rectangle'
import { createStore } from './rectangleStore'

const myStore = createStore()

const myRectangle = new RectangleImpl()
myRectangle.color = 0xff00ff
myRectangle.position = [10, 10]
myRectangle.width = 20
myRectangle.height = 200

// Add the rectangle to our store
myStore.receive(myRectangle)

// Underlying ArrayBuffer that is storing the rectangle data.
// The data is in the layout we created earlier in the rectangle module
const ab = myStore.store.buffer

// Iterate through all the rectangles in the store
for (const rectangle of myStore) {
	rectangle.width = 200
	rectangle.position = [Math.random() * 100, Math.random() * 100]
}
```

See the [API documentation](./dist/docs/globals.md) or [examples](../../../examples) for additional examples.
