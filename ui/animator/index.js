if (Device.deviceOS === "iOS") {
  module.exports = require('./animator-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./animator-Android');
}