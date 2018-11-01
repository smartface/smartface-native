if (Device.deviceOS === "iOS") {
  module.exports = require('./navigationcontroller-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./navigationcontroller-Android');
}