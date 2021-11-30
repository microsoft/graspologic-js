// This is causing problems downstream for some reason
// @ts-ignore
import { cssToDevicePixels } from '@luma.gl/gltools';
import { readPixelsToArray } from '@luma.gl/webgl';
import createModel from './model';
import { EventsMixin, } from '@graspologic/common';
import { nodeType } from '@graspologic/graph';
import { createIdFactory, GL_DEPTH_TEST, encodePickingColor, decodePickingColor, GL_RGBA, GL_UNSIGNED_BYTE, } from '@graspologic/luma-utils';
import { DirtyableRenderable } from '@graspologic/renderables-base';
import nodeVS from '@graspologic/renderer-glsl/dist/esm/shaders/node.vs.glsl';
const getNextId = createIdFactory('NodesInstance');
const RENDERER_BACKGROUND_INDEX = 16777214;
// The base nodes renderable class
const NodesBase = EventsMixin(DirtyableRenderable);
/**
 * A renderable that can be added to the GraphRenderer which adds support for rendering nodes
 */
export class NodesRenderable extends NodesBase {
    gl;
    config;
    model;
    modelBuffer;
    translucentModel;
    translucentModelBuffer;
    needsDataBind = true;
    _data;
    pickingSelectedColor;
    /**
     * Constructor
     * @param gl The gl context the nodes should be rendered to
     * @param config The render configuration
     * @param id The id of the renderable
     */
    constructor(gl, config, id = getNextId()) {
        super();
        this.gl = gl;
        this.config = config;
        const { model, buffer } = createModel(gl, id, nodeVS);
        this.model = model;
        this.modelBuffer = buffer;
        const { model: translucentModel, buffer: translucentModelBuffer, } = createModel(gl, getNextId(), nodeVS, {
            ALPHA_MODE: 1,
        });
        this.translucentModel = translucentModel;
        this.translucentModelBuffer = translucentModelBuffer;
        config.onNodeMinRadiusChanged(this.makeDirtyHandler);
        config.onNodeMaxRadiusChanged(this.makeDirtyHandler);
        config.onNodeOutlineChanged(this.makeDirtyHandler);
        config.onDrawNodesChanged(this.makeDirtyHandler);
        config.onHideNodesOnMoveChanged(this.makeDirtyHandler);
    }
    /**
     * Gets the data type associated with this renderable
     */
    get itemType() {
        return nodeType;
    }
    /**
     * Gets the node data that should be rendered
     */
    get data() {
        return this._data;
    }
    /**
     * Sets the node data that should be rendered
     */
    set data(value) {
        // We attach this here, because in the onChange handler it is fired after the changes happen
        if (value !== this._data && value) {
            value.onAttributeUpdated(this.handleNodeAttributeUpdated);
            value.onAddItem(this.handleNodeAdded);
            value.onRemoveItem(this.handleNodeRemoved);
            let node;
            for (node of value.scan()) {
                this.handleNodeAdded(node);
            }
            this.bindDataToModel(true);
            this.setNeedsRedraw(true);
        }
        this._data = value;
    }
    /**
     * Runs the hovered logic to determine what node is being hovered over
     * @param param0
     */
    computeHovered({ framebuffer, _mousePosition }) {
        framebuffer.clear({ color: [0, 0, 0, 0], depth: true });
        // Render picking colors
        /* eslint-disable camelcase */
        this.model.setUniforms({ picking_uActive: 1 });
        this.model.draw({
            framebuffer,
            parameters: {
                depthMask: true,
                [GL_DEPTH_TEST]: true,
            },
        });
        this.model.setUniforms({ picking_uActive: 0 });
        const devicePixels = cssToDevicePixels(this.gl, _mousePosition);
        const deviceX = devicePixels.x + Math.floor(devicePixels.width / 2);
        const deviceY = devicePixels.y + Math.floor(devicePixels.height / 2);
        const pickingSelectedColor = readPixelsToArray(framebuffer, {
            sourceX: deviceX,
            sourceY: deviceY,
            sourceWidth: 1,
            sourceHeight: 1,
            sourceFormat: GL_RGBA,
            sourceType: GL_UNSIGNED_BYTE,
        });
        if (!this._comparePickingColors(pickingSelectedColor, this.pickingSelectedColor)) {
            if (pickingSelectedColor !== null) {
                this.pickingSelectedColor = pickingSelectedColor;
                const idx = decodePickingColor(this.pickingSelectedColor);
                this.emit('nodeHovered', idx !== RENDERER_BACKGROUND_INDEX && idx >= 0
                    ? this.data?.itemAt(idx)
                    : undefined);
            }
            else {
                this.pickingSelectedColor = undefined;
                this.emit('nodeHovered', undefined);
            }
        }
        return this.pickingSelectedColor;
    }
    updateEngineTime(engineTime) {
        this.data.engineTime = engineTime || 0;
    }
    /**
     * Draws the NodesRenderable
     * @param options The set of render options
     */
    draw(options) {
        const { modelViewMatrix, projectionMatrix, hideDeselected, framebuffer, canvasPixelSize, engineTime, weightToPixel, } = options;
        if (this.enabled) {
            this.bindDataToModel();
            // Keep looping redraws until tweening is done
            this.setNeedsRedraw(true);
            const drawConfig = {
                parameters: {
                    blend: true,
                    depthMask: true,
                    [GL_DEPTH_TEST]: true,
                },
                uniforms: {
                    uModelView: modelViewMatrix,
                    uProjection: projectionMatrix,
                    uScreenSize: canvasPixelSize,
                    uMinRadius: this.config.nodeMinRadius * weightToPixel,
                    uMaxRadius: this.config.nodeMaxRadius * weightToPixel,
                    uTime: engineTime,
                    uOutline: this.config.nodeOutline ? 1.0 : 0.0,
                },
                framebuffer,
            };
            this.model.draw(drawConfig);
            if (!hideDeselected &&
                this.config.nodeFilteredIds &&
                this.config.nodeFilteredIds.length > 0) {
                drawConfig.parameters.depthMask = false;
                this.translucentModel.draw(drawConfig);
            }
        }
    }
    /**
     * Computes the bounds of the nodes
     */
    computeBounds() {
        let bounds;
        let hasWeights = false;
        let node;
        let radius = 0;
        for (node of this._data.scan()) {
            radius = node.radius || 0;
            if (!radius) {
                hasWeights = true;
            }
            if (!bounds) {
                bounds = {
                    x: {
                        min: node.x - radius,
                        max: node.x + radius,
                    },
                    y: {
                        min: node.y - radius,
                        max: node.y + radius,
                    },
                    z: {
                        min: node.z - radius,
                        max: node.z + radius,
                    },
                };
            }
            else {
                bounds.x.min = Math.min(bounds.x.min, node.x - radius);
                bounds.x.max = Math.max(bounds.x.max, node.x + radius);
                bounds.y.min = Math.min(bounds.y.min, node.y - radius);
                bounds.y.max = Math.max(bounds.y.max, node.y + radius);
                bounds.z.min = Math.min(bounds.z.min, node.z - radius);
                bounds.z.max = Math.max(bounds.z.max, node.z + radius);
            }
        }
        const scale = hasWeights
            ? this.config.nodeMaxRadius /
                Math.min(this.config.width, this.config.height)
            : 0;
        if (bounds) {
            const xWeightPadding = ((bounds.x.max - bounds.x.min) * scale) / 2.0;
            const yWeightPadding = ((bounds.y.max - bounds.y.min) * scale) / 2.0;
            return {
                x: {
                    min: bounds.x.min - xWeightPadding,
                    max: bounds.x.max + xWeightPadding,
                },
                y: {
                    min: bounds.y.min - yWeightPadding,
                    max: bounds.y.max + yWeightPadding,
                },
                z: {
                    min: bounds.z.min - yWeightPadding,
                    max: bounds.z.max + yWeightPadding,
                },
            };
        }
    }
    /**
     * Binds the data in our databuffer to the model
     * @param force Force a reload of all the data
     */
    bindDataToModel(forceAll = false) {
        let updated = false;
        if (this.data) {
            updated = forceAll || this.needsDataBind;
            if (updated) {
                this.needsDataBind = false;
                const uint8 = this._data.store.uint8Array;
                this.modelBuffer.setData(uint8);
                this.translucentModelBuffer.setData(uint8);
                const instanceCount = this._data.store.count;
                this.model.setInstanceCount(instanceCount);
                this.translucentModel.setInstanceCount(instanceCount);
            }
        }
        return updated;
    }
    /**
     * Handler for when a node is added
     * @param primitive The primitive to add
     */
    handleNodeAdded = (nodeOrIndex) => {
        if (this.enabled) {
            const node = typeof nodeOrIndex === 'number'
                ? this.data.itemAt(nodeOrIndex)
                : nodeOrIndex;
            // Assign node defaults
            node.saturation = 1;
            node.visible = true;
            node.pickingColor = encodePickingColor(node.storeId);
            this.needsDataBind = true;
            this.setNeedsRedraw(true);
        }
    };
    /**
     * Removes a primitive from the scene
     * @param primitive The primitive to remove
     */
    handleNodeRemoved = (nodeOrIndex) => {
        if (this.enabled) {
            const node = typeof nodeOrIndex === 'number'
                ? this.data.itemAt(nodeOrIndex)
                : nodeOrIndex;
            // Hide the node
            node.visible = false;
            this.needsDataBind = true;
            this.setNeedsRedraw(true);
        }
    };
    /**
     * Handler for when an attribute for a node is updated
     */
    handleNodeAttributeUpdated = () => {
        if (this.enabled) {
            this.needsDataBind = true;
            this.setNeedsRedraw(true);
        }
    };
    /**
     * Compares two picking colors to see if they are equal
     * @param color1 The first picking color
     * @param color2 The second picking color
     */
    _comparePickingColors(color1, color2) {
        if (color1 && color2) {
            return (color1[0] === color2[0] &&
                color1[1] === color2[1] &&
                color1[2] === color2[2]);
        }
        return color1 === color2;
    }
}
