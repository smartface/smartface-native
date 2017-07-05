/**
 * @class SpeechRecognizer
 * @static
 * @since 1.1.13
 * 
 * SpeechRecognizer class provides access to the speech recognition service.
 * 
 *     @example
 *     const TextArea = require('sf-core/ui/textarea');
 *     const SpeechRecognizer = require("sf-core/speechrecognizer");
 *     const Application = require("sf-core/application"); 
 *     const Button = require('sf-core/ui/button');
 *     const System = require('sf-core/device/system');
 *     var button = new Button();
 *     button.height = 100;
 *     button.text = "Start Recording"; 
 *       
 *     var textarea = new TextArea();
 *     textarea.height = 100;
 * 
 *     button.onPress = function(){
 *         if(!SpeechRecognizer.isRunning()){
 *             button.text = "Stop Recording"; 
 *             if(System.OS === "iOS") {
 *                 startSpeechRecognizer();
 *             }
 *             else if(System.OS === "Android") {
 *                 const RECORD_AUDIO_CODE = 1002;
 *                 Application.android.requestPermissions(RECORD_AUDIO_CODE, Application.android.Permissions.RECORD_AUDIO);
 *                 Application.android.onRequestPermissionsResult = function(e){
 *                     if(e.requestCode === RECORD_AUDIO_CODE && e.result) {
 *                         startSpeechRecognizer();
 *                     }
 *                  }
 *              }
 *          }else{
 *              button.text = "Start Recording"; 
 *              SpeechRecognizer.stop();
 *          }
 *      }
 * 
 *      this.layout.addChild(textarea);
 *      this.layout.addChild(button);
 * 
 *      function startSpeechRecognizer() {
 *          SpeechRecognizer.start({
 *              onResult:function(result){
 *                  textarea.text = result;
 *              },
 *              onFinish  : function(result){
 *                  button.text = "Start Recording"; 
 *                  alert("Finish : " + result);
 *              },
 *              onError : function(error){
 *                  button.text = "Start Recording";
 *                  alert("Error : " + error);
 *              }
 *          });
 *      }
 */
const SpeechRecognizer = {};

/**
 * Starts speech recognition service. {@link Application.android.Permissions#RECORD_AUDIO} is required for Android platform.
 * 
 * @param {Object} params Object describing callbacks
 * @param {String} params.locale
 * @param {Function} params.onResult
 * @param {String} params.onResult.result
 * @param {Function} params.onFinish
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
 * @return {Boolean}
 * @android
 * @ios
 * @since 1.1.13
 */
SpeechRecognizer.isRunning = function() {};

/**
 * @enum {String} SpeechRecognizer.Error
 * @since 1.1.13
 */
SpeechRecognizer.Error = {};

/**
 * @property {String} INSUFFICIENT_PERMISSIONS
 * @android
 * @ios
 * @static
 * @readonly
 * @since 1.1.13
 */
SpeechRecognizer.Error.INSUFFICIENT_PERMISSIONS = 0;

/**
 * @property {String} NETWORK
 * @android
 * @ios
 * @static
 * @readonly
 * @since 1.1.13
 */
SpeechRecognizer.Error.NETWORK = 0;

/**
 * @property {String} NETWORK_TIMEOUT
 * @android
 * @ios
 * @static
 * @readonly
 * @since 1.1.13
 */
SpeechRecognizer.Error.NETWORK_TIMEOUT = 0;

/**
 * @property {String} SPEECH_TIMEOUT
 * @android
 * @ios
 * @static
 * @readonly
 * @since 1.1.13
 */
SpeechRecognizer.Error.SPEECH_TIMEOUT = 0;

/**
 * @property {String} CLIENT
 * @android
 * @ios
 * @static
 * @readonly
 * @since 1.1.13
 */
SpeechRecognizer.Error.CLIENT = 0;

SpeechRecognizer.Error.android = {};

/**
 * @property {String} AUDIO
 * @android
 * @static
 * @readonly
 * @since 1.1.13
 */
SpeechRecognizer.Error.android.AUDIO = 0;

/**
 * @property {String} NO_MATCH
 * @android
 * @static
 * @readonly
 * @since 1.1.13
 */
SpeechRecognizer.Error.android.NO_MATCH = 0;

/**
 * @property {String} RECOGNIZER_BUSY
 * @android
 * @static
 * @readonly
 * @since 1.1.13
 */
SpeechRecognizer.Error.android.RECOGNIZER_BUSY = 0;

/**
 * @property {String} SERVER
 * @android
 * @static
 * @readonly
 * @since 1.1.13
 */
SpeechRecognizer.Error.android.SERVER = 0;


module.exports = SpeechRecognizer;