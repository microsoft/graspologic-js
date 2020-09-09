/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { TypeStore, RegisterHandler } from '../../types'

/**
 * A symbol-mapping data retriever
 */
export class GenericTypeStore<T> implements TypeStore<T> {
	private _items: Map<symbol, T> = new Map()
	private _handlers: RegisterHandler<T>[] = []
	private destroyed = false

	public register(type: symbol, store: T) {
		this._items.set(type, store)
		for (const handler of this._handlers) {
			handler(type, store)
		}
	}

	public retrieve(type: symbol): T | undefined {
		return this._items.get(type)
	}

	public onRegister(handler: RegisterHandler<T>) {
		this._handlers.push(handler)
		return () => {
			this._handlers.splice(this._handlers.indexOf(handler), 1)
		}
	}

	/**
	 * @inheritdoc
	 * @see {@link TypeStore.destroy}
	 */
	public destroy() {
		if (!this.destroyed) {
			this.destroyed = true
			this._items.forEach((item: any) => {
				if (typeof item.destroy === 'function') {
					item.destroy()
				}
			})
			this._items.clear()
		}
	}
}
