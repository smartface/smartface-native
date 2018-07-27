if (Device.deviceOS === "iOS") {
  module.exports = require('./layoutmanager-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./layoutmanager-Android');
}