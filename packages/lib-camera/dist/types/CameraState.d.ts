/**
 * @internal
 *
 * Represents the state of a camera
 */
export declare class CameraState {
    position: any;
    rotation: any;
    constructor(position?: any, rotation?: any);
    /**
     * Creates a copy of this CameraState
     */
    clone: () => CameraState;
}
