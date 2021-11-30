/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Bounds3D } from '../types';
/**
 * Updates the given bounds based on the new x, y, z values
 * @param bounds The current bounds
 * @param x The new x to be added
 * @param y The new y to be added
 * @param z The new z to be added
 */
export declare function processMinMax(bounds: Bounds3D, x: number, y: number, z: number): void;
/**
 * Updates the given bounds based on the new bounds
 * @param target The current bounds
 * @param newBounds The new bounds
 */
export declare function processMinMaxBounds(target: Bounds3D, newBounds: Bounds3D): void;
