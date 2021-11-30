"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Edges = require("./Edges");

Object.keys(_Edges).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Edges[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Edges[key];
    }
  });
});