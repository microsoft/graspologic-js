"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _restartTween = require("./restartTween");

Object.keys(_restartTween).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _restartTween[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _restartTween[key];
    }
  });
});

var _readTween = require("./readTween");

Object.keys(_readTween).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _readTween[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _readTween[key];
    }
  });
});

var _writeTween = require("./writeTween");

Object.keys(_writeTween).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _writeTween[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _writeTween[key];
    }
  });
});