if (Device.deviceOS === "iOS") {
    module.exports = require('./materialtextbox-iOS');
} else if (Device.deviceOS === "Android") {
    module.exports = require('./materialtextbox-Android');
}