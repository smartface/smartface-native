if (Device.deviceOS === "iOS") {
  module.exports = require('./slider-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./slider-Android');
}