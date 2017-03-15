/**
 * @class UI.Switch
 * @since 0.1
 * @extends UI.View
 *
 * Switch is a two-state toggle button. Switch allows the user
 * to select between two options.
 *
 *     @example
 *     const Switch = require('nf-core/ui/switch');
 *     const Color = require('nf-core/ui/color');
 *     var mySwitch = new Switch();
 *     mySwitch.thumbOnColor = Color.BLUE;
 */
const Switch = extend(View)(
    function (_super, params) {
        _super(this);

    /**
     * Gets/sets color of the thumb when Switch is ON.
     * It is set to green by default.
     *
     * @property {UI.Color} thumbOnColor
     * @android
     * @ios
     * @since 0.1
     */
    this.thumbOnColor = Color.GREEN;

    /**
     * Gets/sets color of the thumb when Switch is OFF.
     * It is set to gray by default.
     *
     * @property {UI.Color} thumbOffColor
     * @android
     * @ios
     * @since 0.1
     */
    this.thumbOffColor = Color.GRAY;

    /**
     * Gets/sets the background of the switch when it is ON.
     * It is set to gray by default.
     *
     * @property {UI.Color} toggleOnColor
     * @android
     * @ios
     * @since 0.1
     */
    this.toggleOnColor = Color.GRAY;

    /**
     * Gets/sets the background of the switch when it is OFF.  It is set to gray
     * by default. This property works only for Android.
     *
     *     @example
     *     const Switch = require('nf-core/ui/switch');
     *     const Color = require('nf-core/ui/color');
     *     var mySwitch = new Switch();
     *     mySwitch.android.toggleOffColor = Color.DARKGRAY;
     *
     * @property {UI.Color} toggleOffColor
     * @android
     * @since 0.1
     */
    this.android = {
        toggleOffColor: Color.GRAY
    };

    /**
     * Gets/sets toggle value of Switch. When Switch is ON,
     * the value of this property will be true. It is set to false by default.
     *
     * @property {Boolean} toggle
     * @android
     * @ios
     * @since 0.1
     */
    this.toggle = false;

    // events
    /**
     * This event is called when the state of switch changes from ON to OFF or vice versa.
     *
     * @event onToggleChanged
     * @android
     * @ios
     * @since 0.1
     */
    this.onToggleChanged = function() {};
    }
);
module.exports = Switch;
