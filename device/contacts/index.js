if (Device.deviceOS === "iOS") {
  module.exports = require('./contacts-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./contacts-Android');
}