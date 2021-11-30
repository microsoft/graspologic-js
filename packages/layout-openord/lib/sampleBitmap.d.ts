/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { DensityGrid } from './DensityGrid';
/**
 * @internal
 *
 * Generates a sample bitmap from the given density grid
 * @param densityGrid The density grid to sample
 * @param rate The sampling rate. 1=full sample. 2=skip every other row+column
 */
export declare function sampleBitmap(densityGrid: DensityGrid, rate: number): number[][];
