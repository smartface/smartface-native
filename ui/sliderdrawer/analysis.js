const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');
/**
 * @class UI.SliderDrawer
 * @since 0.1
 * @extends UI.ViewGroup
 *
 * SliderDrawer is an object that displays a custom UI as a panel on the left or right edge of the screen.
 * It is hidden most of the time, when user swipes a finger from the left or right edge of the screen it will appear.
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
         *     const Pages = require('nf-core/ui/pages');
         *     var myPage = new Page();
         *     var myPages = new Pages({
         *         rootPage: myPage
         *     });
         *     var mySliderDrawer = new SliderDrawer();
         *     mySliderDrawer.drawerPosition = SliderDrawer.Position.LEFT;
         *     myPages.sliderDrawer = mySliderDrawer;
         *
         * @property {UI.SliderDrawer.Position} [drawerPosition = UI.SliderDrawer.Position.LEFT]
         * @android
         * @ios
         * @since 0.1
         */
        this.drawerPosition = UI.SliderDrawer.Position.LEFT;

        /**
         * Gets/sets layout of the SliderDrawer.
         *
         *     @example
         *     const SliderDrawer = require('nf-core/ui/sliderdrawer');
         *     const Button = require('nf-core/ui/button');
         *     const Pages = require('nf-core/ui/pages');
         *     var myPage = new Page();
         *     var myPages = new Pages({
         *         rootPage: myPage
         *     });
         *     var mySliderDrawer = new SliderDrawer({
         *         onLoad: function(){
         *            mySliderDrawer.layout.addChild(myButton);
         *         }
         *     });
         *     var myButton = new Button({
         *         height: 40,
         *         width: 50,
         *         left: 50,
         *         text: "Smartface Button"
         *     });
         *     mySliderDrawer.drawerPosition = SliderDrawer.Position.LEFT;
         *     myPages.sliderDrawer = mySliderDrawer;
         *
         * @property {UI.FlexLayout} [layout = null]
         * @android
         * @ios
         * @readonly
         * @since 0.1
         */
        this.layout = null;

        /**
         * Enables/disables the SliderDrawer.
         *
         *     @example
         *     const SliderDrawer = require('nf-core/ui/sliderdrawer');
         *     const Pages = require('nf-core/ui/pages');
         *     var myPage = new Page();
         *     var myPages = new Pages({
         *         rootPage: myPage
         *     });
         *     var mySliderDrawer = new SliderDrawer();
         *     mySliderDrawer.drawerPosition = SliderDrawer.Position.LEFT;
         *     mySliderDrawer.enabled = false;
         *     myPages.sliderDrawer = mySliderDrawer;
         *
         * @property {Boolean} [enabled = true]
         * @android
         * @ios
         * @since 0.1
         */
        this.enabled = true;

        /**
         * This function allows you to show SliderDrawer on the screen.
         *
         * @method show
         * @android
         * @ios
         * @since 0.1
         */
        this.show = function(){};

        /**
         * This function allows you to hide SliderDrawer if it is on the screen.
         *
         * @method hide
         * @android
         * @ios
         * @since 0.1
         */
        this.hide = function(){};

        /**
         * This event is called user opens the SliderDrawer.
         *
         * @event onShow
         * @android
         * @ios
         * @since 0.1
         */
        this.onShow = null;

        /**
         * This event is called when user closes the SliderDrawer.
         *
         * @event onHide
         * @android
         * @ios
         * @since 0.1
         */
        this.onHide = null;

        /**
         * This event is called when SliderDrawer begins to load.
         *
         * @event onLoad
         * @android
         * @ios
         * @since 0.1
         */
        this.onLoad = null;
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
 * @android
 * @ios
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
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(SliderDrawer.Position, 'RIGHT', {
    value: 1,
    writable: false
});

module.exports = SliderDrawer;
