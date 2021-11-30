/**
 * @internal
 *
 * Moves __pos1__ closer to __pos2__ by a __damping__ factor
 * @param pos1 The start position
 * @param pos2 The end position
 * @param damping The damping factor
 */
export function jumpTowards(pos1, pos2, damping) {
  if (damping < 0.0 || damping > 1.0) {
    throw new Error('jump factor must be between 0-1');
  } else {
    const inverse = 1.0 - damping;
    return {
      x: pos1.x * inverse + damping * pos2.x,
      y: pos1.y * inverse + damping * pos2.y
    };
  }
}
/**
 * @internal
 *
 * Moves __source__ a random __distance__ away from it's current position
 * @param source The source position
 * @param distance The distance of the jump
 */

export function jumpRandom(source, distance) {
  const r1 = Math.random();
  const r2 = Math.random();
  const x = source.x + (0.5 - r1) * distance;
  const y = source.y + (0.5 - r2) * distance;
  return {
    x,
    y
  };
}