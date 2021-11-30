"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colorizeRenderer = require("./colorizeRenderer");

Object.keys(_colorizeRenderer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _colorizeRenderer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _colorizeRenderer[key];
    }
  });
});