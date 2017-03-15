if (Device.deviceOS === "iOS") {
  module.exports = require('./pages-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./pages-Android');
}