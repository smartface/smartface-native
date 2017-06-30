const Hardware = require("sf-core/device/hardware");

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
    if (SpeechRecognizer.speechRecognizer) {
        SpeechRecognizer.stop();
    }
    
    SpeechRecognizer.onError = params.onError;
    
    if (params.locale) {
        SpeechRecognizer.speechRecognizer = new __SF_SFSpeechRecognizer(params.locale);    
    }else{
        SpeechRecognizer.speechRecognizer = new __SF_SFSpeechRecognizer(__SF_NSLocale.currentLocale()); 
    }
    
    SpeechRecognizer.avaudioengine = new __SF_AVAudioEngine();
    SpeechRecognizer.recognitionRequest = undefined;
    SpeechRecognizer.recognitionTask = undefined;
    SpeechRecognizer.speechDelegate = new __SF_SFSpeechRecognizerDelegate();
    
    SpeechRecognizer.speechRecognizer.delegate = SpeechRecognizer.speechDelegate;
    
    SpeechRecognizer.speechDelegate.speechRecognizerAvailabilityDidChange = function(e){
        if(!e.available){
            SpeechRecognizer.onErrorHandler("");
        }
    }
        
    __SF_SFSpeechRecognizer.speechRequestAuthorization(function(e){
        if(e.status == SFSpeechRecognizerAuthorizationStatus.authorized){
          
        }else{
           SpeechRecognizer.onErrorHandler(""); 
        }
    });
    
    Hardware.ios.microphone.requestRecordPermission(function(granted){
        if(!granted){
            SpeechRecognizer.onErrorHandler(""); 
        }
    });
    
    if (SpeechRecognizer.recognitionTask) {
        SpeechRecognizer.recognitionTask.cancel();
        SpeechRecognizer.recognitionTask = undefined;
    }
            
    SpeechRecognizer.avaudiosession = __SF_AVAudioSession.sharedInstance();
    
    SpeechRecognizer.avaudiosession.setCategory("AVAudioSessionCategoryRecord",function(e){
        SpeechRecognizer.onErrorHandler(e.error.localizedDescription);
    });
    SpeechRecognizer.avaudiosession.setMode("AVAudioSessionModeMeasurement",function(e){
        SpeechRecognizer.onErrorHandler(e.error.localizedDescription);
    });
    
    SpeechRecognizer.avaudiosession.setActiveWithOptions(true,1,function(e){
        SpeechRecognizer.onErrorHandler(e.error.localizedDescription);
    });
    
    SpeechRecognizer.recognitionRequest = new __SF_SFSpeechAudioBufferRecognitionRequest();
    
    var inputNode = SpeechRecognizer.avaudioengine.inputNode;
    if (!inputNode) {
        SpeechRecognizer.onErrorHandler("Audio engine has no input node");
    }
    
    if (!SpeechRecognizer.recognitionRequest) { 
        SpeechRecognizer.onErrorHandler("Unable to create an SFSpeechAudioBufferRecognitionRequest object");
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
            SpeechRecognizer.stop();
            if (e.error.code == 203) { //Retry
                if (typeof params.onFinish === 'function'){
                    if (e.result) {
                        params.onFinish(e.result.bestTranscription.formattedString);
                    }else{
                        params.onFinish();
                    }
                }
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
        SpeechRecognizer.onErrorHandler("");
    });
};

SpeechRecognizer.stop = function() {
    if (SpeechRecognizer.avaudioengine && SpeechRecognizer.avaudioengine.isRunning) {
        SpeechRecognizer.avaudioengine.stop();
        SpeechRecognizer.avaudioengine.inputNode.removeTapOnBus(0);
        if (SpeechRecognizer.recognitionRequest) {
            SpeechRecognizer.recognitionRequest.endAudio();
        }
    }
    
    SpeechRecognizer.avaudioengine = undefined;
    SpeechRecognizer.recognitionRequest = undefined;
    SpeechRecognizer.recognitionTask = undefined;
    SpeechRecognizer.speechRecognizer = undefined;
};

SpeechRecognizer.onErrorHandler = function(error){
    SpeechRecognizer.stop();
    if (typeof SpeechRecognizer.onError === 'function') {
        SpeechRecognizer.onError();
    }
}
module.exports = SpeechRecognizer;