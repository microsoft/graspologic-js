/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Vector3, Quaternion } from 'math.gl';
/**
 * @internal
 *
 * Represents the state of a camera
 */
export class CameraState {
    position;
    rotation;
    constructor(position = new Vector3(), rotation = new Quaternion()) {
        this.position = position;
        this.rotation = rotation;
    }
    /**
     * Creates a copy of this CameraState
     */
    clone = () => {
        return new CameraState(this.position.clone(), this.rotation.clone());
    };
}
