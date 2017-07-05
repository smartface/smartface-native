/**
 * @class SpeechRecognizer
 * @static
 * @since 1.1.13
 * 
 * @example
 *       const TextArea = require('sf-core/ui/textarea');
 *       const SpeechRecognizer = require("sf-core/speechrecognizer");
 *       const Button = require('sf-core/ui/button');
 *       var button = new Button();
 *       button.height = 100;
 *       button.text = "Start Recording"; 
 *       
 *       var textarea = new TextArea();
 *       textarea.height = 100;
 * 
 *       button.onPress = function(){
 *           if(!SpeechRecognizer.isRunning()){
 *               button.text = "Stop Recording"; 
 *               SpeechRecognizer.start({
 *                   onResult:function(result){
 *                       textarea.text = result;
 *                   },
 *                   onFinish  : function(result){
 *                       button.text = "Start Recording"; 
 *                       alert("Finish" + result);
 *                   },
 *                   onError : function(error){
 *                       button.text = "Start Recording";
 *                       alert("Error" + error);
 *                   }
 *               });
 *           }else{
 *               button.text = "Start Recording"; 
 *               SpeechRecognizer.stop();
 *           }
 *       }
 *       this.layout.addChild(textarea);
 *       this.layout.addChild(button);
 * 
 */
const SpeechRecognizer = {};

/**
 * Speech Recognizer start method.
 * 
 * @param {Object} params Object describing callbacks
 * @param {String} params.locale
 * @param {Function} params.onResult
 * @param {Object} params.onResult.params
 * @param {String} params.onResult.result
 * @param {Function} params.onFinish
 * @param {Object} params.onFinish.params
 * @param {String} params.onFinish.result
 * @param {Function} params.onError This event is called after getting errors.
 * @param {SpeechRecognizer.Error} params.onError.error
 * @method start
 * @android
 * @ios
 * @since 1.1.13
 */
SpeechRecognizer.start = function(params) {};

/**
 * Speech Recognizer stop method.
 * 
 * @method stop
 * @android
 * @ios
 * @since 1.1.13
 */
SpeechRecognizer.stop = function() {};

/**
 * Speech Recognizer isRunning method.
 * 
 * @method isRunning
 * @android
 * @ios
 * @since 1.1.13
 */
SpeechRecognizer.isRunning = function() {};

module.exports = SpeechRecognizer;