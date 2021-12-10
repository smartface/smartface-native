const System = require('../system');
const Linking = require('../../application/linking');
const AlertView = require('../../ui/alertview');

/**
 * @param {Object} options
 * @param {String?} options.permissionTitle
 * @param {String?} options.permissionText
 * @param {String?} options.goToSettingsText
 * @param {String?} options.cancelText
 */
function showAlertAndRedirectToSettings(options) {
  const permissionTitle = options?.permissionTitle || 'Permissions required';
  const permissionText = options?.permissionText || 'Please grant related permissions for application to work properly';
  const goToSettingsText = options?.goToSettingsText || 'Go to Settings';
  const cancelText = options?.cancelText || 'Cancel';
  const alertView = global.alert({
    title: permissionTitle,
    message: permissionText,
    buttons: [
      {
        text: goToSettingsText,
        type: AlertView.Android.ButtonType.POSITIVE,
        onClick: () => Linking.openSettings()
      },
      {
        text: cancelText,
        type: AlertView.Android.ButtonType.NEGATIVE,
        onClick: () => alertView.dismiss(),
      },
    ],
  });
}

/**
 * @param {Object} options
 * @param {String?} options.permissionTitle
 * @param {String?} options.permissionText
 * @param {String?} options.goToSettingsText
 * @param {String?} options.cancelText
 */
function alertWrapper(options) {
  new Promise((resolve) => {
    if (System.OS === System.OSType.IOS) {
      __SF_Dispatch.mainAsync(() => {
        resolve();
      });
    } else {
      resolve();
    }
  }).then(() => showAlertAndRedirectToSettings(options));
}

module.exports = {
  alertWrapper
}