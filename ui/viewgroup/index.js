if (Device.deviceOS === "iOS") {
  module.exports = require('./viewgroup-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./viewgroup-Android');
}