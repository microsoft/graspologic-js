import * as React from 'react';
import { MutableRefObject } from 'react';
/**
 * Props for the SizedToParent component
 */
interface SizedToParentProps {
    /**
     * Ref for the element that is sized based on the parent
     */
    sizedRef?: MutableRefObject<HTMLElement | null>;
    /**
     * Event that gets called when the size has changed
     */
    onResize?: (dims: {
        width: number;
        height: number;
    }) => any;
    /**
     * The children to be placed into the sized element
     */
    children?: JSX.Element | JSX.Element[];
    /**
     * Sets the styling on the sizing element
     */
    style?: React.CSSProperties;
    /**
     * Sets the class name on the sizing element
     */
    className?: string;
}
/**
 * Provides an element that is sized to its parent, without affecting the size of the parent.
 * It works by creating an element that is out of the layout flow (using position: absolute).
 *
 * Children should be styled with 'width: 100%, height: 100%' or use the onResize event listener to control the size of children or some other combination
 */
export declare const SizedToParent: React.FC<SizedToParentProps>;
export {};
