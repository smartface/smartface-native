const TypeUtil = require('../../util/type');

function Linking() { }

Linking.openSettings = () => {
  return new Promise((resolve, reject) => {
    const options = {
      uriScheme: 'app-settings:',
      onSuccess: () => resolve(),
      onFailure: () => reject(),
      action: ""
    };
    Linking.openURL(options);
  });
};

Linking.canOpenURL = (url) => {
  if (!url) {
    console.error(new Error("url parameter can't be empty."));
    return;
  }
  if (!TypeUtil.isString(url)) {
    console.error(new Error("url parameter must be string."));
    return;
  }
  return SMFApplication.canOpenUrl(url);
};

Linking.openURL = (options) => {
  const { uriScheme, data, onSuccess, onFailure } = options;
  if (Object.keys(uriScheme).indexOf('uriScheme') === -1) {
    SMFApplication.call(uriScheme, data, onSuccess, onFailure);
  } else {
    SMFApplication.call(uriScheme.uriScheme, uriScheme.data, uriScheme.onSuccess, uriScheme.onFailure);
  }
};

module.exports = Linking;