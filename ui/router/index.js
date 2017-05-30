if (Device.deviceOS === "iOS") {
    module.exports = require('./router-iOS');
} else if (Device.deviceOS === "Android") {
    module.exports = require('./router-Android');
}