"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeImpl = void 0;
exports.parseShape = parseShape;

var _types = require("../../types");

var _layout = require("../layout");

var _memstore = require("@graspologic/memstore");

// Cache some of the attributes for the "load"
const positionTypedOffset = _layout.nodeMemoryLayout.get('position').typedOffset;

const radiusTypedOffset = _layout.nodeMemoryLayout.get('radius').typedOffset;

const shapeTypedOffset = _layout.nodeMemoryLayout.get('shape').typedOffset;

const weightTypedOffset = _layout.nodeMemoryLayout.get('weight').typedOffset;

const colorTypedOffset = _layout.nodeMemoryLayout.get('color').typedOffset;

const visibleTypedOffset = _layout.nodeMemoryLayout.get('visible').typedOffset;
/**
 * An implementation of a Node
 */


const BaseNodeImpl = (0, _memstore.createReader)(_layout.nodeType, _layout.nodeMemoryLayout, _layout.ADDITIONAL_NODE_PROPS);

class NodeImpl extends BaseNodeImpl {
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


exports.NodeImpl = NodeImpl;

function parseShape(unparsedShape) {
  if (typeof unparsedShape === 'string') {
    unparsedShape = unparsedShape.toLocaleLowerCase();

    if (unparsedShape === 'square') {
      return _types.Shape.Square;
    } else if (unparsedShape === 'diamond') {
      return _types.Shape.Diamond;
    }
  } else if (unparsedShape === _types.Shape.Square || unparsedShape === _types.Shape.Diamond || unparsedShape === _types.Shape.Circle) {
    return unparsedShape;
  }

  return _types.Shape.Circle;
}