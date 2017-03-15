if (Device.deviceOS === "iOS") {
  module.exports = require('./listviewitem-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./listviewitem-Android');
}