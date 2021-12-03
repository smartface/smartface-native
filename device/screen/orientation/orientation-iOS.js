const Screen = require('../index');
const OrientationTypes = require('../orientationtype');

/**
 * Returns the short side of the phone.
 * E.g. for 840x680 device, it will return 680
 */
const shortEdge = Math.min(Screen.width, Screen.height);

/**
 * Returns the short side of the phone.
 * E.g. for 840x680 device, it will return 840
 */
const longEdge = Math.max(Screen.width, Screen.height);

/**
 * gets current orientation of the device. Better to be called when the page is shown or later
 * @function orientation:getOrientation
 * @public
 * @static
 * @returns {string}
 * @example
 * ```
 * import orientationLib from '@smartface/extension-utils/lib/orientation';
 * this.onShow = function() {
 *     const orientation = orientationLib.getOrientation();
 *     console.log(orientation); // portrait
 *     arrangeLayout(this, orientation);
 * };
 * ```
 */
function getOrientation() {
  return Screen.height > Screen.width ? OrientationTypes.PORTRAIT : OrientationTypes.LANDSCAPE;
}

/**
 * gives rotated value for the given orientation. Does not roates the screen!
 * @function orientation:rotate
 * @param {string} orientation value
 * @static
 * @public
 * @returns {string} rotated value for the given orientation
 * @example
 * ```
 * import orientationLib from '@smartface/extension-utils/lib/orientation';
 * const orientation = orientationLib.rotate(orientationLib.PORTRAIT);
 * console.log(String(orientation === orientationLib.LANDSCAPE); //true
 * ```
 */
function rotate(orientation) {
  return orientation === OrientationTypes.LANDSCAPE ? OrientationTypes.PORTRAIT : OrientationTypes.LANDSCAPE;
}

/**
 * gives new orientation value during {UI.Page.onOrientationChange} event.
 * Should be called only within that event. Handles iOS & Android differnces.
 * @function orientation:getOrientationOnchage
 * @static
 * @public
 * @returns {string} target orientation value when the rotation completes
 * @example
 * ```
 * import orientationLib from '@smartface/extension-utils/lib/orientation';
 * this.onOrientationChange = function() {
 *     const orientation = orientationLib.getOrientationOnchage();
 *     console.log(orientation); // landscape
 *     arrangeLayout(this, orientation);
 * };
 * ```
 */
function getOrientationOnchage() {
  const orientation = getOrientation();
  return rotate(orientation);
}

module.exports = {
  shortEdge,
  longEdge,
  getOrientation,
  rotate,
  getOrientationOnchage
}