"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _specification = require("./specification");

Object.keys(_specification).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _specification[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _specification[key];
    }
  });
});

var _store = require("./store");

Object.keys(_store).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _store[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _store[key];
    }
  });
});

var _reader = require("./reader");

Object.keys(_reader).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _reader[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _reader[key];
    }
  });
});