const Hardware = require("sf-core/device/hardware");
const Timer = require("sf-core/global/timer");

const SpeechRecognizer = {};

// __SF_SFSpeechRecognizer.supportedLocalesToArray()[0].identifier 
// self.speech.isAvailable

const SFSpeechRecognizerAuthorizationStatus = {
    notDetermined : 0,
    denied : 1,
    restricted : 2,
    authorized : 3
}

SpeechRecognizer.start = function(params) {
    SpeechRecognizer.stop();
    SpeechRecognizer.onError = params.onError;
    
    __SF_SFSpeechRecognizer.speechRequestAuthorization(function(e){
        if(e.status == SFSpeechRecognizerAuthorizationStatus.authorized){
            
            Hardware.ios.microphone.requestRecordPermission(function(granted){
                if(granted){
                    __SF_Dispatch.mainAsyncAfter(function(){
                            SpeechRecognizer.createRecognizer(params);
                    },200);
                }else{
                    SpeechRecognizer.onErrorHandler(SpeechRecognizer.Error.INSUFFICIENT_PERMISSIONS); 
                }
            });
            
        }else{
           SpeechRecognizer.onErrorHandler(SpeechRecognizer.Error.INSUFFICIENT_PERMISSIONS); 
        }
    });
};

SpeechRecognizer.isRunning = function(){
    if (SpeechRecognizer.avaudioengine) {
        return SpeechRecognizer.avaudioengine.isRunning;
    }else{
        return false;
    }
}

SpeechRecognizer.stop = function() {
    if (!SpeechRecognizer.speechRecognizer) {
        return;
    }
    
    var myTimer = Timer.setTimeout({
    task: function(){
            __SF_Dispatch.mainAsync(function(){
                if (SpeechRecognizer.recognitionTask) {
                    SpeechRecognizer.recognitionTask.cancel();
                    SpeechRecognizer.recognitionTask = undefined;
                }
                
                if (SpeechRecognizer.avaudioengine && SpeechRecognizer.avaudioengine.isRunning) {
                    SpeechRecognizer.avaudioengine.stop();
                    SpeechRecognizer.avaudioengine.inputNode.removeTapOnBus(0);
                    if (SpeechRecognizer.recognitionRequest) {
                        SpeechRecognizer.recognitionRequest.endAudio();
                    }
                }
                
                SpeechRecognizer.avaudioengine = undefined;
                SpeechRecognizer.recognitionRequest = undefined;
                SpeechRecognizer.speechRecognizer = undefined;
            });
        },
        delay: 100
    });
};

SpeechRecognizer.createRecognizer = function(params){
    if (SpeechRecognizer.speechRecognizer) {
        return;
    }
    
    if (params.locale) {
        SpeechRecognizer.speechRecognizer = new __SF_SFSpeechRecognizer(new __SF_NSLocale(params.locale));    
    }else{
        SpeechRecognizer.speechRecognizer = new __SF_SFSpeechRecognizer(__SF_NSLocale.currentLocale()); 
    }
    
    SpeechRecognizer.avaudioengine = new __SF_AVAudioEngine();
    SpeechRecognizer.recognitionRequest = undefined;
    SpeechRecognizer.recognitionTask = undefined;
    SpeechRecognizer.speechDelegate = new __SF_SFSpeechRecognizerDelegate();
    
    SpeechRecognizer.speechDelegate.speechRecognizerAvailabilityDidChange = function(e){
        if(!e.available){
            SpeechRecognizer.onErrorHandler(SpeechRecognizer.Error.NETWORK);
        }
    }
    
    SpeechRecognizer.speechRecognizer.delegate = SpeechRecognizer.speechDelegate;
    
    if (SpeechRecognizer.recognitionTask) {
        SpeechRecognizer.recognitionTask.cancel();
        SpeechRecognizer.recognitionTask = undefined;
    }
            
    SpeechRecognizer.avaudiosession = __SF_AVAudioSession.sharedInstance();
    
    SpeechRecognizer.avaudiosession.setCategory("AVAudioSessionCategoryRecord",function(e){
        SpeechRecognizer.onErrorHandler(SpeechRecognizer.Error.CLIENT);
    });
    SpeechRecognizer.avaudiosession.setMode("AVAudioSessionModeMeasurement",function(e){
        SpeechRecognizer.onErrorHandler(SpeechRecognizer.Error.CLIENT);
    });
    
    SpeechRecognizer.avaudiosession.setActiveWithOptions(true,1,function(e){
        SpeechRecognizer.onErrorHandler(SpeechRecognizer.Error.CLIENT);
    });
    
    SpeechRecognizer.recognitionRequest = new __SF_SFSpeechAudioBufferRecognitionRequest();
    
    var inputNode = SpeechRecognizer.avaudioengine.inputNode;
    if (!inputNode) {
        SpeechRecognizer.onErrorHandler(SpeechRecognizer.Error.CLIENT);
    }
    
    if (!SpeechRecognizer.recognitionRequest) { 
        SpeechRecognizer.onErrorHandler(SpeechRecognizer.Error.CLIENT);
    }
    
    SpeechRecognizer.recognitionRequest.shouldReportPartialResults = true;
    
    SpeechRecognizer.recognitionTask = SpeechRecognizer.speechRecognizer.recognitionTask(SpeechRecognizer.recognitionRequest,function(e){
        var isFinal = false;
        if (e.result) {
            if (typeof params.onResult === 'function') {
                params.onResult(e.result.bestTranscription.formattedString);
            }
            isFinal = e.result.isFinal
            // e.result.bestTranscription.segments[e.result.bestTranscription.segments.length -1].substring
        }
        
        if (isFinal) {
            SpeechRecognizer.stop();
            if (typeof params.onFinish === 'function'){
                if (e.result) {
                    params.onFinish(e.result.bestTranscription.formattedString);
                }else{
                    params.onFinish();
                }
            }
        }
        
        if (e.error) {
            if (e.error.code == 203) { //Retry
                SpeechRecognizer.onErrorHandler(SpeechRecognizer.Error.SPEECH_TIMEOUT);
            }else if (e.error.code == 209 || e.error.code == 216){
                
            }else{
                SpeechRecognizer.onErrorHandler(e.error.localizedDescription);
            }
        }
        
    });
    
    var recordingFormat = inputNode.outputFormatForBus(0);
    inputNode.installTap(0,1024,recordingFormat,function(e){
        if (SpeechRecognizer.recognitionRequest) {
            SpeechRecognizer.recognitionRequest.appendBuffer(e.buffer);
        }
    });
    
    SpeechRecognizer.avaudioengine.prepare();
    SpeechRecognizer.avaudioengine.start(function(e){
        SpeechRecognizer.onErrorHandler(SpeechRecognizer.Error.CLIENT);
    });
}

SpeechRecognizer.onErrorHandler = function(error){
    if (!SpeechRecognizer.speechRecognizer) {
        return;
    }
    
    SpeechRecognizer.stop();
    
    if (typeof SpeechRecognizer.onError === 'function') {
        SpeechRecognizer.onError(error);
    }
    
}

SpeechRecognizer.Error = require("./error");

module.exports = SpeechRecognizer;