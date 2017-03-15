if (Device.deviceOS === "iOS") {
  module.exports = require('./view-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./view-Android');
}