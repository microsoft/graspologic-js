/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AttributeName } from '../specification'

/**
 * The configuration for the ArrayStore
 */
export interface StoreConfig {
	/**
	 * The initial capacity of the store
	 *
	 * @defaultValue 10000
	 */
	capacity: number

	/**
	 * If true, a SharedArrayBuffer will be used
	 *
	 * @defaultValue true
	 */
	shared: boolean

	/**
	 * The array buffer to use
	 */
	buffer?: ArrayBuffer

	/**
	 * If true, on store creation, it is assumed that the buffer is full of item data
	 *
	 * @defaultValue false
	 */
	allocatedOnCreate?: boolean

	/**
	 * If true, notification events will be emitted
	 *
	 * @defaultValue false
	 */
	notifications?: boolean
}

/**
 * A handler for when an attribute has been updated
 * @param index The index of the item
 * @param attribute The name of the attribute that was updated, if undefined, all attributes have been changed
 * @param value The new value of the attribute
 */
export type AttributeUpdatedHandler = (
	index: number,
	attribute?: AttributeName,
	value?: unknown,
) => void

/**
 * A handler for when an item has been remove or added
 * @param index The index of the item
 */
export type AddRemoveItemHandler = (index: number) => void

/**
 * A callback for detaching
 */
export type Detach = () => void
