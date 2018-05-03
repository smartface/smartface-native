if (Device.deviceOS === "iOS") {
  module.exports = require('./webbrowser-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./webbrowser-Android');
}