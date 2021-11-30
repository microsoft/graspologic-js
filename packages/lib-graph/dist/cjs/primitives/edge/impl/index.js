"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EdgeImpl = require("./EdgeImpl");

Object.keys(_EdgeImpl).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EdgeImpl[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _EdgeImpl[key];
    }
  });
});

var _AnimatableEdgeImpl = require("./AnimatableEdgeImpl");

Object.keys(_AnimatableEdgeImpl).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AnimatableEdgeImpl[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AnimatableEdgeImpl[key];
    }
  });
});