const View = require('../view');
const extend = require('js-base/core/extend');

/**
 * @class UI.Slider
 * @since 0.1
 * @extends UI.View
 * 
 * Slider can be used to select a value from a range of values by moving the slider thumb along the track.
 * 
 *     @example
 *     const Slider = require('sf-core/ui/slider');
 *     var Color = require('sf-core/ui/color');
 *     var mySlider = new Slider();
 *     mySlider.maxValue = 100;
 *     mySlider.minValue = 0;
 *     mySlider.value = 40;
 *     mySlider.lowerColor = Color.RED;
 *     mySlider.thumbColor = Color.BLUE;
 *
 */

const Slider = extend(View)(
    function (_super, params) {
        _super(this);

        /**
         * Gets/sets color of the thumb.
         *
         *     @example
         *     const Slider = require('sf-core/ui/slider');
         *     var Color = require('sf-core/ui/color');
         *     var mySlider = new Slider();
         *     mySlider.thumbColor = Color.GRAY;
         *
         * @property {Color} thumbColor
         * @since 0.1
         */
        this.thumbColor = Color.GRAY;

        /**
         * Gets/sets image path of the thumb.
         *
         *     @example
         *     const Slider = require('sf-core/ui/slider');
         *     var mySlider = new Slider();
         *     mySlider.thumbImage = "images://smartface.png";
         *
         * @property {String} thumbImage
         * @since 0.1
         */
        this.thumbImage = "images://smartface.png";

        /**
         * Gets/sets color of the thumb's lower track.
         *
         *     @example
         *     const Slider = require('sf-core/ui/slider');
         *     var Color = require('sf-core/ui/color');
         *     var mySlider = new Slider();
         *     mySlider.lowerColor = Color.BLUE;
         *
         * @property {Color} lowerColor
         * @since 0.1
         */
        this.lowerColor = Color.DARKGRAY;

        /**
         * Gets/sets color of the thumb's upper track
         *
         *     @example
         *     const Slider = require('sf-core/ui/slider');
         *     var Color = require('sf-core/ui/color');
         *     var mySlider = new Slider();
         *     mySlider.upperColor = Color.GREEN;
         *
         * @property {Color} upperColor
         * @since 0.1
         */
        this.upperColor = Color.GREEN;

        /**
         * Gets/sets value of the slider. This value should be less or equals to maxValue,
         * greater or equals to minValue.
         *
         *     @example
         *     const Slider = require('sf-core/ui/slider');
         *     var mySlider = new Slider();
         *     mySlider.value = 0;
         *
         * @property {Number} value
         * @since 0.1
         */
        this.value = 0;

        /**
         * Gets/sets minimum value of the slider.
         *
         *     @example
         *     const Slider = require('sf-core/ui/slider');
         *     var mySlider = new Slider();
         *     mySlider.minValue = 0;
         *
         * @property {Number} minValue
         * @since 0.1
         */
        this.minValue = 0;

        /**
         * Gets/sets maximum value of the slider.
         *
         *     @example
         *     const Slider = require('sf-core/ui/slider');
         *     var mySlider = new Slider();
         *     mySlider.maxValue = 100;
         *
         * @property {Number} maxValue
         * @since 0.1
         */
        this.maxValue = 100;

        // events
        /**
         * Gets/sets value change event for slider instance. This event fires when slider value changed.
         *
         *     @example
         *     const Slider = require('sf-core/ui/slider');
         *     var Color = require('sf-core/ui/color');
         *     var mySlider = new Slider();
         *     mySlider.onChange = function;
         *
         * @param {Number} value New value of Slider.
         * @event onChange
         * @since 0.1
         */
        this.onChange = function(value) {};
    }
);
module.exports = Slider;