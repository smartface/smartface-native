const NativeSpeechRecognizer    = requireClass("android.speech.SpeechRecognizer");
const Intent                    = requireClass("android.content.Intent");
const Locale                    = requireClass("java.util.Locale");
const RecognitionListener       = requireClass("android.speech.RecognitionListener");
const RecognizerError           = require("./error");
const AndroidConfig             = require("../../util/Android/androidconfig");

const SpeechRecognizerError = {
    1: RecognizerError.NETWORK_TIMEOUT,
    2: RecognizerError.NETWORK,
    3: RecognizerError.android.AUDIO,
    4: RecognizerError.SERVER,
    5: RecognizerError.CLIENT,
    6: RecognizerError.SPEECH_TIMEOUT,
    7: RecognizerError.android.NO_MATCH,
    8: RecognizerError.android.RECOGNIZER_BUSY,
    9: RecognizerError.INSUFFICIENT_PERMISSIONS,
};

var speechRecognizer;
var _isRunning = false;
var _intent;
function SpeechRecognizer (params) {
    var activity = AndroidConfig.activity;
    if(!this.nativeObject) {
        this.nativeObject = NativeSpeechRecognizer.createSpeechRecognizer(activity);
       if(!_intent)
           createIntent(params);
       this.intent = _intent;
       
       var recognizerListener = createRecognizerListener(params);
       this.nativeObject.setRecognitionListener(recognizerListener);
    }
}

SpeechRecognizer.ios = {};

SpeechRecognizer.ios.isLocaleSupported = function(locale){};

function createIntent(params) {
    _intent = new Intent(string("android.speech.action.RECOGNIZE_SPEECH")); // "android.speech.action.RECOGNIZE_SPEECH" = RecognizerIntent.ACTION_RECOGNIZE_SPEECH
    if(params && params.locale) {
        _intent.putExtra(string("android.speech.extra.LANGUAGE"), string(params.locale));
    
    } else {
        var locale = Locale.getDefault();
        _intent.putExtra(string("android.speech.extra.LANGUAGE"), locale); 
    }
    _intent.putExtra(string("android.speech.extra.DICTATION_MODE"), true);
    _intent.putExtra(string("android.speech.extra.PARTIAL_RESULTS"), true);
}

function createRecognizerListener(params) {
    var recognizerListener = RecognitionListener.implement({
        onResults: function(bundle) {
            var results = bundle.getStringArrayList(string("results_recognition"));
            if(params && params.onFinish) {
                params.onFinish(string(results.get(int(0)).substring(0))); // toString must be called. results.get(0) is a java.lang.String
            }
            _isRunning = false;
        },
        
        onBeginningOfSpeech: function() {},
        onEndOfSpeech: function() {},
        onPartialResults: function(partialResults) {
            var results = partialResults.getStringArrayList(string("results_recognition")); //results_recognition = SpeechRecognizer.RESULTS_RECOGNITION
            var matched = results.get(0).substring(0); 
            if(params && params.onResult) {
                params.onResult(string(matched));
            }
        },
        onEvent: function(eventType, params) {},
        onReadyForSpeech: function(params) {},
        onError: function(error) {
            if(params && params.onError) 
                params.onError(SpeechRecognizerError[int(error)]);
            _isRunning = false;
        },
        BufferReceived: function(buffer) {},
        onRmsChanged : function(rmsdB) {}
    });
    return recognizerListener;
}

Object.defineProperties(SpeechRecognizer, {
    'start': {
        value: function(params) {
            if(speechRecognizer)
                SpeechRecognizer.stop();
            speechRecognizer = new SpeechRecognizer(params);
            speechRecognizer.nativeObject.startListening(speechRecognizer.intent);
            _isRunning = true;
        }
    },
    'stop': {
        value: function() {
            if(speechRecognizer && speechRecognizer.nativeObject)
                speechRecognizer.nativeObject.destroy();
            _isRunning = false;
        }
    },
    'isRunning': {
        value: function() {
            return _isRunning;
        }
    },
    'Error': {
        value: RecognizerError
    }
});

module.exports = SpeechRecognizer;