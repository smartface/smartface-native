if (Device.deviceOS === "iOS") {
  module.exports = require('./flexlayout-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./flexlayout-Android');
}