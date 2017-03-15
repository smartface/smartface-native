/**
* @enum UI.ScrollView.Align
* @static
* @readonly
* @since 0.1
*
* Indicates the alignment of the scroll.
*
*/
const ScrollViewAlign = {};

Object.defineProperties(ScrollViewAlign, {
   /**
    * @property {String} [HORIZONTAL = 'horizontal']
    * @android
    * @ios
    * @static
    * @readonly
    * @since 0.1
    */
    'HORIZONTAL': {
        value: 'horizontal',
        configurable: false,
        enumerable: true
    },
   /**
    * @property {String} [VERTICAL = 'vertical']
    * @android
    * @ios
    * @static
    * @readonly
    * @since 0.1
    */
    'VERTICAL': {
        value: 'vertical',
        configurable:false,
        enumerable: true
    }
});

module.exports = ScrollViewAlign;
