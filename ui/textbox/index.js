if (Device.deviceOS === "iOS") {
  module.exports = require('./textbox-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./textbox-Android');
}