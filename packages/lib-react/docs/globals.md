[@graspologic/react](README.md) › [Globals](globals.md)

# @graspologic/react

## Index

### Modules

- ["Axes/Axes"]()
- ["Axes/hooks/useAxesRenderable"]()
- ["Axes/index"]()
- ["Camera/Camera"]()
- ["Camera/hooks/useCameraAdjustmentMode"]()
- ["Camera/hooks/useCameraBounds"]()
- ["Camera/hooks/usePanZoomBehavior"]()
- ["Camera/hooks/useZoomSynchronization"]()
- ["Camera/index"]()
- ["Edges/Edges"]()
- ["Edges/index"]()
- ["GraphView/GraphView"]()
- ["GraphView/context"]()
- ["GraphView/hooks/use3DMode"]()
- ["GraphView/hooks/useGraphColorizer"]()
- ["GraphView/hooks/useGraphContainer"]()
- ["GraphView/hooks/useGraphHideDeselected"]()
- ["GraphView/hooks/useGraphImperativeApi"]()
- ["GraphView/hooks/useGraphInterpolationTime"]()
- ["GraphView/hooks/useGraphRenderKickoff"]()
- ["GraphView/hooks/useGraphRenderer"]()
- ["GraphView/hooks/useGraphRendererBackgroundColor"]()
- ["GraphView/index"]()
- ["HandleNodeClicks/HandleNodeClicks"]()
- ["HandleNodeClicks/hooks/useVertexClickEvents"]()
- ["HandleNodeClicks/hooks/useVertexClickHandler"]()
- ["HandleNodeClicks/index"]()
- ["HandleNodeClicks/types"]()
- ["HighlightHoveredNode/HighlightHoveredNode"]()
- ["HighlightHoveredNode/hooks/useHoveredVertexRenderable"]()
- ["HighlightHoveredNode/index"]()
- ["LabelHoveredNode/LabelHoveredNode"]()
- ["LabelHoveredNode/hooks/useHoveredVertexRenderable"]()
- ["LabelHoveredNode/index"]()
- ["NodeSetHighlight/NodeSetHighlight"]()
- ["NodeSetHighlight/hooks/useVertexSelectionSynchronization"]()
- ["NodeSetHighlight/hooks/useVertexSetHighlightRenderable"]()
- ["NodeSetHighlight/index"]()
- ["NodeSetLabel/NodeSetLabel"]()
- ["NodeSetLabel/hooks/useVertexSelectionSynchronization"]()
- ["NodeSetLabel/hooks/useVertexSetLabelRenderable"]()
- ["NodeSetLabel/index"]()
- ["Nodes/Nodes"]()
- ["Nodes/index"]()
- ["SizedToParent/SizedToParent"]()
- ["SizedToParent/index"]()
- ["index"]()

## Modules

### "Axes/Axes"

• **"Axes/Axes"**:

Defined in Axes/Axes.ts:1

### AxesProps

• **AxesProps**:

Defined in Axes/Axes.ts:14

The properties for the Axes component

### `Optional` inCorner

• **inCorner**? : _undefined | false | true_

Defined in Axes/Axes.ts:23

A flag indicating whether to draw the axes in the corner. default=true

### `Optional` shown

• **shown**? : _undefined | false | true_

Defined in Axes/Axes.ts:18

A flag indicating whether to show the axes. default=true

### `Const` Axes

• **Axes**: _React.FC<AxesProps>_ = memo(
({ shown = DEFAULT_DRAW_AXES, inCorner = DEFAULT_CORNER_AXES }) => {
const renderer = useContext(GraphRendererContext)
useAxesRenderable(renderer)

    	useEffect(() => {
    		if (renderer) {
    			renderer.config.cornerAxes = inCorner
    		}
    	}, [renderer, inCorner])

    	useEffect(() => {
    		if (renderer) {
    			renderer.config.drawAxes = shown
    		}
    	}, [renderer, shown])

    	return null
    },

)

Defined in Axes/Axes.ts:29

Display's a set of Axes on the graph renderer

---

### "Axes/hooks/useAxesRenderable"

• **"Axes/hooks/useAxesRenderable"**:

Defined in Axes/hooks/useAxesRenderable.ts:1

### useAxesRenderable

▸ **useAxesRenderable**(`renderer`: GraphRenderer & object | undefined): _AxesRenderable | undefined_

Defined in Axes/hooks/useAxesRenderable.ts:12

Adds an AxesRenderable to **renderer** which will display a set of Axes on the renderer.

**Parameters:**

| Name       | Type                                    | Description        |
| ---------- | --------------------------------------- | ------------------ |
| `renderer` | GraphRenderer & object &#124; undefined | The graph renderer |

**Returns:** _AxesRenderable | undefined_

---

### "Axes/index"

• **"Axes/index"**:

Defined in Axes/index.ts:1

### Axes

• **Axes**:

### AxesProps

• **AxesProps**:

---

### "Camera/Camera"

• **"Camera/Camera"**:

Defined in Camera/Camera.ts:1

### CameraProps

• **CameraProps**:

Defined in Camera/Camera.ts:18

The properties for the Camera component

### `Optional` bounds

• **bounds**? : _Bounds_

Defined in Camera/Camera.ts:34

The bounds to view with the camera

### `Optional` doubleClickZoom

• **doubleClickZoom**? : _undefined | false | true_

Defined in Camera/Camera.ts:52

If true, double clicking on the graph will zoom the camera

**`defaultvalue`** true

### `Optional` interactive

• **interactive**? : _undefined | false | true_

Defined in Camera/Camera.ts:29

Can user's adjust the camera manually

**`defaultvalue`** true

### `Optional` mode

• **mode**? : _CameraAdjustmentMode_

Defined in Camera/Camera.ts:45

The adjustment mode for the camera, controls how the camera will automatically move

**`defaultvalue`** [[CameraAdjustmentMode.Default]]

### `Optional` transitionDuration

• **transitionDuration**? : _undefined | number_

Defined in Camera/Camera.ts:39

The length of time to take to transition to the new bounds (if the bounds property is provided)

### `Optional` zoom

• **zoom**? : _undefined | number_

Defined in Camera/Camera.ts:23

Optional: The declarative z value of the camera. Zoomed out = -1000, Zoomed in = 0

**`defaultvalue`** 0

### `Const` Camera

• **Camera**: _React.FC<CameraProps>_ = memo(
({
bounds,
transitionDuration,
zoom,
mode = CameraAdjustmentMode.Graph,
interactive = true,
doubleClickZoom = true,
}) => {
const renderer = useContext(GraphRendererContext)
// Override mode if bounds is passed in
useCameraAdjustmentMode(renderer, bounds ? CameraAdjustmentMode.None : mode)
useCameraBounds(renderer, bounds, transitionDuration)
usePanZoomBehavior(renderer, interactive, doubleClickZoom)
useZoomSynchronization(renderer, zoom)
return null
},
)

Defined in Camera/Camera.ts:58

Adds an adjustable camera to the current GraphRenderer

---

### "Camera/hooks/useCameraAdjustmentMode"

• **"Camera/hooks/useCameraAdjustmentMode"**:

Defined in Camera/hooks/useCameraAdjustmentMode.ts:1

### useCameraAdjustmentMode

▸ **useCameraAdjustmentMode**(`renderer`: GraphRenderer | undefined, `mode`: CameraAdjustmentMode): _void_

Defined in Camera/hooks/useCameraAdjustmentMode.ts:13

Updates **renderer** to use **mode** as it's CameraAdjustmentMode

**Parameters:**

| Name       | Type                           | Default                   | Description     |
| ---------- | ------------------------------ | ------------------------- | --------------- |
| `renderer` | GraphRenderer &#124; undefined | -                         | The renderer    |
| `mode`     | CameraAdjustmentMode           | CameraAdjustmentMode.None | The camera mode |

**Returns:** _void_

---

### "Camera/hooks/useCameraBounds"

• **"Camera/hooks/useCameraBounds"**:

Defined in Camera/hooks/useCameraBounds.ts:1

### useCameraBounds

▸ **useCameraBounds**(`renderer`: GraphRenderer | undefined, `bounds?`: Bounds, `transitionDuration?`: undefined | number): _void_

Defined in Camera/hooks/useCameraBounds.ts:14

Updates the renderer's camera to use **bounds** as it's bounds

**Parameters:**

| Name                  | Type                           | Description                                                                     |
| --------------------- | ------------------------------ | ------------------------------------------------------------------------------- |
| `renderer`            | GraphRenderer &#124; undefined | The graph renderer                                                              |
| `bounds?`             | Bounds                         | The new bounds                                                                  |
| `transitionDuration?` | undefined &#124; number        | The time to take to transition between the camera's old position to the new one |

**Returns:** _void_

---

### "Camera/hooks/usePanZoomBehavior"

• **"Camera/hooks/usePanZoomBehavior"**:

Defined in Camera/hooks/usePanZoomBehavior.ts:1

### usePanZoomBehavior

▸ **usePanZoomBehavior**(`renderer`: GraphRenderer | undefined, `interactive`: boolean, `doubleClickZoom`: boolean): _void_

Defined in Camera/hooks/usePanZoomBehavior.ts:18

Enables pan-zoom behavior on **renderer** of **interactive** is true

**Parameters:**

| Name              | Type                           | Description                                             |
| ----------------- | ------------------------------ | ------------------------------------------------------- |
| `renderer`        | GraphRenderer &#124; undefined | The renderer                                            |
| `interactive`     | boolean                        | If true, the pan-zoom behavior should be enabled        |
| `doubleClickZoom` | boolean                        | If true, the double click zoom behavior will be enabled |

**Returns:** _void_

---

### "Camera/hooks/useZoomSynchronization"

• **"Camera/hooks/useZoomSynchronization"**:

Defined in Camera/hooks/useZoomSynchronization.ts:1

### useZoomSynchronization

▸ **useZoomSynchronization**(`renderer`: GraphRenderer | undefined, `zoom`: number | undefined): _void_

Defined in Camera/hooks/useZoomSynchronization.ts:13

Adjusts the zoom on **renderer** when **zoom** changes

**Parameters:**

| Name       | Type                           | Description    |
| ---------- | ------------------------------ | -------------- |
| `renderer` | GraphRenderer &#124; undefined | The renderer   |
| `zoom`     | number &#124; undefined        | The zoom level |

**Returns:** _void_

---

### "Camera/index"

• **"Camera/index"**:

Defined in Camera/index.ts:1

### Camera

• **Camera**:

### CameraProps

• **CameraProps**:

---

### "Edges/Edges"

• **"Edges/Edges"**:

Defined in Edges/Edges.ts:1

### EdgesProps

• **EdgesProps**:

Defined in Edges/Edges.ts:24

The set of properties for the Edges component

### `Optional` alpha

• **alpha**? : _undefined | number_

Defined in Edges/Edges.ts:70

The transparency of the edges

**`defaultvalue`** [[DEFAULT_EDGE_ALPHA]]

### `Optional` antialias

• **antialias**? : _undefined | false | true_

Defined in Edges/Edges.ts:52

If true, the edges will be anti-aliased

**`defaultvalue`** [[DEFAULT_EDGE_ANTIALIAS]]

### `Optional` constantWidth

• **constantWidth**? : _undefined | false | true_

Defined in Edges/Edges.ts:40

If true, edges will remain a constant size regardless of the zoom level

**`defaultvalue`** [[DEFAULT_EDGE_CONSTANT_WIDTH]]

### `Optional` depthWrite

• **depthWrite**? : _undefined | false | true_

Defined in Edges/Edges.ts:46

If true, edges which are closer to the camera will occlude further away ones

**`defaultvalue`** [[DEFAULT_EDGE_DEPTH_WRITE]]

### `Optional` filteredInSaturation

• **filteredInSaturation**? : _undefined | number_

Defined in Edges/Edges.ts:82

The saturation of edges which are _in_ the filtered set

**`defaultvalue`** [[DEFAULT_EDGE_FILTERED_IN_SATURATION]]

### `Optional` filteredOutSaturation

• **filteredOutSaturation**? : _undefined | number_

Defined in Edges/Edges.ts:76

The saturation of edges which are _not in_ the filtered set

**`defaultvalue`** [[DEFAULT_EDGE_FILTERED_OUT_SATURATION]]

### `Optional` hideOnMove

• **hideOnMove**? : _undefined | false | true_

Defined in Edges/Edges.ts:34

If true, the edges will be hidden when the user is panning or zooming

### `Optional` maxWidth

• **maxWidth**? : _undefined | number_

Defined in Edges/Edges.ts:64

The maximum width of the edges

**`defaultvalue`** [[DEFAULT_EDGE_MAX_WIDTH]]

### `Optional` minWidth

• **minWidth**? : _undefined | number_

Defined in Edges/Edges.ts:58

The minimum width of the edges

**`defaultvalue`** [[DEFAULT_EDGE_MIN_WIDTH]]

### `Optional` shown

• **shown**? : _undefined | false | true_

Defined in Edges/Edges.ts:29

If true, edges will be shown

**`defaultvalue`** true

### `Const` Edges

• **Edges**: _React.FC<EdgesProps>_ = memo(
({
hideOnMove = DEFAULT_HIDE_EDGES_ON_MOVE,
shown = DEFAULT_DRAW_EDGES,
constantWidth = DEFAULT_EDGE_CONSTANT_WIDTH,
depthWrite = DEFAULT_EDGE_DEPTH_WRITE,
antialias = DEFAULT_EDGE_ANTIALIAS,
alpha = DEFAULT_EDGE_ALPHA,
minWidth = DEFAULT_EDGE_MIN_WIDTH,
maxWidth = DEFAULT_EDGE_MAX_WIDTH,
filteredOutSaturation = DEFAULT_EDGE_FILTERED_OUT_SATURATION,
filteredInSaturation = DEFAULT_EDGE_FILTERED_IN_SATURATION,
}) => {
const renderer = useContext(GraphRendererContext)

    	useEffect(() => {
    		if (renderer) {
    			renderer.config.drawEdges = shown
    		}
    	}, [renderer, shown])

    	useEffect(() => {
    		if (renderer) {
    			renderer.config.hideEdgesOnMove = hideOnMove
    		}
    	}, [renderer, hideOnMove])

    	useEffect(() => {
    		if (renderer) {
    			renderer.config.edgeConstantWidth = constantWidth
    		}
    	}, [renderer, constantWidth])

    	useEffect(() => {
    		if (renderer) {
    			renderer.config.edgeDepthWrite = depthWrite
    		}
    	}, [renderer, depthWrite])

    	useEffect(() => {
    		if (renderer) {
    			renderer.config.edgeAntialias = antialias
    		}
    	}, [renderer, antialias])

    	useEffect(() => {
    		if (renderer) {
    			renderer.config.edgeMinWidth = minWidth
    		}
    	}, [renderer, minWidth])

    	useEffect(() => {
    		if (renderer) {
    			renderer.config.edgeMaxWidth = maxWidth
    		}
    	}, [renderer, maxWidth])

    	useEffect(() => {
    		if (renderer) {
    			renderer.config.edgeAlpha = alpha
    		}
    	}, [renderer, alpha])

    	useEffect(() => {
    		if (renderer) {
    			renderer.config.edgeFilteredInSaturation = filteredInSaturation
    		}
    	}, [renderer, filteredInSaturation])

    	useEffect(() => {
    		if (renderer) {
    			renderer.config.edgeFilteredOutSaturation = filteredOutSaturation
    		}
    	}, [renderer, filteredOutSaturation])

    	return null
    },

)

Defined in Edges/Edges.ts:88

Configures the edge rendering for a GraphView

---

### "Edges/index"

• **"Edges/index"**:

Defined in Edges/index.ts:1

### Edges

• **Edges**:

### EdgesProps

• **EdgesProps**:

---

### "GraphView/GraphView"

• **"GraphView/GraphView"**:

Defined in GraphView/GraphView.tsx:1

### GraphViewProps

• **GraphViewProps**:

Defined in GraphView/GraphView.tsx:39

Graph view properties

### `Optional` backgroundColor

• **backgroundColor**? : _ColorVector_

Defined in GraphView/GraphView.tsx:54

The background color to use in the graph view

### `Optional` className

• **className**? : _undefined | string_

Defined in GraphView/GraphView.tsx:44

The CSS class name to inject into the containing div. The div will contain the canvas
where the graph will render into.

### `Optional` colorizer

• **colorizer**? : _Colorizer_

Defined in GraphView/GraphView.tsx:60

A colorization function to use for vertex coloring. `vertex.category` is applied against the
colorization function to generate a categorical color.

### data

• **data**: _InputGraph | GraphContainer_

Defined in GraphView/GraphView.tsx:65

The graph dataset

### `Optional` drawEdges

• **drawEdges**? : _undefined | false | true_

Defined in GraphView/GraphView.tsx:101

A boolean indicating whether or not to draw the edges

**`defaultvalue`** [[DEFAULT_DRAW_EDGES]]

### `Optional` edgeCountHint

• **edgeCountHint**? : _undefined | number_

Defined in GraphView/GraphView.tsx:95

A hint indicating the number of edges that are expected

**`defaultvalue`** 10000

### `Optional` hideDeselected

• **hideDeselected**? : _undefined | false | true_

Defined in GraphView/GraphView.tsx:71

If true, non-selected vertices will be hidden

**`defaultvalue`** [[DEFAULT_HIDE_DESELECTED]]

### `Optional` interpolationTime

• **interpolationTime**? : _undefined | number_

Defined in GraphView/GraphView.tsx:83

Interpolation time for animations (default=1000)

**`defaultvalue`** [[DEFAULT_INTERPOLATION_TIME]]

### `Optional` is3D

• **is3D**? : _undefined | false | true_

Defined in GraphView/GraphView.tsx:77

A flag indicating whether to render in 3D mode.

**`defaultvalue`** [[DEFAULT_IS_3D]]

### `Optional` nodeCountHint

• **nodeCountHint**? : _undefined | number_

Defined in GraphView/GraphView.tsx:89

A hint indicating the number of nodes that are expected

**`defaultvalue`** 10000

### `Optional` ref

• **ref**? : _React.Ref<GraphRenderer>_

Defined in GraphView/GraphView.tsx:106

A ref to the underlying GraphRenderer

### `Optional` style

• **style**? : _React.CSSProperties_

Defined in GraphView/GraphView.tsx:49

A CSS property object to be injected into the container div containing the graph rendering.

### `Const` GraphView

• **GraphView**: _React.FC<GraphViewProps>_ = memo(GraphViewRaw)

Defined in GraphView/GraphView.tsx:175

The GraphView component. This is the entry point for rendering graph data.

---

### "GraphView/context"

• **"GraphView/context"**:

Defined in GraphView/context.ts:1

### `Const` GraphRendererContext

• **GraphRendererContext**: _Context<undefined | GraphRenderer>_ = createContext<GraphRenderer | undefined>(
undefined,
)

Defined in GraphView/context.ts:8

---

### "GraphView/hooks/use3DMode"

• **"GraphView/hooks/use3DMode"**:

Defined in GraphView/hooks/use3DMode.ts:1

### use3DMode

▸ **use3DMode**(`renderer`: GraphRenderer | undefined, `is3D`: boolean): _void_

Defined in GraphView/hooks/use3DMode.ts:14

Enables/disables 3d on **renderer** based on **is3D**

**Parameters:**

| Name       | Type                           | Description                                |
| ---------- | ------------------------------ | ------------------------------------------ |
| `renderer` | GraphRenderer &#124; undefined | The renderer                               |
| `is3D`     | boolean                        | If true, the renderer will go into 3d mode |

**Returns:** _void_

---

### "GraphView/hooks/useGraphColorizer"

• **"GraphView/hooks/useGraphColorizer"**:

Defined in GraphView/hooks/useGraphColorizer.ts:1

### useGraphColorizer

▸ **useGraphColorizer**(`renderer`: GraphRenderer | undefined, `colorizerFn?`: Colorizer): _void_

Defined in GraphView/hooks/useGraphColorizer.ts:13

This hook will apply colors to the edges/nodes of **renderer** using the **colorizerFn**

**Parameters:**

| Name           | Type                           | Description           |
| -------------- | ------------------------------ | --------------------- |
| `renderer`     | GraphRenderer &#124; undefined | The graph renderer    |
| `colorizerFn?` | Colorizer                      | The colorize function |

**Returns:** _void_

---

### "GraphView/hooks/useGraphContainer"

• **"GraphView/hooks/useGraphContainer"**:

Defined in GraphView/hooks/useGraphContainer.ts:1

### useGraphContainer

▸ **useGraphContainer**(`data`: InputGraph | GraphContainer | undefined): _GraphContainer | undefined_

Defined in GraphView/hooks/useGraphContainer.ts:12

Converts **data** to a GraphContainer

**Parameters:**

| Name   | Type                                              | Description    |
| ------ | ------------------------------------------------- | -------------- |
| `data` | InputGraph &#124; GraphContainer &#124; undefined | The input data |

**Returns:** _GraphContainer | undefined_

---

### "GraphView/hooks/useGraphHideDeselected"

• **"GraphView/hooks/useGraphHideDeselected"**:

Defined in GraphView/hooks/useGraphHideDeselected.ts:1

### useGraphHideDeselected

▸ **useGraphHideDeselected**(`renderer`: GraphRenderer | undefined, `hideDeselected`: boolean): _void_

Defined in GraphView/hooks/useGraphHideDeselected.ts:13

Hides/shows deselected nodes in **renderer** based on **hideDeselected**

**Parameters:**

| Name             | Type                           | Description                                 |
| ---------------- | ------------------------------ | ------------------------------------------- |
| `renderer`       | GraphRenderer &#124; undefined | The renderer                                |
| `hideDeselected` | boolean                        | If true, deselected vertices will be hidden |

**Returns:** _void_

---

### "GraphView/hooks/useGraphImperativeApi"

• **"GraphView/hooks/useGraphImperativeApi"**:

Defined in GraphView/hooks/useGraphImperativeApi.ts:1

### useGraphImperativeApi

▸ **useGraphImperativeApi**(`renderer`: GraphRenderer | undefined, `ref`: React.Ref<GraphRenderer>): _void_

Defined in GraphView/hooks/useGraphImperativeApi.ts:13

Assigns a GraphRenderer imperative api for **renderer** to **ref**

**Parameters:**

| Name       | Type                           | Description                  |
| ---------- | ------------------------------ | ---------------------------- |
| `renderer` | GraphRenderer &#124; undefined | The graph renderer           |
| `ref`      | React.Ref<GraphRenderer>       | The ref for a graph renderer |

**Returns:** _void_

---

### "GraphView/hooks/useGraphInterpolationTime"

• **"GraphView/hooks/useGraphInterpolationTime"**:

Defined in GraphView/hooks/useGraphInterpolationTime.ts:1

### useGraphInterpolationTime

▸ **useGraphInterpolationTime**(`renderer`: GraphRenderer | undefined, `interpolationTime`: number): _void_

Defined in GraphView/hooks/useGraphInterpolationTime.ts:13

Updates the **interpolationTime** for the **renderer**

**Parameters:**

| Name                | Type                           | Description                           |
| ------------------- | ------------------------------ | ------------------------------------- |
| `renderer`          | GraphRenderer &#124; undefined | The renderer                          |
| `interpolationTime` | number                         | The interpolation time for animations |

**Returns:** _void_

---

### "GraphView/hooks/useGraphRenderKickoff"

• **"GraphView/hooks/useGraphRenderKickoff"**:

Defined in GraphView/hooks/useGraphRenderKickoff.ts:1

### useGraphRenderKickoff

▸ **useGraphRenderKickoff**(`renderer`: GraphRenderer | undefined, `data`: GraphContainer | undefined, `colorizer`: Colorizer | undefined): _void_

Defined in GraphView/hooks/useGraphRenderKickoff.ts:15

Loads the **renderer** with **data** when **data** changes, and colorizes when **colorizer** changes

**Parameters:**

| Name        | Type                            | Description                         |
| ----------- | ------------------------------- | ----------------------------------- |
| `renderer`  | GraphRenderer &#124; undefined  | The renderer                        |
| `data`      | GraphContainer &#124; undefined | The graph data                      |
| `colorizer` | Colorizer &#124; undefined      | The colorizer to colorize the graph |

**Returns:** _void_

---

### "GraphView/hooks/useGraphRenderer"

• **"GraphView/hooks/useGraphRenderer"**:

Defined in GraphView/hooks/useGraphRenderer.ts:1

### useGraphRenderer

▸ **useGraphRenderer**(`nodeCountHint?`: undefined | number, `edgeCountHint?`: undefined | number, `drawEdges?`: undefined | false | true): _[RefObject<HTMLDivElement>, GraphRenderer | undefined]_

Defined in GraphView/hooks/useGraphRenderer.ts:15

Creates a new GraphRenderer instance

**Parameters:**

| Name             | Type                               | Description                      |
| ---------------- | ---------------------------------- | -------------------------------- |
| `nodeCountHint?` | undefined &#124; number            | The number of nodes in the graph |
| `edgeCountHint?` | undefined &#124; number            | The number of edges in the graph |
| `drawEdges?`     | undefined &#124; false &#124; true | If true, edges will be drawn     |

**Returns:** _[RefObject<HTMLDivElement>, GraphRenderer | undefined]_

---

### "GraphView/hooks/useGraphRendererBackgroundColor"

• **"GraphView/hooks/useGraphRendererBackgroundColor"**:

Defined in GraphView/hooks/useGraphRendererBackgroundColor.ts:1

### useGraphRendererBackgroundColor

▸ **useGraphRendererBackgroundColor**(`renderer`: GraphRenderer | undefined, `backgroundColor`: ColorVector): _void_

Defined in GraphView/hooks/useGraphRendererBackgroundColor.ts:13

Updates the background color of **renderer** to **backgroundColor**

**Parameters:**

| Name              | Type                           | Description              |
| ----------------- | ------------------------------ | ------------------------ |
| `renderer`        | GraphRenderer &#124; undefined | The renderer             |
| `backgroundColor` | ColorVector                    | The new background color |

**Returns:** _void_

---

### "GraphView/index"

• **"GraphView/index"**:

Defined in GraphView/index.ts:1

### GraphRendererContext

• **GraphRendererContext**:

### GraphView

• **GraphView**:

### GraphViewProps

• **GraphViewProps**:

---

### "HandleNodeClicks/HandleNodeClicks"

• **"HandleNodeClicks/HandleNodeClicks"**:

Defined in HandleNodeClicks/HandleNodeClicks.ts:1

### HandleNodeClicksProps

• **HandleNodeClicksProps**:

Defined in HandleNodeClicks/HandleNodeClicks.ts:15

Properties for the HandleNodeClicks Component

### onClick

• **onClick**: _VertexClickHandler_

Defined in HandleNodeClicks/HandleNodeClicks.ts:19

An handler function for when a vertex is clicked

### `Const` HandleNodeClicks

• **HandleNodeClicks**: _React.FC<HandleNodeClicksProps>_ = memo(
({ onClick }) => {
const renderer = useContext(GraphRendererContext)
useVertexClickEvents(renderer)
useVertexClickHandler(renderer, onClick)
return null
},
)

Defined in HandleNodeClicks/HandleNodeClicks.ts:25

Adds node click functionality to the GraphView component

---

### "HandleNodeClicks/hooks/useVertexClickEvents"

• **"HandleNodeClicks/hooks/useVertexClickEvents"**:

Defined in HandleNodeClicks/hooks/useVertexClickEvents.ts:1

### useVertexClickEvents

▸ **useVertexClickEvents**(`renderer`: GraphRenderer | undefined): _void_

Defined in HandleNodeClicks/hooks/useVertexClickEvents.ts:16

Enables vertex click events on **renderer**

**Parameters:**

| Name       | Type                           | Description  |
| ---------- | ------------------------------ | ------------ |
| `renderer` | GraphRenderer &#124; undefined | The renderer |

**Returns:** _void_

---

### "HandleNodeClicks/hooks/useVertexClickHandler"

• **"HandleNodeClicks/hooks/useVertexClickHandler"**:

Defined in HandleNodeClicks/hooks/useVertexClickHandler.ts:1

### useVertexClickHandler

▸ **useVertexClickHandler**(`renderer`: GraphRenderer | undefined, `onVertexClick`: VertexClickHandler): _void_

Defined in HandleNodeClicks/hooks/useVertexClickHandler.ts:14

Subscribes to vertex click events on **renderer**

**Parameters:**

| Name            | Type                           | Description              |
| --------------- | ------------------------------ | ------------------------ |
| `renderer`      | GraphRenderer &#124; undefined | The renderer             |
| `onVertexClick` | VertexClickHandler             | The vertex click handler |

**Returns:** _void_

---

### "HandleNodeClicks/index"

• **"HandleNodeClicks/index"**:

Defined in HandleNodeClicks/index.ts:1

### HandleNodeClicks

• **HandleNodeClicks**:

### HandleNodeClicksProps

• **HandleNodeClicksProps**:

### VertexClickHandler

• **VertexClickHandler**:

---

### "HandleNodeClicks/types"

• **"HandleNodeClicks/types"**:

Defined in HandleNodeClicks/types.ts:1

### VertexClickHandler

Ƭ **VertexClickHandler**: _function_

Defined in HandleNodeClicks/types.ts:5

#### Type declaration:

▸ (`vertexId`: string | undefined): _void_

**Parameters:**

| Name       | Type                    |
| ---------- | ----------------------- |
| `vertexId` | string &#124; undefined |

---

### "HighlightHoveredNode/HighlightHoveredNode"

• **"HighlightHoveredNode/HighlightHoveredNode"**:

Defined in HighlightHoveredNode/HighlightHoveredNode.ts:1

### HighlightHoveredNodeProps

• **HighlightHoveredNodeProps**:

Defined in HighlightHoveredNode/HighlightHoveredNode.ts:13

Properties for the HighlightHoveredNode component

### `Optional` color

• **color**? : _ColorVector_

Defined in HighlightHoveredNode/HighlightHoveredNode.ts:17

The color of the highlight

### `Optional` onHover

• **onHover**? : _undefined | function_

Defined in HighlightHoveredNode/HighlightHoveredNode.ts:22

Handler for when a node is hovered over

### `Const` HighlightHoveredNode

• **HighlightHoveredNode**: _React.FC<HighlightHoveredNodeProps>_ = memo(
({ color = DEFAULT_HOVER_HIGHLIGHT_COLOR, onHover }) => {
const renderable = useHoveredVertexRenderable(onHover)

    	useEffect(() => {
    		if (renderable) {
    			renderable.color = color
    		}
    	}, [color, renderable])

    	return null
    },

)

Defined in HighlightHoveredNode/HighlightHoveredNode.ts:28

Adds functionality to the GraphView component which highlights hovered nodes

---

### "HighlightHoveredNode/hooks/useHoveredVertexRenderable"

• **"HighlightHoveredNode/hooks/useHoveredVertexRenderable"**:

Defined in HighlightHoveredNode/hooks/useHoveredVertexRenderable.ts:1

### useHoveredVertexRenderable

▸ **useHoveredVertexRenderable**(`onHover`: undefined | function): _VertexSetRenderable | undefined_

Defined in HighlightHoveredNode/hooks/useHoveredVertexRenderable.ts:18

Adds a renderable to GraphView which will highlight nodes as they are hovered over

**Parameters:**

| Name      | Type                      | Description                  |
| --------- | ------------------------- | ---------------------------- |
| `onHover` | undefined &#124; function | A vertex hover event handler |

**Returns:** _VertexSetRenderable | undefined_

---

### "HighlightHoveredNode/index"

• **"HighlightHoveredNode/index"**:

Defined in HighlightHoveredNode/index.ts:1

### HighlightHoveredNode

• **HighlightHoveredNode**:

### HighlightHoveredNodeProps

• **HighlightHoveredNodeProps**:

---

### "LabelHoveredNode/LabelHoveredNode"

• **"LabelHoveredNode/LabelHoveredNode"**:

Defined in LabelHoveredNode/LabelHoveredNode.ts:1

### LabelHoveredNodeProps

• **LabelHoveredNodeProps**:

Defined in LabelHoveredNode/LabelHoveredNode.ts:12

Properties for the LabelHoveredNode component

### `Optional` onHover

• **onHover**? : _undefined | function_

Defined in LabelHoveredNode/LabelHoveredNode.ts:16

Handler for when a node is hovered over

### `Const` LabelHoveredNode

• **LabelHoveredNode**: _React.FC<LabelHoveredNodeProps>_ = memo(
({ onHover }) => {
useHoveredVertexRenderable(onHover)
return null
},
)

Defined in LabelHoveredNode/LabelHoveredNode.ts:22

Adds functionality to the GraphView component which adds labels to hovered nodes

---

### "LabelHoveredNode/hooks/useHoveredVertexRenderable"

• **"LabelHoveredNode/hooks/useHoveredVertexRenderable"**:

Defined in LabelHoveredNode/hooks/useHoveredVertexRenderable.ts:1

### useHoveredVertexRenderable

▸ **useHoveredVertexRenderable**(`onHover`: undefined | function): _VertexLabelRenderable | undefined_

Defined in LabelHoveredNode/hooks/useHoveredVertexRenderable.ts:17

Adds a renderable to GraphView which will show a label on nodes as they are hovered over

**Parameters:**

| Name      | Type                      | Description                  |
| --------- | ------------------------- | ---------------------------- |
| `onHover` | undefined &#124; function | A vertex hover event handler |

**Returns:** _VertexLabelRenderable | undefined_

---

### "LabelHoveredNode/index"

• **"LabelHoveredNode/index"**:

Defined in LabelHoveredNode/index.ts:1

### LabelHoveredNode

• **LabelHoveredNode**:

### LabelHoveredNodeProps

• **LabelHoveredNodeProps**:

---

### "NodeSetHighlight/NodeSetHighlight"

• **"NodeSetHighlight/NodeSetHighlight"**:

Defined in NodeSetHighlight/NodeSetHighlight.ts:1

### NodeSetHighlightProps

• **NodeSetHighlightProps**:

Defined in NodeSetHighlight/NodeSetHighlight.ts:15

Properties for the NodeSetHighlight component

### `Optional` color

• **color**? : _ColorVector_

Defined in NodeSetHighlight/NodeSetHighlight.ts:24

The color to highlight them

### vertexIds

• **vertexIds**: _string[]_

Defined in NodeSetHighlight/NodeSetHighlight.ts:19

The set of verticies to highlight

### `Const` NodeSetHighlight

• **NodeSetHighlight**: _React.FC<NodeSetHighlightProps>_ = memo(
({ vertexIds, color = DEFAULT_HOVER_HIGHLIGHT_COLOR }) => {
const renderer = useContext(GraphRendererContext)
const renderable = useVertexSetHighlightRenderable(renderer)
useVertexSelectionSynchronization(renderer, renderable, vertexIds)

    	useEffect(() => {
    		if (renderable && color != null) {
    			renderable.color = color
    		}
    	}, [renderable, color])
    	return null
    },

)

Defined in NodeSetHighlight/NodeSetHighlight.ts:30

Adds functionality to the GraphView component which colors a set of verticies a given color

---

### "NodeSetHighlight/hooks/useVertexSelectionSynchronization"

• **"NodeSetHighlight/hooks/useVertexSelectionSynchronization"**:

Defined in NodeSetHighlight/hooks/useVertexSelectionSynchronization.ts:1

### useVertexSelectionSynchronization

▸ **useVertexSelectionSynchronization**(`renderer`: GraphRenderer | undefined, `renderable`: DataboundRenderable<Node[]> | undefined, `vertexIds`: string[]): _void_

Defined in NodeSetHighlight/hooks/useVertexSelectionSynchronization.ts:14

Updates **renderable** with the set of nodes which match the **vertexIds** ids, when **vertexIds** changes

**Parameters:**

| Name         | Type                                         | Description                  |
| ------------ | -------------------------------------------- | ---------------------------- |
| `renderer`   | GraphRenderer &#124; undefined               | The renderer                 |
| `renderable` | DataboundRenderable<Node[]> &#124; undefined | The renderable to syncronize |
| `vertexIds`  | string[]                                     | The set of vertex ids        |

**Returns:** _void_

---

### "NodeSetHighlight/hooks/useVertexSetHighlightRenderable"

• **"NodeSetHighlight/hooks/useVertexSetHighlightRenderable"**:

Defined in NodeSetHighlight/hooks/useVertexSetHighlightRenderable.ts:1

### useVertexSetHighlightRenderable

▸ **useVertexSetHighlightRenderable**(`renderer`: GraphRenderer & object | undefined): _VertexSetRenderable | undefined_

Defined in NodeSetHighlight/hooks/useVertexSetHighlightRenderable.ts:16

Creates a VertexSetRenderable

**Parameters:**

| Name       | Type                                    | Description  |
| ---------- | --------------------------------------- | ------------ |
| `renderer` | GraphRenderer & object &#124; undefined | The renderer |

**Returns:** _VertexSetRenderable | undefined_

---

### "NodeSetHighlight/index"

• **"NodeSetHighlight/index"**:

Defined in NodeSetHighlight/index.ts:1

### NodeSetHighlight

• **NodeSetHighlight**:

### NodeSetHighlightProps

• **NodeSetHighlightProps**:

---

### "NodeSetLabel/NodeSetLabel"

• **"NodeSetLabel/NodeSetLabel"**:

Defined in NodeSetLabel/NodeSetLabel.ts:1

### NodeSetLabelProps

• **NodeSetLabelProps**:

Defined in NodeSetLabel/NodeSetLabel.ts:14

Properties for the NodeSetHighlight component

### vertexIds

• **vertexIds**: _string[]_

Defined in NodeSetLabel/NodeSetLabel.ts:18

The set of verticies to label

### `Const` NodeSetLabel

• **NodeSetLabel**: _React.FC<NodeSetLabelProps>_ = memo(
({ vertexIds }) => {
const renderer = useContext(GraphRendererContext)
const renderable = useVertexSetHighlightRenderable(renderer)
useVertexSelectionSynchronization(renderer, renderable, vertexIds)
return null
},
)

Defined in NodeSetLabel/NodeSetLabel.ts:24

Adds functionality to the GraphView component which adds labels for a set of verticies

---

### "NodeSetLabel/hooks/useVertexSelectionSynchronization"

• **"NodeSetLabel/hooks/useVertexSelectionSynchronization"**:

Defined in NodeSetLabel/hooks/useVertexSelectionSynchronization.ts:1

### useVertexSelectionSynchronization

▸ **useVertexSelectionSynchronization**(`renderer`: GraphRenderer | undefined, `renderable`: DataboundRenderable<Node[]> | undefined, `vertexIds`: string[]): _void_

Defined in NodeSetLabel/hooks/useVertexSelectionSynchronization.ts:8

**Parameters:**

| Name         | Type                                         |
| ------------ | -------------------------------------------- |
| `renderer`   | GraphRenderer &#124; undefined               |
| `renderable` | DataboundRenderable<Node[]> &#124; undefined |
| `vertexIds`  | string[]                                     |

**Returns:** _void_

---

### "NodeSetLabel/hooks/useVertexSetLabelRenderable"

• **"NodeSetLabel/hooks/useVertexSetLabelRenderable"**:

Defined in NodeSetLabel/hooks/useVertexSetLabelRenderable.ts:1

### useVertexSetHighlightRenderable

▸ **useVertexSetHighlightRenderable**(`renderer`: GraphRenderer & object | undefined): _VertexSetLabelRenderable | undefined_

Defined in NodeSetLabel/hooks/useVertexSetLabelRenderable.ts:12

**Parameters:**

| Name       | Type                                    |
| ---------- | --------------------------------------- |
| `renderer` | GraphRenderer & object &#124; undefined |

**Returns:** _VertexSetLabelRenderable | undefined_

---

### "NodeSetLabel/index"

• **"NodeSetLabel/index"**:

Defined in NodeSetLabel/index.ts:1

### NodeSetLabel

• **NodeSetLabel**:

### NodeSetLabelProps

• **NodeSetLabelProps**:

---

### "Nodes/Nodes"

• **"Nodes/Nodes"**:

Defined in Nodes/Nodes.ts:1

### NodesProps

• **NodesProps**:

Defined in Nodes/Nodes.ts:21

The set of properties for the Nodes component

### `Optional` filteredIds

• **filteredIds**? : _string[]_

Defined in Nodes/Nodes.ts:55

The set of _filtered_ node ids

### `Optional` filteredInSaturation

• **filteredInSaturation**? : _undefined | number_

Defined in Nodes/Nodes.ts:67

The saturation of nodes which are _in_ the filtered set

**`defaultvalue`** [[DEFAULT_NODE_FILTERED_IN_SATURATION]]

### `Optional` filteredOutSaturation

• **filteredOutSaturation**? : _undefined | number_

Defined in Nodes/Nodes.ts:61

The saturation of nodes which are _not in_ the filtered set

**`defaultvalue`** [[DEFAULT_NODE_FILTERED_OUT_SATURATION]]

### `Optional` hideOnMove

• **hideOnMove**? : _undefined | false | true_

Defined in Nodes/Nodes.ts:44

If true, nodes will be hidden when the user is panning/zooming

**`defaultvalue`** [[DEFAULT_HIDE_NODES_ON_MOVE]]

### `Optional` maxRadius

• **maxRadius**? : _undefined | number_

Defined in Nodes/Nodes.ts:32

The minimum radius of nodes, based on nodes _weight_ property

**`defaultvalue`** [[DEFAULT_NODE_MAX_RADIUS]]

### `Optional` minRadius

• **minRadius**? : _undefined | number_

Defined in Nodes/Nodes.ts:26

The minimum radius of nodes, based on nodes _weight_ property

**`defaultvalue`** [[DEFAULT_NODE_MIN_RADIUS]]

### `Optional` outline

• **outline**? : _undefined | false | true_

Defined in Nodes/Nodes.ts:38

If true, nodes will be drawn with an outline

**`defaultvalue`** [[DEFAULT_NODE_OUTLINE]]

### `Optional` shown

• **shown**? : _undefined | false | true_

Defined in Nodes/Nodes.ts:50

If true, nodes will be rendered

**`defaultvalue`** [[DEFAULT_DRAW_NODES]]

### `Const` Nodes

• **Nodes**: _React.FC<NodesProps>_ = memo(
({
minRadius = DEFAULT_NODE_MIN_RADIUS,
maxRadius = DEFAULT_NODE_MAX_RADIUS,
outline = DEFAULT_NODE_OUTLINE,
hideOnMove = DEFAULT_HIDE_NODES_ON_MOVE,
shown = DEFAULT_DRAW_NODES,
filteredIds,
filteredOutSaturation = DEFAULT_NODE_FILTERED_OUT_SATURATION,
filteredInSaturation = DEFAULT_NODE_FILTERED_IN_SATURATION,
}) => {
const renderer = useContext(GraphRendererContext)

    	useEffect(() => {
    		if (renderer && minRadius != null) {
    			renderer.config.nodeMinRadius = minRadius
    		}
    	}, [renderer, minRadius])

    	useEffect(() => {
    		if (renderer && maxRadius != null) {
    			renderer.config.nodeMaxRadius = maxRadius
    		}
    	}, [renderer, maxRadius])

    	useEffect(() => {
    		if (renderer) {
    			renderer.config.nodeOutline = outline
    		}
    	}, [renderer, outline])

    	useEffect(() => {
    		if (renderer) {
    			renderer.config.hideNodesOnMove = hideOnMove
    		}
    	}, [renderer, hideOnMove])

    	useEffect(() => {
    		if (renderer) {
    			renderer.config.drawNodes = shown
    		}
    	}, [renderer, shown])

    	useEffect(() => {
    		if (renderer) {
    			renderer.config.nodeFilteredIds = filteredIds
    		}
    	}, [renderer, filteredIds])

    	useEffect(() => {
    		if (renderer) {
    			renderer.config.nodeFilteredInSaturation = filteredInSaturation
    		}
    	}, [renderer, filteredInSaturation])

    	useEffect(() => {
    		if (renderer) {
    			renderer.config.nodeFilteredOutSaturation = filteredOutSaturation
    		}
    	}, [renderer, filteredOutSaturation])

    	return null
    },

)

Defined in Nodes/Nodes.ts:73

Configures the node rendering for the GraphView component

---

### "Nodes/index"

• **"Nodes/index"**:

Defined in Nodes/index.ts:1

### Nodes

• **Nodes**:

### NodesProps

• **NodesProps**:

---

### "SizedToParent/SizedToParent"

• **"SizedToParent/SizedToParent"**:

Defined in SizedToParent/SizedToParent.tsx:1

### `Const` SizedToParent

• **SizedToParent**: _React.FC<SizedToParentProps>_ = memo(
({ sizedRef, onResize, children, className, style }: SizedToParentProps) => {
const defaultRef = useRef(null)
const ref: MutableRefObject<HTMLElement | null> = useMemo(
() => sizedRef || defaultRef,
[defaultRef, sizedRef],
)
const dims = useDimensions(ref)
useEffect(() => {
if (ref && dims && onResize) {
onResize(dims)
}
}, [ref, dims, onResize])
const finalStyle = useMemo(
() => ({
...DEFAULT_STYLE,
...(style || {}),
}),
[style],
)

    	return (
    		<div className={className} ref={ref as any} style={finalStyle}>
    			{children}
    		</div>
    	)
    },

)

Defined in SizedToParent/SizedToParent.tsx:56

Provides an element that is sized to its parent, without affecting the size of the parent.
It works by creating an element that is out of the layout flow (using position: absolute).

Children should be styled with 'width: 100%, height: 100%' or use the onResize event listener to control the size of children or some other combination

---

### "SizedToParent/index"

• **"SizedToParent/index"**:

Defined in SizedToParent/index.ts:1

### SizedToParent

• **SizedToParent**:

---

### "index"

• **"index"**:

Defined in index.ts:1

### Axes

• **Axes**:

### AxesProps

• **AxesProps**:

### Camera

• **Camera**:

### CameraProps

• **CameraProps**:

### Edges

• **Edges**:

### EdgesProps

• **EdgesProps**:

### GraphRendererContext

• **GraphRendererContext**:

### GraphView

• **GraphView**:

### GraphViewProps

• **GraphViewProps**:

### HandleNodeClicks

• **HandleNodeClicks**:

### HandleNodeClicksProps

• **HandleNodeClicksProps**:

### HighlightHoveredNode

• **HighlightHoveredNode**:

### HighlightHoveredNodeProps

• **HighlightHoveredNodeProps**:

### LabelHoveredNode

• **LabelHoveredNode**:

### LabelHoveredNodeProps

• **LabelHoveredNodeProps**:

### NodeSetHighlight

• **NodeSetHighlight**:

### NodeSetHighlightProps

• **NodeSetHighlightProps**:

### NodeSetLabel

• **NodeSetLabel**:

### NodeSetLabelProps

• **NodeSetLabelProps**:

### Nodes

• **Nodes**:

### NodesProps

• **NodesProps**:

### VertexClickHandler

• **VertexClickHandler**:
