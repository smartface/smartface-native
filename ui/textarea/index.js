if (Device.deviceOS === "iOS") {
  module.exports = require('./textarea-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./textarea-Android');
}