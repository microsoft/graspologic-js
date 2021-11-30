"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EdgeImpl = void 0;

var _layout = require("../layout");

var _memstore = require("@graspologic/memstore");

// Cache some of the attributes for the "load"
const sourceIndexTypedOffset = _layout.edgeMemoryLayout.get('sourceIndex').typedOffset;

const targetIndexTypedOffset = _layout.edgeMemoryLayout.get('targetIndex').typedOffset;

const colorTypedOffset = _layout.edgeMemoryLayout.get('color').typedOffset;

const color2TypedOffset = _layout.edgeMemoryLayout.get('color2').typedOffset;

const weightTypedOffset = _layout.edgeMemoryLayout.get('weight').typedOffset;
/**
 * An implementation of an Edge
 */


const BaseEdgeImpl = (0, _memstore.createReader)(_layout.edgeType, _layout.edgeMemoryLayout, _layout.ADDITIONAL_EDGE_PROPS);

class EdgeImpl extends BaseEdgeImpl {
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

exports.EdgeImpl = EdgeImpl;