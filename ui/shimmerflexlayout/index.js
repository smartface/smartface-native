if (Device.deviceOS === "iOS") {
  module.exports = require('./searchview-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./searchview-Android');
}