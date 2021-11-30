import "core-js/modules/es.symbol";
import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.for-each";
import "core-js/modules/es.object.get-own-property-descriptor";
import "core-js/modules/es.object.get-own-property-descriptors";
import "core-js/modules/es.object.keys";
import "core-js/modules/web.dom-collections.for-each";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useDimensions } from '@essex-js-toolkit/hooks';
import * as React from 'react';
import { memo, useEffect, useRef, useMemo } from 'react';
var DEFAULT_STYLE = {
  /* position: absolute so we don't cause the parent element to continually expand */
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  overflow: 'hidden'
};
/**
 * Provides an element that is sized to its parent, without affecting the size of the parent.
 * It works by creating an element that is out of the layout flow (using position: absolute).
 *
 * Children should be styled with 'width: 100%, height: 100%' or use the onResize event listener to control the size of children or some other combination
 */

export var SizedToParent = memo(function (_ref) {
  var sizedRef = _ref.sizedRef,
      onResize = _ref.onResize,
      children = _ref.children,
      className = _ref.className,
      style = _ref.style;
  var defaultRef = useRef(null);
  var ref = useMemo(function () {
    return sizedRef || defaultRef;
  }, [defaultRef, sizedRef]);
  var dims = useDimensions(ref);
  useEffect(function () {
    if (ref && dims && onResize) {
      onResize(dims);
    }
  }, [ref, dims, onResize]);
  var finalStyle = useMemo(function () {
    return _objectSpread(_objectSpread({}, DEFAULT_STYLE), style || {});
  }, [style]);
  return React.createElement("div", {
    className: className,
    ref: ref,
    style: finalStyle
  }, children);
});
SizedToParent.displayName = 'SizedToParent';