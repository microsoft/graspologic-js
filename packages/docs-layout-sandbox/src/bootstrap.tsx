/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import 'office-ui-fabric-react/dist/css/fabric.min.css'
import { initializeIcons } from '@uifabric/icons'
import React from 'react'
import { render } from 'react-dom'
import { ExampleApp } from './components/ExampleApp'

// inject root element into body
const rootElement = document.createElement('div')
rootElement.className = 'root'
document.body.appendChild(rootElement)

initializeIcons()
// render example into root element
render(<ExampleApp />, rootElement)
