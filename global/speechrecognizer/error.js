const Error = {};

Error.ios = {};
Error.android = {};

Object.defineProperties(Error, {
    'ERROR_INSUFFICIENT_PERMISSIONS': {
        value: "ERROR_INSUFFICIENT_PERMISSIONS",
        configurable: false
    },
    'ERROR_NETWORK': {
        value: "ERROR_NETWORK",
        configurable: false
    },
    'ERROR_NETWORK_TIMEOUT': {
        value: "ERROR_NETWORK_TIMEOUT",
        configurable: false
    },
    'ERROR_SPEECH_TIMEOUT': {
        value: "ERROR_SPEECH_TIMEOUT",
        configurable: false
    },
    'ERROR_CLIENT': {
        value: "ERROR_CLIENT",
        configurable: false
    }
});

Object.defineProperties(Error.android, {
    'ERROR_AUDIO': {
        value: "ANDROID_ERROR_AUDIO",
        configurable: false
    },
    'ERROR_NO_MATCH': {
        value: "ANDROID_ERROR_NO_MATCH",
        configurable: false
    },
    'ERROR_RECOGNIZER_BUSY': {
        value: "ANDROID_ERROR_RECOGNIZER_BUSY",
        configurable: false
    },
    'ERROR_SERVER': {
        value: "ANDROID_ERROR_SERVER",
        configurable: false
    }
});

module.exports = Error;