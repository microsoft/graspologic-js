import { MemoryLayout } from '@graspologic/memstore';
/**
 * @internal
 *
 * Adapts the given memory layout for use in luma.gl
 * @param gl The rendering context
 * @param layout The memory layout
 * @param glTypeMapping The optional mapping from attribute to the webgl underlying type
 */
export declare function adaptMemoryLayoutToLuma(gl: WebGLRenderingContext, layout: MemoryLayout, glTypeMapping?: {
    [name: string]: {
        glType: number;
        size: number;
    };
}): {
    attributes: any;
    buffer: any;
};
