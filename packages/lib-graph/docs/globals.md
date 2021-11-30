[@graspologic/graph](README.md) › [Globals](globals.md)

# @graspologic/graph

## Index

### Modules

- ["graph/GraphContainer"]()
- ["graph/index"]()
- ["graph/internGraph"]()
- ["graph/populateAdjacency"]()
- ["graph/types"]()
- ["helpers/index"]()
- ["helpers/rand"]()
- ["index"]()
- ["primitives/edge/impl/AnimatableEdgeImpl"]()
- ["primitives/edge/impl/EdgeImpl"]()
- ["primitives/edge/impl/index"]()
- ["primitives/edge/index"]()
- ["primitives/edge/layout"]()
- ["primitives/edge/store"]()
- ["primitives/edge/types"]()
- ["primitives/index"]()
- ["primitives/node/impl/AnimatableNodeImpl"]()
- ["primitives/node/impl/NodeImpl"]()
- ["primitives/node/impl/index"]()
- ["primitives/node/index"]()
- ["primitives/node/layout"]()
- ["primitives/node/store"]()
- ["primitives/node/types"]()
- ["primitives/types"]()
- ["space/QuadTree"]()
- ["space/index"]()
- ["space/measure"]()
- ["space/types"]()

## Modules

### "graph/GraphContainer"

• **"graph/GraphContainer"**:

Defined in graph/src/graph/GraphContainer.ts:1

### GraphContainer

• **GraphContainer**:

Defined in graph/src/graph/GraphContainer.ts:21

The datastructure which contains all the internal graph data required for the GraphRenderer

### `Private` \_adjacency

• **\_adjacency**: _AdjacencyMap | undefined_

Defined in graph/src/graph/GraphContainer.ts:32

### `Private` \_edges

• **\_edges**: _EdgeStore_

Defined in graph/src/graph/GraphContainer.ts:23

### `Private` \_indexToId

• **\_indexToId**: _Record<number, string>_

Defined in graph/src/graph/GraphContainer.ts:28

Maps an node index to an id

### `Private` \_nodes

• **\_nodes**: _NodeStore_

Defined in graph/src/graph/GraphContainer.ts:22

### `Private` \_originalAdjacency

• **\_originalAdjacency**: _AdjacencyMap | undefined_

Defined in graph/src/graph/GraphContainer.ts:31

### `Static` intern

▸ **intern**(`inputGraph`: InputGraph, `options`: InternGraphOptions): _GraphContainer_

Defined in graph/src/graph/GraphContainer.ts:83

Creates an instance of the GraphContainer using the given input graph

**Parameters:**

| Name         | Type               | Default                      | Description                                                                                                     |
| ------------ | ------------------ | ---------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `inputGraph` | InputGraph         | -                            | The pojo graph to intern                                                                                        |
| `options`    | InternGraphOptions | DEFAULT_INTERN_GRAPH_OPTIONS | The set of options controlling how the graph is interned, defaults to @see {@link DEFAULT_INTERN_GRAPH_OPTIONS} |

**Returns:** _GraphContainer_

The GraphContainer

---

### "graph/index"

• **"graph/index"**:

Defined in graph/src/graph/index.ts:1

### AdjacencyMap

• **AdjacencyMap**:

### EdgeWeight

• **EdgeWeight**:

### GraphContainer

• **GraphContainer**:

### InputEdge

• **InputEdge**:

### InputGraph

• **InputGraph**:

### InputNode

• **InputNode**:

### NodeId

• **NodeId**:

### NodeIndex

• **NodeIndex**:

### TransportGraph

• **TransportGraph**:

---

### "graph/internGraph"

• **"graph/internGraph"**:

Defined in graph/src/graph/internGraph.ts:1

### InternGraphOptions

• **InternGraphOptions**:

Defined in graph/src/graph/internGraph.ts:19

The set of graph options to intern a pojo graph into a GraphContainer

### `Optional` defaultEdgeWeight

• **defaultEdgeWeight**? : _undefined | number_

Defined in graph/src/graph/internGraph.ts:38

The default value to use when edge weights are not present.

**`defaultvalue`** 1

### `Optional` randomize

• **randomize**? : _[number, number, number, number]_

Defined in graph/src/graph/internGraph.ts:31

If present, randomizes non-existing node positions within the given range.
Arg=[minx, maxx, miny, maxy]

### `Optional` shareable

• **shareable**? : _undefined | false | true_

Defined in graph/src/graph/internGraph.ts:25

A flag indicating to use SharedArrayBuffer memory,

**`defaultvalue`** true

### `Const` DEFAULT_INTERN_GRAPH_OPTIONS

• **DEFAULT_INTERN_GRAPH_OPTIONS**: _object_ = Object.freeze({
defaultEdgeWeight: 1,
shareable: true,
})

Defined in graph/src/graph/internGraph.ts:41

#### Type declaration:

---

### "graph/populateAdjacency"

• **"graph/populateAdjacency"**:

Defined in graph/src/graph/populateAdjacency.ts:1

---

### "graph/types"

• **"graph/types"**:

Defined in graph/src/graph/types.ts:1

### InputEdge

• **InputEdge**:

Defined in graph/src/graph/types.ts:49

An unprocessed edge

### `Optional` color

• **color**? : _undefined | number_

Defined in graph/src/graph/types.ts:55

### `Optional` color2

• **color2**? : _undefined | number_

Defined in graph/src/graph/types.ts:58

### source

• **source**: _string_

Defined in graph/src/graph/types.ts:50

### `Optional` sourceColor

• **sourceColor**? : _undefined | number_

Defined in graph/src/graph/types.ts:56

### target

• **target**: _string_

Defined in graph/src/graph/types.ts:51

### `Optional` targetColor

• **targetColor**? : _undefined | number_

Defined in graph/src/graph/types.ts:59

### `Optional` weight

• **weight**? : _undefined | number_

Defined in graph/src/graph/types.ts:52

### InputGraph

• **InputGraph**:

Defined in graph/src/graph/types.ts:23

An unprocessed graph

### edges

• **edges**: _InputEdge[]_

Defined in graph/src/graph/types.ts:25

### nodes

• **nodes**: _InputNode[]_

Defined in graph/src/graph/types.ts:24

### InputNode

• **InputNode**:

Defined in graph/src/graph/types.ts:31

An unprocessed node

### `Optional` category

• **category**? : _undefined | number_

Defined in graph/src/graph/types.ts:36

### `Optional` color

• **color**? : _undefined | number_

Defined in graph/src/graph/types.ts:40

### `Optional` group

• **group**? : _undefined | string_

Defined in graph/src/graph/types.ts:38

### id

• **id**: _string_

Defined in graph/src/graph/types.ts:32

### `Optional` label

• **label**? : _undefined | string_

Defined in graph/src/graph/types.ts:37

### `Optional` radius

• **radius**? : _undefined | number_

Defined in graph/src/graph/types.ts:34

### `Optional` shape

• **shape**? : _Shape | "square" | "diamond" | "circle"_

Defined in graph/src/graph/types.ts:39

### `Optional` size

• **size**? : _undefined | number_

Defined in graph/src/graph/types.ts:33

### `Optional` weight

• **weight**? : _undefined | number_

Defined in graph/src/graph/types.ts:35

### `Optional` x

• **x**? : _undefined | number_

Defined in graph/src/graph/types.ts:41

### `Optional` y

• **y**? : _undefined | number_

Defined in graph/src/graph/types.ts:42

### `Optional` z

• **z**? : _undefined | number_

Defined in graph/src/graph/types.ts:43

### TransportGraph

• **TransportGraph**:

Defined in graph/src/graph/types.ts:15

A graph representation to use for worker-wire transport.
Workers should use sharedArrayBuffer to minimize serialization/deserialization

### edges

• **edges**: _ArrayBuffer_

Defined in graph/src/graph/types.ts:17

### nodes

• **nodes**: _ArrayBuffer_

Defined in graph/src/graph/types.ts:16

### AdjacencyMap

Ƭ **AdjacencyMap**: _Map<NodeIndex, Record<NodeIndex, EdgeWeight>>_

Defined in graph/src/graph/types.ts:67

A mapping between every node to the nodes it's connected to

### EdgeWeight

Ƭ **EdgeWeight**: _number_

Defined in graph/src/graph/types.ts:9

### NodeId

Ƭ **NodeId**: _string_

Defined in graph/src/graph/types.ts:7

### NodeIndex

Ƭ **NodeIndex**: _number_

Defined in graph/src/graph/types.ts:8

---

### "helpers/index"

• **"helpers/index"**:

Defined in graph/src/helpers/index.ts:1

### jiggle

• **jiggle**:

---

### "helpers/rand"

• **"helpers/rand"**:

Defined in graph/src/helpers/rand.ts:1

### jiggle

▸ **jiggle**(`factor`: number): _number_

Defined in graph/src/helpers/rand.ts:5

**Parameters:**

| Name     | Type   | Default  |
| -------- | ------ | -------- |
| `factor` | number | 0.000001 |

**Returns:** _number_

---

### "index"

• **"index"**:

Defined in graph/src/index.ts:1

### AdjacencyMap

• **AdjacencyMap**:

### AnimatableEdge

• **AnimatableEdge**:

### AnimatableEdgeImpl

• **AnimatableEdgeImpl**:

### AnimatableNode

• **AnimatableNode**:

### AnimatableNodeImpl

• **AnimatableNodeImpl**:

### ClassType

• **ClassType**:

### Edge

• **Edge**:

### EdgeImpl

• **EdgeImpl**:

### EdgeStore

• **EdgeStore**:

### EdgeStoreConfig

• **EdgeStoreConfig**:

### EdgeWeight

• **EdgeWeight**:

### GraphContainer

• **GraphContainer**:

### InputEdge

• **InputEdge**:

### InputGraph

• **InputGraph**:

### InputNode

• **InputNode**:

### Node

• **Node**:

### NodeId

• **NodeId**:

### NodeImpl

• **NodeImpl**:

### NodeIndex

• **NodeIndex**:

### NodeStore

• **NodeStore**:

### NodeStoreConfig

• **NodeStoreConfig**:

### Pos2D

• **Pos2D**:

### Pos3D

• **Pos3D**:

### Position

• **Position**:

### Shape

• **Shape**:

### TransportGraph

• **TransportGraph**:

### edgeType

• **edgeType**:

### jiggle

• **jiggle**:

### nodeType

• **nodeType**:

---

### "primitives/edge/impl/AnimatableEdgeImpl"

• **"primitives/edge/impl/AnimatableEdgeImpl"**:

Defined in graph/src/primitives/edge/impl/AnimatableEdgeImpl.ts:1

### `Const` AnimatableEdgeImpl

• **AnimatableEdgeImpl**: _ClassType<MemoryReader & Edge & AnimatableEdge>_ = AnimatableEdgeImplInternal

Defined in graph/src/primitives/edge/impl/AnimatableEdgeImpl.ts:75

An implementation of an Edge that has animation capabilities

---

### "primitives/edge/impl/EdgeImpl"

• **"primitives/edge/impl/EdgeImpl"**:

Defined in graph/src/primitives/edge/impl/EdgeImpl.ts:1

### `Const` EdgeImpl

• **EdgeImpl**: _ClassType<MemoryReader & Edge>_ = createReader<Edge>(
edgeType,
edgeMemoryLayout,
ADDITIONAL_EDGE_PROPS,
)

Defined in graph/src/primitives/edge/impl/EdgeImpl.ts:13

An implementation of an Edge

---

### "primitives/edge/impl/index"

• **"primitives/edge/impl/index"**:

Defined in graph/src/primitives/edge/impl/index.ts:1

### AnimatableEdgeImpl

• **AnimatableEdgeImpl**:

### EdgeImpl

• **EdgeImpl**:

---

### "primitives/edge/index"

• **"primitives/edge/index"**:

Defined in graph/src/primitives/edge/index.ts:1

### AnimatableEdge

• **AnimatableEdge**:

### AnimatableEdgeImpl

• **AnimatableEdgeImpl**:

### Edge

• **Edge**:

### EdgeImpl

• **EdgeImpl**:

### EdgeStore

• **EdgeStore**:

### EdgeStoreConfig

• **EdgeStoreConfig**:

### edgeType

• **edgeType**:

---

### "primitives/edge/layout"

• **"primitives/edge/layout"**:

Defined in graph/src/primitives/edge/layout.ts:1

### `Const` edgeType

• **edgeType**: _unique symbol_ = Symbol('@graspologic::edge')

Defined in graph/src/primitives/edge/layout.ts:10

The unique symbol for an edge

---

### "primitives/edge/store"

• **"primitives/edge/store"**:

Defined in graph/src/primitives/edge/store.ts:1

---

### "primitives/edge/types"

• **"primitives/edge/types"**:

Defined in graph/src/primitives/edge/types.ts:1

### AnimatableEdge

• **AnimatableEdge**:

Defined in graph/src/primitives/edge/types.ts:122

### animateSourcePosition

▸ **animateSourcePosition**(`position`: Pos3D | Pos2D, `duration?`: undefined | number): _void_

Defined in graph/src/primitives/edge/types.ts:128

Animates the source position to **position** over **duration**

**Parameters:**

| Name        | Type                    | Description                  |
| ----------- | ----------------------- | ---------------------------- |
| `position`  | Pos3D &#124; Pos2D      | The position to animate to   |
| `duration?` | undefined &#124; number | The duration to animate over |

**Returns:** _void_

### animateTargetPosition

▸ **animateTargetPosition**(`position`: Pos3D | Pos2D, `duration?`: undefined | number): _void_

Defined in graph/src/primitives/edge/types.ts:135

Animates the target position to **position** over **duration**

**Parameters:**

| Name        | Type                    | Description                  |
| ----------- | ----------------------- | ---------------------------- |
| `position`  | Pos3D &#124; Pos2D      | The position to animate to   |
| `duration?` | undefined &#124; number | The duration to animate over |

**Returns:** _void_

### Edge

• **Edge**:

Defined in graph/src/primitives/edge/types.ts:11

An interface representing an edge

### `Readonly` buffer

• **buffer**: _ArrayBuffer_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:26

The low-level buffer access to the memory

### byteOffset

• **byteOffset**: _number_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:46

The byte offset of the item in the store

### color

• **color**: _number_

Defined in graph/src/primitives/edge/types.ts:39

The source color in int32 hex format 0xAABBGGRR
For example, 0xFF00FF00 would be fully opaque green

**`defaultvalue`** 0xFF000000

### color2

• **color2**: _number_

Defined in graph/src/primitives/edge/types.ts:46

The target color in int32 hex format 0xAABBGGRR
For example, 0xFF00FF00 would be fully opaque green

**`defaultvalue`** 0xFF000000

### `Readonly` float32Array

• **float32Array**: _Float32Array_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:34

The low-level Float32Array view access to the memory

### id

• **id**: _string | undefined_

Defined in graph/src/primitives/edge/types.ts:15

The id of the edge

### `Readonly` layout

• **layout**: _MemoryLayout_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:14

The memory layout

### saturation

• **saturation**: _number_

Defined in graph/src/primitives/edge/types.ts:52

The source saturation, from 0 - 1

**`defaultvalue`** 1

### saturation2

• **saturation2**: _number_

Defined in graph/src/primitives/edge/types.ts:58

The target saturation, from 0 - 1

**`defaultvalue`** 1

### source

• **source**: _string | undefined_

Defined in graph/src/primitives/edge/types.ts:20

The source node id

### sourcePosition

• **sourcePosition**: _Pos2D | Pos3D_

Defined in graph/src/primitives/edge/types.ts:64

The source node position

**`defaultvalue`** [0, 0, 0]

### `Readonly` store

• **store**: _ReaderStore<any>_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:22

The underlying store

### target

• **target**: _string | undefined_

Defined in graph/src/primitives/edge/types.ts:25

The target node id

### targetPosition

• **targetPosition**: _Pos2D | Pos3D_

Defined in graph/src/primitives/edge/types.ts:70

The target node position

**`defaultvalue`** [0, 0, 0]

### `Readonly` type

• **type**: _symbol_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:18

The type of item

### `Readonly` uint32Array

• **uint32Array**: _Uint32Array_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:38

The low-level Uint32Array view access to the memory

### `Readonly` uint8Array

• **uint8Array**: _Uint8Array_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:30

The low-level Uint8Array view access to the memory

### weight

• **weight**: _number_

Defined in graph/src/primitives/edge/types.ts:32

The weight of the edge, from 0 - 1

**`defaultvalue`** 1

### wordOffset

• **wordOffset**: _number_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:50

The word offset of the item in the store

### connect

▸ **connect**(`storeId`: number, `store`: ReaderStore<any>): _void_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:56

Connects this reader to a store instance

**Parameters:**

| Name      | Type             | Description     |
| --------- | ---------------- | --------------- |
| `storeId` | number           | The new storeid |
| `store`   | ReaderStore<any> | Thes store      |

**Returns:** _void_

### EdgeStore

Ƭ **EdgeStore**: _ReaderStore<Edge>_

Defined in graph/src/primitives/edge/types.ts:120

The type for the edge store

### EdgeStoreConfig

Ƭ **EdgeStoreConfig**: _StoreConfig_

Defined in graph/src/primitives/edge/types.ts:141

The EdgeStore configuration options

---

### "primitives/index"

• **"primitives/index"**:

Defined in graph/src/primitives/index.ts:1

### AnimatableEdge

• **AnimatableEdge**:

### AnimatableEdgeImpl

• **AnimatableEdgeImpl**:

### AnimatableNode

• **AnimatableNode**:

### AnimatableNodeImpl

• **AnimatableNodeImpl**:

### ClassType

• **ClassType**:

### Edge

• **Edge**:

### EdgeImpl

• **EdgeImpl**:

### EdgeStore

• **EdgeStore**:

### EdgeStoreConfig

• **EdgeStoreConfig**:

### Node

• **Node**:

### NodeImpl

• **NodeImpl**:

### NodeStore

• **NodeStore**:

### NodeStoreConfig

• **NodeStoreConfig**:

### Pos2D

• **Pos2D**:

### Pos3D

• **Pos3D**:

### Shape

• **Shape**:

### edgeType

• **edgeType**:

### nodeType

• **nodeType**:

---

### "primitives/node/impl/AnimatableNodeImpl"

• **"primitives/node/impl/AnimatableNodeImpl"**:

Defined in graph/src/primitives/node/impl/AnimatableNodeImpl.ts:1

### `Const` AnimatableNodeImpl

• **AnimatableNodeImpl**: _ClassType<MemoryReader & Node & AnimatableNode>_ = AnimatableNodeImplInternal

Defined in graph/src/primitives/node/impl/AnimatableNodeImpl.ts:73

An implementation of a Node that has animation capabilities

---

### "primitives/node/impl/NodeImpl"

• **"primitives/node/impl/NodeImpl"**:

Defined in graph/src/primitives/node/impl/NodeImpl.ts:1

### `Const` NodeImpl

• **NodeImpl**: _ClassType<MemoryReader & Node>_ = createReader<Node>(
nodeType,
nodeMemoryLayout,
ADDITIONAL_NODE_PROPS,
)

Defined in graph/src/primitives/node/impl/NodeImpl.ts:13

An implementation of a Node

---

### "primitives/node/impl/index"

• **"primitives/node/impl/index"**:

Defined in graph/src/primitives/node/impl/index.ts:1

### AnimatableNodeImpl

• **AnimatableNodeImpl**:

### NodeImpl

• **NodeImpl**:

---

### "primitives/node/index"

• **"primitives/node/index"**:

Defined in graph/src/primitives/node/index.ts:1

### AnimatableNode

• **AnimatableNode**:

### AnimatableNodeImpl

• **AnimatableNodeImpl**:

### Node

• **Node**:

### NodeImpl

• **NodeImpl**:

### NodeStore

• **NodeStore**:

### NodeStoreConfig

• **NodeStoreConfig**:

### nodeType

• **nodeType**:

---

### "primitives/node/layout"

• **"primitives/node/layout"**:

Defined in graph/src/primitives/node/layout.ts:1

### `Const` nodeType

• **nodeType**: _unique symbol_ = Symbol('@graspologic::node')

Defined in graph/src/primitives/node/layout.ts:15

The unique symbol for a node

---

### "primitives/node/store"

• **"primitives/node/store"**:

Defined in graph/src/primitives/node/store.ts:1

---

### "primitives/node/types"

• **"primitives/node/types"**:

Defined in graph/src/primitives/node/types.ts:1

### AnimatableNode

• **AnimatableNode**:

Defined in graph/src/primitives/node/types.ts:195

An interface describing a Node that can be animated

### `Readonly` buffer

• **buffer**: _ArrayBuffer_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:26

The low-level buffer access to the memory

### byteOffset

• **byteOffset**: _number_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:46

The byte offset of the item in the store

### category

• **category**: _string | undefined_

_Inherited from void_

Defined in graph/src/primitives/node/types.ts:25

The category of a node, controls how it is colored

### color

• **color**: _number_

_Inherited from void_

Defined in graph/src/primitives/node/types.ts:62

Returns the color in int32 hex format 0xAABBGGRR
For example, 0xFF00FF00 would be fully opaque green

### community

• **community**: _number_

_Inherited from void_

Defined in graph/src/primitives/node/types.ts:54

The community number

### `Readonly` float32Array

• **float32Array**: _Float32Array_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:34

The low-level Float32Array view access to the memory

### group

• **group**: _string | undefined_

_Inherited from void_

Defined in graph/src/primitives/node/types.ts:20

The group of a node

### id

• **id**: _string | undefined_

_Inherited from void_

Defined in graph/src/primitives/node/types.ts:15

The id of the node

### label

• **label**: _string | undefined_

_Inherited from void_

Defined in graph/src/primitives/node/types.ts:30

The node label

### `Readonly` layout

• **layout**: _MemoryLayout_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:14

The memory layout

### position

• **position**: _Pos3D_

_Inherited from void_

Defined in graph/src/primitives/node/types.ts:70

The center position of the node

**`defaultvalue`** [0, 0, 0]

### radius

• **radius**: _number_

_Inherited from void_

Defined in graph/src/primitives/node/types.ts:42

The radius of a node based on. If **radius** is > 0 it will be used to size the nodes, otherwise **weight** will be used

**`defaultvalue`** 0

### saturation

• **saturation**: _number_

_Inherited from void_

Defined in graph/src/primitives/node/types.ts:95

The saturation of the node

**`defaultvalue`** 1

### shape

• **shape**: _Shape_

_Inherited from void_

Defined in graph/src/primitives/node/types.ts:101

The shape of the node

**`defaultvalue`** Shape.Circle

### size

• **size**: _number_

_Inherited from void_

Defined in graph/src/primitives/node/types.ts:49

The size of the node

**`alias`** radius

**`defaultvalue`** 0

### `Readonly` store

• **store**: _ReaderStore<any>_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:22

The underlying store

### `Readonly` type

• **type**: _symbol_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:18

The type of item

### `Readonly` uint32Array

• **uint32Array**: _Uint32Array_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:38

The low-level Uint32Array view access to the memory

### `Readonly` uint8Array

• **uint8Array**: _Uint8Array_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:30

The low-level Uint8Array view access to the memory

### weight

• **weight**: _number_

_Inherited from void_

Defined in graph/src/primitives/node/types.ts:36

The weight of a node, from 0 - 1

**`defaultvalue`** 1

### wordOffset

• **wordOffset**: _number_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:50

The word offset of the item in the store

### x

• **x**: _number_

_Inherited from void_

Defined in graph/src/primitives/node/types.ts:76

The x value of the node

**`defaultvalue`** 0

### y

• **y**: _number_

_Inherited from void_

Defined in graph/src/primitives/node/types.ts:82

The y value of the node

**`defaultvalue`** 0

### z

• **z**: _number_

_Inherited from void_

Defined in graph/src/primitives/node/types.ts:88

The z value of the node

**`defaultvalue`** 0

### animateColor

▸ **animateColor**(`color`: number, `duration?`: undefined | number): _void_

Defined in graph/src/primitives/node/types.ts:208

Animates the node to the given color over the duration

**Parameters:**

| Name        | Type                    | Description                  |
| ----------- | ----------------------- | ---------------------------- |
| `color`     | number                  | The color to animate to      |
| `duration?` | undefined &#124; number | The duration to animate over |

**Returns:** _void_

### animatePosition

▸ **animatePosition**(`position`: Pos3D | Pos2D, `duration?`: undefined | number): _void_

Defined in graph/src/primitives/node/types.ts:201

Animates the node to the given position over the duration

**Parameters:**

| Name        | Type                    | Description                  |
| ----------- | ----------------------- | ---------------------------- |
| `position`  | Pos3D &#124; Pos2D      | The position to animate to   |
| `duration?` | undefined &#124; number | The duration to animate over |

**Returns:** _void_

### connect

▸ **connect**(`storeId`: number, `store`: ReaderStore<any>): _void_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:56

Connects this reader to a store instance

**Parameters:**

| Name      | Type             | Description     |
| --------- | ---------------- | --------------- |
| `storeId` | number           | The new storeid |
| `store`   | ReaderStore<any> | Thes store      |

**Returns:** _void_

### Node

• **Node**:

Defined in graph/src/primitives/node/types.ts:11

An interface representing a node

### `Readonly` buffer

• **buffer**: _ArrayBuffer_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:26

The low-level buffer access to the memory

### byteOffset

• **byteOffset**: _number_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:46

The byte offset of the item in the store

### category

• **category**: _string | undefined_

Defined in graph/src/primitives/node/types.ts:25

The category of a node, controls how it is colored

### color

• **color**: _number_

Defined in graph/src/primitives/node/types.ts:62

Returns the color in int32 hex format 0xAABBGGRR
For example, 0xFF00FF00 would be fully opaque green

### community

• **community**: _number_

Defined in graph/src/primitives/node/types.ts:54

The community number

### `Readonly` float32Array

• **float32Array**: _Float32Array_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:34

The low-level Float32Array view access to the memory

### group

• **group**: _string | undefined_

Defined in graph/src/primitives/node/types.ts:20

The group of a node

### id

• **id**: _string | undefined_

Defined in graph/src/primitives/node/types.ts:15

The id of the node

### label

• **label**: _string | undefined_

Defined in graph/src/primitives/node/types.ts:30

The node label

### `Readonly` layout

• **layout**: _MemoryLayout_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:14

The memory layout

### position

• **position**: _Pos3D_

Defined in graph/src/primitives/node/types.ts:70

The center position of the node

**`defaultvalue`** [0, 0, 0]

### radius

• **radius**: _number_

Defined in graph/src/primitives/node/types.ts:42

The radius of a node based on. If **radius** is > 0 it will be used to size the nodes, otherwise **weight** will be used

**`defaultvalue`** 0

### saturation

• **saturation**: _number_

Defined in graph/src/primitives/node/types.ts:95

The saturation of the node

**`defaultvalue`** 1

### shape

• **shape**: _Shape_

Defined in graph/src/primitives/node/types.ts:101

The shape of the node

**`defaultvalue`** Shape.Circle

### size

• **size**: _number_

Defined in graph/src/primitives/node/types.ts:49

The size of the node

**`alias`** radius

**`defaultvalue`** 0

### `Readonly` store

• **store**: _ReaderStore<any>_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:22

The underlying store

### `Readonly` type

• **type**: _symbol_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:18

The type of item

### `Readonly` uint32Array

• **uint32Array**: _Uint32Array_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:38

The low-level Uint32Array view access to the memory

### `Readonly` uint8Array

• **uint8Array**: _Uint8Array_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:30

The low-level Uint8Array view access to the memory

### weight

• **weight**: _number_

Defined in graph/src/primitives/node/types.ts:36

The weight of a node, from 0 - 1

**`defaultvalue`** 1

### wordOffset

• **wordOffset**: _number_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:50

The word offset of the item in the store

### x

• **x**: _number_

Defined in graph/src/primitives/node/types.ts:76

The x value of the node

**`defaultvalue`** 0

### y

• **y**: _number_

Defined in graph/src/primitives/node/types.ts:82

The y value of the node

**`defaultvalue`** 0

### z

• **z**: _number_

Defined in graph/src/primitives/node/types.ts:88

The z value of the node

**`defaultvalue`** 0

### connect

▸ **connect**(`storeId`: number, `store`: ReaderStore<any>): _void_

_Inherited from void_

Defined in memstore/lib/reader/types.d.ts:56

Connects this reader to a store instance

**Parameters:**

| Name      | Type             | Description     |
| --------- | ---------------- | --------------- |
| `storeId` | number           | The new storeid |
| `store`   | ReaderStore<any> | Thes store      |

**Returns:** _void_

### NodeStore

Ƭ **NodeStore**: _ReaderStore<Node>_

Defined in graph/src/primitives/node/types.ts:185

The type representing a NodeStore

### NodeStoreConfig

Ƭ **NodeStoreConfig**: _StoreConfig_

Defined in graph/src/primitives/node/types.ts:190

The NodeStore configuration options

---

### "primitives/types"

• **"primitives/types"**:

Defined in graph/src/primitives/types.ts:1

### Shape

• **Shape**:

Defined in graph/src/primitives/types.ts:15

The shape of an object

### Circle

• **Circle**: = 0

Defined in graph/src/primitives/types.ts:16

### Diamond

• **Diamond**: = 2

Defined in graph/src/primitives/types.ts:18

### Square

• **Square**: = 1

Defined in graph/src/primitives/types.ts:17

### ClassType

• **ClassType**:

Defined in graph/src/primitives/types.ts:24

A generic interface which represents a ClassType

### constructor

\+ **new ClassType**(...`args`: any[]): _T_

Defined in graph/src/primitives/types.ts:24

**Parameters:**

| Name      | Type  |
| --------- | ----- |
| `...args` | any[] |

**Returns:** _T_

### Pos2D

Ƭ **Pos2D**: _[number, number]_

Defined in graph/src/primitives/types.ts:10

A 2D point array

### Pos3D

Ƭ **Pos3D**: _[number, number, number]_

Defined in graph/src/primitives/types.ts:5

---

### "space/QuadTree"

• **"space/QuadTree"**:

Defined in graph/src/space/QuadTree.ts:1

---

### "space/index"

• **"space/index"**:

Defined in graph/src/space/index.ts:1

### Position

• **Position**:

---

### "space/measure"

• **"space/measure"**:

Defined in graph/src/space/measure.ts:1

---

### "space/types"

• **"space/types"**:

Defined in graph/src/space/types.ts:1

### Position

• **Position**:

Defined in graph/src/space/types.ts:5

### x

• **x**: _number_

Defined in graph/src/space/types.ts:6

### y

• **y**: _number_

Defined in graph/src/space/types.ts:7
