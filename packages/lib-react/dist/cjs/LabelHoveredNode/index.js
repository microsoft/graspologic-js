"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LabelHoveredNode = require("./LabelHoveredNode");

Object.keys(_LabelHoveredNode).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _LabelHoveredNode[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _LabelHoveredNode[key];
    }
  });
});