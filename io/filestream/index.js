if (Device.deviceOS === "iOS") {
  module.exports = require('./filestream-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./filestream-Android');
}