const extend = require('js-base/core/extend');
const View   = require('sf-core/ui/view');
const Color  = require('sf-core/ui/color');

const SDK_VERSION    = requireClass("android.os.Build").VERSION.SDK_INT;
const PorterDuffMode = requireClass("android.graphics.PorterDuff").Mode.SRC_IN;
const SeekBar        = requireClass("android.widget.SeekBar");
const NativeR        = requireClass("android.R");

const Slider = extend(View)(
    function (_super, params) {
        if(!this.nativeObject) {
            this.nativeObject = new SeekBar(Android.getActivity());
        }
        _super(this);
        
        var _layerDrawable = this.nativeObject.getProgressDrawable().getCurrent();
        var _defaultThumb  = this.nativeObject.getThumb();

        var _minValue;
        var _maxValue;
        var _minTrackColor;
        var _maxTrackColor;
        var _thumbImage = null;
        var _thumbColor;
        var _onValueChange;
        Object.defineProperties(this, {
            'value': {
                get: function() {
                    return this.nativeObject.getProgress() + _minValue;
                }, 
                set: function(value) {
                    if (value < _minValue) {
                        value = _minValue;
                    } else if (value > _maxValue) {
                        value = _maxValue;
                    }
                    
                    this.nativeObject.setProgress(value - _minValue);
                },
                enumerable: true
            },
            'minValue': {
                get: function() {
                    return _minValue;
                }, 
                set: function(value) {
                    _minValue = value;
                    this.nativeObject.setMax(_maxValue - _minValue);
                },
                enumerable: true
            },
            'maxValue': {
                get: function() {
                    return _maxValue;
                }, 
                set: function(value) {
                    _maxValue = value;
                    this.nativeObject.setMax(_maxValue - _minValue);
                },
                enumerable: true
            },
            'minTrackColor': {
                get: function() {
                    return _minTrackColor;
                }, 
                set: function(color) {
                    if (color) {
                        _minTrackColor = color;
    
                        _layerDrawable.findDrawableByLayerId(NativeR.id.progress).setColorFilter(_minTrackColor, PorterDuffMode);
                    }
                },
                enumerable: true
            },
            'maxTrackColor': {
                get: function() {
                    return _maxTrackColor;
                }, 
                set: function(color) {
                    if (color) {
                        _maxTrackColor = color;
                        
                        _layerDrawable.findDrawableByLayerId(NativeR.id.background).setColorFilter(_maxTrackColor, PorterDuffMode);
                    }
                },
                enumerable: true
            },
            'thumbImage': {
                get: function() {
                    return _thumbImage;
                },
                set: function(thumbImage) {
                    const Image = require("sf-core/ui/image");
                    if(thumbImage instanceof Image && thumbImage.nativeObject){
                        _thumbImage = thumbImage;
                        this.nativeObject.setThumb(thumbImage.nativeObject);
                    }
                    else if(thumbImage === null){
                        _thumbImage = thumbImage;
                        this.nativeObject.setThumb(null);
                    }
                },
                enumerable: true
            },
            'thumbColor': {
                get: function() {
                return _thumbColor;
                }, 
                set: function(color) {
                    if (color) {
                        _thumbColor = color;
                        _defaultThumb.setColorFilter(color, PorterDuffMode);
                        this.nativeObject.setThumb(_defaultThumb);
                    }
                },
                enumerable: true
            },
            'onValueChange': {
                get: function() {
                    return _onValueChange;
                }, 
                set: function(callback) {
                    _onValueChange = callback.bind(this);
                },
                enumerable: true
            },
            'toString': {
                value: function(){
                    return 'Slider';
                },
                enumerable: true, 
                configurable: true
            }
        });
        
        if(!this.isNotSetDefaults){
            // SET DEFAULTS
            this.thumbColor = Color.GRAY;
            this.minTrackColor = Color.DARKGRAY;
            this.maxTrackColor = Color.GREEN;
            this.value = 0;
            this.minValue = 0;
            this.maxValue = 100;
            this.nativeObject.setOnSeekBarChangeListener(SeekBar.OnSeekBarChangeListener.implement({
                onProgressChanged: function(seekBar, actualValue, fromUser) {
                    _onValueChange && _onValueChange(actualValue + _minValue);
                },
                onStartTrackingTouch: function(seekBar) {}, 
                onStopTrackingTouch: function(seekBar) {}
            }));
        }
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);
module.exports = Slider;