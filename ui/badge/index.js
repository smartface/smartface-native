if (Device.deviceOS === "iOS") {
  module.exports = require('./badge-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./badge-Android');
}