import Hardware from '../../device/hardware';
import Timer from '../timer';
import { ISpeechRecognizer, RecognizerAndroidError, RecognizerError } from './speechrecognizer';

enum SFSpeechRecognizerAuthorizationStatus {
  notDetermined,
  denied,
  restricted,
  authorized
}

function isLocaleSupport(locale: { identifier: string } | __SF_NSLocale) {
  const supportedArray = __SF_SFSpeechRecognizer.supportedLocalesToArray();
  const filtered = supportedArray.filter(function (obj, index, arr) {
    const identifier = obj.identifier.replace(/-/g, '_');
    return identifier === locale.identifier;
  });
  if (filtered.length > 0) {
    return true;
  } else {
    return false;
  }
}

class SpeechRecognizerClass implements ISpeechRecognizer {
  recognitionTask: any;
  recognitionRequest: any;
  avaudiosession: any;
  avaudioengine: __SF_AVAudioEngine | undefined;
  speechRecognizer: __SF_SFSpeechRecognizer | undefined;
  speechDelegate: __SF_SFSpeechRecognizerDelegate;
  start(params: { locale: string; onResult: (result: any) => void; onFinish: (result: any) => void; onError: (error: typeof RecognizerError) => void }): void {
    this.stop();
    this.onErrorHandler = params.onError;

    __SF_SFSpeechRecognizer.speechRequestAuthorization((e: { status: SFSpeechRecognizerAuthorizationStatus }) => {
      if (e.status === SFSpeechRecognizerAuthorizationStatus.authorized) {
        Hardware.ios.microphone?.requestRecordPermission?.((granted) => {
          if (granted) {
            __SF_Dispatch.mainAsyncAfter(() => {
              this.createRecognizer(params);
            }, 200);
          } else {
            this.onErrorHandler(this.Error.INSUFFICIENT_PERMISSIONS);
          }
        });
      } else {
        this.onErrorHandler(this.Error.INSUFFICIENT_PERMISSIONS);
      }
    });
  }
  isRunning(): boolean {
    if (this.avaudioengine) {
      return this.avaudioengine.isRunning;
    } else {
      return false;
    }
  }
  stop(): void {
    if (!this.speechRecognizer) {
      return;
    }

    const myTimer = Timer.setTimeout({
      task: () => {
        __SF_Dispatch.mainAsync(() => {
          if (this.recognitionTask) {
            this.recognitionTask.cancel();
            this.recognitionTask = undefined;
          }

          if (this.avaudioengine && this.avaudioengine.isRunning) {
            this.avaudioengine.stop();
            this.avaudioengine.inputNode.removeTapOnBus(0);
            if (this.recognitionRequest) {
              this.recognitionRequest.endAudio();
            }
          }

          this.avaudioengine = undefined;
          this.recognitionRequest = undefined;
          this.speechRecognizer = undefined;
        });
      },
      delay: 100
    });
  }
  createRecognizer(params: { locale: string; onResult: (result: any) => void; onFinish: (result: any) => void; onError: (error: typeof RecognizerError) => void }) {
    if (this.speechRecognizer) {
      return;
    }

    if (params.locale) {
      if (isLocaleSupport(new __SF_NSLocale(params.locale))) {
        this.speechRecognizer = new __SF_SFSpeechRecognizer(new __SF_NSLocale(params.locale));
      } else {
        this.sendError(this.Error.SERVER);
        return;
      }
    } else {
      if (isLocaleSupport(__SF_NSLocale.currentLocale())) {
        this.speechRecognizer = new __SF_SFSpeechRecognizer(__SF_NSLocale.currentLocale());
      } else {
        this.sendError(this.Error.SERVER);
        return;
      }
    }

    this.avaudioengine = new __SF_AVAudioEngine();
    this.recognitionRequest = undefined;
    this.recognitionTask = undefined;
    this.speechDelegate = new __SF_SFSpeechRecognizerDelegate();

    this.speechDelegate.speechRecognizerAvailabilityDidChange = (e) => {
      if (!e.available) {
        this.onErrorHandler(this.Error.NETWORK);
      }
    };

    this.speechRecognizer.delegate = this.speechDelegate;

    if (this.recognitionTask) {
      this.recognitionTask.cancel();
      this.recognitionTask = undefined;
    }

    this.avaudiosession = __SF_AVAudioSession.sharedInstance();

    const isOtherAudioPlaying = this.avaudiosession.valueForKey('isOtherAudioPlaying');

    if (isOtherAudioPlaying) {
      this.onErrorHandler(this.Error.NETWORK);
      return;
    }

    this.avaudiosession.setCategory('AVAudioSessionCategoryRecord', (e) => {
      this.onErrorHandler(this.Error.CLIENT);
      return;
    });
    this.avaudiosession.setMode('AVAudioSessionModeMeasurement', (e) => {
      this.onErrorHandler(this.Error.CLIENT);
      return;
    });

    this.avaudiosession.setActiveWithOptions(true, 1, (e) => {
      this.onErrorHandler(this.Error.CLIENT);
      return;
    });

    this.recognitionRequest = new __SF_SFSpeechAudioBufferRecognitionRequest();

    const inputNode = this.avaudioengine.inputNode;
    if (!inputNode) {
      this.onErrorHandler(this.Error.CLIENT);
      return;
    }

    if (!this.recognitionRequest) {
      this.onErrorHandler(this.Error.CLIENT);
      return;
    }

    this.recognitionRequest.shouldReportPartialResults = true;

    this.recognitionTask = this.speechRecognizer.recognitionTask(this.recognitionRequest, (e) => {
      let isFinal = false;
      if (e.result) {
        if (typeof params.onResult === 'function') {
          params.onResult(e.result.bestTranscription.formattedString);
        }
        isFinal = e.result.isFinal;
        // e.result.bestTranscription.segments[e.result.bestTranscription.segments.length -1].substring
      }
      if (isFinal) {
        this.stop();
        if (typeof params.onFinish === 'function') {
          if (e.result) {
            params.onFinish(e.result.bestTranscription.formattedString);
          } else {
            params.onFinish('');
          }
        }
      }

      if (e.error) {
        if (e.error.code === 203) {
          //Retry
          this.onErrorHandler(this.Error.SPEECH_TIMEOUT);
        } else if (e.error.code === 209 || e.error.code === 216) {
          //TODO: empty statement
        } else {
          this.onErrorHandler(e.error.localizedDescription);
        }
      }
    });

    const recordingFormat = inputNode.outputFormatForBus(0);
    inputNode.installTap(0, 1024, recordingFormat, (e) => {
      if (this.recognitionRequest) {
        this.recognitionRequest.appendBuffer(e.buffer);
      }
    });

    this.avaudioengine.prepare();
    this.avaudioengine.start((e) => {
      this.onErrorHandler(this.Error.CLIENT);
    });
  }
  onErrorHandler(error) {
    if (!this.speechRecognizer) {
      return;
    }
    this.stop();
    this.sendError(error);
  }
  sendError(error) {
    if (typeof this.onErrorHandler === 'function') {
      this.onErrorHandler(error);
    }
  }
  ios = {
    isLocaleSupported(locale: string): boolean {
      let nslocale;
      if (locale) {
        nslocale = new __SF_NSLocale(locale);
      } else {
        nslocale = __SF_NSLocale.currentLocale();
      }
      return isLocaleSupport(nslocale);
    }
  };
  readonly Error: typeof RecognizerError & { android: typeof RecognizerAndroidError };
}

const SpeechRecognizerIOS = new SpeechRecognizerClass();

export default SpeechRecognizerIOS;
