"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _computeRepulsion = require("./computeRepulsion");

Object.keys(_computeRepulsion).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _computeRepulsion[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _computeRepulsion[key];
    }
  });
});