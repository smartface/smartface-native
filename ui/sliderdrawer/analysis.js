const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');
/**
 * @class UI.SliderDrawer
 * @since 0.1
 * @extends UI.ViewGroup
 * 
 * The navigation drawer is a layout object that displays the app’s main navigation options as a panel on the left or right edge of the screen. 
 * It is hidden most of the time, when the user swipes a finger from the left or right edge of the screen it will appear.
 * 
 */
const SliderDrawer = extend(ViewGroup)(
    function (_super, params) {
        _super(this);
        
        /**
         * Gets/sets position of the SliderDrawer.
         *
         *     @example
         *     const SliderDrawer = require('nf-core/ui/sliderdrawer');
         *     const Page = require('nf-core/ui/page');
         *     var myPage = new Page();
         *     var mySliderDrawer = new SliderDrawer();
         *     mySliderDrawer.drawerPosition = SliderDrawer.Position.LEFT;
         *     myPage.sliderDrawer = mySliderDrawer;
         *
         * @property {UI.SliderDrawer.Position} [drawerPosition = UI.SliderDrawer.Position.LEFT]
         * @since 0.1
         */
        this.drawerPosition = UI.SliderDrawer.Position.LEFT
        
        /**
         * This function allows you to show SliderDrawer on it's own position if it assigned to the Page.
         * 
         * @method show
         * @since 0.1
         */
        this.show = function(){};
        
        /**
         * This function allows you to hide SliderDrawer if it assigned to the Page.
         * 
         * @method hide
         * @since 0.1
         */
        this.hide = function(){};
        
        /**
         * Gets/sets callback for show event. This callback will fire when show
         * called or user opens the SliderDrawer.
         *
         * @event onShow
         * @since 0.1
         */
        this.onShow = null;
        
        /**
         * Gets/sets callback for hide event. This callback will fire when hide
         * called or user closes the SliderDrawer.
         *
         * @event onHide
         * @since 0.1
         */
        this.onHide = null;
    }
);

/**
 * @enum {Number} UI.SliderDrawer.Position
 * @static
 * @readonly
 * @since 0.1
 *
 * Define the position of SliderDrawer left or right.
 *
 */
SliderDrawer.Position = {};

/**
 * @property {Number} LEFT
 * 
 * Position the SliderDrawer to left.  
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(SliderDrawer.Position, 'LEFT', {
    value: 0,
    writable: false
});

/**
 * @property {Number} RIGHT
 *
 * Position the SliderDrawer to right.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(SliderDrawer.Position, 'RIGHT', {
    value: 1,
    writable: false
});

module.exports = SliderDrawer;