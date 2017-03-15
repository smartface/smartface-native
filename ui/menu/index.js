if (Device.deviceOS === "iOS") {
  module.exports = require('./menu-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./menu-Android');
}