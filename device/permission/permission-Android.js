const Application = require('../../application');
const AlertView = require('../../ui/alertview');

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
function getPermission(options) {
  return new Promise((resolve, reject) => {
    const requestPermissionCode = lastRequestPermissionCode++;
    const prevPermissionRationale = Application.android.shouldShowRequestPermissionRationale(
      options.androidPermission
    );
    if (Application.android.checkPermission(options.androidPermission)) {
      resolve('');
    } else {
      Application.android.onRequestPermissionsResult = (e) => {
        //@ts-ignore
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
              alertWrapper(options.permissionText, options.permissionTitle);
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

function alertWrapper(permissionText = "", permissionTitle = "") {
  showAlertAndRedirectToSettings(permissionText, permissionTitle);
}

function showAlertAndRedirectToSettings(permissionText = '', permissionTitle = '') {
  const alertView = global.alert({
    title: permissionTitle || global.lang.permissionRequiredTitle || "Permissions required",
    message: permissionText || global.lang.permissionRequiredMessage || "Please grant related permissions for application to work properly",
    buttons: [
      {
        text: global.lang.goToSettings || "Go to Settings",
        type: AlertView.Android.ButtonType.POSITIVE,
        onClick: () => { }// Linking.openSettings()
      },
      {
        text: global.lang.cancel || "Cancel",
        type: AlertView.Android.ButtonType.NEGATIVE,
        onClick: () => alertView.dismiss(),
      },
    ],
  });
}

module.exports = {
  getPermission,
  PERMISSION_STATUS,
  IOS_PERMISSIONS
}