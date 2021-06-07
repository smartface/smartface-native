import Image from "sf-core/ui/image";

export =  Screen;
declare namespace Screen {
	type Orientation =
		| "portrait"
		| "upsidedown"
		| "landspaceleft"
		| "landspaceright"
		| "faceup"
        | "facedown";
/**
 * @enum {String} Device.Screen.OrientationType
 * @static
 * @since 0.1
 */
	const OrientationType: {
/**
 * @property {String} PORTRAIT
 * @static
 * @ios
 * @android
 * @readonly
 * @since 0.1
 */
        readonly PORTRAIT: "portrait";
/**
 * @property {String} UPSIDEDOWN
 * @static
 * @ios
 * @android
 * @readonly
 * @since 0.1
 */
		readonly UPSIDEDOWN: "upsidedown";
/**
 * @property {String} LANDSCAPELEFT
 * @static
 * @ios
 * @android
 * @readonly
 * @since 0.1
 */
        readonly LANDSCAPELEFT: "landspaceleft";
/**
 * @property {String} LANDSCAPERIGHT
 * @static
 * @ios
 * @android
 * @readonly
 * @since 0.1
 */
		readonly LANDSCAPERIGHT: "landspaceright";
		readonly ios: {
/**
 * @property {String} FACEUP
 * @static
 * @ios
 * @readonly
 * @since 0.1
 */
            readonly FACEUP: "faceup";
/**
 * @property {String} FACEDOWN
 * @static
 * @ios
 * @readonly
 * @since 0.1
 */
			readonly FACEDOWN: "facedown";
		};
	};
}
/**
 * @class Device.Screen
 * @since 0.1
 * 
 * This class helps you to get device's screen properties like size, orientation, force touch
 * enabled etc. Also you can capture screen with Device.Screen.capture function.
 * 
 *     @example
 *     const Screen = require('sf-core/device/screen');
 *     console.log("Device.Screen.dpi: "            + Screen.dpi);
 *     console.log("Device.Screen.width: "          + Screen.width);
 *     console.log("Device.Screen.height: "         + Screen.height);
 *     console.log("Device.Screen.touchSupported: " + Screen.touchSupported);
 *     console.log("Device.Screen.orientation: "    + Screen.orientation);
 *     console.log("Device.Screen.capture(): "      + Screen.capture());
 * 
 * 
 */
declare class Screen  {
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
    static readonly orientation: Screen.Orientation;
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
	static readonly ios: {
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
	};
}
