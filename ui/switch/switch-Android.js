const View = require('nf-core/ui/view');
const Color = require("nf-core/ui/color");
const extend = require('js-base/core/extend');

const NativeSwitch = requireClass("android.widget.Switch");
const NativeCompoundButton = requireClass("android.widget.CompoundButton");
const NativePorterDuff = requireClass("android.graphics.PorterDuff");

const Switch = extend(View)(
    function (_super, params) {
        var self = this;
        if(!self.nativeObject){
            self.nativeObject = new NativeSwitch(Android.getActivity());
        }
        _super(this);

        var _thumbOnColor = null;
        Object.defineProperty(this, 'thumbOnColor', {
            get: function() {
                return _thumbOnColor;
            },
            set: function(thumbOnColor) {
                _thumbOnColor = thumbOnColor;
                setThumbColor();
            },
            enumerable: true
        });

        var _thumbOffColor = Color.GRAY;
        Object.defineProperty(this, 'thumbOffColor', {
            get: function() {
                return _thumbOffColor;
            },
            set: function(thumbOffColor) {
                _thumbOffColor = thumbOffColor;
                setThumbColor();
            },
            enumerable: true
        });

        var _toggleOnColor = Color.GRAY;
        Object.defineProperty(this, 'toggleOnColor', {
            get: function() {
                return _toggleOnColor;
            },
            set: function(toggleOnColor) {
                _toggleOnColor = toggleOnColor;
                setTrackColor();
            },
            enumerable: true
        });

        var _toggleOffColor = Color.GRAY;
        this.android = {}
        Object.defineProperty(this.android, 'toggleOffColor', {
            get: function() {
                return _toggleOffColor;
            },
            set: function(toggleOffColor) {
                _toggleOffColor = toggleOffColor;
                setTrackColor();
            },
            enumerable: true
        });

        Object.defineProperty(this, 'toggle', {
            get: function() {
                return self.nativeObject.isChecked();
            },
            set: function(toggle) {
                self.nativeObject.setChecked(toggle);
            },
            enumerable: true
        });

        var onToggleChangedCallback;
        Object.defineProperty(this, 'onToggleChanged', {
            get: function() {
                return onToggleChangedCallback;
            },
            set: function(onToggleChanged) {
                onToggleChangedCallback = onToggleChanged.bind(this);
            },
            enumerable: true
        });

        self.nativeObject.setOnCheckedChangeListener(NativeCompoundButton.OnCheckedChangeListener.implement({
            onCheckedChanged: function(buttonView, isChecked){
                setThumbColor();
                setTrackColor();
                onToggleChangedCallback && onToggleChangedCallback(isChecked);
            }
        }));

        function setThumbColor(){
            if(self.nativeObject.isChecked()){
                self.nativeObject.getThumbDrawable().setColorFilter(_thumbOnColor,NativePorterDuff.Mode.SRC_ATOP);
            }
            else{
                self.nativeObject.getThumbDrawable().setColorFilter(_thumbOffColor,NativePorterDuff.Mode.SRC_ATOP);
            }
        }

        function setTrackColor(){
            if(self.nativeObject.isChecked()){
                self.nativeObject.getTrackDrawable().setColorFilter(_toggleOnColor,NativePorterDuff.Mode.SRC_ATOP);
            }
            else{
                self.nativeObject.getTrackDrawable().setColorFilter(_toggleOffColor,NativePorterDuff.Mode.SRC_ATOP);
            }
        }
        
        self.thumbOnColor = Color.create("#00A1F1"); // SmartfaceBlue;
        self.thumbOffColor = Color.GRAY;
        self.toggleOnColor = Color.GRAY;
        self.android.toggleOffColor = Color.GRAY;

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = Switch;
