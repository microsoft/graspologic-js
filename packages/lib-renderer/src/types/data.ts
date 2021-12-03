/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ReaderStore } from '@graspologic/memstore'

export type RegisterHandler<T> = (type: symbol, item: T) => any

/**
 * A generic store for storing "types" of items
 */
export interface TypeStore<T> extends Iterable<T> {
	/**
	 * Registers a primitive store with the data manager
	 * @param type the render primitive type
	 * @param store the data store to register
	 */
	register(type: symbol, item: T): void

	/**
	 * Gets the types of data contained in this store
	 */
	types(): Iterable<symbol>

	/**
	 * Adds a handler for when a type store is registered
	 * @param handler The handler to add
	 * @returns A unsubscribe function
	 */
	onRegister(handler: RegisterHandler<T>): () => void

	/**
	 * Gets the data associated with the given primitive type
	 * @param type The primitive type
	 */
	retrieve<P extends T = T>(type: symbol): P | undefined

	/**
	 * Destroys the data manager
	 */
	destroy(): void
}

export type DataStore<T = any> = TypeStore<ReaderStore<T>>
