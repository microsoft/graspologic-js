(function () {
	'use strict';

	/**
	 * @internal
	 *
	 * The configuration for the OpenOrd layout
	 */

















































	/**
	 * @internal
	 *
	 * The default set of configuration options for the layout
	 */
	const DEFAULT_CONFIGURATION = Object.freeze({
		emitDensitySnapshots: false,
		densitySnapshotSamplingRate: 4,
		edgeCut: 0.8,
		schedule: {},
	});

	/**
	 * @internal
	 *
	 * The phase of the layout
	 */
	var AnnealingPhase; (function (AnnealingPhase) {
		const Initial = 0; AnnealingPhase[AnnealingPhase["Initial"] = Initial] = "Initial";
		const Liquid = Initial + 1; AnnealingPhase[AnnealingPhase["Liquid"] = Liquid] = "Liquid";
		const Expansion = Liquid + 1; AnnealingPhase[AnnealingPhase["Expansion"] = Expansion] = "Expansion";
		const Cooldown = Expansion + 1; AnnealingPhase[AnnealingPhase["Cooldown"] = Cooldown] = "Cooldown";
		const Crunch = Cooldown + 1; AnnealingPhase[AnnealingPhase["Crunch"] = Crunch] = "Crunch";
		const Simmer = Crunch + 1; AnnealingPhase[AnnealingPhase["Simmer"] = Simmer] = "Simmer";
		const Complete = Simmer + 1; AnnealingPhase[AnnealingPhase["Complete"] = Complete] = "Complete";
	})(AnnealingPhase || (AnnealingPhase = {}));

	/**
	 * @internal
	 *
	 * The current progress of the layout process
	 */































































































	var NodeUpdateKind; (function (NodeUpdateKind) {
		const CentroidJump = 0; NodeUpdateKind[NodeUpdateKind["CentroidJump"] = CentroidJump] = "CentroidJump";
		const RandomJump = CentroidJump + 1; NodeUpdateKind[NodeUpdateKind["RandomJump"] = RandomJump] = "RandomJump";
	})(NodeUpdateKind || (NodeUpdateKind = {}));

	function _optionalChain$a(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */


	/**
	 * @internal
	 *
	 * A type of clock that uses simulated annealing through several phases
	 */
	class AnnealingClock  {
		
		 __init() {this._phase = AnnealingPhase.Initial;}
		 __init2() {this._iteration = 0;}
		 __init3() {this._phaseIteration = 0;}
		

		// edge-cutting state
		
		
		
		
		
		

		// annealing state
		 __init4() {this._temperature = 0;}
		 __init5() {this._attraction = 0;}
		 __init6() {this._damping = 0;}

		 constructor(
			edgeCut = 0.8,
			schedule = {},
		) {AnnealingClock.prototype.__init.call(this);AnnealingClock.prototype.__init2.call(this);AnnealingClock.prototype.__init3.call(this);AnnealingClock.prototype.__init4.call(this);AnnealingClock.prototype.__init5.call(this);AnnealingClock.prototype.__init6.call(this);
			// establish the schedule
			this._schedule = { ...DEFAULT_SCHEDULE, ...schedule };
			this._targetIterations = Object.values(this._schedule)
				.map(v => v.iterations)
				.reduce((prev, curr) => prev + curr, 0);

			// Taken from the python init_params method
			this._minEdges = 20.000001;
			this._cutEnd = 40000.0 * (1.0 - edgeCut);
			this._cutLengthEnd = this._cutEnd < 1 ? 1 : this._cutEnd;
			this._cutLengthStart = 4.0 * this._cutLengthEnd;
			this._cutOffLength = this._cutLengthStart;
			this._cutRate = (this._cutLengthStart - this._cutLengthEnd) / 400;

			this.schedulePhase(AnnealingPhase.Initial);
		}

		/**
		 * Gets the current phase
		 */
		 get phase() {
			return this._phase
		}

		/**
		 * Determines if annealing is complete
		 */
		 get isComplete() {
			return this._phase === AnnealingPhase.Complete
		}

		/**
		 * Gets the current iteration
		 */
		 get iteration() {
			return this._iteration
		}

		/**
		 * Gets the current phase iteration
		 */
		 get phaseIteration() {
			return this._phaseIteration
		}

		/**
		 * Gets the target phase iterations
		 */
		 get targetPhaseIterations() {
			return this.phase != null ? this.schedule[this.phase].iterations : 0
		}

		/**
		 * Gets the target number of iterations
		 */
		 get targetIterations() {
			return this._targetIterations
		}

		 get attraction() {
			return this._attraction
		}

		 get temperature() {
			return this._temperature
		}

		 get damping() {
			return this._damping
		}

		 get minEdges() {
			return this._minEdges
		}

		/**
		 * Gets the annealing schedule
		 */
		 get schedule() {
			return this._schedule
		}

		 get cutEnd() {
			return this._cutEnd
		}

		 get cutOffLength() {
			return this._cutOffLength
		}

		 get neighborCutsEnabled() {
			switch (this.phase) {
				case AnnealingPhase.Liquid:
				case AnnealingPhase.Expansion:
				case AnnealingPhase.Cooldown:
				case AnnealingPhase.Crunch:
					return true
				default:
					return false
			}
		}

		/**
		 * Runs an annealing iteration
		 * @returns True if an iteration was run
		 */
		 tick() {
			if (this.isComplete) {
				return false
			} else {
				this._iteration += 1;
				this._phaseIteration += 1;
				if (this.phaseIteration >= this.targetPhaseIterations) {
					this.handlePhaseComplete();
				} else {
					this.handlePhaseTick();
				}
				return true
			}
		}

		/**
		 * Handler for when a tick occurs
		 */
		 handlePhaseTick() {
			if (this.phase === AnnealingPhase.Expansion) {
				this._cutLengthEnd -= this._cutRate;

				if (this.attraction > 1.0) {
					this._attraction -= 0.05;
				}
				if (this.minEdges > 12.0) {
					this._minEdges -= 0.05;
				}
				if (this.damping > 0.1) {
					this._damping -= 0.005;
				}
			} else if (this.phase === AnnealingPhase.Cooldown) {
				if (this.temperature > 50.0) {
					this._temperature -= 10.0;
				}
				if (this._cutOffLength > this._cutLengthEnd) {
					this._cutOffLength -= this._cutRate * 2.0;
				}
				if (this.minEdges > 1.0) {
					this._minEdges -= 0.2;
				}
			}
		}

		/**
		 * Handler for when a phase has completed
		 */
		 handlePhaseComplete() {
			this._phaseIteration = 0;
			if (this.phase === AnnealingPhase.Initial) {
				return this.schedulePhase(AnnealingPhase.Liquid)
			} else if (this.phase === AnnealingPhase.Liquid) {
				return this.schedulePhase(AnnealingPhase.Expansion)
			} else if (this.phase === AnnealingPhase.Expansion) {
				this._minEdges = 12.0000000001;
				return this.schedulePhase(AnnealingPhase.Cooldown)
			} else if (this.phase === AnnealingPhase.Cooldown) {
				this._minEdges = 1.0 + 0.00000000000001;
				this._cutOffLength = this._cutLengthEnd;
				return this.schedulePhase(AnnealingPhase.Crunch)
			} else if (this.phase === AnnealingPhase.Crunch) {
				// TODO REMOVE, this is functionally eliminated
				this._minEdges = 99.0;
				return this.schedulePhase(AnnealingPhase.Simmer)
			} else if (this.phase === AnnealingPhase.Simmer) {
				return this.schedulePhase(AnnealingPhase.Complete)
			}
		}

		/**
		 * Schedules __phase__ to run on the next iteration
		 * @param phase The phase to schedule
		 */
		 schedulePhase(phase) {
			this._phase = phase;

			if (_optionalChain$a([this, 'access', _ => _.schedule, 'access', _2 => _2[phase], 'optionalAccess', _3 => _3.iterations]) > 0) {
				this._temperature = this.schedule[phase].temperature;
				this._attraction = this.schedule[phase].attraction;
				this._damping = this.schedule[phase].damping;
			} else {
				if (phase === AnnealingPhase.Initial) {
					this.schedulePhase(AnnealingPhase.Liquid);
				} else if (phase === AnnealingPhase.Liquid) {
					this.schedulePhase(AnnealingPhase.Expansion);
				} else if (phase === AnnealingPhase.Cooldown) {
					this.schedulePhase(AnnealingPhase.Crunch);
				} else if (phase === AnnealingPhase.Crunch) {
					this.schedulePhase(AnnealingPhase.Simmer);
				} else if (phase === AnnealingPhase.Simmer) {
					this._phase = AnnealingPhase.Complete;
				}
			}
		}

		 get energyDistancePower() {
			switch (this.phase) {
				case AnnealingPhase.Liquid:
					return 4
				case AnnealingPhase.Expansion:
					return 2
				default:
					return 1
			}
		}

		 get useFineDensity() {
			return this.phase === AnnealingPhase.Simmer
		}
	}

	/**
	 * @internal
	 *
	 * The default schedule used during layout
	 */
	const DEFAULT_SCHEDULE = {
		[AnnealingPhase.Initial]: {
			iterations: 1,
			temperature: 2000,
			attraction: 10,
			damping: 1,
		},
		[AnnealingPhase.Liquid]: {
			iterations: 200,
			temperature: 2000,
			attraction: 2,
			damping: 1,
		},
		[AnnealingPhase.Expansion]: {
			iterations: 200,
			temperature: 2000,
			attraction: 10,
			damping: 1,
		},
		[AnnealingPhase.Cooldown]: {
			iterations: 200,
			temperature: 2000,
			attraction: 1,
			damping: 0.1,
		},
		[AnnealingPhase.Crunch]: {
			iterations: 50,
			temperature: 250,
			attraction: 1.0,
			damping: 0.25,
		},
		[AnnealingPhase.Simmer]: {
			iterations: 100,
			temperature: 250,
			attraction: 0.5,
			damping: 0,
		},
		[AnnealingPhase.Complete]: {
			iterations: 0,
			temperature: 0,
			attraction: 0,
			damping: 0,
		},
	};

	/**
	 * @internal
	 *
	 * Computes the square distance between the two points
	 * @param pos1 The first position
	 * @param pos2 The second position
	 * @returns The square distance
	 */
	function squareDistanceTo(pos1, pos2) {
		const dx = pos2.x - pos1.x;
		const dy = pos2.y - pos1.y;
		return dx ** 2 + dy ** 2
	}

	/**
	 * @internal
	 *
	 * Computes the euclidean distance between the two points
	 * @param pos1 The first position
	 * @param pos2 The second position
	 * @returns The distance
	 */
	function distanceTo(pos1, pos2) {
		return Math.sqrt(squareDistanceTo(pos1, pos2))
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

	/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */

	const GRID_SIZE = 1000;
	const RADIUS = 10;
	const DIAMETER = 2 * RADIUS;
	const FALLOFF = getInitialFalloffStructure();

	/**
	 * @internal
	 *
	 * A node density grid to track the density of nodes in a grid pattern
	 */
	class DensityGrid {constructor() { DensityGrid.prototype.__init.call(this);DensityGrid.prototype.__init2.call(this);DensityGrid.prototype.__init3.call(this);DensityGrid.prototype.__init4.call(this); }
		 __init() {this.initialLoad = true;}
		 __init2() {this._bitmap = getInitialDensityBitmap();}
		 __init3() {this._bins = getInitialDensityBins();}
		 __init4() {this._trackedNodes = new Set();}

		/**
		 * Determines whether the given node is in the denisty grid
		 * @param id The node id
		 */
		 contains(node) {
			return this._trackedNodes.has(node.storeId)
		}

		/**
		 * Gets the number of tracked nodes in the grid
		 */
		 get size() {
			return this._trackedNodes.size
		}

		/**
		 * Gets the density bitmap
		 */
		 get bitmap() {
			return this._bitmap
		}

		 get checksum() {
			let result = 0;
			for (let i = 0; i < GRID_SIZE; ++i) {
				for (let j = 0; j < GRID_SIZE; ++j) {
					result += this._bitmap[i][j];
				}
			}
			return result
		}

		/**
		 * Adds a node to the density grid
		 * @param node The node to add to the density grid
		 */
		 add(node) {
			if (this.contains(node)) {
				throw new Error(`cannot add node ${node.storeId} to density grid twice`)
			}
			this._trackedNodes.add(node.storeId);
			this.addToBins(node);
			this.addToBitmap(node);
		}

		/**
		 * Subtracts a node from the density grid
		 */
		 subtract(node) {
			if (!this.contains(node)) {
				throw new Error(`cannot remove node ${node.storeId}from density grid`)
			}
			this._trackedNodes.delete(node.storeId);
			this.subtractFromBitmap(node);
			this.subtractFromBins(node);
		}

		 addToBitmap(node) {
			const xGrid = gridIndex(node.x) - RADIUS;
			const yGrid = gridIndex(node.y) - RADIUS;

			for (let i = 0; i <= DIAMETER; ++i) {
				for (let j = 0; j <= DIAMETER; ++j) {
					const xIndex = xGrid + j;
					const yIndex = yGrid + i;
					if (isValidIndex(xIndex, yIndex)) {
						this._bitmap[yIndex][xIndex] += FALLOFF[i][j];
					}
				}
			}
		}

		 subtractFromBitmap(node) {
			const xGrid = gridIndex(node.x) - RADIUS;
			const yGrid = gridIndex(node.y) - RADIUS;

			for (let i = 0; i <= DIAMETER; ++i) {
				for (let j = 0; j <= DIAMETER; ++j) {
					const xIndex = xGrid + j;
					const yIndex = yGrid + i;
					if (isValidIndex(xIndex, yIndex)) {
						this.bitmap[yIndex][xIndex] -= FALLOFF[i][j];
					}
				}
			}
		}

		 addToBins(node) {
			const xGrid = gridIndex(node.x);
			const yGrid = gridIndex(node.y);
			verifyGridIndices(xGrid, yGrid);
			const bin = this._bins[yGrid][xGrid];
			bin[node.storeId] = node;
		}

		 subtractFromBins(node) {
			const xGrid = gridIndex(node.x);
			const yGrid = gridIndex(node.y);
			verifyGridIndices(xGrid, yGrid);

			const bin = this._bins[yGrid][xGrid];
			if (bin[node.storeId]) {
				delete bin[node.storeId];
			}
		}

		// gets the density at a given position excluding the given node's contribution.
		// the node must be inserted into the denisty grid
		 getDensity(node, testPosition, fine = false) {
			const INFINITE_DENSITY = 10000.0;

			if (Number.isNaN(testPosition.x) || Number.isNaN(testPosition.y)) {
				throw new Error('test position has NaN component')
			} else if (!isQueryInBounds(testPosition)) {
				return INFINITE_DENSITY
			} else if (fine) {
				return this.getFineDensity(node, testPosition)
			} else {
				return this.getCoarseDensity(node, testPosition)
			}
		}
		 getFineDensity(node, position) {
			const xGrid = gridIndex(position.x);
			const yGrid = gridIndex(position.y);

			let density = 0.0;
			let i;
			let j;
			let id;
			for (i = yGrid - 1; i <= yGrid + 1; ++i) {
				for (j = xGrid - 1; j <= xGrid + 1; ++j) {
					const bin = this._bins[i][j];
					for (id of Object.keys(bin)) {
						// exclude the current id so we don't have to do removals before density checks
						// This allows the density grid to be read-only in the update phase
						if (parseInt(id, 10) !== node.storeId) {
							const binItemPos = bin[id];
							const distance = squareDistanceTo(position, binItemPos);
							density += 1e-4 / (distance + 1e-50);
						}
					}
				}
			}
			return density
		}

		 getOverlap(node, position) {
			const xGrid = gridIndex(position.x);
			const yGrid = gridIndex(position.y);

			let overlap = 0.0;
			let i;
			let j;
			let id;
			for (i = yGrid - 1; i <= yGrid + 1; ++i) {
				for (j = xGrid - 1; j <= xGrid + 1; ++j) {
					const bin = this._bins[i][j];
					for (id of Object.keys(bin)) {
						// exclude the current id so we don't have to do removals before density checks
						// This allows the density grid to be read-only in the update phase
						if (parseInt(id, 10) !== node.storeId) {
							const other = bin[id];
							const distance = distanceTo(position, other);
							const nodeEdgeDistance = distance - node.size - other.size;
							if (nodeEdgeDistance < 0) {
								overlap += Math.abs(nodeEdgeDistance);
							}
						}
					}
				}
			}
			return overlap
		}

		 getCoarseDensity(node, position) {
			const xGrid = gridIndex(position.x);
			const yGrid = gridIndex(position.y);

			// Ignore the splash density of the node value
			const ignorable = this.getDensityToExcludeAtPoint(node, position);
			const gridValue = this._bitmap[yGrid][xGrid];
			const density = gridValue - ignorable;
			return density ** 2
		}

		// density queries ignore the density of the node being moved. This calculates the density value
		// to ignore
		 getDensityToExcludeAtPoint(node, position) {
			const nxGrid = gridIndex(node.x);
			const nyGrid = gridIndex(node.y);
			const xGrid = gridIndex(position.x);
			const yGrid = gridIndex(position.y);
			const xDist = xGrid - nxGrid;
			const yDist = yGrid - nyGrid;
			const isNodeApplicable =
				!this.initialLoad &&
				this.contains(node) &&
				Math.abs(xDist) < RADIUS &&
				Math.abs(yDist) < RADIUS;

			return isNodeApplicable
				? FALLOFF[Math.floor(RADIUS + yDist)][Math.floor(RADIUS + xDist)]
				: 0.0
		}
	}

	/**
	 * Gets the initial density bitmap to use
	 */
	function getInitialDensityBitmap() {
		const result = [];
		// Set up a density grid of zero-values and empty bins for each grid cell
		for (let i = 0; i < GRID_SIZE; ++i) {
			const row = new Float32Array(GRID_SIZE);
			result.push(row);
			for (let j = 0; j < GRID_SIZE; ++j) {
				row[j] = 0;
			}
		}
		return result
	}

	/**
	 * Gets the initial density bins to use
	 */
	function getInitialDensityBins() {
		const result = [];
		// Set up a density grid of zero-values and empty bins for each grid cell
		for (let i = 0; i < GRID_SIZE; ++i) {
			const row = [];
			result.push(row);
			for (let j = 0; j < GRID_SIZE; ++j) {
				row.push({});
			}
		}
		return result
	}

	/**
	 * gets the falloff structure to use for density insertion
	 */
	function getInitialFalloffStructure() {
		const result = [];
		for (let i = -RADIUS; i <= RADIUS; ++i) {
			result[i + RADIUS] = [];
			for (let j = -RADIUS; j <= RADIUS; ++j) {
				const radius = RADIUS;
				const iAbs = Math.abs(i);
				const jAbs = Math.abs(j);
				const iFac = (radius - iAbs) / radius;
				const jFac = (radius - jAbs) / radius;
				const falloffValue = iFac * jFac;
				result[i + RADIUS][j + RADIUS] = falloffValue;
			}
		}
		return result
	}

	function gridIndex(value) {
		const viewToGrid = 0.25;
		const halfView = (GRID_SIZE ) * 2.0;
		const result = Math.floor((value + halfView + 0.5) * viewToGrid);
		return Math.max(0, Math.min(result, GRID_SIZE - 1))
	}

	function verifyGridIndices(xGrid, yGrid) {
		if (xGrid >= GRID_SIZE || yGrid >= GRID_SIZE) {
			throw new Error(`invalid grid storeId: (${xGrid}, ${yGrid})`)
		}
	}

	function isQueryInBounds(position) {
		const boundary = 10;
		const xGrid = gridIndex(position.x);
		const yGrid = gridIndex(position.y);
		const isOutOfBounds = (idx) =>
			idx > GRID_SIZE - boundary || idx < boundary;
		return !isOutOfBounds(xGrid) && !isOutOfBounds(yGrid)
	}

	function isValidIndex(xIndex, yIndex) {
		return yIndex >= 0 && xIndex >= 0 && yIndex < GRID_SIZE && xIndex < GRID_SIZE
	}

	/**
	 * @internal
	 *
	 * Moves __pos1__ closer to __pos2__ by a __damping__ factor
	 * @param pos1 The start position
	 * @param pos2 The end position
	 * @param damping The damping factor
	 */
	function jumpTowards(
		pos1,
		pos2,
		damping,
	) {
		if (damping < 0.0 || damping > 1.0) {
			throw new Error('jump factor must be between 0-1')
		} else {
			const inverse = 1.0 - damping;
			return {
				x: pos1.x * inverse + damping * pos2.x,
				y: pos1.y * inverse + damping * pos2.y,
			}
		}
	}

	/**
	 * @internal
	 *
	 * Moves __source__ a random __distance__ away from it's current position
	 * @param source The source position
	 * @param distance The distance of the jump
	 */
	function jumpRandom(source, distance) {
		const r1 = Math.random();
		const r2 = Math.random();
		const x = source.x + (0.5 - r1) * distance;
		const y = source.y + (0.5 - r2) * distance;
		return { x, y }
	}

	/**
	 * @internal
	 *
	 * Generates a sample bitmap from the given density grid
	 * @param densityGrid The density grid to sample
	 * @param rate The sampling rate. 1=full sample. 2=skip every other row+column
	 */
	function sampleBitmap(densityGrid, rate) {
		const bitmap = densityGrid.bitmap;
		const result = [];

		for (let rowIndex = 0; rowIndex < bitmap.length; rowIndex += rate) {
			const row = [];
			result.push(row);

			for (let colIndex = 0; colIndex < bitmap[0].length; colIndex += rate) {
				row.push(bitmap[rowIndex][colIndex]);
			}
		}

		return result
	}

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
	 * A layout executor which will run the OpenOrd layout on a graph
	 */
	class OpenOrdLayoutExecutor extends BaseExecutor



	 {
		

		/**
		 * Constructor for the OpenOrdLayoutExecutor
		 * @param graph The graph to layout
		 * @param configuration The configuration for the algorithm
		 * @param clock The annealing clock which controls how long phases are run
		 * @param globalObject The global object
		 * @param densityGrid The node density grid
		 */
		 constructor(
			graph,
			configuration,
			clock,
			globalObject,
			densityGrid,
		) {
			super(graph, configuration, clock, globalObject);
			this._densityGrid = densityGrid;
			// Randomize the graph layout if it's zeroed out
			let isZeroed = true;
			let node;
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
			this.initializeDensityGrid();
		}

		/**
		 * Gets the name of the layout algorithm
		 */
		 getName() {
			return 'OpenOrd'
		}

		/**
		 * Gets the density grid
		 */
		 get densityGrid() {
			return this._densityGrid
		}

		/**
		 * Gets the default configuration
		 */
		 get defaultConfiguration() {
			return DEFAULT_CONFIGURATION
		}

		/**
		 * Constructs the tick progress object
		 */
		 getProgress() {
			const {
				phase,
				iteration,
				phaseIteration,
				targetPhaseIterations,
				targetIterations,
			} = this.clock;
			const {
				emitDensitySnapshots,
				densitySnapshotSamplingRate,
				densitySnapshotEmitRate,
				emitEnergy,
				emitObjectiveEnergy,
			} = this.configuration;

			const result = {
				clock: {
					phase,
					iteration,
					phaseIteration,
					targetIterations,
					targetPhaseIterations,
				},
				densityGrid: {},
				metrics: {},
			};

			if (emitDensitySnapshots) {
				if (
					densitySnapshotEmitRate == null ||
					this.clock.iteration % densitySnapshotEmitRate === 0
				) {
					result.densityGrid.bitmap = sampleBitmap(
						this.densityGrid,
						densitySnapshotSamplingRate,
					);
				}
			}

			if (emitEnergy) {
				const energy = this.energy;
				result.metrics.energy = energy;
			}

			if (emitObjectiveEnergy) {
				const [
					objectiveEnergy,
					attractiveEnergy,
					repulsiveEnergy,
					overlapEnergy,
				] = this.objectiveEnergy;
				result.metrics.objectiveEnergy = objectiveEnergy;
				result.metrics.attractiveEnergy = attractiveEnergy;
				result.metrics.repulsiveEnergy = repulsiveEnergy;
				result.metrics.overlapEnergy = overlapEnergy;
			}

			return result
		}

		/**
		 * Performs a single unit of work
		 */
		 performUnitOfWork() {
			if (this.configuration.iterativeForceModel) {
				this.performIterativeUnitOfWork();
			} else {
				this.performConcurrentUnitOfWork();
			}
		}

		/**
		 * Initializes the internal density grid
		 */
		 initializeDensityGrid() {
			let node;
			for (node of this.graph.nodes) {
				this.densityGrid.add(node);
			}
		}

		/**
		 * perform the unit of work (layout step) with a concurrent force model - updates are applied after they have all been computed
		 */
		 performConcurrentUnitOfWork() {
			let node;
			for (node of this.graph.nodes) {
				const update = this.computeNodeUpdate(node);
				this.applyUpdate(update);
			}
		}

		/**
		 * perform the unit of work (layout step) with a iterative force model - updates are applied in series
		 */
		 performIterativeUnitOfWork() {
			let update;
			for (update of this.computeIterativeUpdates()) {
				this.applyUpdate(update);
			}
		}
		/**
		 * This is a generator so that we can either resolve the updates iteratively using
		 * a stochastic gradient descent method, or all at the same time using a force modeling
		 * approach
		 * @returns The updates for each of the nodes
		 */
		 *computeIterativeUpdates() {
			let node;
			for (node of this.graph.nodes) {
				yield this.computeNodeUpdate(node);
			}
		}

		 computeNodeUpdate(node) {
			const [centroidJump, centroidEdgeCut] = this.computeCentroidJump(node);
			const centroidJumpEnergy = this.computeNodePosEnergy(node, centroidJump);
			const jumpScale = 0.01 * this.clock.temperature;
			const randJumpPosition = jumpRandom(centroidJump, jumpScale);
			const randJumpEnergy = this.computeNodePosEnergy(node, randJumpPosition);

			if (randJumpEnergy < centroidJumpEnergy) {
				return {
					node,
					kind: NodeUpdateKind.RandomJump,
					position: randJumpPosition,
					energy: randJumpEnergy,
				}
			} else {
				return {
					node,
					kind: NodeUpdateKind.CentroidJump,
					position: centroidJump,
					energy: centroidJumpEnergy,
					prunedEdge: centroidEdgeCut,
				}
			}
		}

		 computeNodePosEnergy(node, position) {
			const attractive = this.nodeAttractiveForce(node, position);
			const repulsive = this.nodeRepulsiveForce(node, position);
			return attractive + repulsive
		}

		 nodeAttractiveForce(node, position) {
			//const attractionFactor = this.clock.attraction ** 4 * 2e-2
			const energyDistancePower = this.clock.energyDistancePower;
			let sum = 0.0;
			let neighborId;
			let neighbor;
			let weight;

			for (neighborId of this.graph.getNeighbors(node.storeId)) {
				neighbor = this.graph.nodes.itemAt(neighborId);
				weight = this.graph.getEdgeWeight(node.storeId, neighborId);
				if (weight != null) {
					const energyDistance =
						squareDistanceTo(position, neighbor) ** energyDistancePower;

					const neighborEnergy = weight * energyDistance; // * attractionFactor
					sum += neighborEnergy;
				}
			}

			return sum
		}

		 nodeRepulsiveForce(node, position) {
			return this.densityGrid.getDensity(
				node,
				position,
				this.clock.useFineDensity,
			)
		}

		 computeCentroidJump(node) {
			const isNeighborCutRequired = () => {
				// TODO: This turns on when users set the edge cut manually. It doesn't fire with the default
				// value of 0.8. Is this even useful?
				const cutEndActive = this.clock.cutEnd < 39500.9;
				const numNeighborsExceedsMin = () => {
					const numNeighbors = this.graph.getNeighbors(node.storeId).length;
					return numNeighbors > this.clock.minEdges
				};
				return (
					this.clock.neighborCutsEnabled &&
					cutEndActive &&
					numNeighborsExceedsMin()
				)
			};

			const centroidPos = this.graph.getNeighborhoodCentroid(node.storeId);
			const jumpPos = jumpTowards(node, centroidPos, this.clock.damping);
			const jumpDist = squareDistanceTo(centroidPos, jumpPos);
			const prunedEdge =
				jumpDist > 0 && isNeighborCutRequired()
					? this.getEdgeToCut(node, centroidPos)
					: undefined;
			return [jumpPos, prunedEdge]
		}

		 getEdgeToCut(
			node,
			centroidPos,
		) {
			const neighbors = this.graph.getNeighbors(node.storeId);
			const squareConnections = Math.sqrt(neighbors.length);
			let maxDistance = 0.0;
			let maxNeighbor;

			neighbors.forEach(neighborId => {
				const neighbor = this.graph.nodes.itemAt(neighborId);
				const distance =
					squareDistanceTo(centroidPos, neighbor) * squareConnections;
				if (distance > maxDistance && distance > this.clock.cutOffLength) {
					maxDistance = distance;
					maxNeighbor = neighborId;
				}
			});

			return maxNeighbor
		}

		 applyUpdate({ node, position, prunedEdge }) {
			if (this.densityGrid.contains(node)) {
				this.densityGrid.subtract(node);
			}

			// Move node position
			node.x = position.x;
			node.y = position.y;

			if (prunedEdge) {
				this.graph.pruneEdge(node.storeId, prunedEdge);
			}
			this.densityGrid.add(node);
		}

		/**
		 * Gets the working energy. This differs from the objective energy in that we cull low-weight edges as the
		 * algorithm progresses. The objective energy keep these in tact.
		 */
		 get energy() {
			let result = 0;
			let node;
			for (node of this.graph.nodes) {
				result += this.computeNodePosEnergy(node, node);
			}
			return result
		}

		/**
		 * Gets the objective energy according to Equation 1 of the OpenOrd Paper
		 *
		 * https://www.researchgate.net/publication/253087985_OpenOrd_An_Open-Source_Toolbox_for_Large_Graph_Layout
		 */
		 get objectiveEnergy() {
			let attractiveEnergy = 0;
			let repulsiveEnergy = 0;
			let overlapEnergy = 0.001;

			let node;
			let neighbor;
			for (node of this.graph.nodes) {
				repulsiveEnergy += this.densityGrid.getDensity(node, node, false);
				if (this.clock.phase && this.clock.phase > AnnealingPhase.Liquid) {
					overlapEnergy += this.densityGrid.getOverlap(node, node);
				}

				for (neighbor of this.graph
					.getNeighborsObjective(node.storeId)
					.map(nid => this.graph.nodes.itemAt(nid))) {
					const distance = squareDistanceTo(node, neighbor);
					const weight = this.graph.getEdgeWeightObjective(
						node.storeId,
						neighbor.storeId,
					);
					attractiveEnergy += distance * weight;
				}
			}

			const objectiveEnergy = attractiveEnergy + repulsiveEnergy;
			return [objectiveEnergy, attractiveEnergy, repulsiveEnergy, overlapEnergy]
		}
	}

	/*!
	 * Copyright (c) Microsoft. All rights reserved.
	 * Licensed under the MIT license. See LICENSE file in the project.
	 */


	/**
	 * @internal
	 *
	 * Creates an instance of the OpenOrdLayoutExector
	 * @param graph The graph to layout
	 * @param configuration The layout configuration
	 * @param globalObject The global object to use
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
		return new OpenOrdLayoutExecutor(
			graph,
			finalConfig,
			new AnnealingClock(configuration.edgeCut, configuration.schedule),
			globalObject,
			new DensityGrid(),
		)
	}

	function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

	let executor;
	let subscription;

	self.console.log('openord worker bootstrapping');

	/**
	 * Listens for messages from the layout exectuor
	 */
	self.onmessage = (message) => {
		const { type, payload } = message.data; 
		self.console.log('openord receive message', type);
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
				self.console.log('openord worker - unhandled message type', type);
		}
	};

	/**
	 * Halts the execution of the layout
	 */
	function haltExecution() {
		if (executor != null) {
			executor.halt();
		} else {
			self.console.log('could not halt oord, instance not defined');
		}
	}

	/**
	 * Resumes the execution of the layout
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
	 * Halts the execution of the layout
	 */
	function stopExecution() {
		if (executor != null) {
			executor.halt();
		} else {
			self.console.log('could not stop oord, instance not defined');
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
	 * Starts the execution of the layout
	 * @param param0 The execute payload
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
	 * Sends a message to the layout executor
	 * @param type The type of message
	 * @param payload The payload for the message
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
