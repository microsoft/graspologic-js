"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readTween = readTween;
exports.readTweenEndTime = readTweenEndTime;

/**
 * @internal
 *
 * Read a tween
 * @param store The attay store
 * @param storeId The item storeid
 * @param tweenAttribute The tween attribute to read
 * @returns The duration and start time of the tween
 */
function readTween(store, storeId, tweenAttribute) {
  const baseTypedOffset = store.getByteOffsetAttr(storeId, tweenAttribute) / 4;
  return [store.float32Array[baseTypedOffset], store.float32Array[baseTypedOffset + 1]];
}
/**
 * @internal
 *
 * Reads the computed end time of the given tween
 * @param store The attay store
 * @param storeId The item storeid
 * @param tweenAttribute The tween attribute to read
 * @returns The computed end time of the tween
 */
//


function readTweenEndTime(store, storeId, tweenAttribute) {
  const baseTypedOffset = store.getByteOffsetAttr(storeId, tweenAttribute) / 4;
  return store.float32Array[baseTypedOffset] + store.float32Array[baseTypedOffset + 1];
}