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
 * 
 *     @example
 *     const SliderDrawer = require('sf-core/ui/sliderdrawer');
 *     const FlexLayout = require('sf-core/ui/flexlayout');
 *     const Button = require('sf-core/ui/button');
 *     const Router = require('sf-core/ui/router');
 *    
 *     var mySliderDrawer = new SliderDrawer({
 *         width: 200
 *     });
 *     var myButton = new Button({
 *         height: 40,
 *         width: 100,
 *         left: 50,
 *         top: 50,
 *         text: "Smartface Button",
 *         positionType: FlexLayout.PositionType.ABSOLUTE
 *     });
 *     mySliderDrawer.drawerPosition = SliderDrawer.Position.LEFT;
 *     mySliderDrawer.layout.addChild(myButton);
 *     Router.sliderDrawer = mySliderDrawer;
 *
 */
function SliderDrawer(params) {
    /**
     * Gets/sets position of the SliderDrawer.
     *
     * @property {UI.SliderDrawer.Position} [drawerPosition = UI.SliderDrawer.Position.LEFT]
     * @android
     * @ios
     * @since 0.1
     */
    this.drawerPosition = UI.SliderDrawer.Position.LEFT;

    /**
     * Gets/sets state of the SliderDrawer.
     *
     * @property {UI.SliderDrawer.State} state
     * @android
     * @ios
     * @readonly
     * @since 1.1.8
     */
    this.state;

    /**
     * Gets/sets layout of the SliderDrawer.
     *
     * @property {UI.FlexLayout} [layout = UI.FlexLayout]
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    this.layout = UI.FlexLayout;

    /**
     * Enables/disables the SliderDrawer.
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
SliderDrawer.Position.LEFT = 0;

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
SliderDrawer.Position.RIGHT = 1;

/**
 * @enum {Number} UI.SliderDrawer.State
 * @static
 * @readonly
 * @since 1.1.8
 *
 * Define the state of SliderDrawer.
 *
 */
SliderDrawer.State = {};

/**
 * @property {Number} OPEN
 *
 * Indicates the slider drawer is open.
 *
 * @static
 * @android
 * @ios
 * @readonly
 * @since 1.1.8
 */
SliderDrawer.State.OPEN = 0;

/**
 * @property {Number} CLOSED
 *
 * Indicates the slider drawer is closed.
 *
 * @static
 * @android
 * @ios
 * @readonly
 * @since 1.1.8
 */
SliderDrawer.State.CLOSED = 1;

/**
 * @property {Number} DRAGGED
 *
 * Indicates the slider drawer is dragged.
 *
 * @static
 * @android
 * @ios
 * @readonly
 * @since 1.1.8
 */
SliderDrawer.State.DRAGGED = 2;

module.exports = SliderDrawer;
