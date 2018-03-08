if (Device.deviceOS === "iOS") {
  module.exports = require('./securedata-iOS');
} 
else if (Device.deviceOS === "Android") {
  module.exports = require('./securedata-Android');
}