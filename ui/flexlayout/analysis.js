const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');
/**
 * @class UI.FlexLayout
 * @since 0.1
 * @extends UI.ViewGroup
 * 
 * FlexLayout is a layout type which has behaviour like CSS Flexbox 
 * on web. You can add views to FlexLayout and it ensures objects will
 * be located same on all devices.
 * 
 *     @example
 *     const FlexLayout = require('nf-core/ui/flexlayout');
 *     var myFlexLayout = new FlexLayout({
 *         top: 0,
 *         bottom: 0,
 *         left: 0,
 *         right: 0
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
 *         text: "First label",
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
         * Gets/sets direction of FlexLayout. You can specify positioning direction of
         * FlexLayout with this property.
         * 
         *     @example
         *     const FlexLayout = require('nf-core/ui/flexlayout');
         *     var myFlexLayout = new FlexLayout({
         *         top: 0,
         *         bottom: 0,
         *         left: 0,
         *         right: 0,
         *         direction: FlexLayout.Direction.RTL
         *     });
         *
         * @property {UI.FlexLayout.Direction} [direction = UI.FlexLayout.Direction.INHERIT]   
         * @since 0.1
         */
        this.direction = UI.FlexLayout.Direction.INHERIT;
        
        /**
         * // @todo add description.
         * 
         *     @example
         *     // @todo add example
         *
         * @property {UI.FlexLayout.Position} [position = UI.FlexLayout.Position.RELATIVE]   
         * @since 0.1
         */
        this.position = UI.FlexLayout.Position.RELATIVE;

        /**
         * // @todo add description.
         * 
         *     @example
         *     // @todo add example
         *
         * @property {UI.FlexLayout.FlexDirection} [flexDirection = UI.FlexLayout.FlexDirection.ROW]   
         * @since 0.1
         */
        this.flexDirection = UI.FlexLayout.FlexDirection.ROW;
        
        /**
         * // @todo add description.
         * 
         *     @example
         *     // @todo add example
         *
         * @property {UI.FlexLayout.JustifyContent} [justifyContent = UI.FlexLayout.JustifyContent.FLEX_START]   
         * @since 0.1
         */
        this.justifyContent = UI.FlexLayout.JustifyContent.FLEX_START;
            
        /**
         * // @todo add description.
         * 
         *     @example
         *     // @todo add example
         *
         * @property {UI.FlexLayout.AlignContent} [alignContent = UI.FlexLayout.AlignContent.STRETCH]
         * @since 0.1
         */
        this.alignContent = UI.FlexLayout.AlignContent.STRETCH;
        
        /**
         * // @todo add description.
         * 
         *     @example
         *     // @todo add example
         *
         * @property {UI.FlexLayout.AlignItems} [alignItems = UI.FlexLayout.AlignItems.STRETCH]
         * @since 0.1
         */
        this.alignItems = UI.FlexLayout.AlignItems.STRETCH;
        
        /**
         * // @todo add description.
         * 
         *     @example
         *     // @todo add example
         *
         * @property {UI.FlexLayout.FlexWrap} [flexWrap = UI.FlexLayout.FlexWrap.NO_WRAP]
         * @since 0.1
         */
        this.flexWrap = UI.FlexLayout.FlexWrap.NO_WRAP;
        
        /**
         * // @todo add description.
         * 
         *     @example
         *     // @todo add example
         *
         * @property {UI.FlexLayout.Overflow} [overFlow = UI.FlexLayout.Overflow.VISIBLE]
         * @since 0.1
         */
        this.overFlow = UI.FlexLayout.Overflow.VISIBLE;
            
        /**
         * // @todo add description.
         *
         *     @example
         *     // @todo add example
         *
         * @method applyLayout
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
 * // @todo add description.
 *
 *     @example
 *     // @todo add example
 *
 */
FlexLayout.FlexDirection = {};
/**
 * @property {Number} COLUMN
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.FlexDirection, 'COLUMN', {
    writable: false
});
/**
 * @property {Number} COLUMN_REVERSE
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.FlexDirection, 'COLUMN_REVERSE', {
    writable: false
});
/**
 * @property {Number} ROW
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.FlexDirection, 'ROW', {
    writable: false
});
/**
 * @property {Number} ROW_REVERSE
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.FlexDirection, 'ROW_REVERSE', {
    writable: false
});

/**
 * @enum {Number} UI.FlexLayout.JustifyContent
 * @static
 * @readonly
 * @since 0.1
 *
 * // @todo add description.
 *
 *     @example
 *     // @todo add example
 *
 */
FlexLayout.JustifyContent = {};
/**
 * @property {Number} FLEX_START
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.JustifyContent, 'FLEX_START', {
    writable: false
});
/**
 * @property {Number} CENTER
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.JustifyContent, 'CENTER', {
    writable: false
});
/**
 * @property {Number} FLEX_END
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.JustifyContent, 'FLEX_END', {
    writable: false
});
/**
 * @property {Number} SPACE_BETWEEN
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.JustifyContent, 'SPACE_BETWEEN', {
    writable: false
});
/**
 * @property {Number} SPACE_AROUND
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.JustifyContent, 'SPACE_AROUND', {
    writable: false
});

/**
 * @enum {Number} UI.FlexLayout.AlignContent
 * @static
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
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignContent, 'AUTO', {
    writable: false
});
/**
 * @property {Number} FLEX_START
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignContent, 'FLEX_START', {
    writable: false
});
/**
 * @property {Number} CENTER
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignContent, 'CENTER', {
    writable: false
});
/**
 * @property {Number} FLEX_END
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignContent, 'FLEX_END', {
    writable: false
});
/**
 * @property {Number} STRETCH
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignContent, 'STRETCH', {
    writable: false
});

/**
 * @enum {Number} UI.FlexLayout.FlexWrap
 * @static
 * @readonly
 * @since 0.1
 *
 * // @todo add description.
 *
 *     @example
 *     // @todo add example
 *
 */
FlexLayout.FlexWrap = {};
/**
 * @property {Number} NOWRAP
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.FlexWrap, 'NOWRAP', {
    writable: false
});
/**
 * @property {Number} WRAP
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.FlexWrap, 'WRAP', {
    writable: false
});

/**
 * @enum {Number} UI.FlexLayout.AlignItems
 * @static
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
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignItems, 'AUTO', {
    writable: false
});
/**
 * @property {Number} FLEX_START
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignItems, 'FLEX_START', {
    writable: false
});
/**
 * @property {Number} CENTER
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignItems, 'CENTER', {
    writable: false
});
/**
 * @property {Number} FLEX_END
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignItems, 'FLEX_END', {
    writable: false
});
/**
 * @property {Number} STRETCH
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignContent, 'STRETCH', {
    writable: false
});

/**
 * @enum {Number} UI.FlexLayout.AlignSelf
 * @static
 * @readonly
 * @since 0.1
 *
 * // @todo add description.
 *
 *     @example
 *     // @todo add example
 *
 */
FlexLayout.AlignSelf = {};
/**
 * @property {Number} AUTO
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignSelf, 'AUTO', {
    writable: false
});
/**
 * @property {Number} FLEX_START
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignSelf, 'FLEX_START', {
    writable: false
});
/**
 * @property {Number} CENTER
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignSelf, 'CENTER', {
    writable: false
});
/**
 * @property {Number} FLEX_END
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignSelf, 'FLEX_END', {
    writable: false
});
/**
 * @property {Number} STRETCH
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignSelf, 'STRETCH', {
    writable: false
});

/**
 * @enum {Number} UI.FlexLayout.Direction
 * @static
 * @readonly
 * @since 0.1
 *
 * // @todo add description.
 *
 *     @example
 *     // @todo add example
 *
 */
FlexLayout.Direction = {};
/**
 * @property {Number} INHERIT
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.Direction, 'INHERIT', {
    writable: false
});
/**
 * @property {Number} LTR
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.Direction, 'LTR', {
    writable: false
});
/**
 * @property {Number} RTL
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.Direction, 'RTL', {
    writable: false
});

/**
 * @enum {Number} UI.FlexLayout.Overflow
 * @static
 * @readonly
 * @since 0.1
 *
 * // @todo add description.
 *
 *     @example
 *     // @todo add example
 *
 */
FlexLayout.Overflow = {};
/**
 * @property {Number} VISIBLE
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.Overflow, 'VISIBLE', {
    writable: false
});

/**
 * @property {Number} HIDDEN
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.Overflow, 'HIDDEN', {
    writable: false
});
/**
 * @property {Number} SCROLL
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.Overflow, 'SCROLL', {
    writable: false
});

/**
 * @enum {Number} UI.FlexLayout.Position
 * @static
 * @readonly
 * @since 0.1
 *
 * // @todo add description.
 *
 *     @example
 *     // @todo add example
 *
 */
FlexLayout.Position = {};
/**
 * @property {Number} RELATIVE
 * // @todo add description.
 * 
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.Position, 'RELATIVE', {
    writable: false
});
/**
 * @property {Number} ABSOLUTE
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.Position, 'ABSOLUTE', {
    writable: false
});

module.exports = FlexLayout;