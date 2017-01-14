const extend = require('js-base/core/extend');
const View   = require('sf-core/ui/view');
const Color  = require('sf-core/ui/color');

const SDK_VERSION    = requireClass("android.os.Build").VERSION.SDK_INT;
const PorterDuffMode = requireClass("android.graphics.PorterDuff").Mode.SRC_IN;
const BitmapFactory  = requireClass("android.graphics.BitmapFactory");
const BitmapDrawable = requireClass("android.graphics.drawable.BitmapDrawable");
const SeekBar        = requireClass("android.widget.SeekBar");
const NativeR        = requireClass("android.R");

const Slider = extend(View)(
    function (_super, params) {
        var self = this;
        if(!self.nativeObject) {
            self.nativeObject = new SeekBar(Android.getActivity());
        };
        _super(self);
        
        var _layerDrawable = self.nativeObject.getProgressDrawable().getCurrent();
        var _defaultThumb  = self.nativeObject.getThumb();

        self.nativeObject.setOnSeekBarChangeListener(SeekBar.OnSeekBarChangeListener.implement({
            onProgressChanged: function(seekBar, actualValue, fromUser) {
                _onValueChange && _onValueChange(actualValue + _minValue);
            },
            onStartTrackingTouch: function(seekBar) {}, 
            onStopTrackingTouch: function(seekBar) {}
        }));
        
        var _currentValue;
        Object.defineProperty(this, 'value', {
            get: function() {
                return _currentValue;
            }, 
            set: function(value) {
                _currentValue = value;
                
                if (_currentValue < _minValue) {
                    _currentValue = _minValue;
                } else if (_currentValue > _maxValue) {
                    _currentValue = _maxValue;
                }
                
                self.nativeObject.setProgress(_currentValue - _minValue);
            },
            enumerable: true
        });

        var _minValue;
        Object.defineProperty(this, 'minValue', {
            get: function() {
                return _minValue;
            }, 
            set: function(value) {
                _minValue = value;
                self.nativeObject.setMax(_maxValue - _minValue);
            },
            enumerable: true
        });

        var _maxValue;
        Object.defineProperty(this, 'maxValue', {
            get: function() {
                return _maxValue;
            }, 
            set: function(value) {
                _maxValue = value
                self.nativeObject.setMax(_maxValue - _minValue);
            },
            enumerable: true
        });

        var _minTrackColor;
        Object.defineProperty(this, 'minTrackColor', {
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
        });

        var _maxTrackColor;
        Object.defineProperty(this, 'maxTrackColor', {
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
        });

        var _thumbImage;
        Object.defineProperty(this, 'thumbImage', {
            get: function() {
                return _thumbImage;
            },
            set: function(imagePath) {
                _thumbImage = imagePath;
                
                var imageBitmap = BitmapFactory.decodeFile(imagePath);
                if (imageBitmap) {
                    var bitmapDrawable = new BitmapDrawable(imageBitmap);
                    self.nativeObject.setThumb(bitmapDrawable);
                }
            },
            enumerable: true
        });

        var _thumbColor;
        Object.defineProperty(this, 'thumbColor', {
            get: function() {
                return _thumbColor;
            }, 
            set: function(color) {
                if (color) {
                    _thumbColor = color;
                    _defaultThumb.setColorFilter(color, PorterDuffMode);
                    self.nativeObject.setThumb(_defaultThumb);
                }
            },
            enumerable: true
        });
        
        var _onValueChange;
        Object.defineProperty(this, 'onValueChange', {
            get: function() {
                return _onValueChange;
            }, 
            set: function(callback) {
                _onValueChange = callback;
            },
            enumerable: true
        });
        
        // SET DEFAULTS
        self.thumbColor = Color.GRAY;
        self.minTrackColor = Color.DARKGRAY;
        self.maxTrackColor = Color.GREEN;
        self.value = 0;
        self.minValue = 0;
        self.maxValue = 100;
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);
module.exports = Slider;