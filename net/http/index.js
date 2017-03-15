if (Device.deviceOS === "iOS") {
  module.exports = require('./http-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./http-Android');
}