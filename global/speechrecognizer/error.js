/**
 * @type {{
 *   INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
 *   NETWORK: 'NETWORK',
 *   NETWORK_TIMEOUT: 'NETWORK_TIMEOUT',
 *   SPEECH_TIMEOUT: 'SPEECH_TIMEOUT',
 *   CLIENT: 'CLIENT',
 *   SERVER: 'SERVER',
 *   android: {
 *     AUDIO: 'AUDIO',
 *     NO_MATCH: 'NO_MATCH',
 *     RECOGNIZER_BUSY: 'RECOGNIZER_BUSY'
 *   },
 *   ios: {}
 * }}
 */
const SpeechRecognizerError = {};

SpeechRecognizerError.ios = {};
SpeechRecognizerError.android = {};

Object.defineProperties(SpeechRecognizerError, {
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
    },
    'SERVER': {
        value: "SERVER",
        configurable: false
    }
});

Object.defineProperties(SpeechRecognizerError.android, {
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
    }
});

module.exports = SpeechRecognizerError;