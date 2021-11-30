/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react';
import { computeBounds } from '@graspologic/graph';
/**
 * Hook for computing the data bounds of the given container
 * @param container The data to compute the data bounds for
 */
export function useDataBounds(container) {
    return useMemo(() => (container && computeBounds(container)) || undefined, [
        container,
    ]);
}
