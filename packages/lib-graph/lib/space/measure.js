/**
 * @internal
 *
 * Computes the square distance between the two points
 * @param pos1 The first position
 * @param pos2 The second position
 * @returns The square distance
 */
export function squareDistanceTo(pos1, pos2) {
    const dx = pos2.x - pos1.x;
    const dy = pos2.y - pos1.y;
    return dx ** 2 + dy ** 2;
}
/**
 * @internal
 *
 * Computes the euclidean distance between the two points
 * @param pos1 The first position
 * @param pos2 The second position
 * @returns The distance
 */
export function distanceTo(pos1, pos2) {
    return Math.sqrt(squareDistanceTo(pos1, pos2));
}
/**
 * @internal
 * Computes the the weighted center of the given positions, using the given weights
 * @param points The list of points
 * @param weights The list of weights
 * @returns The weighted centroid
 */
export function weightedCentroid(points, weights) {
    if (points.length === 0) {
        throw new Error('could not compute centroid out of zero points');
    }
    if (points.length !== weights.length) {
        throw new Error('points array and weights array must be the same length');
    }
    let xSum = 0.0;
    let ySum = 0.0;
    let totalWeight = 0.0;
    points.forEach((point, index) => {
        const weight = weights[index];
        totalWeight += weight;
        xSum += point.x * weight;
        ySum += point.y * weight;
    });
    const x = xSum / totalWeight;
    const y = ySum / totalWeight;
    return { x, y };
}
