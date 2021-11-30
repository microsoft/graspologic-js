"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EdgesRenderable = require("./EdgesRenderable");

Object.keys(_EdgesRenderable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EdgesRenderable[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _EdgesRenderable[key];
    }
  });
});