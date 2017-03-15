if (Device.deviceOS === "iOS") {
  module.exports = require('./mapview-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./mapview-Android');
}