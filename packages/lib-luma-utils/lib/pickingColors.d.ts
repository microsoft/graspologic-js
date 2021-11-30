/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export declare type PickingColor = Uint8Array | Uint16Array | Float32Array;
export declare function encodePickingColor(index: number): number[];
export declare function decodePickingColor(color: PickingColor): number;
export declare function getNullPickingColor(): Uint8Array;
