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
 *     var myButton = new Button({
 *         height: 100,
 *         text: "Start Recording"
 *     });
 *       
 *     var myTextArea = new TextArea({
 *         height: 100
 *     });
 * 
 *     myButton.onPress = function(){
 *         if(!SpeechRecognizer.isRunning()){
 *             myButton.text = "Stop Recording"; 
 *             if(System.OS === "iOS") {
 *                 startSpeechRecognizer();
 *             }
 *             else if(System.OS === "Android") {
 *                 const RECORD_AUDIO_CODE = 1002;
 *                 Application.android.requestPermissions(RECORD_AUDIO_CODE, Application.Android.Permissions.RECORD_AUDIO);
 *                 Application.android.onRequestPermissionsResult = function(e){
 *                     if(e.requestCode === RECORD_AUDIO_CODE && e.result) {
 *                         startSpeechRecognizer();
 *                     }
 *                  }
 *              }
 *          }else{
 *              myButton.text = "Start Recording"; 
 *              SpeechRecognizer.stop();
 *          }
 *      }
 * 
 *      this.layout.addChild(myTextArea);
 *      this.layout.addChild(myButton);
 * 
 *      function startSpeechRecognizer() {
 *          SpeechRecognizer.start({
 *              onResult:function(result){
 *                  myTextArea.text = result;
 *              },
 *              onFinish  : function(result){
 *                  myButton.text = "Start Recording"; 
 *                  alert("Finish : " + result);
 *              },
 *              onError : function(error){
 *                  myButton.text = "Start Recording";
 *                  alert("Error : " + error);
 *              }
 *          });
 *      }
 */
const SpeechRecognizer = {};

/**
 * Starts speech recognition service. {@link Application.Android.Permissions#RECORD_AUDIO} is required for Android platform.
 * 
 * @param {Object} params Object describing callbacks
 * @param {String} [params.locale] IETF language tag for example "en_US"
 * @param {Function} params.onResult Triggers when partial recognition results are available.
 * @param {String} params.onResult.result
 * @param {Function} params.onFinish Triggers when recognition result is ready.
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
 * Returns speech recognition supported locale or not supported. Locale parameter must be empty to check current locale.
 * 
 * @param {String} IETF language tag for example "en-US"
 * @method isLocaleSupported
 * @return {Boolean}
 * @ios
 * @since 1.1.16
 */
SpeechRecognizer.ios.isLocaleSupported = function(locale){};

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
SpeechRecognizer.Error.INSUFFICIENT_PERMISSIONS = "INSUFFICIENT_PERMISSIONS";

/**
 * @property {String} NETWORK
 * @android
 * @ios
 * @static
 * @readonly
 * @since 1.1.13
 */
SpeechRecognizer.Error.NETWORK = "NETWORK";

/**
 * @property {String} NETWORK_TIMEOUT
 * @android
 * @ios
 * @static
 * @readonly
 * @since 1.1.13
 */
SpeechRecognizer.Error.NETWORK_TIMEOUT = "NETWORK_TIMEOUT";

/**
 * @property {String} SPEECH_TIMEOUT
 * @android
 * @ios
 * @static
 * @readonly
 * @since 1.1.13
 */
SpeechRecognizer.Error.SPEECH_TIMEOUT = "SPEECH_TIMEOUT";

/**
 * @property {String} CLIENT
 * @android
 * @ios
 * @static
 * @readonly
 * @since 1.1.13
 */
SpeechRecognizer.Error.CLIENT = "CLIENT";

/**
 * @property {String} SERVER
 * @android
 * @ios
 * @static
 * @readonly
 * @since 1.1.13
 */
SpeechRecognizer.Error.SERVER = "SERVER";

SpeechRecognizer.Error.android = {};

/**
 * @property {String} AUDIO
 * @android
 * @static
 * @readonly
 * @since 1.1.13
 */
SpeechRecognizer.Error.android.AUDIO = "AUDIO";

/**
 * @property {String} NO_MATCH
 * @android
 * @static
 * @readonly
 * @since 1.1.13
 */
SpeechRecognizer.Error.android.NO_MATCH = "NO_MATCH";

/**
 * @property {String} RECOGNIZER_BUSY
 * @android
 * @static
 * @readonly
 * @since 1.1.13
 */
SpeechRecognizer.Error.android.RECOGNIZER_BUSY = "RECOGNIZER_BUSY";

module.exports = SpeechRecognizer;