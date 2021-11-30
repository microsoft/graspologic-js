"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rand = require("./rand");

Object.keys(_rand).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _rand[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _rand[key];
    }
  });
});

var _computeBounds = require("./computeBounds");

Object.keys(_computeBounds).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _computeBounds[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _computeBounds[key];
    }
  });
});