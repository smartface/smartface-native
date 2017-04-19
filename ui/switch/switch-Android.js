const View = require('sf-core/ui/view');
const Color = require("sf-core/ui/color");
const extend = require('js-base/core/extend');

const NativeSwitch = requireClass("android.widget.Switch");
const NativeCompoundButton = requireClass("android.widget.CompoundButton");
const NativePorterDuff = requireClass("android.graphics.PorterDuff");

const Switch = extend(View)(
    function (_super, params) {
        var self = this;
        if(!this.nativeObject){
            this.nativeObject = new NativeSwitch(Android.getActivity());
        }
        _super(this);

        var _thumbOnColor = null;
        var _thumbOffColor = Color.GRAY;
        var _toggleOnColor = Color.GRAY;
        var _toggleOffColor = Color.GRAY;
        var onToggleChangedCallback;
        Object.defineProperty(this, {
            'thumbOnColor': {
                get: function() {
                    return _thumbOnColor;
                },
                set: function(thumbOnColor) {
                    _thumbOnColor = thumbOnColor;
                    setThumbColor(self);
                },
                enumerable: true
            },
            'thumbOffColor': {
                get: function() {
                    return _thumbOffColor;
                },
                set: function(thumbOffColor) {
                    _thumbOffColor = thumbOffColor;
                    setThumbColor(self);
                },
                enumerable: true
            },
            'toggleOnColor': {
                get: function() {
                    return _toggleOnColor;
                },
                set: function(toggleOnColor) {
                    _toggleOnColor = toggleOnColor;
                    setTrackColor(self);
                },
                enumerable: true
            },
            'toggle': {
                get: function() {
                    return this.nativeObject.isChecked();
                },
                set: function(toggle) {
                    this.nativeObject.setChecked(toggle);
                },
                enumerable: true
            },
            'onToggleChanged': {
                get: function() {
                    return onToggleChangedCallback;
                },
                set: function(onToggleChanged) {
                    onToggleChangedCallback = onToggleChanged.bind(this);
                },
                enumerable: true
            },
            'android': {
                value: {},
                enumerable: true
            },
            'toString': {
                value: function(){
                    return 'Switch';
                },
                enumerable: true, 
                configurable: true
            }
        });

        Object.defineProperty(this.android, 'toggleOffColor', {
            get: function() {
                return _toggleOffColor;
            },
            set: function(toggleOffColor) {
                _toggleOffColor = toggleOffColor;
                setTrackColor(self);
            },
            enumerable: true
        });

        if(!this.isNotSetDefaults){
            this.thumbOnColor = Color.create("#00A1F1"); // SmartfaceBlue;
            this.thumbOffColor = Color.GRAY;
            this.toggleOnColor = Color.GRAY;
            this.android.toggleOffColor = Color.GRAY;
            this.nativeObject.setOnCheckedChangeListener(NativeCompoundButton.OnCheckedChangeListener.implement({
                onCheckedChanged: function(buttonView, isChecked){
                    setThumbColor(self);
                    setTrackColor(self);
                    onToggleChangedCallback && onToggleChangedCallback(isChecked);
                }
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

function setThumbColor(self){
    if(self.nativeObject.isChecked()){
        self.nativeObject.getThumbDrawable().setColorFilter(self.thumbOnColor, NativePorterDuff.Mode.SRC_ATOP);
    }
    else{
        self.nativeObject.getThumbDrawable().setColorFilter(self.thumbOffColor, NativePorterDuff.Mode.SRC_ATOP);
    }
}

function setTrackColor(self){
    if(self.nativeObject.isChecked()){
        self.nativeObject.getTrackDrawable().setColorFilter(self.toggleOnColor, NativePorterDuff.Mode.SRC_ATOP);
    }
    else{
        self.nativeObject.getTrackDrawable().setColorFilter(self.toggleOffColor, NativePorterDuff.Mode.SRC_ATOP);
    }
}

module.exports = Switch;
