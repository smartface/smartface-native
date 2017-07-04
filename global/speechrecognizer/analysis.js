/**
 * @class SpeechRecognizer
 * @static
 * @since 1.1.13
 * 
 * 
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