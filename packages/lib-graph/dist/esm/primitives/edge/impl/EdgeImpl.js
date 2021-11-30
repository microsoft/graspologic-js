import { edgeType, edgeMemoryLayout, ADDITIONAL_EDGE_PROPS } from '../layout';
import { createReader } from '@graspologic/memstore'; // Cache some of the attributes for the "load"

const sourceIndexTypedOffset = edgeMemoryLayout.get('sourceIndex').typedOffset;
const targetIndexTypedOffset = edgeMemoryLayout.get('targetIndex').typedOffset;
const colorTypedOffset = edgeMemoryLayout.get('color').typedOffset;
const color2TypedOffset = edgeMemoryLayout.get('color2').typedOffset;
const weightTypedOffset = edgeMemoryLayout.get('weight').typedOffset;
/**
 * An implementation of an Edge
 */

const BaseEdgeImpl = createReader(edgeType, edgeMemoryLayout, ADDITIONAL_EDGE_PROPS);
export class EdgeImpl extends BaseEdgeImpl {
  /**
   * @inheritDoc
   * @see {@link Edge.load}
   */
  load(data, nodeIndexMap, defaultEdgeWeight = 1) {
    ;
    this.propertyBag = this.store.propertyBags[this.storeId] || {};
    this.store.propertyBags[this.storeId] = this.propertyBag;
    this.propertyBag.source = data.source;
    this.propertyBag.target = data.target;
    this.uint32Array[this.wordOffset + sourceIndexTypedOffset] = nodeIndexMap.get(data.source);
    this.uint32Array[this.wordOffset + targetIndexTypedOffset] = nodeIndexMap.get(data.target);
    this.float32Array[this.wordOffset + weightTypedOffset] = data.weight != null ? data.weight : defaultEdgeWeight;
    this.uint32Array[this.wordOffset + colorTypedOffset] = data.color || data.sourceColor || 0;
    this.uint32Array[this.wordOffset + color2TypedOffset] = data.color2 || data.targetColor || 0;
  }

}