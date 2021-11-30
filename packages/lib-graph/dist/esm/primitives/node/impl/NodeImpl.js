import { Shape } from '../../types';
import { nodeMemoryLayout, nodeType, ADDITIONAL_NODE_PROPS } from '../layout';
import { createReader } from '@graspologic/memstore'; // Cache some of the attributes for the "load"

const positionTypedOffset = nodeMemoryLayout.get('position').typedOffset;
const radiusTypedOffset = nodeMemoryLayout.get('radius').typedOffset;
const shapeTypedOffset = nodeMemoryLayout.get('shape').typedOffset;
const weightTypedOffset = nodeMemoryLayout.get('weight').typedOffset;
const colorTypedOffset = nodeMemoryLayout.get('color').typedOffset;
const visibleTypedOffset = nodeMemoryLayout.get('visible').typedOffset;
/**
 * An implementation of a Node
 */

const BaseNodeImpl = createReader(nodeType, nodeMemoryLayout, ADDITIONAL_NODE_PROPS);
export class NodeImpl extends BaseNodeImpl {
  /**
   * @inheritDoc
   * @see {@link Node.load}
   */
  load(data) {
    ;
    this.propertyBag = this.store.propertyBags[this.storeId] || {};
    this.store.propertyBags[this.storeId] = this.propertyBag;
    this.propertyBag.id = data.id;
    this.propertyBag.group = data.group;
    this.propertyBag.label = data.label;
    this.float32Array[this.wordOffset + radiusTypedOffset] = data.size || data.radius || 0;
    this.float32Array[this.wordOffset + positionTypedOffset] = data.x || 0;
    this.float32Array[this.wordOffset + positionTypedOffset + 1] = data.y || 0;
    this.float32Array[this.wordOffset + positionTypedOffset + 2] = data.z || 0;
    this.float32Array[this.wordOffset + weightTypedOffset] = data.weight || 1;
    this.uint32Array[this.wordOffset + colorTypedOffset] = data.color || 0;
    this.uint8Array[this.byteOffset + shapeTypedOffset] = parseShape(data.shape);
    this.uint8Array[this.byteOffset + visibleTypedOffset] = 1;
  }

}
/**
 * Parses a Shape from an unparsed shape value
 * @param unparsedShape
 */

export function parseShape(unparsedShape) {
  if (typeof unparsedShape === 'string') {
    unparsedShape = unparsedShape.toLocaleLowerCase();

    if (unparsedShape === 'square') {
      return Shape.Square;
    } else if (unparsedShape === 'diamond') {
      return Shape.Diamond;
    }
  } else if (unparsedShape === Shape.Square || unparsedShape === Shape.Diamond || unparsedShape === Shape.Circle) {
    return unparsedShape;
  }

  return Shape.Circle;
}