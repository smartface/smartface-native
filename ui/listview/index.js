if (Device.deviceOS === "iOS") {
  module.exports = require('./listview-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./listview-Android');
}