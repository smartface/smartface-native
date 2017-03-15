if (Device.deviceOS === "iOS") {
  module.exports = require('./absolutelayout-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./absolutelayout-Android');
}