const Error = {};

Error.ios = {};
Error.android = {};

Object.defineProperties(Error, {
    'ERROR_INSUFFICIENT_PERMISSIONS': {
        value: "INSUFFICIENT_PERMISSIONS",
        configurable: false
    },
    'ERROR_NETWORK': {
        value: "NETWORK",
        configurable: false
    },
    'ERROR_NETWORK_TIMEOUT': {
        value: "NETWORK_TIMEOUT",
        configurable: false
    },
    'ERROR_SPEECH_TIMEOUT': {
        value: "SPEECH_TIMEOUT",
        configurable: false
    },
    'ERROR_CLIENT': {
        value: "CLIENT",
        configurable: false
    }
});

Object.defineProperties(Error.android, {
    'ERROR_AUDIO': {
        value: "AUDIO",
        configurable: false
    },
    'ERROR_NO_MATCH': {
        value: "NO_MATCH",
        configurable: false
    },
    'ERROR_RECOGNIZER_BUSY': {
        value: "RECOGNIZER_BUSY",
        configurable: false
    },
    'ERROR_SERVER': {
        value: "SERVER",
        configurable: false
    }
});

module.exports = Error;