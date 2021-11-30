"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Axes = require("./Axes");

Object.keys(_Axes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Axes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Axes[key];
    }
  });
});