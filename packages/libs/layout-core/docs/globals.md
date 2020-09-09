[@graspologic/layout-core](README.md) › [Globals](globals.md)

# @graspologic/layout-core

## Index

### Modules

- ["clock/CountdownClock"]()
- ["clock/index"]()
- ["clock/types"]()
- ["index"]()
- ["layout/BaseExecutor"]()
- ["layout/index"]()
- ["workers/LayoutWorkerManager"]()
- ["workers/index"]()
- ["workers/types"]()
- ["workers/workerFactory"]()

## Modules

### "clock/CountdownClock"

• **"clock/CountdownClock"**:

Defined in clock/CountdownClock.ts:1

---

### "clock/index"

• **"clock/index"**:

Defined in clock/index.ts:1

### OnTickHandler

• **OnTickHandler**:

---

### "clock/types"

• **"clock/types"**:

Defined in clock/types.ts:1

### OnTickHandler

Ƭ **OnTickHandler**: _function_

Defined in clock/types.ts:5

#### Type declaration:

▸ (`arg`: T): _void_

**Parameters:**

| Name  | Type |
| ----- | ---- |
| `arg` | T    |

---

### "index"

• **"index"**:

Defined in index.ts:1

### LayoutWorkerManager

• **LayoutWorkerManager**:

### OnTickHandler

• **OnTickHandler**:

### workerFactoryFromScript

• **workerFactoryFromScript**:

---

### "layout/BaseExecutor"

• **"layout/BaseExecutor"**:

Defined in layout/BaseExecutor.ts:1

---

### "layout/index"

• **"layout/index"**:

Defined in layout/index.ts:1

---

### "workers/LayoutWorkerManager"

• **"workers/LayoutWorkerManager"**:

Defined in workers/LayoutWorkerManager.ts:1

### LayoutWorkerManager

• **LayoutWorkerManager**:

Defined in workers/LayoutWorkerManager.ts:16

A manager class for using webworker-based layout execution

### constructor

\+ **new LayoutWorkerManager**(`createWorker`: function): _LayoutWorkerManager_

Defined in workers/LayoutWorkerManager.ts:20

Constructor for the LayoutWorkerManager

**Parameters:**

▪ **createWorker**: _function_

A callback for instantiating the worker

▸ (): _Worker_

**Returns:** _LayoutWorkerManager_

### `Private` \_configuration

• **\_configuration**: _Partial<Configuration>_

Defined in workers/LayoutWorkerManager.ts:19

### `Private` \_createWorker

• **\_createWorker**: _function_

Defined in workers/LayoutWorkerManager.ts:17

#### Type declaration:

▸ (): _Worker_

### `Private` \_onProgress

• **\_onProgress**: _Subject<TickProgress>_ = new Subject<TickProgress>()

Defined in workers/LayoutWorkerManager.ts:20

### `Private` `Optional` \_worker

• **\_worker**? : _Worker_

Defined in workers/LayoutWorkerManager.ts:18

### onProgress

• **onProgress**:

Defined in workers/LayoutWorkerManager.ts:33

Returns an observable for observing when layout ticks have occurred

### configure

▸ **configure**(`configuration`: Partial<Configuration>): _void_

Defined in workers/LayoutWorkerManager.ts:41

Configures the layout worker

**Parameters:**

| Name            | Type                   | Description                                     |
| --------------- | ---------------------- | ----------------------------------------------- |
| `configuration` | Partial<Configuration> | The configuration options for the layout worker |

**Returns:** _void_

### halt

▸ **halt**(): _void_

Defined in workers/LayoutWorkerManager.ts:90

Stops the current layout process

**Returns:** _void_

### layout

▸ **layout**(`graph`: GraphContainer): _Promise<TickProgress>_

Defined in workers/LayoutWorkerManager.ts:50

Performs the layout on the given graph

**Parameters:**

| Name    | Type           | Description                        |
| ------- | -------------- | ---------------------------------- |
| `graph` | GraphContainer | The graph to perform the layout on |

**Returns:** _Promise<TickProgress>_

A promise for when the layout is completed

### reset

▸ **reset**(): _void_

Defined in workers/LayoutWorkerManager.ts:80

Resets the layout worker to it's initial state

**Returns:** _void_

### resume

▸ **resume**(): _void_

Defined in workers/LayoutWorkerManager.ts:97

Resumes the current layout process

**Returns:** _void_

### `Private` sendMessage

▸ **sendMessage**‹**T**›(`type`: WorkerMessageType, `payload?`: T, `share?`: Transferable[]): _void_

Defined in workers/LayoutWorkerManager.ts:107

Sends a message to the layout worker

**Type parameters:**

▪ **T**

**Parameters:**

| Name       | Type              | Description       |
| ---------- | ----------------- | ----------------- |
| `type`     | WorkerMessageType | The message type  |
| `payload?` | T                 | The payload       |
| `share?`   | Transferable[]    | The data to share |

**Returns:** _void_

---

### "workers/index"

• **"workers/index"**:

Defined in workers/index.ts:1

### LayoutWorkerManager

• **LayoutWorkerManager**:

### workerFactoryFromScript

• **workerFactoryFromScript**:

---

### "workers/types"

• **"workers/types"**:

Defined in workers/types.ts:1

---

### "workers/workerFactory"

• **"workers/workerFactory"**:

Defined in workers/workerFactory.ts:1

### workerFactoryFromScript

▸ **workerFactoryFromScript**(`workerScript`: string): _(Anonymous function)_

Defined in workers/workerFactory.ts:5

**Parameters:**

| Name           | Type   |
| -------------- | ------ |
| `workerScript` | string |

**Returns:** _(Anonymous function)_
