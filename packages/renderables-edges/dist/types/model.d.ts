/**
 * @internal
 *
 * Creates a model object representing our edges
 * @param gl The gl context
 * @param id The id of the model
 * @param vs The vertex shader code
 * @param defines The set of defines to pass to the compiler
 */
export default function createModel(gl: WebGLRenderingContext, id: string, vs: string, defines?: {}): {
    model: any;
    buffer: any;
};
