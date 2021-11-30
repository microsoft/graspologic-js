/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Vector3, Quaternion } from 'math.gl'

/**
 * @internal
 *
 * Represents the state of a camera
 */
export class CameraState {
	public constructor(
		public position = new Vector3(),
		public rotation = new Quaternion(),
	) {}

	/**
	 * Creates a copy of this CameraState
	 */
	public clone = (): CameraState => {
		return new CameraState(this.position.clone(), this.rotation.clone())
	}
}
