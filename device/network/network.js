const Network = require("./network-" + Device.deviceOS);

function isConnected(checkUrl = "https://www.google.com") {
  return new Promise((resolve, reject) => {
    const noConnection = Network.connectionType === Network.ConnectionType.NONE;
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
  isConnected
}