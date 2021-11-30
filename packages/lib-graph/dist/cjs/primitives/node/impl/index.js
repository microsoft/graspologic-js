"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _NodeImpl = require("./NodeImpl");

Object.keys(_NodeImpl).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _NodeImpl[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _NodeImpl[key];
    }
  });
});

var _AnimatableNodeImpl = require("./AnimatableNodeImpl");

Object.keys(_AnimatableNodeImpl).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AnimatableNodeImpl[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AnimatableNodeImpl[key];
    }
  });
});