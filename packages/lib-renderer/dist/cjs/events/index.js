"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _enableClickEvents = require("./enableClickEvents");

Object.keys(_enableClickEvents).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _enableClickEvents[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _enableClickEvents[key];
    }
  });
});

var _enablePanZoomEvents = require("./enablePanZoomEvents");

Object.keys(_enablePanZoomEvents).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _enablePanZoomEvents[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _enablePanZoomEvents[key];
    }
  });
});