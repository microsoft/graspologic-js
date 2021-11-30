/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { DirtyableRenderable } from './DirtyRenderable';
/**
 * Base class for a vertex renderable
 */
export declare abstract class DataboundRenderable<T> extends DirtyableRenderable {
    protected data: T | undefined;
    /**
     * Determines whether this renderable is enabled
     */
    get enabled(): boolean;
    /**
     * Get the related vertex
     */
    getData(): T | undefined;
    /**
     * Set the related vertex
     * @param vertex The related vertex
     */
    setData(data: T | undefined): void;
    /**
     * Returns true if the new data is equal to the old data
     * @param data The new data
     * @param existing The edisting data
     */
    protected isEqual(data: T | undefined, existing: T | undefined): boolean;
    /**
     * Inner handler for responding to a new set vertex
     * @param vertex The vertext that has been set
     */
    protected abstract handleSetData(vertex: T | undefined): void;
}
