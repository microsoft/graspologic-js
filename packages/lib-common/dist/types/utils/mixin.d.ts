/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export declare type Arguments<T> = [T] extends [(...args: infer U) => any] ? U : [T] extends [void] ? [] : [T];
export declare type SingleArgument<T> = [T] extends [(arg: infer U) => any] ? U : [T] extends [void] ? [] : [T];
export interface ClassType<T> {
    new (...args: any[]): T;
}
export declare function applyMixins<T>(derivedCtor: ClassType<T>, constructors: any[]): ClassType<T>;
