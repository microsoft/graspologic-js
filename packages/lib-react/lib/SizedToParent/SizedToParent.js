/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useDimensions } from '@essex-js-toolkit/hooks';
import * as React from 'react';
import { memo, useEffect, useRef, useMemo } from 'react';
const DEFAULT_STYLE = {
    /* position: absolute so we don't cause the parent element to continually expand */
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
};
/**
 * Provides an element that is sized to its parent, without affecting the size of the parent.
 * It works by creating an element that is out of the layout flow (using position: absolute).
 *
 * Children should be styled with 'width: 100%, height: 100%' or use the onResize event listener to control the size of children or some other combination
 */
export const SizedToParent = memo(({ sizedRef, onResize, children, className, style }) => {
    const defaultRef = useRef(null);
    const ref = useMemo(() => sizedRef || defaultRef, [defaultRef, sizedRef]);
    const dims = useDimensions(ref);
    useEffect(() => {
        if (ref && dims && onResize) {
            onResize(dims);
        }
    }, [ref, dims, onResize]);
    const finalStyle = useMemo(() => ({
        ...DEFAULT_STYLE,
        ...(style || {}),
    }), [style]);
    return (React.createElement("div", { className: className, ref: ref, style: finalStyle }, children));
});
SizedToParent.displayName = 'SizedToParent';
