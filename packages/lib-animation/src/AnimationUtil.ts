/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	AttributeName,
	MemoryReader,
	MemoryReaderInspector,
} from '@graspologic/memstore'
import { AnimationUtil } from './types'

/**
 * Provides an implementation of AnimationUtil
 */
class AnimationUtilImpl extends MemoryReaderInspector implements AnimationUtil {
	/**
	 * Constructor for the AnimationUtilImpl
	 * @param engineTime callback which returns the current engine time
	 */
	public constructor(public engineTime?: () => number) {
		super()
	}

	/**
	 * @inheritdoc
	 * @see {@link AnimationUtil.animatePoint}
	 */
	public animatePoint(
		item: MemoryReader,
		attribute: AttributeName,
		point: [number, number, number] | [number, number],
		duration = 0,
	): void {
		const startAttr = `${attribute}.start`
		if (duration > 0) {
			const tweenAttr = `${attribute}.tween`
			if (process.env.NODE_ENV !== 'production') {
				if (!item.layout.has(startAttr) || !item.layout.has(tweenAttr)) {
					throw new Error('Attribute does not support animation')
				}
			}
			const time = this.engineTime ? this.engineTime() : 0
			const oldPoint = this.readFloat32Vec3Attr(item, attribute)
			this.writeFloat32Vec3Attr(
				item,
				startAttr,
				oldPoint[0],
				oldPoint[1],
				oldPoint[2],
			)
			this.writeFloat32Vec2Attr(item, tweenAttr, duration, time)
			item.store?.notify(item.storeId, tweenAttr)
		} else if (item.layout.has(startAttr)) {
			this.writeFloat32Vec3Attr(
				item,
				startAttr,
				point[0],
				point[1],
				point[2] || 0,
			)
			item.store?.notify(item.storeId, startAttr)
		}
		this.writeFloat32Vec3Attr(
			item,
			attribute,
			point[0],
			point[1],
			point[2] || 0,
		)
		item.store?.notify(item.storeId, attribute)
	}

	/**
	 * @inheritdoc
	 * @see {@link AnimationUtil.animateColor}
	 */
	public animateColor(
		item: MemoryReader,
		attribute: AttributeName,
		color: number,
		duration = 0,
	): void {
		const startAttr = attribute + '.start'
		if (duration > 0 && this.engineTime) {
			const tweenAttr = attribute + '.tween'
			if (process.env.NODE_ENV !== 'production') {
				if (!item.layout.has(startAttr) || !item.layout.has(tweenAttr)) {
					throw new Error('Attribute does not support animation')
				}
			}
			const oldColor = this.readUint32Attr(item, attribute)
			this.writeUint32Attr(item, startAttr, oldColor)
			this.writeFloat32Vec2Attr(item, tweenAttr, duration, this.engineTime())
			item.store?.notify(item.storeId, startAttr)
			item.store?.notify(item.storeId, tweenAttr)
		} else if (item.layout.has(startAttr)) {
			item.store?.notify(item.storeId, startAttr)
			this.writeUint32Attr(item, startAttr, color)
		}
		this.writeUint32Attr(item, attribute, color)
		item.store?.notify(item.storeId, attribute)
	}
}

/**
 * Creates a set of animation utilities
 * @param engineTime The engine time
 */
export function createAnimationUtil(engineTime?: () => number): AnimationUtil {
	return new AnimationUtilImpl(engineTime)
}
