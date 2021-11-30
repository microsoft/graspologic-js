"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SizedToParent = require("./SizedToParent");

Object.keys(_SizedToParent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SizedToParent[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SizedToParent[key];
    }
  });
});