/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export declare type Pos3D = [number, number, number];
/**
 * A 2D point array
 */
export declare type Pos2D = [number, number];
/**
 * The shape of an object
 */
export declare enum Shape {
    Circle = 0,
    Square = 1,
    Diamond = 2
}
/**
 * A generic interface which represents a ClassType
 */
export interface ClassType<T> {
    new (...args: any[]): T;
}
