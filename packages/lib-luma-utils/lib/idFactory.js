/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export function createIdFactory(seedString) {
    let instanceCount = 0;
    return () => `${seedString}_${instanceCount++}_`;
}
