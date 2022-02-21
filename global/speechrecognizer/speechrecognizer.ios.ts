import Hardware from '../../device/hardware';
import Timer from '../timer';
import { SpeechRecognizerAndroidError, SpeechRecognizerBase, SpeechRecognizerError } from './speechrecognizer';

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

class SpeechRecognizerIOS implements SpeechRecognizerBase {
  static recognitionTask: any;
  static recognitionRequest: any;
  static avaudiosession: any;
  static avaudioengine: __SF_AVAudioEngine;
  static speechRecognizer: __SF_SFSpeechRecognizer;
  static speechDelegate: __SF_SFSpeechRecognizerDelegate;
  static start(params: { locale: string; onResult: (result: any) => void; onFinish: (result: any) => void; onError: (error: SpeechRecognizerError) => void }): void {
    SpeechRecognizerIOS.stop();
    SpeechRecognizerIOS.onErrorHandler = params.onError;

    __SF_SFSpeechRecognizer.speechRequestAuthorization(function (e: { status: SFSpeechRecognizerAuthorizationStatus }) {
      if (e.status === SFSpeechRecognizerAuthorizationStatus.authorized) {
        Hardware.ios.microphone.requestRecordPermission(function (granted) {
          if (granted) {
            __SF_Dispatch.mainAsyncAfter(function () {
              SpeechRecognizerIOS.createRecognizer(params);
            }, 200);
          } else {
            SpeechRecognizerIOS.onErrorHandler(SpeechRecognizerIOS.Error.INSUFFICIENT_PERMISSIONS);
          }
        });
      } else {
        SpeechRecognizerIOS.onErrorHandler(SpeechRecognizerIOS.Error.INSUFFICIENT_PERMISSIONS);
      }
    });
  }
  static isRunning(): boolean {
    if (SpeechRecognizerIOS.avaudioengine) {
      return SpeechRecognizerIOS.avaudioengine.isRunning;
    } else {
      return false;
    }
  }
  static stop(): void {
    if (!SpeechRecognizerIOS.speechRecognizer) {
      return;
    }

    const myTimer = Timer.setTimeout({
      task: function () {
        __SF_Dispatch.mainAsync(function () {
          if (SpeechRecognizerIOS.recognitionTask) {
            SpeechRecognizerIOS.recognitionTask.cancel();
            SpeechRecognizerIOS.recognitionTask = undefined;
          }

          if (SpeechRecognizerIOS.avaudioengine && SpeechRecognizerIOS.avaudioengine.isRunning) {
            SpeechRecognizerIOS.avaudioengine.stop();
            SpeechRecognizerIOS.avaudioengine.inputNode.removeTapOnBus(0);
            if (SpeechRecognizerIOS.recognitionRequest) {
              SpeechRecognizerIOS.recognitionRequest.endAudio();
            }
          }

          SpeechRecognizerIOS.avaudioengine = undefined;
          SpeechRecognizerIOS.recognitionRequest = undefined;
          SpeechRecognizerIOS.speechRecognizer = undefined;
        });
      },
      delay: 100
    });
  }
  static createRecognizer(params: { locale: string; onResult: (result: any) => void; onFinish: (result: any) => void; onError: (error: SpeechRecognizerError) => void }) {
    if (SpeechRecognizerIOS.speechRecognizer) {
      return;
    }

    if (params.locale) {
      if (isLocaleSupport(new __SF_NSLocale(params.locale))) {
        SpeechRecognizerIOS.speechRecognizer = new __SF_SFSpeechRecognizer(new __SF_NSLocale(params.locale));
      } else {
        SpeechRecognizerIOS.sendError(SpeechRecognizerIOS.Error.SERVER);
        return;
      }
    } else {
      if (isLocaleSupport(__SF_NSLocale.currentLocale())) {
        SpeechRecognizerIOS.speechRecognizer = new __SF_SFSpeechRecognizer(__SF_NSLocale.currentLocale());
      } else {
        SpeechRecognizerIOS.sendError(SpeechRecognizerIOS.Error.SERVER);
        return;
      }
    }

    SpeechRecognizerIOS.avaudioengine = new __SF_AVAudioEngine();
    SpeechRecognizerIOS.recognitionRequest = undefined;
    SpeechRecognizerIOS.recognitionTask = undefined;
    SpeechRecognizerIOS.speechDelegate = new __SF_SFSpeechRecognizerDelegate();

    SpeechRecognizerIOS.speechDelegate.speechRecognizerAvailabilityDidChange = function (e) {
      if (!e.available) {
        SpeechRecognizerIOS.onErrorHandler(SpeechRecognizerIOS.Error.NETWORK);
      }
    };

    SpeechRecognizerIOS.speechRecognizer.delegate = SpeechRecognizerIOS.speechDelegate;

    if (SpeechRecognizerIOS.recognitionTask) {
      SpeechRecognizerIOS.recognitionTask.cancel();
      SpeechRecognizerIOS.recognitionTask = undefined;
    }

    SpeechRecognizerIOS.avaudiosession = __SF_AVAudioSession.sharedInstance();

    const isOtherAudioPlaying = SpeechRecognizerIOS.avaudiosession.valueForKey('isOtherAudioPlaying');

    if (isOtherAudioPlaying) {
      SpeechRecognizerIOS.onErrorHandler(SpeechRecognizerIOS.Error.NETWORK);
      return;
    }

    SpeechRecognizerIOS.avaudiosession.setCategory('AVAudioSessionCategoryRecord', function (e) {
      SpeechRecognizerIOS.onErrorHandler(SpeechRecognizerIOS.Error.CLIENT);
      return;
    });
    SpeechRecognizerIOS.avaudiosession.setMode('AVAudioSessionModeMeasurement', function (e) {
      SpeechRecognizerIOS.onErrorHandler(SpeechRecognizerIOS.Error.CLIENT);
      return;
    });

    SpeechRecognizerIOS.avaudiosession.setActiveWithOptions(true, 1, function (e) {
      SpeechRecognizerIOS.onErrorHandler(SpeechRecognizerIOS.Error.CLIENT);
      return;
    });

    SpeechRecognizerIOS.recognitionRequest = new __SF_SFSpeechAudioBufferRecognitionRequest();

    const inputNode = SpeechRecognizerIOS.avaudioengine.inputNode;
    if (!inputNode) {
      SpeechRecognizerIOS.onErrorHandler(SpeechRecognizerIOS.Error.CLIENT);
      return;
    }

    if (!SpeechRecognizerIOS.recognitionRequest) {
      SpeechRecognizerIOS.onErrorHandler(SpeechRecognizerIOS.Error.CLIENT);
      return;
    }

    SpeechRecognizerIOS.recognitionRequest.shouldReportPartialResults = true;

    SpeechRecognizerIOS.recognitionTask = SpeechRecognizerIOS.speechRecognizer.recognitionTask(SpeechRecognizerIOS.recognitionRequest, function (e) {
      let isFinal = false;
      if (e.result) {
        if (typeof params.onResult === 'function') {
          params.onResult(e.result.bestTranscription.formattedString);
        }
        isFinal = e.result.isFinal;
        // e.result.bestTranscription.segments[e.result.bestTranscription.segments.length -1].substring
      }

      if (isFinal) {
        SpeechRecognizerIOS.stop();
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
          SpeechRecognizerIOS.onErrorHandler(SpeechRecognizerIOS.Error.SPEECH_TIMEOUT);
        } else if (e.error.code === 209 || e.error.code === 216) {
          //TODO: empty statement
        } else {
          SpeechRecognizerIOS.onErrorHandler(e.error.localizedDescription);
        }
      }
    });

    const recordingFormat = inputNode.outputFormatForBus(0);
    inputNode.installTap(0, 1024, recordingFormat, function (e) {
      if (SpeechRecognizerIOS.recognitionRequest) {
        SpeechRecognizerIOS.recognitionRequest.appendBuffer(e.buffer);
      }
    });

    SpeechRecognizerIOS.avaudioengine.prepare();
    SpeechRecognizerIOS.avaudioengine.start(function (e) {
      SpeechRecognizerIOS.onErrorHandler(SpeechRecognizerIOS.Error.CLIENT);
    });
  }
  static onErrorHandler(error) {
    if (!SpeechRecognizerIOS.speechRecognizer) {
      return;
    }
    SpeechRecognizerIOS.stop();
    SpeechRecognizerIOS.sendError(error);
  }
  static sendError(error) {
    if (typeof SpeechRecognizerIOS.onErrorHandler === 'function') {
      SpeechRecognizerIOS.onErrorHandler(error);
    }
  }
  static ios = {
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
  static readonly Error: typeof SpeechRecognizerError & { android: typeof SpeechRecognizerAndroidError };
}

export default SpeechRecognizerIOS;
