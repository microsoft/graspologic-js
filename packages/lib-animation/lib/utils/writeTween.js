/**
 * @internal
 *
 * Writes a tween
 * @param store The attay store
 * @param storeId The item storeid
 * @param tweenAttribute The tween attribute to read
 * @param duration The duration of the tween
 * @param startTime The start time of the tween
 * @returns The start time of the tween
 */
export function writeTween(store, storeId, tweenAttribute, duration, startTime) {
    if (process.env.NODE_ENV !== 'production') {
        if (tweenAttribute.indexOf('.tween') < 0) {
            throw new Error(`${tweenAttribute} is not a tween attribute!`);
        }
    }
    const baseTypedOffset = store.getByteOffsetAttr(storeId, tweenAttribute) / 4;
    store.float32Array[baseTypedOffset] = duration;
    store.float32Array[baseTypedOffset + 1] = startTime;
}
