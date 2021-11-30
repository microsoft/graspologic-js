import { ClassType } from '../../types';
import { AnimatableEdge, Edge } from '../types';
import { MemoryReader } from '@graspologic/memstore';
/**
 * An implementation of an Edge that has animation capabilities
 */
export declare const AnimatableEdgeImpl: ClassType<MemoryReader & Edge & AnimatableEdge>;
