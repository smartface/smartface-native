if (Device.deviceOS === "iOS") {
  module.exports = require('./gifimageview-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./gifimageview-Android');
}