if (Device.deviceOS === "iOS") {
  module.exports = require('./database-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./database-Android');
}