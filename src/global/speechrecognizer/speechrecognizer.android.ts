import AndroidConfig from '../../util/Android/androidconfig';
import { ISpeechRecognizer, RecognizerAndroidError, RecognizerError } from './speechrecognizer';

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

class SpeechRecognizerClass implements ISpeechRecognizer {
  nativeObject: any;
  _isRunning = false;
  intent;
  start(params: { locale: string; onResult: (result: any) => void; onFinish: (result: any) => void; onError: (error: typeof RecognizerError) => void }): void {
    if (this.nativeObject) {
      this.stop();
    }
    this.create(params);
    this.nativeObject.startListening(this.intent);
    this._isRunning = true;
  }
  create(params: { locale: string; onResult: (result: any) => void; onFinish: (result: any) => void; onError: (error: typeof RecognizerError) => void }) {
    const activity = AndroidConfig.activity;
    if (!this.nativeObject) {
      this.nativeObject = NativeSpeechRecognizer.createSpeechRecognizer(activity);
      if (!this.intent) {
        this.intent = createIntent(params);
      }

      const recognizerListener = this.createRecognizerListener(params);
      this.nativeObject.setRecognitionListener(recognizerListener);
    }
  }
  stop(): void {
    this.nativeObject?.destroy();
    //Destroy was not enough for existing check
    this.nativeObject = null;
    this._isRunning = false;
  }
  isRunning(): boolean {
    return this._isRunning;
  }
  createRecognizerListener(params: { locale: string; onResult: (result: any) => void; onFinish: (result: any) => void; onError: (error: typeof RecognizerError) => void }) {
    const recognizerListener = RecognitionListener.implement({
      onResults: (bundle) => {
        const results = bundle.getStringArrayList('results_recognition');
        if (params && params.onFinish) {
          params.onFinish(results.get(0).substring(0)); // toString must be called. results.get(0) is a java.lang.String
        }
        this._isRunning = false;
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
        this._isRunning = false;
      },
      BufferReceived: function (buffer) {},
      onRmsChanged: function (rmsdB) {}
    });
    return recognizerListener;
  }
  readonly Error: typeof RecognizerError & { android: typeof RecognizerAndroidError } = RecognizerError;
  ios = {
    isLocaleSupported() {
      return false;
    }
  };
}

const SpeechRecognizer = new SpeechRecognizerClass();

export default SpeechRecognizer;
