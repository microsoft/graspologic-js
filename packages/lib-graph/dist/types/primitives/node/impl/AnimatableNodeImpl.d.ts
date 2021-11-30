import { ClassType } from '../../types';
import { AnimatableNode, Node } from '../types';
import { MemoryReader } from '@graspologic/memstore';
/**
 * An implementation of a Node that has animation capabilities
 */
export declare const AnimatableNodeImpl: ClassType<MemoryReader & Node & AnimatableNode>;
