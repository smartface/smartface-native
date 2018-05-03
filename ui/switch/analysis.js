/**
 * @class UI.Switch
 * @since 0.1
 * @extends UI.View
 *
 * Switch is a two-state toggle button. Switch allows the user
 * to select between two options.
 *
 *     @example
 *     const Switch = require('sf-core/ui/switch');
 *     const Color = require('sf-core/ui/color');
 *     var mySwitch = new Switch();
 *     mySwitch.thumbOnColor = Color.BLUE;
 */
function Switch(params) {}

/**
 * Enables/disables the Switch.
 *
 *     @example
 *     const Switch = require('sf-core/ui/switch');
 *     var mySwitch = new Switch();
 *     mySwitch.enabled = false;
 *
 * @since 1.1.8
 * @property {Boolean} [enabled = true]
 * @android
 * @ios
 */
Switch.prototype.enabled = true;

/**
 * Gets/sets color of the thumb when Switch is ON.
 * It is set to green by default.
 *
 * @property {UI.Color} thumbOnColor
 * @android
 * @ios
 * @since 0.1
 */
Switch.prototype.thumbOnColor = Color.GREEN;

/**
 * Gets/sets color of the thumb when Switch is OFF.
 * It is set to gray by default.
 *
 * @property {UI.Color} thumbOffColor
 * @android
 * @since 0.1
 */
Switch.prototype.thumbOffColor = Color.GRAY;

/**
 * Gets/sets color of the thumb when Switch is OFF.
 * It is set to gray by default.
 * thumbOffColor deprecated 1.1.8 use android.thumbOffColor instead.
 * 
 * @property {UI.Color} thumbOffColor
 * @android
 * @since 1.1.8
 */
Switch.prototype.android.thumbOffColor = Color.GRAY;

/**
 * Gets/sets the background of the switch when it is ON.
 * It is set to gray by default.
 *
 * @property {UI.Color} toggleOnColor
 * @android
 * @ios
 * @since 0.1
 */
Switch.prototype.toggleOnColor = Color.GRAY;

/**
 * Gets/sets the background of the switch when it is OFF.  It is set to gray
 * by default. This property works only for Android.
 *
 *     @example
 *     const Switch = require('sf-core/ui/switch');
 *     const Color = require('sf-core/ui/color');
 *     var mySwitch = new Switch();
 *     mySwitch.android.toggleOffColor = Color.DARKGRAY;
 *
 * @property {UI.Color} toggleOffColor
 * @android
 * @since 0.1
 */
Switch.prototype.android = {
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
Switch.prototype.toggle = false;

// events
/**
 * This event is called when the state of switch changes from ON to OFF or vice versa.
 *
 * @event onToggleChanged
 * @param {Boolean} state
 * @android
 * @ios
 * @since 0.1
 */
Switch.prototype.onToggleChanged = function(state) {};

module.exports = Switch;