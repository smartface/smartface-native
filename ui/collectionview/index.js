if (Device.deviceOS === "iOS") {
  module.exports = require('./collectionview-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./collectionview-Android');
}