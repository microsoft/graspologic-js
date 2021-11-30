"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimatableNodeImpl = void 0;

var _layout = require("../layout");

var _NodeImpl = require("./NodeImpl");

var _memstore = require("@graspologic/memstore");

const allAttributes = '*';
const colorAttr = 'color';
const colorStartAttr = 'color.start';
const colorTweenAttr = 'color.tween';
const positionAttr = 'position';
const positionStartAttr = 'position.start';
const positionTweenAttr = 'position.tween'; // For fast lookup

const positionTypedOffset = (0, _layout.nodeTypedOffset)(positionAttr);
const positionStartTypedOffset = (0, _layout.nodeTypedOffset)(positionStartAttr);
const positionTweenTypedOffset = (0, _layout.nodeTypedOffset)(positionTweenAttr);
const colorTypedOffset = (0, _layout.nodeTypedOffset)(colorAttr);
const colorStartTypedOffset = (0, _layout.nodeTypedOffset)(colorStartAttr);
const colorTweenTypedOffset = (0, _layout.nodeTypedOffset)(colorTweenAttr);
const inspector = new _memstore.MemoryReaderInspector();
/**
 * An implementation of a Node that has animation capabilities
 */

class AnimatableNodeImplInternal extends _NodeImpl.NodeImpl {
  /**
   * @inheritDoc
   * @see {@link AnimatableNode.animatePosition}
   */
  animatePosition(position, duration = 0) {
    var _this$store;

    // Set the start to the old position
    inspector.copyFloat32Vec3Offset(this, positionTypedOffset, positionStartTypedOffset);
    this.handleAttributeUpdated(positionStartAttr); // Update the tween

    inspector.writeFloat32Vec2Offset(this, positionTweenTypedOffset, duration, ((_this$store = this.store) === null || _this$store === void 0 ? void 0 : _this$store.engineTime) || 0);
    this.handleAttributeUpdated(positionTweenAttr); // Update the end position

    inspector.writeFloat32Vec3Offset(this, positionTypedOffset, position[0] || 0, position[1] || 0, position[2] || 0);
    this.handleAttributeUpdated(positionAttr);
  }
  /**
   * @inheritDoc
   * @see {@link AnimatableNode.animateColor}
   */


  animateColor(color, duration = 0) {
    var _this$store2;

    // Set the start to the old color
    inspector.copyUint32Offset(this, colorTypedOffset, colorStartTypedOffset);
    this.handleAttributeUpdated(colorStartAttr); // Update the tween

    inspector.writeFloat32Vec2Offset(this, colorTweenTypedOffset, duration, ((_this$store2 = this.store) === null || _this$store2 === void 0 ? void 0 : _this$store2.engineTime) || 0);
    this.handleAttributeUpdated(colorTweenAttr); // Update the end color

    inspector.writeUint32Offset(this, colorTypedOffset, color);
    this.handleAttributeUpdated(colorAttr);
  }
  /**
   * @inheritDoc
   * @see {@link Node.load}
   */


  load(data) {
    super.load(data);
    this.handleAttributeUpdated(allAttributes);
  }
  /**
   * Handler for when an attribute is updated
   * @param name The name of the attribute
   * @param value The value of the attribute
   */


  handleAttributeUpdated(name) {
    if (this.store) {
      this.store.notify(this.storeId, name);
    }
  }

}
/**
 * An implementation of a Node that has animation capabilities
 */


const AnimatableNodeImpl = AnimatableNodeImplInternal;
exports.AnimatableNodeImpl = AnimatableNodeImpl;