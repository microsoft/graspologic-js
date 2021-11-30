"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shape = void 0;

/**
 * The shape of an object
 */
var Shape;
exports.Shape = Shape;

(function (Shape) {
  Shape[Shape["Circle"] = 0] = "Circle";
  Shape[Shape["Square"] = 1] = "Square";
  Shape[Shape["Diamond"] = 2] = "Diamond";
})(Shape || (exports.Shape = Shape = {}));