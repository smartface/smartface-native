if (Device.deviceOS === "iOS") {
  module.exports = require('./page-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./page-Android');
}