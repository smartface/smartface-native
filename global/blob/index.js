if (Device.deviceOS === "iOS") {
  module.exports = require('./blob-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./blob-Android');
}