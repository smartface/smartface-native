if (Device.deviceOS === "iOS") {
  module.exports = require('./font-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./font-Android');
}