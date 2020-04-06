if (Device.deviceOS === "iOS") {
    module.exports = require('./textcontenttype');
} else if (Device.deviceOS === "Android") {
    module.exports = {};
}
