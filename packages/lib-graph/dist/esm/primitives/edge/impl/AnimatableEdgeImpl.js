import { edgeTypedOffset } from '../layout';
import { EdgeImpl } from './EdgeImpl';
import { MemoryReaderInspector } from '@graspologic/memstore'; // Cache several frequently accessed names / offsets

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

class AnimatableEdgeImplInternal extends EdgeImpl {
  /**
   * @inheritDoc
   * @see {@link AnimatableEdge.animateSourcePosition}
   */
  animateSourcePosition(position, duration) {
    var _this$store;

    // Set the start to the old position
    inspector.copyFloat32Vec3Offset(this, sourcePositionTypedOffset, sourcePositionStartTypedOffset);
    this.handleAttributeUpdated(sourcePositionStartAttr); // Update the tween

    inspector.writeFloat32Vec2Offset(this, sourcePositionTweenTypedOffset, duration || 0, ((_this$store = this.store) === null || _this$store === void 0 ? void 0 : _this$store.engineTime) || 0);
    this.handleAttributeUpdated(sourcePositionTweenAttr); // Update the end sourcePosition

    inspector.writeFloat32Vec3Offset(this, sourcePositionTypedOffset, position[0] || 0, position[1] || 0, position[2] || 0);
    this.handleAttributeUpdated(sourcePositionAttr);
  }
  /**
   * @inheritDoc
   * @see {@link AnimatableEdge.animateTargetPosition}
   */


  animateTargetPosition(position, duration) {
    var _this$store2;

    // Set the start to the old position
    inspector.copyFloat32Vec3Offset(this, targetPositionTypedOffset, targetPositionStartTypedOffset);
    this.handleAttributeUpdated(targetPositionStartAttr); // Update the tween

    inspector.writeFloat32Vec2Offset(this, targetPositionTweenTypedOffset, duration || 0, ((_this$store2 = this.store) === null || _this$store2 === void 0 ? void 0 : _this$store2.engineTime) || 0);
    this.handleAttributeUpdated(targetPositionTweenAttr); // Update the end targetPosition

    inspector.writeFloat32Vec3Offset(this, targetPositionTypedOffset, position[0] || 0, position[1] || 0, position[2] || 0);
    this.handleAttributeUpdated(targetPositionAttr);
  }
  /**
   * @inheritDoc
   * @see {@link Edge.load}
   */


  load(data, nodeIndexMap, defaultEdgeWeight = 1) {
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


export const AnimatableEdgeImpl = AnimatableEdgeImplInternal;