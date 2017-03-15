if (Device.deviceOS === "iOS") {
  module.exports = require('./image-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./image-Android');
}