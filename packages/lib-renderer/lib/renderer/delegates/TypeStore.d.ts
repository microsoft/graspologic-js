/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { TypeStore, RegisterHandler } from '../../types';
/**
 * A symbol-mapping data retriever
 */
export declare class GenericTypeStore<T> implements TypeStore<T> {
    private _items;
    private _handlers;
    private destroyed;
    register(type: symbol, store: T): void;
    types(): Iterable<symbol>;
    retrieve<P extends T = T>(type: symbol): P | undefined;
    onRegister(handler: RegisterHandler<T>): () => void;
    /**
     * @inheritdoc
     * @see {@link TypeStore.destroy}
     */
    destroy(): void;
    /**
     * @inheritdoc
     */
    [Symbol.iterator](): Iterator<T>;
}
