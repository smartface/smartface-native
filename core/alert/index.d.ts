/**
 * Smartface global alert replacer
 * @module alert
 * @type {object}
 * @author Alper Ozisik <alper.ozisik@smartface.io>
 * @author Furkan Arabacı <furkan.arabaci@smartface.io>
 * @copyright Smartface 2018
 */
import AlertView from "../../../ui/alertview";
interface AlertButton {
  type: AlertView.Android.ButtonType;
  text: string;
  onClick: () => void;
}
interface AlertOptions {
  message: string;
  title?: string;
  defaultButtonText?: string;
  buttons?: AlertButton[];
}
/**
 * Creates a new AlertView instance and automatically shows it
 * @function alert
 * @param {object|string} options is the alert options or the string to display as message. If object is used, it is automatically passed as constructor to the AlertView
 * @param {string} options.message sets message of AlertView
 * @param {string} options.title sets title of AlertView
 * @param {AlertButton[]} options.buttons shows OK if omited
 * @param {string} title optinal title
 * @returns {UI.AlertView} created AlertView object
 * @see {@link https://developer.smartface.io/docs/alertview|AlertView Guide}
 * @see {@link http://ref.smartface.io/#!/api/UI.AlertView.Android.ButtonType|Button Types}
 * @example
 * ```
 * alert("Hello World!");
 * ```
 * @example
 * ```
 * alert({
 *  message: "message",
 *  title: "title", //optional
 *  defaultButtonText: "Okay"
 * });
 * ```
 * @example
 * ```
 * alert({
 *  message: "Would you like to answer?",
 *  title: "Question", //optional
 *  buttons: [
 *      {
 *          text: "Yes",
 *          type: AlertView.Android.ButtonType.POSITIVE,
 *          onClick: function() {
 *              //handle yes answer here
 *          },
 *      },
 *      {
 *          text: "No",
 *          type: AlertView.Android.ButtonType.NEGATIVE,
 *          onClick: function() {
 *              //handle no answer here
 *          },
 *      }
 *  ]});
 * ```
 * @example
 * ```
 * const alertView = alert({ message:"this is an alert", buttons: [] }); //alert without buttons
 * setTimeout(() => alertView.dismiss(), 2000); //closes the alert after 2 seconds
 * ```
 */
declare function alert(options: string | AlertOptions, title?: string): AlertView;
export = alert;
