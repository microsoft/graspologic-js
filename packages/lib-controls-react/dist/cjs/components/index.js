"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DisplaySettings = require("./DisplaySettings");

Object.keys(_DisplaySettings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DisplaySettings[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DisplaySettings[key];
    }
  });
});

var _EdgeSettings = require("./EdgeSettings");

Object.keys(_EdgeSettings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EdgeSettings[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EdgeSettings[key];
    }
  });
});

var _NodeSettings = require("./NodeSettings");

Object.keys(_NodeSettings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _NodeSettings[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _NodeSettings[key];
    }
  });
});

var _SettingsPane = require("./SettingsPane");

Object.keys(_SettingsPane).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SettingsPane[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SettingsPane[key];
    }
  });
});