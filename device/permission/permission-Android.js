const Application = require('../../application');
const { alertWrapper } = require('./permission');

const PERMISSION_STATUS = {
  GRANTED: "GRANTED",
  DENIED: "DENIED",
  NEVER_ASK_AGAIN: "NEVER_ASK_AGAIN"
};

const IOS_PERMISSIONS = {
  CAMERA: 'CAMERA',
  LOCATION: 'LOCATION'
};

let lastRequestPermissionCode = 2000;
const ALERT_TIMEOUT = 500;

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
function getPermission(options) {
  return new Promise((resolve, reject) => {
    const requestPermissionCode = lastRequestPermissionCode++;
    const requestTexts = options?.requestTexts || {};
    const prevPermissionRationale = Application.android.shouldShowRequestPermissionRationale(
      options.androidPermission
    );
    if (Application.android.checkPermission(options.androidPermission)) {
      resolve('');
    } else {
      Application.android.onRequestPermissionsResult = (e) => {
        const currentPermissionRationale = Application.android.shouldShowRequestPermissionRationale(
          options.androidPermission
        );
        if (e.requestCode === requestPermissionCode && e.result) {
          resolve(PERMISSION_STATUS.GRANTED);
        } else if (
          !e.result &&
          !currentPermissionRationale &&
          !prevPermissionRationale
        ) {
          setTimeout(() => {
            if (options.showSettingsAlert) {
              alertWrapper(requestTexts);
            }
          }, ALERT_TIMEOUT);
          reject(PERMISSION_STATUS.NEVER_ASK_AGAIN);
        } else {
          reject(PERMISSION_STATUS.DENIED);
        }
      };
      Application.android.requestPermissions(requestPermissionCode, options.androidPermission);
    }
  });
}

module.exports = {
  getPermission,
  PERMISSION_STATUS,
  IOS_PERMISSIONS
}