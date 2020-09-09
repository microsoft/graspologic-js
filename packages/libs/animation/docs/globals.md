[@graspologic/animation](README.md) › [Globals](globals.md)

# @graspologic/animation

## Index

### Modules

- ["AnimationUtil"]()
- ["index"]()
- ["types/index"]()
- ["utils/index"]()
- ["utils/readTween"]()
- ["utils/restartTween"]()
- ["utils/writeTween"]()

## Modules

### "AnimationUtil"

• **"AnimationUtil"**:

Defined in AnimationUtil.ts:1

### createAnimationUtil

▸ **createAnimationUtil**(`engineTime?`: undefined | function): _AnimationUtil_

Defined in AnimationUtil.ts:110

Creates a set of animation utilities

**Parameters:**

| Name          | Type                      | Description     |
| ------------- | ------------------------- | --------------- |
| `engineTime?` | undefined &#124; function | The engine time |

**Returns:** _AnimationUtil_

---

### "index"

• **"index"**:

Defined in index.ts:1

### AnimationUtil

• **AnimationUtil**:

### createAnimationUtil

• **createAnimationUtil**:

---

### "types/index"

• **"types/index"**:

Defined in types/index.ts:1

### AnimationUtil

• **AnimationUtil**:

Defined in types/index.ts:10

A utility for animating various properties of items

### animateColor

▸ **animateColor**(`item`: MemoryReader, `attribute`: AttributeName, `color`: number, `duration?`: undefined | number): _void_

Defined in types/index.ts:32

Animates a color

**Parameters:**

| Name        | Type                    | Description                                                                                                                          |
| ----------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `item`      | MemoryReader            | The item to animate the color for                                                                                                    |
| `attribute` | AttributeName           | The color attribute to animate                                                                                                       |
| `color`     | number                  | -                                                                                                                                    |
| `duration?` | undefined &#124; number | **default = 0** The duration of time to transition from the old color to this new color. If the value is 0, no transition will occur |

**Returns:** _void_

### animatePoint

▸ **animatePoint**(`item`: MemoryReader, `attribute`: AttributeName, `point`: [number, number, number] | [number, number], `duration?`: undefined | number): _void_

Defined in types/index.ts:18

Animates a point

**Parameters:**

| Name        | Type                                             | Description                                                                                                                          |
| ----------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `item`      | MemoryReader                                     | The item to animate the point for                                                                                                    |
| `attribute` | AttributeName                                    | The point attribute to animate                                                                                                       |
| `point`     | [number, number, number] &#124; [number, number] | The point to animate to                                                                                                              |
| `duration?` | undefined &#124; number                          | **default = 0** The duration of time to transition from the old point to this new point. If the value is 0, no transition will occur |

**Returns:** _void_

---

### "utils/index"

• **"utils/index"**:

Defined in utils/index.ts:1

---

### "utils/readTween"

• **"utils/readTween"**:

Defined in utils/readTween.ts:1

---

### "utils/restartTween"

• **"utils/restartTween"**:

Defined in utils/restartTween.ts:1

---

### "utils/writeTween"

• **"utils/writeTween"**:

Defined in utils/writeTween.ts:1
