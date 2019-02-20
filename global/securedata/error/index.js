if (Device.deviceOS === "iOS") {
  module.exports = require('./securedataerror-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./securedataerror-Android');
}