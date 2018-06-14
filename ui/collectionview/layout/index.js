if (Device.deviceOS === "iOS") {
  module.exports = require('./staggeredflowlayout-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./staggeredflowlayout-Android');
}