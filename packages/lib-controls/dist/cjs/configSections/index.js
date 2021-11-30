"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _attachDisplaySettings = require("./attachDisplaySettings");

Object.keys(_attachDisplaySettings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _attachDisplaySettings[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _attachDisplaySettings[key];
    }
  });
});

var _attachEdgeSettings = require("./attachEdgeSettings");

Object.keys(_attachEdgeSettings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _attachEdgeSettings[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _attachEdgeSettings[key];
    }
  });
});

var _attachNodeSettings = require("./attachNodeSettings");

Object.keys(_attachNodeSettings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _attachNodeSettings[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _attachNodeSettings[key];
    }
  });
});