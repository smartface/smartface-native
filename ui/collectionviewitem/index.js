if (Device.deviceOS === "iOS") {
  module.exports = require('./collectionviewitem-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./collectionviewitem-Android');
}