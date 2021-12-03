/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
require('jest-webgl-canvas-mock')
require('regenerator-runtime/runtime')
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17')
const enzyme = require('enzyme')

enzyme.configure({ adapter: new Adapter() })
