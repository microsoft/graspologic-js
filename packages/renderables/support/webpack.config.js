/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const { configure } = require('@essex/webpack-config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackConfig = configure({
    pnp: true,
    // mode: 'production'
})

const plugins = webpackConfig.plugins || [];
// plugins.push(new BundleAnalyzerPlugin())
module.exports = {
    ...webpackConfig,
    plugins,
}
