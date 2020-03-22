import ViewGroup = require("../viewgroup");
/**
 * @class UI.FlexLayout
 * @since 0.1
 * @extends UI.ViewGroup
 *
 * FlexLayout is a viewgroup which has same behaviour of Flexbox on CSS.
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes
 * Its purpose is to provide a easy way to scale, align and distribute space among items in a container,
 * even when their size is unknown and/or dynamic. FlexLayout has the ability to alter its item's width/height to
 * fill the available space.
 *
 *     @example
 *     const FlexLayout = require('sf-core/ui/flexlayout');
 *     var myFlexLayout = new FlexLayout({
 *         flexGrow:1
 *     });
 *
 *     const Label = require('sf-core/ui/label');
 *     const Color = require('sf-core/ui/color');
 *     var myLabel1 = new Label({
 *         width: 100,
 *         height: 50,
 *         text: "First label",
 *         backgroundColor: Color.RED
 *     });
 *     myFlexLayout.addChild(myLabel1);
 *     var myLabel2 = new Label({
 *         width: 100,
 *         height: 50,
 *         text: "Second label",
 *         backgroundColor: Color.CYAN
 *     });
 *     myFlexLayout.addChild(myLabel2);
 *
 *     page.layout.addChild(myFlexLayout);
 *
 */
declare class FlexLayout extends ViewGroup {
    constructor(params?: any);
/**
 * This property specifies where items will start to be positioned.
 * If you set RTL(right to left) objects will be positioned by starting from right edge of the FlexLayout.
 * If you set LTR(left to right) objects will be positioned by starting from left edge of the FlexLayout.
 *
 *     @example
 *     const FlexLayout = require('sf-core/ui/flexlayout');
 *     var myFlexLayout = new FlexLayout({
 *         flexGrow : 1
 *         direction: FlexLayout.Direction.RTL
 *     });
 *
 * @property {UI.FlexLayout.Direction} [direction = UI.FlexLayout.Direction.INHERIT]
 * @since 0.1
 */
    direction: FlexLayout.Direction;
/**
 * This property specifies how children will be placed(horizontally or vertical) in FlexLayout.
 * It defines the main axis.
 * It works like flex-direction on CSS.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction
 *
 *
 * @property {UI.FlexLayout.FlexDirection} [flexDirection = UI.FlexLayout.FlexDirection.ROW]
 * @android
 * @ios
 * @since 0.1
 */
    flexDirection: FlexLayout.FlexDirection;
/**
 * This property specifies the distribution of children along the main-axis.
 * It works like justify-content on CSS.
 * See:  https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
 *
 * @property {UI.FlexLayout.JustifyContent} [justifyContent = UI.FlexLayout.JustifyContent.FLEX_START]
 * @since 0.1
 */
    justifyContent: FlexLayout.JustifyContent;
/**
 * This property aligns FlexLayout rows when there is space available in the cross-axis,
 * similar to how justify-content aligns individual child within the main-axis.
 * This property has no effect when there is only one row of children.
 *
 *
 * @property {UI.FlexLayout.AlignContent} [alignContent = UI.FlexLayout.AlignContent.STRETCH]
 * @android
 * @ios
 * @since 0.1
 */ 
    alignContent: FlexLayout.AlignContent;
/**
 * This property aligns children along the cross-axis of their container.
 * If UI.FlexLayout.FlexDirection is row, this property controls the alignment in vertical direction.
 * It works like align-items on CSS.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
 *
 * @property {UI.FlexLayout.AlignItems} [alignItems = UI.FlexLayout.AlignItems.STRETCH]
 * @android
 * @ios
 * @since 0.1
 */
    alignItems: FlexLayout.AlignItems;
/**
 * This property specifies whether children of FlexLayout are forced into a single row
 * or can be wrapped onto other rows
 * It works like flex-wrap on CSS.
 * See:  https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap
 *
 *
 * @property {UI.FlexLayout.FlexWrap} [flexWrap = UI.FlexLayout.FlexWrap.NO_WRAP]
 * @android
 * @ios
 * @since 0.1
 */
    flexWrap: FlexLayout.FlexWrap;
/**
 * This functions recalculates the positioning parameters.
 * It is useful to call this method when you want to change layout parameters on runtime.
 * If you change view's position, you should call applyLayout from the Page.layout. You shouldn't call applyLayout from its parent or itself
 *
 * @method applyLayout
 * @android
 * @ios
 */
	applyLayout(): void;
}
declare namespace FlexLayout {
/**
 * @enum {Number} UI.FlexLayout.Direction
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 *
 */
	enum Direction {
/**
 * @property {Number} INHERIT
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
        INHERIT = 0,
/**
 * @property {Number} LTR
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
        LTR = 1,
/**
 * @property {Number} RTL
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
		RTL = 2
    }
/**
 * @enum {Number} UI.FlexLayout.FlexDirection
 * @static
 * @readonly
 * @since 0.1
 *
 */
	enum FlexDirection {
/**
 * @property {Number} COLUMN
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
        COLUMN = 0,
/**
 * @property {Number} COLUMN_REVERSE
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
        COLUMN_REVERSE = 1,
/**
 * @property {Number} ROW
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
        ROW = 2,
/**
 * @property {Number} ROW_REVERSE
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
		ROW_REVERSE = 3
    }
/**
 * @enum {Number} UI.FlexLayout.JustifyContent
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 *
 * // @todo add description.
 *
 *
 */
	enum JustifyContent {
/**
 * @property {Number} FLEX_START
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
        FLEX_START = 0,
/**
 * @property {Number} CENTER
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
        CENTER = 1,
/**
 * @property {Number} FLEX_END
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
        FLEX_END = 2,
/**
 * @property {Number} SPACE_BETWEEN
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
        SPACE_BETWEEN = 3,
/**
 * @property {Number} SPACE_AROUND
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
		SPACE_AROUND = 4
    }
/**
 * @enum {Number} UI.FlexLayout.AlignContent
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 *
 * // @todo add description.
 *
 *     @example
 *     // @todo add example
 *
 */
	enum AlignContent {
/**
 * @property {Number} AUTO
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
        AUTO = 0,
/**
 * @property {Number} FLEX_START
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
        FLEX_START = 1,
/**
 * @property {Number} CENTER
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
        CENTER = 2,
/**
 * @property {Number} FLEX_END
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
        FLEX_END = 3,
/**
 * @property {Number} STRETCH
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
		STRETCH = 4
    }
/**
 * @enum {Number} UI.FlexLayout.FlexWrap
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 *
 */
	enum FlexWrap {
/**
 * @property {Number} NOWRAP
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
        NOWRAP = 0,
/**
 * @property {Number} WRAP
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
		WRAP = 1
    }
/**
 * @enum {Number} UI.FlexLayout.AlignItems
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 *
 * // @todo add description.
 *
 *     @example
 *     // @todo add example
 *
 */
	enum AlignItems {
/**
 * @property {Number} AUTO
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
        AUTO = 0,
/**
 * @property {Number} FLEX_START
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
        FLEX_START = 1,
/**
 * @property {Number} CENTER
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
        CENTER = 2,
/**
 * @property {Number} FLEX_END
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
        FLEX_END = 3,
/**
 * @property {Number} STRETCH
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
		STRETCH = 4
    }
/**
 * @enum {Number} UI.FlexLayout.AlignSelf
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 *
 */
	enum AlignSelf {
/**
 * @property {Number} AUTO
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
        AUTO = 0,
/**
 * @property {Number} FLEX_START
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
        FLEX_START = 1,
/**
 * @property {Number} CENTER
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
        CENTER = 2,
/**
 * @property {Number} FLEX_END
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
        FLEX_END = 3,
/**
 * @property {Number} STRETCH
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
		STRETCH = 4
    }
/**
 * @enum UI.FlexLayout.PositionType
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 *
 */
	enum PositionType {
/**
 * @property RELATIVE
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
        RELATIVE = 0,
/**
 * @property ABSOLUTE
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
		ABSOLUTE = 1
	}
}
export = FlexLayout;