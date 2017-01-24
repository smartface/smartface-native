const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');
/**
 * @class UI.FlexLayout
 * @since 0.1
 * @extends UI.ViewGroup
 * 
 * // @todo add description.
 * 
 *     @example
 *     // @todo add example
 * 
 * 
 */
const FlexLayout = extend(ViewGroup)(
    function (_super, params) {
        _super(this);


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
         * @property {UI.FlexLayout.AlignItems} [alignContent = UI.FlexLayout.AlignItems.STRETCH]   
         * @since 0.1
         */
        this.alignItems = UI.FlexLayout.AlignItems.STRETCH;
        
        /**
         * // @todo add description.
         * 
         *     @example
         *     // @todo add example
         *
         * @property {UI.FlexLayout.FlexWrap} [justifyContent = UI.FlexLayout.FlexWrap.NO_WRAP]   
         * @since 0.1
         */
        this.flexWrap = UI.FlexLayout.FlexWrap.NO_WRAP;
        
            
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
 * @property {Number} ROW
 * // @todo add description.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.FlexDirection, 'ROW', {
    value: 0,
    writable: false
});
/**
 * @property {Number} ROW_REVERSE
 * // @todo add description.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.FlexDirection, 'ROW_REVERSE', {
    value: 1,
    writable: false
});
/**
 * @property {Number} COLUMN
 * // @todo add description.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.FlexDirection, 'COLUMN', {
    value: 2,
    writable: false
});
/**
 * @property {Number} COLUMN_REVERSE
 * // @todo add description.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.FlexDirection, 'COLUMN_REVERSE', {
    value: 3,
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
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.JustifyContent, 'FLEX_START', {
    value: 0,
    writable: false
});
/**
 * @property {Number} FLEX_END
 * // @todo add description.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.JustifyContent, 'FLEX_END', {
    value: 1,
    writable: false
});
/**
 * @property {Number} CENTER
 * // @todo add description.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.JustifyContent, 'CENTER', {
    value: 2,
    writable: false
});
/**
 * @property {Number} SPACE_BETWEEN
 * // @todo add description.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.JustifyContent, 'SPACE_BETWEEN', {
    value: 3,
    writable: false
});
/**
 * @property {Number} SPACE_AROUND
 * // @todo add description.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.JustifyContent, 'SPACE_AROUND', {
    value: 4,
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
 * @property {Number} FLEX_START
 * // @todo add description.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignContent, 'FLEX_START', {
    value: 0,
    writable: false
});
/**
 * @property {Number} FLEX_END
 * // @todo add description.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignContent, 'FLEX_END', {
    value: 1,
    writable: false
});
/**
 * @property {Number} CENTER
 * // @todo add description.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignContent, 'CENTER', {
    value: 2,
    writable: false
});
/**
 * @property {Number} STRETCH
 * // @todo add description.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignContent, 'STRETCH', {
    value: 3,
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
 * @property {Number} FLEX_START
 * // @todo add description.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignItems, 'FLEX_START', {
    value: 0,
    writable: false
});
/**
 * @property {Number} FLEX_END
 * // @todo add description.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignItems, 'FLEX_END', {
    value: 1,
    writable: false
});
/**
 * @property {Number} CENTER
 * // @todo add description.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignItems, 'CENTER', {
    value: 2,
    writable: false
});
/**
 * @property {Number} BASELINE
 * // @todo add description.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignItems, 'BASELINE', {
    value: 3,
    writable: false
});
/**
 * @property {Number} STRETCH
 * // @todo add description.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.AlignItems, 'STRETCH', {
    value: 4,
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
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.FlexWrap, 'NOWRAP', {
    value: 0,
    writable: false
});
/**
 * @property {Number} WRAP
 * // @todo add description.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.FlexWrap, 'WRAP', {
    value: 1,
    writable: false
});


module.exports = FlexLayout;