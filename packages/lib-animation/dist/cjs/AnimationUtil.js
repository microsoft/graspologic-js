"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAnimationUtil = createAnimationUtil;

var _memstore = require("@graspologic/memstore");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Provides an implementation of AnimationUtil
 */
class AnimationUtilImpl extends _memstore.MemoryReaderInspector {
  /**
   * Constructor for the AnimationUtilImpl
   * @param engineTime callback which returns the current engine time
   */
  constructor(engineTime) {
    super();

    _defineProperty(this, "engineTime", void 0);

    this.engineTime = engineTime;
  }
  /**
   * @inheritdoc
   * @see {@link AnimationUtil.animatePoint}
   */


  animatePoint(item, attribute, point, duration = 0) {
    var _item$store3;

    const startAttr = `${attribute}.start`;

    if (duration > 0) {
      var _item$store;

      const tweenAttr = `${attribute}.tween`;

      if (process.env.NODE_ENV !== 'production') {
        if (!item.layout.has(startAttr) || !item.layout.has(tweenAttr)) {
          throw new Error('Attribute does not support animation');
        }
      }

      const time = this.engineTime ? this.engineTime() : 0;
      const oldPoint = this.readFloat32Vec3Attr(item, attribute);
      this.writeFloat32Vec3Attr(item, startAttr, oldPoint[0], oldPoint[1], oldPoint[2]);
      this.writeFloat32Vec2Attr(item, tweenAttr, duration, time);
      (_item$store = item.store) === null || _item$store === void 0 ? void 0 : _item$store.notify(item.storeId, tweenAttr);
    } else if (item.layout.has(startAttr)) {
      var _item$store2;

      this.writeFloat32Vec3Attr(item, startAttr, point[0], point[1], point[2] || 0);
      (_item$store2 = item.store) === null || _item$store2 === void 0 ? void 0 : _item$store2.notify(item.storeId, startAttr);
    }

    this.writeFloat32Vec3Attr(item, attribute, point[0], point[1], point[2] || 0);
    (_item$store3 = item.store) === null || _item$store3 === void 0 ? void 0 : _item$store3.notify(item.storeId, attribute);
  }
  /**
   * @inheritdoc
   * @see {@link AnimationUtil.animateColor}
   */


  animateColor(item, attribute, color, duration = 0) {
    var _item$store7;

    const startAttr = attribute + '.start';

    if (duration > 0 && this.engineTime) {
      var _item$store4, _item$store5;

      const tweenAttr = attribute + '.tween';

      if (process.env.NODE_ENV !== 'production') {
        if (!item.layout.has(startAttr) || !item.layout.has(tweenAttr)) {
          throw new Error('Attribute does not support animation');
        }
      }

      const oldColor = this.readUint32Attr(item, attribute);
      this.writeUint32Attr(item, startAttr, oldColor);
      this.writeFloat32Vec2Attr(item, tweenAttr, duration, this.engineTime());
      (_item$store4 = item.store) === null || _item$store4 === void 0 ? void 0 : _item$store4.notify(item.storeId, startAttr);
      (_item$store5 = item.store) === null || _item$store5 === void 0 ? void 0 : _item$store5.notify(item.storeId, tweenAttr);
    } else if (item.layout.has(startAttr)) {
      var _item$store6;

      (_item$store6 = item.store) === null || _item$store6 === void 0 ? void 0 : _item$store6.notify(item.storeId, startAttr);
      this.writeUint32Attr(item, startAttr, color);
    }

    this.writeUint32Attr(item, attribute, color);
    (_item$store7 = item.store) === null || _item$store7 === void 0 ? void 0 : _item$store7.notify(item.storeId, attribute);
  }

}
/**
 * Creates a set of animation utilities
 * @param engineTime The engine time
 */


function createAnimationUtil(engineTime) {
  return new AnimationUtilImpl(engineTime);
}