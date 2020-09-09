[@graspologic/layout-openord](README.md) › [Globals](globals.md)

# @graspologic/layout-openord

## Index

### Modules

- ["AnnealingClock"]()
- ["DensityGrid"]()
- ["OpenOrdLayoutExecutor"]()
- ["executeLayout"]()
- ["factory"]()
- ["index"]()
- ["jumps"]()
- ["sampleBitmap"]()
- ["types"]()
- ["worker"]()

## Modules

### "AnnealingClock"

• **"AnnealingClock"**:

Defined in layout-openord/src/AnnealingClock.ts:1

---

### "DensityGrid"

• **"DensityGrid"**:

Defined in layout-openord/src/DensityGrid.ts:1

### `Const` DIAMETER

• **DIAMETER**: _number_ = 2 \* RADIUS

Defined in layout-openord/src/DensityGrid.ts:9

### `Const` FALLOFF

• **FALLOFF**: _number[][]_ = getInitialFalloffStructure()

Defined in layout-openord/src/DensityGrid.ts:10

### `Const` GRID_SIZE

• **GRID_SIZE**: _1000_ = 1000

Defined in layout-openord/src/DensityGrid.ts:7

### `Const` RADIUS

• **RADIUS**: _10_ = 10

Defined in layout-openord/src/DensityGrid.ts:8

---

### "OpenOrdLayoutExecutor"

• **"OpenOrdLayoutExecutor"**:

Defined in layout-openord/src/OpenOrdLayoutExecutor.ts:1

---

### "executeLayout"

• **"executeLayout"**:

Defined in layout-openord/src/executeLayout.ts:1

---

### "factory"

• **"factory"**:

Defined in layout-openord/src/factory.ts:1

---

### "index"

• **"index"**:

Defined in layout-openord/src/index.ts:1

### NodeUpdate

• **NodeUpdate**:

### NodeUpdateKind

• **NodeUpdateKind**:

### PhaseSchedule

• **PhaseSchedule**:

---

### "jumps"

• **"jumps"**:

Defined in layout-openord/src/jumps.ts:1

---

### "sampleBitmap"

• **"sampleBitmap"**:

Defined in layout-openord/src/sampleBitmap.ts:1

---

### "types"

• **"types"**:

Defined in layout-openord/src/types.ts:1

### NodeUpdateKind

• **NodeUpdateKind**:

Defined in layout-openord/src/types.ts:213

### CentroidJump

• **CentroidJump**:

Defined in layout-openord/src/types.ts:214

### RandomJump

• **RandomJump**:

Defined in layout-openord/src/types.ts:215

### NodeUpdate

• **NodeUpdate**:

Defined in layout-openord/src/types.ts:205

### energy

• **energy**: _number_

Defined in layout-openord/src/types.ts:208

### kind

• **kind**: _NodeUpdateKind_

Defined in layout-openord/src/types.ts:209

### node

• **node**: _Node_

Defined in layout-openord/src/types.ts:206

### position

• **position**: _Position_

Defined in layout-openord/src/types.ts:207

### `Optional` prunedEdge

• **prunedEdge**? : _NodeIndex_

Defined in layout-openord/src/types.ts:210

### PhaseSchedule

• **PhaseSchedule**:

Defined in layout-openord/src/types.ts:195

A schedule for a layout phase

### attraction

• **attraction**: _number_

Defined in layout-openord/src/types.ts:201

### damping

• **damping**: _number_

Defined in layout-openord/src/types.ts:202

### iterations

• **iterations**: _number_

Defined in layout-openord/src/types.ts:199

The number of iterations to run

### temperature

• **temperature**: _number_

Defined in layout-openord/src/types.ts:200

---

### "worker"

• **"worker"**:

Defined in layout-openord/src/worker.ts:1
