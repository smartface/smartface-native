if (Device.deviceOS === "iOS") {
  module.exports = require('./screen-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./screen-Android');
}