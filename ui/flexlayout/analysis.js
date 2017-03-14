const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');
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
 *     const FlexLayout = require('nf-core/ui/flexlayout');
 *     var myFlexLayout = new FlexLayout({
 *         flexGrow:1
 *     });
 *
 *     const Label = require('nf-core/ui/label');
 *     const Color = require('nf-core/ui/color');
 *     var myLabel1 = new UI.Label({
 *         width: 100,
 *         height: 50,
 *         text: "First label",
 *         backgroundColor: Color.RED
 *     });
 *     myFlexLayout.addChild(myLabel1);
 *     var myLabel2 = new UI.Label({
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
const FlexLayout = extend(ViewGroup)(
    function (_super, params) {
        _super(this);

        /**
         * This property specifies where items will start to be positioned.
         * If you set RTL(right to left) objects will be positioned by starting from right edge of the FlexLayout.
         * If you set LTR(left to right) objects will be positioned by starting from left edge of the FlexLayout.
         *
         *     @example
         *     const FlexLayout = require('nf-core/ui/flexlayout');
         *     var myFlexLayout = new FlexLayout({
         *         flexGrow : 1
         *         direction: FlexLayout.Direction.RTL
         *     });
         *
         * @property {UI.FlexLayout.Direction} [direction = UI.FlexLayout.Direction.INHERIT]
         * @since 0.1
         */
        this.direction = UI.FlexLayout.Direction.INHERIT;

        /**
         * This property specifies how children will be placed(horizontally or vertical) in FlexLayout.
         * It defines the main axis.
         * It works like flex-direction on CSS.
         * See:  https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction
         *
         *
         * @property {UI.FlexLayout.FlexDirection} [flexDirection = UI.FlexLayout.FlexDirection.ROW]
         * @android
         * @ios
         * @since 0.1
         */
        this.flexDirection = UI.FlexLayout.FlexDirection.ROW;

        /**
         * This property specifies the distribution of children along the main-axis.
         * It works like justify-content on CSS.
         * See:  https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
         *
         * @property {UI.FlexLayout.JustifyContent} [justifyContent = UI.FlexLayout.JustifyContent.FLEX_START]
         * @since 0.1
         */
        this.justifyContent = UI.FlexLayout.JustifyContent.FLEX_START;

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
        this.alignContent = UI.FlexLayout.AlignContent.STRETCH;

        /**
         * This property aligns children along the cross-axis of their container.
         * If UI.FlexLayout.FlexDirection is row, this property controls the alignment in vertical direction.
         * It works like align-items on CSS.
         * See:  https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
         *
         * @property {UI.FlexLayout.AlignItems} [alignItems = UI.FlexLayout.AlignItems.STRETCH]
         * @android
         * @ios
         * @since 0.1
         */
        this.alignItems = UI.FlexLayout.AlignItems.STRETCH;

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
        this.flexWrap = UI.FlexLayout.FlexWrap.NO_WRAP;

        /**
         * This property controls child views will be measured and displayed.
         * If set to scroll, child views will be measured independently of FlexLayout's main axis.
         * It works like overflow on CSS.
         * See:  https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
         *
         * @property {UI.FlexLayout.Overflow} [overFlow = UI.FlexLayout.Overflow.VISIBLE]
         * @android
         * @ios
         * @since 0.1
         */
        this.overFlow = UI.FlexLayout.Overflow.VISIBLE;

        /**
         * This functions recalculates the positioning parameters.
         * It is useful to call this method when you want to change layout parameters on runtime.
         *
         *
         * @method applyLayout
         * @android
         * @ios
         */
        this.applyLayout = function(){};

    }
);

/**
 * @enum {Number} UI.FlexLayout.FlexDirection
 * @static
 * @readonly
 * @since 0.1
 *
 */
FlexLayout.FlexDirection = {};
/**
 * @property {Number} COLUMN
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.FlexDirection, 'COLUMN', {
    writable: false
});
/**
 * @property {Number} COLUMN_REVERSE
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.FlexDirection, 'COLUMN_REVERSE', {
    writable: false
});
/**
 * @property {Number} ROW
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.FlexDirection, 'ROW', {
    writable: false
});
/**
 * @property {Number} ROW_REVERSE
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.FlexDirection, 'ROW_REVERSE', {
    writable: false
});

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
FlexLayout.JustifyContent = {};
/**
 * @property {Number} FLEX_START
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.JustifyContent, 'FLEX_START', {
    writable: false
});
/**
 * @property {Number} CENTER
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.JustifyContent, 'CENTER', {
    writable: false
});
/**
 * @property {Number} FLEX_END
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.JustifyContent, 'FLEX_END', {
    writable: false
});
/**
 * @property {Number} SPACE_BETWEEN
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.JustifyContent, 'SPACE_BETWEEN', {
    writable: false
});
/**
 * @property {Number} SPACE_AROUND
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.JustifyContent, 'SPACE_AROUND', {
    writable: false
});

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
FlexLayout.AlignContent = {};
/**
 * @property {Number} AUTO
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignContent, 'AUTO', {
    writable: false
});
/**
 * @property {Number} FLEX_START
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignContent, 'FLEX_START', {
    writable: false
});
/**
 * @property {Number} CENTER
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignContent, 'CENTER', {
    writable: false
});
/**
 * @property {Number} FLEX_END
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignContent, 'FLEX_END', {
    writable: false
});
/**
 * @property {Number} STRETCH
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignContent, 'STRETCH', {
    writable: false
});

/**
 * @enum {Number} UI.FlexLayout.FlexWrap
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 *
 */
FlexLayout.FlexWrap = {};
/**
 * @property {Number} NOWRAP
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.FlexWrap, 'NOWRAP', {
    writable: false
});
/**
 * @property {Number} WRAP
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.FlexWrap, 'WRAP', {
    writable: false
});

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
FlexLayout.AlignItems = {};
/**
 * @property {Number} AUTO
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignItems, 'AUTO', {
    writable: false
});
/**
 * @property {Number} FLEX_START
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignItems, 'FLEX_START', {
    writable: false
});
/**
 * @property {Number} CENTER
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignItems, 'CENTER', {
    writable: false
});
/**
 * @property {Number} FLEX_END
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignItems, 'FLEX_END', {
    writable: false
});
/**
 * @property {Number} STRETCH
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignContent, 'STRETCH', {
    writable: false
});

/**
 * @enum {Number} UI.FlexLayout.AlignSelf
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 *
 */
FlexLayout.AlignSelf = {};
/**
 * @property {Number} AUTO
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignSelf, 'AUTO', {
    writable: false
});
/**
 * @property {Number} FLEX_START
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignSelf, 'FLEX_START', {
    writable: false
});
/**
 * @property {Number} CENTER
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignSelf, 'CENTER', {
    writable: false
});
/**
 * @property {Number} FLEX_END
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignSelf, 'FLEX_END', {
    writable: false
});
/**
 * @property {Number} STRETCH
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignSelf, 'STRETCH', {
    writable: false
});

/**
 * @enum {Number} UI.FlexLayout.Direction
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 *
 */
FlexLayout.Direction = {};
/**
 * @property {Number} INHERIT
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.Direction, 'INHERIT', {
    writable: false
});
/**
 * @property {Number} LTR
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.Direction, 'LTR', {
    writable: false
});
/**
 * @property {Number} RTL
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.Direction, 'RTL', {
    writable: false
});

/**
 * @enum {Number} UI.FlexLayout.Overflow
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 *
 */
FlexLayout.Overflow = {};
/**
 * @property {Number} VISIBLE
 * // @todo add description.
 *
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.Overflow, 'VISIBLE', {
    writable: false
});

/**
 * @property {Number} HIDDEN
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.Overflow, 'HIDDEN', {
    writable: false
});
/**
 * @property {Number} SCROLL
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.Overflow, 'SCROLL', {
    writable: false
});

/**
 * @enum UI.FlexLayout.PositionType
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 *
 */
FlexLayout.PositionType = {};
/**
 * @property RELATIVE
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.PositionType, 'RELATIVE', {
    writable: false
});
/**
 * @property ABSOLUTE
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.PositionType, 'ABSOLUTE', {
    writable: false
});

module.exports = FlexLayout;
