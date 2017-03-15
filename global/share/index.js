if (Device.deviceOS === "iOS") {
  module.exports = require('./share-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./share-Android');
}