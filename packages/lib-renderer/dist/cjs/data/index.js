"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _processGraph = require("./processGraph");

Object.keys(_processGraph).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _processGraph[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _processGraph[key];
    }
  });
});