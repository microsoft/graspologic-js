/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { MemoryReader } from '@graspologic/memstore';
/**
 * A basic graphical primitive object
 */
export declare type Primitive = MemoryReader & {
    id: string | undefined;
};
