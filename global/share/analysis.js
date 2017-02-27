/**
 * @class Share
 * @static
 * @since 0.1
 * 
 * Share allows sending a text, an image or a file over 
 * other apps on the device. 
 * 
 */
const Share = {};

Object.defineProperties(Share, {
   /**
    *
    * @method shareText
    * @param {String} text
    * @param {Array} [blacklist]
    * @since 0.1
    */
    'shareText': {
        value: function(text, blacklist) {

        }
    },
   /**
    *
    * @method shareImage
    * @param {UI.Image} image
    * @param {Array} [blacklist]
    * @since 0.1
    */
    'shareImage': {
        value: function(image, blacklist) {

        }
    },
   /**
    *
    * @method shareFile
    * @param {IO.File} file
    * @param {Array} [blacklist]
    * @since 0.1
    */
    'shareFile': {
        value: function(file, blacklist) {

        }
    },
});

/**
 * @property {String} Facebook
 * @static
 * @readonly
 * @since 0.1
 */
Share.Facebook = "...";

/**
 * @property {String} Twitter
 * @static
 * @readonly
 * @since 0.1
 */
Share.Twitter = "...";

/**
 * @property {String} Flickr
 * @static
 * @readonly
 * @since 0.1
 */
Share.Flickr = "...";

/**
 * @property {String} Message
 * @static
 * @readonly
 * @since 0.1
 */
Share.Message = "...";

/**
 * @property {String} Mail
 * @static
 * @readonly
 * @since 0.1
 */
Share.Mail = "...";

/**
 * @property {String} Vimeo
 * @static
 * @readonly
 * @since 0.1
 */
Share.Vimeo = "...";

module.exports = Share;