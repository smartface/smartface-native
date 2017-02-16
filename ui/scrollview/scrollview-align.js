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