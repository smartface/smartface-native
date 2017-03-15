if (Device.deviceOS === "iOS") {
  module.exports = require('./headerbaritem-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./headerbaritem-Android');
}