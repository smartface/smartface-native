const Http = require('../../net/http');

const ConnectionType = {
  None: 0,
  NONE: 0,
  Mobile: 1,
  MOBILE: 1,
  WIFI: 2
};

const isConnected = async options => {
  const connectionType = options.connectionType;
  const checkUrl = options.checkUrl || "https://www.google.com";

  return new Promise((resolve, reject) => {
    const noConnection = connectionType === ConnectionType.NONE;
    if (noConnection) {
      return reject();
    }
    const http = new Http();
    http.request({
      url: checkUrl,
      onLoad: (e) => {
        resolve(e);
      },
      onError: (e) => {
        if (typeof e.statusCode === "undefined") {
          reject(e);
        } else {
          resolve(e);
        }
      },
    });
  });
}

module.exports = {
  isConnected,
  ConnectionType
}