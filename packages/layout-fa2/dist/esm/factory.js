function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FA2LayoutExecutor } from './FA2LayoutExecutor';
import { DEFAULT_CONFIGURATION } from './types';
import { CountdownClock } from '@graspologic/layout-core';
/**
 * @internal
 *
 * Creates a new instance of the ForceAtlas2 layout executor
 * @param graph The graph to layout
 * @param configuration The FA2 configuration
 * @param globalObject The global object
 */

export function createInstance(graph, configuration = {}, globalObject = window) {
  const finalConfig = _objectSpread(_objectSpread({}, DEFAULT_CONFIGURATION), configuration);

  return new FA2LayoutExecutor(graph, finalConfig, new CountdownClock(configuration.targetIterations || 100), globalObject);
}