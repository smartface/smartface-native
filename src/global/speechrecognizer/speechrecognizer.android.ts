import AndroidConfig from '../../util/Android/androidconfig';
import { RecognizerAndroidError, SpeechRecognizerBase, RecognizerError } from './speechrecognizer';

const NativeSpeechRecognizer = requireClass('android.speech.SpeechRecognizer');
const Intent = requireClass('android.content.Intent');
const Locale = requireClass('java.util.Locale');
const RecognitionListener = requireClass('android.speech.RecognitionListener');

const SpeechRecognizerError = {
  1: RecognizerError.NETWORK_TIMEOUT,
  2: RecognizerError.NETWORK,
  3: RecognizerError.android.AUDIO,
  4: RecognizerError.SERVER,
  5: RecognizerError.CLIENT,
  6: RecognizerError.SPEECH_TIMEOUT,
  7: RecognizerError.android.NO_MATCH,
  8: RecognizerError.android.RECOGNIZER_BUSY,
  9: RecognizerError.INSUFFICIENT_PERMISSIONS
};

function createIntent(params: { locale: string }) {
  const _intent = new Intent('android.speech.action.RECOGNIZE_SPEECH'); // "android.speech.action.RECOGNIZE_SPEECH" = RecognizerIntent.ACTION_RECOGNIZE_SPEECH
  if (params && params.locale) {
    _intent.putExtra('android.speech.extra.LANGUAGE', params.locale);
  } else {
    const locale = Locale.getDefault();
    _intent.putExtra('android.speech.extra.LANGUAGE', locale);
  }
  _intent.putExtra('android.speech.extra.DICTATION_MODE', true);
  _intent.putExtra('android.speech.extra.PARTIAL_RESULTS', true);
  return _intent;
}

class SpeechRecognizerAndroid implements SpeechRecognizerBase {
  static speechRecognizer: any;
  static nativeObject: any;
  static _isRunning = false;
  static intent;
  static start(params: { locale: string; onResult: (result: any) => void; onFinish: (result: any) => void; onError: (error: typeof RecognizerError) => void }): void {
    if (SpeechRecognizerAndroid.speechRecognizer) {
      SpeechRecognizerAndroid.stop();
    }
    SpeechRecognizerAndroid.speechRecognizer = new SpeechRecognizerAndroid.create(params);
    SpeechRecognizerAndroid.speechRecognizer.nativeObject.startListening(SpeechRecognizerAndroid.speechRecognizer.intent);
    SpeechRecognizerAndroid._isRunning = true;
  }
  static create(params: { locale: string; onResult: (result: any) => void; onFinish: (result: any) => void; onError: (error: typeof RecognizerError) => void }) {
    const activity = AndroidConfig.activity;
    if (!SpeechRecognizerAndroid.nativeObject) {
      SpeechRecognizerAndroid.nativeObject = NativeSpeechRecognizer.createSpeechRecognizer(activity);
      if (!SpeechRecognizerAndroid.intent) {
        SpeechRecognizerAndroid.intent = createIntent(params);
      }

      const recognizerListener = SpeechRecognizerAndroid.createRecognizerListener(params);
      SpeechRecognizerAndroid.nativeObject.setRecognitionListener(recognizerListener);
    }
  }
  static stop(): void {
    if (SpeechRecognizerAndroid.speechRecognizer && SpeechRecognizerAndroid.speechRecognizer.nativeObject) {
      SpeechRecognizerAndroid.speechRecognizer.nativeObject.destroy();
    }
    SpeechRecognizerAndroid._isRunning = false;
  }
  static isRunning(): boolean {
    return SpeechRecognizerAndroid._isRunning;
  }
  static createRecognizerListener(params: { locale: string; onResult: (result: any) => void; onFinish: (result: any) => void; onError: (error: typeof RecognizerError) => void }) {
    const recognizerListener = RecognitionListener.implement({
      onResults: function (bundle) {
        const results = bundle.getStringArrayList('results_recognition');
        if (params && params.onFinish) {
          params.onFinish(results.get(0).substring(0)); // toString must be called. results.get(0) is a java.lang.String
        }
        SpeechRecognizerAndroid._isRunning = false;
      },

      onBeginningOfSpeech: function () {},
      onEndOfSpeech: function () {},
      onPartialResults: function (partialResults) {
        const results = partialResults.getStringArrayList('results_recognition'); //results_recognition = SpeechRecognizer.RESULTS_RECOGNITION
        const matched = results.get(0).substring(0);
        if (params && params.onResult) {
          params.onResult(matched);
        }
      },
      onEvent: function (eventType, params) {},
      onReadyForSpeech: function (params) {},
      onError: function (error) {
        if (params && params.onError) params.onError(SpeechRecognizerError[error]);
        SpeechRecognizerAndroid._isRunning = false;
      },
      BufferReceived: function (buffer) {},
      onRmsChanged: function (rmsdB) {}
    });
    return recognizerListener;
  }
  static readonly Error: typeof RecognizerError & { android: typeof RecognizerAndroidError } = RecognizerError;
  static ios = {
    isLocaleSupported() {}
  };
}

export default SpeechRecognizerAndroid;
