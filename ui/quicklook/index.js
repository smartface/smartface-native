if (Device.deviceOS === "iOS") {
  module.exports = require('./quicklook-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./quicklook-Android');
}