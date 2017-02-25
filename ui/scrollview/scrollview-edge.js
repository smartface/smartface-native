/**
* @enum UI.ScrollView.Edge
* @static
* @readonly
* @since 0.1
*
* Indicates where to scroll.
*
*/
const ScrollViewEdge = {};

Object.defineProperties(ScrollViewEdge, {
   /**
    * @property {String} [LEFT = 'left']
    * @android
    * @ios
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
    * @android
    * @ios
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
    * @android
    * @ios
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
    * @android
    * @ios
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

module.exports = ScrollViewEdge;
