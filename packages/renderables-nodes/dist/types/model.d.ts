/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/**
 * @internal
 *
 * Creates a model object representing our nodes
 * @param gl The gl context
 * @param id The id of the model
 * @param vs The vertex shader code
 * @param defines The set of defines to pass to the compiler
 */
export default function createModel(gl: WebGLRenderingContext, id: string, vs: string, defines?: any): {
    model: any;
    buffer: any;
};
