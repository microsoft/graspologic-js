[@graspologic/render-controls-react](README.md) › [Globals](globals.md)

# @graspologic/render-controls-react

## Index

### Modules

- ["components/DisplaySettings"]()
- ["components/EdgeSettings"]()
- ["components/NodeSettings"]()
- ["components/SettingsPane"]()
- ["components/index"]()
- ["context"]()
- ["hooks/useDatGui"]()
- ["index"]()

## Modules

### "components/DisplaySettings"

• **"components/DisplaySettings"**:

Defined in components/DisplaySettings.tsx:1

### DisplaySettingsProps

• **DisplaySettingsProps**:

Defined in components/DisplaySettings.tsx:11

### `Optional` interpolationTimeRange

• **interpolationTimeRange**? : _[number, number]_

Defined in components/DisplaySettings.tsx:12

### `Const` DisplaySettings

• **DisplaySettings**: _React.FC<DisplaySettingsProps>_ = memo(
function DisplaySettings({ interpolationTimeRange }) {
const gui = useContext(DatGuiContext)
const renderer = useContext(GraphRendererContext)

    	useEffect(() => {
    		if (gui && renderer) {
    			return attachDisplaySettings(gui, renderer, { interpolationTimeRange })
    		}
    	}, [gui, renderer, interpolationTimeRange])

    	return null
    },

)

Defined in components/DisplaySettings.tsx:17

Attaches the graph renderer display settings to the SettingsPane

---

### "components/EdgeSettings"

• **"components/EdgeSettings"**:

Defined in components/EdgeSettings.tsx:1

### EdgeSettingsProps

• **EdgeSettingsProps**:

Defined in components/EdgeSettings.tsx:11

### `Optional` alphaRange

• **alphaRange**? : _[number, number]_

Defined in components/EdgeSettings.tsx:12

### `Optional` maxWidthRange

• **maxWidthRange**? : _[number, number]_

Defined in components/EdgeSettings.tsx:14

### `Optional` minWidthRange

• **minWidthRange**? : _[number, number]_

Defined in components/EdgeSettings.tsx:13

### `Const` EdgeSettings

• **EdgeSettings**: _React.FC<EdgeSettingsProps>_ = memo(
function EdgeSettings({ alphaRange, minWidthRange, maxWidthRange }) {
const gui = useContext(DatGuiContext)
const renderer = useContext(GraphRendererContext)

    	useEffect(() => {
    		if (gui && renderer) {
    			return attachEdgeSettings(gui, renderer, {
    				alphaRange,
    				minWidthRange,
    				maxWidthRange,
    			})
    		}
    	}, [gui, renderer, alphaRange, minWidthRange, maxWidthRange])

    	return null
    },

)

Defined in components/EdgeSettings.tsx:19

Attaches the graph renderer edge settings to the SettingsPane

---

### "components/NodeSettings"

• **"components/NodeSettings"**:

Defined in components/NodeSettings.tsx:1

### NodeSettingsProps

• **NodeSettingsProps**:

Defined in components/NodeSettings.tsx:11

### `Optional` maxRadiusRange

• **maxRadiusRange**? : _[number, number]_

Defined in components/NodeSettings.tsx:19

The range of values to allow for the max-radius settings

### `Optional` minRadiusRange

• **minRadiusRange**? : _[number, number]_

Defined in components/NodeSettings.tsx:15

The range of values to allow for the min-radius settings

### `Const` NodeSettings

• **NodeSettings**: _React.FC<NodeSettingsProps>_ = memo(
function NodeSettings({ minRadiusRange, maxRadiusRange }) {
const gui = useContext(DatGuiContext)
const renderer = useContext(GraphRendererContext)

    	useEffect(() => {
    		if (gui && renderer) {
    			return attachNodeSettings(gui, renderer, {
    				minRadiusRange,
    				maxRadiusRange,
    			})
    		}
    	}, [gui, renderer, minRadiusRange, maxRadiusRange])

    	return null
    },

)

Defined in components/NodeSettings.tsx:25

Attaches the graph renderer node settings to the SettingsPane

---

### "components/SettingsPane"

• **"components/SettingsPane"**:

Defined in components/SettingsPane.tsx:1

### SettingsPaneProps

• **SettingsPaneProps**:

Defined in components/SettingsPane.tsx:13

The SettingsPane props

### `Optional` className

• **className**? : _undefined | string_

Defined in components/SettingsPane.tsx:17

The classname to attach to the settings pane

### `Optional` guiWidth

• **guiWidth**? : _undefined | number_

Defined in components/SettingsPane.tsx:27

The width of the settings pane

### `Optional` style

• **style**? : _React.CSSProperties_

Defined in components/SettingsPane.tsx:22

The styles to apply to the settings pane

### `Const` SettingsPane

• **SettingsPane**: _React.FC<SettingsPaneProps>_ = memo(
function SettingsPane({
className,
children,
style = defaultStyle,
guiWidth = DEFAULT_GUI_WIDTH,
}) {
const [gui, guiRef] = useDatGui(guiWidth)
return (

<div ref={guiRef} className={className} style={style}>
<DatGuiContext.Provider value={gui}>{children}</DatGuiContext.Provider>
</div>
)
},
)

Defined in components/SettingsPane.tsx:46

Attaches a settings pane to the GraphView component

---

### "components/index"

• **"components/index"**:

Defined in components/index.ts:1

### DisplaySettings

• **DisplaySettings**:

### DisplaySettingsProps

• **DisplaySettingsProps**:

### EdgeSettings

• **EdgeSettings**:

### EdgeSettingsProps

• **EdgeSettingsProps**:

### NodeSettings

• **NodeSettings**:

### NodeSettingsProps

• **NodeSettingsProps**:

### SettingsPane

• **SettingsPane**:

### SettingsPaneProps

• **SettingsPaneProps**:

---

### "context"

• **"context"**:

Defined in context.ts:1

---

### "hooks/useDatGui"

• **"hooks/useDatGui"**:

Defined in hooks/useDatGui.ts:1

---

### "index"

• **"index"**:

Defined in index.ts:1

### DisplaySettings

• **DisplaySettings**:

### DisplaySettingsProps

• **DisplaySettingsProps**:

### EdgeSettings

• **EdgeSettings**:

### EdgeSettingsProps

• **EdgeSettingsProps**:

### NodeSettings

• **NodeSettings**:

### NodeSettingsProps

• **NodeSettingsProps**:

### SettingsPane

• **SettingsPane**:

### SettingsPaneProps

• **SettingsPaneProps**:
