/**
 * @class Timer
 * @since 0.1
 * 
 * Timer allows you to create, start and clear timers.
 * 
 *     @example
 *     const Button = require("nf-core/ui/button")
 *     const Timer = require("nf-core/global/timer");
 *     var myButton = new Button({
 *         onPress: setTimer
 *     });
 * 
 *     function setTimer() {     
 *         var myTimer = Timer.setTimeout({
 *             task: changeBackgroundColor,
 *             delay: 3000 
 *         });
 *     }
 * 
 *     const Color = require("nf-core/ui/color");
 *     function changeBackgroundColor() {
 *         myButton.backgroundColor = Color.RED;
 *     }
 *     
 * 
 */
function Timer() {}

/**
 * @method setTimeout
 * 
 * Calls a function after a spesified time elapses.
 * 
 * @param {Object} params Parameters
 * @param {Function} params.task Function to be called
 * @param {Number} params.delay Time elapsed in millisecond
 * @return {Timer} 
 * @static
 * @since 0.1
 */
Timer.setTimeout = function(params) {};

/**
 * @method setInterval
 * 
 * Calls a function repeatedly after a spesified time elapses.
 * 
 * @param {Object} params Parameters
 * @param {Function} params.task Function to be called
 * @param {Number} params.delay Time elapsed in millisecond
 * @return {Timer} 
 * @static
 * @since 0.1
 */
Timer.setInterval = function(params) {};

/**
 * @method clearTimeout
 * 
 * Clears a spesified Timer instance.
 * 
 * @param {Timer} timer
 * @static
 * @since 0.1
 */
Timer.clearTimer = function(timer) {};


module.exports = Timer;