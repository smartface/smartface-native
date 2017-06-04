if (Device.deviceOS === "iOS") {
  module.exports = require('./floatingmenu-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./floatingmenu-Android');
}