/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export function createIdFactory(seedString: string): () => string {
	let instanceCount = 0
	return (): string => `${seedString}_${instanceCount++}_`
}
