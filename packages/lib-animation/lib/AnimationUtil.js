import { MemoryReaderInspector, } from '@graspologic/memstore';
/**
 * Provides an implementation of AnimationUtil
 */
class AnimationUtilImpl extends MemoryReaderInspector {
    engineTime;
    /**
     * Constructor for the AnimationUtilImpl
     * @param engineTime callback which returns the current engine time
     */
    constructor(engineTime) {
        super();
        this.engineTime = engineTime;
    }
    /**
     * @inheritdoc
     * @see {@link AnimationUtil.animatePoint}
     */
    animatePoint(item, attribute, point, duration = 0) {
        const startAttr = `${attribute}.start`;
        if (duration > 0) {
            const tweenAttr = `${attribute}.tween`;
            if (process.env.NODE_ENV !== 'production') {
                if (!item.layout.has(startAttr) || !item.layout.has(tweenAttr)) {
                    throw new Error('Attribute does not support animation');
                }
            }
            const time = this.engineTime ? this.engineTime() : 0;
            const oldPoint = this.readFloat32Vec3Attr(item, attribute);
            this.writeFloat32Vec3Attr(item, startAttr, oldPoint[0], oldPoint[1], oldPoint[2]);
            this.writeFloat32Vec2Attr(item, tweenAttr, duration, time);
            item.store?.notify(item.storeId, tweenAttr);
        }
        else if (item.layout.has(startAttr)) {
            this.writeFloat32Vec3Attr(item, startAttr, point[0], point[1], point[2] || 0);
            item.store?.notify(item.storeId, startAttr);
        }
        this.writeFloat32Vec3Attr(item, attribute, point[0], point[1], point[2] || 0);
        item.store?.notify(item.storeId, attribute);
    }
    /**
     * @inheritdoc
     * @see {@link AnimationUtil.animateColor}
     */
    animateColor(item, attribute, color, duration = 0) {
        const startAttr = attribute + '.start';
        if (duration > 0 && this.engineTime) {
            const tweenAttr = attribute + '.tween';
            if (process.env.NODE_ENV !== 'production') {
                if (!item.layout.has(startAttr) || !item.layout.has(tweenAttr)) {
                    throw new Error('Attribute does not support animation');
                }
            }
            const oldColor = this.readUint32Attr(item, attribute);
            this.writeUint32Attr(item, startAttr, oldColor);
            this.writeFloat32Vec2Attr(item, tweenAttr, duration, this.engineTime());
            item.store?.notify(item.storeId, startAttr);
            item.store?.notify(item.storeId, tweenAttr);
        }
        else if (item.layout.has(startAttr)) {
            item.store?.notify(item.storeId, startAttr);
            this.writeUint32Attr(item, startAttr, color);
        }
        this.writeUint32Attr(item, attribute, color);
        item.store?.notify(item.storeId, attribute);
    }
}
/**
 * Creates a set of animation utilities
 * @param engineTime The engine time
 */
export function createAnimationUtil(engineTime) {
    return new AnimationUtilImpl(engineTime);
}
