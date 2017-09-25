var expect = require("chai").expect;
var assert = require("chai").assert;

const SpeechRecognizer = require("../../speechrecognizer");

salep.test("sf-core/global/speechrecognizer Unit Test", function() {
    var finished = false;
    var resultObject = null;
    var errorObject = null;

    this.case("[start] function.", function() {
        assert.doesNotThrow(function() {
            SpeechRecognizer.start({
                onResult: function(result) {
                    resultObject = result;
                },
                onFinish: function(result) {
                    finished = true;
                    resultObject = result;
                },
                onError: function(error) {
                    errorObject = error;
                }
            });
        }, Error);
    });

    this.case("[isRunning] function.", function() {
        assert.isTrue(SpeechRecognizer.isRunning(), 'isRunning() must be true');
    });

    this.case("[stop] function.", function() {
        assert.doesNotThrow(function() { SpeechRecognizer.stop(); }, Error);
    });
    
    this.case("[onError] callback.", function() {
        assert.isNull(errorObject,  'onError() must NOT be called');
    });

});
