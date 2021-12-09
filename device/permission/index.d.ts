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

/**
 * Run-time permission requests for Android if needed. iOS only supports camera, others automatically succeeds.
 * Permission request numbers starts from 2000 and incremented on each requestPermission
 * @example
 * ```
 * import permissionUtil from '@smartface/extension-utils/lib/permission';
 * permissionUtil.getPermission({
 *         androidPermission: Application.Android.Permissions.CAMERA,
 *         iosPermission: permissionUtil.IOS_PERMISSIONS.CAMERA,
 *         permissionText: 'Please go to the settings and grant permission',
 *         permissionTitle: 'Info'
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
  permissionTitle?: string;
  androidPermission: keyof typeof Application.Android.Permissions;
  permissionText: string;
  iosPermission?: keyof typeof IOS_PERMISSIONS;
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
