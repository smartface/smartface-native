import { MobileOSProps } from '../../core/native-mobile-component';
import Image from '../../ui/image';

/**
 * @enum {String} Device.Screen.OrientationType
 * @static
 * @since 0.1
 */
export enum OrientationType {
  UNKNOWN = 'unknown',
  /**
   * @property {String} PORTRAIT
   * @ios
   * @android
   * @readonly
   * @since 0.1
   */
  PORTRAIT = 'portrait',
  /**
   * @property {String} UPSIDEDOWN
   * @ios
   * @android
   * @readonly
   * @since 0.1
   */
  UPSIDEDOWN = 'upsidedown',
  /**
   * @property {String} LANDSCAPELEFT
   * @ios
   * @android
   * @readonly
   * @since 0.1
   */
  LANDSCAPELEFT = 'landspaceleft',
  /**
   * @property {String} LANDSCAPERIGHT
   * @ios
   * @android
   * @readonly
   * @since 0.1
   */
  LANDSCAPERIGHT = 'landspaceright',
  /**
   * @property {String} FACEUP
   * @ios
   * @readonly
   * @since 0.1
   */
  FACEUP = 'faceup',
  /**
   * @property {String} FACEDOWN
   * @ios
   * @readonly
   * @since 0.1
   */
  FACEDOWN = 'facedown'
}

export interface ISCreenIOSProps {
  /**
   * Gets if device screen has support for force touch feature.
   *
   * @ios
   * @property {Boolean} forceTouchAvaliable
   * @readonly
   * @since 0.1
   */
  readonly forceTouchAvaliable?: boolean;
}

/**
 * @class Device.Screen
 * @since 0.1
 *
 * This class helps you to get device's screen properties like size, orientation, force touch
 * enabled etc. Also you can capture screen with Device.Screen.capture function.
 *
 *     @example
 *     import Screen from '@smartface/native/device/screen';
 *     console.log("Device.Screen.dpi: "            + Screen.dpi);
 *     console.log("Device.Screen.width: "          + Screen.width);
 *     console.log("Device.Screen.height: "         + Screen.height);
 *     console.log("Device.Screen.touchSupported: " + Screen.touchSupported);
 *     console.log("Device.Screen.orientation: "    + Screen.orientation);
 *     console.log("Device.Screen.capture(): "      + Screen.capture());
 *
 *
 */
export interface IScreen<TProps extends MobileOSProps<ISCreenIOSProps, {}> = MobileOSProps<ISCreenIOSProps, {}>> {
  /**
   * Gets current device screen orientation.
   *
   * @android
   * @ios
   * @property {Device.Screen.OrientationType} orientation
   * @readonly
   * @since 0.1
   */
  readonly orientation: OrientationType;
  /**
   * Gets height of device screen.
   *
   * @android
   * @ios
   * @property {Number} height
   * @readonly
   * @since 0.1
   */
  readonly height: number;
  /**
   * Gets width of device screen.
   *
   * @android
   * @ios
   * @property {Number} width
   * @readonly
   * @since 0.1
   */
  readonly width: number;
  /**
   * Gets if device screen has feature support for touching.
   *
   * @android
   * @ios
   * @property {Boolean} touchSupported
   * @readonly
   * @since 0.1
   */
  readonly touchSupported: number;
  /**
   * Gets dpi of device screen.
   *
   * @android
   * @ios
   * @property {Number} dpi
   * @readonly
   * @since 0.1
   */
  readonly dpi: number;
  /**
   * Captures screen and returns result image.
   *
   * @android
   * @ios
   * @method capture
   * @return {UI.Image} captured image.
   * @since 0.1
   */
  capture(): Image;
  ios?: TProps['ios'];
}
