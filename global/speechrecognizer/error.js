const Error = {};

Error.ios = {};
Error.android = {};

Object.defineProperties(Error, {
    'INSUFFICIENT_PERMISSIONS': {
        value: "INSUFFICIENT_PERMISSIONS",
        configurable: false
    },
    'NETWORK': {
        value: "NETWORK",
        configurable: false
    },
    'NETWORK_TIMEOUT': {
        value: "NETWORK_TIMEOUT",
        configurable: false
    },
    'SPEECH_TIMEOUT': {
        value: "SPEECH_TIMEOUT",
        configurable: false
    },
    'CLIENT': {
        value: "CLIENT",
        configurable: false
    }
});

Object.defineProperties(Error.android, {
    'AUDIO': {
        value: "AUDIO",
        configurable: false
    },
    'NO_MATCH': {
        value: "NO_MATCH",
        configurable: false
    },
    'RECOGNIZER_BUSY': {
        value: "RECOGNIZER_BUSY",
        configurable: false
    },
    'SERVER': {
        value: "SERVER",
        configurable: false
    }
});

module.exports = Error;