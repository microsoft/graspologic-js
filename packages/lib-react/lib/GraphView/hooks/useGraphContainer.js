/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react';
import { GraphContainer } from '@graspologic/graph';
/**
 * Converts __data__ to a GraphContainer
 * @param data The input data
 */
export function useGraphContainer(data) {
    return useMemo(() => {
        if (!data) {
            return undefined;
        }
        else if (Array.isArray(data.nodes)) {
            return GraphContainer.intern(data);
        }
        else {
            return data;
        }
    }, [data]);
}
