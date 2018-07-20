/**
 * @class UI.EmailComposer
 * @since 3.0.3
 * 
 * A standard interface for managing, editing, and sending an email message. When email composer is dismiss, page's onShow will be triggered.
 *
 *
 *     @example
 *    
 *     
 */
function EmailComposer(params) {}

/**
 * Sets the initial recipients to include in the email’s “CC” field.
 *
 * @param {String[]} cc
 * @android
 * @ios
 * @method setCC
 * @since 3.0.3
 */
EmailComposer.prototype.setCC = function(cc) {};


/**
 * Sets the initial recipients to include in the email’s “BCC” field.
 *
 * @param {String[]} bcc
 * @android
 * @ios
 * @method setBCC
 * @since 3.0.3
 */
EmailComposer.prototype.setBCC = function(bcc) {};


/**
 * Sets the initial recipients to include in the email’s “TO” field.
 *
 * @param {String[]} to
 * @android
 * @ios
 * @method setTO
 * @since 3.0.3
 */
EmailComposer.prototype.setTO = function(to) {};


/**
 * Sets the initial body text to include in the email composer.
 *
 * @param {String} text
 * @param {Boolean} [isHtmlText = false]
 * @android
 * @ios
 * @method setMessage
 * @since 3.0.3
 */
EmailComposer.prototype.setMessage = function(text, isHtmlText) {};

/**
 * Sets the initial text for the subject line of the email composer.
 *
 * @param {String} subject
 * @android
 * @ios
 * @method setSubject
 * @since 3.0.3
 */
EmailComposer.prototype.setSubject = function(subject) {};


/**
 * Sets the initial text for the subject line of the email composer.
 *
 * @param {String} subject
 * @android
 * @ios
 * @method setSubject
 * @since 3.0.3
 */
EmailComposer.prototype.setSubject = function(subject) {};

/**
 * Attach the given file to email composer.
 *
 * @param {IO.File} file
 * @android
 * @method addAttachmentForAndroid
 * @since 3.0.3
 */
EmailComposer.prototype.addAttachmentForAndroid = function(file) {};

/**
 * Attach the given file to email composer.
 *
 * @param {Blob} blob
 * @param {String} mimeType
 * @param {String} fileName
 * @ios
 * @method addAttachmentForiOS
 * @since 3.0.3
 */
EmailComposer.prototype.addAttachmentForiOS = function(blob,mimeType,fileName) {};



/**
 * Sets the initial text for the subject line of the email.
 *
 * @param {String} subject
 * @android
 * @ios
 * @method setSubject
 * @since 3.0.3
 */
EmailComposer.prototype.setSubject = function(subject) {};


/**
 * This function shows email composer on the given UI.Page.
 *
 * @param {UI.Page} page This is the page that email will be shown.
 * @android
 * @ios
 * @method show
 * @since 3.0.3
 */
EmailComposer.prototype.show = function(page) {};


/**
 * This function will be triggered when email composer is closed.
 *
 * @param {UI.Page} page This is the page that email will be shown.
 * @android
 * @ios
 * @method onClose
 * @since 3.0.3
 */
EmailComposer.prototype.onClose = function(result) {};



module.exports = Email;
