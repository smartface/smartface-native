/**
 * @class console
 * @since 0.1
 *
 * console class represents debugging console of application.
 * You can access debugging console from Smartface Cloud IDE.
 * Logging to console doesn't require the console module. It can be used anywhere within your code.
 *
 *
 *     @example
 *     const Hardware = require('@smartface/native/device/hardware');
 *
 *     console.info("Device.Hardware.IMEI: ", Hardware.android.IMEI);
 *     console.error("Uncaught Exception!");
 */
declare const console: {
  /**
   * Logs message to the debugging console. You can pass multiple parameters.
   *
   *     @example
   *     var text = "Some text";
   *     console.log(text);
   *
   *     var number = 5432;
   *     console.log(number);
   *
   *     // multiple parameter
   *     console.log(number, text);
   *
   *     const Label = require('@smartface/native/ui/label');
   *     var myLabel = new Label({
   *         text: "This is my label"
   *     });
   *     console.log(myLabel.text);
   *
   * @param {Object} message Object to output to the console.
   * @method log
   * @static
   * @since 0.1
   */
  log: (...params: string[]) => void;
  /**
   * Logs error message to the debugging console. You can pass multiple parameters.
   *
   *     @example
   *     var errorMessage = "Error message";
   *     console.error(errorMessage);
   *
   * @param {Object} message Object to output to the console.
   * @method error
   * @static
   * @since 4.0.0
   */
  error: (...params: string[]) => void;
  /**
   * Logs an informational message to the debugging console. You can pass multiple parameters.
   *
   *     @example
   *     var infoMessage = "Informatinal message";
   *     console.info(infoMessage);
   *
   * @param {Object} message Object to output to the console.
   * @method info
   * @static
   * @since 4.0.0
   */
  info: (...params: string[]) => void;
  /**
   * Logs a warning message to the debugging console. You can pass multiple parameters.
   *
   *     @example
   *     var warningMessage = "Warning message";
   *     console.warn(warningMessage);
   *
   * @param {Object} message Object to output to the console.
   * @method warn
   * @static
   * @since 4.0.0
   */
  warn: (...params: string[]) => void;
  /**
   * Starts a timer for given name.
   *
   *     @example
   *     console.time("for-loop");
   *     for(let i = 0; i < 1000; i++) {
   *         // do something
   *     }
   *     console.timeEnd("for-loop");
   *
   * @param {String} [key="default"]
   * @method time
   * @static
   * @since 4.0.0
   */
  time: (key: string) => void;
  /**
   * Stops a timer that was previously started by given name. Logs the time to the debugging console in milliseconds.
   *
   *     @example
   *     console.time("for-loop");
   *     for(let i = 0; i < 1000; i++) {
   *         // do something
   *     }
   *     console.timeEnd("for-loop");
   *
   * @param {String} [key="default"]
   * @method timeEnd
   * @static
   * @since 4.0.0
   */
  timeEnd: (key: string) => void;
};

export = console;
