if (Device.deviceOS === "iOS") {
  module.exports = require('./webview-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./webview-Android');
}