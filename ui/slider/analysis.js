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
 *     const Slider = require('nf-core/ui/slider');
 *     const AbsoluteLayout = require('nf-core/ui/absolutelayout');
 *     var Color = require('nf-core/ui/color');
 *     var mySlider = new Slider();
 *     mySlider.maxValue = 100;
 *     mySlider.minValue = 0;
 *     mySlider.value = 40;
 *     mySlider.minTrackColor = Color.RED;
 *     mySlider.thumbColor = Color.BLUE;
 *     var myAbsoluteLayout = new AbsoluteLayout();
 *     myAbsoluteLayout.addChild(mySlider);
 *
 */

const Slider = extend(View)(
    function (_super, params) {
        _super(this);

        /**
         * Gets/sets color of the thumb.
         *
         *     @example
         *     const Slider = require('nf-core/ui/slider');
         *     var Color = require('nf-core/ui/color');
         *     var mySlider = new Slider();
         *     mySlider.thumbColor = Color.GRAY;
         *
         * @property {UI.Color} [thumbColor = UI.Color.GRAY]
         * @since 0.1
         */
        this.thumbColor = UI.Color.GRAY;

        /**
         * Gets/sets image path of the thumb.
         *
         *     @example
         *     const Slider = require('nf-core/ui/slider');
         *     var mySlider = new Slider();
         *     mySlider.thumbImage = "images://smartface.png";
         *
         * @property {String} [thumbImage = ""]
         * @since 0.1
         */
        this.thumbImage = "";

        /**
         * Gets/sets color of the thumb's minimum track color.
         *
         *     @example
         *     const Slider = require('nf-core/ui/slider');
         *     var Color = require('nf-core/ui/color');
         *     var mySlider = new Slider();
         *     mySlider.minTrackColor = Color.BLUE;
         *
         * @property {UI.Color} [minTrackColor = UI.Color.DARKGRAY]
         * @since 0.1
         */
        this.minTrackColor = UI.Color.DARKGRAY;

        /**
         * Gets/sets color of the thumb's maximum track color.
         *
         *     @example
         *     const Slider = require('nf-core/ui/slider');
         *     var Color = require('nf-core/ui/color');
         *     var mySlider = new Slider();
         *     mySlider.maxTrackColor = Color.GREEN;
         *
         * @property {UI.Color} [maxTrackColor = UI.Color.GREEN]
         * @since 0.1
         */
        this.maxTrackColor = UI.Color.GREEN;

        /**
         * Gets/sets value of the slider. This value should be less or equals to maxValue,
         * greater or equals to minValue.
         *
         *     @example
         *     const Slider = require('nf-core/ui/slider');
         *     var mySlider = new Slider();
         *     mySlider.value = 30;
         *
         * @property {Number} [value = 0]
         * @since 0.1
         */
        this.value = 0;

        /**
         * Gets/sets minimum value of the slider.
         *
         *     @example
         *     const Slider = require('nf-core/ui/slider');
         *     var mySlider = new Slider();
         *     mySlider.minValue = 0;
         *
         * @property {Number} [minValue = 0]
         * @since 0.1
         */
        this.minValue = 0;

        /**
         * Gets/sets maximum value of the slider.
         *
         *     @example
         *     const Slider = require('nf-core/ui/slider');
         *     var mySlider = new Slider();
         *     mySlider.maxValue = 100;
         *
         * @property {Number} [maxValue = 100]
         * @since 0.1
         */
        this.maxValue = 100;

        // events
        /**
         * Gets/sets value change event for slider instance. This event fires when slider value changed.
         *
         *     @example
         *     const Slider = require('nf-core/ui/slider');
         *     var mySlider = new Slider();
         *     mySlider.onValueChange = valueChanged;
         *     mySlider.value = 40;
         * 
         *     function valueChanged() {
         *         alert("New value is: " + mySlider.value);
         *     }
         *
         * @event onValueChange
         * @since 0.1
         */
        this.onValueChange = function() {};
    }
);
module.exports = Slider;