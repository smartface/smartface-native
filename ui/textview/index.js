if (Device.deviceOS === "iOS") {
  module.exports = require('./textview-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./textview-Android');
}