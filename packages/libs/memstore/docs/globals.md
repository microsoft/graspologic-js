[@graspologic/memstore](README.md) › [Globals](globals.md)

# @graspologic/memstore

## Index

### Modules

- ["index"]()
- ["reader/MemoryReaderInspector"]()
- ["reader/ReaderStore"]()
- ["reader/createReader"]()
- ["reader/index"]()
- ["reader/types"]()
- ["specification/AttributeType"]()
- ["specification/LayoutBuilder"]()
- ["specification/index"]()
- ["specification/types"]()
- ["store/ArrayStore"]()
- ["store/IdStore"]()
- ["store/SlotAllocator"]()
- ["store/defaults"]()
- ["store/index"]()
- ["store/types"]()
- ["util/endianness"]()
- ["util/index"]()

## Modules

### "index"

• **"index"**:

Defined in packages/libs/memstore/src/index.ts:1

### AddRemoveItemHandler

• **AddRemoveItemHandler**:

### ArrayStore

• **ArrayStore**:

### ArrayStoreImpl

• **ArrayStoreImpl**:

### AttributeAlias

• **AttributeAlias**:

### AttributeName

• **AttributeName**:

### AttributeOptions

• **AttributeOptions**:

### AttributeSpecification

• **AttributeSpecification**:

### AttributeType

• **AttributeType**:

### AttributeUpdatedHandler

• **AttributeUpdatedHandler**:

### Detach

• **Detach**:

### GetterFn

• **GetterFn**:

### IdStore

• **IdStore**:

### IdStoreImpl

• **IdStoreImpl**:

### InterpretationHint

• **InterpretationHint**:

### LayoutBuilder

• **LayoutBuilder**:

### MemoryLayout

• **MemoryLayout**:

### MemoryReader

• **MemoryReader**:

### MemoryReaderClass

• **MemoryReaderClass**:

### MemoryReaderInspector

• **MemoryReaderInspector**:

### PropertySpecification

• **PropertySpecification**:

### ReaderStore

• **ReaderStore**:

### ReaderStoreImpl

• **ReaderStoreImpl**:

### SetterAugmenter

• **SetterAugmenter**:

### SetterFn

• **SetterFn**:

### SlotAllocator

• **SlotAllocator**:

### SpacerAttributeName

• **SpacerAttributeName**:

### StoreConfig

• **StoreConfig**:

### Vec2AttributeOptions

• **Vec2AttributeOptions**:

### Vec3AttributeOptions

• **Vec3AttributeOptions**:

### Vec4AttributeOptions

• **Vec4AttributeOptions**:

### createReader

• **createReader**:

### getBytesPerItem

• **getBytesPerItem**:

---

### "reader/MemoryReaderInspector"

• **"reader/MemoryReaderInspector"**:

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:1

### MemoryReaderInspector

• **MemoryReaderInspector**:

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:13

A utility class for reading/writing individual properties of a MemoryReader

### getByteOffset

▸ **getByteOffset**(`item`: MemoryReader, `attribute`: AttributeName): _number_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:19

Calculates the byte offset for the given item's attribute

**Parameters:**

| Name        | Type          | Description   |
| ----------- | ------------- | ------------- |
| `item`      | MemoryReader  | -             |
| `attribute` | AttributeName | The attribute |

**Returns:** _number_

### getWordOffset

▸ **getWordOffset**(`item`: MemoryReader, `attribute`: AttributeName): _number_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:29

**Parameters:**

| Name        | Type          |
| ----------- | ------------- |
| `item`      | MemoryReader  |
| `attribute` | AttributeName |

**Returns:** _number_

### readBoolAttr

▸ **readBoolAttr**(`item`: MemoryReader, `attribute`: AttributeName): _boolean_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:159

Reads **attribute** from **item** as a boolean

**Parameters:**

| Name        | Type          | Description                       |
| ----------- | ------------- | --------------------------------- |
| `item`      | MemoryReader  | The item to get the attribute for |
| `attribute` | AttributeName | The attribute to read             |

**Returns:** _boolean_

### readFloat32Attr

▸ **readFloat32Attr**(`item`: MemoryReader, `attribute`: AttributeName): _number_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:185

Reads **attribute** from **item** as a float32

**Parameters:**

| Name        | Type          | Description                       |
| ----------- | ------------- | --------------------------------- |
| `item`      | MemoryReader  | The item to get the attribute for |
| `attribute` | AttributeName | The attribute to read             |

**Returns:** _number_

### readFloat32Vec2Attr

▸ **readFloat32Vec2Attr**(`item`: MemoryReader, `attribute`: AttributeName): _[number, number]_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:212

Reads **attribute** from **item** as a float32[2]

**Parameters:**

| Name        | Type          | Description                       |
| ----------- | ------------- | --------------------------------- |
| `item`      | MemoryReader  | The item to get the attribute for |
| `attribute` | AttributeName | The attribute to read             |

**Returns:** _[number, number]_

### readFloat32Vec3Attr

▸ **readFloat32Vec3Attr**(`item`: MemoryReader, `attribute`: AttributeName): _[number, number, number]_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:268

Reads **attribute** from **item** as a float32[3]

**Parameters:**

| Name        | Type          | Description                       |
| ----------- | ------------- | --------------------------------- |
| `item`      | MemoryReader  | The item to get the attribute for |
| `attribute` | AttributeName | The attribute to read             |

**Returns:** _[number, number, number]_

### readNumber

▸ **readNumber**(`item`: MemoryReader, `attribute`: AttributeName): _number_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:78

Reads **attribute** from **item** as a number

**Parameters:**

| Name        | Type          | Description                       |
| ----------- | ------------- | --------------------------------- |
| `item`      | MemoryReader  | The item to get the attribute for |
| `attribute` | AttributeName | The attribute to read             |

**Returns:** _number_

### readProperty

▸ **readProperty**‹**P**›(`item`: MemoryReader, `property`: AttributeName): _P | undefined_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:40

Reads the **property** for the **item**

**Type parameters:**

▪ **P**

**Parameters:**

| Name       | Type          | Description                      |
| ---------- | ------------- | -------------------------------- |
| `item`     | MemoryReader  | The item to get the property for |
| `property` | AttributeName | The property to read             |

**Returns:** _P | undefined_

### readString

▸ **readString**(`item`: MemoryReader, `attribute`: AttributeName): _string | undefined_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:128

Reads **attribute** from **item** as a string

**Parameters:**

| Name        | Type          | Description                       |
| ----------- | ------------- | --------------------------------- |
| `item`      | MemoryReader  | The item to get the attribute for |
| `attribute` | AttributeName | The attribute to read             |

**Returns:** _string | undefined_

### readUint32Attr

▸ **readUint32Attr**(`item`: MemoryReader, `attribute`: AttributeName): _number_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:440

Reads **attribute** from **item** as a uint32

**Parameters:**

| Name        | Type          | Description                       |
| ----------- | ------------- | --------------------------------- |
| `item`      | MemoryReader  | The item to get the attribute for |
| `attribute` | AttributeName | The attribute to read             |

**Returns:** _number_

### readUint8Attr

▸ **readUint8Attr**(`item`: MemoryReader, `attribute`: AttributeName): _number_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:289

Reads **attribute** from **item** as a unit8

**Parameters:**

| Name        | Type          | Description                       |
| ----------- | ------------- | --------------------------------- |
| `item`      | MemoryReader  | The item to get the attribute for |
| `attribute` | AttributeName | The attribute to read             |

**Returns:** _number_

### readUint8Vec2Attr

▸ **readUint8Vec2Attr**(`item`: MemoryReader, `attribute`: AttributeName): _[number, number]_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:316

Reads **attribute** from **item** as a unit8[2]

**Parameters:**

| Name        | Type          | Description                       |
| ----------- | ------------- | --------------------------------- |
| `item`      | MemoryReader  | The item to get the attribute for |
| `attribute` | AttributeName | The attribute to read             |

**Returns:** _[number, number]_

### readUint8Vec3Attr

▸ **readUint8Vec3Attr**(`item`: MemoryReader, `attribute`: AttributeName): _[number, number, number] | undefined_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:352

Reads **attribute** from **item** as a unit8[3]

**Parameters:**

| Name        | Type          | Description                       |
| ----------- | ------------- | --------------------------------- |
| `item`      | MemoryReader  | The item to get the attribute for |
| `attribute` | AttributeName | The attribute to read             |

**Returns:** _[number, number, number] | undefined_

### readUint8Vec4Attr

▸ **readUint8Vec4Attr**(`item`: MemoryReader, `attribute`: AttributeName): _[number, number, number, number] | undefined_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:394

Reads **attribute** from **item** as a unit8[4]

**Parameters:**

| Name        | Type          | Description                       |
| ----------- | ------------- | --------------------------------- |
| `item`      | MemoryReader  | The item to get the attribute for |
| `attribute` | AttributeName | The attribute to read             |

**Returns:** _[number, number, number, number] | undefined_

### writeBoolAttr

▸ **writeBoolAttr**(`item`: MemoryReader, `attribute`: AttributeName, `value`: boolean): _void_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:169

Writes **attribute** for **item** as a boolean

**Parameters:**

| Name        | Type          | Description             |
| ----------- | ------------- | ----------------------- |
| `item`      | MemoryReader  | The item to update      |
| `attribute` | AttributeName | The attribute to update |
| `value`     | boolean       | The attribute value     |

**Returns:** _void_

### writeFloat32Attr

▸ **writeFloat32Attr**(`item`: MemoryReader, `attribute`: AttributeName, `value`: number): _void_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:195

Writes **attribute** for **item** as a float32

**Parameters:**

| Name        | Type          | Description             |
| ----------- | ------------- | ----------------------- |
| `item`      | MemoryReader  | The item to update      |
| `attribute` | AttributeName | The attribute to update |
| `value`     | number        | The attribute value     |

**Returns:** _void_

### writeFloat32Vec2Attr

▸ **writeFloat32Vec2Attr**(`item`: MemoryReader, `attribute`: AttributeName, `x`: number, `y`: number): _void_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:227

Writes **attribute** for **item** as a float32[2]

**Parameters:**

| Name        | Type          | Description               |
| ----------- | ------------- | ------------------------- |
| `item`      | MemoryReader  | The item to update        |
| `attribute` | AttributeName | The attribute to update   |
| `x`         | number        | The x component to update |
| `y`         | number        | The y component to update |

**Returns:** _void_

### writeFloat32Vec3Attr

▸ **writeFloat32Vec3Attr**(`item`: MemoryReader, `attribute`: AttributeName, `x`: number, `y`: number, `z`: number): _void_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:250

Writes **attribute** for **item** as a float32[3]

**Parameters:**

| Name        | Type          | Description               |
| ----------- | ------------- | ------------------------- |
| `item`      | MemoryReader  | The item to update        |
| `attribute` | AttributeName | The attribute to update   |
| `x`         | number        | The x component to update |
| `y`         | number        | The y component to update |
| `z`         | number        | The z component to update |

**Returns:** _void_

### writeNumber

▸ **writeNumber**(`item`: MemoryReader, `attribute`: AttributeName, `value`: number): _void_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:99

Writes **attribute** for **item** as a number

**Parameters:**

| Name        | Type          | Description             |
| ----------- | ------------- | ----------------------- |
| `item`      | MemoryReader  | The item to update      |
| `attribute` | AttributeName | The attribute to update |
| `value`     | number        | The attribute value     |

**Returns:** _void_

### writeProperty

▸ **writeProperty**‹**P**›(`item`: MemoryReader, `property`: AttributeName, `value`: P): _void_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:56

Writes the **property** for the **item**

**Type parameters:**

▪ **P**

**Parameters:**

| Name       | Type          | Description               |
| ---------- | ------------- | ------------------------- |
| `item`     | MemoryReader  | The item to update        |
| `property` | AttributeName | The property to update    |
| `value`    | P             | The value of the property |

**Returns:** _void_

### writeString

▸ **writeString**(`item`: MemoryReader, `attribute`: AttributeName, `value`: string): _void_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:141

Writes **attribute** for **item** as a string

**Parameters:**

| Name        | Type          | Description             |
| ----------- | ------------- | ----------------------- |
| `item`      | MemoryReader  | The item to update      |
| `attribute` | AttributeName | The attribute to update |
| `value`     | string        | The attribute value     |

**Returns:** _void_

### writeUint32Attr

▸ **writeUint32Attr**(`item`: MemoryReader, `attribute`: AttributeName, `value`: number): _void_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:450

Writes **attribute** for **item** as a unit32

**Parameters:**

| Name        | Type          | Description             |
| ----------- | ------------- | ----------------------- |
| `item`      | MemoryReader  | The item to update      |
| `attribute` | AttributeName | The attribute to update |
| `value`     | number        | The attribute value     |

**Returns:** _void_

### writeUint8Attr

▸ **writeUint8Attr**(`item`: MemoryReader, `attribute`: AttributeName, `value`: number): _void_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:299

Writes **attribute** for **item** as a unit8

**Parameters:**

| Name        | Type          | Description             |
| ----------- | ------------- | ----------------------- |
| `item`      | MemoryReader  | The item to update      |
| `attribute` | AttributeName | The attribute to update |
| `value`     | number        | The attribute value     |

**Returns:** _void_

### writeUint8Vec2Attr

▸ **writeUint8Vec2Attr**(`item`: MemoryReader, `attribute`: AttributeName, `x`: number, `y`: number): _void_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:332

Writes **attribute** for **item** as a uint8[2]

**Parameters:**

| Name        | Type          | Description               |
| ----------- | ------------- | ------------------------- |
| `item`      | MemoryReader  | The item to update        |
| `attribute` | AttributeName | The attribute to update   |
| `x`         | number        | The x component to update |
| `y`         | number        | The y component to update |

**Returns:** _void_

### writeUint8Vec3Attr

▸ **writeUint8Vec3Attr**(`item`: MemoryReader, `attribute`: AttributeName, `x`: number, `y`: number, `z`: number): _void_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:372

Writes **attribute** for **item** as a uint8[3]

**Parameters:**

| Name        | Type          | Description               |
| ----------- | ------------- | ------------------------- |
| `item`      | MemoryReader  | The item to update        |
| `attribute` | AttributeName | The attribute to update   |
| `x`         | number        | The x component to update |
| `y`         | number        | The y component to update |
| `z`         | number        | The z component to update |

**Returns:** _void_

### writeUint8Vec4Attr

▸ **writeUint8Vec4Attr**(`item`: MemoryReader, `attribute`: AttributeName, `x`: number, `y`: number, `z`: number, `zz`: number): _void_

Defined in packages/libs/memstore/src/reader/MemoryReaderInspector.ts:416

Writes **attribute** for **item** as a uint8[4]

**Parameters:**

| Name        | Type          | Description                |
| ----------- | ------------- | -------------------------- |
| `item`      | MemoryReader  | The item to update         |
| `attribute` | AttributeName | The attribute to update    |
| `x`         | number        | The x component to update  |
| `y`         | number        | The y component to update  |
| `z`         | number        | The z component to update  |
| `zz`        | number        | The zz component to update |

**Returns:** _void_

---

### "reader/ReaderStore"

• **"reader/ReaderStore"**:

Defined in packages/libs/memstore/src/reader/ReaderStore.ts:1

### ReaderStoreImpl

• **ReaderStoreImpl**:

Defined in packages/libs/memstore/src/reader/ReaderStore.ts:12

**`inheritdoc`**

**`see`** {@link ReaderStore}

### constructor

\+ **new ReaderStoreImpl**(`itemClass`: MemoryReaderClass<P>, `store`: ArrayStore, `allocator`: SlotAllocator): _ReaderStoreImpl_

_Overrides void_

Defined in packages/libs/memstore/src/reader/ReaderStore.ts:16

Constructor for the ReaderStoreImpl

**Parameters:**

| Name        | Type                 | Default                                  | Description                                             |
| ----------- | -------------------- | ---------------------------------------- | ------------------------------------------------------- |
| `itemClass` | MemoryReaderClass<P> | -                                        | The class of the item, used when constructing new items |
| `store`     | ArrayStore           | -                                        | The underlying stor eto use                             |
| `allocator` | SlotAllocator        | new SlotAllocator(store.config.capacity) | The allocator to use for allocating new ids             |

**Returns:** _ReaderStoreImpl_

### `Private` itemClass

• **itemClass**: _MemoryReaderClass<P>_

Defined in packages/libs/memstore/src/reader/ReaderStore.ts:15

### `Private` items

• **items**: _P[]_

Defined in packages/libs/memstore/src/reader/ReaderStore.ts:14

### `Protected` onAddHandlers

• **onAddHandlers**: _AddRemoveItemHandler[]_ = []

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:93

### `Protected` onRemoveHandlers

• **onRemoveHandlers**: _AddRemoveItemHandler[]_ = []

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:94

### `Protected` onUpdateHandlers

• **onUpdateHandlers**: _AttributeUpdatedHandler[]_ = []

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:92

callbacks and handlers

### propertyBags

• **propertyBags**: _Record<number, any>_

_Implementation of void_

Defined in packages/libs/memstore/src/reader/ReaderStore.ts:16

### `Protected` slotAllocator

• **slotAllocator**: _SlotAllocator_

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:89

a map of available storage slots in the buffer, modeled as alinked list

### count

• **count**:

_Implementation of void_

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:123

The count of ids

### store

• **store**:

_Implementation of void_

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:115

The backing ArrayStore

### [Symbol.iterator]

▸ **[Symbol.iterator]**(): _Iterator<P>_

_Implementation of void_

Defined in packages/libs/memstore/src/reader/ReaderStore.ts:78

**Returns:** _Iterator<P>_

### add

▸ **add**(`events`: boolean): _number_

_Overrides void_

Defined in packages/libs/memstore/src/reader/ReaderStore.ts:111

**`inheritdoc`**

**`see`** {@link IdStore.add}

**Parameters:**

| Name     | Type    | Default |
| -------- | ------- | ------- |
| `events` | boolean | true    |

**Returns:** _number_

### `Private` createConnectedItem

▸ **createConnectedItem**(`storeId`: number): _P_

Defined in packages/libs/memstore/src/reader/ReaderStore.ts:71

**`inheritdoc`**

**`see`** {@link ReaderStore.createConnectedItem}

**Parameters:**

| Name      | Type   |
| --------- | ------ |
| `storeId` | number |

**Returns:** _P_

### destroy

▸ **destroy**(): _void_

_Implementation of void_

_Overrides void_

Defined in packages/libs/memstore/src/reader/ReaderStore.ts:144

Destroys this store instance

**Returns:** _void_

### `Protected` fireAddHandlers

▸ **fireAddHandlers**(`itemIndex`: number): _void_

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:263

Raises the add event

**Parameters:**

| Name        | Type   | Description          |
| ----------- | ------ | -------------------- |
| `itemIndex` | number | The added item index |

**Returns:** _void_

### `Protected` fireRemoveHandlers

▸ **fireRemoveHandlers**(`itemIndex`: number): _void_

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:271

Raises the add event

**Parameters:**

| Name        | Type   | Description          |
| ----------- | ------ | -------------------- |
| `itemIndex` | number | The added item index |

**Returns:** _void_

### `Protected` fireUpdateHandlers

▸ **fireUpdateHandlers**(`id`: number, `attribute?`: AttributeName, `value?`: unknown): _void_

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:251

Fires the update handlers

**Parameters:**

| Name         | Type          | Description                |
| ------------ | ------------- | -------------------------- |
| `id`         | number        | The store id               |
| `attribute?` | AttributeName | The attribute name         |
| `value?`     | unknown       | The value of the attribute |

**Returns:** _void_

### itemAt

▸ **itemAt**(`storeId`: number): _P_

_Implementation of void_

Defined in packages/libs/memstore/src/reader/ReaderStore.ts:55

Get an item at an index

**Parameters:**

| Name      | Type   | Description    |
| --------- | ------ | -------------- |
| `storeId` | number | The item index |

**Returns:** _P_

### itemIds

▸ **itemIds**(): _Iterable<number>_

_Implementation of void_

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:131

Returns an iterator for all of the items contained in this store

**Returns:** _Iterable<number>_

### notify

▸ **notify**(`id`: number, `attribute?`: AttributeName, `value?`: unknown): _void_

_Implementation of void_

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:235

Notifies the PrimitiveStore of an Attribute change externally

**Parameters:**

| Name         | Type          | Description                                                       |
| ------------ | ------------- | ----------------------------------------------------------------- |
| `id`         | number        | The store id                                                      |
| `attribute?` | AttributeName | The attribute that changed                                        |
| `value?`     | unknown       | The optional value, if undefined, all the attributes have changed |

**Returns:** _void_

### onAddItem

▸ **onAddItem**(`handler`: AddRemoveItemHandler): _Detach_

_Implementation of void_

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:151

Calls **handler** when an item has been added

**Parameters:**

| Name      | Type                 | Description            |
| --------- | -------------------- | ---------------------- |
| `handler` | AddRemoveItemHandler | The item added handler |

**Returns:** _Detach_

### onAttributeUpdated

▸ **onAttributeUpdated**(`handler`: AttributeUpdatedHandler): _Detach_

_Implementation of void_

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:140

Calls **handler** when an attribute is updated

**Parameters:**

| Name      | Type                    | Description                   |
| --------- | ----------------------- | ----------------------------- |
| `handler` | AttributeUpdatedHandler | The attribute updated handler |

**Returns:** _Detach_

### onRemoveItem

▸ **onRemoveItem**(`handler`: AddRemoveItemHandler): _Detach_

_Implementation of void_

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:162

Calls **handler** when an item has been removed

**Parameters:**

| Name      | Type                 | Description              |
| --------- | -------------------- | ------------------------ |
| `handler` | AddRemoveItemHandler | The item removed handler |

**Returns:** _Detach_

### receive

▸ **receive**(`primitive`: P): _number_

Defined in packages/libs/memstore/src/reader/ReaderStore.ts:43

**`inheritdoc`**

**`see`** {@link ReaderStore.receive}

**Parameters:**

| Name        | Type |
| ----------- | ---- |
| `primitive` | P    |

**Returns:** _number_

### remove

▸ **remove**(`idx`: number): _void_

_Implementation of void_

_Overrides void_

Defined in packages/libs/memstore/src/reader/ReaderStore.ts:124

Removes the primitive with the given store id

**Parameters:**

| Name  | Type   |
| ----- | ------ |
| `idx` | number |

**Returns:** _void_

### reset

▸ **reset**(): _void_

_Implementation of void_

_Overrides void_

Defined in packages/libs/memstore/src/reader/ReaderStore.ts:135

Resets the Buffer back to the default state

**Returns:** _void_

### slurp

▸ **slurp**(`targetId`: number, `sourceBuffer`: ArrayBuffer, `propertyBag`: any, `sourceOffset`: number): _void_

Defined in packages/libs/memstore/src/reader/ReaderStore.ts:89

**`inheritdoc`**

**`see`** {@link ReaderStore.slurp}

**Parameters:**

| Name           | Type        | Default |
| -------------- | ----------- | ------- |
| `targetId`     | number      | -       |
| `sourceBuffer` | ArrayBuffer | -       |
| `propertyBag`  | any         | {}      |
| `sourceOffset` | number      | 0       |

**Returns:** _void_

---

### "reader/createReader"

• **"reader/createReader"**:

Defined in packages/libs/memstore/src/reader/createReader.ts:1

### PropertySpecification

Ƭ **PropertySpecification**: _string | object_

Defined in packages/libs/memstore/src/reader/createReader.ts:25

Describes a property

### createReader

▸ **createReader**‹**P**›(`readerType`: symbol, `layout`: MemoryLayout, `additionalProperties`: PropertySpecification[], `setterAugmenter`: SetterAugmenter<any, MemoryReader>): _MemoryReaderClass<P>_

Defined in packages/libs/memstore/src/reader/createReader.ts:36

Creates a MemoryReader implementation which can read the given memory layout efficiently

**Type parameters:**

▪ **P**

**Parameters:**

| Name                   | Type                               | Default                  | Description                                                                                     |
| ---------------------- | ---------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------- |
| `readerType`           | symbol                             | -                        | The type of reader                                                                              |
| `layout`               | MemoryLayout                       | -                        | The memory layout                                                                               |
| `additionalProperties` | PropertySpecification[]            | []                       | The additional properties to add to the implementation                                          |
| `setterAugmenter`      | SetterAugmenter<any, MemoryReader> | DEFAULT_SETTER_AUGMENTER | The setter augmenter, which can be used to manipulate the underlying generated property setters |

**Returns:** _MemoryReaderClass<P>_

---

### "reader/index"

• **"reader/index"**:

Defined in packages/libs/memstore/src/reader/index.ts:1

### GetterFn

• **GetterFn**:

### MemoryReader

• **MemoryReader**:

### MemoryReaderClass

• **MemoryReaderClass**:

### MemoryReaderInspector

• **MemoryReaderInspector**:

### PropertySpecification

• **PropertySpecification**:

### ReaderStore

• **ReaderStore**:

### ReaderStoreImpl

• **ReaderStoreImpl**:

### SetterAugmenter

• **SetterAugmenter**:

### SetterFn

• **SetterFn**:

### createReader

• **createReader**:

---

### "reader/types"

• **"reader/types"**:

Defined in packages/libs/memstore/src/reader/types.ts:1

### MemoryReader

• **MemoryReader**:

Defined in packages/libs/memstore/src/reader/types.ts:11

An object for interacting with the raw data for an item stored in an ArrayStore

### `Readonly` buffer

• **buffer**: _ArrayBuffer_

Defined in packages/libs/memstore/src/reader/types.ts:30

The low-level buffer access to the memory

### byteOffset

• **byteOffset**: _number_

Defined in packages/libs/memstore/src/reader/types.ts:55

The byte offset of the item in the store

### `Readonly` float32Array

• **float32Array**: _Float32Array_

Defined in packages/libs/memstore/src/reader/types.ts:40

The low-level Float32Array view access to the memory

### `Readonly` layout

• **layout**: _MemoryLayout_

Defined in packages/libs/memstore/src/reader/types.ts:15

The memory layout

### `Readonly` store

• **store**: _ReaderStore<any>_

Defined in packages/libs/memstore/src/reader/types.ts:25

The underlying store

### storeId

• **storeId**: _number_

Defined in packages/libs/memstore/src/reader/types.ts:50

The id of the item in the store

### `Readonly` type

• **type**: _symbol_

Defined in packages/libs/memstore/src/reader/types.ts:20

The type of item

### `Readonly` uint32Array

• **uint32Array**: _Uint32Array_

Defined in packages/libs/memstore/src/reader/types.ts:45

The low-level Uint32Array view access to the memory

### `Readonly` uint8Array

• **uint8Array**: _Uint8Array_

Defined in packages/libs/memstore/src/reader/types.ts:35

The low-level Uint8Array view access to the memory

### wordOffset

• **wordOffset**: _number_

Defined in packages/libs/memstore/src/reader/types.ts:60

The word offset of the item in the store

### connect

▸ **connect**(`storeId`: number, `store`: ReaderStore<any>): _void_

Defined in packages/libs/memstore/src/reader/types.ts:67

Connects this reader to a store instance

**Parameters:**

| Name      | Type             | Description     |
| --------- | ---------------- | --------------- |
| `storeId` | number           | The new storeid |
| `store`   | ReaderStore<any> | Thes store      |

**Returns:** _void_

### MemoryReaderClass

• **MemoryReaderClass**:

Defined in packages/libs/memstore/src/reader/types.ts:74

An object which can be constructed to produce a MemoryReader

### constructor

\+ **new MemoryReaderClass**(`store?`: ReaderStore<P>, `storeId?`: undefined | number): _P & MemoryReader_

Defined in packages/libs/memstore/src/reader/types.ts:74

**Parameters:**

| Name       | Type                    |
| ---------- | ----------------------- |
| `store?`   | ReaderStore<P>          |
| `storeId?` | undefined &#124; number |

**Returns:** _P & MemoryReader_

### ReaderStore

• **ReaderStore**:

Defined in packages/libs/memstore/src/reader/types.ts:106

A store which provides a list like functionality for interacting with MemoryReader based items

### `Readonly` count

• **count**: _number_

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:22

The count of ids

### propertyBags

• **propertyBags**: _Record<number, any>_

Defined in packages/libs/memstore/src/reader/types.ts:110

dynamic property storage

### `Readonly` store

• **store**: _ArrayStore_

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:17

The backing ArrayStore

### [Symbol.iterator]

▸ **[Symbol.iterator]**(): _Iterator<P & MemoryReader>_

_Inherited from void_

Defined in node_modules/typescript/lib/lib.es2015.iterable.d.ts:51

**Returns:** _Iterator<P & MemoryReader>_

### add

▸ **add**(): _number_

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:52

Adds space a new item

**Returns:** _number_

The store index of the new item

### destroy

▸ **destroy**(): _void_

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:68

Destroys this store instance

**Returns:** _void_

### itemAt

▸ **itemAt**(`index`: number): _P & MemoryReader_

Defined in packages/libs/memstore/src/reader/types.ts:122

Get an item at an index

**Parameters:**

| Name    | Type   | Description    |
| ------- | ------ | -------------- |
| `index` | number | The item index |

**Returns:** _P & MemoryReader_

### itemIds

▸ **itemIds**(): _Iterable<number>_

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:27

Returns an iterator for all of the items contained in this store

**Returns:** _Iterable<number>_

### notify

▸ **notify**(`storeId`: number, `attribute`: AttributeName, `value?`: unknown): _void_

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:76

Notifies the PrimitiveStore of an Attribute change externally

**Parameters:**

| Name        | Type          | Description                                                       |
| ----------- | ------------- | ----------------------------------------------------------------- |
| `storeId`   | number        | The store id                                                      |
| `attribute` | AttributeName | The attribute that changed                                        |
| `value?`    | unknown       | The optional value, if undefined, all the attributes have changed |

**Returns:** _void_

### onAddItem

▸ **onAddItem**(`handler`: AddRemoveItemHandler): _function_

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:40

Calls **handler** when an item has been added

**Parameters:**

| Name      | Type                 | Description            |
| --------- | -------------------- | ---------------------- |
| `handler` | AddRemoveItemHandler | The item added handler |

**Returns:** _function_

▸ (): _void_

### onAttributeUpdated

▸ **onAttributeUpdated**(`handler`: AttributeUpdatedHandler): _function_

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:34

Calls **handler** when an attribute is updated

**Parameters:**

| Name      | Type                    | Description                   |
| --------- | ----------------------- | ----------------------------- |
| `handler` | AttributeUpdatedHandler | The attribute updated handler |

**Returns:** _function_

▸ (): _void_

### onRemoveItem

▸ **onRemoveItem**(`handler`: AddRemoveItemHandler): _function_

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:46

Calls **handler** when an item has been removed

**Parameters:**

| Name      | Type                 | Description              |
| --------- | -------------------- | ------------------------ |
| `handler` | AddRemoveItemHandler | The item removed handler |

**Returns:** _function_

▸ (): _void_

### receive

▸ **receive**(`primitive`: P & MemoryReader): _number_

Defined in packages/libs/memstore/src/reader/types.ts:116

Accept an item into the store

**Parameters:**

| Name        | Type             | Description                          |
| ----------- | ---------------- | ------------------------------------ |
| `primitive` | P & MemoryReader | The primitive to accept into storage |

**Returns:** _number_

### remove

▸ **remove**(`idx`: number): _void_

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:58

Removes the primitive with the given store id

**Parameters:**

| Name  | Type   |
| ----- | ------ |
| `idx` | number |

**Returns:** _void_

### reset

▸ **reset**(): _void_

_Inherited from void_

Defined in packages/libs/memstore/src/store/IdStore.ts:63

Resets the Buffer back to the default state

**Returns:** _void_

### slurp

▸ **slurp**(`targetId`: number, `sourceBuffer`: ArrayBuffer, `propertyBag?`: any, `sourceOffset?`: undefined | number): _void_

Defined in packages/libs/memstore/src/reader/types.ts:131

Copies data from a store into this store

**Parameters:**

| Name            | Type                    | Description               |
| --------------- | ----------------------- | ------------------------- |
| `targetId`      | number                  | The target item id        |
| `sourceBuffer`  | ArrayBuffer             | The source buffer         |
| `propertyBag?`  | any                     | The optional property bag |
| `sourceOffset?` | undefined &#124; number | -                         |

**Returns:** _void_

### GetterFn

Ƭ **GetterFn**: _function_

Defined in packages/libs/memstore/src/reader/types.ts:81

A getter function interface

#### Type declaration:

▸ (): _T_

### SetterAugmenter

Ƭ **SetterAugmenter**: _function_

Defined in packages/libs/memstore/src/reader/types.ts:98

A setter augmenter

**`param`** The old setter

**`param`** The name of the property

**`returns`** The overridden setter

#### Type declaration:

▸ (`setter`: SetterFn<T, This>, `name`: string): _SetterFn<T>_

**Parameters:**

| Name     | Type              |
| -------- | ----------------- |
| `setter` | SetterFn<T, This> |
| `name`   | string            |

### SetterFn

Ƭ **SetterFn**: _function_

Defined in packages/libs/memstore/src/reader/types.ts:87

A setter function

**`param`** The new value of the property

#### Type declaration:

▸ (`this`: This, `value`: T): _void_

**Parameters:**

| Name    | Type |
| ------- | ---- |
| `this`  | This |
| `value` | T    |

---

### "specification/AttributeType"

• **"specification/AttributeType"**:

Defined in packages/libs/memstore/src/specification/AttributeType.ts:1

---

### "specification/LayoutBuilder"

• **"specification/LayoutBuilder"**:

Defined in packages/libs/memstore/src/specification/LayoutBuilder.ts:1

### `Const` SpacerAttributeName

• **SpacerAttributeName**: _"**SPACER**"_ = "**SPACER**"

Defined in packages/libs/memstore/src/specification/LayoutBuilder.ts:20

### getBytesPerItem

▸ **getBytesPerItem**(`layout`: MemoryLayout): _number_

Defined in packages/libs/memstore/src/specification/LayoutBuilder.ts:166

Gets the total number of bytes required to represent a single item in memory

**Parameters:**

| Name     | Type         | Description       |
| -------- | ------------ | ----------------- |
| `layout` | MemoryLayout | The memory layout |

**Returns:** _number_

---

### "specification/index"

• **"specification/index"**:

Defined in packages/libs/memstore/src/specification/index.ts:1

### AttributeAlias

• **AttributeAlias**:

### AttributeName

• **AttributeName**:

### AttributeOptions

• **AttributeOptions**:

### AttributeSpecification

• **AttributeSpecification**:

### AttributeType

• **AttributeType**:

### InterpretationHint

• **InterpretationHint**:

### LayoutBuilder

• **LayoutBuilder**:

### MemoryLayout

• **MemoryLayout**:

### SpacerAttributeName

• **SpacerAttributeName**:

### Vec2AttributeOptions

• **Vec2AttributeOptions**:

### Vec3AttributeOptions

• **Vec3AttributeOptions**:

### Vec4AttributeOptions

• **Vec4AttributeOptions**:

### getBytesPerItem

• **getBytesPerItem**:

---

### "specification/types"

• **"specification/types"**:

Defined in packages/libs/memstore/src/specification/types.ts:1

### AttributeType

• **AttributeType**:

Defined in packages/libs/memstore/src/specification/types.ts:5

### Float32

• **Float32**:

Defined in packages/libs/memstore/src/specification/types.ts:6

### Uint32

• **Uint32**:

Defined in packages/libs/memstore/src/specification/types.ts:8

### Uint8

• **Uint8**:

Defined in packages/libs/memstore/src/specification/types.ts:7

### InterpretationHint

• **InterpretationHint**:

Defined in packages/libs/memstore/src/specification/types.ts:135

Indicates how a value should be interpreted

### Boolean

• **Boolean**:

Defined in packages/libs/memstore/src/specification/types.ts:139

Interpret a uint8 value as a boolean

### AttributeAlias

• **AttributeAlias**:

Defined in packages/libs/memstore/src/specification/types.ts:145

An alias for an attribute

### `Optional` hint

• **hint**? : _InterpretationHint_

Defined in packages/libs/memstore/src/specification/types.ts:164

The hint used for intepreting the alias' value

### name

• **name**: _string_

Defined in packages/libs/memstore/src/specification/types.ts:149

The alias name

### `Optional` size

• **size**? : _undefined | number_

Defined in packages/libs/memstore/src/specification/types.ts:154

The number of elements for this alias

### type

• **type**: _AttributeType_

Defined in packages/libs/memstore/src/specification/types.ts:159

The type of attribute

### AttributeOptions

• **AttributeOptions**:

Defined in packages/libs/memstore/src/specification/types.ts:120

A set of options used for constructing the MemoryLayout for a single attribute

### `Optional` aliases

• **aliases**? : _AttributeAlias[]_

Defined in packages/libs/memstore/src/specification/types.ts:124

The set of aliases for the attribute

### `Optional` hint

• **hint**? : _InterpretationHint_

Defined in packages/libs/memstore/src/specification/types.ts:129

The hint used for interpreting the attribute's value

### AttributeSpecification

• **AttributeSpecification**:

Defined in packages/libs/memstore/src/specification/types.ts:14

The specification for a single attribute contained in a MemoryLayout

### `Optional` alias

• **alias**? : _undefined | false | true_

Defined in packages/libs/memstore/src/specification/types.ts:43

Whether the attribute is an alias attribute

### `Optional` hint

• **hint**? : _InterpretationHint_

Defined in packages/libs/memstore/src/specification/types.ts:48

Optional type interpretation hint

### name

• **name**: _string_

Defined in packages/libs/memstore/src/specification/types.ts:18

The property name to use for this attribute in JavaScript client contexts

### offset

• **offset**: _number_

Defined in packages/libs/memstore/src/specification/types.ts:23

The byte offset into the array that this attribute belongs

### size

• **size**: _number_

Defined in packages/libs/memstore/src/specification/types.ts:33

The number of elements constituting this attribute

### type

• **type**: _AttributeType_

Defined in packages/libs/memstore/src/specification/types.ts:38

The Attribute type

### typedOffset

• **typedOffset**: _number_

Defined in packages/libs/memstore/src/specification/types.ts:28

The offset of the attribute in the typed array variant (e.g. float32array)

### LayoutBuilder

• **LayoutBuilder**:

Defined in packages/libs/memstore/src/specification/types.ts:54

A builder for constructing MemoryLayout instances

### addFloat32

▸ **addFloat32**(`name`: string, `options?`: AttributeOptions): _LayoutBuilder_

Defined in packages/libs/memstore/src/specification/types.ts:88

Adds space in the layout for a float32 attribute

**Parameters:**

| Name       | Type             | Description                   |
| ---------- | ---------------- | ----------------------------- |
| `name`     | string           | The name of the attribute     |
| `options?` | AttributeOptions | The options for the attribute |

**Returns:** _LayoutBuilder_

### addFloat32Vec2

▸ **addFloat32Vec2**(`name`: string, `options?`: Vec2AttributeOptions): _LayoutBuilder_

Defined in packages/libs/memstore/src/specification/types.ts:95

Adds space in the layout for a float32[2] attribute

**Parameters:**

| Name       | Type                 | Description                   |
| ---------- | -------------------- | ----------------------------- |
| `name`     | string               | The name of the attribute     |
| `options?` | Vec2AttributeOptions | The options for the attribute |

**Returns:** _LayoutBuilder_

### addFloat32Vec3

▸ **addFloat32Vec3**(`name`: string, `options?`: Vec3AttributeOptions): _LayoutBuilder_

Defined in packages/libs/memstore/src/specification/types.ts:102

Adds space in the layout for a float32[3] attribute

**Parameters:**

| Name       | Type                 | Description                   |
| ---------- | -------------------- | ----------------------------- |
| `name`     | string               | The name of the attribute     |
| `options?` | Vec3AttributeOptions | The options for the attribute |

**Returns:** _LayoutBuilder_

### addUint32

▸ **addUint32**(`name`: string, `options?`: AttributeOptions): _LayoutBuilder_

Defined in packages/libs/memstore/src/specification/types.ts:109

Adds space in the layout for a uint32 attribute

**Parameters:**

| Name       | Type             | Description                   |
| ---------- | ---------------- | ----------------------------- |
| `name`     | string           | The name of the attribute     |
| `options?` | AttributeOptions | The options for the attribute |

**Returns:** _LayoutBuilder_

### addUint8

▸ **addUint8**(`name`: string, `options?`: AttributeOptions): _LayoutBuilder_

Defined in packages/libs/memstore/src/specification/types.ts:60

Adds space in the layout for a uint8 attribute

**Parameters:**

| Name       | Type             | Description                   |
| ---------- | ---------------- | ----------------------------- |
| `name`     | string           | The name of the attribute     |
| `options?` | AttributeOptions | The options for the attribute |

**Returns:** _LayoutBuilder_

### addUint8Vec2

▸ **addUint8Vec2**(`name`: string, `options?`: Vec2AttributeOptions): _LayoutBuilder_

Defined in packages/libs/memstore/src/specification/types.ts:67

Adds space in the layout for a uint8[2] attribute

**Parameters:**

| Name       | Type                 | Description                   |
| ---------- | -------------------- | ----------------------------- |
| `name`     | string               | The name of the attribute     |
| `options?` | Vec2AttributeOptions | The options for the attribute |

**Returns:** _LayoutBuilder_

### addUint8Vec3

▸ **addUint8Vec3**(`name`: string, `options?`: Vec3AttributeOptions): _LayoutBuilder_

Defined in packages/libs/memstore/src/specification/types.ts:74

Adds space in the layout for a uint8[3] attribute

**Parameters:**

| Name       | Type                 | Description                   |
| ---------- | -------------------- | ----------------------------- |
| `name`     | string               | The name of the attribute     |
| `options?` | Vec3AttributeOptions | The options for the attribute |

**Returns:** _LayoutBuilder_

### addUint8Vec4

▸ **addUint8Vec4**(`name`: string, `options?`: Vec4AttributeOptions): _LayoutBuilder_

Defined in packages/libs/memstore/src/specification/types.ts:81

Adds space in the layout for a uint8[4] attribute

**Parameters:**

| Name       | Type                 | Description                   |
| ---------- | -------------------- | ----------------------------- |
| `name`     | string               | The name of the attribute     |
| `options?` | Vec4AttributeOptions | The options for the attribute |

**Returns:** _LayoutBuilder_

### build

▸ **build**(): _MemoryLayout_

Defined in packages/libs/memstore/src/specification/types.ts:114

Builds the final MemoryLayout

**Returns:** _MemoryLayout_

### Vec2AttributeOptions

• **Vec2AttributeOptions**:

Defined in packages/libs/memstore/src/specification/types.ts:170

The set of attribute options for a vec2 attribute

### `Optional` aliases

• **aliases**? : _AttributeAlias[]_

_Inherited from void_

Defined in packages/libs/memstore/src/specification/types.ts:124

The set of aliases for the attribute

### `Optional` components

• **components**? : _[string, string]_

Defined in packages/libs/memstore/src/specification/types.ts:174

The individual component names, i.e. x, y

### `Optional` hint

• **hint**? : _InterpretationHint_

_Inherited from void_

Defined in packages/libs/memstore/src/specification/types.ts:129

The hint used for interpreting the attribute's value

### Vec3AttributeOptions

• **Vec3AttributeOptions**:

Defined in packages/libs/memstore/src/specification/types.ts:180

The set of attribute options for a vec3 attribute

### `Optional` aliases

• **aliases**? : _AttributeAlias[]_

_Inherited from void_

Defined in packages/libs/memstore/src/specification/types.ts:124

The set of aliases for the attribute

### `Optional` components

• **components**? : _[string, string, string]_

Defined in packages/libs/memstore/src/specification/types.ts:184

The individual component names, i.e. x, y, z

### `Optional` hint

• **hint**? : _InterpretationHint_

_Inherited from void_

Defined in packages/libs/memstore/src/specification/types.ts:129

The hint used for interpreting the attribute's value

### Vec4AttributeOptions

• **Vec4AttributeOptions**:

Defined in packages/libs/memstore/src/specification/types.ts:190

The set of attribute options for a vec4 attribute

### `Optional` aliases

• **aliases**? : _AttributeAlias[]_

_Inherited from void_

Defined in packages/libs/memstore/src/specification/types.ts:124

The set of aliases for the attribute

### `Optional` components

• **components**? : _[string, string, string, string]_

Defined in packages/libs/memstore/src/specification/types.ts:194

The individual component names, i.e. x, y, z, w

### `Optional` hint

• **hint**? : _InterpretationHint_

_Inherited from void_

Defined in packages/libs/memstore/src/specification/types.ts:129

The hint used for interpreting the attribute's value

### AttributeName

Ƭ **AttributeName**: _string_

Defined in packages/libs/memstore/src/specification/types.ts:207

The name of an attribute

### MemoryLayout

Ƭ **MemoryLayout**: _Map<AttributeName, AttributeSpecification> & object_

Defined in packages/libs/memstore/src/specification/types.ts:200

Represents the layout for a single item's attributes in memory

---

### "store/ArrayStore"

• **"store/ArrayStore"**:

Defined in packages/libs/memstore/src/store/ArrayStore.ts:1

### ArrayStoreImpl

• **ArrayStoreImpl**:

Defined in packages/libs/memstore/src/store/ArrayStore.ts:143

Implementation of an ArrayStore

**`see`** {@link ArrayStore} for more info

### constructor

\+ **new ArrayStoreImpl**(`layout`: MemoryLayout, `options`: Partial<StoreConfig>): _ArrayStoreImpl_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:153

Constructor for the ItemArrayBuffer

**Parameters:**

| Name      | Type                 | Default         | Description       |
| --------- | -------------------- | --------------- | ----------------- |
| `layout`  | MemoryLayout         | -               | The memory layout |
| `options` | Partial<StoreConfig> | DEFAULT_OPTIONS | The store options |

**Returns:** _ArrayStoreImpl_

### `Private` \_buffer

• **\_buffer**: _ArrayBuffer_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:148

the underlying data storage buffer

### `Private` \_dataView

• **\_dataView**: _DataView_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:149

### `Private` \_float32Array

• **\_float32Array**: _Float32Array_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:150

### `Private` \_uint32Array

• **\_uint32Array**: _Uint32Array_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:152

### `Private` \_uint8Array

• **\_uint8Array**: _Uint8Array_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:151

### `Readonly` bytesPerItem

• **bytesPerItem**: _number_

_Implementation of void_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:145

### `Readonly` config

• **config**: _StoreConfig_

_Implementation of void_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:144

### `Readonly` layout

• **layout**: _MemoryLayout_

_Implementation of void_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:161

The memory layout

### `Private` onResizeHandlers

• **onResizeHandlers**: _Array<function>_ = []

Defined in packages/libs/memstore/src/store/ArrayStore.ts:153

### buffer

• **buffer**:

_Implementation of void_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:190

The backing buffer

### count

• **count**:

_Implementation of void_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:340

Returns the number of items which should be rendered

### dataView

• **dataView**:

Defined in packages/libs/memstore/src/store/ArrayStore.ts:198

**`inheritdoc`**

**`see`** {@link ArrayStore.dataView}

### float32Array

• **float32Array**:

Defined in packages/libs/memstore/src/store/ArrayStore.ts:206

**`inheritdoc`**

**`see`** {@link ArrayStore.float32Array}

### uint32Array

• **uint32Array**:

Defined in packages/libs/memstore/src/store/ArrayStore.ts:222

**`inheritdoc`**

**`see`** {@link ArrayStore.uint32Array}

### uint8Array

• **uint8Array**:

Defined in packages/libs/memstore/src/store/ArrayStore.ts:214

**`inheritdoc`**

**`see`** {@link ArrayStore.uint8Array}

### destroy

▸ **destroy**(): _void_

_Implementation of void_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:352

Destroys this ArrayStore

**Returns:** _void_

### getByteOffset

▸ **getByteOffset**(`idx`: number): _number_

_Implementation of void_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:303

Computes the byte offset for the given item

**Parameters:**

| Name  | Type   | Description                       |
| ----- | ------ | --------------------------------- |
| `idx` | number | The idx of the byte offset to get |

**Returns:** _number_

### getByteOffsetAttr

▸ **getByteOffsetAttr**(`idx`: number, `attribute`: string): _number_

_Implementation of void_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:319

Gets the byte offset for the given attribute and item

**Parameters:**

| Name        | Type   | Description                              |
| ----------- | ------ | ---------------------------------------- |
| `idx`       | number | The index of the item                    |
| `attribute` | string | The attribute to get the byte offset for |

**Returns:** _number_

### itemData

▸ **itemData**(`idx`: number): _ArrayBuffer_

_Implementation of void_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:288

Returns raw item data for the given item

**Parameters:**

| Name  | Type   | Description           |
| ----- | ------ | --------------------- |
| `idx` | number | The index of the item |

**Returns:** _ArrayBuffer_

An array buffer containing just the contents of the item in the memory layout of this ArrayStore

### onResize

▸ **onResize**(`handler`: function): _function_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:230

**`inheritdoc`**

**`see`** {@link ArrayStore.onResize}

**Parameters:**

▪ **handler**: _function_

▸ (): _void_

**Returns:** _function_

▸ (): _void_

### resize

▸ **resize**(`newSize`: number): _void_

_Implementation of void_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:241

Resizes the array store

**Parameters:**

| Name      | Type   | Description                           |
| --------- | ------ | ------------------------------------- |
| `newSize` | number | The new size the ArrayStore should be |

**Returns:** _void_

### slurp

▸ **slurp**(`targetIdx`: number, `sourceBuffer`: ArrayBuffer, `sourceOffset`: number): _void_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:364

**`inheritdoc`**

**`see`** {@link ArrayStore.slurp}

**Parameters:**

| Name           | Type        | Default |
| -------------- | ----------- | ------- |
| `targetIdx`    | number      | -       |
| `sourceBuffer` | ArrayBuffer | -       |
| `sourceOffset` | number      | 0       |

**Returns:** _void_

### ArrayStore

• **ArrayStore**:

Defined in packages/libs/memstore/src/store/ArrayStore.ts:31

Interface for buffer-backed array storage. Access to data is limited to primitive size-declared values
(e.g. Uint8, Uint32, Float32).

Each size-declared type may be also define accessors in Vec2 and Vec3 formats, which indicate that we will
allocate 2x or 3x the space of a single value respectively, and interpret the data as a fixed-size array of 2 or 3.

Each getter/setter combination should be named in the following way:
(read|write)<type><vec?>(Offset|Attr) - e.g. readUint8Vec2Offset writeFloat32Attr()

**Offset** indicates that we are using the given buffer offset directly without consulting
with a memory layout specification. Care should be used when using this option. -
**Attr** indicates that we are referencing a memory layout specification and the item index to
determine the correct memory reference.

### `Readonly` buffer

• **buffer**: _ArrayBuffer_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:107

The backing buffer

### `Readonly` bytesPerItem

• **bytesPerItem**: _number_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:40

The number of bytes each item consumes

### `Readonly` config

• **config**: _StoreConfig_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:35

The store configuration

### `Readonly` count

• **count**: _number_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:45

Returns the number of items which should be rendered

### `Readonly` layout

• **layout**: _MemoryLayout_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:50

The internal memory structure of the store

### destroy

▸ **destroy**(): _void_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:100

Destroys this ArrayStore

**Returns:** _void_

### getByteOffset

▸ **getByteOffset**(`idx`: number): _number_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:88

Computes the byte offset for the given item

**Parameters:**

| Name  | Type   | Description                       |
| ----- | ------ | --------------------------------- |
| `idx` | number | The idx of the byte offset to get |

**Returns:** _number_

### getByteOffsetAttr

▸ **getByteOffsetAttr**(`idx`: number, `attribute`: string): _number_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:95

Gets the byte offset for the given attribute and item

**Parameters:**

| Name        | Type   | Description                              |
| ----------- | ------ | ---------------------------------------- |
| `idx`       | number | The index of the item                    |
| `attribute` | string | The attribute to get the byte offset for |

**Returns:** _number_

### itemData

▸ **itemData**(`idx`: number): _ArrayBuffer_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:70

Returns raw item data for the given item

**Parameters:**

| Name  | Type   | Description           |
| ----- | ------ | --------------------- |
| `idx` | number | The index of the item |

**Returns:** _ArrayBuffer_

An array buffer containing just the contents of the item in the memory layout of this ArrayStore

### onResize

▸ **onResize**(`handler`: function): _Detach_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:57

Adds a resize handler for when the store resizes

**Parameters:**

▪ **handler**: _function_

The resize handler

▸ (): _void_

**Returns:** _Detach_

A callback for removing the handler

### resize

▸ **resize**(`newSize`: number): _void_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:63

Resizes the array store

**Parameters:**

| Name      | Type   | Description                           |
| --------- | ------ | ------------------------------------- |
| `newSize` | number | The new size the ArrayStore should be |

**Returns:** _void_

### slurp

▸ **slurp**(`targetIdx`: number, `sourceBuffer`: ArrayBuffer, `sourceOffset?`: undefined | number): _void_

Defined in packages/libs/memstore/src/store/ArrayStore.ts:78

Slurps data from the source buffer into this buffer

**Parameters:**

| Name            | Type                    | Description                                     |
| --------------- | ----------------------- | ----------------------------------------------- |
| `targetIdx`     | number                  | The target index                                |
| `sourceBuffer`  | ArrayBuffer             | The source arraybuffer                          |
| `sourceOffset?` | undefined &#124; number | The offset at which to start copying. Default=0 |

**Returns:** _void_

---

### "store/IdStore"

• **"store/IdStore"**:

Defined in packages/libs/memstore/src/store/IdStore.ts:1

### IdStoreImpl

• **IdStoreImpl**:

Defined in packages/libs/memstore/src/store/IdStore.ts:84

**&commat;internal**

An implementation of an IdStore

### constructor

\+ **new IdStoreImpl**(`store`: ArrayStore, `allocator`: SlotAllocator): _IdStoreImpl_

Defined in packages/libs/memstore/src/store/IdStore.ts:94

Constructor for the IdStoreImpl

**Parameters:**

| Name        | Type          | Description                          |
| ----------- | ------------- | ------------------------------------ |
| `store`     | ArrayStore    | The backing ArrayStore               |
| `allocator` | SlotAllocator | The allocator for allocating new ids |

**Returns:** _IdStoreImpl_

### `Private` \_count

• **\_count**: _number_ = 0

Defined in packages/libs/memstore/src/store/IdStore.ts:86

### `Private` \_store

• **\_store**: _ArrayStore_

Defined in packages/libs/memstore/src/store/IdStore.ts:85

### `Protected` onAddHandlers

• **onAddHandlers**: _AddRemoveItemHandler[]_ = []

Defined in packages/libs/memstore/src/store/IdStore.ts:93

### `Protected` onRemoveHandlers

• **onRemoveHandlers**: _AddRemoveItemHandler[]_ = []

Defined in packages/libs/memstore/src/store/IdStore.ts:94

### `Protected` onUpdateHandlers

• **onUpdateHandlers**: _AttributeUpdatedHandler[]_ = []

Defined in packages/libs/memstore/src/store/IdStore.ts:92

callbacks and handlers

### `Protected` slotAllocator

• **slotAllocator**: _SlotAllocator_

Defined in packages/libs/memstore/src/store/IdStore.ts:89

a map of available storage slots in the buffer, modeled as alinked list

### count

• **count**:

_Implementation of void_

Defined in packages/libs/memstore/src/store/IdStore.ts:123

The count of ids

### store

• **store**:

_Implementation of void_

Defined in packages/libs/memstore/src/store/IdStore.ts:115

The backing ArrayStore

### add

▸ **add**(`events`: boolean): _number_

Defined in packages/libs/memstore/src/store/IdStore.ts:175

**`inheritdoc`**

**`see`** {@link IdStore.add}

**Parameters:**

| Name     | Type    | Default |
| -------- | ------- | ------- |
| `events` | boolean | true    |

**Returns:** _number_

### destroy

▸ **destroy**(): _void_

_Implementation of void_

Defined in packages/libs/memstore/src/store/IdStore.ts:223

Destroys this store instance

**Returns:** _void_

### `Protected` fireAddHandlers

▸ **fireAddHandlers**(`itemIndex`: number): _void_

Defined in packages/libs/memstore/src/store/IdStore.ts:263

Raises the add event

**Parameters:**

| Name        | Type   | Description          |
| ----------- | ------ | -------------------- |
| `itemIndex` | number | The added item index |

**Returns:** _void_

### `Protected` fireRemoveHandlers

▸ **fireRemoveHandlers**(`itemIndex`: number): _void_

Defined in packages/libs/memstore/src/store/IdStore.ts:271

Raises the add event

**Parameters:**

| Name        | Type   | Description          |
| ----------- | ------ | -------------------- |
| `itemIndex` | number | The added item index |

**Returns:** _void_

### `Protected` fireUpdateHandlers

▸ **fireUpdateHandlers**(`id`: number, `attribute?`: AttributeName, `value?`: unknown): _void_

Defined in packages/libs/memstore/src/store/IdStore.ts:251

Fires the update handlers

**Parameters:**

| Name         | Type          | Description                |
| ------------ | ------------- | -------------------------- |
| `id`         | number        | The store id               |
| `attribute?` | AttributeName | The attribute name         |
| `value?`     | unknown       | The value of the attribute |

**Returns:** _void_

### itemIds

▸ **itemIds**(): _Iterable<number>_

_Implementation of void_

Defined in packages/libs/memstore/src/store/IdStore.ts:131

Returns an iterator for all of the items contained in this store

**Returns:** _Iterable<number>_

### notify

▸ **notify**(`id`: number, `attribute?`: AttributeName, `value?`: unknown): _void_

_Implementation of void_

Defined in packages/libs/memstore/src/store/IdStore.ts:235

Notifies the PrimitiveStore of an Attribute change externally

**Parameters:**

| Name         | Type          | Description                                                       |
| ------------ | ------------- | ----------------------------------------------------------------- |
| `id`         | number        | The store id                                                      |
| `attribute?` | AttributeName | The attribute that changed                                        |
| `value?`     | unknown       | The optional value, if undefined, all the attributes have changed |

**Returns:** _void_

### onAddItem

▸ **onAddItem**(`handler`: AddRemoveItemHandler): _Detach_

_Implementation of void_

Defined in packages/libs/memstore/src/store/IdStore.ts:151

Calls **handler** when an item has been added

**Parameters:**

| Name      | Type                 | Description            |
| --------- | -------------------- | ---------------------- |
| `handler` | AddRemoveItemHandler | The item added handler |

**Returns:** _Detach_

### onAttributeUpdated

▸ **onAttributeUpdated**(`handler`: AttributeUpdatedHandler): _Detach_

_Implementation of void_

Defined in packages/libs/memstore/src/store/IdStore.ts:140

Calls **handler** when an attribute is updated

**Parameters:**

| Name      | Type                    | Description                   |
| --------- | ----------------------- | ----------------------------- |
| `handler` | AttributeUpdatedHandler | The attribute updated handler |

**Returns:** _Detach_

### onRemoveItem

▸ **onRemoveItem**(`handler`: AddRemoveItemHandler): _Detach_

_Implementation of void_

Defined in packages/libs/memstore/src/store/IdStore.ts:162

Calls **handler** when an item has been removed

**Parameters:**

| Name      | Type                 | Description              |
| --------- | -------------------- | ------------------------ |
| `handler` | AddRemoveItemHandler | The item removed handler |

**Returns:** _Detach_

### remove

▸ **remove**(`idx`: number, `events`: boolean): _void_

Defined in packages/libs/memstore/src/store/IdStore.ts:195

**`inheritdoc`**

**`see`** {@link IdStore.remove}

**Parameters:**

| Name     | Type    | Default |
| -------- | ------- | ------- |
| `idx`    | number  | -       |
| `events` | boolean | true    |

**Returns:** _void_

### reset

▸ **reset**(): _void_

_Implementation of void_

Defined in packages/libs/memstore/src/store/IdStore.ts:207

Resets the Buffer back to the default state

**Returns:** _void_

### IdStore

• **IdStore**:

Defined in packages/libs/memstore/src/store/IdStore.ts:13

A store which stores ids

### `Readonly` count

• **count**: _number_

Defined in packages/libs/memstore/src/store/IdStore.ts:22

The count of ids

### `Readonly` store

• **store**: _ArrayStore_

Defined in packages/libs/memstore/src/store/IdStore.ts:17

The backing ArrayStore

### add

▸ **add**(): _number_

Defined in packages/libs/memstore/src/store/IdStore.ts:52

Adds space a new item

**Returns:** _number_

The store index of the new item

### destroy

▸ **destroy**(): _void_

Defined in packages/libs/memstore/src/store/IdStore.ts:68

Destroys this store instance

**Returns:** _void_

### itemIds

▸ **itemIds**(): _Iterable<number>_

Defined in packages/libs/memstore/src/store/IdStore.ts:27

Returns an iterator for all of the items contained in this store

**Returns:** _Iterable<number>_

### notify

▸ **notify**(`storeId`: number, `attribute`: AttributeName, `value?`: unknown): _void_

Defined in packages/libs/memstore/src/store/IdStore.ts:76

Notifies the PrimitiveStore of an Attribute change externally

**Parameters:**

| Name        | Type          | Description                                                       |
| ----------- | ------------- | ----------------------------------------------------------------- |
| `storeId`   | number        | The store id                                                      |
| `attribute` | AttributeName | The attribute that changed                                        |
| `value?`    | unknown       | The optional value, if undefined, all the attributes have changed |

**Returns:** _void_

### onAddItem

▸ **onAddItem**(`handler`: AddRemoveItemHandler): _function_

Defined in packages/libs/memstore/src/store/IdStore.ts:40

Calls **handler** when an item has been added

**Parameters:**

| Name      | Type                 | Description            |
| --------- | -------------------- | ---------------------- |
| `handler` | AddRemoveItemHandler | The item added handler |

**Returns:** _function_

▸ (): _void_

### onAttributeUpdated

▸ **onAttributeUpdated**(`handler`: AttributeUpdatedHandler): _function_

Defined in packages/libs/memstore/src/store/IdStore.ts:34

Calls **handler** when an attribute is updated

**Parameters:**

| Name      | Type                    | Description                   |
| --------- | ----------------------- | ----------------------------- |
| `handler` | AttributeUpdatedHandler | The attribute updated handler |

**Returns:** _function_

▸ (): _void_

### onRemoveItem

▸ **onRemoveItem**(`handler`: AddRemoveItemHandler): _function_

Defined in packages/libs/memstore/src/store/IdStore.ts:46

Calls **handler** when an item has been removed

**Parameters:**

| Name      | Type                 | Description              |
| --------- | -------------------- | ------------------------ |
| `handler` | AddRemoveItemHandler | The item removed handler |

**Returns:** _function_

▸ (): _void_

### remove

▸ **remove**(`idx`: number): _void_

Defined in packages/libs/memstore/src/store/IdStore.ts:58

Removes the primitive with the given store id

**Parameters:**

| Name  | Type   |
| ----- | ------ |
| `idx` | number |

**Returns:** _void_

### reset

▸ **reset**(): _void_

Defined in packages/libs/memstore/src/store/IdStore.ts:63

Resets the Buffer back to the default state

**Returns:** _void_

---

### "store/SlotAllocator"

• **"store/SlotAllocator"**:

Defined in packages/libs/memstore/src/store/SlotAllocator.ts:1

### SlotAllocator

• **SlotAllocator**:

Defined in packages/libs/memstore/src/store/SlotAllocator.ts:10

A class for managing id allocation

### constructor

\+ **new SlotAllocator**(`capacity`: number, `consumed`: boolean): _SlotAllocator_

Defined in packages/libs/memstore/src/store/SlotAllocator.ts:14

Constructor for the SlotAllocator

**`throws`** If an invalid capacity is passed to the constructor

**Parameters:**

| Name       | Type    | Default          | Description                                  |
| ---------- | ------- | ---------------- | -------------------------------------------- |
| `capacity` | number  | DEFAULT_CAPACITY | The number of ids to support                 |
| `consumed` | boolean | false            | If true, the allocator is assumed to be full |

**Returns:** _SlotAllocator_

### `Private` availableIndices

• **availableIndices**: _Record<number, number | undefined>_

Defined in packages/libs/memstore/src/store/SlotAllocator.ts:11

### `Private` capacity

• **capacity**: _number_ = 0

Defined in packages/libs/memstore/src/store/SlotAllocator.ts:14

### `Private` nextAvailableIndex

• **nextAvailableIndex**: _number | undefined_

Defined in packages/libs/memstore/src/store/SlotAllocator.ts:12

### hasFreeSpace

• **hasFreeSpace**:

Defined in packages/libs/memstore/src/store/SlotAllocator.ts:74

Returns true if there are available ids

### usedCount

• **usedCount**:

Defined in packages/libs/memstore/src/store/SlotAllocator.ts:131

Returns the number of used indices

### alloc

▸ **alloc**(): _number_

Defined in packages/libs/memstore/src/store/SlotAllocator.ts:96

Allocates a new index

**`throws`** An error if there is no space available

**Returns:** _number_

### destroy

▸ **destroy**(): _void_

Defined in packages/libs/memstore/src/store/SlotAllocator.ts:138

Destroy's the allocator

**Returns:** _void_

### free

▸ **free**(`index`: number): _void_

Defined in packages/libs/memstore/src/store/SlotAllocator.ts:83

Frees **index** for re-use

**`throws`** An error for an invalid index

**Parameters:**

| Name    | Type   | Description       |
| ------- | ------ | ----------------- |
| `index` | number | The index to free |

**Returns:** _void_

### grow

▸ **grow**(`newCapacity`: number): _void_

Defined in packages/libs/memstore/src/store/SlotAllocator.ts:57

Grow the capacity of the slot allocator by **newCapacity**

**`throws`** If an invalid capacity is passed to the function

**Parameters:**

| Name          | Type   | Description                       |
| ------------- | ------ | --------------------------------- |
| `newCapacity` | number | The new capacity of the allocator |

**Returns:** _void_

### has

▸ **has**(`index`: number): _boolean_

Defined in packages/libs/memstore/src/store/SlotAllocator.ts:124

Returns true if the given index has been allocated

**Parameters:**

| Name    | Type   | Description        |
| ------- | ------ | ------------------ |
| `index` | number | The index to check |

**Returns:** _boolean_

### reset

▸ **reset**(`capacity`: number): _void_

Defined in packages/libs/memstore/src/store/SlotAllocator.ts:39

Resets the allocator back to the default state

**`throws`** If an invalid capacity is passed to the function

**Parameters:**

| Name       | Type   | Description                    |
| ---------- | ------ | ------------------------------ |
| `capacity` | number | The number of items to support |

**Returns:** _void_

### used

▸ **used**(): _Iterable<number>_

Defined in packages/libs/memstore/src/store/SlotAllocator.ts:112

Returns an iterator for the used slots

**Returns:** _Iterable<number>_

---

### "store/defaults"

• **"store/defaults"**:

Defined in packages/libs/memstore/src/store/defaults.ts:1

### `Const` DEFAULT_CAPACITY

• **DEFAULT_CAPACITY**: _10000_ = 10000

Defined in packages/libs/memstore/src/store/defaults.ts:5

### `Const` DEFAULT_SHARED

• **DEFAULT_SHARED**: _true_ = true

Defined in packages/libs/memstore/src/store/defaults.ts:10

The default shared value of our stores

---

### "store/index"

• **"store/index"**:

Defined in packages/libs/memstore/src/store/index.ts:1

### AddRemoveItemHandler

• **AddRemoveItemHandler**:

### ArrayStore

• **ArrayStore**:

### ArrayStoreImpl

• **ArrayStoreImpl**:

### AttributeUpdatedHandler

• **AttributeUpdatedHandler**:

### Detach

• **Detach**:

### IdStore

• **IdStore**:

### IdStoreImpl

• **IdStoreImpl**:

### SlotAllocator

• **SlotAllocator**:

### StoreConfig

• **StoreConfig**:

---

### "store/types"

• **"store/types"**:

Defined in packages/libs/memstore/src/store/types.ts:1

### StoreConfig

• **StoreConfig**:

Defined in packages/libs/memstore/src/store/types.ts:10

The configuration for the ArrayStore

### `Optional` allocatedOnCreate

• **allocatedOnCreate**? : _undefined | false | true_

Defined in packages/libs/memstore/src/store/types.ts:35

If true, on store creation, it is assumed that the buffer is full of item data

**`defaultvalue`** false

### `Optional` buffer

• **buffer**? : _ArrayBuffer_

Defined in packages/libs/memstore/src/store/types.ts:28

The array buffer to use

### capacity

• **capacity**: _number_

Defined in packages/libs/memstore/src/store/types.ts:16

The initial capacity of the store

**`defaultvalue`** 10000

### `Optional` notifications

• **notifications**? : _undefined | false | true_

Defined in packages/libs/memstore/src/store/types.ts:42

If true, notification events will be emitted

**`defaultvalue`** false

### shared

• **shared**: _boolean_

Defined in packages/libs/memstore/src/store/types.ts:23

If true, a SharedArrayBuffer will be used

**`defaultvalue`** true

### AddRemoveItemHandler

Ƭ **AddRemoveItemHandler**: _function_

Defined in packages/libs/memstore/src/store/types.ts:61

A handler for when an item has been remove or added

**`param`** The index of the item

#### Type declaration:

▸ (`index`: number): _void_

**Parameters:**

| Name    | Type   |
| ------- | ------ |
| `index` | number |

### AttributeUpdatedHandler

Ƭ **AttributeUpdatedHandler**: _function_

Defined in packages/libs/memstore/src/store/types.ts:51

A handler for when an attribute has been updated

**`param`** The index of the item

**`param`** The name of the attribute that was updated, if undefined, all attributes have been changed

**`param`** The new value of the attribute

#### Type declaration:

▸ (`index`: number, `attribute?`: AttributeName, `value?`: unknown): _void_

**Parameters:**

| Name         | Type          |
| ------------ | ------------- |
| `index`      | number        |
| `attribute?` | AttributeName |
| `value?`     | unknown       |

### Detach

Ƭ **Detach**: _function_

Defined in packages/libs/memstore/src/store/types.ts:66

A callback for detaching

#### Type declaration:

▸ (): _void_

---

### "util/endianness"

• **"util/endianness"**:

Defined in packages/libs/memstore/src/util/endianness.ts:1

### Endianness

• **Endianness**:

Defined in packages/libs/memstore/src/util/endianness.ts:5

### Big

• **Big**:

Defined in packages/libs/memstore/src/util/endianness.ts:7

### Little

• **Little**:

Defined in packages/libs/memstore/src/util/endianness.ts:6

### endianness

▸ **endianness**(): _Little | Big_

Defined in packages/libs/memstore/src/util/endianness.ts:14

Returns the endianness of the system

**Returns:** _Little | Big_

---

### "util/index"

• **"util/index"**:

Defined in packages/libs/memstore/src/util/index.ts:1

### Endianness

• **Endianness**:

### endianness

• **endianness**:
