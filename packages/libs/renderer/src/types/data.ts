/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ReaderStore } from '@graspologic/memstore'

export type RegisterHandler<T> = (type: symbol, item: T) => any

/**
 * A generic store for storing "types" of items
 */
export interface TypeStore<T> {
	/**
	 * Registers a primitive store with the data manager
	 * @param type the render primitive type
	 * @param store the data store to register
	 */
	register(type: symbol, item: T): void

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
	retrieve(type: symbol): T | undefined

	/**
	 * Destroys the data manager
	 */
	destroy(): void
}

export type DataStore = TypeStore<ReaderStore<any>>

export interface NumberRange {
	/**
	 * The minimum value of the range
	 */
	min: number

	/**
	 * The maximum value of the range
	 */
	max: number
}

export interface Bounds2D {
	/**
	 * Represents the bounds in the x direction
	 */
	x: NumberRange

	/**
	 * Represents the bounds in the y direction
	 */
	y: NumberRange
}

export interface Bounds3D extends Bounds2D {
	/**
	 * Represents the bounds in the z direction
	 */
	z: NumberRange
}

/**
 * A generic set of bounds
 */
export type Bounds = Bounds2D & Partial<Bounds3D>
