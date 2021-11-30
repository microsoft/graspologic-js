"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
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

var _SlotAllocator = require("./SlotAllocator");

Object.keys(_SlotAllocator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SlotAllocator[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _SlotAllocator[key];
    }
  });
});

var _ArrayStore = require("./ArrayStore");

Object.keys(_ArrayStore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ArrayStore[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ArrayStore[key];
    }
  });
});

var _IdStore = require("./IdStore");

Object.keys(_IdStore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _IdStore[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _IdStore[key];
    }
  });
});