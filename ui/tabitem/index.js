if (Device.deviceOS === "iOS") {
  module.exports = require('./tabitem-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./tabitem-Android');
}