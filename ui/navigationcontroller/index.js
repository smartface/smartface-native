if (Device.deviceOS === "iOS") {
  module.exports = require('./navigationcontroller-iOS');
} else if (Device.deviceOS === "Android") {
  console.log("NavigationController index");
  module.exports = require('./navigationcontroller-Android');
}