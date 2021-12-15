const Multimedia = require('../multimedia');
const Location = require('../location');
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
    const requestTexts = options?.requestTexts || {};
    if (options.iosPermission === IOS_PERMISSIONS.CAMERA) {
      if (
        Multimedia.ios.getCameraAuthorizationStatus() !==
        Multimedia.iOS.CameraAuthorizationStatus.AUTHORIZED
      ) {
        Multimedia.ios.requestCameraAuthorization((status) => {
          __SF_Dispatch.mainAsync(() => {
            if (status) {
              resolve(PERMISSION_STATUS.GRANTED);
            } else {
              setTimeout(() => {
                if (options.showSettingsAlert) {
                  alertWrapper(requestTexts);
                }
              }, ALERT_TIMEOUT);
              reject(PERMISSION_STATUS.DENIED);
            }
          });
        });
      } else {
        resolve(PERMISSION_STATUS.GRANTED);
      }
    } else if (options.iosPermission === IOS_PERMISSIONS.LOCATION) {
      const authorizationStatus = Location.ios.getAuthorizationStatus();
      if (
        authorizationStatus === Location.iOS.AuthorizationStatus.AUTHORIZED
      ) {
        resolve(PERMISSION_STATUS.GRANTED);
      } else if (
        authorizationStatus === Location.iOS.AuthorizationStatus.DENIED
      ) {
        setTimeout(() => {
          if (options.showSettingsAlert) {
            alertWrapper(requestTexts);
          }
        }, ALERT_TIMEOUT);
        reject(PERMISSION_STATUS.DENIED);
      } else if (
        authorizationStatus === Location.iOS.AuthorizationStatus.NOTDETERMINED
      ) {
        Location.start(Location.Android.Priority.HIGH_ACCURACY, 1000);
        Location.ios.onChangeAuthorizationStatus = (permissionGranted) => {
          Location.ios.onChangeAuthorizationStatus = () => { };
          if (permissionGranted) {
            resolve(PERMISSION_STATUS.GRANTED);
          } else {
            setTimeout(() => {
              if (options.showSettingsAlert) {
                alertWrapper(requestTexts);
              }
            }, ALERT_TIMEOUT);
            reject(PERMISSION_STATUS.DENIED);
          }
        };
      } else if (
        authorizationStatus === Location.iOS.AuthorizationStatus.RESTRICTED
      ) {
        reject(PERMISSION_STATUS.NEVER_ASK_AGAIN);
      }
    } else {
      // Hardcoded logic for iOS to pass
      resolve('');
    }
  });
}

module.exports = {
  getPermission,
  PERMISSION_STATUS,
  IOS_PERMISSIONS
}