"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _data = require("./data");

Object.keys(_data).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _data[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _data[key];
    }
  });
});

var _scene = require("./scene");

Object.keys(_scene).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _scene[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _scene[key];
    }
  });
});

var _renderer = require("./renderer");

Object.keys(_renderer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _renderer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _renderer[key];
    }
  });
});

var _primitives = require("./primitives");

Object.keys(_primitives).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _primitives[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _primitives[key];
    }
  });
});