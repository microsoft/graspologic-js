/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export declare enum Endianness {
    Little = 0,
    Big = 1
}
/**
 * Returns the endianness of the system
 */
export declare function endianness(): Endianness;
