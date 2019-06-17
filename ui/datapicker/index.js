if (Device.deviceOS === "iOS") {
    module.exports = require('./datapicker-iOS');
}else if (Device.deviceOS === "Android") {
    module.exports = require('./datapicker-Android');
}