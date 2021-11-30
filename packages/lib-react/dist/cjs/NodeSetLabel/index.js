"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _NodeSetLabel = require("./NodeSetLabel");

Object.keys(_NodeSetLabel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _NodeSetLabel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _NodeSetLabel[key];
    }
  });
});