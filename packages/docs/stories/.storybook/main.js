/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const { configure } = require('@essex/storybook-config/lib/main')
module.exports = {
    ...configure({ pnp: true }),
    stories: ['../src/**/*stories.@(ts|tsx|js|jsx|mdx)'],
    babel: () => ({
        "presets": [
            [
                "@babel/preset-env",
                {
                    "targets": "last 2 Chrome versions"
                }
            ]
        ]
    }),
    addons: [
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/addon-knobs',
        '@storybook/addon-a11y',
        // '@storybook/addon-docs',
    ],
}