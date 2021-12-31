import Color from "../../color";
import View from "../../view";

/**
 * Adds press event to target object. It uses touch events to perform the action.
 * Useful with target FlexLayout components and proper handling in scrolling parents
 * This replaces existing touch events
 * @public
 * @static
 * @params {UI.View} target - target control to add press event
 * @params {function} event - event to be fired when press occurs
 * @params {object} [options] - Styling options
 * @params {function} [options.startTouchEffect=defaultAddPressEffect] - Function called when touch starts, to add UI effect to give pressed effects. If not provided, default effect will be used. It should be used with endTouchEffect
 * @params {function} [options.endTouchEffect=defaultClearPressEffect] - Function called when press effect ends; it is used to revert the effects in startTouchEffect. It should be used together with startTouchEffect. If not provided default effect reversing will be applied
 * @params {boolean} [options.consumeTouch] - If this option is set to true, touch events won't be passed through views
 * @params {boolean} [options.disableRippleEffect=false] - Enables the ripple effect on given target. This option specfic to Android
 * @params {number} [options.touchDelay=0] - Ripple effect requires duration before performing given event. This option specfic to Android
 * @params {boolean} [options.rippleUseBackground=false] - if this options is set to true, ripple effect added on background of the given target. If target contains child components, draw ripple effect below them. This option specfic to Android.
 * @params {UI.Color} [options.rippleColor=Color.create("#d8d8d8")] - Sets the color to ripple effect. This option specfic to Android
 * @params {UI.Color} [options.fadeColor=Color.create("#d8d8d8")] - Sets the color to fade effect. This option specfic to iOS
 * @params {number} [options.fadeDuration=200] - Sets duration to fade effect. This option specfic to iOS. Default 0.2
 * @params {number} [options.fadeMaxOpacity=0.3] - Sets maximum opacity to fade effect. This option specfic to iOS. Default 0.3
 * * @example
 * ```
 * import { addPressEvent } from '@smartface/native/ui/view/touchconfiguration'
 * //inside page.onLoad
 * addPressEvent(this.flex, () => alert('Pressed'), {
 *   rippleColor: Color.create(23,200,23),
 *   fadeColor: Color.create(23,200,23),
 *   fadeDuration: 200,
 *   fadeMaxOpacity: 1
 * });
 * ```
 */
function addPressEvent() {}

module.exports = {
  addPressEvent,
};
