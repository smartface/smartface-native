if (Device.deviceOS === "iOS") {
  module.exports = require('./tabbaritem-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./tabbaritem-Android');
}