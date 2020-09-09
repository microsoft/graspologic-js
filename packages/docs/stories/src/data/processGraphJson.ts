/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export default function processGraphJson(graphJson: any) {
	graphJson.graph.nodes = graphJson.graph.nodes.map((n: any) => ({
		...n,
		...n.metadata,
		metadata: undefined,
	}))
	graphJson.graph.edges = graphJson.graph.edges.map((e: any) => ({
		...e,
		...e.metadata,
		metadata: undefined,
	}))
	return graphJson.graph
}
