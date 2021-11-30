/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AnnealingPhase, PhaseSchedule } from './types';
import { TickingClock } from '@graspologic/layout-core';
/**
 * @internal
 *
 * A type of clock that uses simulated annealing through several phases
 */
export declare class AnnealingClock implements TickingClock {
    private _schedule;
    private _phase;
    private _iteration;
    private _phaseIteration;
    private _targetIterations;
    private _minEdges;
    private _cutEnd;
    private _cutLengthEnd;
    private _cutLengthStart;
    private _cutOffLength;
    private _cutRate;
    private _temperature;
    private _attraction;
    private _damping;
    constructor(edgeCut?: number, schedule?: Partial<Record<AnnealingPhase, PhaseSchedule>>);
    /**
     * Gets the current phase
     */
    get phase(): AnnealingPhase;
    /**
     * Determines if annealing is complete
     */
    get isComplete(): boolean;
    /**
     * Gets the current iteration
     */
    get iteration(): number;
    /**
     * Gets the current phase iteration
     */
    get phaseIteration(): number;
    /**
     * Gets the target phase iterations
     */
    get targetPhaseIterations(): number;
    /**
     * Gets the target number of iterations
     */
    get targetIterations(): number;
    get attraction(): number;
    get temperature(): number;
    get damping(): number;
    get minEdges(): number;
    /**
     * Gets the annealing schedule
     */
    get schedule(): Record<AnnealingPhase, PhaseSchedule>;
    get cutEnd(): number;
    get cutOffLength(): number;
    get neighborCutsEnabled(): boolean;
    /**
     * Runs an annealing iteration
     * @returns True if an iteration was run
     */
    tick(): boolean;
    /**
     * Handler for when a tick occurs
     */
    private handlePhaseTick;
    /**
     * Handler for when a phase has completed
     */
    private handlePhaseComplete;
    /**
     * Schedules __phase__ to run on the next iteration
     * @param phase The phase to schedule
     */
    private schedulePhase;
    get energyDistancePower(): number;
    get useFineDensity(): boolean;
}
