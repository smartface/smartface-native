/**
 * Smartface Android & Partly iOS Permission module
 * @module permission
 * @type {object}
 * @author Ozcan Ovunc <ozcan.ovunc@smartface.io>
 * @author Alim Öncül <alim.oncul@smartface.io>
 * @author Furkan Arabacı <furkan.arabaci@smartface.io>
 * @copyright Smartface 2021
 */

import Application from "../../application";

export type RequestTexts = {
  permissionTitle?: string;
  permissionText?: string;
  goToSettingsText?: string;
  cancelText?: string;
}

/**
 * Run-time permission requests for Android if needed. iOS only supports camera, others automatically succeeds.
 * Permission request numbers starts from 2000 and incremented on each requestPermission
 * @example
 * ```
 * import { getPermission, IOS_PERMISSIONS } from '@smartface/native/device/permission';
 * getPermission({
 *         androidPermission: Application.Android.Permissions.CAMERA,
 *         iosPermission: IOS_PERMISSIONS.CAMERA,
 *         requestTexts: {
 *            permissionTitle: 'Info',
 *            permissionText: 'Please go to the settings and grant permission',
 *            goToSettingsText: global.lang.goToSettings || 'Go to settings',
 *            cancelText: global.lang.ignore || 'Ignore'
 *         }
 *     })
 *     .then(() => {
 *         console.info('Permission granted');
 *     })
 *     .catch((reason) => {
 *         console.info('Permission rejected');
 *     });
 * ```
 */
export declare const getPermission: (options?: {
  androidPermission: keyof typeof Application.Android.Permissions;
  iosPermission?: keyof typeof IOS_PERMISSIONS;
  requestTexts?: RequestTexts;
  showSettingsAlert?: boolean;
}) => Promise<string>;

export declare const PERMISSION_STATUS: {
  GRANTED: string;
  DENIED: string;
  NEVER_ASK_AGAIN: string;
};

export declare enum IOS_PERMISSIONS {
  CAMERA = "CAMERA",
  LOCATION = "LOCATION"
}
