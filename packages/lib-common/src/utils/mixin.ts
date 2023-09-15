/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/* eslint-disable  @typescript-eslint/no-unsafe-argument */

// https://github.com/andywer/typed-emitter/blob/178536737cf6923a01224c46c29d777de7a5c8ac/index.d.ts#L1-L3 - MIT
export type Arguments<T> = [T] extends [(...args: infer U) => any]
	? U
	: [T] extends [void]
	? []
	: [T]

export type SingleArgument<T> = [T] extends [(arg: infer U) => any]
	? U
	: [T] extends [void]
	? []
	: [T]

export interface ClassType<T> {
	new (...args: any[]): T
}

export function applyMixins<T>(derivedCtor: ClassType<T>, constructors: any[]) {
	constructors.forEach(baseCtor => {
		Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
			Object.defineProperty(
				derivedCtor.prototype,
				name,
				Object.getOwnPropertyDescriptor(baseCtor.prototype, name) as any,
			)
		})
	})
	return derivedCtor
}
