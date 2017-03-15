if (Device.deviceOS === "iOS") {
  module.exports = require('./file-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./file-Android');
}