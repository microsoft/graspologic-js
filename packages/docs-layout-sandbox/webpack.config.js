/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const { configure } = require('@essex/webpack-config')

const webpackConfig = configure({
	pnp: true,
})

// hack until invalid config is removed
webpackConfig.devServer.client = {}
webpackConfig.devServer.client.logging = 'error'
delete webpackConfig.devServer.clientLogLevel
delete webpackConfig.devServer.stats

module.exports = webpackConfig
