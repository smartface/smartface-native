/**
* @enum UI.ScrollView.Position
* @static
* @readonly
* @since 0.1
*
* Indicates where to scroll.
*
*/
const ScrollViewPosition = {};

Object.defineProperties(ScrollViewPosition, {
   /**
    * @property {String} [LEFT = 'left'] 
    * @static
    * @readonly
    * @since 0.1
    */
    'LEFT': {
        value: 'left',
        configurable: false,
        enumerable: true
    },
   /**
    * @property {String} [TOP = 'top'] 
    * @static
    * @readonly
    * @since 0.1
    */
    'TOP': {
        value: 'top',
        configurable:false,
        enumerable: true
    },
   /**
    * @property {String} [RIGHT = 'right'] 
    * @static
    * @readonly
    * @since 0.1
    */ 
    'RIGHT': {
        value: 'right',
        configurable:false,
        enumerable: true
    },
   /**
    * @property {String} [BOTTOM = 'bottom'] 
    * @static
    * @readonly
    * @since 0.1
    */
    'BOTTOM': {
        value: 'bottom',
        configurable:false,
        enumerable: true
    }
});

module.exports = ScrollViewPosition;