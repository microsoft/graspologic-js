import { RenderOptions } from '@graspologic/common';
import { DirtyableRenderable } from '@graspologic/renderables-base';
/**
 * A renderable that can be added to a GraphRenderer for rendering labels
 */
export declare class LabelRenderable extends DirtyableRenderable {
    private renderTextureHandler;
    private _text;
    private _font;
    private _fontSize;
    private _weight;
    private _horizontalPadding;
    private _verticalPadding;
    private _outline;
    private _backgroundColor;
    private _outlineColor;
    private _textColor;
    private model;
    private canvas;
    private ctx;
    private texture;
    private position01;
    /**
     * Constructor
     * @param gl The gl context to render to
     * @param id The id for the renderable
     */
    constructor(gl: WebGLRenderingContext, id?: any);
    /**
     * Gets the label to display
     */
    get text(): string;
    /**
     * Sets the label to display
     */
    set text(value: string);
    /**
     * Sets the font
     */
    get font(): string;
    /**
     * Gets the font
     */
    set font(value: string);
    /**
     * Gets the font size
     */
    get fontSize(): number;
    /**
     * Sets the font size
     */
    set fontSize(value: number);
    /**
     * Gets the horizontal padding
     */
    get horizontalPadding(): number;
    /**
     * Sets the horizontal padding
     */
    set horizontalPadding(value: number);
    /**
     * Gets the vertical padding
     */
    get verticalPadding(): number;
    /**
     * Sets the vertical padding
     */
    set verticalPadding(value: number);
    /**
     * Gets the outline width
     */
    get outlineWidth(): number;
    /**
     * Sets the outline width
     */
    set outlineWidth(value: number);
    /**
     * Gets the outline color
     */
    get outlineColor(): string;
    /**
     * Sets the outline color
     */
    set outlineColor(value: string);
    /**
     * Gets the background color
     */
    get backgroundColor(): string;
    /**
     * Sets the background color
     */
    set backgroundColor(value: string);
    /**
     * Gets the text color
     */
    get textColor(): string;
    /**
     * Sets the text color
     */
    set textColor(value: string);
    /**
     * Gets the weight
     */
    get weight(): number;
    /**
     * Sets the weight
     */
    set weight(value: number);
    /**
     * Draws the LabelRenderable
     * @param options The render options
     */
    draw(options: RenderOptions): void;
    /**
     * Sets the position of the label
     * @param position01 The position of the label
     */
    setPositions(position01: number[]): void;
    /**
     * Gets the set of shaders used for the label renderable
     */
    private _getShaders;
    /**
     * Creates a model that represents a label
     * @param gl The gl context
     * @param id The id of the model
     */
    private _createModel;
    /**
     * Renders the label to a texture
     */
    private _renderTexture;
    /**
     * Draws a rounded rect to the current ctx
     * @param x The x location of the rectangle
     * @param y The y location of the rectangle
     * @param width The width of the rectangle
     * @param height The height of the rectangle
     * @param radius The radius of the corners
     * @param fill The fill of the rectangle
     * @param stroke The stroke of the rectangle
     */
    private _roundRect;
}
