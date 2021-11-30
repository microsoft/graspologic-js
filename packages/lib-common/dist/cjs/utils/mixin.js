"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyMixins = applyMixins;

function applyMixins(derivedCtor, constructors) {
  constructors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
    });
  });
  return derivedCtor;
}