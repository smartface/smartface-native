declare class Orientation {
  /**
   * Returns the short side of the phone.
   * E.g. for 840x680 device, it will return 680
   */
  static shortEdge: number;

  /**
   * Returns the short side of the phone.
   * E.g. for 840x680 device, it will return 840
   */
  static longEdge: number;

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
  static getOrientation: () => string;

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
  static rotate: (orientation: string) => string;

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
  static getOrientationOnchage: () => string;
}