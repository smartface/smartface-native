const AlertView = require('../../../ui/alertview');
const System = require('../../../device/system');

function alert(options) {
  let paramOptions = {
    message: '',
    title: title || '',
    defaultButtonText: 'OK'
  };
  const defaultButton = {
    type: AlertView.Android.ButtonType.NEUTRAL,
    //@ts-ignore
    text: global?.lang?.ok || 'OK',
    onClick: () => { }
  }
  let buttons = [];
  if (typeof options !== 'string') {
    const newMessage = typeof options.message !== 'string' ? String(options) : options.message;
    buttons = options.buttons || [defaultButton];
    paramOptions.message = newMessage || '';
    //@ts-ignore
    defaultButton.text = options.defaultButtonText || global?.lang?.ok || 'OK';
    paramOptions.title = options.title || '';
  }
  else {
    paramOptions.message = options;
    buttons = [defaultButton];
  }
  const alertView = new AlertView(paramOptions);
  if (System.OS === System.OSType.ANDROID) {
    alertView.android.cancellable = false;
  }
  buttons = buttons.reverse();
  buttons.forEach((button) => alertView.addButton(button));
  alertView.show();
  return alertView;
}

const oldAlert = global.alert;
global.alert = alert;

module.exports = oldAlert;