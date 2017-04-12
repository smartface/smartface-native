if (Device.deviceOS === "iOS") {
  module.exports = require('./dialog-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./dialog-Android');
}