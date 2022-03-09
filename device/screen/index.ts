import Image from '../../ui/image';

/**
 * @enum {String} Device.Screen.OrientationType
 * @static
 * @since 0.1
 */
export enum OrientationType {
  /**
   * @property {String} PORTRAIT
   * @static
   * @ios
   * @android
   * @readonly
   * @since 0.1
   */
  PORTRAIT = 'portrait',
  /**
   * @property {String} UPSIDEDOWN
   * @static
   * @ios
   * @android
   * @readonly
   * @since 0.1
   */
  UPSIDEDOWN = 'upsidedown',
  /**
   * @property {String} LANDSCAPELEFT
   * @static
   * @ios
   * @android
   * @readonly
   * @since 0.1
   */
  LANDSCAPELEFT = 'landspaceleft',
  /**
   * @property {String} LANDSCAPERIGHT
   * @static
   * @ios
   * @android
   * @readonly
   * @since 0.1
   */
  LANDSCAPERIGHT = 'landspaceright',
  /**
   * @property {String} FACEUP
   * @static
   * @ios
   * @readonly
   * @since 0.1
   */
  FACEUP = 'faceup',
  /**
   * @property {String} FACEDOWN
   * @static
   * @ios
   * @readonly
   * @since 0.1
   */
  FACEDOWN = 'facedown'
}

/**
 * @class Device.Screen
 * @since 0.1
 *
 * This class helps you to get device's screen properties like size, orientation, force touch
 * enabled etc. Also you can capture screen with Device.Screen.capture function.
 *
 *     @example
 *     const Screen = require('@smartface/native/device/screen');
 *     console.log("Device.Screen.dpi: "            + Screen.dpi);
 *     console.log("Device.Screen.width: "          + Screen.width);
 *     console.log("Device.Screen.height: "         + Screen.height);
 *     console.log("Device.Screen.touchSupported: " + Screen.touchSupported);
 *     console.log("Device.Screen.orientation: "    + Screen.orientation);
 *     console.log("Device.Screen.capture(): "      + Screen.capture());
 *
 *
 */
export declare class AbstractScreen {
  /**
   * Gets current device screen orientation.
   *
   * @android
   * @ios
   * @property {Device.Screen.OrientationType} orientation
   * @readonly
   * @static
   * @since 0.1
   */
  static readonly orientation: OrientationType;
  /**
   * Gets height of device screen.
   *
   * @android
   * @ios
   * @property {Number} height
   * @readonly
   * @static
   * @since 0.1
   */
  static readonly height: number;
  /**
   * Gets width of device screen.
   *
   * @android
   * @ios
   * @property {Number} width
   * @readonly
   * @static
   * @since 0.1
   */
  static readonly width: number;
  /**
   * Gets if device screen has feature support for touching.
   *
   * @android
   * @ios
   * @property {Boolean} touchSupported
   * @readonly
   * @static
   * @since 0.1
   */
  static readonly touchSupported: number;
  /**
   * Gets dpi of device screen.
   *
   * @android
   * @ios
   * @property {Number} dpi
   * @readonly
   * @static
   * @since 0.1
   */
  static readonly dpi: number;
  /**
   * Captures screen and returns result image.
   *
   * @android
   * @ios
   * @method capture
   * @return {UI.Image} captured image.
   * @since 0.1
   */
  static capture(): Image;
  static readonly ios: Partial<{
    /**
     * Gets if device screen has support for force touch feature.
     *
     * @ios
     * @property {Boolean} forceTouchAvaliable
     * @readonly
     * @static
     * @since 0.1
     */
    readonly forceTouchAvaliable?: boolean;
  }>;
}

const Screen: AbstractScreen = require(`./screen.${Device.deviceOS.toLowerCase()}`).default;

export default Screen;
