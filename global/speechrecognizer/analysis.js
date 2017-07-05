/**
 * @class SpeechRecognizer
 * @static
 * @since 1.1.13
 * 
 * SpeechRecognizer class provides access to the speech recognition service.
 * 
 * @example
 *       const TextArea = require('sf-core/ui/textarea');
 *       const SpeechRecognizer = require("sf-core/speechrecognizer");
 *       const Application = require("sf-core/application"); 
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
 *               if(Device.OS === "iOS") {
 *                   startSpeechRecognizer();
 *               }
 *               else if(Device.OS === "Android") {
 *                   const RECORD_AUDIO_CODE = 1002, WRITE_EXTERNAL_STORAGE_CODE = 1003;
 *                   Application.android.requestPermissions(WRITE_EXTERNAL_STORAGE_CODE, Application.android.Permissions.WRITE_EXTERNAL_STORAGE);
 *                   Application.android.onRequestPermissionsResult = function(e){
 *                       if(e.requestCode === WRITE_EXTERNAL_STORAGE_CODE && e.result) {
 *                           Application.android.requestPermissions(RECORD_AUDIO_CODE, Application.android.Permissions.RECORD_AUDIO);
 *                       }
 *                       else if(e.requestCode === RECORD_AUDIO_CODE && e.result) {
 *                           startSpeechRecognizer();
 *                       }
 *                   }
 *               }
 *           }else{
 *               button.text = "Start Recording"; 
 *               SpeechRecognizer.stop();
 *           }
 *       }
 * 
 *       this.layout.addChild(textarea);
 *       this.layout.addChild(button);
 * 
 *       function startSpeechRecognizer() {
 *           SpeechRecognizer.start({
 *               onResult:function(result){
 *                   textarea.text = result;
 *               },
 *               onFinish  : function(result){
 *                   button.text = "Start Recording"; 
 *                   alert("Finish" + result);
 *               },
 *               onError : function(error){
 *                   button.text = "Start Recording";
 *                   alert("Error" + error);
 *               }
 *           });
 *       }
 * 
 */
const SpeechRecognizer = {};

/**
 * Starts speech recognition service.
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
 * Stop speech recognition service.
 * 
 * @method stop
 * @android
 * @ios
 * @since 1.1.13
 */
SpeechRecognizer.stop = function() {};

/**
 * Returns whether speech recognition service runs or not.
 * 
 * @method isRunning
 * @android
 * @ios
 * @since 1.1.13
 */
SpeechRecognizer.isRunning = function() {};

module.exports = SpeechRecognizer;