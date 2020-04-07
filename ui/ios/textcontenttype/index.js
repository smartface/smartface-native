if (Device.deviceOS === "iOS") {
    module.exports = require('./textcontenttype-iOS');
} else if (Device.deviceOS === "Android") {
    module.exports = {};
}
