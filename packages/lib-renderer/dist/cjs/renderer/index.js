"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WebGLGraphRenderer = require("./WebGLGraphRenderer");

Object.keys(_WebGLGraphRenderer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _WebGLGraphRenderer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _WebGLGraphRenderer[key];
    }
  });
});