if (Device.deviceOS === "iOS") {
  module.exports = require('./sliderdrawer-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./sliderdrawer-Android');
}