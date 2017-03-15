if (Device.deviceOS === "iOS") {
  module.exports = require('./data-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./data-Android');
}