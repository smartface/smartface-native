if (Device.deviceOS === "iOS") {
  module.exports = require('./imageview-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./imageview-Android');
}