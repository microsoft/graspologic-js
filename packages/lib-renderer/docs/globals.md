[@graspologic/renderer](README.md) › [Globals](globals.md)

# @graspologic/renderer

## Index

### Modules

- ["RenderConfiguration"]()
- ["data/glTypeMappings"]()
- ["data/index"]()
- ["data/processGraph"]()
- ["data/util/index"]()
- ["data/util/processMinMax"]()
- ["defaults"]()
- ["events/enableClickEvents"]()
- ["events/enablePanZoomEvents"]()
- ["events/index"]()
- ["index"]()
- ["renderables/AxesRenderable"]()
- ["renderables/LabelRenderable"]()
- ["renderables/Renderables"]()
- ["renderables/ScreenQuadRenderable"]()
- ["renderables/VertexLabelRenderable"]()
- ["renderables/VertexSetLabelRenderable"]()
- ["renderables/VertexSetRenderable"]()
- ["renderables/edges/EdgesRenderable"]()
- ["renderables/edges/index"]()
- ["renderables/edges/model"]()
- ["renderables/index"]()
- ["renderables/nodes/NodesRenderable"]()
- ["renderables/nodes/index"]()
- ["renderables/nodes/model"]()
- ["renderables/shaders/modules/easings/index"]()
- ["renderables/shaders/modules/index"]()
- ["renderables/shaders/modules/tween/index"]()
- ["renderer/WebGLGraphRenderer"]()
- ["renderer/delegates/Interpolator"]()
- ["renderer/delegates/Scenegraph"]()
- ["renderer/delegates/TypeStore"]()
- ["renderer/delegates/camera/Camera"]()
- ["renderer/delegates/camera/CameraState"]()
- ["renderer/delegates/camera/TransitioningCameraState"]()
- ["renderer/delegates/camera/computeState"]()
- ["renderer/delegates/camera/index"]()
- ["renderer/delegates/index"]()
- ["renderer/delegates/stores"]()
- ["renderer/index"]()
- ["types/camera"]()
- ["types/data"]()
- ["types/graph/graphData"]()
- ["types/graph/index"]()
- ["types/graph/renderer"]()
- ["types/graph/scene"]()
- ["types/index"]()
- ["types/internal/index"]()
- ["types/internal/primitives"]()
- ["types/internal/renderables"]()
- ["types/internal/scene"]()
- ["util/Properties"]()
- ["util/adaptMemoryLayoutToLuma"]()
- ["util/colorizeRenderer"]()
- ["util/equality"]()
- ["util/fastDebounce"]()
- ["util/getColor"]()
- ["util/ids"]()
- ["util/index"]()
- ["util/lerp3"]()
- ["util/slerp"]()

## Modules

### "RenderConfiguration"

• **"RenderConfiguration"**:

Defined in renderer/src/RenderConfiguration.ts:1

---

### "data/glTypeMappings"

• **"data/glTypeMappings"**:

Defined in renderer/src/data/glTypeMappings.ts:1

---

### "data/index"

• **"data/index"**:

Defined in renderer/src/data/index.ts:1

---

### "data/processGraph"

• **"data/processGraph"**:

Defined in renderer/src/data/processGraph.ts:1

---

### "data/util/index"

• **"data/util/index"**:

Defined in renderer/src/data/util/index.ts:1

### processMinMax

• **processMinMax**:

### processMinMaxBounds

• **processMinMaxBounds**:

---

### "data/util/processMinMax"

• **"data/util/processMinMax"**:

Defined in renderer/src/data/util/processMinMax.ts:1

### processMinMax

▸ **processMinMax**(`bounds`: Bounds3D, `x`: number, `y`: number, `z`: number): _void_

Defined in renderer/src/data/util/processMinMax.ts:14

Updates the given bounds based on the new x, y, z values

**Parameters:**

| Name     | Type     | Description           |
| -------- | -------- | --------------------- |
| `bounds` | Bounds3D | The current bounds    |
| `x`      | number   | The new x to be added |
| `y`      | number   | The new y to be added |
| `z`      | number   | The new z to be added |

**Returns:** _void_

### processMinMaxBounds

▸ **processMinMaxBounds**(`target`: Bounds3D, `newBounds`: Bounds3D): _void_

Defined in renderer/src/data/util/processMinMax.ts:35

Updates the given bounds based on the new bounds

**Parameters:**

| Name        | Type     | Description        |
| ----------- | -------- | ------------------ |
| `target`    | Bounds3D | The current bounds |
| `newBounds` | Bounds3D | The new bounds     |

**Returns:** _void_

---

### "defaults"

• **"defaults"**:

Defined in renderer/src/defaults.ts:1

### `Const` DEFAULT_AUTO_BIND

• **DEFAULT_AUTO_BIND**: _true_ = true

Defined in renderer/src/defaults.ts:44

### `Const` DEFAULT_BG_COLOR

• **DEFAULT_BG_COLOR**: _ColorVector_ = [0, 0, 0, 0]

Defined in renderer/src/defaults.ts:8

### `Const` DEFAULT_CAMERA_MODE

• **DEFAULT_CAMERA_MODE**: _Graph_ = CameraAdjustmentMode.Graph

Defined in renderer/src/defaults.ts:43

### `Const` DEFAULT_CORNER_AXES

• **DEFAULT_CORNER_AXES**: _true_ = true

Defined in renderer/src/defaults.ts:23

### `Const` DEFAULT_DRAW_AXES

• **DEFAULT_DRAW_AXES**: _true_ = true

Defined in renderer/src/defaults.ts:22

### `Const` DEFAULT_DRAW_EDGES

• **DEFAULT_DRAW_EDGES**: _true_ = true

Defined in renderer/src/defaults.ts:9

### `Const` DEFAULT_DRAW_NODES

• **DEFAULT_DRAW_NODES**: _true_ = true

Defined in renderer/src/defaults.ts:11

### `Const` DEFAULT_EDGE_ALPHA

• **DEFAULT_EDGE_ALPHA**: _0.15_ = 0.15

Defined in renderer/src/defaults.ts:27

### `Const` DEFAULT_EDGE_ANTIALIAS

• **DEFAULT_EDGE_ANTIALIAS**: _false_ = false

Defined in renderer/src/defaults.ts:26

### `Const` DEFAULT_EDGE_CONSTANT_WIDTH

• **DEFAULT_EDGE_CONSTANT_WIDTH**: _true_ = true

Defined in renderer/src/defaults.ts:24

### `Const` DEFAULT_EDGE_COUNT_HINT

• **DEFAULT_EDGE_COUNT_HINT**: _10000_ = 10000

Defined in renderer/src/defaults.ts:38

### `Const` DEFAULT_EDGE_DEPTH_WRITE

• **DEFAULT_EDGE_DEPTH_WRITE**: _false_ = false

Defined in renderer/src/defaults.ts:25

### `Const` DEFAULT_EDGE_FILTERED_IN_SATURATION

• **DEFAULT_EDGE_FILTERED_IN_SATURATION**: _1_ = 1

Defined in renderer/src/defaults.ts:31

### `Const` DEFAULT_EDGE_FILTERED_OUT_SATURATION

• **DEFAULT_EDGE_FILTERED_OUT_SATURATION**: _0.1_ = 0.1

Defined in renderer/src/defaults.ts:30

### `Const` DEFAULT_EDGE_MAX_WIDTH

• **DEFAULT_EDGE_MAX_WIDTH**: _2_ = 2

Defined in renderer/src/defaults.ts:29

### `Const` DEFAULT_EDGE_MIN_WIDTH

• **DEFAULT_EDGE_MIN_WIDTH**: _1_ = 1

Defined in renderer/src/defaults.ts:28

### `Const` DEFAULT_HEIGHT

• **DEFAULT_HEIGHT**: _500_ = 500

Defined in renderer/src/defaults.ts:40

### `Const` DEFAULT_HIDE_DESELECTED

• **DEFAULT_HIDE_DESELECTED**: _false_ = false

Defined in renderer/src/defaults.ts:13

### `Const` DEFAULT_HIDE_EDGES_ON_MOVE

• **DEFAULT_HIDE_EDGES_ON_MOVE**: _false_ = false

Defined in renderer/src/defaults.ts:10

### `Const` DEFAULT_HIDE_NODES_ON_MOVE

• **DEFAULT_HIDE_NODES_ON_MOVE**: _false_ = false

Defined in renderer/src/defaults.ts:12

### `Const` DEFAULT_HOVER_HIGHLIGHT_COLOR

• **DEFAULT_HOVER_HIGHLIGHT_COLOR**: _ColorVector_ = [
160 / 255,
240 / 255,
255 / 255,
207 / 255,
]

Defined in renderer/src/defaults.ts:16

### `Const` DEFAULT_INTERPOLATION_TIME

• **DEFAULT_INTERPOLATION_TIME**: _1000_ = 1000

Defined in renderer/src/defaults.ts:15

### `Const` DEFAULT_IS_3D

• **DEFAULT_IS_3D**: _false_ = false

Defined in renderer/src/defaults.ts:14

### `Const` DEFAULT_NODE_COUNT_HINT

• **DEFAULT_NODE_COUNT_HINT**: _10000_ = 10000

Defined in renderer/src/defaults.ts:37

### `Const` DEFAULT_NODE_FILTERED_IN_SATURATION

• **DEFAULT_NODE_FILTERED_IN_SATURATION**: _1_ = 1

Defined in renderer/src/defaults.ts:36

### `Const` DEFAULT_NODE_FILTERED_OUT_SATURATION

• **DEFAULT_NODE_FILTERED_OUT_SATURATION**: _0.1_ = 0.1

Defined in renderer/src/defaults.ts:35

### `Const` DEFAULT_NODE_MAX_RADIUS

• **DEFAULT_NODE_MAX_RADIUS**: _8_ = 8

Defined in renderer/src/defaults.ts:33

### `Const` DEFAULT_NODE_MIN_RADIUS

• **DEFAULT_NODE_MIN_RADIUS**: _4_ = 4

Defined in renderer/src/defaults.ts:32

### `Const` DEFAULT_NODE_OUTLINE

• **DEFAULT_NODE_OUTLINE**: _true_ = true

Defined in renderer/src/defaults.ts:34

### `Const` DEFAULT_SCALE_VIEW_ON_INIT

• **DEFAULT_SCALE_VIEW_ON_INIT**: _true_ = true

Defined in renderer/src/defaults.ts:42

### `Const` DEFAULT_USE_DEVICE_PIXELS

• **DEFAULT_USE_DEVICE_PIXELS**: _number | false | true_ = true as boolean | number

Defined in renderer/src/defaults.ts:41

### `Const` DEFAULT_WIDTH

• **DEFAULT_WIDTH**: _500_ = 500

Defined in renderer/src/defaults.ts:39

---

### "events/enableClickEvents"

• **"events/enableClickEvents"**:

Defined in renderer/src/events/enableClickEvents.ts:1

### enableClickEvents

▸ **enableClickEvents**(`renderer`: GraphRenderer): _Disconnect_

Defined in renderer/src/events/enableClickEvents.ts:15

Enables click events on the given graph renderer

**Parameters:**

| Name       | Type          | Description        |
| ---------- | ------------- | ------------------ |
| `renderer` | GraphRenderer | The graph renderer |

**Returns:** _Disconnect_

A disconnect function

---

### "events/enablePanZoomEvents"

• **"events/enablePanZoomEvents"**:

Defined in renderer/src/events/enablePanZoomEvents.ts:1

### EnablePanZoomEventOptions

• **EnablePanZoomEventOptions**:

Defined in renderer/src/events/enablePanZoomEvents.ts:13

### zoomToGraph

• **zoomToGraph**: _boolean_

Defined in renderer/src/events/enablePanZoomEvents.ts:19

Enable the zoom to graph operation

**`defaultvalue`** true

### enablePanZoomEvents

▸ **enablePanZoomEvents**(`renderer`: GraphRenderer, `options`: Partial<EnablePanZoomEventOptions>): _Disconnect_

Defined in renderer/src/events/enablePanZoomEvents.ts:31

Enables pan & zoom events on the given graph renderer

**Parameters:**

| Name       | Type                               | Default         | Description        |
| ---------- | ---------------------------------- | --------------- | ------------------ |
| `renderer` | GraphRenderer                      | -               | The graph renderer |
| `options`  | Partial<EnablePanZoomEventOptions> | DEFAULT_OPTIONS | -                  |

**Returns:** _Disconnect_

A disconnect function

---

### "events/index"

• **"events/index"**:

Defined in renderer/src/events/index.ts:1

### EnablePanZoomEventOptions

• **EnablePanZoomEventOptions**:

### enableClickEvents

• **enableClickEvents**:

### enablePanZoomEvents

• **enablePanZoomEvents**:

---

### "index"

• **"index"**:

Defined in renderer/src/index.ts:1

### AxesRenderable

• **AxesRenderable**:

### Bounds

• **Bounds**:

### Bounds2D

• **Bounds2D**:

### Bounds3D

• **Bounds3D**:

### CameraAdjustmentMode

• **CameraAdjustmentMode**:

### ColorVector

• **ColorVector**:

### Colorizer

• **Colorizer**:

### CompositeDataboundRenderable

• **CompositeDataboundRenderable**:

### DEFAULT_AUTO_BIND

• **DEFAULT_AUTO_BIND**:

### DEFAULT_BG_COLOR

• **DEFAULT_BG_COLOR**:

### DEFAULT_CAMERA_MODE

• **DEFAULT_CAMERA_MODE**:

### DEFAULT_CORNER_AXES

• **DEFAULT_CORNER_AXES**:

### DEFAULT_DRAW_AXES

• **DEFAULT_DRAW_AXES**:

### DEFAULT_DRAW_EDGES

• **DEFAULT_DRAW_EDGES**:

### DEFAULT_DRAW_NODES

• **DEFAULT_DRAW_NODES**:

### DEFAULT_EDGE_ALPHA

• **DEFAULT_EDGE_ALPHA**:

### DEFAULT_EDGE_ANTIALIAS

• **DEFAULT_EDGE_ANTIALIAS**:

### DEFAULT_EDGE_CONSTANT_WIDTH

• **DEFAULT_EDGE_CONSTANT_WIDTH**:

### DEFAULT_EDGE_COUNT_HINT

• **DEFAULT_EDGE_COUNT_HINT**:

### DEFAULT_EDGE_DEPTH_WRITE

• **DEFAULT_EDGE_DEPTH_WRITE**:

### DEFAULT_EDGE_FILTERED_IN_SATURATION

• **DEFAULT_EDGE_FILTERED_IN_SATURATION**:

### DEFAULT_EDGE_FILTERED_OUT_SATURATION

• **DEFAULT_EDGE_FILTERED_OUT_SATURATION**:

### DEFAULT_EDGE_MAX_WIDTH

• **DEFAULT_EDGE_MAX_WIDTH**:

### DEFAULT_EDGE_MIN_WIDTH

• **DEFAULT_EDGE_MIN_WIDTH**:

### DEFAULT_HEIGHT

• **DEFAULT_HEIGHT**:

### DEFAULT_HIDE_DESELECTED

• **DEFAULT_HIDE_DESELECTED**:

### DEFAULT_HIDE_EDGES_ON_MOVE

• **DEFAULT_HIDE_EDGES_ON_MOVE**:

### DEFAULT_HIDE_NODES_ON_MOVE

• **DEFAULT_HIDE_NODES_ON_MOVE**:

### DEFAULT_HOVER_HIGHLIGHT_COLOR

• **DEFAULT_HOVER_HIGHLIGHT_COLOR**:

### DEFAULT_INTERPOLATION_TIME

• **DEFAULT_INTERPOLATION_TIME**:

### DEFAULT_IS_3D

• **DEFAULT_IS_3D**:

### DEFAULT_NODE_COUNT_HINT

• **DEFAULT_NODE_COUNT_HINT**:

### DEFAULT_NODE_FILTERED_IN_SATURATION

• **DEFAULT_NODE_FILTERED_IN_SATURATION**:

### DEFAULT_NODE_FILTERED_OUT_SATURATION

• **DEFAULT_NODE_FILTERED_OUT_SATURATION**:

### DEFAULT_NODE_MAX_RADIUS

• **DEFAULT_NODE_MAX_RADIUS**:

### DEFAULT_NODE_MIN_RADIUS

• **DEFAULT_NODE_MIN_RADIUS**:

### DEFAULT_NODE_OUTLINE

• **DEFAULT_NODE_OUTLINE**:

### DEFAULT_SCALE_VIEW_ON_INIT

• **DEFAULT_SCALE_VIEW_ON_INIT**:

### DEFAULT_USE_DEVICE_PIXELS

• **DEFAULT_USE_DEVICE_PIXELS**:

### DEFAULT_WIDTH

• **DEFAULT_WIDTH**:

### DataStore

• **DataStore**:

### DataboundRenderable

• **DataboundRenderable**:

### DirtyableRenderable

• **DirtyableRenderable**:

### Disconnect

• **Disconnect**:

### EdgesRenderable

• **EdgesRenderable**:

### EnablePanZoomEventOptions

• **EnablePanZoomEventOptions**:

### GraphRenderer

• **GraphRenderer**:

### InitializeHandler

• **InitializeHandler**:

### LAYOUT

• **LAYOUT**:

### LAYOUT_STRIDE

• **LAYOUT_STRIDE**:

### LabelRenderable

• **LabelRenderable**:

### NodesRenderable

• **NodesRenderable**:

### NumberRange

• **NumberRange**:

### POSITION_OFFSET

• **POSITION_OFFSET**:

### Point3D

• **Point3D**:

### Position

• **Position**:

### PositionMap

• **PositionMap**:

### Primitive

• **Primitive**:

### PrimitivesChangedHandler

• **PrimitivesChangedHandler**:

### PropertyChangeHandler

• **PropertyChangeHandler**:

### PropertyChangeValidator

• **PropertyChangeValidator**:

### RADIUS_OFFSET

• **RADIUS_OFFSET**:

### RegisterHandler

• **RegisterHandler**:

### RenderConfiguration

• **RenderConfiguration**:

### RenderConfigurationOptions

• **RenderConfigurationOptions**:

### RenderOptions

• **RenderOptions**:

### Renderable

• **Renderable**:

### SHAPE_OFFSET

• **SHAPE_OFFSET**:

### Scene

• **Scene**:

### TypeStore

• **TypeStore**:

### UsesWebGL

• **UsesWebGL**:

### VertexLabelRenderable

• **VertexLabelRenderable**:

### VertexSetLabelRenderable

• **VertexSetLabelRenderable**:

### VertexSetRenderable

• **VertexSetRenderable**:

### VisualDimensions

• **VisualDimensions**:

### WEIGHT_OFFSET

• **WEIGHT_OFFSET**:

### WebGLGraphRenderer

• **WebGLGraphRenderer**:

### areColorsEqual

• **areColorsEqual**:

### colorizeRenderer

• **colorizeRenderer**:

### createIdFactory

• **createIdFactory**:

### enableClickEvents

• **enableClickEvents**:

### enablePanZoomEvents

• **enablePanZoomEvents**:

### fastDebounce

• **fastDebounce**:

### getColor

• **getColor**:

### lerp3

• **lerp3**:

### position

• **position**:

### radius

• **radius**:

### shape

• **shape**:

### slerp

• **slerp**:

### visible

• **visible**:

### weight

• **weight**:

---

### "renderables/AxesRenderable"

• **"renderables/AxesRenderable"**:

Defined in renderer/src/renderables/AxesRenderable.ts:1

### AxesRenderable

• **AxesRenderable**:

Defined in renderer/src/renderables/AxesRenderable.ts:24

A renderable that can be added to a GraphRenderer to render a set of Axes on the graph

### constructor

\+ **new AxesRenderable**(`gl`: WebGLRenderingContext, `config`: RenderConfiguration): _AxesRenderable_

_Overrides void_

Defined in renderer/src/renderables/AxesRenderable.ts:25

Constructor

**Parameters:**

| Name     | Type                  | Description                          |
| -------- | --------------------- | ------------------------------------ |
| `gl`     | WebGLRenderingContext | The gl context to render the axes to |
| `config` | RenderConfiguration   | The render configuration             |

**Returns:** _AxesRenderable_

### `Protected` \_needsRedraw

• **\_needsRedraw**: _boolean_ = false

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:12

### `Protected` config

• **config**: _RenderConfiguration_

_Inherited from void_

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:51

The render configuration

### `Protected` height

• **height**: _number_ = DEFAULT_HEIGHT

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:15

### `Private` `Optional` projection

• **projection**? : _Matrix4_

Defined in renderer/src/renderables/AxesRenderable.ts:25

### `Protected` width

• **width**: _number_ = DEFAULT_WIDTH

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:14

### data

• **data**:

_Inherited from void_

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:86

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:93

The edge data that should be rendered
Sets the edge data to be rendered

### `Protected` edgeAlpha

• **edgeAlpha**:

_Overrides void_

Defined in renderer/src/renderables/AxesRenderable.ts:69

Gets the alpha used to render the edges

### `Protected` edgeAntialias

• **edgeAntialias**:

_Overrides void_

Defined in renderer/src/renderables/AxesRenderable.ts:62

Gets whether or not the edges are antialiased

### `Protected` edgeConstantWidth

• **edgeConstantWidth**:

_Overrides void_

Defined in renderer/src/renderables/AxesRenderable.ts:76

Gets whether or not the edges should be rendered with a constant width

### `Protected` edgeDepthWrite

• **edgeDepthWrite**:

_Inherited from void_

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:109

Returns true if edges behind other edges should not be rendered

### `Protected` edgeMaxWidth

• **edgeMaxWidth**:

_Overrides void_

Defined in renderer/src/renderables/AxesRenderable.ts:55

Gets the maxiumum width of an edge

### `Protected` edgeMinWidth

• **edgeMinWidth**:

_Inherited from void_

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:123

Returns the min edge with

### enabled

• **enabled**:

_Implementation of void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:39

Defined in renderer/src/renderables/Renderables.ts:46

Gets whether or not the renderable is enabled
Sets whether or not the renderable is enabled

### needsRedraw

• **needsRedraw**:

_Implementation of void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:32

Gets whether or not the renderable needs to be redrawn

### bindDataToModel

▸ **bindDataToModel**(`forceAll`: boolean): _boolean_

_Inherited from void_

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:343

Binds the data in our databuffer to the model

**Parameters:**

| Name       | Type    | Default | Description                        |
| ---------- | ------- | ------- | ---------------------------------- |
| `forceAll` | boolean | false   | Force all the attributes to return |

**Returns:** _boolean_

### computeDomain

▸ **computeDomain**(): _Bounds3D | undefined_

_Inherited from void_

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:195

Computes the bounds of the edges

**Returns:** _Bounds3D | undefined_

### draw

▸ **draw**(`options`: RenderOptions): _void_

_Implementation of void_

_Overrides void_

Defined in renderer/src/renderables/AxesRenderable.ts:84

Renders the axes renderable

**Parameters:**

| Name      | Type          | Description               |
| --------- | ------------- | ------------------------- |
| `options` | RenderOptions | The set of render options |

**Returns:** _void_

### `Private` generateEdges

▸ **generateEdges**(): _void_

Defined in renderer/src/renderables/AxesRenderable.ts:110

Generates the set of edges used as our axes

**Returns:** _void_

### `Protected` handleEdgeAdded

▸ **handleEdgeAdded**(`edgeOrIndex`: number | Edge): _void_

_Inherited from void_

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:249

Handler for when a node is added

**Parameters:**

| Name          | Type               |
| ------------- | ------------------ |
| `edgeOrIndex` | number &#124; Edge |

**Returns:** _void_

### `Protected` handleEdgeAttributeUpdated

▸ **handleEdgeAttributeUpdated**(`storeId`: number, `attribute?`: undefined | string, `value?`: any): _void_

_Inherited from void_

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:283

Handles when an edges attribute is updated

**Parameters:**

| Name         | Type                    |
| ------------ | ----------------------- |
| `storeId`    | number                  |
| `attribute?` | undefined &#124; string |
| `value?`     | any                     |

**Returns:** _void_

### `Protected` handleEdgeRemoved

▸ **handleEdgeRemoved**(`edgeOrIndex`: number | Edge): _void_

_Inherited from void_

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:268

Removes a primitive from the scene

**Parameters:**

| Name          | Type               |
| ------------- | ------------------ |
| `edgeOrIndex` | number &#124; Edge |

**Returns:** _void_

### `Protected` makeDirtyHandler

▸ **makeDirtyHandler**(): _void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:17

**Returns:** _void_

### resize

▸ **resize**(`width`: number, `height`: number): _void_

_Implementation of void_

_Overrides void_

Defined in renderer/src/renderables/AxesRenderable.ts:46

Resizes the axes renderable

**Parameters:**

| Name     | Type   | Description       |
| -------- | ------ | ----------------- |
| `width`  | number | The render width  |
| `height` | number | The render height |

**Returns:** _void_

### `Protected` setNeedsRedraw

▸ **setNeedsRedraw**(`value`: boolean): _void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:57

Sets the flag indicating whether or not the renderable needs to be redrawn

**Parameters:**

| Name    | Type    | Description                                |
| ------- | ------- | ------------------------------------------ |
| `value` | boolean | True if the renderable needs to be redrawn |

**Returns:** _void_

---

### "renderables/LabelRenderable"

• **"renderables/LabelRenderable"**:

Defined in renderer/src/renderables/LabelRenderable.ts:1

### LabelRenderable

• **LabelRenderable**:

Defined in renderer/src/renderables/LabelRenderable.ts:24

A renderable that can be added to a GraphRenderer for rendering labels

### constructor

\+ **new LabelRenderable**(`gl`: WebGLRenderingContext, `id`: string): _LabelRenderable_

Defined in renderer/src/renderables/LabelRenderable.ts:42

Constructor

**Parameters:**

| Name | Type                  | Default     | Description                 |
| ---- | --------------------- | ----------- | --------------------------- |
| `gl` | WebGLRenderingContext | -           | The gl context to render to |
| `id` | string                | getNextId() | The id for the renderable   |

**Returns:** _LabelRenderable_

### `Private` \_backgroundColor

• **\_backgroundColor**: _PropertyContainer<string>_ = new PropertyContainer('rgb(134, 135, 159)')

Defined in renderer/src/renderables/LabelRenderable.ts:34

### `Private` \_font

• **\_font**: _PropertyContainer<string>_ = new PropertyContainer('monospace')

Defined in renderer/src/renderables/LabelRenderable.ts:28

### `Private` \_fontSize

• **\_fontSize**: _PropertyContainer<number>_ = new PropertyContainer(18)

Defined in renderer/src/renderables/LabelRenderable.ts:29

### `Private` \_horizontalPadding

• **\_horizontalPadding**: _PropertyContainer<number>_ = new PropertyContainer(8)

Defined in renderer/src/renderables/LabelRenderable.ts:31

### `Protected` \_needsRedraw

• **\_needsRedraw**: _boolean_ = false

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:12

### `Private` \_outline

• **\_outline**: _PropertyContainer<number>_ = new PropertyContainer(4)

Defined in renderer/src/renderables/LabelRenderable.ts:33

### `Private` \_outlineColor

• **\_outlineColor**: _PropertyContainer<string>_ = new PropertyContainer('rgb(107, 108, 127)')

Defined in renderer/src/renderables/LabelRenderable.ts:35

### `Private` \_text

• **\_text**: _PropertyContainer<string>_ = new PropertyContainer('')

Defined in renderer/src/renderables/LabelRenderable.ts:27

### `Private` \_textColor

• **\_textColor**: _PropertyContainer<string>_ = new PropertyContainer('rgb(240, 241, 255)')

Defined in renderer/src/renderables/LabelRenderable.ts:36

### `Private` \_verticalPadding

• **\_verticalPadding**: _PropertyContainer<number>_ = new PropertyContainer(2)

Defined in renderer/src/renderables/LabelRenderable.ts:32

### `Private` \_weight

• **\_weight**: _PropertyContainer<number>_ = new PropertyContainer(0)

Defined in renderer/src/renderables/LabelRenderable.ts:30

### `Private` canvas

• **canvas**: _HTMLCanvasElement_

Defined in renderer/src/renderables/LabelRenderable.ts:39

### `Private` ctx

• **ctx**: _CanvasRenderingContext2D | undefined_

Defined in renderer/src/renderables/LabelRenderable.ts:40

### `Protected` height

• **height**: _number_ = DEFAULT_HEIGHT

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:15

### `Private` model

• **model**: _Model_

Defined in renderer/src/renderables/LabelRenderable.ts:38

### `Private` position01

• **position01**: _number[]_ = []

Defined in renderer/src/renderables/LabelRenderable.ts:42

### `Private` texture

• **texture**: _Texture2D_

Defined in renderer/src/renderables/LabelRenderable.ts:41

### `Protected` width

• **width**: _number_ = DEFAULT_WIDTH

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:14

### backgroundColor

• **backgroundColor**:

Defined in renderer/src/renderables/LabelRenderable.ts:178

Defined in renderer/src/renderables/LabelRenderable.ts:185

Gets the background color
Sets the background color

### enabled

• **enabled**:

_Implementation of void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:39

Defined in renderer/src/renderables/Renderables.ts:46

Gets whether or not the renderable is enabled
Sets whether or not the renderable is enabled

### font

• **font**:

Defined in renderer/src/renderables/LabelRenderable.ts:94

Defined in renderer/src/renderables/LabelRenderable.ts:101

Sets the font
Gets the font

### fontSize

• **fontSize**:

Defined in renderer/src/renderables/LabelRenderable.ts:108

Defined in renderer/src/renderables/LabelRenderable.ts:115

Gets the font size
Sets the font size

### horizontalPadding

• **horizontalPadding**:

Defined in renderer/src/renderables/LabelRenderable.ts:122

Defined in renderer/src/renderables/LabelRenderable.ts:129

Gets the horizontal padding
Sets the horizontal padding

### needsRedraw

• **needsRedraw**:

_Implementation of void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:32

Gets whether or not the renderable needs to be redrawn

### outlineColor

• **outlineColor**:

Defined in renderer/src/renderables/LabelRenderable.ts:164

Defined in renderer/src/renderables/LabelRenderable.ts:171

Gets the outline color
Sets the outline color

### outlineWidth

• **outlineWidth**:

Defined in renderer/src/renderables/LabelRenderable.ts:150

Defined in renderer/src/renderables/LabelRenderable.ts:157

Gets the outline width
Sets the outline width

### text

• **text**:

Defined in renderer/src/renderables/LabelRenderable.ts:80

Defined in renderer/src/renderables/LabelRenderable.ts:87

Gets the label to display
Sets the label to display

### textColor

• **textColor**:

Defined in renderer/src/renderables/LabelRenderable.ts:192

Defined in renderer/src/renderables/LabelRenderable.ts:199

Gets the text color
Sets the text color

### verticalPadding

• **verticalPadding**:

Defined in renderer/src/renderables/LabelRenderable.ts:136

Defined in renderer/src/renderables/LabelRenderable.ts:143

Gets the vertical padding
Sets the vertical padding

### weight

• **weight**:

Defined in renderer/src/renderables/LabelRenderable.ts:206

Defined in renderer/src/renderables/LabelRenderable.ts:213

Gets the weight
Sets the weight

### `Private` \_createModel

▸ **\_createModel**(`gl`: WebGLRenderingContext, `id`: string): _Model_

Defined in renderer/src/renderables/LabelRenderable.ts:280

Creates a model that represents a label

**Parameters:**

| Name | Type                  | Description         |
| ---- | --------------------- | ------------------- |
| `gl` | WebGLRenderingContext | The gl context      |
| `id` | string                | The id of the model |

**Returns:** _Model_

### `Private` \_getShaders

▸ **\_getShaders**(): _object_

Defined in renderer/src/renderables/LabelRenderable.ts:263

Gets the set of shaders used for the label renderable

**Returns:** _object_

- **fs**: _string_

- **modules**: _any[]_

- **vs**: _string_

### `Private` \_renderTexture

▸ **\_renderTexture**(): _void_

Defined in renderer/src/renderables/LabelRenderable.ts:324

Renders the label to a texture

**Returns:** _void_

### `Private` \_roundRect

▸ **\_roundRect**(`x`: number, `y`: number, `width`: number, `height`: number, `radius`: number, `fill`: boolean, `stroke`: boolean): _void_

Defined in renderer/src/renderables/LabelRenderable.ts:381

Draws a rounded rect to the current ctx

**Parameters:**

| Name     | Type    | Default | Description                     |
| -------- | ------- | ------- | ------------------------------- |
| `x`      | number  | -       | The x location of the rectangle |
| `y`      | number  | -       | The y location of the rectangle |
| `width`  | number  | -       | The width of the rectangle      |
| `height` | number  | -       | The height of the rectangle     |
| `radius` | number  | 5       | The radius of the corners       |
| `fill`   | boolean | false   | The fill of the rectangle       |
| `stroke` | boolean | true    | The stroke of the rectangle     |

**Returns:** _void_

### draw

▸ **draw**(`options`: RenderOptions): _void_

_Implementation of void_

_Overrides void_

Defined in renderer/src/renderables/LabelRenderable.ts:221

Draws the LabelRenderable

**Parameters:**

| Name      | Type          | Description        |
| --------- | ------------- | ------------------ |
| `options` | RenderOptions | The render options |

**Returns:** _void_

### `Protected` makeDirtyHandler

▸ **makeDirtyHandler**(): _void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:17

**Returns:** _void_

### `Private` renderTextureHandler

▸ **renderTextureHandler**(): _void_

Defined in renderer/src/renderables/LabelRenderable.ts:25

**Returns:** _void_

### resize

▸ **resize**(`width`: number, `height`: number): _void_

_Implementation of void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:24

Resizes the renderable

**Parameters:**

| Name     | Type   | Description       |
| -------- | ------ | ----------------- |
| `width`  | number | The render width  |
| `height` | number | The render height |

**Returns:** _void_

### `Protected` setNeedsRedraw

▸ **setNeedsRedraw**(`value`: boolean): _void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:57

Sets the flag indicating whether or not the renderable needs to be redrawn

**Parameters:**

| Name    | Type    | Description                                |
| ------- | ------- | ------------------------------------------ |
| `value` | boolean | True if the renderable needs to be redrawn |

**Returns:** _void_

### setPositions

▸ **setPositions**(`position01`: number[]): _void_

Defined in renderer/src/renderables/LabelRenderable.ts:256

Sets the position of the label

**Parameters:**

| Name         | Type     | Description               |
| ------------ | -------- | ------------------------- |
| `position01` | number[] | The position of the label |

**Returns:** _void_

---

### "renderables/Renderables"

• **"renderables/Renderables"**:

Defined in renderer/src/renderables/Renderables.ts:1

### `Abstract` CompositeDataboundRenderable

• **CompositeDataboundRenderable**:

Defined in renderer/src/renderables/Renderables.ts:119

Base class for a renderable that operates on Vertex data

### `Protected` constructor

\+ **new CompositeDataboundRenderable**(`renderables`: Renderable[]): _CompositeDataboundRenderable_

Defined in renderer/src/renderables/Renderables.ts:121

**Parameters:**

| Name          | Type         |
| ------------- | ------------ |
| `renderables` | Renderable[] |

**Returns:** _CompositeDataboundRenderable_

### `Protected` \_needsRedraw

• **\_needsRedraw**: _boolean_ = false

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:12

### `Protected` data

• **data**: _T | undefined_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:72

### `Protected` height

• **height**: _number_ = DEFAULT_HEIGHT

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:15

### `Protected` renderables

• **renderables**: _Renderable[]_

Defined in renderer/src/renderables/Renderables.ts:122

### `Protected` width

• **width**: _number_ = DEFAULT_WIDTH

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:14

### enabled

• **enabled**:

_Implementation of void_

_Inherited from void_

_Overrides void_

Defined in renderer/src/renderables/Renderables.ts:77

Determines whether this renderable is enabled

### needsRedraw

• **needsRedraw**:

_Implementation of void_

_Overrides void_

Defined in renderer/src/renderables/Renderables.ts:138

Determines if this renderable needs to be redrawn

### draw

▸ **draw**(`options`: RenderOptions): _void_

_Implementation of void_

_Overrides void_

Defined in renderer/src/renderables/Renderables.ts:129

Draws out this renderable

**Parameters:**

| Name      | Type          |
| --------- | ------------- |
| `options` | RenderOptions |

**Returns:** _void_

### getData

▸ **getData**(): _T | undefined_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:84

Get the related vertex

**Returns:** _T | undefined_

### `Protected` `Abstract` handleSetData

▸ **handleSetData**(`vertex`: T | undefined): _void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:113

Inner handler for responding to a new set vertex

**Parameters:**

| Name     | Type               | Description                   |
| -------- | ------------------ | ----------------------------- |
| `vertex` | T &#124; undefined | The vertext that has been set |

**Returns:** _void_

### `Protected` isEqual

▸ **isEqual**(`data`: T | undefined, `existing`: T | undefined): _boolean_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:105

Returns true if the new data is equal to the old data

**Parameters:**

| Name       | Type               | Description       |
| ---------- | ------------------ | ----------------- |
| `data`     | T &#124; undefined | The new data      |
| `existing` | T &#124; undefined | The edisting data |

**Returns:** _boolean_

### `Protected` makeDirtyHandler

▸ **makeDirtyHandler**(): _void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:17

**Returns:** _void_

### resize

▸ **resize**(`width`: number, `height`: number): _void_

_Implementation of void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:24

Resizes the renderable

**Parameters:**

| Name     | Type   | Description       |
| -------- | ------ | ----------------- |
| `width`  | number | The render width  |
| `height` | number | The render height |

**Returns:** _void_

### setData

▸ **setData**(`data`: T | undefined): _void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:92

Set the related vertex

**Parameters:**

| Name   | Type               |
| ------ | ------------------ |
| `data` | T &#124; undefined |

**Returns:** _void_

### `Protected` setNeedsRedraw

▸ **setNeedsRedraw**(`value`: boolean): _void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:57

Sets the flag indicating whether or not the renderable needs to be redrawn

**Parameters:**

| Name    | Type    | Description                                |
| ------- | ------- | ------------------------------------------ |
| `value` | boolean | True if the renderable needs to be redrawn |

**Returns:** _void_

### `Abstract` DataboundRenderable

• **DataboundRenderable**:

Defined in renderer/src/renderables/Renderables.ts:70

Base class for a vertex renderable

### `Protected` \_needsRedraw

• **\_needsRedraw**: _boolean_ = false

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:12

### `Protected` data

• **data**: _T | undefined_

Defined in renderer/src/renderables/Renderables.ts:72

### `Protected` height

• **height**: _number_ = DEFAULT_HEIGHT

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:15

### `Protected` width

• **width**: _number_ = DEFAULT_WIDTH

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:14

### enabled

• **enabled**:

_Implementation of void_

_Overrides void_

Defined in renderer/src/renderables/Renderables.ts:77

Determines whether this renderable is enabled

### needsRedraw

• **needsRedraw**:

_Implementation of void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:32

Gets whether or not the renderable needs to be redrawn

### `Abstract` draw

▸ **draw**(`options`: RenderOptions): _void_

_Implementation of void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:65

Draws the renderable

**Parameters:**

| Name      | Type          | Description        |
| --------- | ------------- | ------------------ |
| `options` | RenderOptions | The render options |

**Returns:** _void_

### getData

▸ **getData**(): _T | undefined_

Defined in renderer/src/renderables/Renderables.ts:84

Get the related vertex

**Returns:** _T | undefined_

### `Protected` `Abstract` handleSetData

▸ **handleSetData**(`vertex`: T | undefined): _void_

Defined in renderer/src/renderables/Renderables.ts:113

Inner handler for responding to a new set vertex

**Parameters:**

| Name     | Type               | Description                   |
| -------- | ------------------ | ----------------------------- |
| `vertex` | T &#124; undefined | The vertext that has been set |

**Returns:** _void_

### `Protected` isEqual

▸ **isEqual**(`data`: T | undefined, `existing`: T | undefined): _boolean_

Defined in renderer/src/renderables/Renderables.ts:105

Returns true if the new data is equal to the old data

**Parameters:**

| Name       | Type               | Description       |
| ---------- | ------------------ | ----------------- |
| `data`     | T &#124; undefined | The new data      |
| `existing` | T &#124; undefined | The edisting data |

**Returns:** _boolean_

### `Protected` makeDirtyHandler

▸ **makeDirtyHandler**(): _void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:17

**Returns:** _void_

### resize

▸ **resize**(`width`: number, `height`: number): _void_

_Implementation of void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:24

Resizes the renderable

**Parameters:**

| Name     | Type   | Description       |
| -------- | ------ | ----------------- |
| `width`  | number | The render width  |
| `height` | number | The render height |

**Returns:** _void_

### setData

▸ **setData**(`data`: T | undefined): _void_

Defined in renderer/src/renderables/Renderables.ts:92

Set the related vertex

**Parameters:**

| Name   | Type               |
| ------ | ------------------ |
| `data` | T &#124; undefined |

**Returns:** _void_

### `Protected` setNeedsRedraw

▸ **setNeedsRedraw**(`value`: boolean): _void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:57

Sets the flag indicating whether or not the renderable needs to be redrawn

**Parameters:**

| Name    | Type    | Description                                |
| ------- | ------- | ------------------------------------------ |
| `value` | boolean | True if the renderable needs to be redrawn |

**Returns:** _void_

### `Abstract` DirtyableRenderable

• **DirtyableRenderable**:

Defined in renderer/src/renderables/Renderables.ts:11

Base-class for property-holding renderable models

### `Private` \_enabled

• **\_enabled**: _boolean_ = true

Defined in renderer/src/renderables/Renderables.ts:13

### `Protected` \_needsRedraw

• **\_needsRedraw**: _boolean_ = false

Defined in renderer/src/renderables/Renderables.ts:12

### `Protected` height

• **height**: _number_ = DEFAULT_HEIGHT

Defined in renderer/src/renderables/Renderables.ts:15

### `Protected` width

• **width**: _number_ = DEFAULT_WIDTH

Defined in renderer/src/renderables/Renderables.ts:14

### enabled

• **enabled**:

_Implementation of void_

Defined in renderer/src/renderables/Renderables.ts:39

Defined in renderer/src/renderables/Renderables.ts:46

Gets whether or not the renderable is enabled
Sets whether or not the renderable is enabled

### needsRedraw

• **needsRedraw**:

_Implementation of void_

Defined in renderer/src/renderables/Renderables.ts:32

Gets whether or not the renderable needs to be redrawn

### `Abstract` draw

▸ **draw**(`options`: RenderOptions): _void_

_Implementation of void_

Defined in renderer/src/renderables/Renderables.ts:65

Draws the renderable

**Parameters:**

| Name      | Type          | Description        |
| --------- | ------------- | ------------------ |
| `options` | RenderOptions | The render options |

**Returns:** _void_

### `Protected` makeDirtyHandler

▸ **makeDirtyHandler**(): _void_

Defined in renderer/src/renderables/Renderables.ts:17

**Returns:** _void_

### resize

▸ **resize**(`width`: number, `height`: number): _void_

_Implementation of void_

Defined in renderer/src/renderables/Renderables.ts:24

Resizes the renderable

**Parameters:**

| Name     | Type   | Description       |
| -------- | ------ | ----------------- |
| `width`  | number | The render width  |
| `height` | number | The render height |

**Returns:** _void_

### `Protected` setNeedsRedraw

▸ **setNeedsRedraw**(`value`: boolean): _void_

Defined in renderer/src/renderables/Renderables.ts:57

Sets the flag indicating whether or not the renderable needs to be redrawn

**Parameters:**

| Name    | Type    | Description                                |
| ------- | ------- | ------------------------------------------ |
| `value` | boolean | True if the renderable needs to be redrawn |

**Returns:** _void_

---

### "renderables/ScreenQuadRenderable"

• **"renderables/ScreenQuadRenderable"**:

Defined in renderer/src/renderables/ScreenQuadRenderable.ts:1

---

### "renderables/VertexLabelRenderable"

• **"renderables/VertexLabelRenderable"**:

Defined in renderer/src/renderables/VertexLabelRenderable.ts:1

### VertexLabelRenderable

• **VertexLabelRenderable**:

Defined in renderer/src/renderables/VertexLabelRenderable.ts:13

A renderable that can be added to a GraphRenderer for rendering labels for a single node

### constructor

\+ **new VertexLabelRenderable**(`gl`: WebGLRenderingContext): _VertexLabelRenderable_

Defined in renderer/src/renderables/VertexLabelRenderable.ts:14

Constructor

**Parameters:**

| Name | Type                  | Description    |
| ---- | --------------------- | -------------- |
| `gl` | WebGLRenderingContext | The gl context |

**Returns:** _VertexLabelRenderable_

### `Protected` \_needsRedraw

• **\_needsRedraw**: _boolean_ = false

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:12

### `Protected` data

• **data**: _Node | undefined_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:72

### `Protected` height

• **height**: _number_ = DEFAULT_HEIGHT

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:15

### `Private` renderable

• **renderable**: _LabelRenderable_

Defined in renderer/src/renderables/VertexLabelRenderable.ts:14

### `Protected` width

• **width**: _number_ = DEFAULT_WIDTH

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:14

### enabled

• **enabled**:

_Implementation of void_

_Inherited from void_

_Overrides void_

Defined in renderer/src/renderables/Renderables.ts:77

Determines whether this renderable is enabled

### needsRedraw

• **needsRedraw**:

_Implementation of void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:32

Gets whether or not the renderable needs to be redrawn

### draw

▸ **draw**(`options`: RenderOptions): _void_

_Implementation of void_

_Overrides void_

Defined in renderer/src/renderables/VertexLabelRenderable.ts:38

**Parameters:**

| Name      | Type          |
| --------- | ------------- |
| `options` | RenderOptions |

**Returns:** _void_

### getData

▸ **getData**(): _Node | undefined_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:84

Get the related vertex

**Returns:** _Node | undefined_

### handleSetData

▸ **handleSetData**(`vertex`: Node | undefined): _void_

_Overrides void_

Defined in renderer/src/renderables/VertexLabelRenderable.ts:28

Sets the vertex to render the label for

**Parameters:**

| Name     | Type                  | Description                        |
| -------- | --------------------- | ---------------------------------- |
| `vertex` | Node &#124; undefined | The vertex to render the label for |

**Returns:** _void_

### `Protected` isEqual

▸ **isEqual**(`data`: Node | undefined, `existing`: Node | undefined): _boolean_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:105

Returns true if the new data is equal to the old data

**Parameters:**

| Name       | Type                  | Description       |
| ---------- | --------------------- | ----------------- |
| `data`     | Node &#124; undefined | The new data      |
| `existing` | Node &#124; undefined | The edisting data |

**Returns:** _boolean_

### `Protected` makeDirtyHandler

▸ **makeDirtyHandler**(): _void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:17

**Returns:** _void_

### resize

▸ **resize**(`width`: number, `height`: number): _void_

_Implementation of void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:24

Resizes the renderable

**Parameters:**

| Name     | Type   | Description       |
| -------- | ------ | ----------------- |
| `width`  | number | The render width  |
| `height` | number | The render height |

**Returns:** _void_

### setData

▸ **setData**(`data`: Node | undefined): _void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:92

Set the related vertex

**Parameters:**

| Name   | Type                  |
| ------ | --------------------- |
| `data` | Node &#124; undefined |

**Returns:** _void_

### `Protected` setNeedsRedraw

▸ **setNeedsRedraw**(`value`: boolean): _void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:57

Sets the flag indicating whether or not the renderable needs to be redrawn

**Parameters:**

| Name    | Type    | Description                                |
| ------- | ------- | ------------------------------------------ |
| `value` | boolean | True if the renderable needs to be redrawn |

**Returns:** _void_

---

### "renderables/VertexSetLabelRenderable"

• **"renderables/VertexSetLabelRenderable"**:

Defined in renderer/src/renderables/VertexSetLabelRenderable.ts:1

### VertexSetLabelRenderable

• **VertexSetLabelRenderable**:

Defined in renderer/src/renderables/VertexSetLabelRenderable.ts:12

A renderable that can be added to a GraphRenderer for rendering labels for a set of nodes

### constructor

\+ **new VertexSetLabelRenderable**(`gl`: WebGLRenderingContext): _VertexSetLabelRenderable_

_Overrides void_

Defined in renderer/src/renderables/VertexSetLabelRenderable.ts:14

Constructor

**Parameters:**

| Name | Type                  | Description    |
| ---- | --------------------- | -------------- |
| `gl` | WebGLRenderingContext | The gl context |

**Returns:** _VertexSetLabelRenderable_

### `Protected` \_needsRedraw

• **\_needsRedraw**: _boolean_ = false

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:12

### `Protected` data

• **data**: _Node[] | undefined_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:72

### `Private` gl

• **gl**: _WebGLRenderingContext_

Defined in renderer/src/renderables/VertexSetLabelRenderable.ts:19

The gl context

### `Protected` height

• **height**: _number_ = DEFAULT_HEIGHT

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:15

### `Protected` renderables

• **renderables**: _Renderable[]_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:122

### `Protected` width

• **width**: _number_ = DEFAULT_WIDTH

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:14

### enabled

• **enabled**:

_Implementation of void_

_Inherited from void_

_Overrides void_

Defined in renderer/src/renderables/Renderables.ts:77

Determines whether this renderable is enabled

### needsRedraw

• **needsRedraw**:

_Implementation of void_

_Inherited from void_

_Overrides void_

Defined in renderer/src/renderables/Renderables.ts:138

Determines if this renderable needs to be redrawn

### draw

▸ **draw**(`options`: RenderOptions): _void_

_Implementation of void_

_Inherited from void_

_Overrides void_

Defined in renderer/src/renderables/Renderables.ts:129

Draws out this renderable

**Parameters:**

| Name      | Type          |
| --------- | ------------- |
| `options` | RenderOptions |

**Returns:** _void_

### getData

▸ **getData**(): _Node[] | undefined_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:84

Get the related vertex

**Returns:** _Node[] | undefined_

### `Protected` handleSetData

▸ **handleSetData**(`data`: Node[] | undefined): _void_

_Overrides void_

Defined in renderer/src/renderables/VertexSetLabelRenderable.ts:27

Sets the verticies to label

**Parameters:**

| Name   | Type                    | Description                   |
| ------ | ----------------------- | ----------------------------- |
| `data` | Node[] &#124; undefined | The set of verticies to label |

**Returns:** _void_

### `Protected` isEqual

▸ **isEqual**(`data`: Node[] | undefined, `existing`: Node[] | undefined): _boolean_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:105

Returns true if the new data is equal to the old data

**Parameters:**

| Name       | Type                    | Description       |
| ---------- | ----------------------- | ----------------- |
| `data`     | Node[] &#124; undefined | The new data      |
| `existing` | Node[] &#124; undefined | The edisting data |

**Returns:** _boolean_

### `Protected` makeDirtyHandler

▸ **makeDirtyHandler**(): _void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:17

**Returns:** _void_

### resize

▸ **resize**(`width`: number, `height`: number): _void_

_Implementation of void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:24

Resizes the renderable

**Parameters:**

| Name     | Type   | Description       |
| -------- | ------ | ----------------- |
| `width`  | number | The render width  |
| `height` | number | The render height |

**Returns:** _void_

### setData

▸ **setData**(`data`: Node[] | undefined): _void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:92

Set the related vertex

**Parameters:**

| Name   | Type                    |
| ------ | ----------------------- |
| `data` | Node[] &#124; undefined |

**Returns:** _void_

### `Protected` setNeedsRedraw

▸ **setNeedsRedraw**(`value`: boolean): _void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:57

Sets the flag indicating whether or not the renderable needs to be redrawn

**Parameters:**

| Name    | Type    | Description                                |
| ------- | ------- | ------------------------------------------ |
| `value` | boolean | True if the renderable needs to be redrawn |

**Returns:** _void_

---

### "renderables/VertexSetRenderable"

• **"renderables/VertexSetRenderable"**:

Defined in renderer/src/renderables/VertexSetRenderable.ts:1

### VertexSetRenderable

• **VertexSetRenderable**:

Defined in renderer/src/renderables/VertexSetRenderable.ts:47

A vertex renderable for a multiple vertices, for use in rendering like highlights

### constructor

\+ **new VertexSetRenderable**(`gl`: WebGLRenderingContext, `id`: string): _VertexSetRenderable_

Defined in renderer/src/renderables/VertexSetRenderable.ts:53

Constructor

**Parameters:**

| Name | Type                  | Default     | Description              |
| ---- | --------------------- | ----------- | ------------------------ |
| `gl` | WebGLRenderingContext | -           | The gl context           |
| `id` | string                | getNextId() | The id of the renderable |

**Returns:** _VertexSetRenderable_

### `Private` \_color

• **\_color**: _PropertyContainer<number[]>_ = new PropertyContainer(
[160 / 255, 240 / 255, 255 / 255, 207 / 255],
areColorsEqual,
)

Defined in renderer/src/renderables/VertexSetRenderable.ts:50

### `Protected` \_needsRedraw

• **\_needsRedraw**: _boolean_ = false

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:12

### `Protected` data

• **data**: _Node[] | undefined_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:72

### `Protected` height

• **height**: _number_ = DEFAULT_HEIGHT

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:15

### `Private` id

• **id**: _string_

Defined in renderer/src/renderables/VertexSetRenderable.ts:60

The id of the renderable

### `Private` model

• **model**: _Model_

Defined in renderer/src/renderables/VertexSetRenderable.ts:48

### `Private` nodeGLBuffer

• **nodeGLBuffer**: _Buffer_

Defined in renderer/src/renderables/VertexSetRenderable.ts:49

### `Protected` width

• **width**: _number_ = DEFAULT_WIDTH

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:14

### color

• **color**:

Defined in renderer/src/renderables/VertexSetRenderable.ts:72

Defined in renderer/src/renderables/VertexSetRenderable.ts:79

Gets the color for the renderable
Sets the color for the renderable

### enabled

• **enabled**:

_Implementation of void_

_Inherited from void_

_Overrides void_

Defined in renderer/src/renderables/Renderables.ts:77

Determines whether this renderable is enabled

### needsRedraw

• **needsRedraw**:

_Implementation of void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:32

Gets whether or not the renderable needs to be redrawn

### `Private` \_createModel

▸ **\_createModel**(`gl`: WebGLRenderingContext, `id`: string): _object_

Defined in renderer/src/renderables/VertexSetRenderable.ts:172

Creates the model used for rendering the vertex body

**Parameters:**

| Name | Type                  | Description         |
| ---- | --------------------- | ------------------- |
| `gl` | WebGLRenderingContext | The gl context      |
| `id` | string                | The id of the model |

**Returns:** _object_

- **buffer**: _Buffer<>_

- **model**: _Model<>_ = new Model(gl, {
  ...this.\_getShaders(),
  id,
  isInstanced: true,
  shaderCache: null,
  geometry: new Geometry({
  drawMode: GL.TRIANGLE_STRIP,
  vertexCount: 4,
  attributes: {
  aVertex: {
  value: new Float32Array(positions),
  size: 3,
  type: GL.FLOAT,
  },
  },
  }),
  attributes,
  })

### `Private` \_getShaders

▸ **\_getShaders**(): _object_

Defined in renderer/src/renderables/VertexSetRenderable.ts:159

Gets the shaders used with the vertex body

**Returns:** _object_

- **fs**: _any_ = highlightFS

- **modules**: _never[]_ = []

- **vs**: _any_ = highlightVS

### `Private` \_updateModelData

▸ **\_updateModelData**(`data`: ArrayBuffer, `count`: number): _void_

Defined in renderer/src/renderables/VertexSetRenderable.ts:151

Updates the data bound to the model

**Parameters:**

| Name    | Type        | Description         |
| ------- | ----------- | ------------------- |
| `data`  | ArrayBuffer | The raw data buffer |
| `count` | number      | The number of nodes |

**Returns:** _void_

### draw

▸ **draw**(`options`: RenderOptions): _void_

_Implementation of void_

_Overrides void_

Defined in renderer/src/renderables/VertexSetRenderable.ts:87

Draws the VertexSetHighlightRenderable

**Parameters:**

| Name      | Type          | Description        |
| --------- | ------------- | ------------------ |
| `options` | RenderOptions | The render options |

**Returns:** _void_

### getData

▸ **getData**(): _Node[] | undefined_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:84

Get the related vertex

**Returns:** _Node[] | undefined_

### `Protected` handleSetData

▸ **handleSetData**(`vertices`: Node[]): _void_

_Overrides void_

Defined in renderer/src/renderables/VertexSetRenderable.ts:120

Sets the vertex to be rendered

**Parameters:**

| Name       | Type   | Description          |
| ---------- | ------ | -------------------- |
| `vertices` | Node[] | The vertex to render |

**Returns:** _void_

### `Protected` isEqual

▸ **isEqual**(`data`: Node[] | undefined, `existing`: Node[] | undefined): _boolean_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:105

Returns true if the new data is equal to the old data

**Parameters:**

| Name       | Type                    | Description       |
| ---------- | ----------------------- | ----------------- |
| `data`     | Node[] &#124; undefined | The new data      |
| `existing` | Node[] &#124; undefined | The edisting data |

**Returns:** _boolean_

### `Protected` makeDirtyHandler

▸ **makeDirtyHandler**(): _void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:17

**Returns:** _void_

### resize

▸ **resize**(`width`: number, `height`: number): _void_

_Implementation of void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:24

Resizes the renderable

**Parameters:**

| Name     | Type   | Description       |
| -------- | ------ | ----------------- |
| `width`  | number | The render width  |
| `height` | number | The render height |

**Returns:** _void_

### setData

▸ **setData**(`data`: Node[] | undefined): _void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:92

Set the related vertex

**Parameters:**

| Name   | Type                    |
| ------ | ----------------------- |
| `data` | Node[] &#124; undefined |

**Returns:** _void_

### `Protected` setNeedsRedraw

▸ **setNeedsRedraw**(`value`: boolean): _void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:57

Sets the flag indicating whether or not the renderable needs to be redrawn

**Parameters:**

| Name    | Type    | Description                                |
| ------- | ------- | ------------------------------------------ |
| `value` | boolean | True if the renderable needs to be redrawn |

**Returns:** _void_

### `Const` LAYOUT

• **LAYOUT**: _Map<string, AttributeSpecification> & object_ = createLayoutBuilder()
.addFloat32Vec3('position')
.addFloat32('weight')
.addFloat32('radius')
.addFloat32('shape')
.build()

Defined in renderer/src/renderables/VertexSetRenderable.ts:31

### `Const` LAYOUT_STRIDE

• **LAYOUT_STRIDE**: _number_ = LAYOUT.stride

Defined in renderer/src/renderables/VertexSetRenderable.ts:38

### `Const` POSITION_OFFSET

• **POSITION_OFFSET**: _number_ = LAYOUT.get('position')!.offset

Defined in renderer/src/renderables/VertexSetRenderable.ts:39

### `Const` RADIUS_OFFSET

• **RADIUS_OFFSET**: _number_ = LAYOUT.get('radius')!.offset

Defined in renderer/src/renderables/VertexSetRenderable.ts:41

### `Const` SHAPE_OFFSET

• **SHAPE_OFFSET**: _number_ = LAYOUT.get('shape')!.offset

Defined in renderer/src/renderables/VertexSetRenderable.ts:42

### `Const` WEIGHT_OFFSET

• **WEIGHT_OFFSET**: _number_ = LAYOUT.get('weight')!.offset

Defined in renderer/src/renderables/VertexSetRenderable.ts:40

### `Const` position

• **position**: _unique symbol_ = Symbol('VertexBody::position')

Defined in renderer/src/renderables/VertexSetRenderable.ts:25

### `Const` radius

• **radius**: _unique symbol_ = Symbol('VertexBody::radius')

Defined in renderer/src/renderables/VertexSetRenderable.ts:26

### `Const` shape

• **shape**: _unique symbol_ = Symbol('VertexBody::shape')

Defined in renderer/src/renderables/VertexSetRenderable.ts:29

### `Const` visible

• **visible**: _unique symbol_ = Symbol('VertexBody::visible')

Defined in renderer/src/renderables/VertexSetRenderable.ts:28

### `Const` weight

• **weight**: _unique symbol_ = Symbol('VertexBody::weight')

Defined in renderer/src/renderables/VertexSetRenderable.ts:27

---

### "renderables/edges/EdgesRenderable"

• **"renderables/edges/EdgesRenderable"**:

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:1

### EdgesRenderable

• **EdgesRenderable**:

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:29

A renderable that can be added to the GraphRenderer which adds support for rendering edges

### constructor

\+ **new EdgesRenderable**(`gl`: WebGLRenderingContext, `engineTime`: function, `config`: RenderConfiguration, `id`: string): _EdgesRenderable_

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:40

Constructor for EdgesRenderable

**Parameters:**

▪ **gl**: _WebGLRenderingContext_

The gl context the edges should be rendered to

▪ **engineTime**: _function_

▸ (): _number_

▪ **config**: _RenderConfiguration_

The render configuration

▪`Default value` **id**: _string_= getNextId()

The id of the renderable

**Returns:** _EdgesRenderable_

### `Private` \_data

• **\_data**: _PropertyContainer<undefined | ReaderStore<Edge>>_ = new PropertyContainer<EdgeStore | undefined>(
undefined,
() => false,
)

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:37

### `Protected` \_needsRedraw

• **\_needsRedraw**: _boolean_ = false

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:12

### `Protected` config

• **config**: _RenderConfiguration_

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:51

The render configuration

### `Private` engineTime

• **engineTime**: _function_

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:50

#### Type declaration:

▸ (): _number_

### `Protected` height

• **height**: _number_ = DEFAULT_HEIGHT

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:15

### `Private` `Readonly` model

• **model**: _Model_

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:30

### `Private` `Readonly` modelBuffer

• **modelBuffer**: _Buffer_

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:31

### `Private` needsDataBind

• **needsDataBind**: _boolean_ = true

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:35

### `Private` `Readonly` translucentModel

• **translucentModel**: _Model_

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:32

### `Private` `Readonly` translucentModelBuffer

• **translucentModelBuffer**: _Buffer_

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:33

### `Private` tweenUntil

• **tweenUntil**: _number_ = 0

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:34

### `Protected` width

• **width**: _number_ = DEFAULT_WIDTH

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:14

### data

• **data**:

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:86

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:93

The edge data that should be rendered
Sets the edge data to be rendered

### `Protected` edgeAlpha

• **edgeAlpha**:

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:137

Returns the alpha used for the edges

### `Protected` edgeAntialias

• **edgeAntialias**:

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:144

Returns true if edges should be anti-aliased

### `Protected` edgeConstantWidth

• **edgeConstantWidth**:

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:116

Returns true if the edges should be rendered using a constant width

### `Protected` edgeDepthWrite

• **edgeDepthWrite**:

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:109

Returns true if edges behind other edges should not be rendered

### `Protected` edgeMaxWidth

• **edgeMaxWidth**:

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:130

Returns the max edge with

### `Protected` edgeMinWidth

• **edgeMinWidth**:

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:123

Returns the min edge with

### enabled

• **enabled**:

_Implementation of void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:39

Defined in renderer/src/renderables/Renderables.ts:46

Gets whether or not the renderable is enabled
Sets whether or not the renderable is enabled

### needsRedraw

• **needsRedraw**:

_Implementation of void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:32

Gets whether or not the renderable needs to be redrawn

### bindDataToModel

▸ **bindDataToModel**(`forceAll`: boolean): _boolean_

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:343

Binds the data in our databuffer to the model

**Parameters:**

| Name       | Type    | Default | Description                        |
| ---------- | ------- | ------- | ---------------------------------- |
| `forceAll` | boolean | false   | Force all the attributes to return |

**Returns:** _boolean_

### computeDomain

▸ **computeDomain**(): _Bounds3D | undefined_

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:195

Computes the bounds of the edges

**Returns:** _Bounds3D | undefined_

### `Private` computeEdgeBounds

▸ **computeEdgeBounds**(`edge`: Edge): _object_

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:220

Computes the given edges bounds

**Parameters:**

| Name   | Type | Description                        |
| ------ | ---- | ---------------------------------- |
| `edge` | Edge | The edge to compute the bounds for |

**Returns:** _object_

- ### **x**: _object_

  - **max**: _number_ = rangeX[1]

  - **min**: _number_ = rangeX[0]

- ### **y**: _object_

  - **max**: _number_ = rangeY[1]

  - **min**: _number_ = rangeY[0]

- ### **z**: _object_

  - **max**: _number_ = rangeZ[1]!

  - **min**: _number_ = rangeZ[0]!

### draw

▸ **draw**(`options`: RenderOptions): _void_

_Implementation of void_

_Overrides void_

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:152

Draws the EdgeRenderable

**Parameters:**

| Name      | Type          | Description               |
| --------- | ------------- | ------------------------- |
| `options` | RenderOptions | The set of render options |

**Returns:** _void_

### `Protected` handleEdgeAdded

▸ **handleEdgeAdded**(`edgeOrIndex`: number | Edge): _void_

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:249

Handler for when a node is added

**Parameters:**

| Name          | Type               |
| ------------- | ------------------ |
| `edgeOrIndex` | number &#124; Edge |

**Returns:** _void_

### `Protected` handleEdgeAttributeUpdated

▸ **handleEdgeAttributeUpdated**(`storeId`: number, `attribute?`: undefined | string, `value?`: any): _void_

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:283

Handles when an edges attribute is updated

**Parameters:**

| Name         | Type                    |
| ------------ | ----------------------- |
| `storeId`    | number                  |
| `attribute?` | undefined &#124; string |
| `value?`     | any                     |

**Returns:** _void_

### `Protected` handleEdgeRemoved

▸ **handleEdgeRemoved**(`edgeOrIndex`: number | Edge): _void_

Defined in renderer/src/renderables/edges/EdgesRenderable.ts:268

Removes a primitive from the scene

**Parameters:**

| Name          | Type               |
| ------------- | ------------------ |
| `edgeOrIndex` | number &#124; Edge |

**Returns:** _void_

### `Protected` makeDirtyHandler

▸ **makeDirtyHandler**(): _void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:17

**Returns:** _void_

### resize

▸ **resize**(`width`: number, `height`: number): _void_

_Implementation of void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:24

Resizes the renderable

**Parameters:**

| Name     | Type   | Description       |
| -------- | ------ | ----------------- |
| `width`  | number | The render width  |
| `height` | number | The render height |

**Returns:** _void_

### `Protected` setNeedsRedraw

▸ **setNeedsRedraw**(`value`: boolean): _void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:57

Sets the flag indicating whether or not the renderable needs to be redrawn

**Parameters:**

| Name    | Type    | Description                                |
| ------- | ------- | ------------------------------------------ |
| `value` | boolean | True if the renderable needs to be redrawn |

**Returns:** _void_

---

### "renderables/edges/index"

• **"renderables/edges/index"**:

Defined in renderer/src/renderables/edges/index.ts:1

### EdgesRenderable

• **EdgesRenderable**:

---

### "renderables/edges/model"

• **"renderables/edges/model"**:

Defined in renderer/src/renderables/edges/model.ts:1

---

### "renderables/index"

• **"renderables/index"**:

Defined in renderer/src/renderables/index.ts:1

### AxesRenderable

• **AxesRenderable**:

### CompositeDataboundRenderable

• **CompositeDataboundRenderable**:

### DataboundRenderable

• **DataboundRenderable**:

### DirtyableRenderable

• **DirtyableRenderable**:

### EdgesRenderable

• **EdgesRenderable**:

### LAYOUT

• **LAYOUT**:

### LAYOUT_STRIDE

• **LAYOUT_STRIDE**:

### LabelRenderable

• **LabelRenderable**:

### NodesRenderable

• **NodesRenderable**:

### POSITION_OFFSET

• **POSITION_OFFSET**:

### RADIUS_OFFSET

• **RADIUS_OFFSET**:

### SHAPE_OFFSET

• **SHAPE_OFFSET**:

### VertexLabelRenderable

• **VertexLabelRenderable**:

### VertexSetLabelRenderable

• **VertexSetLabelRenderable**:

### VertexSetRenderable

• **VertexSetRenderable**:

### WEIGHT_OFFSET

• **WEIGHT_OFFSET**:

### position

• **position**:

### radius

• **radius**:

### shape

• **shape**:

### visible

• **visible**:

### weight

• **weight**:

---

### "renderables/nodes/NodesRenderable"

• **"renderables/nodes/NodesRenderable"**:

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:1

### NodesRenderable

• **NodesRenderable**:

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:35

A renderable that can be added to the GraphRenderer which adds support for rendering nodes

### constructor

\+ **new NodesRenderable**(`gl`: WebGLRenderingContext, `engineTime`: function, `config`: RenderConfiguration, `id`: string): _NodesRenderable_

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:48

Constructor

**Parameters:**

▪ **gl**: _WebGLRenderingContext_

The gl context the nodes should be rendered to

▪ **engineTime**: _function_

Getter for the current engine time

▸ (): _number_

▪ **config**: _RenderConfiguration_

The render configuration

▪`Default value` **id**: _string_= getNextId()

The id of the renderable

**Returns:** _NodesRenderable_

### `Private` \_data

• **\_data**: _PropertyContainer<undefined | ReaderStore<Node>>_ = new PropertyContainer<NodeStore | undefined>(
undefined,
() => false,
)

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:42

### `Protected` \_needsRedraw

• **\_needsRedraw**: _boolean_ = false

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:12

### `Private` \_onNodeHoveredEvent

• **\_onNodeHoveredEvent**: _Subject<undefined | Node>_ = new Subject<Node | undefined>()

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:47

### `Protected` config

• **config**: _RenderConfiguration_

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:60

The render configuration

### `Private` engineTime

• **engineTime**: _function_

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:59

Getter for the current engine time

#### Type declaration:

▸ (): _number_

### `Protected` height

• **height**: _number_ = DEFAULT_HEIGHT

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:15

### `Private` `Readonly` model

• **model**: _Model_

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:36

### `Private` `Readonly` modelBuffer

• **modelBuffer**: _Buffer_

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:37

### `Private` needsDataBind

• **needsDataBind**: _boolean_ = true

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:41

### `Private` pickingSelectedColor

• **pickingSelectedColor**: _any | undefined_

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:48

### `Private` `Readonly` translucentModel

• **translucentModel**: _Model_

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:38

### `Private` `Readonly` translucentModelBuffer

• **translucentModelBuffer**: _Buffer_

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:39

### `Private` tweenUntil

• **tweenUntil**: _number_ = 0

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:40

### `Protected` width

• **width**: _number_ = DEFAULT_WIDTH

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:14

### data

• **data**:

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:94

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:101

Gets the node data that should be rendered
Sets the node data that should be rendered

### enabled

• **enabled**:

_Implementation of void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:39

Defined in renderer/src/renderables/Renderables.ts:46

Gets whether or not the renderable is enabled
Sets whether or not the renderable is enabled

### needsRedraw

• **needsRedraw**:

_Implementation of void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:32

Gets whether or not the renderable needs to be redrawn

### onNodeHovered

• **onNodeHovered**:

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:219

Gets an observable representing when a node has been hovered on

### `Private` \_comparePickingColors

▸ **\_comparePickingColors**(`color1`: number[], `color2`: number[]): _boolean_

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:410

Compares two picking colors to see if they are equal

**Parameters:**

| Name     | Type     | Description              |
| -------- | -------- | ------------------------ |
| `color1` | number[] | The first picking color  |
| `color2` | number[] | The second picking color |

**Returns:** _boolean_

### bindDataToModel

▸ **bindDataToModel**(`forceAll`: boolean): _boolean_

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:279

Binds the data in our databuffer to the model

**Parameters:**

| Name       | Type    | Default | Description                        |
| ---------- | ------- | ------- | ---------------------------------- |
| `forceAll` | boolean | false   | Force all the attributes to return |

**Returns:** _boolean_

### computeDomain

▸ **computeDomain**(): _Bounds3D | undefined_

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:226

Computes the bounds of the nodes

**Returns:** _Bounds3D | undefined_

### computeHovered

▸ **computeHovered**(`__namedParameters`: object): _any_

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:118

Runs the hovered logic to determine what node is being hovered over

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name             | Type |
| ---------------- | ---- |
| `_mousePosition` | any  |
| `framebuffer`    | any  |
| `gl`             | any  |

**Returns:** _any_

### `Private` computeNodeDataBounds

▸ **computeNodeDataBounds**(`node`: Node): _object_

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:386

Computes the given nodes bounds

**Parameters:**

| Name   | Type | Description                        |
| ------ | ---- | ---------------------------------- |
| `node` | Node | The node to compute the bounds for |

**Returns:** _object_

- ### **x**: _object_

  - **max**: _number_ = center[0] + node.radius

  - **min**: _number_ = center[0] - node.radius

- ### **y**: _object_

  - **max**: _number_ = center[1] + node.radius

  - **min**: _number_ = center[1] - node.radius

- ### **z**: _object_

  - **max**: _number_ = center[2] + node.radius

  - **min**: _number_ = center[2] - node.radius

### draw

▸ **draw**(`options`: RenderOptions): _void_

_Implementation of void_

_Overrides void_

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:170

Draws the NodesRenderable

**Parameters:**

| Name      | Type          | Description               |
| --------- | ------------- | ------------------------- |
| `options` | RenderOptions | The set of render options |

**Returns:** _void_

### `Protected` handleNodeAdded

▸ **handleNodeAdded**(`nodeOrIndex`: number | Node): _void_

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:301

Handler for when a node is added

**Parameters:**

| Name          | Type               |
| ------------- | ------------------ |
| `nodeOrIndex` | number &#124; Node |

**Returns:** _void_

### `Private` handleNodeAttributeUpdated

▸ **handleNodeAttributeUpdated**(`storeId`: number, `attribute?`: undefined | string, `value?`: any): _void_

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:337

Handler for when an attribute for a node is updated

**Parameters:**

| Name         | Type                    |
| ------------ | ----------------------- |
| `storeId`    | number                  |
| `attribute?` | undefined &#124; string |
| `value?`     | any                     |

**Returns:** _void_

### `Protected` handleNodeRemoved

▸ **handleNodeRemoved**(`nodeOrIndex`: number | Node): _void_

Defined in renderer/src/renderables/nodes/NodesRenderable.ts:321

Removes a primitive from the scene

**Parameters:**

| Name          | Type               |
| ------------- | ------------------ |
| `nodeOrIndex` | number &#124; Node |

**Returns:** _void_

### `Protected` makeDirtyHandler

▸ **makeDirtyHandler**(): _void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:17

**Returns:** _void_

### resize

▸ **resize**(`width`: number, `height`: number): _void_

_Implementation of void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:24

Resizes the renderable

**Parameters:**

| Name     | Type   | Description       |
| -------- | ------ | ----------------- |
| `width`  | number | The render width  |
| `height` | number | The render height |

**Returns:** _void_

### `Protected` setNeedsRedraw

▸ **setNeedsRedraw**(`value`: boolean): _void_

_Inherited from void_

Defined in renderer/src/renderables/Renderables.ts:57

Sets the flag indicating whether or not the renderable needs to be redrawn

**Parameters:**

| Name    | Type    | Description                                |
| ------- | ------- | ------------------------------------------ |
| `value` | boolean | True if the renderable needs to be redrawn |

**Returns:** _void_

---

### "renderables/nodes/index"

• **"renderables/nodes/index"**:

Defined in renderer/src/renderables/nodes/index.ts:1

### NodesRenderable

• **NodesRenderable**:

---

### "renderables/nodes/model"

• **"renderables/nodes/model"**:

Defined in renderer/src/renderables/nodes/model.ts:1

---

### "renderables/shaders/modules/easings/index"

• **"renderables/shaders/modules/easings/index"**:

Defined in renderer/src/renderables/shaders/modules/easings/index.ts:1

### ▪ **linear**: _object_

Defined in renderer/src/renderables/shaders/modules/easings/index.ts:7

- **dependencies**: _never[]_ = []

- **deprecations**: _never[]_ = []

- **fs**: _null_ = null

- **name**: _string_ = "linear-easing-module"

- **vs**: _any_ = linearVS

---

### "renderables/shaders/modules/index"

• **"renderables/shaders/modules/index"**:

Defined in renderer/src/renderables/shaders/modules/index.ts:1

### tween

• **tween**:

---

### "renderables/shaders/modules/tween/index"

• **"renderables/shaders/modules/tween/index"**:

Defined in renderer/src/renderables/shaders/modules/tween/index.ts:1

### ▪ **tween**: _object_

Defined in renderer/src/renderables/shaders/modules/tween/index.ts:8

- **dependencies**: _object[]_ = [linear]

- **deprecations**: _never[]_ = []

- **fs**: _null_ = null

- **name**: _string_ = "tween-module"

- **vs**: _any_

---

### "renderer/WebGLGraphRenderer"

• **"renderer/WebGLGraphRenderer"**:

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:1

### WebGLGraphRenderer

• **WebGLGraphRenderer**:

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:59

A WebGL 2 based graph renderer

### `Private` constructor

\+ **new WebGLGraphRenderer**(`canvas`: HTMLCanvasElement, `gl`: WebGLRenderingContext, `config`: RenderConfiguration, `data`: DataStore, `scene?`: Scene): _WebGLGraphRenderer_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:93

Constructor for WebGLGraphRenderer

**Parameters:**

| Name     | Type                  | Description              |
| -------- | --------------------- | ------------------------ |
| `canvas` | HTMLCanvasElement     | The backing canvas       |
| `gl`     | WebGLRenderingContext | The webgl context        |
| `config` | RenderConfiguration   | The render configuration |
| `data`   | DataStore             | The data to render       |
| `scene?` | Scene                 | The scene object         |

**Returns:** _WebGLGraphRenderer_

### `Private` \_\_destroyed

• **\_\_destroyed**: _boolean_ = false

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:87

### `Private` \_camera

• **\_camera**: _Camera_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:79

### `Private` \_data

• **\_data**: _DataStore_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:93

### `Private` \_dataDomain

• **\_dataDomain**: _Bounds3D_ = DEFAULT_DATA_DOMAIN

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:67

### `Private` \_engineTime

• **\_engineTime**: _number_ = 0

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:83

### `Private` \_hoveredVertex

• **\_hoveredVertex**: _Node | undefined_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:66

### `Private` \_kickoffDeferred

• **\_kickoffDeferred**: _Deferred<void>_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:71

### `Private` \_lastRenderTime

• **\_lastRenderTime**: _number_ = -1

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:84

### `Private` \_onDirtyEvent

• **\_onDirtyEvent**: _Subject<void>_ = new Subject<void>()

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:61

### `Private` \_onInitializeHandlers

• **\_onInitializeHandlers**: _Array<InitializeHandler>_ = []

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:70

### `Private` \_onLoad

• **\_onLoad**: _Subject<void>_ = new Subject<void>()

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:63

### `Private` \_onResize

• **\_onResize**: _Subject<void>_ = new Subject<void>()

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:62

### `Private` \_onVertexClickEvent

• **\_onVertexClickEvent**: _Subject<undefined | Node>_ = new Subject<Node | undefined>()

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:64

### `Private` \_onVertexHoveredEvent

• **\_onVertexHoveredEvent**: _Subject<undefined | Node>_ = new Subject<Node | undefined>()

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:65

### `Private` \_scene

• **\_scene**: _Scene_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:78

### `Private` \_startTime

• **\_startTime**: _number_ = Date.now()

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:85

### `Private` animationLoop

• **animationLoop**: _AnimationLoop_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:76

### `Private` animationLoopRunning

• **animationLoopRunning**: _boolean_ = false

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:88

### `Private` animationProps

• **animationProps**: _any_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:77

### `Private` animationUtil

• **animationUtil**: _AnimationUtil_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:89

### `Readonly` canvas

• **canvas**: _HTMLCanvasElement_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:106

The backing canvas

### config

• **config**: _RenderConfiguration_

_Implementation of void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:108

The render configuration

### `Private` edges

• **edges**: _EdgesRenderable_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:81

### gl

• **gl**: _WebGLRenderingContext_

_Implementation of void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:107

The webgl context

### `Private` initialized

• **initialized**: _boolean_ = false

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:73

### `Private` kickoff

• **kickoff**: _boolean_ = false

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:72

### `Private` nodes

• **nodes**: _NodesRenderable_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:82

### camera

• **camera**:

_Implementation of void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:236

Gets the camera

### destroyed

• **destroyed**:

_Implementation of void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:229

Gets whether or not the renderere is destroyed

### graph

• **graph**:

_Implementation of void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:219

Returns the underlying graph structure

### onDirty

• **onDirty**:

_Implementation of void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:245

Subscribe to dirty changes

### onLoad

• **onLoad**:

_Implementation of void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:263

Subscribe to loads()

### onResize

• **onResize**:

_Implementation of void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:254

Subscribe to resizes

### onVertexClick

• **onVertexClick**:

_Implementation of void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:283

Observable for when a vertex is clicked on

### onVertexHover

• **onVertexHover**:

_Implementation of void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:291

Observable for when a vertex is hovered over

### scene

• **scene**:

_Implementation of void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:299

Gets the scene, on which nodes and edges can be added

### view

• **view**:

_Implementation of void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:307

Returns the canvas behind the graph renderer

### awaitKickoff

▸ **awaitKickoff**(): _Promise<void>_

_Implementation of void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:598

Returns a promise that is resolved before the first render

**Returns:** _Promise<void>_

### changePositions

▸ **changePositions**(`newPositions`: PositionMap, `duration`: number): _void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:339

Changes the position of the given nodes

**`deprecated`** since the nodestore shares memory with the renderer, this should no longer be necessary

**Parameters:**

| Name           | Type        | Default | Description                                                   |
| -------------- | ----------- | ------- | ------------------------------------------------------------- |
| `newPositions` | PositionMap | -       | The new positions of the nodes                                |
| `duration`     | number      | 0       | The optional duration for how long the transition should take |

**Returns:** _void_

### `Private` computeDomain

▸ **computeDomain**(): _Bounds3D_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:649

Computes the domain of the data

**Returns:** _Bounds3D_

### `Private` computeWeightToPixel

▸ **computeWeightToPixel**(`bounds`: Bounds3D): _number_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:670

Computes the weight (0 -> 1) to pixel scale

**Parameters:**

| Name     | Type     |
| -------- | -------- |
| `bounds` | Bounds3D |

**Returns:** _number_

### destroy

▸ **destroy**(): _void_

_Implementation of void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:607

Destroy's the graph renderer

**Returns:** _void_

### engineTime

▸ **engineTime**(): _number_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:92

Returns the current engine time for animation tweening

**Returns:** _number_

### `Private` handlePrimitivesChanged

▸ **handlePrimitivesChanged**(): _void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:640

Handler for when the graphical primitives has changed somehow

**Returns:** _void_

### `Private` handleStoreUpdated

▸ **handleStoreUpdated**(`type`: symbol, `store`: ReaderStore<any>): _void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:623

Handler when the store has been updated

**Parameters:**

| Name    | Type             | Description                        |
| ------- | ---------------- | ---------------------------------- |
| `type`  | symbol           | The type of store that was updated |
| `store` | ReaderStore<any> | The new store                      |

**Returns:** _void_

### load

▸ **load**(`data`: GraphContainer, `colorizer?`: Colorizer): _void_

_Implementation of void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:319

Loads the given graph into the renderer

**Parameters:**

| Name         | Type           | Description                                                 |
| ------------ | -------------- | ----------------------------------------------------------- |
| `data`       | GraphContainer | The graph to load                                           |
| `colorizer?` | Colorizer      | The colorizer function which determines the color of a node |

**Returns:** _void_

### makeDirty

▸ **makeDirty**(): _void_

_Implementation of void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:438

Makes the graph renderer "dirty", so on the next render it will repaint itself

**Returns:** _void_

### onInitialize

▸ **onInitialize**(`initializeHandler`: InitializeHandler): _void_

_Implementation of void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:271

Add an initialization callback

**Parameters:**

| Name                | Type              |
| ------------------- | ----------------- |
| `initializeHandler` | InitializeHandler |

**Returns:** _void_

### render

▸ **render**(`delta?`: undefined | number): _number_

_Implementation of void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:528

Renders the graph

**Parameters:**

| Name     | Type                    | Description                                                                                                |
| -------- | ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| `delta?` | undefined &#124; number | The optional _engine time_ diff since the last render, changing this will speed up or slow down animations |

**Returns:** _number_

The delta, either computed or the parameter passed to the function

### resize

▸ **resize**(`width`: number, `height`: number): _void_

_Implementation of void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:389

Resizes the renderer

**Parameters:**

| Name     | Type   | Description              |
| -------- | ------ | ------------------------ |
| `width`  | number | The width of the canvas  |
| `height` | number | The height of the canvas |

**Returns:** _void_

### start

▸ **start**(): _void_

_Implementation of void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:506

Starts the animation loop

**Returns:** _void_

### stop

▸ **stop**(): _void_

_Implementation of void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:516

Stops the animation loop

**Returns:** _void_

### updateWeights

▸ **updateWeights**(): _Bounds3D_

_Implementation of void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:496

Updates the weights in the graph

**Returns:** _Bounds3D_

### zoomToGraph

▸ **zoomToGraph**(`duration`: number): _void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:451

A wrapper around camera.viewBounds to ensure that the currently loaded graph is in view

**Parameters:**

| Name       | Type   | Default | Description                                              |
| ---------- | ------ | ------- | -------------------------------------------------------- |
| `duration` | number | 0       | The amount of time to take transitioning to the new view |

**Returns:** _void_

### zoomToViewport

▸ **zoomToViewport**(`duration`: number): _void_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:474

A wrapper around camera.viewBounds to match the viewport

**Parameters:**

| Name       | Type   | Default | Description                                              |
| ---------- | ------ | ------- | -------------------------------------------------------- |
| `duration` | number | 0       | The amount of time to take transitioning to the new view |

**Returns:** _void_

### `Static` createInstance

▸ **createInstance**(`options`: Partial<RenderConfigurationOptions>): _WebGLGraphRenderer_

Defined in renderer/src/renderer/WebGLGraphRenderer.ts:178

Creates a new instance of the GraphRenderer

**Parameters:**

| Name      | Type                                | Default | Description                              |
| --------- | ----------------------------------- | ------- | ---------------------------------------- |
| `options` | Partial<RenderConfigurationOptions> | {}      | The options for the render configuration |

**Returns:** _WebGLGraphRenderer_

---

### "renderer/delegates/Interpolator"

• **"renderer/delegates/Interpolator"**:

Defined in renderer/src/renderer/delegates/Interpolator.ts:1

### Interpolator

• **Interpolator**:

Defined in renderer/src/renderer/delegates/Interpolator.ts:5

### constructor

\+ **new Interpolator**(`_interpolationTime`: number): _Interpolator_

Defined in renderer/src/renderer/delegates/Interpolator.ts:8

Constructor

**Parameters:**

| Name                 | Type   |
| -------------------- | ------ |
| `_interpolationTime` | number |

**Returns:** _Interpolator_

### `Private` \_current

• **\_current**: _number_ = 0

Defined in renderer/src/renderer/delegates/Interpolator.ts:7

### `Private` \_frameTime

• **\_frameTime**: _number_ = 0

Defined in renderer/src/renderer/delegates/Interpolator.ts:6

### `Private` \_interpolationTime

• **\_interpolationTime**: _number_

Defined in renderer/src/renderer/delegates/Interpolator.ts:14

### `Private` \_target

• **\_target**: _number_ = 1

Defined in renderer/src/renderer/delegates/Interpolator.ts:8

### current

• **current**:

Defined in renderer/src/renderer/delegates/Interpolator.ts:27

Defined in renderer/src/renderer/delegates/Interpolator.ts:34

Gets the current value of the interpolator
Sets the current value of the interpolator

### interpolationTime

• **interpolationTime**:

Defined in renderer/src/renderer/delegates/Interpolator.ts:62

Defined in renderer/src/renderer/delegates/Interpolator.ts:69

Gets the interpolation time
Sets the interpolation time

### isComplete

• **isComplete**:

Defined in renderer/src/renderer/delegates/Interpolator.ts:55

Gets whether or not interpolation is complete

### target

• **target**:

Defined in renderer/src/renderer/delegates/Interpolator.ts:41

Defined in renderer/src/renderer/delegates/Interpolator.ts:48

Gets the target value of the interpolator
Sets the target value of the interpolator

### reset

▸ **reset**(): _void_

Defined in renderer/src/renderer/delegates/Interpolator.ts:19

Resets the interpolation state

**Returns:** _void_

### tick

▸ **tick**(`time`: number): _void_

Defined in renderer/src/renderer/delegates/Interpolator.ts:77

Updates the interpolation state based on the current time

**Parameters:**

| Name   | Type   | Description      |
| ------ | ------ | ---------------- |
| `time` | number | The current time |

**Returns:** _void_

---

### "renderer/delegates/Scenegraph"

• **"renderer/delegates/Scenegraph"**:

Defined in renderer/src/renderer/delegates/Scenegraph.ts:1

---

### "renderer/delegates/TypeStore"

• **"renderer/delegates/TypeStore"**:

Defined in renderer/src/renderer/delegates/TypeStore.ts:1

### GenericTypeStore

• **GenericTypeStore**:

Defined in renderer/src/renderer/delegates/TypeStore.ts:10

A symbol-mapping data retriever

### `Private` \_handlers

• **\_handlers**: _RegisterHandler<T>[]_ = []

Defined in renderer/src/renderer/delegates/TypeStore.ts:12

### `Private` \_items

• **\_items**: _Map<symbol, T>_ = new Map()

Defined in renderer/src/renderer/delegates/TypeStore.ts:11

### `Private` destroyed

• **destroyed**: _boolean_ = false

Defined in renderer/src/renderer/delegates/TypeStore.ts:13

### destroy

▸ **destroy**(): _void_

_Implementation of void_

Defined in renderer/src/renderer/delegates/TypeStore.ts:37

Destroys the data manager

**Returns:** _void_

### onRegister

▸ **onRegister**(`handler`: RegisterHandler<T>): _(Anonymous function)_

_Implementation of void_

Defined in renderer/src/renderer/delegates/TypeStore.ts:26

**Parameters:**

| Name      | Type               |
| --------- | ------------------ |
| `handler` | RegisterHandler<T> |

**Returns:** _(Anonymous function)_

### register

▸ **register**(`type`: symbol, `store`: T): _void_

_Implementation of void_

Defined in renderer/src/renderer/delegates/TypeStore.ts:15

**Parameters:**

| Name    | Type   |
| ------- | ------ |
| `type`  | symbol |
| `store` | T      |

**Returns:** _void_

### retrieve

▸ **retrieve**(`type`: symbol): _T | undefined_

_Implementation of void_

Defined in renderer/src/renderer/delegates/TypeStore.ts:22

**Parameters:**

| Name   | Type   |
| ------ | ------ |
| `type` | symbol |

**Returns:** _T | undefined_

---

### "renderer/delegates/camera/Camera"

• **"renderer/delegates/camera/Camera"**:

Defined in renderer/src/renderer/delegates/camera/Camera.ts:1

### Camera

• **Camera**:

Defined in renderer/src/renderer/delegates/camera/Camera.ts:19

Maintains Camera State for Graph Renderer

### constructor

\+ **new Camera**(): _Camera_

Defined in renderer/src/renderer/delegates/camera/Camera.ts:34

Constructor for the Camera

**Returns:** _Camera_

### `Private` \_fov

• **\_fov**: _number_ = DEFAULT_FOV

Defined in renderer/src/renderer/delegates/camera/Camera.ts:21

### `Private` \_isUserMoving

• **\_isUserMoving**: _boolean_ = false

Defined in renderer/src/renderer/delegates/camera/Camera.ts:22

### `Private` \_onMovingComplete

• **\_onMovingComplete**: _Subject<unknown>_ = new Subject()

Defined in renderer/src/renderer/delegates/camera/Camera.ts:23

### `Private` \_projectionSettings

• **\_projectionSettings**: _any_ = {
aspect: 1,
near: 0.1,
far: 1000,
fov: DEFAULT_FOV,
} as any

Defined in renderer/src/renderer/delegates/camera/Camera.ts:24

### `Private` \_state

• **\_state**: _TransitioningCameraState_

Defined in renderer/src/renderer/delegates/camera/Camera.ts:34

The current camera state

### projection

• **projection**: _Matrix4<>_ = new Matrix4()

Defined in renderer/src/renderer/delegates/camera/Camera.ts:20

### isMoving

• **isMoving**:

Defined in renderer/src/renderer/delegates/camera/Camera.ts:186

Returns true if the camera is currently moving (either via transitions or user activity)

### position

• **position**:

Defined in renderer/src/renderer/delegates/camera/Camera.ts:137

Defined in renderer/src/renderer/delegates/camera/Camera.ts:144

Gets the current position of the camera
Sets the current position of the camera

### rotation

• **rotation**:

Defined in renderer/src/renderer/delegates/camera/Camera.ts:151

Defined in renderer/src/renderer/delegates/camera/Camera.ts:158

Gets the current rotation (3d or 2d) based on the is3D configuration
Sets the current rotation (3d or 2d) based on the is3D configuration

### beginUser

▸ **beginUser**(): _void_

Defined in renderer/src/renderer/delegates/camera/Camera.ts:165

Function indicating that a user is currently moving the camera

**Returns:** _void_

### computeViewMatrix

▸ **computeViewMatrix**(`rotation`: boolean): _Matrix4_

Defined in renderer/src/renderer/delegates/camera/Camera.ts:124

Gets the view matrix representing the current position and rotation of the camera

**Parameters:**

| Name       | Type    | Default | Description                                       |
| ---------- | ------- | ------- | ------------------------------------------------- |
| `rotation` | boolean | false   | True if the rotation component should be included |

**Returns:** _Matrix4_

### endUser

▸ **endUser**(): _void_

Defined in renderer/src/renderer/delegates/camera/Camera.ts:172

Function indicating that a user is done moving the camera

**Returns:** _void_

### fov

▸ **fov**(): _number_

Defined in renderer/src/renderer/delegates/camera/Camera.ts:116

Gets the field of view of the camera

**Returns:** _number_

### moveTo

▸ **moveTo**(`x`: number, `y`: number, `z`: number, `duration`: number): _void_

Defined in renderer/src/renderer/delegates/camera/Camera.ts:103

Moves the camera to the given coordinates

**Parameters:**

| Name       | Type   | Default | Description                    |
| ---------- | ------ | ------- | ------------------------------ |
| `x`        | number | -       | The x coordinate of the camera |
| `y`        | number | -       | The y coordinate of the camera |
| `z`        | number | -       | The z coordinate of the camera |
| `duration` | number | 0       | -                              |

**Returns:** _void_

### onMovingComplete

▸ **onMovingComplete**(`handler`: function): _Subscription_

Defined in renderer/src/renderer/delegates/camera/Camera.ts:202

Event that is fired when moving is complete

**Parameters:**

▪ **handler**: _function_

The handler to call when moving is complete

▸ (): _any_

**Returns:** _Subscription_

### resize

▸ **resize**(`width`: number, `height`: number): _void_

Defined in renderer/src/renderer/delegates/camera/Camera.ts:71

Resizes the camera

**Parameters:**

| Name     | Type   | Description               |
| -------- | ------ | ------------------------- |
| `width`  | number | The width of the display  |
| `height` | number | The height of the display |

**Returns:** _void_

### tick

▸ **tick**(`time`: number): _void_

Defined in renderer/src/renderer/delegates/camera/Camera.ts:194

Ticks the camera, so it can transition from state to state smoothly

**Parameters:**

| Name   | Type   | Description      |
| ------ | ------ | ---------------- |
| `time` | number | The current time |

**Returns:** _void_

### `Private` transitionToState

▸ **transitionToState**(`newState`: CameraState, `duration`: number): _void_

Defined in renderer/src/renderer/delegates/camera/Camera.ts:211

Transitions to the given state

**Parameters:**

| Name       | Type        | Description          |
| ---------- | ----------- | -------------------- |
| `newState` | CameraState | -                    |
| `duration` | number      | The duration to take |

**Returns:** _void_

### viewBounds

▸ **viewBounds**(`bounds`: Bounds, `duration`: number): _void_

Defined in renderer/src/renderer/delegates/camera/Camera.ts:81

Updates the camera such that the given bounds is what will be displayed on screen

**Parameters:**

| Name       | Type   | Default | Description                         |
| ---------- | ------ | ------- | ----------------------------------- |
| `bounds`   | Bounds | -       | The bounds of the view              |
| `duration` | number | 0       | How long the transition should take |

**Returns:** _void_

---

### "renderer/delegates/camera/CameraState"

• **"renderer/delegates/camera/CameraState"**:

Defined in renderer/src/renderer/delegates/camera/CameraState.ts:1

---

### "renderer/delegates/camera/TransitioningCameraState"

• **"renderer/delegates/camera/TransitioningCameraState"**:

Defined in renderer/src/renderer/delegates/camera/TransitioningCameraState.ts:1

---

### "renderer/delegates/camera/computeState"

• **"renderer/delegates/camera/computeState"**:

Defined in renderer/src/renderer/delegates/camera/computeState.ts:1

---

### "renderer/delegates/camera/index"

• **"renderer/delegates/camera/index"**:

Defined in renderer/src/renderer/delegates/camera/index.ts:1

### Camera

• **Camera**:

---

### "renderer/delegates/index"

• **"renderer/delegates/index"**:

Defined in renderer/src/renderer/delegates/index.ts:1

### Camera

• **Camera**:

### Interpolator

• **Interpolator**:

### createDataStore

• **createDataStore**:

---

### "renderer/delegates/stores"

• **"renderer/delegates/stores"**:

Defined in renderer/src/renderer/delegates/stores.ts:1

### createDataStore

▸ **createDataStore**(`nodeCountHint`: number | undefined, `edgeCountHint`: number | undefined, `notifications`: boolean): _DataStore_

Defined in renderer/src/renderer/delegates/stores.ts:22

Constructs a generic data store with node and edge stores

**Parameters:**

| Name            | Type                    | Default | Description                                    |
| --------------- | ----------------------- | ------- | ---------------------------------------------- |
| `nodeCountHint` | number &#124; undefined | -       | The number of nodes                            |
| `edgeCountHint` | number &#124; undefined | -       | The number of edges                            |
| `notifications` | boolean                 | true    | If the stores should emit update notifications |

**Returns:** _DataStore_

A datastore containing node and edge stores

---

### "renderer/index"

• **"renderer/index"**:

Defined in renderer/src/renderer/index.ts:1

### WebGLGraphRenderer

• **WebGLGraphRenderer**:

---

### "types/camera"

• **"types/camera"**:

Defined in renderer/src/types/camera.ts:1

### CameraAdjustmentMode

• **CameraAdjustmentMode**:

Defined in renderer/src/types/camera.ts:5

### Graph

• **Graph**:

Defined in renderer/src/types/camera.ts:9

Camera is automatically adjusted to fit the graph to the window

### None

• **None**:

Defined in renderer/src/types/camera.ts:20

Camera is not adjusted automatically

### Viewport

• **Viewport**:

Defined in renderer/src/types/camera.ts:15

Camera is adjusted such that the graph coordinate space is a 1 to 1 mapping of the coordinate space to pixel space
i.e. A node at (1000, 1000) will show up at (1000, 1000) on the screen

---

### "types/data"

• **"types/data"**:

Defined in renderer/src/types/data.ts:1

### Bounds2D

• **Bounds2D**:

Defined in renderer/src/types/data.ts:53

### x

• **x**: _NumberRange_

Defined in renderer/src/types/data.ts:57

Represents the bounds in the x direction

### y

• **y**: _NumberRange_

Defined in renderer/src/types/data.ts:62

Represents the bounds in the y direction

### Bounds3D

• **Bounds3D**:

Defined in renderer/src/types/data.ts:65

### x

• **x**: _NumberRange_

_Inherited from void_

Defined in renderer/src/types/data.ts:57

Represents the bounds in the x direction

### y

• **y**: _NumberRange_

_Inherited from void_

Defined in renderer/src/types/data.ts:62

Represents the bounds in the y direction

### z

• **z**: _NumberRange_

Defined in renderer/src/types/data.ts:69

Represents the bounds in the z direction

### NumberRange

• **NumberRange**:

Defined in renderer/src/types/data.ts:41

### max

• **max**: _number_

Defined in renderer/src/types/data.ts:50

The maximum value of the range

### min

• **min**: _number_

Defined in renderer/src/types/data.ts:45

The minimum value of the range

### TypeStore

• **TypeStore**:

Defined in renderer/src/types/data.ts:12

A generic store for storing "types" of items

### destroy

▸ **destroy**(): _void_

Defined in renderer/src/types/data.ts:36

Destroys the data manager

**Returns:** _void_

### onRegister

▸ **onRegister**(`handler`: RegisterHandler<T>): _function_

Defined in renderer/src/types/data.ts:25

Adds a handler for when a type store is registered

**Parameters:**

| Name      | Type               | Description        |
| --------- | ------------------ | ------------------ |
| `handler` | RegisterHandler<T> | The handler to add |

**Returns:** _function_

A unsubscribe function

▸ (): _void_

### register

▸ **register**(`type`: symbol, `item`: T): _void_

Defined in renderer/src/types/data.ts:18

Registers a primitive store with the data manager

**Parameters:**

| Name   | Type   | Description               |
| ------ | ------ | ------------------------- |
| `type` | symbol | the render primitive type |
| `item` | T      | -                         |

**Returns:** _void_

### retrieve

▸ **retrieve**(`type`: symbol): _T | undefined_

Defined in renderer/src/types/data.ts:31

Gets the data associated with the given primitive type

**Parameters:**

| Name   | Type   | Description        |
| ------ | ------ | ------------------ |
| `type` | symbol | The primitive type |

**Returns:** _T | undefined_

### Bounds

Ƭ **Bounds**: _Bounds2D & Partial<Bounds3D>_

Defined in renderer/src/types/data.ts:75

A generic set of bounds

### DataStore

Ƭ **DataStore**: _TypeStore<ReaderStore<any>>_

Defined in renderer/src/types/data.ts:39

### RegisterHandler

Ƭ **RegisterHandler**: _function_

Defined in renderer/src/types/data.ts:7

#### Type declaration:

▸ (`type`: symbol, `item`: T): _any_

**Parameters:**

| Name   | Type   |
| ------ | ------ |
| `type` | symbol |
| `item` | T      |

---

### "types/graph/graphData"

• **"types/graph/graphData"**:

Defined in renderer/src/types/graph/graphData.ts:1

### VisualDimensions

• **VisualDimensions**:

Defined in renderer/src/types/graph/graphData.ts:5

### ThreeD

• **ThreeD**: = "3D"

Defined in renderer/src/types/graph/graphData.ts:7

### TwoD

• **TwoD**: = "2D"

Defined in renderer/src/types/graph/graphData.ts:6

### PositionMap

• **PositionMap**:

Defined in renderer/src/types/graph/graphData.ts:18

A mapping between a key and a position object

### ColorVector

Ƭ **ColorVector**: _[number, number, number, number]_

Defined in renderer/src/types/graph/graphData.ts:13

A WebGL RGBA color vector. Each slot contains a float value from 0-1.

### Colorizer

Ƭ **Colorizer**: _function_

Defined in renderer/src/types/graph/graphData.ts:27

Provides a color for the given input community

**`param`** The key

**`returns`** A color in the form of [r, g, b, a]

#### Type declaration:

▸ (`input`: number): _[number, number, number, number]_

**Parameters:**

| Name    | Type   |
| ------- | ------ |
| `input` | number |

---

### "types/graph/index"

• **"types/graph/index"**:

Defined in renderer/src/types/graph/index.ts:1

### ColorVector

• **ColorVector**:

### Colorizer

• **Colorizer**:

### GraphRenderer

• **GraphRenderer**:

### InitializeHandler

• **InitializeHandler**:

### PositionMap

• **PositionMap**:

### RenderConfiguration

• **RenderConfiguration**:

### RenderConfigurationOptions

• **RenderConfigurationOptions**:

### Scene

• **Scene**:

### UsesWebGL

• **UsesWebGL**:

### VisualDimensions

• **VisualDimensions**:

### Point3D

• **Point3D**:

Defined in renderer/src/types/graph/index.ts:10

Represents a point in 3D space

### x

• **x**: _number_

Defined in renderer/src/types/graph/index.ts:11

### y

• **y**: _number_

Defined in renderer/src/types/graph/index.ts:12

### z

• **z**: _number_

Defined in renderer/src/types/graph/index.ts:13

### Disconnect

Ƭ **Disconnect**: _function_

Defined in renderer/src/types/graph/index.ts:5

#### Type declaration:

▸ (): _void_

---

### "types/graph/renderer"

• **"types/graph/renderer"**:

Defined in renderer/src/types/graph/renderer.ts:1

### GraphRenderer

• **GraphRenderer**:

Defined in renderer/src/types/graph/renderer.ts:252

Renderer for rendering a graph

### `Readonly` camera

• **camera**: _Camera_

Defined in renderer/src/types/graph/renderer.ts:256

Gets the camera

### config

• **config**: _RenderConfiguration_

Defined in renderer/src/types/graph/renderer.ts:271

Gets the current render configuration

### `Readonly` destroyed

• **destroyed**: _boolean_

Defined in renderer/src/types/graph/renderer.ts:261

Gets whether or not the renderer has been destroyed

### `Readonly` graph

• **graph**: _GraphContainer_

Defined in renderer/src/types/graph/renderer.ts:266

Returns the underlying graph structure

### `Readonly` onDirty

• **onDirty**: _Observable<void>_

Defined in renderer/src/types/graph/renderer.ts:277

Subscribe to dirty changes

**`param`**

### `Readonly` onLoad

• **onLoad**: _Observable<void>_

Defined in renderer/src/types/graph/renderer.ts:283

Subscribe to data loads

**`param`**

### `Readonly` onResize

• **onResize**: _Observable<void>_

Defined in renderer/src/types/graph/renderer.ts:289

Subscribe to resizes

**`param`**

### onVertexClick

• **onVertexClick**: _Observable<Node | undefined>_

Defined in renderer/src/types/graph/renderer.ts:294

Observable for when a vertex is clicked on

### onVertexHover

• **onVertexHover**: _Observable<Node | undefined>_

Defined in renderer/src/types/graph/renderer.ts:299

Observable for when a vertex is hovered over

### scene

• **scene**: _Scene_

Defined in renderer/src/types/graph/renderer.ts:304

Gets the scene, on which nodes and edges can be added

### view

• **view**: _HTMLElement_

Defined in renderer/src/types/graph/renderer.ts:309

Returns the canvas behind the graph renderer

### awaitKickoff

▸ **awaitKickoff**(): _Promise<void>_

Defined in renderer/src/types/graph/renderer.ts:388

Returns a promise that is resolved before the first render

**Returns:** _Promise<void>_

### changePositions

▸ **changePositions**(`newPositions`: PositionMap, `duration?`: undefined | number): _void_

Defined in renderer/src/types/graph/renderer.ts:337

Changes the position of the given nodes

**Parameters:**

| Name           | Type                    | Description                                                   |
| -------------- | ----------------------- | ------------------------------------------------------------- |
| `newPositions` | PositionMap             | The new positions of the nodes                                |
| `duration?`    | undefined &#124; number | The optional duration for how long the transition should take |

**Returns:** _void_

### destroy

▸ **destroy**(): _void_

Defined in renderer/src/types/graph/renderer.ts:393

Destroy's the graph renderer

**Returns:** _void_

### load

▸ **load**(`data`: GraphContainer, `colorizer?`: Colorizer): _void_

Defined in renderer/src/types/graph/renderer.ts:330

Loads the given graph into the renderer

**Parameters:**

| Name         | Type           | Description                                                 |
| ------------ | -------------- | ----------------------------------------------------------- |
| `data`       | GraphContainer | The graph to load                                           |
| `colorizer?` | Colorizer      | The colorizer function which determines the color of a node |

**Returns:** _void_

### makeDirty

▸ **makeDirty**(): _void_

Defined in renderer/src/types/graph/renderer.ts:349

Makes the graph renderer "dirty", so on the next render it will repaint itself

**Returns:** _void_

### onInitialize

▸ **onInitialize**(`initializeHandler`: InitializeHandler): _void_

Defined in renderer/src/types/graph/renderer.ts:321

Add an initialization callback

**Parameters:**

| Name                | Type              |
| ------------------- | ----------------- |
| `initializeHandler` | InitializeHandler |

**Returns:** _void_

### render

▸ **render**(`delta?`: undefined | number): _number_

Defined in renderer/src/types/graph/renderer.ts:383

Renders the graph

**Parameters:**

| Name     | Type                    | Description                                                                                                |
| -------- | ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| `delta?` | undefined &#124; number | The optional _engine time_ diff since the last render, changing this will speed up or slow down animations |

**Returns:** _number_

The delta, either computed or the parameter passed to the function

### resize

▸ **resize**(`width`: number, `height`: number): _void_

Defined in renderer/src/types/graph/renderer.ts:344

Resizes the renderer

**Parameters:**

| Name     | Type   | Description              |
| -------- | ------ | ------------------------ |
| `width`  | number | The width of the canvas  |
| `height` | number | The height of the canvas |

**Returns:** _void_

### start

▸ **start**(): _void_

Defined in renderer/src/types/graph/renderer.ts:371

Starts the animation loop

**Returns:** _void_

### stop

▸ **stop**(): _void_

Defined in renderer/src/types/graph/renderer.ts:376

Stops the animation loop

**Returns:** _void_

### updateWeights

▸ **updateWeights**(): _void_

Defined in renderer/src/types/graph/renderer.ts:366

Updates the weights in the graph

**Returns:** _void_

### zoomToGraph

▸ **zoomToGraph**(`duration?`: undefined | number): _void_

Defined in renderer/src/types/graph/renderer.ts:355

A wrapper around camera.viewBounds to ensure that the currently loaded graph is in view

**Parameters:**

| Name        | Type                    | Description                                              |
| ----------- | ----------------------- | -------------------------------------------------------- |
| `duration?` | undefined &#124; number | The amount of time to take transitioning to the new view |

**Returns:** _void_

### zoomToViewport

▸ **zoomToViewport**(`duration?`: undefined | number): _void_

Defined in renderer/src/types/graph/renderer.ts:361

A wrapper around camera.viewBounds to match the viewport

**Parameters:**

| Name        | Type                    | Description                                              |
| ----------- | ----------------------- | -------------------------------------------------------- |
| `duration?` | undefined &#124; number | The amount of time to take transitioning to the new view |

**Returns:** _void_

### RenderConfiguration

• **RenderConfiguration**:

Defined in renderer/src/types/graph/renderer.ts:178

Represents a set of configuration options to control the graph renderer

### autoBind

• **autoBind**: _boolean_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:172

If true, when nodes/edges are dynamically changed, the data will automatically be rebound to the renderer

### backgroundColor

• **backgroundColor**: _ColorVector_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:20

The background color of the renderer

### cameraAdjustmentMode

• **cameraAdjustmentMode**: _CameraAdjustmentMode_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:167

The camera mode to use

### cornerAxes

• **cornerAxes**: _boolean_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:25

If true, the axes will be shown in the corner

### drawAxes

• **drawAxes**: _boolean_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:30

If true, the axes will be drawn

### drawEdges

• **drawEdges**: _boolean_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:35

If true, the edges will be drawn

### drawNodes

• **drawNodes**: _boolean_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:40

If true, the nodes will be drawn

### edgeAlpha

• **edgeAlpha**: _number_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:45

The opacity to apply to the edges, 0 (fully transparent) -> 1 (fully opaque)

### edgeAntialias

• **edgeAntialias**: _boolean_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:50

If true, edges will be antialiased

### edgeConstantWidth

• **edgeConstantWidth**: _boolean_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:55

If true, edges will be drawn with a constant width, regardless of zoom

### edgeCountHint

• **edgeCountHint**: _number_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:152

Provides a hint to the renderer about how many edges are expected
so data buffers can be preallocated with the optimal size, default = 10000

### edgeDepthWrite

• **edgeDepthWrite**: _boolean_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:60

If true, edges closer to the camera will occlude further edges

### edgeFilteredInSaturation

• **edgeFilteredInSaturation**: _number_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:65

The saturation of edges which are _in_ the filtered set

### edgeFilteredOutSaturation

• **edgeFilteredOutSaturation**: _number_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:70

The saturation of edges which are _not in_ the filtered set

### edgeMaxWidth

• **edgeMaxWidth**: _number_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:75

The maximum width of the edges

### edgeMinWidth

• **edgeMinWidth**: _number_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:80

The minimum width of the edges

### height

• **height**: _number_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:162

The height of the canvas, default = 500

### hideDeselected

• **hideDeselected**: _boolean_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:85

If true, non-selected vertices will be hidden

### hideEdgesOnMove

• **hideEdgesOnMove**: _boolean_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:90

If true, edges will be hidden while the user is panning/zooming

### hideNodesOnMove

• **hideNodesOnMove**: _boolean_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:95

If true, nodes will be hidden while the user is panning/zooming

### hoverHighlightColor

• **hoverHighlightColor**: _ColorVector_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:100

The default color to highlight nodes when they are hovered

### interpolationTime

• **interpolationTime**: _number_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:105

The amount of time to transition between 3d mode and 2d mode

### is3D

• **is3D**: _boolean_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:110

If true, the graph should be rendered in 3d

### nodeCountHint

• **nodeCountHint**: _number_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:146

Provides a hint to the renderer about how many nodes are expected
so data buffers can be preallocated with the optimal size, default = 10000

### nodeFilteredIds

• **nodeFilteredIds**: _string[] | undefined_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:115

The set of filtered node ids

### nodeFilteredInSaturation

• **nodeFilteredInSaturation**: _number_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:120

The saturation of nodes which are _in_ the filtered set

### nodeFilteredOutSaturation

• **nodeFilteredOutSaturation**: _number_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:125

The saturation of nodes which are _not in_ the filtered set

### nodeMaxRadius

• **nodeMaxRadius**: _number_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:130

The maximum radius of the nodes

### nodeMinRadius

• **nodeMinRadius**: _number_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:135

The minimum radius of the nodes

### nodeOutline

• **nodeOutline**: _boolean_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:140

If true, nodes will be drawn with an outline

### width

• **width**: _number_

_Inherited from void_

Defined in renderer/src/types/graph/renderer.ts:157

The width of the canvas, default = 500

### copy

▸ **copy**(): _RenderConfigurationOptions_

Defined in renderer/src/types/graph/renderer.ts:233

**Returns:** _RenderConfigurationOptions_

### load

▸ **load**(`options`: Partial<RenderConfigurationOptions>): _void_

Defined in renderer/src/types/graph/renderer.ts:234

**Parameters:**

| Name      | Type                                |
| --------- | ----------------------------------- |
| `options` | Partial<RenderConfigurationOptions> |

**Returns:** _void_

### onBackgroundColorChanged

▸ **onBackgroundColorChanged**(`handler`: PropertyChangeHandler<ColorVector>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:179

**Parameters:**

| Name      | Type                               |
| --------- | ---------------------------------- |
| `handler` | PropertyChangeHandler<ColorVector> |

**Returns:** _Subscription_

### onCameraAdjustmentModeChanged

▸ **onCameraAdjustmentModeChanged**(`handler`: PropertyChangeHandler<CameraAdjustmentMode>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:230

**Parameters:**

| Name      | Type                                        |
| --------- | ------------------------------------------- |
| `handler` | PropertyChangeHandler<CameraAdjustmentMode> |

**Returns:** _Subscription_

### onCornerAxesChanged

▸ **onCornerAxesChanged**(`handler`: PropertyChangeHandler<boolean>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:202

**Parameters:**

| Name      | Type                           |
| --------- | ------------------------------ |
| `handler` | PropertyChangeHandler<boolean> |

**Returns:** _Subscription_

### onDrawAxesChanged

▸ **onDrawAxesChanged**(`handler`: PropertyChangeHandler<boolean>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:203

**Parameters:**

| Name      | Type                           |
| --------- | ------------------------------ |
| `handler` | PropertyChangeHandler<boolean> |

**Returns:** _Subscription_

### onDrawEdgesChanged

▸ **onDrawEdgesChanged**(`handler`: PropertyChangeHandler<boolean>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:182

**Parameters:**

| Name      | Type                           |
| --------- | ------------------------------ |
| `handler` | PropertyChangeHandler<boolean> |

**Returns:** _Subscription_

### onDrawNodesChanged

▸ **onDrawNodesChanged**(`handler`: PropertyChangeHandler<boolean>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:186

**Parameters:**

| Name      | Type                           |
| --------- | ------------------------------ |
| `handler` | PropertyChangeHandler<boolean> |

**Returns:** _Subscription_

### onEdgeAlphaChanged

▸ **onEdgeAlphaChanged**(`handler`: PropertyChangeHandler<number>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:195

**Parameters:**

| Name      | Type                          |
| --------- | ----------------------------- |
| `handler` | PropertyChangeHandler<number> |

**Returns:** _Subscription_

### onEdgeAntialiasChanged

▸ **onEdgeAntialiasChanged**(`handler`: PropertyChangeHandler<boolean>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:196

**Parameters:**

| Name      | Type                           |
| --------- | ------------------------------ |
| `handler` | PropertyChangeHandler<boolean> |

**Returns:** _Subscription_

### onEdgeConstantWidthChanged

▸ **onEdgeConstantWidthChanged**(`handler`: PropertyChangeHandler<boolean>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:191

**Parameters:**

| Name      | Type                           |
| --------- | ------------------------------ |
| `handler` | PropertyChangeHandler<boolean> |

**Returns:** _Subscription_

### onEdgeCountHintChanged

▸ **onEdgeCountHintChanged**(`handler`: PropertyChangeHandler<number>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:227

**Parameters:**

| Name      | Type                          |
| --------- | ----------------------------- |
| `handler` | PropertyChangeHandler<number> |

**Returns:** _Subscription_

### onEdgeDepthWriteChanged

▸ **onEdgeDepthWriteChanged**(`handler`: PropertyChangeHandler<boolean>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:194

**Parameters:**

| Name      | Type                           |
| --------- | ------------------------------ |
| `handler` | PropertyChangeHandler<boolean> |

**Returns:** _Subscription_

### onEdgeFilteredInSaturationChanged

▸ **onEdgeFilteredInSaturationChanged**(`handler`: PropertyChangeHandler<number>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:214

**Parameters:**

| Name      | Type                          |
| --------- | ----------------------------- |
| `handler` | PropertyChangeHandler<number> |

**Returns:** _Subscription_

### onEdgeFilteredOutSaturationChanged

▸ **onEdgeFilteredOutSaturationChanged**(`handler`: PropertyChangeHandler<number>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:211

**Parameters:**

| Name      | Type                          |
| --------- | ----------------------------- |
| `handler` | PropertyChangeHandler<number> |

**Returns:** _Subscription_

### onEdgeMaxWidthChanged

▸ **onEdgeMaxWidthChanged**(`handler`: PropertyChangeHandler<number>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:198

**Parameters:**

| Name      | Type                          |
| --------- | ----------------------------- |
| `handler` | PropertyChangeHandler<number> |

**Returns:** _Subscription_

### onEdgeMinWidthChanged

▸ **onEdgeMinWidthChanged**(`handler`: PropertyChangeHandler<number>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:197

**Parameters:**

| Name      | Type                          |
| --------- | ----------------------------- |
| `handler` | PropertyChangeHandler<number> |

**Returns:** _Subscription_

### onHeightChanged

▸ **onHeightChanged**(`handler`: PropertyChangeHandler<number>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:229

**Parameters:**

| Name      | Type                          |
| --------- | ----------------------------- |
| `handler` | PropertyChangeHandler<number> |

**Returns:** _Subscription_

### onHideDeselectedChanged

▸ **onHideDeselectedChanged**(`handler`: PropertyChangeHandler<boolean>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:190

**Parameters:**

| Name      | Type                           |
| --------- | ------------------------------ |
| `handler` | PropertyChangeHandler<boolean> |

**Returns:** _Subscription_

### onHideEdgesOnMoveChanged

▸ **onHideEdgesOnMoveChanged**(`handler`: PropertyChangeHandler<boolean>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:183

**Parameters:**

| Name      | Type                           |
| --------- | ------------------------------ |
| `handler` | PropertyChangeHandler<boolean> |

**Returns:** _Subscription_

### onHideNodesOnMoveChanged

▸ **onHideNodesOnMoveChanged**(`handler`: PropertyChangeHandler<boolean>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:187

**Parameters:**

| Name      | Type                           |
| --------- | ------------------------------ |
| `handler` | PropertyChangeHandler<boolean> |

**Returns:** _Subscription_

### onHoverHighlightColorChanged

▸ **onHoverHighlightColorChanged**(`handler`: PropertyChangeHandler<number[]>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:207

**Parameters:**

| Name      | Type                            |
| --------- | ------------------------------- |
| `handler` | PropertyChangeHandler<number[]> |

**Returns:** _Subscription_

### onInterpolationTimeChanged

▸ **onInterpolationTimeChanged**(`handler`: PropertyChangeHandler<number>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:204

**Parameters:**

| Name      | Type                          |
| --------- | ----------------------------- |
| `handler` | PropertyChangeHandler<number> |

**Returns:** _Subscription_

### onIs3DChanged

▸ **onIs3DChanged**(`handler`: PropertyChangeHandler<boolean>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:210

**Parameters:**

| Name      | Type                           |
| --------- | ------------------------------ |
| `handler` | PropertyChangeHandler<boolean> |

**Returns:** _Subscription_

### onNodeCountHintChanged

▸ **onNodeCountHintChanged**(`handler`: PropertyChangeHandler<number>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:226

**Parameters:**

| Name      | Type                          |
| --------- | ----------------------------- |
| `handler` | PropertyChangeHandler<number> |

**Returns:** _Subscription_

### onNodeFilteredIdsChanged

▸ **onNodeFilteredIdsChanged**(`handler`: PropertyChangeHandler<string[] | undefined>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:223

**Parameters:**

| Name      | Type                                             |
| --------- | ------------------------------------------------ |
| `handler` | PropertyChangeHandler<string[] &#124; undefined> |

**Returns:** _Subscription_

### onNodeFilteredInSaturationChanged

▸ **onNodeFilteredInSaturationChanged**(`handler`: PropertyChangeHandler<number>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:220

**Parameters:**

| Name      | Type                          |
| --------- | ----------------------------- |
| `handler` | PropertyChangeHandler<number> |

**Returns:** _Subscription_

### onNodeFilteredOutSaturationChanged

▸ **onNodeFilteredOutSaturationChanged**(`handler`: PropertyChangeHandler<number>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:217

**Parameters:**

| Name      | Type                          |
| --------- | ----------------------------- |
| `handler` | PropertyChangeHandler<number> |

**Returns:** _Subscription_

### onNodeMaxRadiusChanged

▸ **onNodeMaxRadiusChanged**(`handler`: PropertyChangeHandler<number>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:200

**Parameters:**

| Name      | Type                          |
| --------- | ----------------------------- |
| `handler` | PropertyChangeHandler<number> |

**Returns:** _Subscription_

### onNodeMinRadiusChanged

▸ **onNodeMinRadiusChanged**(`handler`: PropertyChangeHandler<number>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:199

**Parameters:**

| Name      | Type                          |
| --------- | ----------------------------- |
| `handler` | PropertyChangeHandler<number> |

**Returns:** _Subscription_

### onNodeOutlineChanged

▸ **onNodeOutlineChanged**(`handler`: PropertyChangeHandler<boolean>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:201

**Parameters:**

| Name      | Type                           |
| --------- | ------------------------------ |
| `handler` | PropertyChangeHandler<boolean> |

**Returns:** _Subscription_

### onWidthChanged

▸ **onWidthChanged**(`handler`: PropertyChangeHandler<number>): _Subscription_

Defined in renderer/src/types/graph/renderer.ts:228

**Parameters:**

| Name      | Type                          |
| --------- | ----------------------------- |
| `handler` | PropertyChangeHandler<number> |

**Returns:** _Subscription_

### RenderConfigurationOptions

• **RenderConfigurationOptions**:

Defined in renderer/src/types/graph/renderer.ts:16

The set of graph renderer configuration options

### autoBind

• **autoBind**: _boolean_

Defined in renderer/src/types/graph/renderer.ts:172

If true, when nodes/edges are dynamically changed, the data will automatically be rebound to the renderer

### backgroundColor

• **backgroundColor**: _ColorVector_

Defined in renderer/src/types/graph/renderer.ts:20

The background color of the renderer

### cameraAdjustmentMode

• **cameraAdjustmentMode**: _CameraAdjustmentMode_

Defined in renderer/src/types/graph/renderer.ts:167

The camera mode to use

### cornerAxes

• **cornerAxes**: _boolean_

Defined in renderer/src/types/graph/renderer.ts:25

If true, the axes will be shown in the corner

### drawAxes

• **drawAxes**: _boolean_

Defined in renderer/src/types/graph/renderer.ts:30

If true, the axes will be drawn

### drawEdges

• **drawEdges**: _boolean_

Defined in renderer/src/types/graph/renderer.ts:35

If true, the edges will be drawn

### drawNodes

• **drawNodes**: _boolean_

Defined in renderer/src/types/graph/renderer.ts:40

If true, the nodes will be drawn

### edgeAlpha

• **edgeAlpha**: _number_

Defined in renderer/src/types/graph/renderer.ts:45

The opacity to apply to the edges, 0 (fully transparent) -> 1 (fully opaque)

### edgeAntialias

• **edgeAntialias**: _boolean_

Defined in renderer/src/types/graph/renderer.ts:50

If true, edges will be antialiased

### edgeConstantWidth

• **edgeConstantWidth**: _boolean_

Defined in renderer/src/types/graph/renderer.ts:55

If true, edges will be drawn with a constant width, regardless of zoom

### edgeCountHint

• **edgeCountHint**: _number_

Defined in renderer/src/types/graph/renderer.ts:152

Provides a hint to the renderer about how many edges are expected
so data buffers can be preallocated with the optimal size, default = 10000

### edgeDepthWrite

• **edgeDepthWrite**: _boolean_

Defined in renderer/src/types/graph/renderer.ts:60

If true, edges closer to the camera will occlude further edges

### edgeFilteredInSaturation

• **edgeFilteredInSaturation**: _number_

Defined in renderer/src/types/graph/renderer.ts:65

The saturation of edges which are _in_ the filtered set

### edgeFilteredOutSaturation

• **edgeFilteredOutSaturation**: _number_

Defined in renderer/src/types/graph/renderer.ts:70

The saturation of edges which are _not in_ the filtered set

### edgeMaxWidth

• **edgeMaxWidth**: _number_

Defined in renderer/src/types/graph/renderer.ts:75

The maximum width of the edges

### edgeMinWidth

• **edgeMinWidth**: _number_

Defined in renderer/src/types/graph/renderer.ts:80

The minimum width of the edges

### height

• **height**: _number_

Defined in renderer/src/types/graph/renderer.ts:162

The height of the canvas, default = 500

### hideDeselected

• **hideDeselected**: _boolean_

Defined in renderer/src/types/graph/renderer.ts:85

If true, non-selected vertices will be hidden

### hideEdgesOnMove

• **hideEdgesOnMove**: _boolean_

Defined in renderer/src/types/graph/renderer.ts:90

If true, edges will be hidden while the user is panning/zooming

### hideNodesOnMove

• **hideNodesOnMove**: _boolean_

Defined in renderer/src/types/graph/renderer.ts:95

If true, nodes will be hidden while the user is panning/zooming

### hoverHighlightColor

• **hoverHighlightColor**: _ColorVector_

Defined in renderer/src/types/graph/renderer.ts:100

The default color to highlight nodes when they are hovered

### interpolationTime

• **interpolationTime**: _number_

Defined in renderer/src/types/graph/renderer.ts:105

The amount of time to transition between 3d mode and 2d mode

### is3D

• **is3D**: _boolean_

Defined in renderer/src/types/graph/renderer.ts:110

If true, the graph should be rendered in 3d

### nodeCountHint

• **nodeCountHint**: _number_

Defined in renderer/src/types/graph/renderer.ts:146

Provides a hint to the renderer about how many nodes are expected
so data buffers can be preallocated with the optimal size, default = 10000

### nodeFilteredIds

• **nodeFilteredIds**: _string[] | undefined_

Defined in renderer/src/types/graph/renderer.ts:115

The set of filtered node ids

### nodeFilteredInSaturation

• **nodeFilteredInSaturation**: _number_

Defined in renderer/src/types/graph/renderer.ts:120

The saturation of nodes which are _in_ the filtered set

### nodeFilteredOutSaturation

• **nodeFilteredOutSaturation**: _number_

Defined in renderer/src/types/graph/renderer.ts:125

The saturation of nodes which are _not in_ the filtered set

### nodeMaxRadius

• **nodeMaxRadius**: _number_

Defined in renderer/src/types/graph/renderer.ts:130

The maximum radius of the nodes

### nodeMinRadius

• **nodeMinRadius**: _number_

Defined in renderer/src/types/graph/renderer.ts:135

The minimum radius of the nodes

### nodeOutline

• **nodeOutline**: _boolean_

Defined in renderer/src/types/graph/renderer.ts:140

If true, nodes will be drawn with an outline

### width

• **width**: _number_

Defined in renderer/src/types/graph/renderer.ts:157

The width of the canvas, default = 500

### UsesWebGL

• **UsesWebGL**:

Defined in renderer/src/types/graph/renderer.ts:242

An interface indicating that a renderer uses WebGL

### `Readonly` gl

• **gl**: _WebGLRenderingContext_

Defined in renderer/src/types/graph/renderer.ts:246

Returns the webgl context

### InitializeHandler

Ƭ **InitializeHandler**: _function_

Defined in renderer/src/types/graph/renderer.ts:237

#### Type declaration:

▸ (`context`: any): _void_

**Parameters:**

| Name      | Type |
| --------- | ---- |
| `context` | any  |

---

### "types/graph/scene"

• **"types/graph/scene"**:

Defined in renderer/src/types/graph/scene.ts:1

### Scene

• **Scene**:

Defined in renderer/src/types/graph/scene.ts:12

Represents a collection of primitives/renderables that are rendered
on the graph

### needsRedraw

• **needsRedraw**: _boolean_

Defined in renderer/src/types/graph/scene.ts:16

Whether or not the scene needs a redraw

### add

▸ **add**(`primitives`: Primitive | Primitive[]): _void_

Defined in renderer/src/types/graph/scene.ts:22

Adds the list of primitives to the scene

**Parameters:**

| Name         | Type                         | Description                   |
| ------------ | ---------------------------- | ----------------------------- |
| `primitives` | Primitive &#124; Primitive[] | The list of primitives to add |

**Returns:** _void_

### addRenderable

▸ **addRenderable**(`renderable`: Renderable, `doubleBuffered?`: undefined | false | true): _void_

Defined in renderer/src/types/graph/scene.ts:59

Adds a renderable object that will be added to the rendering pipeline

**Parameters:**

| Name              | Type                               | Description                                 |
| ----------------- | ---------------------------------- | ------------------------------------------- |
| `renderable`      | Renderable                         | The renderable to add                       |
| `doubleBuffered?` | undefined &#124; false &#124; true | If the renderable should be double buffered |

**Returns:** _void_

### clear

▸ **clear**(): _void_

Defined in renderer/src/types/graph/scene.ts:33

Clears the set of primitives loaded into the scene

**Returns:** _void_

### edges

▸ **edges**(): _Iterable<Edge>_

Defined in renderer/src/types/graph/scene.ts:47

Gets the list of edges contained in the scene

**Returns:** _Iterable<Edge>_

### getPrimitives

▸ **getPrimitives**‹**T**›(`ids`: Set<string>): _Iterable<Primitive>_

Defined in renderer/src/types/graph/scene.ts:52

Returns the primitives with the given ids

**Type parameters:**

▪ **T**

**Parameters:**

| Name  | Type        |
| ----- | ----------- |
| `ids` | Set<string> |

**Returns:** _Iterable<Primitive>_

### nodes

▸ **nodes**(): _Iterable<Node>_

Defined in renderer/src/types/graph/scene.ts:42

Returns the list of nodes in the scene

**Returns:** _Iterable<Node>_

### primitives

▸ **primitives**(): _Iterable<Primitive>_

Defined in renderer/src/types/graph/scene.ts:38

Gets the list of primitives contained in the scene

**Returns:** _Iterable<Primitive>_

### remove

▸ **remove**(`primitive`: Primitive): _void_

Defined in renderer/src/types/graph/scene.ts:28

Removes the given primitive from the sene

**Parameters:**

| Name        | Type      | Description             |
| ----------- | --------- | ----------------------- |
| `primitive` | Primitive | The primitive to remove |

**Returns:** _void_

### removeRenderable

▸ **removeRenderable**(`renderable`: Renderable): _void_

Defined in renderer/src/types/graph/scene.ts:65

Removes a renderable object from the rendering pipeline

**Parameters:**

| Name         | Type       | Description              |
| ------------ | ---------- | ------------------------ |
| `renderable` | Renderable | The renderable to remove |

**Returns:** _void_

### resize

▸ **resize**(`width`: number, `height`: number): _void_

Defined in renderer/src/types/graph/scene.ts:72

Tells the scene that a resize has occurred

**Parameters:**

| Name     | Type   | Description             |
| -------- | ------ | ----------------------- |
| `width`  | number | The width of the scene  |
| `height` | number | The height of the scene |

**Returns:** _void_

---

### "types/index"

• **"types/index"**:

Defined in renderer/src/types/index.ts:1

### Bounds

• **Bounds**:

### Bounds2D

• **Bounds2D**:

### Bounds3D

• **Bounds3D**:

### CameraAdjustmentMode

• **CameraAdjustmentMode**:

### ColorVector

• **ColorVector**:

### Colorizer

• **Colorizer**:

### DataStore

• **DataStore**:

### Disconnect

• **Disconnect**:

### GraphRenderer

• **GraphRenderer**:

### InitializeHandler

• **InitializeHandler**:

### NumberRange

• **NumberRange**:

### Point3D

• **Point3D**:

### Position

• **Position**:

### PositionMap

• **PositionMap**:

### Primitive

• **Primitive**:

### PrimitivesChangedHandler

• **PrimitivesChangedHandler**:

### RegisterHandler

• **RegisterHandler**:

### RenderConfiguration

• **RenderConfiguration**:

### RenderConfigurationOptions

• **RenderConfigurationOptions**:

### RenderOptions

• **RenderOptions**:

### Renderable

• **Renderable**:

### Scene

• **Scene**:

### TypeStore

• **TypeStore**:

### UsesWebGL

• **UsesWebGL**:

### VisualDimensions

• **VisualDimensions**:

---

### "types/internal/index"

• **"types/internal/index"**:

Defined in renderer/src/types/internal/index.ts:1

### Position

• **Position**:

### Primitive

• **Primitive**:

### PrimitivesChangedHandler

• **PrimitivesChangedHandler**:

### RenderOptions

• **RenderOptions**:

### Renderable

• **Renderable**:

---

### "types/internal/primitives"

• **"types/internal/primitives"**:

Defined in renderer/src/types/internal/primitives.ts:1

### Primitive

Ƭ **Primitive**: _MemoryReader & object_

Defined in renderer/src/types/internal/primitives.ts:7

---

### "types/internal/renderables"

• **"types/internal/renderables"**:

Defined in renderer/src/types/internal/renderables.ts:1

### Position

• **Position**:

Defined in renderer/src/types/internal/renderables.ts:10

A 3d position

### x

• **x**: _number_

Defined in renderer/src/types/internal/renderables.ts:11

### y

• **y**: _number_

Defined in renderer/src/types/internal/renderables.ts:12

### z

• **z**: _number_

Defined in renderer/src/types/internal/renderables.ts:13

### RenderOptions

• **RenderOptions**:

Defined in renderer/src/types/internal/renderables.ts:19

The set of options used while rendering

### Renderable

• **Renderable**:

Defined in renderer/src/types/internal/renderables.ts:99

### enabled

• **enabled**: _boolean_

Defined in renderer/src/types/internal/renderables.ts:100

### needsRedraw

• **needsRedraw**: _boolean_

Defined in renderer/src/types/internal/renderables.ts:101

### `Optional` destroy

▸ **destroy**(): _void_

Defined in renderer/src/types/internal/renderables.ts:104

**Returns:** _void_

### draw

▸ **draw**(`options`: RenderOptions): _void_

Defined in renderer/src/types/internal/renderables.ts:102

**Parameters:**

| Name      | Type          |
| --------- | ------------- |
| `options` | RenderOptions |

**Returns:** _void_

### resize

▸ **resize**(`width`: number, `height`: number): _void_

Defined in renderer/src/types/internal/renderables.ts:103

**Parameters:**

| Name     | Type   |
| -------- | ------ |
| `width`  | number |
| `height` | number |

**Returns:** _void_

---

### "types/internal/scene"

• **"types/internal/scene"**:

Defined in renderer/src/types/internal/scene.ts:1

### PrimitivesChangedHandler

Ƭ **PrimitivesChangedHandler**: _function_

Defined in renderer/src/types/internal/scene.ts:5

#### Type declaration:

▸ (): _any_

---

### "util/Properties"

• **"util/Properties"**:

Defined in renderer/src/util/Properties.ts:1

### PropertyChangeHandler

Ƭ **PropertyChangeHandler**: _function_

Defined in renderer/src/util/Properties.ts:8

#### Type declaration:

▸ (`newValue`: T): _void_

**Parameters:**

| Name       | Type |
| ---------- | ---- |
| `newValue` | T    |

### PropertyChangeValidator

Ƭ **PropertyChangeValidator**: _function_

Defined in renderer/src/util/Properties.ts:9

#### Type declaration:

▸ (`newValue`: T): _boolean_

**Parameters:**

| Name       | Type |
| ---------- | ---- |
| `newValue` | T    |

---

### "util/adaptMemoryLayoutToLuma"

• **"util/adaptMemoryLayoutToLuma"**:

Defined in renderer/src/util/adaptMemoryLayoutToLuma.ts:1

---

### "util/colorizeRenderer"

• **"util/colorizeRenderer"**:

Defined in renderer/src/util/colorizeRenderer.ts:1

### colorizeRenderer

▸ **colorizeRenderer**(`renderer`: GraphRenderer, `colorizerFn?`: Colorizer): _void_

Defined in renderer/src/util/colorizeRenderer.ts:25

Applies a colorizer function to the graph renderer

**Parameters:**

| Name           | Type          | Description                               |
| -------------- | ------------- | ----------------------------------------- |
| `renderer`     | GraphRenderer | The renderer to colorize                  |
| `colorizerFn?` | Colorizer     | The function to use to color the renderer |

**Returns:** _void_

---

### "util/equality"

• **"util/equality"**:

Defined in renderer/src/util/equality.ts:1

### areColorsEqual

▸ **areColorsEqual**(`a`: number[], `b`: number[]): _boolean_

Defined in renderer/src/util/equality.ts:5

**Parameters:**

| Name | Type     |
| ---- | -------- |
| `a`  | number[] |
| `b`  | number[] |

**Returns:** _boolean_

---

### "util/fastDebounce"

• **"util/fastDebounce"**:

Defined in renderer/src/util/fastDebounce.ts:1

### fastDebounce

▸ **fastDebounce**(`callback`: function, `delay`: number): _(Anonymous function)_

Defined in renderer/src/util/fastDebounce.ts:5

**Parameters:**

▪ **callback**: _function_

▸ (): _any_

▪`Default value` **delay**: _number_= 100

**Returns:** _(Anonymous function)_

---

### "util/getColor"

• **"util/getColor"**:

Defined in renderer/src/util/getColor.ts:1

### getColor

▸ **getColor**(`colorMap`: Map<number, number>, `colorizer`: function, `key`: number): _number_

Defined in renderer/src/util/getColor.ts:5

**Parameters:**

▪ **colorMap**: _Map<number, number>_

▪ **colorizer**: _function_

▸ (`key`: number): _number_

**Parameters:**

| Name  | Type   |
| ----- | ------ |
| `key` | number |

▪`Default value` **key**: _number_= 0

**Returns:** _number_

---

### "util/ids"

• **"util/ids"**:

Defined in renderer/src/util/ids.ts:1

### createIdFactory

▸ **createIdFactory**(`seedString`: string): _function_

Defined in renderer/src/util/ids.ts:5

**Parameters:**

| Name         | Type   |
| ------------ | ------ |
| `seedString` | string |

**Returns:** _function_

▸ (): _string_

---

### "util/index"

• **"util/index"**:

Defined in renderer/src/util/index.ts:1

### PropertyChangeHandler

• **PropertyChangeHandler**:

### PropertyChangeValidator

• **PropertyChangeValidator**:

### areColorsEqual

• **areColorsEqual**:

### colorizeRenderer

• **colorizeRenderer**:

### createIdFactory

• **createIdFactory**:

### fastDebounce

• **fastDebounce**:

### getColor

• **getColor**:

### lerp3

• **lerp3**:

### slerp

• **slerp**:

---

### "util/lerp3"

• **"util/lerp3"**:

Defined in renderer/src/util/lerp3.ts:1

### lerp3

▸ **lerp3**(`start`: Vector3, `end`: Vector3, `interpolation`: number): _Vector3_

Defined in renderer/src/util/lerp3.ts:13

Linear interpolates between two Vector3 objects

**Parameters:**

| Name            | Type    | Description                   |
| --------------- | ------- | ----------------------------- |
| `start`         | Vector3 | The start value               |
| `end`           | Vector3 | The end value                 |
| `interpolation` | number  | The interpolation value 0 - 1 |

**Returns:** _Vector3_

---

### "util/slerp"

• **"util/slerp"**:

Defined in renderer/src/util/slerp.ts:1

### slerp

▸ **slerp**(`current`: Quaternion, `next`: Quaternion, `interpolation`: number): _Quaternion_

Defined in renderer/src/util/slerp.ts:13

Spherically interpolates the camera rotation between the 2D view and the 3D view

**Parameters:**

| Name            | Type       | Description                   |
| --------------- | ---------- | ----------------------------- |
| `current`       | Quaternion | The current value             |
| `next`          | Quaternion | The next value                |
| `interpolation` | number     | The interpolation value 0 - 1 |

**Returns:** _Quaternion_
