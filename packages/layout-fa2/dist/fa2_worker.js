(function () {
	'use strict';

	/**
	 * @internal
	 *
	 * Applies the forces to the nodes to move them
	 * @param nodes The node data
	 * @param config The layout configuration
	 * @param repulsion The repulsion amount
	 * @param gravity The gravity amount
	 * @param attraction
	 * @returns The force metrics
	 */
	function applyForces(
		nodes,
		config,
		// Force Metrics
		repulsion,
		gravity,
		attraction,
	) {
		let force, swinging, traction, nodespeed;
		let totalTension = 0;
		let totalSwing = 0;
		let totalTraction = 0;
		let node;
		let forceScale;

		// MATH: sqrt and square distances
		for (node of nodes) {
			if (!node.fixed) {
				force = getForce(node);
				swinging = getSwing(node);
				traction = getTraction(node);

				// track global metrics
				totalTension += force;
				totalSwing += swinging;
				totalTraction += traction;

				if (config.adjustSizes) {
					if (force > config.maxForce) {
						forceScale = config.maxForce / force;
						node.dx *= forceScale;
						node.dy *= forceScale;
					}
					nodespeed = getNodeSpeed(0.1, traction, swinging);
				} else {
					nodespeed = getNodeSpeed(node.convergence, traction, swinging);
					// Updating node convergence
					node.convergence = getNodeConvergence(node, swinging, nodespeed);
				}

				moveNode(node, nodespeed / config.slowDown);
			}
		}
		return [
			totalTension,
			totalSwing,
			totalTraction,
			repulsion,
			gravity,
			attraction,
		]
	}

	function getNodeConvergence(
		node,
		swinging,
		speed,
	) {
		return Math.min(
			1,
			Math.sqrt(
				(speed * (node.dx ** 2 + node.dy ** 2)) / (1 + Math.sqrt(swinging)),
			),
		)
	}

	function getNodeSpeed(
		convergence,
		traction,
		swinging,
	) {
		return (convergence * Math.log(1 + traction)) / (1 + Math.sqrt(swinging))
	}

	function moveNode(node, factor) {
		node.x += node.dx * factor;
		node.y += node.dy * factor;
	}

	function getSwing(node) {
		return (
			node.mass *
			Math.sqrt((node.old_dx - node.dx) ** 2 + (node.old_dy - node.dy) ** 2)
		)
	}

	function getTraction(node) {
		return (
			Math.sqrt((node.old_dx + node.dx) ** 2 + (node.old_dy + node.dy) ** 2) / 2
		)
	}

	function getForce(node) {
		return Math.sqrt(node.dx ** 2 + node.dy ** 2)
	}

	/**
	 * @internal
	 *
	 * Computes the attraction component of the FA2 algorithm
	 * @param nodes The set of node data
	 * @param edges The set of edge data
	 * @param config The layout configuration
	 * @returns The total scaled distance in the graph
	 */
	function computeAttraction(
		nodes,
		edges,
		config,
	) {
		const coefficient =
			1 *
			(config.outboundAttractionDistribution
				? getOutboundAttCompensation(nodes, config)
				: 1);

		// TODO: simplify distance
		// TODO: coefficient is always used as -c --> optimize?
		let edge;
		let source;
		let target;
		// edge weight
		let w;
		// edge weight influence
		let ewc;
		let xDist;
		let yDist;
		let distance;
		let factor = 0;

		let result = 0;
		for (edge of edges) {
			// Get the edge and nodes on the edge
			source = nodes.itemAt(edge.sourceIndex);
			target = nodes.itemAt(edge.targetIndex);

			// Compute necessary values
			w = edge.weight;
			ewc = Math.pow(w, config.edgeWeightInfluence);
			xDist = source.x - target.x;
			yDist = source.y - target.y;

			// Applying attraction to nodes
			if (config.adjustSizes) {
				distance = Math.sqrt(xDist ** 2 + yDist ** 2 - source.size - target.size);

				if (config.linLogMode) {
					if (config.outboundAttractionDistribution) {
						//-- LinLog Degree Distributed Anti-collision Attraction
						if (distance > 0) {
							factor =
								(-coefficient * ewc * Math.log(1 + distance)) /
								distance /
								source.mass;
						}
					} else {
						//-- LinLog Anti-collision Attraction
						if (distance > 0) {
							factor = (-coefficient * ewc * Math.log(1 + distance)) / distance;
						}
					}
				} else {
					if (config.outboundAttractionDistribution) {
						//-- Linear Degree Distributed Anti-collision Attraction
						if (distance > 0) {
							factor = (-coefficient * ewc) / source.mass;
						}
					} else {
						//-- Linear Anti-collision Attraction
						if (distance > 0) {
							factor = -coefficient * ewc;
						}
					}
				}
			} else {
				distance = Math.sqrt(xDist ** 2 + yDist ** 2);

				if (config.linLogMode) {
					if (config.outboundAttractionDistribution) {
						//-- LinLog Degree Distributed Attraction
						if (distance > 0) {
							factor =
								(-coefficient * ewc * Math.log(1 + distance)) /
								distance /
								source.mass;
						}
					} else {
						//-- LinLog Attraction
						if (distance > 0)
							factor = (-coefficient * ewc * Math.log(1 + distance)) / distance;
					}
				} else {
					if (config.outboundAttractionDistribution) {
						//-- Linear Attraction Mass Distributed
						// NOTE: Distance is set to 1 to override next condition
						distance = 1;
						factor = (-coefficient * ewc) / source.mass;
					} else {
						//-- Linear Attraction
						// NOTE: Distance is set to 1 to override next condition
						distance = 1;
						factor = -coefficient * ewc;
					}
				}
			}

			// Updating nodes' dx and dy
			// TODO: if condition or factor = 1?
			if (distance > 0) {
				// Updating nodes' dx and dy
				source.dx += xDist * factor;
				source.dy += yDist * factor;
				target.dx -= xDist * factor;
				target.dy -= yDist * factor;
				result += distance * factor;
			}
		}
		return result
	}

	function getOutboundAttCompensation(
		nodes,
		config,
	) {
		let outboundAttCompensation = 0;
		// If outbound attraction distribution, compensate
		if (config.outboundAttractionDistribution) {
			outboundAttCompensation = 0;
			let node;
			for (node of nodes) {
				outboundAttCompensation += node.mass;
			}
			outboundAttCompensation /= nodes.count;
		}
		return outboundAttCompensation
	}

	/**
	 * @internal
	 *
	 * Computes the gravity component of the FA2 algorithm
	 * @param nodes The set of node data
	 * @param config The layout configuration
	 * @returns The total gravity in the system
	 */
	function computeGravity(
		nodes,
		config,
	) {
		const g = config.gravity / config.scalingRatio;
		const coefficient = config.scalingRatio;
		let node;
		let distance;
		let factor;

		let totalGravity = 0;

		for (node of nodes) {
			distance = Math.sqrt(node.x ** 2 + node.y ** 2);

			factor = 0;
			if (config.strongGravityMode) {
				// strong gravity
				if (distance > 0) {
					factor = coefficient * node.mass * g;
				}
			} else {
				// linear anti-collision repulsion
				if (distance > 0) {
					factor = (coefficient * node.mass * g) / distance;
				}
			}

			totalGravity += distance * factor;

			// Updating node's dx and dy
			node.dx -= node.x * factor;
			node.dy -= node.y * factor;
		}

		return totalGravity
	}

	/**
	 * @internal
	 *
	 * Computes the repulsion between the two given nodes
	 * @param n1 The first node
	 * @param n2 The second node
	 * @returns The amount of repulsion
	 */
	function computeNodeRepulsion(
		n1,
		n2,
		config,
	) {
		const coefficient = config.scalingRatio;

		// Common to both methods
		const xDist = n1.x - n2.x;
		const yDist = n1.y - n2.y;
		const massCoeff = coefficient * n1.mass * n2.mass;
		let distance = 0;
		let factor = 0;
		let xdf;
		let ydf;
		if (config.adjustSize) {
			//-- Anticollision Linear Repulsion
			distance = Math.sqrt(xDist ** 2 + yDist ** 2) - n1.size - n2.size;

			if (distance > 0) {
				// Updating nodes' dx and dy
				factor = massCoeff / distance ** 2;
				xdf = xDist * factor;
				ydf = yDist * factor;
				n1.dx += xdf;
				n1.dy += ydf;
				n2.dx -= xdf;
				n2.dy -= ydf;
			} else if (distance < 0) {
				// Updating nodes' dx and dy
				factor = 100 * massCoeff;
				xdf = xDist * factor;
				ydf = yDist * factor;
				n1.dx += xdf;
				n1.dy += ydf;
				n2.dx -= xdf;
				n2.dy -= ydf;
			} else {
				console.log('Zero Distance 2');
			}
		} else {
			//-- Linear Repulsion
			distance = Math.sqrt(xDist ** 2 + yDist ** 2);
			if (distance > 0) {
				// Updating nodes' dx and dy
				factor = massCoeff / distance ** 2;
				xdf = xDist * factor;
				ydf = yDist * factor;
				n1.dx += xdf;
				n1.dy += ydf;
				n2.dx -= xdf;
				n2.dy -= ydf;
			}
		}
		return 0
	}

	/**
	 * @internal
	 * Computes the the weighted center of the given positions, using the given weights
	 * @param points The list of points
	 * @param weights The list of weights
	 * @returns The weighted centroid
	 */
	function weightedCentroid(
		points,
		weights,
	) {
		if (points.length === 0) {
			throw new Error('could not compute centroid out of zero points')
		}
		if (points.length !== weights.length) {
			throw new Error('points array and weights array must be the same length')
		}

		let xSum = 0.0;
		let ySum = 0.0;
		let totalWeight = 0.0;

		points.forEach((point, index) => {
			const weight = weights[index];
			totalWeight += weight;
			xSum += point.x * weight;
			ySum += point.y * weight;
		});

		const x = xSum / totalWeight;
		const y = ySum / totalWeight;
		return { x, y }
	}

	/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */
	function jiggle(factor = 1e-6) {
		return (Math.random() - 0.5) * factor
	}

	/**
	 * @internal
	 *
	 * Generates a random number between the min and max values
	 * @param min The minimum value of the number
	 * @param max The maximum value of the number
	 * @returns The random number
	 */
	function randBetween(min, max) {
		return Math.random() * (max - min) + min
	}

	function _optionalChain$a(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */


	/**
	 * @internal
	 *
	 * An implementation of a quad tree
	 */
	class QuadTree {
		

		
		
		
		

		 __init() {this.mass = 0;}

		/**
		 * Center of mass X
		 */
		 __init2() {this.cx = 0;}
		/**
		 * Center of mass Y
		 */
		 __init3() {this.cy = 0;}

		 __init4() {this.x0 = Number.POSITIVE_INFINITY;}
		 __init5() {this.x1 = Number.NEGATIVE_INFINITY;}
		 __init6() {this.y0 = Number.POSITIVE_INFINITY;}
		 __init7() {this.y1 = Number.NEGATIVE_INFINITY;}

		

		/**
		 * Constructor for QuadTree
		 * @param nodes The nodes in the tree
		 * @param level The level of this quad tree
		 */
		 constructor(nodes, level = 0) {QuadTree.prototype.__init.call(this);QuadTree.prototype.__init2.call(this);QuadTree.prototype.__init3.call(this);QuadTree.prototype.__init4.call(this);QuadTree.prototype.__init5.call(this);QuadTree.prototype.__init6.call(this);QuadTree.prototype.__init7.call(this);
			this.level = level;
			let node;
			let prevNode;
			let newMass;
			let numNodes = 0;

			for (node of nodes) {
				numNodes++;

				// jiggle nodes if they are co-located
				if (_optionalChain$a([prevNode, 'optionalAccess', _ => _.x]) === node.x && _optionalChain$a([prevNode, 'optionalAccess', _2 => _2.y]) === node.y) {
					node.x += jiggle(1e-3);
					node.y += jiggle(1e-3);
				}

				// Update center of mass
				newMass = node.mass + this.mass;
				this.cx = (node.x * node.mass + this.cx * this.mass) / newMass;
				this.cy = (node.y * node.mass + this.cy * this.mass) / newMass;
				this.mass = newMass;

				// Update bounds
				this.x0 = Math.min(this.x0, node.x);
				this.x1 = Math.max(this.x1, node.x);
				this.y0 = Math.min(this.y0, node.y);
				this.y1 = Math.max(this.y1, node.y);
				prevNode = node;
			}

			if (numNodes === 0) {
				throw new Error('there should be at least one node in a QuadTree node')
			} else if (numNodes === 1) {
				this.node = nodes[0];
			} else {
				const nwChildren = [];
				const neChildren = [];
				const swChildren = [];
				const seChildren = [];

				for (node of nodes) {
					if (node.y > this.cy) {
						if (node.x > this.cx) {
							neChildren.push(node);
						} else {
							nwChildren.push(node);
						}
					} else {
						if (node.x > this.cx) {
							seChildren.push(node);
						} else {
							swChildren.push(node);
						}
					}
				}

				if (neChildren.length > 0) {
					this.neChild = new QuadTree(neChildren, this.level + 1);
				}
				if (nwChildren.length > 0) {
					this.nwChild = new QuadTree(nwChildren, this.level + 1);
				}
				if (seChildren.length > 0) {
					this.seChild = new QuadTree(seChildren, this.level + 1);
				}
				if (swChildren.length > 0) {
					this.swChild = new QuadTree(swChildren, this.level + 1);
				}
			}
		}

		/**
		 * Gets the depth of this quad tree
		 * @returns The depth
		 */
		 get depth() {
			if (this.isLeaf) {
				return 0
			} else {
				return (
					1 +
					Math.max(
						this.nwChild ? this.nwChild.depth : 0,
						this.neChild ? this.neChild.depth : 0,
						this.swChild ? this.swChild.depth : 0,
						this.seChild ? this.seChild.depth : 0,
					)
				)
			}
		}

		/**
		 * Gets the size of the quad tree
		 */
		 get size() {
			return (this.x1 - this.x0) / 2
		}

		/**
		 * True if the quad tree is a leaf
		 */
		 get isLeaf() {
			return !this.nwChild && !this.neChild && !this.swChild && !this.seChild
		}

		/**
		 * Applies a visitor to the quad tree
		 * @param callback The visitor
		 */
		 visit(callback) {
			const queue = [this];
			while (queue.length > 0) {
				const qt = queue.pop();
				const halt = callback(qt);
				if (!halt) {
					if (qt.nwChild) {
						queue.push(qt.nwChild);
					}
					if (qt.neChild) {
						queue.push(qt.neChild);
					}
					if (qt.swChild) {
						queue.push(qt.swChild);
					}
					if (qt.seChild) {
						queue.push(qt.seChild);
					}
				}
			}
		}
	}

	/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */







	/**
	 * The shape of an object
	 */
	var Shape; (function (Shape) {
		const Circle = 0; Shape[Shape["Circle"] = Circle] = "Circle";
		const Square = 1; Shape[Shape["Square"] = Square] = "Square";
		const Diamond = 2; Shape[Shape["Diamond"] = Diamond] = "Diamond";
	})(Shape || (Shape = {}));

	/**
	 * A generic interface which represents a ClassType
	 */

	/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */
	var AttributeType; (function (AttributeType) {
		const Float32 = 0; AttributeType[AttributeType["Float32"] = Float32] = "Float32";
		const Uint8 = Float32 + 1; AttributeType[AttributeType["Uint8"] = Uint8] = "Uint8";
		const Uint32 = Uint8 + 1; AttributeType[AttributeType["Uint32"] = Uint32] = "Uint32";
	})(AttributeType || (AttributeType = {}));

	/**
	 * The specification for a single attribute contained in a MemoryLayout
	 */






















































































































	/**
	 * Indicates how a value should be interpreted
	 */
	var InterpretationHint; (function (InterpretationHint) {
		/**
		 * Interpret a uint8 value as a boolean
		 */
		const Boolean = 0; InterpretationHint[InterpretationHint["Boolean"] = Boolean] = "Boolean";
	})(InterpretationHint || (InterpretationHint = {}));

	/**
	 * An alias for an attribute
	 */

	/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */

	/**
	 * @internal
	 *
	 * A mapping from AttributeType to the number of bytes required to store it
	 */
	const DATA_TYPE_TO_BYTES = {
		[AttributeType.Float32]: 4,
		[AttributeType.Uint32]: 4,
		[AttributeType.Uint8]: 1,
	};

	/**
	 * @internal
	 *
	 * Gets the size in bytes for the given data type
	 * @param type The data type to inspect
	 */
	function getAttributeTypeByteSize(type) {
		return DATA_TYPE_TO_BYTES[type]
	}

	function _optionalChain$9(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */

	const SpacerAttributeName = '__SPACER__';

	/**
	 * @internal
	 *
	 * Specification for an individual item used when constructing a MemoryLayout object
	 */



























	/**
	 * @internal
	 *
	 * Creates a LayoutBuilder which can be used to construct a MemoryLayout
	 */
	function createLayoutBuilder() {
		const toBuild = new Map(); 




		function addAttribute(
			name,
			type,
			size,
			options



	,
		) {
			toBuild.set(name, {
				name,
				size,
				type,
				options,
			});
		}
		const me = {
			addUint8(name, options) {
				addAttribute(name, AttributeType.Uint8, 1, options);
				return me
			},
			addUint8Vec2(name, options) {
				addAttribute(name, AttributeType.Uint8, 2, options);
				return me
			},
			addUint8Vec3(name, options) {
				addAttribute(name, AttributeType.Uint8, 3, options);
				return me
			},
			addUint8Vec4(name, options) {
				addAttribute(name, AttributeType.Uint8, 4, options);
				return me
			},
			addFloat32(name, options) {
				addAttribute(name, AttributeType.Float32, 1, options);
				return me
			},
			addFloat32Vec2(name, options) {
				addAttribute(name, AttributeType.Float32, 2, options);
				return me
			},
			addFloat32Vec3(name, options) {
				addAttribute(name, AttributeType.Float32, 3, options);
				return me
			},
			addUint32(name, options) {
				addAttribute(name, AttributeType.Uint32, 1, options);
				return me
			},
			build() {
				const built = new Map(); 

				// Organize so the FLOAT types come before the BYTE types
				// The reason we do this is because FLOAT offsets have to be multiples of 4 (bytes)
				// so, we pack the floats first, so that all their offsets are multiples of 4
				// then we fill in the rest with the bytes
				let offset = 0;

				// Float32 first
				toBuild.forEach(attr => {
					if (attr.type === AttributeType.Float32) {
						offset += buildAttribute(attr, offset, built);
					}
				});
				// Uint32 next
				toBuild.forEach(attr => {
					if (attr.type === AttributeType.Uint32) {
						offset += buildAttribute(attr, offset, built);
					}
				});
				// Uint8 Bytes last
				toBuild.forEach(attr => {
					if (attr.type === AttributeType.Uint8) {
						offset += buildAttribute(attr, offset, built);
					}
				});

				const align = offset % 4;
				if (offset % 4 !== 0) {
					offset += buildAttribute(
						{
							name: SpacerAttributeName,
							type: AttributeType.Uint8,
							size: 4 - align,
						},
						offset,
						built,
					);
				}
				built.stride = offset;
				return built
			},
		};
		return me
	}

	/**
	 * Builds a attribute specification from __attr__ build configuration
	 * @param attr The attribute specification
	 * @param offset The offset for the attribute
	 * @param built The current mapping of all the attributes
	 */
	function buildAttribute(
		attr,
		offset,
		built,
	) {
		const bytesPerItem = getAttributeTypeByteSize(attr.type);
		const typedOffset = offset / bytesPerItem;

		// add the primary attribute
		built.set(attr.name, {
			name: attr.name,
			size: attr.size,
			type: attr.type,
			hint: attr.hint,
			typedOffset,
			offset,
		});

		// add any vector component aliases
		let componentIndex = 0;
		let component;
		for (component of _optionalChain$9([attr, 'access', _ => _.options, 'optionalAccess', _2 => _2.components]) || []) {
			built.set(component, {
				name: component,
				size: 1,
				type: attr.type,
				typedOffset: typedOffset + componentIndex,
				offset: offset + componentIndex * bytesPerItem,
			});
			componentIndex++;
		}

		// add any reinterpretation aliases
		let alias;
		for (alias of _optionalChain$9([attr, 'access', _3 => _3.options, 'optionalAccess', _4 => _4.aliases]) || []) {
			built.set(alias.name, {
				name: alias.name,
				size: alias.size || 1,
				type: alias.type,
				hint: alias.hint,
				typedOffset: offset / getAttributeTypeByteSize(alias.type),
				offset,
			});
		}
		return attr.size * bytesPerItem
	}

	/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */
	const DEFAULT_CAPACITY = 10000;

	/**
	 * The default shared value of our stores
	 */
	const DEFAULT_SHARED = true;

	/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */

	/**
	 * A class for managing id allocation
	 */
	class SlotAllocator {
		 __init() {this.availableIndices = new Map();}
		

		 __init2() {this.capacity = 0;}

		/**
		 * Constructor for the SlotAllocator
		 * @param capacity The number of ids to support
		 * @param consumed If true, the allocator is assumed to be full
		 * @throws If an invalid capacity is passed to the constructor
		 */
		 constructor(capacity = DEFAULT_CAPACITY, consumed = false) {SlotAllocator.prototype.__init.call(this);SlotAllocator.prototype.__init2.call(this);
			if (capacity == null || capacity <= 0) {
				throw new Error(`Invalid capacity ${capacity}, capacity must be > 0`)
			}
			this.capacity = capacity;

			// if the allocator starts out consumed, don't reset its capacity
			if (!consumed) {
				this.reset(capacity);
			}
		}

		/**
		 * Resets the allocator back to the default state
		 * @param capacity The number of items to support
		 * @throws If an invalid capacity is passed to the function
		 */
		 reset(capacity) {
			if (capacity == null || capacity <= 0) {
				throw new Error(`Invalid capacity ${capacity}, capacity must be > 0`)
			}

			this.capacity = capacity;
			for (let i = 0; i < this.capacity - 1; i++) {
				this.availableIndices.set(i, i + 1);
			}
			this.availableIndices.set(this.capacity - 1, -1);
			this.nextAvailableIndex = 0;
		}

		/**
		 * Grow the capacity of the slot allocator by __newCapacity__
		 * @param newCapacity The new capacity of the allocator
		 * @throws If an invalid capacity is passed to the function
		 */
		 grow(newCapacity) {
			if (newCapacity == null || newCapacity <= 0) {
				throw new Error(
					`Invalid capacity ${newCapacity}, newCapacity must be > 0`,
				)
			}

			for (let i = this.capacity; i < newCapacity - 1; i++) {
				this.availableIndices.set(i, i + 1);
			}
			this.nextAvailableIndex = this.capacity;
			this.capacity = newCapacity;
		}

		/**
		 * Returns true if there are available ids
		 */
		 get hasFreeSpace() {
			return this.nextAvailableIndex != null
		}

		/**
		 * Frees __index__ for re-use
		 * @param index The index to free
		 * @throws An error for an invalid index
		 */
		 free(index) {
			if (index == null || index < 0 || index > this.capacity - 1) {
				throw new Error(`Invalid index ${index}`)
			}
			this.availableIndices.set(index, this.nextAvailableIndex);
			this.nextAvailableIndex = index;
		}

		/**
		 * Allocates a new index
		 *
		 * @throws An error if there is no space available
		 */
		 alloc() {
			if (this.nextAvailableIndex == null) {
				throw new Error('error allocating index, no space available')
			}
			const freeIndex = this.nextAvailableIndex;
			this.nextAvailableIndex =
				this.availableIndices.get(freeIndex) > 0
					? this.availableIndices.get(freeIndex)
					: undefined;
			this.availableIndices.delete(freeIndex);
			return freeIndex
		}

		/**
		 * Returns an iterator for the used slots
		 */
		 *used() {
			// Shortcut
			if (
				this.availableIndices.size === 0 &&
				(this.nextAvailableIndex === -1 || this.nextAvailableIndex === undefined)
			) {
				for (let i = 0; i < this.capacity; ++i) {
					yield i;
				}
			} else {
				for (let i = 0; i < this.capacity; ++i) {
					if (!this.availableIndices.has(i) && this.nextAvailableIndex !== i) {
						yield i;
					}
				}
			}
		}

		/**
		 * Returns true if the given index has been allocated
		 * @param index The index to check
		 */
		 has(index) {
			return (
				index >= 0 && index < this.capacity && !this.availableIndices.has(index)
			)
		}

		/**
		 * Returns the number of used indices
		 */
		 get usedCount() {
			return this.capacity - this.availableIndices.size
		}

		/**
		 * Destroy's the allocator
		 */
		 destroy() {
			this.availableIndices = new Map();
			this.nextAvailableIndex = -1;
		}
	}

	function _optionalChain$8(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }



	const DEFAULT_OPTIONS = {
		shared: DEFAULT_SHARED,
		capacity: DEFAULT_CAPACITY,
	};

	/**
	 * Interface for buffer-backed array storage. Access to data is limited to primitive size-declared values
	 * (e.g. Uint8, Uint32, Float32).
	 *
	 * Each size-declared type may be also define accessors in Vec2 and Vec3 formats, which indicate that we will
	 * allocate 2x or 3x the space of a single value respectively, and interpret the data as a fixed-size array of 2 or 3.
	 *
	 * Each getter/setter combination should be named in the following way:
	 *   (read|write)<type><vec?>(Offset|Attr) - e.g. readUint8Vec2Offset writeFloat32Attr()
	 *
	 * __Offset__ indicates that we are using the given buffer offset directly without consulting
	 * with a memory layout specification. Care should be used when using this option.
	 *-
	 * __Attr__ indicates that we are referencing a memory layout specification and the item index to
	 * determine the correct memory reference.
	 */












































































































	/**
	 * Implementation of an ArrayStore
	 * @see {@link ArrayStore} for more info
	 */
	class ArrayStoreImpl  {
		
		

		/** the underlying data storage buffer */
		
		
		
		
		
		 __init() {this.onResizeHandlers = [];}

		/**
		 * Constructor for the ItemArrayBuffer
		 * @param layout The memory layout
		 * @param options The store options
		 */
		 constructor(
			  layout,
			options = DEFAULT_OPTIONS,
		) {this.layout = layout;ArrayStoreImpl.prototype.__init.call(this);
			// determine capacity based on the following:
			// * if an explicit value is provided, use that
			// * if a buffer is provided, calculate the buffer capacity
			// * else use default capacity
			const capacity =
				options.capacity ||
				(_optionalChain$8([options, 'access', _ => _.buffer, 'optionalAccess', _2 => _2.byteLength]) || 0) / layout.stride ||
				DEFAULT_CAPACITY;

			this.config = {
				capacity,
				shared:
					typeof options.shared === 'boolean' ? options.shared : DEFAULT_SHARED,
			};
			this.bytesPerItem = layout.stride;

			if (options.buffer) {
				this._buffer = options.buffer;
			}
			this.resize(this.config.capacity);
		}

		/**
		 * @inheritdoc
		 * @see {@link ArrayStore.buffer}
		 */
		 get buffer() {
			return this._buffer
		}

		/**
		 * @inheritdoc
		 * @see {@link ArrayStore.dataView}
		 */
		 get dataView() {
			return this._dataView
		}

		/**
		 * @inheritdoc
		 * @see {@link ArrayStore.float32Array}
		 */
		 get float32Array() {
			return this._float32Array
		}

		/**
		 * @inheritdoc
		 * @see {@link ArrayStore.uint8Array}
		 */
		 get uint8Array() {
			return this._uint8Array
		}

		/**
		 * @inheritdoc
		 * @see {@link ArrayStore.uint32Array}
		 */
		 get uint32Array() {
			return this._uint32Array
		}

		/**
		 * @inheritdoc
		 * @see {@link ArrayStore.onResize}
		 */
		 onResize(handler) {
			this.onResizeHandlers.push(handler);
			return () => {
				this.onResizeHandlers = this.onResizeHandlers.filter(h => h !== handler);
			}
		}

		/**
		 * @inheritdoc
		 * @see {@link ArrayStore.resize}
		 */
		 resize(newSize) {
			if (this.count === newSize) {
				// existing buffer is correct size, don't resize buffer
				if (!this.uint8Array) {
					// when initializing, the array aliases may be undefined when the buffer is
					this._uint8Array = new Uint8Array(this._buffer);
					this._uint32Array = new Uint32Array(this._buffer);
					this._float32Array = new Float32Array(this._buffer);
				}
				return
			} else {
				const oldSize = this.count;
				const oldData = this.buffer;

				// create a new byte array
				const numBytes = newSize * this.bytesPerItem;
				if (numBytes % 4 !== 0) {
					throw new Error(
						`buffer size ${numBytes} must be word-aligned. size=${newSize}, bpi=${this.bytesPerItem}`,
					)
				}
				const newBuffer =
					this.config.shared && typeof SharedArrayBuffer !== 'undefined'
						? new SharedArrayBuffer(numBytes)
						: new ArrayBuffer(numBytes);

				if (oldSize > 0 && newSize > oldSize) {
					// copy the old data in
					const newByteArray = new Uint8Array(newBuffer);
					newByteArray.set(new Uint8Array(oldData));
				}

				// set a new data view
				this._buffer = newBuffer;
				this._dataView = new DataView(newBuffer);
				this._float32Array = new Float32Array(newBuffer);
				this._uint8Array = new Uint8Array(newBuffer);
				this._uint32Array = new Uint32Array(newBuffer);

				this.onResizeHandlers.forEach(h => h());
			}
		}

		/**
		 * @inheritdoc
		 * @see {@link ArrayStore.itemData}
		 */
		 itemData(idx) {
			if (
				idx < 0 ||
				idx * this.bytesPerItem > this.buffer.byteLength - this.bytesPerItem
			) {
				throw new Error('Index out of range')
			}
			const byteOffset = idx * this.bytesPerItem;
			return this.buffer.slice(byteOffset, byteOffset + this.bytesPerItem)
		}

		/**
		 * @inheritdoc
		 * @see {@link ArrayStore.getByteOffset}
		 */
		 getByteOffset(idx) {
			{
				if (
					idx < 0 ||
					idx * this.bytesPerItem > this.buffer.byteLength - this.bytesPerItem
				) {
					throw new Error('Index out of range')
				}
			}
			return idx * this.bytesPerItem
		}

		/**
		 * @inheritdoc
		 * @see {@link ArrayStore.getByteOffsetAttr}
		 */
		 getByteOffsetAttr(idx, attribute) {
			const attribLayout = this.layout.get(attribute);
			{
				if (
					idx < 0 ||
					idx * this.bytesPerItem > this.buffer.byteLength - this.bytesPerItem
				) {
					throw new Error('Index out of range')
				}

				if (!attribLayout) {
					throw new Error(`Layout does not contain ${attribute}`)
				}
			}
			return idx * this.bytesPerItem + _optionalChain$8([attribLayout, 'optionalAccess', _3 => _3.offset])
		}

		/**
		 * @inheritdoc
		 * @see {@link ArrayStore.count}
		 */
		 get count() {
			if (this.buffer) {
				return this.buffer.byteLength / this.bytesPerItem
			} else {
				return 0
			}
		}

		/**
		 * @inheritdoc
		 * @see {@link ArrayStore.destroy}
		 */
		 destroy() {
			// Set the capacity to zero
			this.config.capacity = 0;

			// Force the data to be empty
			this.resize(0);
		}

		/**
		 * @inheritdoc
		 * @see {@link ArrayStore.slurp}
		 */
		 slurp(targetIdx, sourceBuffer, sourceOffset = 0) {

			// TODO: Check if they have compatible attributes
			this.uint8Array.set(
				new Uint8Array(sourceBuffer, sourceOffset, this.bytesPerItem),
				targetIdx * this.bytesPerItem,
			);
		}
	}

	/**
	 * A store which stores ids
	 */

































































	/**
	 * __&commat;internal__
	 *
	 * An implementation of an IdStore
	 */
	class IdStoreImpl  {
		
		 __init() {this._count = 0;}

		/** a map of available storage slots in the buffer, modeled as alinked list */
		

		/** callbacks and handlers */
		 __init2() {this.onUpdateHandlers = [];}
		 __init3() {this.onAddHandlers = [];}
		 __init4() {this.onRemoveHandlers = [];}

		// #region construction

		/**
		 * Constructor for the IdStoreImpl
		 * @param store The backing ArrayStore
		 * @param allocator The allocator for allocating new ids
		 */
		 constructor(store, allocator) {IdStoreImpl.prototype.__init.call(this);IdStoreImpl.prototype.__init2.call(this);IdStoreImpl.prototype.__init3.call(this);IdStoreImpl.prototype.__init4.call(this);
			this._store = store;
			this.slotAllocator = allocator;
			this._count = allocator.usedCount;
		}

		// #endregion

		/**
		 * @inheritdoc
		 * @see {@link IdStore.store}
		 */
		 get store() {
			return this._store
		}

		/**
		 * @inheritdoc
		 * @see {@link IdStore.count}
		 */
		 get count() {
			return this._count
		}

		/**
		 * @inheritdoc
		 * @see {@link IdStore.itemIds}
		 */
		 itemIds() {
			return this.slotAllocator.used()
		}

		// #region pubsub events
		/**
		 * @inheritdoc
		 * @see {@link IdStore.onAttributeUpdated}
		 */
		 onAttributeUpdated(handler) {
			this.onUpdateHandlers.push(handler);
			return () => {
				this.onUpdateHandlers = this.onUpdateHandlers.filter(h => h !== handler);
			}
		}

		/**
		 * @inheritdoc
		 * @see {@link IdStore.onAddItem}
		 */
		 onAddItem(handler) {
			this.onAddHandlers.push(handler);
			return () => {
				this.onAddHandlers = this.onAddHandlers.filter(h => h !== handler);
			}
		}

		/**
		 * @inheritdoc
		 * @see {@link IdStore.onRemoveItem}
		 */
		 onRemoveItem(handler) {
			this.onRemoveHandlers.push(handler);
			return () => {
				this.onRemoveHandlers = this.onRemoveHandlers.filter(h => h !== handler);
			}
		}

		// #endregion

		/**
		 * @inheritdoc
		 * @see {@link IdStore.add}
		 */
		 add(events = true) {
			if (!this.slotAllocator.hasFreeSpace) {
				const prevNumItems = this.store.count;
				const newNumItems = prevNumItems + this.store.config.capacity;
				this.store.resize(newNumItems);
				this.slotAllocator.grow(newNumItems);
			}

			const itemIndex = this.slotAllocator.alloc();
			this._count++;
			if (events) {
				this.fireAddHandlers(itemIndex);
			}
			return itemIndex
		}

		/**
		 * @inheritdoc
		 * @see {@link IdStore.remove}
		 */
		 remove(idx, events = true) {
			if (events) {
				this.fireRemoveHandlers(idx);
			}
			this.slotAllocator.free(idx);
			this._count--;
		}

		/**
		 * @inheritdoc
		 * @see {@link IdStore.reset}
		 */
		 reset() {
			const numItems = this._store.config.capacity;

			for (const id of this.itemIds()) {
				this.fireRemoveHandlers(id);
			}

			this._store.resize(numItems);
			this.slotAllocator.reset(numItems);
			this._count = 0;
		}

		/**
		 * @inheritdoc
		 * @see {@link IdStore.destroy}
		 */
		 destroy() {
			this.store.destroy();
			this.slotAllocator.destroy();
			this.onRemoveHandlers = [];
			this.onAddHandlers = [];
			this.onUpdateHandlers = [];
		}

		/**
		 * @inheritdoc
		 * @see {@link IdStore.notify}
		 */
		 notify(id, attribute) {
			for (const handler of this.onUpdateHandlers) {
				try {
					handler(id, attribute);
				} catch (e) {
					console.error('caught error', e);
				}
			}
		}

		/**
		 * Raises the add event
		 * @param itemIndex The added item index
		 */
		 fireAddHandlers(itemIndex) {
			this.onAddHandlers.forEach(h => h(itemIndex));
		}

		/**
		 * Raises the add event
		 * @param itemIndex The added item index
		 */
		 fireRemoveHandlers(itemIndex) {
			this.onRemoveHandlers.forEach(h => h(itemIndex));
		}
	}

	/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */








	/**
	 * Describes a property
	 */




	/**
	 * Creates a MemoryReader implementation which can read the given memory layout efficiently
	 * @param readerType The type of reader
	 * @param layout The memory layout
	 * @param additionalProperties The additional properties to add to the implementation
	 * @param setterAugmenter The setter augmenter, which can be used to manipulate the underlying generated property setters
	 */
	function createReader(
		readerType,
		layout,
		additionalProperties = [],
	) {
		class Impl  {
			/** the store this item belongs to */
			
			/**
			 * A flag to indicate that this item's buffer is waiting to be copied to a store.
			 * This should be idempotent across connect() invocatinos
			 */
			
			// cached array aliases
			
			
			
			

			// item data
			 __init() {this.storeId = -1;}
			 __init2() {this.byteOffset = 0;}
			 __init3() {this.wordOffset = 0;}

			/**
			 * Constructor for the MemoryReader implementation
			 * @param store The backing data store
			 * @param storeId The id to use when accessing the store
			 */
			 constructor(
				store = undefined,
				storeId = -1,
			) {Impl.prototype.__init.call(this);Impl.prototype.__init2.call(this);Impl.prototype.__init3.call(this);
				const autobuffer = store == null;
				if (autobuffer) {
					this.isFlushNeeded = true;
					const buffer = new ArrayBuffer(layout.stride);
					this.uint8Array = new Uint8Array(buffer);
					this.uint32Array = new Uint32Array(buffer);
					this.float32Array = new Float32Array(buffer);
					this.propertyBag = {};
				} else {
					this.isFlushNeeded = false;
					this.connect(storeId, store);
				}

				additionalProperties.forEach(property => {
					if (typeof property !== 'string') {
						const { name, initialValue, ephemeral } = property;
						if (ephemeral) {
	(this )[name] = initialValue;
						} else {
							this.propertyBag[name] = initialValue;
						}
					}
				});
			}

			/**
			 * @inheritdoc
			 * @see {@link MemoryReader.type}
			 */
			 get type() {
				return readerType
			}

			/**
			 * @inheritdoc
			 * @see {@link MemoryReader.layout}
			 */
			 get layout() {
				return layout
			}

			/**
			 * @inheritdoc
			 * @see {@link MemoryReader.buffer}
			 */
			 get buffer() {
				return this.uint8Array.buffer
			}

			/**
			 * @inheritdoc
			 * @see {@link MemoryReader.connect}
			 */
			 connect(storeId, store) {
				if (this.storeId !== storeId) {
					this.byteOffset = storeId * store.store.bytesPerItem;
					this.wordOffset = this.byteOffset / 4;
					this.storeId = storeId;

					// flush this items buffer out if we're waiting for a store connection
					if (this.isFlushNeeded) {
						store.slurp(storeId, this.uint8Array.buffer, this.propertyBag);
						this.isFlushNeeded = false;
					}

					// copy property bag
					this.propertyBag = store.propertyBags[storeId];
				}

				// It is important to not have " if (this.store != store) "
				// It's possible that the store doesn't change, but the underlying arrays do
				// copy array aliases
				this.store = store;
				this.uint32Array = store.store.uint32Array;
				this.float32Array = store.store.float32Array;
				this.uint8Array = store.store.uint8Array;
			}

			/**
			 * Handles an attribute being set
			 * @param name The name of the attribute
			 */
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			 handleAttributeUpdated(name) {}
		}

		const proto = Impl.prototype; 

		/**
		 * Wire layout properties into the memory layout
		 */
		layout.forEach(attribute => {
			if (attribute.name === SpacerAttributeName) {
				return
			}

			const { name, size, type, typedOffset, hint } = attribute;
			let setter;
			let getter;

			if (type === AttributeType.Float32) {
				if (size === 1) {
					//
					// Singular Float Values
					//
					getter = function () {
						return this.float32Array[this.wordOffset + typedOffset]
					};
					setter = function ( value) {
						this.float32Array[this.wordOffset + typedOffset] = value || 0;
						this.handleAttributeUpdated(name);
					};
				} else if (size === 2) {
					//
					// Vec2 Float Values
					//
					getter = function () {
						return [
							this.float32Array[this.wordOffset + typedOffset],
							this.float32Array[this.wordOffset + typedOffset + 1],
						]
					};
					setter = function ( value) {
						this.float32Array[this.wordOffset + typedOffset] = value[0] || 0;
						this.float32Array[this.wordOffset + typedOffset + 1] = value[1] || 0;
						this.handleAttributeUpdated(name);
					};
				} else if (size === 3) {
					//
					// Vec3 Float Values
					//
					getter = function () {
						return [
							this.float32Array[this.wordOffset + typedOffset],
							this.float32Array[this.wordOffset + typedOffset + 1],
							this.float32Array[this.wordOffset + typedOffset + 2],
						]
					};
					setter = function ( value) {
						this.float32Array[this.wordOffset + typedOffset] = value[0] || 0;
						this.float32Array[this.wordOffset + typedOffset + 1] = value[1] || 0;
						this.float32Array[this.wordOffset + typedOffset + 2] = value[2] || 0;
						this.handleAttributeUpdated(name);
					};
				}
			} else if (type === AttributeType.Uint8) {
				if (size === 1) {
					if (hint === InterpretationHint.Boolean) {
						//
						// Single Byte Boolean
						//
						getter = function () {
							return this.uint8Array[this.byteOffset + typedOffset] > 0
						};
						setter = function ( value) {
							this.uint8Array[this.byteOffset + typedOffset] = value ? 1 : 0;
							this.handleAttributeUpdated(name);
						};
					} else {
						//
						// Single Byte Number
						//
						getter = function () {
							return this.uint8Array[this.byteOffset + typedOffset]
						};
						setter = function ( value) {
							this.uint8Array[this.byteOffset + typedOffset] = value;
							this.handleAttributeUpdated(name);
						};
					}
				} else if (size === 2) {
					//
					// Vec2 Byte Values
					//
					getter = function () {
						return [
							this.uint8Array[this.byteOffset + typedOffset],
							this.uint8Array[this.byteOffset + typedOffset + 1],
						]
					};
					setter = function ( value) {
						this.uint8Array[this.byteOffset + typedOffset] = value[0] || 0;
						this.uint8Array[this.byteOffset + typedOffset + 1] = value[1] || 0;
						this.handleAttributeUpdated(name);
					};
				} else if (size === 3) {
					//
					// Vec3 Byte Values
					//
					getter = function () {
						return [
							this.uint8Array[this.byteOffset + typedOffset],
							this.uint8Array[this.byteOffset + typedOffset + 1],
							this.uint8Array[this.byteOffset + typedOffset + 2],
						]
					};
					setter = function ( value) {
						this.uint8Array[this.byteOffset + typedOffset] = value[0] || 0;
						this.uint8Array[this.byteOffset + typedOffset + 1] = value[1] || 0;
						this.uint8Array[this.byteOffset + typedOffset + 2] = value[2] || 0;
						this.handleAttributeUpdated(name);
					};
				} else if (size === 4) {
					//
					// Vec4 Byte Values
					//
					getter = function () {
						return [
							this.uint8Array[this.byteOffset + typedOffset],
							this.uint8Array[this.byteOffset + typedOffset + 1],
							this.uint8Array[this.byteOffset + typedOffset + 2],
							this.uint8Array[this.byteOffset + typedOffset + 3],
						]
					};
					setter = function (
						
						value,
					) {
						this.uint8Array[this.byteOffset + typedOffset] = value[0] || 0;
						this.uint8Array[this.byteOffset + typedOffset + 1] = value[1] || 0;
						this.uint8Array[this.byteOffset + typedOffset + 2] = value[2] || 0;
						this.uint8Array[this.byteOffset + typedOffset + 3] = value[3] || 0;
						this.handleAttributeUpdated(name);
					};
				}
			} else if (type === AttributeType.Uint32) {
				if (size === 1) {
					//
					// Uint32 Single Values
					//
					getter = function () {
						return this.uint32Array[this.wordOffset + typedOffset]
					};
					setter = function ( value) {
						this.uint32Array[this.wordOffset + typedOffset] = value || 0;
						this.handleAttributeUpdated(name);
					};
				}
			}

			if (setter) {
				proto.__defineSetter__(name, setter);
			}

			if (getter) {
				proto.__defineGetter__(name, getter);
			}
		});

		/**
		 * Wire additional properties into the property bag
		 */
		additionalProperties.forEach(property => {
			const name = typeof property === 'string' ? property : property.name;
			const ephemeral =
				typeof property !== 'string' ? Boolean(property.ephemeral) : false;

			if (!ephemeral) {
				proto.__defineGetter__(name, function () {
					return this.propertyBag[name]
				});
				proto.__defineSetter__(name, function ( value) {
					this.propertyBag[name] = value;
				});
			}
		});
		return (Impl ) 
	}

	/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */


	/**
	 * @inheritdoc
	 * @see {@link ReaderStore}
	 */
	class ReaderStoreImpl
		extends IdStoreImpl
		 {
		
		
		 __init() {this.propertyBags = {};}

		/**
		 * Constructor for the ReaderStoreImpl
		 * @param itemClass The class of the item, used when constructing new items
		 * @param store The underlying store to use
		 * @param allocator The allocator to use for allocating new ids
		 */
		 constructor(
			itemClass,
			store,
			allocator = new SlotAllocator(store.config.capacity),
		) {
			super(store, allocator);ReaderStoreImpl.prototype.__init.call(this);
			this.items = new Array(store.config.capacity);
			this.itemClass = itemClass;

			// reconnect items on resize
			store.onResize(() => {
				this.items.forEach(i => i && i.connect(i.storeId, this));
			});
		}

		/**
		 * @inheritdoc
		 * @see {@link ReaderStore.receive}
		 */
		 receive(primitive) {
			const storeId = this.add(false);
			this.slurp(storeId, primitive.buffer, primitive.byteOffset);
			primitive.connect(storeId, this);
			this.fireAddHandlers(storeId);
			return storeId
		}

		/**
		 * @inheritdoc
		 * @see {@link ReaderStore.itemAt}
		 */
		 itemAt(storeId) {
			return (
				this.items[storeId] ||
				(this.items[storeId] = this.createConnectedItem(storeId))
			)
		}

		/**
		 * @inheritdoc
		 * @see {@link ReaderStore.createConnectedItem}
		 */
		 createConnectedItem(storeId) {
			if (!this.propertyBags[storeId]) {
				this.propertyBags[storeId] = {};
			}
			return new this.itemClass(this, storeId)
		}

		 *[Symbol.iterator]() {
			let idx;
			for (idx of this.itemIds()) {
				yield this.itemAt(idx);
			}
		}

		 *scan() {
			let idx;
			let item;
			if (this.count > 0) {
				item = this.createConnectedItem(0);
			}
			if (item) {
				for (idx of this.itemIds()) {
					if (!this.propertyBags[idx]) {
						this.propertyBags[idx] = {};
					}
					item.connect(idx, this);
					yield item;
				}
			}
		}

		/**
		 * @inheritdoc
		 * @see {@link ReaderStore.slurp}
		 */
		 slurp(
			targetId,
			sourceBuffer,
			propertyBag = {},
			sourceOffset = 0,
		) {
			this.store.slurp(targetId, sourceBuffer, sourceOffset);

			if (propertyBag) {
				this.propertyBags[targetId] = propertyBag;
			} else {
				this.propertyBags[targetId] = undefined;
			}

			// All the attributes for this item were updated
			this.notify(targetId);
		}

		/**
		 * @inheritdoc
		 * @see {@link IdStore.add}
		 */
		 add(events = true) {
			const id = super.add(false);
			this.propertyBags[id] = {};
			if (events) {
				this.fireAddHandlers(id);
			}
			return id
		}

		/**
		 * @inheritdoc
		 * @see {@link IdStore.remove}
		 */
		 remove(idx) {
			super.remove(idx);
			// TODO - handle with onRemove hook?
			// this.writeBool(idx, this.visibleAttrib as T, false)
			this.propertyBags[idx] = undefined;
		}

		/**
		 * @inheritdoc
		 * @see {@link IdStore.reset}
		 */
		 reset() {
			super.reset();
			this.propertyBags = {};
		}

		/**
		 * @inheritdoc
		 * @see {@link IdStore.destroy}
		 */
		 destroy() {
			super.destroy();
			this.propertyBags = {};
		}
	}

	function _optionalChain$7(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */


	const FLOAT_BYTE_SIZE = Float32Array.BYTES_PER_ELEMENT;

	/**
	 * A utility class for reading/writing individual properties of a MemoryReader
	 */
	class MemoryReaderInspector {
		/**
		 * Calculates the byte offset for the given item's attribute
		 * @param itemIndex The item index of the item
		 * @param attribute The attribute
		 */
		 getByteOffset(item, attribute) {
			const attr = item.layout.get(attribute);
			return item.byteOffset + attr.offset
		}

		/**
		 * Calculates the typed offset for the given attribute
		 * @param itemIndex The item index of the item
		 * @param attribute The attribute
		 */
		 getTypedOffset(item, attribute) {
			const attr = item.layout.get(attribute);
			return attr.typedOffset
		}

		 getWordOffset(item, attribute) {
			return this.getByteOffset(item, attribute) / FLOAT_BYTE_SIZE
		}

		// #region Read/Write Generic Property

		/**
		 * Reads the __property__ for the __item__
		 * @param item The item to get the property for
		 * @param property The property to read
		 */
		 readProperty(
			item,
			property,
		) {
			const itemProperties = item.store.propertyBags[item.storeId];
			if (itemProperties != null) {
				return itemProperties[property] 
			}
		}

		/**
		 * Writes the __property__ for the __item__
		 * @param item The item to update
		 * @param property The property to update
		 * @param value The value of the property
		 */
		 writeProperty(
			item,
			property,
			value,
		) {
			let itemProperties = item.store.propertyBags[item.storeId];
			if (!itemProperties) {
				itemProperties = {};
				item.store.propertyBags[item.storeId] = itemProperties;
			}
			itemProperties[property] = value;
			_optionalChain$7([item, 'access', _ => _.store, 'optionalAccess', _2 => _2.notify, 'call', _3 => _3(item.storeId, property)]);
		}

		// #endregion

		// #region Number
		/**
		 * Reads __attribute__ from __item__ as a number
		 * @param item The item to get the attribute for
		 * @param attribute The attribute to read
		 */
		 readNumber(item, attribute) {
			if (!item.layout.has(attribute)) {
				return this.readProperty(item, attribute) || 0
			} else {
				const attrib = item.layout.get(attribute);
				if (attrib.type === AttributeType.Uint8) {
					return this.readUint8Attr(item, attribute)
				} else if (attrib.type === AttributeType.Uint32) {
					return this.readUint32Attr(item, attribute)
				} else {
					return this.readFloat32Attr(item, attribute)
				}
			}
		}

		/**
		 * Writes __attribute__ for __item__ as a number
		 * @param item The item to update
		 * @param attribute The attribute to update
		 * @param value The attribute value
		 */
		 writeNumber(
			item,
			attribute,
			value,
		) {
			const attrib = item.layout.get(attribute);
			if (!attrib) {
				this.writeProperty(item, attribute, value);
			} else {
				if (attrib.type === AttributeType.Uint8) {
					this.writeUint8Attr(item, attribute, value);
				} else if (attrib.type === AttributeType.Uint32) {
					this.writeUint32Attr(item, attribute, value);
				} else {
					this.writeFloat32Attr(item, attribute, value);
				}
			}
			_optionalChain$7([item, 'access', _4 => _4.store, 'optionalAccess', _5 => _5.notify, 'call', _6 => _6(item.storeId, attribute)]);
		}

		// #endregion

		// #region String

		/**
		 * Reads __attribute__ from __item__ as a string
		 * @param item The item to get the attribute for
		 * @param attribute The attribute to read
		 */
		 readString(
			item,
			attribute,
		) {
			return this.readProperty(item, attribute)
		}

		/**
		 * Writes __attribute__ for __item__ as a string
		 * @param item The item to update
		 * @param attribute The attribute to update
		 * @param value The attribute value
		 */
		 writeString(
			item,
			attribute,
			value,
		) {
			this.writeProperty(item, attribute, value);
			_optionalChain$7([item, 'access', _7 => _7.store, 'optionalAccess', _8 => _8.notify, 'call', _9 => _9(item.storeId, attribute)]);
		}

		// #endregion

		// #region Boolean

		/**
		 * Reads __attribute__ from __item__ as a boolean
		 * @param item The item to get the attribute for
		 * @param attribute The attribute to read
		 */
		 readBoolAttr(item, attribute) {
			return Boolean(this.readUint8Attr(item, attribute))
		}

		/**
		 * Writes __attribute__ for __item__ as a boolean
		 * @param item The item to update
		 * @param attribute The attribute to update
		 * @param value The attribute value
		 */
		 writeBoolAttr(
			item,
			attribute,
			value,
		) {
			this.writeUint8Attr(item, attribute, value ? 1 : 0);
		}

		// #endregion

		// #region Float32 Single Value
		/**
		 * Reads __attribute__ from __item__ as a float32
		 * @param item The item to get the attribute for
		 * @param attribute The attribute to read
		 */
		 readFloat32Attr(item, attribute) {
			return item.float32Array[this.getWordOffset(item, attribute)]
		}

		/**
		 * Writes __attribute__ for __item__ as a float32
		 * @param item The item to update
		 * @param attribute The attribute to update
		 * @param value The attribute value
		 */
		 writeFloat32Attr(
			item,
			attribute,
			value,
		) {
			item.float32Array[this.getWordOffset(item, attribute)] = value;
		}

		// #endregion

		// #region Float32 Vec2

		/**
		 * Reads __attribute__ from __item__ as a float32[2]
		 * @param item The item to get the attribute for
		 * @param attribute The attribute to read
		 */
		 readFloat32Vec2Attr(
			item,
			attribute,
		) {
			const offset = this.getWordOffset(item, attribute);
			return [item.float32Array[offset], item.float32Array[offset + 1]]
		}

		/**
		 * Writes __attribute__ for __item__ as a float32[2]
		 * @param item The item to update
		 * @param attribute The attribute to update
		 * @param x The x component to update
		 * @param y The y component to update
		 */
		 writeFloat32Vec2Attr(
			item,
			attribute,
			x,
			y,
		) {
			const offset = this.getWordOffset(item, attribute);
			item.float32Array[offset] = x;
			item.float32Array[offset + 1] = y;
		}

		/**
		 * Writes the float32[2] to the __typedOffset__ of the item
		 * @param item The item to update
		 * @param typedOffset The offset into the array to write the float32[2]
		 * @param x The x component to update
		 * @param y The y component to update
		 */
		 writeFloat32Vec2Offset(
			item,
			typedOffset,
			x,
			y,
		) {
			item.float32Array[item.wordOffset + typedOffset] = x;
			item.float32Array[item.wordOffset + typedOffset + 1] = y;
		}

		// #endregion

		// #region Float32 Vec3

		/**
		 * Copies the float32[3] from the sourceAttribute to targetAttribute
		 * @param item The item to update
		 * @param sourceAttribute The source attribute to copy from
		 * @param targetAttribute The target attribute to copy to
		 */
		 copyFloat32Vec3Attr(
			item,
			sourceAttribute,
			targetAttribute,
		) {
			const offset = this.getWordOffset(item, sourceAttribute);
			const subarray = item.float32Array.subarray(offset, offset + 3);
			item.float32Array.set(subarray, this.getWordOffset(item, targetAttribute));
			return subarray
		}

		/**
		 * Copies the float32[2] from sourceTypedOffset to targetTypedOffset
		 * @param item The item to update
		 * @param sourceTypedOffset The typed offset for the source attribute
		 * @param targetTypedOffset typed offset for the target attribute
		 */
		 copyFloat32Vec3Offset(
			item,
			sourceTypedOffset,
			targetTypedOffset,
		) {
			const subarray = item.float32Array.subarray(
				item.wordOffset + sourceTypedOffset,
				item.wordOffset + sourceTypedOffset + 3,
			);
			item.float32Array.set(subarray, item.wordOffset + targetTypedOffset);
			return subarray
		}

		/**
		 * Writes __attribute__ for __item__ as a float32[3]
		 * @param item The item to update
		 * @param attribute The attribute to update
		 * @param x The x component to update
		 * @param y The y component to update
		 * @param z The z component to update
		 */
		 writeFloat32Vec3Attr(
			item,
			attribute,
			x,
			y,
			z,
		) {
			const offset = this.getWordOffset(item, attribute);
			item.float32Array[offset] = x;
			item.float32Array[offset + 1] = y;
			item.float32Array[offset + 2] = z;
		}

		/**
		 * Writes the float32[3] to the __typedOffset__ of the item
		 * @param item The item to update
		 * @param typedOffset The offset into the array to write the float32[3]
		 * @param x The x component to update
		 * @param y The y component to update
		 * @param z The z component to update
		 */
		 writeFloat32Vec3Offset(
			item,
			typedOffset,
			x,
			y,
			z,
		) {
			item.float32Array[item.wordOffset + typedOffset] = x;
			item.float32Array[item.wordOffset + typedOffset + 1] = y;
			item.float32Array[item.wordOffset + typedOffset + 2] = z;
		}

		/**
		 * Reads __attribute__ from __item__ as a float32[3]
		 * @param item The item to get the attribute for
		 * @param attribute The attribute to read
		 */
		 readFloat32Vec3Attr(
			item,
			attribute,
		) {
			const offset = this.getWordOffset(item, attribute);
			return [
				item.float32Array[offset],
				item.float32Array[offset + 1],
				item.float32Array[offset + 2],
			]
		}

		// #endregion

		// #region Uint8 Single Value

		/**
		 * Reads __attribute__ from __item__ as a unit8
		 * @param item The item to get the attribute for
		 * @param attribute The attribute to read
		 */
		 readUint8Attr(item, attribute) {
			return item.uint8Array[this.getByteOffset(item, attribute)]
		}

		/**
		 * Writes __attribute__ for __item__ as a unit8
		 * @param item The item to update
		 * @param attribute The attribute to update
		 * @param value The attribute value
		 */
		 writeUint8Attr(
			item,
			attribute,
			value,
		) {
			item.uint8Array[this.getByteOffset(item, attribute)] = value;
		}

		// #endregion

		// #region Uint8 Vec2

		/**
		 * Reads __attribute__ from __item__ as a unit8[2]
		 * @param item The item to get the attribute for
		 * @param attribute The attribute to read
		 */
		 readUint8Vec2Attr(
			item,
			attribute,
		) {
			const offset = this.getByteOffset(item, attribute);
			return [item.uint8Array[offset], item.uint8Array[offset + 1]]
		}

		/**
		 * Writes __attribute__ for __item__ as a uint8[2]
		 * @param item The item to update
		 * @param attribute The attribute to update
		 * @param x The x component to update
		 * @param y The y component to update
		 * @param z The z component to update
		 */
		 writeUint8Vec2Attr(
			item,
			attribute,
			x,
			y,
		) {
			const offset = this.getByteOffset(item, attribute);
			item.uint8Array[offset] = x;
			item.uint8Array[offset + 1] = y;
		}

		// #endregion

		// #region Uint8 Vec3

		/**
		 * Reads __attribute__ from __item__ as a unit8[3]
		 * @param item The item to get the attribute for
		 * @param attribute The attribute to read
		 */
		 readUint8Vec3Attr(
			item,
			attribute,
		) {
			const offset = this.getByteOffset(item, attribute);
			return [
				item.uint8Array[offset],
				item.uint8Array[offset + 1],
				item.uint8Array[offset + 2],
			]
		}

		/**
		 * Writes __attribute__ for __item__ as a uint8[3]
		 * @param item The item to update
		 * @param attribute The attribute to update
		 * @param x The x component to update
		 * @param y The y component to update
		 * @param z The z component to update
		 */
		 writeUint8Vec3Attr(
			item,
			attribute,
			x,
			y,
			z,
		) {
			const offset = this.getByteOffset(item, attribute);
			item.uint8Array[offset] = x;
			item.uint8Array[offset + 1] = y;
			item.uint8Array[offset + 2] = z;
		}

		// #endregion

		// #region Uint8 Vec4

		/**
		 * Reads __attribute__ from __item__ as a unit8[4]
		 * @param item The item to get the attribute for
		 * @param attribute The attribute to read
		 */
		 readUint8Vec4Attr(
			item,
			attribute,
		) {
			const offset = this.getByteOffset(item, attribute);
			return [
				item.uint8Array[offset],
				item.uint8Array[offset + 1],
				item.uint8Array[offset + 2],
				item.uint8Array[offset + 3],
			]
		}

		/**
		 * Writes __attribute__ for __item__ as a uint8[4]
		 * @param item The item to update
		 * @param attribute The attribute to update
		 * @param x The x component to update
		 * @param y The y component to update
		 * @param z The z component to update
		 * @param zz The zz component to update
		 */
		 writeUint8Vec4Attr(
			item,
			attribute,
			x,
			y,
			z,
			zz,
		) {
			const offset = this.getByteOffset(item, attribute);
			item.uint8Array[offset] = x;
			item.uint8Array[offset + 1] = y;
			item.uint8Array[offset + 2] = z;
			item.uint8Array[offset + 3] = zz;
		}

		// #endregion

		// #region Uint32 Single Value

		/**
		 * Reads __attribute__ from __item__ as a uint32
		 * @param item The item to get the attribute for
		 * @param attribute The attribute to read
		 */
		 readUint32Attr(item, attribute) {
			return item.uint32Array[this.getWordOffset(item, attribute)]
		}

		/**
		 * Writes __attribute__ for __item__ as a unit32
		 * @param item The item to update
		 * @param attribute The attribute to update
		 * @param value The attribute value
		 */
		 writeUint32Attr(
			item,
			attribute,
			value,
		) {
			item.uint32Array[this.getWordOffset(item, attribute)] = value;
		}

		/**
		 * Writes the unit32 at the given __typedOffset__ for the item
		 * @param item The item to update
		 * @param typedOffset The offset into the array to write the uint32
		 * @param value The attribute value
		 */
		 writeUint32Offset(
			item,
			typedOffset,
			value,
		) {
			item.uint32Array[item.wordOffset + typedOffset] = value;
		}

		/**
		 * Copies the uint32 from sourceTypedOffset to targetTypedOffset
		 * @param item The item to update
		 * @param sourceTypedOffset The typed offset for the source attribute
		 * @param targetTypedOffset typed offset for the target attribute
		 */
		 copyUint32Offset(
			item,
			sourceTypedOffset,
			targetTypedOffset,
		) {
			item.uint32Array[item.wordOffset + targetTypedOffset] =
				item.uint32Array[item.wordOffset + sourceTypedOffset];
		}
		// #endregion
	}

	function _optionalChain$6(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */

	/**
	 * The unique symbol for a node
	 */
	const nodeType = Symbol('@graspologic::node');

	/**
	 * @internal
	 *
	 * The set of additional node properties
	 */
	const ADDITIONAL_NODE_PROPS = [
		'id',
		'group',
		'label',
		'data',
		{ name: 'mass', ephemeral: true, initialValue: 0 },
		{ name: 'dx', ephemeral: true, initialValue: 0 },
		{ name: 'dy', ephemeral: true, initialValue: 0 },
		{ name: 'old_dx', ephemeral: true, initialValue: 0 },
		{ name: 'old_dy', ephemeral: true, initialValue: 0 },
		{ name: 'convergence', ephemeral: true, initialValue: 1 },
	];

	/**
	 * @internal
	 *
	 * The internal memory layout of a Node
	 */
	const nodeMemoryLayout = createLayoutBuilder()
		// Properties
		.addFloat32('weight')
		.addFloat32('radius', {
			aliases: [{ name: 'size', type: AttributeType.Float32 }],
		})
		.addUint8('fixed')

		// Colors
		.addUint32('color')
		.addUint32('color.start')
		.addFloat32Vec2('color.tween', {
			components: ['color.duration', 'color.startTime'],
		})

		// Position
		.addFloat32Vec3('position', { components: ['x', 'y', 'z'] })
		.addFloat32Vec3('position.start')
		.addFloat32Vec2('position.tween', {
			components: ['position.duration', 'position.startTime'],
		})

		// Rendering Properties
		.addFloat32('saturation')
		.addUint8('shape')
		.addUint8('visible', { hint: InterpretationHint.Boolean })
		.addUint8Vec3('pickingColor')
		.build();

	/**
	 * Gets the typed offset for the given attribute
	 */
	function nodeTypedOffset(attribute) {
		return _optionalChain$6([nodeMemoryLayout, 'access', _ => _.get, 'call', _2 => _2(attribute), 'optionalAccess', _3 => _3.typedOffset])
	}

	// Cache some of the attributes for the "load"
	const positionTypedOffset$1 = nodeMemoryLayout.get('position').typedOffset;
	const radiusTypedOffset = nodeMemoryLayout.get('radius').typedOffset;
	const shapeTypedOffset = nodeMemoryLayout.get('shape').typedOffset;
	const weightTypedOffset$1 = nodeMemoryLayout.get('weight').typedOffset;
	const colorTypedOffset$2 = nodeMemoryLayout.get('color').typedOffset;
	const visibleTypedOffset = nodeMemoryLayout.get('visible').typedOffset;

	/**
	 * An implementation of a Node
	 */
	const BaseNodeImpl = createReader(
		nodeType,
		nodeMemoryLayout,
		ADDITIONAL_NODE_PROPS,
	);

	class NodeImpl extends BaseNodeImpl  {
		/**
		 * @inheritDoc
		 * @see {@link Node.load}
		 */
		 load(data) {
	(this ).propertyBag = this.store.propertyBags[this.storeId] || {};
			this.store.propertyBags[this.storeId] = (this ).propertyBag
			;(this ).propertyBag.id = data.id
			;(this ).propertyBag.group = data.group
			;(this ).propertyBag.label = data.label;

			this.float32Array[this.wordOffset + radiusTypedOffset] =
				data.size || data.radius || 0;
			this.float32Array[this.wordOffset + positionTypedOffset$1] = data.x || 0;
			this.float32Array[this.wordOffset + positionTypedOffset$1 + 1] = data.y || 0;
			this.float32Array[this.wordOffset + positionTypedOffset$1 + 2] = data.z || 0;
			this.float32Array[this.wordOffset + weightTypedOffset$1] = data.weight || 1;
			this.uint32Array[this.wordOffset + colorTypedOffset$2] = data.color || 0;
			this.uint8Array[this.byteOffset + shapeTypedOffset] = parseShape(data.shape);
			this.uint8Array[this.byteOffset + visibleTypedOffset] = 1;
		}
	}

	/**
	 * Parses a Shape from an unparsed shape value
	 * @param unparsedShape
	 */
	function parseShape(unparsedShape) {
		if (typeof unparsedShape === 'string') {
			unparsedShape = unparsedShape.toLocaleLowerCase();
			if (unparsedShape === 'square') {
				return Shape.Square
			} else if (unparsedShape === 'diamond') {
				return Shape.Diamond
			}
		} else if (
			unparsedShape === Shape.Square ||
			unparsedShape === Shape.Diamond ||
			unparsedShape === Shape.Circle
		) {
			return unparsedShape 
		}
		return Shape.Circle
	}

	function _optionalChain$5(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

	const allAttributes$1 = '*';

	const colorAttr = 'color';
	const colorStartAttr = 'color.start';
	const colorTweenAttr = 'color.tween';
	const positionAttr = 'position';
	const positionStartAttr = 'position.start';
	const positionTweenAttr = 'position.tween';

	// For fast lookup
	const positionTypedOffset = nodeTypedOffset(positionAttr);
	const positionStartTypedOffset = nodeTypedOffset(positionStartAttr);
	const positionTweenTypedOffset = nodeTypedOffset(positionTweenAttr);
	const colorTypedOffset$1 = nodeTypedOffset(colorAttr);
	const colorStartTypedOffset = nodeTypedOffset(colorStartAttr);
	const colorTweenTypedOffset = nodeTypedOffset(colorTweenAttr);

	const inspector$1 = new MemoryReaderInspector();

	/**
	 * An implementation of a Node that has animation capabilities
	 */
	class AnimatableNodeImplInternal extends NodeImpl  {
		/**
		 * @inheritDoc
		 * @see {@link AnimatableNode.animatePosition}
		 */
		 animatePosition(position, duration = 0) {
			// Set the start to the old position
			inspector$1.copyFloat32Vec3Offset(
				this,
				positionTypedOffset,
				positionStartTypedOffset,
			);
			this.handleAttributeUpdated(positionStartAttr);

			// Update the tween
			inspector$1.writeFloat32Vec2Offset(
				this,
				positionTweenTypedOffset,
				duration,
				_optionalChain$5([(this.store ), 'optionalAccess', _ => _.engineTime]) || 0,
			);
			this.handleAttributeUpdated(positionTweenAttr);

			// Update the end position
			inspector$1.writeFloat32Vec3Offset(
				this,
				positionTypedOffset,
				position[0] || 0,
				position[1] || 0,
				position[2] || 0,
			);
			this.handleAttributeUpdated(positionAttr);
		}

		/**
		 * @inheritDoc
		 * @see {@link AnimatableNode.animateColor}
		 */
		 animateColor(color, duration = 0) {
			// Set the start to the old color
			inspector$1.copyUint32Offset(this, colorTypedOffset$1, colorStartTypedOffset);
			this.handleAttributeUpdated(colorStartAttr);

			// Update the tween
			inspector$1.writeFloat32Vec2Offset(
				this,
				colorTweenTypedOffset,
				duration,
				_optionalChain$5([(this.store ), 'optionalAccess', _2 => _2.engineTime]) || 0,
			);
			this.handleAttributeUpdated(colorTweenAttr);

			// Update the end color
			inspector$1.writeUint32Offset(this, colorTypedOffset$1, color);
			this.handleAttributeUpdated(colorAttr);
		}

		/**
		 * @inheritDoc
		 * @see {@link Node.load}
		 */
		 load(data) {
			super.load(data);
			this.handleAttributeUpdated(allAttributes$1);
		}

		/**
		 * Handler for when an attribute is updated
		 * @param name The name of the attribute
		 * @param value The value of the attribute
		 */
		 handleAttributeUpdated(name) {
			if (this.store) {
				this.store.notify(this.storeId, name);
			}
		}
	}

	/**
	 * An implementation of a Node that has animation capabilities
	 */
	const AnimatableNodeImpl

	 = AnimatableNodeImplInternal;

	function _optionalChain$4(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */

	/**
	 * @internal
	 *
	 * Returns a data buffer to keep track of Nodes
	 * @param capacity The initial capacity of the data buffer
	 * @param engineTime Function to return the current engine time
	 * @returns A data store capable of storing Node objects
	 */
	function createNodeStore(config) {
		const store = new ArrayStoreImpl(nodeMemoryLayout, config);
		const slotAllocator = new SlotAllocator(
			// We use the store capacity, cause it does some defaulting
			store.config.capacity,

			// If the user explicitly wanted capacity of 0,
			// ignore the allocatedOnCreate and assume nothing is used
			_optionalChain$4([config, 'optionalAccess', _ => _.capacity]) === 0 ? false : Boolean(_optionalChain$4([config, 'optionalAccess', _2 => _2.allocatedOnCreate])),
		);

		const Impl = _optionalChain$4([config, 'optionalAccess', _3 => _3.animation]) !== false ? AnimatableNodeImpl : NodeImpl;
		return new ReaderStoreImpl(Impl, store, slotAllocator)
	}

	function _optionalChain$3(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */

	/**
	 * The unique symbol for an edge
	 */
	const edgeType = Symbol('@graspologic::edge');

	/**
	 * @internal
	 *
	 * The additional edge props
	 */
	const ADDITIONAL_EDGE_PROPS = ['id', 'source', 'target', 'data'];

	/**
	 * @internal
	 * The internal memory layout for storing edges
	 */
	const edgeMemoryLayout = createLayoutBuilder()
		.addUint32('sourceIndex')
		.addUint32('targetIndex')
		.addFloat32('weight')
		.addFloat32('trueWeight')
		.addFloat32('saturation')
		.addFloat32('saturation2')
		.addUint32('color')
		.addUint32('color2')
		.addUint8('visible', { hint: InterpretationHint.Boolean })

		.addFloat32Vec3('sourcePosition.start')
		.addFloat32Vec3('sourcePosition')
		.addFloat32Vec2('sourcePosition.tween', {
			components: ['sourcePosition.duration', 'sourcePosition.startTime'],
		})

		.addFloat32Vec3('targetPosition.start')
		.addFloat32Vec3('targetPosition')
		.addFloat32Vec2('targetPosition.tween', {
			components: ['targetPosition.duration', 'targetPosition.startTime'],
		})
		.build();

	/**
	 * Gets the typed offset for the given attribute
	 */
	function edgeTypedOffset(attribute) {
		return _optionalChain$3([edgeMemoryLayout, 'access', _ => _.get, 'call', _2 => _2(attribute), 'optionalAccess', _3 => _3.typedOffset])
	}

	// Cache some of the attributes for the "load"
	const sourceIndexTypedOffset = edgeMemoryLayout.get('sourceIndex').typedOffset;
	const targetIndexTypedOffset = edgeMemoryLayout.get('targetIndex').typedOffset;
	const colorTypedOffset = edgeMemoryLayout.get('color').typedOffset;
	const color2TypedOffset = edgeMemoryLayout.get('color2').typedOffset;
	const weightTypedOffset = edgeMemoryLayout.get('weight').typedOffset;

	/**
	 * An implementation of an Edge
	 */
	const BaseEdgeImpl = createReader(
		edgeType,
		edgeMemoryLayout,
		ADDITIONAL_EDGE_PROPS,
	);

	class EdgeImpl extends BaseEdgeImpl {
		/**
		 * @inheritDoc
		 * @see {@link Edge.load}
		 */
		 load(
			data,
			nodeIndexMap,
			defaultEdgeWeight = 1,
		) {
	(this ).propertyBag = this.store.propertyBags[this.storeId] || {};
			this.store.propertyBags[this.storeId] = (this ).propertyBag
			;(this ).propertyBag.source = data.source
			;(this ).propertyBag.target = data.target;

			this.uint32Array[
				this.wordOffset + sourceIndexTypedOffset
			] = nodeIndexMap.get(data.source);
			this.uint32Array[
				this.wordOffset + targetIndexTypedOffset
			] = nodeIndexMap.get(data.target);
			this.float32Array[this.wordOffset + weightTypedOffset] =
				data.weight != null ? data.weight : defaultEdgeWeight;
			this.uint32Array[this.wordOffset + colorTypedOffset] =
				data.color || data.sourceColor || 0;
			this.uint32Array[this.wordOffset + color2TypedOffset] =
				data.color2 || data.targetColor || 0;
		}
	}

	function _optionalChain$2(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

	// Cache several frequently accessed names / offsets
	const allAttributes = '*';
	const sourcePositionAttr = 'sourcePosition';
	const sourcePositionStartAttr = 'sourcePosition.start';
	const sourcePositionTweenAttr = 'sourcePosition.tween';
	const targetPositionAttr = 'targetPosition';
	const targetPositionStartAttr = 'targetPosition.start';
	const targetPositionTweenAttr = 'targetPosition.tween';

	const sourcePositionTypedOffset = edgeTypedOffset(sourcePositionAttr);
	const sourcePositionStartTypedOffset = edgeTypedOffset(sourcePositionStartAttr);
	const sourcePositionTweenTypedOffset = edgeTypedOffset(sourcePositionTweenAttr);
	const targetPositionTypedOffset = edgeTypedOffset(targetPositionAttr);
	const targetPositionStartTypedOffset = edgeTypedOffset(targetPositionStartAttr);
	const targetPositionTweenTypedOffset = edgeTypedOffset(targetPositionTweenAttr);

	const inspector = new MemoryReaderInspector();

	/**
	 * An implementation of an Edge that has animation capabilities
	 */
	class AnimatableEdgeImplInternal extends EdgeImpl  {
		/**
		 * @inheritDoc
		 * @see {@link AnimatableEdge.animateSourcePosition}
		 */
		 animateSourcePosition(
			position,
			duration,
		) {
			// Set the start to the old position
			inspector.copyFloat32Vec3Offset(
				this,
				sourcePositionTypedOffset,
				sourcePositionStartTypedOffset,
			);
			this.handleAttributeUpdated(sourcePositionStartAttr);

			// Update the tween
			inspector.writeFloat32Vec2Offset(
				this,
				sourcePositionTweenTypedOffset,
				duration || 0,
				_optionalChain$2([(this.store ), 'optionalAccess', _ => _.engineTime]) || 0,
			);
			this.handleAttributeUpdated(sourcePositionTweenAttr);

			// Update the end sourcePosition
			inspector.writeFloat32Vec3Offset(
				this,
				sourcePositionTypedOffset,
				position[0] || 0,
				position[1] || 0,
				position[2] || 0,
			);
			this.handleAttributeUpdated(sourcePositionAttr);
		}

		/**
		 * @inheritDoc
		 * @see {@link AnimatableEdge.animateTargetPosition}
		 */
		 animateTargetPosition(
			position,
			duration,
		) {
			// Set the start to the old position
			inspector.copyFloat32Vec3Offset(
				this,
				targetPositionTypedOffset,
				targetPositionStartTypedOffset,
			);
			this.handleAttributeUpdated(targetPositionStartAttr);

			// Update the tween
			inspector.writeFloat32Vec2Offset(
				this,
				targetPositionTweenTypedOffset,
				duration || 0,
				_optionalChain$2([(this.store ), 'optionalAccess', _2 => _2.engineTime]) || 0,
			);
			this.handleAttributeUpdated(targetPositionTweenAttr);

			// Update the end targetPosition
			inspector.writeFloat32Vec3Offset(
				this,
				targetPositionTypedOffset,
				position[0] || 0,
				position[1] || 0,
				position[2] || 0,
			);
			this.handleAttributeUpdated(targetPositionAttr);
		}

		/**
		 * @inheritDoc
		 * @see {@link Edge.load}
		 */
		 load(
			data,
			nodeIndexMap,
			defaultEdgeWeight = 1,
		) {
			super.load(data, nodeIndexMap, defaultEdgeWeight);
			this.handleAttributeUpdated(allAttributes);
		}

		/**
		 * Handler for when an attribute is updated
		 * @param name The name of the attribute
		 */
		 handleAttributeUpdated(name) {
			if (this.store) {
				this.store.notify(this.storeId, name);
			}
		}
	}

	/**
	 * An implementation of an Edge that has animation capabilities
	 */
	const AnimatableEdgeImpl

	 = AnimatableEdgeImplInternal;

	function _optionalChain$1(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */

	/**
	 * @internal
	 *
	 * Returns a data buffer to keep track of Edges
	 * @param capacity The initial capacity of the data buffer
	 * @param engineTime Function to return the current engine time
	 * @returns A data store capable of storing Edge objects
	 */
	function createEdgeStore(config) {
		const store = new ArrayStoreImpl(edgeMemoryLayout, config);
		const slotAllocator = new SlotAllocator(
			// We use the store capacity, cause it does some defaulting
			store.config.capacity,

			// If the user explicitly wanted capacity of 0,
			// ignore the allocatedOnCreate and assume nothing is used
			_optionalChain$1([config, 'optionalAccess', _ => _.capacity]) === 0 ? false : Boolean(_optionalChain$1([config, 'optionalAccess', _2 => _2.allocatedOnCreate])),
		);

		const Impl = _optionalChain$1([config, 'optionalAccess', _3 => _3.animation]) !== false ? AnimatableEdgeImpl : EdgeImpl;
		return new ReaderStoreImpl(Impl, store, slotAllocator)
	}

	/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */


	/**
	 * The set of graph options to intern a pojo graph into a GraphContainer
	 */






















	const DEFAULT_INTERN_GRAPH_OPTIONS = Object.freeze({
		defaultEdgeWeight: 1,
		shareable: true,
	});

	/**
	 * @internal
	 *
	 * Interns a raw graph into a GraphContainer, used by graspologic
	 * @param input A raw input graph
	 * @param options: internization options
	 * @returns The GraphContainer
	 */
	function internGraph(
		input,
		{
			shareable = DEFAULT_INTERN_GRAPH_OPTIONS.shareable,
			randomize,
			defaultEdgeWeight = DEFAULT_INTERN_GRAPH_OPTIONS.defaultEdgeWeight,
		} = DEFAULT_INTERN_GRAPH_OPTIONS,
	) {
		const graph = getEmptyGraphContainer(
			input.nodes.length,
			input.edges.length,
			shareable,
		);

		let i = 0;
		const nodeIdToIndex = new Map();

		if (input.nodes.length > 0) {
			let node;
			let inputNode;
			i = 0;
			for (node of graph.nodes.scan()) {
				if (i >= input.nodes.length) {
					break
				}
				inputNode = input.nodes[i];

				if (input.edges.length > 0) {
					nodeIdToIndex.set(inputNode.id, i);
				}

				node.connect(i, graph.nodes);
				node.load(inputNode);
				if (randomize && node.x === 0 && node.y === 0) {
					node.x = randBetween(randomize[0], randomize[1]);
					node.y = randBetween(randomize[2], randomize[3]);
				}
				++i;
			}
		}

		if (input.edges.length > 0) {
			let edge;
			i = 0;
			for (edge of graph.edges.scan()) {
				if (i >= input.edges.length) {
					break
				}
				edge.connect(i, graph.edges);
				edge.load(input.edges[i], nodeIdToIndex, defaultEdgeWeight);
				++i;
			}
		}
		return graph
	}

	/**
	 * Creates an empty graph container
	 * @param numNodes The number of nodes to preallocate
	 * @param numEdges The number of edges to preallocate
	 * @param shareable Whether to use shared-memory
	 * @returns An empty graph container
	 */
	function getEmptyGraphContainer(
		numNodes,
		numEdges,
		shareable = true,
	) {
		return new GraphContainer(
			createNodeStore({
				capacity: numNodes,
				shared: shareable,
				allocatedOnCreate: true,
			}),
			createEdgeStore({
				capacity: numEdges,
				shared: shareable,
				allocatedOnCreate: true,
			}),
		)
	}

	/**
	 * @internal
	 * Populates an adjacency map
	 * @param nodes the nodes data
	 * @param edges the edges data
	 * @returns An adjacency map
	 */
	function populateAdjacency(
		nodes,
		edges,
	) {
		const adj = new Map();
		let node;
		for (node of nodes) {
			adj.set(node.storeId, {});
		}

		// Load the adjacency matrix
		let maxWeight = 0.000001;
		let sourceList;
		let targetList;

		let edge;
		for (edge of edges) {
			const { sourceIndex, targetIndex, weight } = edge;
			sourceList = adj.get(sourceIndex);
			targetList = adj.get(targetIndex);
			if (weight > maxWeight) {
				maxWeight = weight;
			}
			sourceList[targetIndex] = weight;
			targetList[sourceIndex] = weight;
		}

		// Nomalize the edge weights
		let value;
		let key;
		for (value of adj.values()) {
			for (key of Object.keys(value)) {
				value[parseInt(key, 10)] /= maxWeight;
			}
		}

		return adj
	}

	/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */


	/**
	 * The datastructure which contains all the internal graph data required for the GraphRenderer
	 */
	class GraphContainer {
		
		

		// #region adjacency maps
		
		
		// #endregion

		/**
		 * @internal
		 * Constructs a new instance of the GraphContainer
		 * @param nodes The initial node data store
		 * @param edges The initial edge data store
		 */
		 constructor(nodes, edges) {
			this._nodes = nodes;
			this._edges = edges;
		}

		/**
		 * @internal
		 * Gets the underlying node store
		 */
		 get nodes() {
			return this._nodes
		}
		/**
		 * @internal
		 * Gets the underlying edge store
		 */
		 get edges() {
			return this._edges
		}

		/**
		 * Creates an instance of the GraphContainer using the given input graph
		 * @param inputGraph The pojo graph to intern
		 * @param options The set of options controlling how the graph is interned, defaults to @see {@link DEFAULT_INTERN_GRAPH_OPTIONS}
		 * @returns The GraphContainer
		 */
		 static intern(
			inputGraph,
			options = DEFAULT_INTERN_GRAPH_OPTIONS,
		) {
			return internGraph(inputGraph, options)
		}

		/**
		 * @internal
		 * Serializes the GraphContainer instance
		 * @returns The serialized version of the GraphContainer
		 */
		 serialize() {
			return {
				nodes: this.nodes.store.buffer,
				edges: this.edges.store.buffer,
			}
		}

		/**
		 * @internal
		 * Deserializes the GraphContainer instance
		 * @param graph The serialized version of the GraphContainer
		 * @returns The deserialized GraphContainer
		 */
		 static deserialize(graph) {
			const nodeStore = createNodeStore({
				buffer: graph.nodes,
				allocatedOnCreate: true,
			});
			const edgeStore = createEdgeStore({
				buffer: graph.edges,
				allocatedOnCreate: true,
			});
			return new GraphContainer(nodeStore, edgeStore)
		}

		/**
		 * @internal
		 * Retrieve neigbors of the given node. This may be reflect edge-cutting
		 * performed by the algorithm
		 * @param n The node index to retrieve neighbors for
		 * @returns A list of neighbor node indices
		 */
		 getNeighbors(n) {
			const result = this.getAdjacencyMap(false).get(n);
			return result ? Object.keys(result).map(k => parseInt(k, 10)) : []
		}

		/**
		 * @internal
		 * Retrieve neigbors of the given node. This will not reflect any edge-cutting
		 * performed by the algorithm
		 * @param n The node index to retrieve neighbors for
		 * @returns A list of neighbor node indices
		 */
		 getNeighborsObjective(id) {
			const result = this.getAdjacencyMap(true).get(id);
			if (!result) {
				throw new Error(`could not get adjacency for node ${id}`)
			}
			return Object.keys(result).map(k => parseInt(k, 10))
		}

		/**
		 * @internal
		 * Gets the edge weight between two nodes, which may reflect edge-cutting.
		 * @throws if source and target are not connected
		 * @param source The source node index
		 * @param target The target node index
		 * @returns The edge weight
		 */
		 getEdgeWeight(source, target) {
			const result = this.getAdjacencyMap(false).get(source);
			if (!result) {
				throw new Error(`could not get adjacency for node ${source}`)
			}
			return result[target]
		}

		/**
		 * @internal
		 * Gets the edge weight between two nodes, ignoring reflect edge-cutting
		 * @throws if source and target are not connected
		 * @param source The source node index
		 * @param target The target node index
		 * @returns The edge weight
		 */
		 getEdgeWeightObjective(source, target) {
			const result = this.getAdjacencyMap(true).get(source);
			if (!result) {
				throw new Error(`could not get objective adjacency for node ${source}`)
			}
			return result[target]
		}

		/**
		 * @internal
		 * Returns the computed cetroid of the neighborhood that the given node is a part of
		 * @param n The node to get the neighborhood centroid for
		 * @returns The centroid
		 */
		 getNeighborhoodCentroid(n) {
			const neighbors = this.getNeighbors(n);
			const node = this.nodes.itemAt(n);
			if (!node) {
				throw new Error('could not get node ' + n)
			} else if (neighbors.length === 0) {
				return { x: node.x, y: node.y }
			} else {
				const neighborPositions = [node];
				const neighborWeights = [1];
				neighbors.forEach(nid => {
					const neighbor = this.nodes.itemAt(nid);
					const edgeWeight = this.getEdgeWeight(n, nid);
					neighborPositions.push(neighbor);
					neighborWeights.push(edgeWeight);
				});
				const result = weightedCentroid(neighborPositions, neighborWeights);
				return result
			}
		}

		/**
		 * @internal
		 * Prunes an edge
		 * @param from The source node
		 * @param to The target node
		 */
		 pruneEdge(from, to) {
			const fromList = this.getAdjacencyMap(false).get(from);
			const toList = this.getAdjacencyMap(false).get(to);
			if (!fromList || !toList) {
				throw new Error(`could not get edge for (${from}, ${to})`)
			}
			delete fromList[to];
			delete toList[from];
		}

		/**
		 * @internal
		 * Gets an adjacency map
		 * @param original If the original adjacency map is required
		 * @returns The adjacency map
		 */
		 getAdjacencyMap(original) {
			if (!this._originalAdjacency) {
				this._originalAdjacency = populateAdjacency(this.nodes, this.edges);
			}
			if (!this._adjacency && !original) {
				this._adjacency = populateAdjacency(this.nodes, this.edges);
			}
			return original ? this._originalAdjacency : this._adjacency
		}
	}

	/**
	 * @internal
	 *
	 * Computes repulsion using the Barnes Hut algorithm
	 * @param nodes The set of nodes
	 * @param config The force atlas 2 configuration
	 * @returns The amount of repulsion in the graph
	 */
	function computeRepulsionBarnesHut(
		nodes,
		config,
	) {
		const qt = new QuadTree([...nodes]);

		let node;
		let result = 0;
		for (node of nodes) {
			result += applyQuadTreeRepulsion(qt, node, config);
		}
		return result
	}

	/**
	 * Applies repulsion to the given node using the quad tree
	 * @param root The root tree
	 * @param n1 The current node
	 * @param config The force atlas 2 configuration
	 */
	function applyQuadTreeRepulsion(
		root,
		n1,
		config,
	) {
		root.visit(qt => {
			if (qt.isLeaf) {
				if (qt.node) {
					computeNodeRepulsion(n1, qt.node, config);
				}
				return true
			}
			const xDist = n1.x - qt.cx;
			const yDist = n1.y - qt.cy;
			const distance = Math.sqrt(xDist ** 2 + yDist ** 2);
			const applyQuadForce = qt.size / distance < config.barnesHutTheta;

			if (applyQuadForce) {
				const coefficient = config.scalingRatio;
				const massCoeff = coefficient * n1.mass * qt.mass;

				//-- Linear Repulsion
				if (distance > 0) {
					// Updating nodes' dx and dy
					const factor = massCoeff / distance ** 2;
					n1.dx += xDist * factor;
					n1.dy += yDist * factor;
					// repulsionApplied += distance * factor
				} else {
					console.log('Zero Distance 3');
				}
			}

			return applyQuadForce
		});
		return 0
	}

	/**
	 * @internal
	 *
	 * O(n^2) repulsion - check force against all nodes
	 * @params The node data
	 * @params The layout configuration
	 * @returns The computed repulsion
	 */
	function computeRepulsionUnoptimized(
		nodes,
		config,
	) {
		// O(n^2) iteration
		let nid1;
		let nid2;
		for (nid1 = 0; nid1 < nodes.count; ++nid1) {
			for (nid2 = 0; nid2 < nid1; ++nid2) {
				computeNodeRepulsion(nodes.itemAt(nid1), nodes.itemAt(nid2), config);
			}
		}
		return 0
	}

	/**
	 * @internal
	 *
	 * Computes graph repulsion
	 * @param nodes The set of nodes
	 * @param config The force atlas 2 configuration
	 * @returns The amount of repulsion in the graph
	 */
	function computeRepulsion(
		nodes,
		config,
	) {
		return config.barnesHutOptimize
			? computeRepulsionBarnesHut(nodes, config)
			: computeRepulsionUnoptimized(nodes, config)
	}

	/**
	 * @internal
	 *
	 * Runs a single iteration of the FA2 algorithm
	 * @param nodes The node data
	 * @param edges The edge data
	 * @param config The layout configuration
	 *
	 * @returns The applied forces
	 */
	function iterate(
		nodes,
		edges,
		config,
	) {
		resetDeltas(nodes);

		// Compute Forces
		const repulseStart = performance.now();
		const repulsion = computeRepulsion(nodes, config);
		const repulseEnd = performance.now();
		const gravity = computeGravity(nodes, config);
		const gravityEnd = performance.now();
		const attraction = computeAttraction(nodes, edges, config);
		const attractionEnd = performance.now();

		console.log(
			'perf - repulsion=%s, gravity=%s, attraction=%s',
			repulseEnd - repulseStart,
			gravityEnd - repulseEnd,
			attractionEnd - gravityEnd,
		);

		return applyForces(nodes, config, repulsion, gravity, attraction)
	}

	/**
	 * Resets the delta properties on all the nodes
	 * @param nodes The node data to reset the deltas on
	 */
	function resetDeltas(nodes) {
		let node;
		for (node of nodes) {
			node.dx = 0;
			node.dy = 0;
		}
	}

	/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */































































































































	/**
	 * @internal
	 *
	 * The default configuration object for the FA2 algorithm
	 */
	const DEFAULT_CONFIGURATION = Object.freeze({
		adjustSize: false,
		linLogMode: false,
		outboundAttractionDistribution: false,
		adjustSizes: false,
		edgeWeightInfluence: 0,
		scalingRatio: 1,
		strongGravityMode: false,
		gravity: 1,
		slowDown: 1,
		barnesHutOptimize: true,
		barnesHutTheta: 1.2,
		startingIterations: 1,
		maxForce: 10,
		targetIterations: 100,
	});

	/**
	 * @internal
	 *
	 * The force metrics
	 */

	/**
	 * @internal
	 *
	 * The type of message for Manager <-> Worker communication
	 */
	var WorkerMessageType; (function (WorkerMessageType) {
		// Manager -> Worker
		/**
		 * Tells the worker to configure itself
		 */
		const Configure = 'CONFIGURE'; WorkerMessageType["Configure"] = Configure;

		/**
		 * Tells the worker to execute the layout
		 */
		const Execute = 'EXECUTE'; WorkerMessageType["Execute"] = Execute;

		/**
		 * Tells the worker to halt layout
		 */
		const Halt = 'HALT'; WorkerMessageType["Halt"] = Halt;

		/**
		 * Tells the worker to resume layout
		 */
		const Resume = 'RESUME'; WorkerMessageType["Resume"] = Resume;

		/**
		 * Tells the worker to reset it's to the initial state
		 */
		const Reset = 'RESET'; WorkerMessageType["Reset"] = Reset;

		// Worker -> Manager
		/**
		 * Tells the manager that the worker experienced an error
		 */
		const Error = 'ERROR'; WorkerMessageType["Error"] = Error;

		/**
		 * Tells the manager that progress has occurred on the graph layout
		 */
		const Progress = 'PROGRESS'; WorkerMessageType["Progress"] = Progress;

		/**
		 * Tells the manager that the worker has completed layout of the graph
		 */
		const Complete = 'COMPLETE'; WorkerMessageType["Complete"] = Complete;
	})(WorkerMessageType || (WorkerMessageType = {}));

	/**
	 * @internal
	 *
	 * The shape of the messages send to the worker
	 */

	/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */
































	/**
	 * An implementation of an object which emits a set of events
	 */
	class EventEmitter {constructor() { EventEmitter.prototype.__init.call(this); }
		 __init() {this.listeners

	 = {};}

		/**
		 * Adds an event listener for the given event
		 */
		 on(name, handler) {
			this.listeners[name] = this.listeners[name] || [];
			this.listeners[name].push(handler);
			return () => this.off(name, handler)
		}

		/**
		 * Removes an event listener for the given event
		 */
		 off(name, handler) {
			const listeners = this.listeners[name];
			if (listeners) {
				const idx = listeners.indexOf(handler);
				if (idx >= 0) {
					listeners.splice(idx, 1);
				}
			}
		}

		/**
		 * Raises the given event
		 */
		 emit(
			name,
			payload,
		) {
			const listeners = this.listeners[name];
			if (listeners) {
				listeners.forEach(l => {
	(l ).call(this, payload);
				});
			}
		}

		/**
		 * Returns true if there are any listeners for the given event
		 * @param name The event name
		 */
		 hasListeners(name) {
			this.listeners = this.listeners || {};
			const listeners = this.listeners[name];
			if (listeners) {
				return listeners.length > 0
			}
			return false
		}
	}

	/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */
	var CameraAdjustmentMode; (function (CameraAdjustmentMode) {
		/**
		 * Camera is automatically adjusted to fit the graph to the window
		 */
		const Graph = 0; CameraAdjustmentMode[CameraAdjustmentMode["Graph"] = Graph] = "Graph";

		/**
		 * Camera is adjusted such that the graph coordinate space is a 1 to 1 mapping of the coordinate space to pixel space
		 * i.e. A node at (1000, 1000) will show up at (1000, 1000) on the screen
		 */
		const Viewport = Graph + 1; CameraAdjustmentMode[CameraAdjustmentMode["Viewport"] = Viewport] = "Viewport";

		/**
		 * Camera is not adjusted automatically
		 */
		const None = Viewport + 1; CameraAdjustmentMode[CameraAdjustmentMode["None"] = None] = "None";
	})(CameraAdjustmentMode || (CameraAdjustmentMode = {}));

	/**
	 * A WebGL RGBA color vector. Each slot contains a float value from 0-1.
	 */

	/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */
	CameraAdjustmentMode.Graph;

	/**
	 * @internal
	 *
	 * Base class for layout executors
	 */
	class BaseExecutor



	 extends EventEmitter {
		
		 __init() {this._halted = false;}
		 __init2() {this._complete = false;}
		
		
		
		

		/**
		 * Constructor for the base executor
		 * @param graph The graph to run the layout on
		 * @param config The configuration for the layout
		 * @param clock The clock which is used to indicate when a layout cycle has occurred
		 * @param globalObject The "global" object environment
		 */
		 constructor(
			graph,
			config,
			clock,
			globalObject,
		) {
			super();BaseExecutor.prototype.__init.call(this);BaseExecutor.prototype.__init2.call(this);
			this._clock = clock;
			this._graph = graph;
			this._global = globalObject;
			this._configuration = config;
			this.executeStep = this.executeStep.bind(this);
			globalObject.console.log(
				`create new ${this.getName()} instance`,
				this._configuration,
			);
		}

		/**
		 * Halts the layout process
		 */
		 halt() {
			this._halted = true;
		}

		/**
		 * Returns true if the layout is halted
		 */
		 get isHalted() {
			return this._halted
		}

		/**
		 * Returns true if the layout is completed
		 */
		 get isComplete() {
			return this._complete
		}

		/**
		 * Gets the current clock
		 */
		 get clock() {
			return this._clock
		}

		/**
		 * Gets the current graph
		 */
		 get graph() {
			return this._graph
		}

		/**
		 * Gets the current global object
		 */
		 get globalObject() {
			return this._global
		}

		/**
		 * Gets the current configuration
		 */
		 get configuration() {
			return this._configuration
		}

		/**
		 * Configures the executor
		 * @param config The layout config
		 */
		 configure(config) {
			this._configuration = { ...this.defaultConfiguration, ...config };
		}

		/**
		 * The default configuration for the executor
		 */
		

		/**
		 * Executes the layout process
		 */
		 execute() {
			this._global.console.log(
				`execute ${this.getName()}, %s nodes, %s edges`,
				this.graph.nodes.count,
				this.graph.edges.count,
			);
			this._halted = false;
			this._complete = false;
			this.clearTickListener();

			return new Promise(resolve => {
				this.executeStep();
				this._tickListener = this.on('tick', () => {
					if (this._complete) {
						resolve(this.getProgress());
						this.clearTickListener();
					}
				});
			})
		}

		/**
		 * Clears the tick listener
		 */
		 clearTickListener() {
			if (this._tickListener) {
				this._tickListener();
				this._tickListener = undefined;
			}
		}

		/**
		 * Executes one step of the layout algorithm
		 */
		 executeStep() {
			this.performUnitOfWork();

			// Advance the annealing clock
			const ticking = this._clock.tick();
			if (!ticking) {
				this._complete = true;
			}

			// Perform the next layout step on the event queue
			if (ticking && !this._halted) {
				this._global.setTimeout(this.executeStep, 0);
			}

			// Emit the tick event
			this.emit('tick', this.getProgress());
		}

		/**
		 * Gets the name of the layout algorithm
		 * @returns The name
		 */
		











	}

	/**
	 * @internal
	 *
	 * An implementation of a clock which will tick until it reaches a target tick count
	 */
	class CountdownClock  {
		
		 __init() {this._ticks = 0;}

		/**
		 * Constructor for the countdown clock
		 * @param targetTicks The target number of ticks to run
		 */
		 constructor(targetTicks) {CountdownClock.prototype.__init.call(this);
			this._targetTicks = targetTicks;
		}

		/**
		 * Gets the current ticks
		 */
		 get currentTicks() {
			return this._ticks
		}

		/**
		 * Gets the target ticks
		 */
		 get targetTicks() {
			return this._targetTicks
		}

		/**
		 * Ticks the current clock
		 */
		 tick() {
			this._ticks++;
			return this._ticks < this._targetTicks
		}
	}

	/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */

	/**
	 * @internal
	 *
	 * The layout executor which applies the ForceAtlas2 layout algorithm
	 */
	class FA2LayoutExecutor extends BaseExecutor



	 {
		 __init() {this._metrics = [0, 0, 0, 0, 0, 0];}

		/**
		 * Constructor for the fa2 layout executor
		 * @param graph The graph to run the layout on
		 * @param config The configuration for the layout
		 * @param clock The clock which is used to indicate when a layout cycle has occurred
		 * @param globalObject The "global" object environment
		 */
		 constructor(
			graph,
			configuration,
			clock,
			globalObject,
		) {
			super(graph, configuration, clock, globalObject);FA2LayoutExecutor.prototype.__init.call(this);
			this.checkforRandomization();
			this.computeMass();
		}

		/**
		 * Gets the name of the layout
		 */
		 getName() {
			return 'ForceAtlas2'
		}

		/**
		 * Gets the default layout configuration
		 */
		 get defaultConfiguration() {
			return DEFAULT_CONFIGURATION
		}

		/**
		 * Performs one iteration of the ForceAtlas2 algorithm
		 */
		 performUnitOfWork() {
			try {
				this._metrics = iterate(
					this.graph.nodes,
					this.graph.edges,
					this.configuration,
				);
			} catch (err) {
				this.globalObject.console.log('caught error', err);
				throw err
			}
		}

		/**
		 * Returns the current progress of the layout algorithm
		 */
		 getProgress() {
			return {
				clock: {
					iteration: this.clock.currentTicks,
					targetIterations: this.clock.targetTicks,
				},
				metrics: {
					tension: this._metrics[0],
					swing: this._metrics[1],
					traction: this._metrics[2],
				},
			}
		}

		/**
		 * Checks if the graph is setup for randomization
		 */
		 checkforRandomization() {
			let node;
			let isZeroed = true;
			// Randomize the graph layout if it's zeroed out
			for (node of this.graph.nodes) {
				if (node.x !== 0 || node.y !== 0) {
					isZeroed = false;
					break
				}
			}

			if (isZeroed) {
				this.globalObject.console.log('randomizing layouts');
				for (node of this.graph.nodes) {
					node.x = randBetween(0, 1024);
					node.y = randBetween(0, 1024);
				}
			}
		}

		/**
		 * Computes the mass of the graph
		 */
		 computeMass() {
			let node;
			for (node of this.graph.nodes) {
				node.mass = 1;
			}

			let edge;
			for (edge of this.graph.edges) {
				this.graph.nodes.itemAt(edge.sourceIndex).mass += 1;
				this.graph.nodes.itemAt(edge.targetIndex).mass += 1;
			}
		}
	}

	/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */

	/**
	 * @internal
	 *
	 * Creates a new instance of the ForceAtlas2 layout executor
	 * @param graph The graph to layout
	 * @param configuration The FA2 configuration
	 * @param globalObject The global object
	 */
	function createInstance(
		graph,
		configuration = {},
		globalObject = window,
	) {
		const finalConfig = {
			...DEFAULT_CONFIGURATION,
			...configuration,
		};
		return new FA2LayoutExecutor(
			graph,
			finalConfig,
			new CountdownClock(configuration.targetIterations || 100),
			globalObject,
		)
	}

	function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

	/**
	 * The ForceAtlas2 layout worker
	 */

	/**
	 * The current executor
	 */
	let executor;

	/**
	 * The onTick subscription
	 */
	let subscription;

	self.console.log('fa2 worker bootstrapping');

	/**
	 * Handles when a message is received from the main thread
	 */
	self.onmessage = (message) => {
		const { type, payload } = message.data; 
		self.console.log('fa2 receive message', type);
		switch (type) {
			case WorkerMessageType.Configure: {
				_optionalChain([executor, 'optionalAccess', _ => _.configure, 'call', _2 => _2(payload )]);
				break
			}

			case WorkerMessageType.Execute: {
				stopExecution();
				terminateExecution();
				startExecution(payload );
				break
			}
			case WorkerMessageType.Halt: {
				haltExecution();
				break
			}

			case WorkerMessageType.Reset: {
				stopExecution();
				executor = undefined;
				subscription = undefined;
				break
			}

			case WorkerMessageType.Resume: {
				resumeExecution();
				break
			}
			default:
				self.console.log('fa2 worker - unhandled message type', type);
		}
	};

	/**
	 * Halts the execute of the algorithm
	 */
	function haltExecution() {
		if (executor != null) {
			executor.halt();
		} else {
			self.console.log('could not halt executor, instance not defined');
		}
	}

	/**
	 * Resumes the execute of the algorithm
	 */
	function resumeExecution() {
		if (executor != null) {
			if (!executor.isHalted && !executor.isComplete) {
				executor.execute();
			} else {
				self.console.log('executor is not in a resumable state');
			}
		} else {
			self.console.log('could not resume executor, instance not defined');
		}
	}

	/**
	 * Halts the execution of the algorithm
	 */
	function stopExecution() {
		if (executor != null) {
			executor.halt();
		} else {
			self.console.log('could not stop executor, instance not defined');
		}
	}

	/**
	 * Terminates the execution of the layout
	 */
	function terminateExecution() {
		if (subscription != null) {
			subscription();
		}
		subscription = undefined;
		executor = undefined;
	}

	/**
	 * Starts the layout execution
	 * @param param0
	 */
	function startExecution({
		graph,
		configuration,
	}) {
		try {
			executor = createInstance(
				GraphContainer.deserialize(graph),
				configuration,
				self,
			);
			subscription = executor.on('tick', data => {
				sendMessage(WorkerMessageType.Progress, data);
			});

			executor.execute().then(data => {
				// clean up after execution
				if (subscription) {
					subscription();
				}

				// clear out execution state
				executor = undefined;
				subscription = undefined;

				// emit completion event
				sendMessage(WorkerMessageType.Complete, data);
			});
		} catch (err) {
			self.console.log('caught error', err);
			self.postMessage(WorkerMessageType.Error, err);
		}
	}

	/**
	 * Sends a message to the parent thread
	 * @param type The message type
	 * @param payload The message payload
	 */
	function sendMessage(type, payload) {
		self.postMessage(
			{
				type,
				payload,
			} ,
			undefined ,
		);
	}

})();
