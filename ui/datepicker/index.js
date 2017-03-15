if (Device.deviceOS === "iOS") {
  module.exports = require('./datepicker-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./datepicker-Android');
}