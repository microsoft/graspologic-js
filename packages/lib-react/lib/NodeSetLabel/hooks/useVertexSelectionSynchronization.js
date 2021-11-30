/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect } from 'react';
export function useVertexSelectionSynchronization(renderer, renderable, vertexIds) {
    useEffect(() => {
        if (renderer && renderable) {
            renderer.awaitKickoff().then(() => {
                const vertices = Array.from(renderer.scene.primitives(new Set(vertexIds)));
                renderable.setData(vertices);
            });
        }
    }, [renderer, renderable, vertexIds]);
}
