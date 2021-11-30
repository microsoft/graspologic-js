"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CountdownClock = require("./CountdownClock");

Object.keys(_CountdownClock).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CountdownClock[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _CountdownClock[key];
    }
  });
});

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});