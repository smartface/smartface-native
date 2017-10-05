if (Device.deviceOS === "iOS") {
  module.exports = require('./websocket-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./websocket-Android');
}