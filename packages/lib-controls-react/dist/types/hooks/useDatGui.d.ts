/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as dat from 'dat.gui';
/**
 * @internal
 *
 * A hook which manages an instance of dat.gui
 * @param guiWidth The width of dat.gui
 */
export declare function useDatGui(guiWidth: number): [dat.GUI, React.RefObject<HTMLDivElement>];
