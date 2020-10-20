/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const main = require('@essex/storybook-config/lib/main')
module.exports = {
    ...main.configure({ pnp: true }),
    stories: ['../src/**/*stories.@(ts|tsx|js|jsx|mdx)']
}