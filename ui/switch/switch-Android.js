const Button = require('sf-core/ui/button');
const Color = require("sf-core/ui/color");
const extend = require('js-base/core/extend');

const Switch = extend(Button)(
    function (_super, params) {
        var self = this;
        if(!self.nativeObject){
            self.nativeObject = new android.widget.Switch(Android.getActivity());
        }
        _super(this);


//        var STATE_CHECKED = [
//            android.R.attr.state_checked
//        ];
//        var STATE_NORMAL =  [
//            -android.R.attr.state_enabled
//        ];

         // Getting default background color. Its themes default colorAccent and colorControlNormal on native
        var typedValue = new android.util.TypedValue();
        var a = Android.getActivity().obtainStyledAttributes(typedValue.data, [android.R.attr.colorAccent]);
        var colorTrackCheckedInitial = a.getColor(0, 0);
        var initialColorChecked = colorTrackCheckedInitial;
        a = Android.getActivity().obtainStyledAttributes(typedValue.data, [android.R.attr.colorControlNormal]);
        var initialColorUnchecked = a.getColor(0, 0);
        a.recycle();

        var thumbOnColorInitial = initialColorChecked;
        Object.defineProperty(this, 'thumbOnColor', {
            get: function() {
                return thumbOnColorInitial;
            },
            set: function(thumbOnColor) {
                thumbOnColorInitial = thumbOnColor;
                setThumbColor();
            },
            enumerable: true
        });

        var thumbOffColorInitial = initialColorUnchecked;
        Object.defineProperty(this, 'thumbOffColor', {
            get: function() {
                return thumbOnColorInitial;
            },
            set: function(thumbOffColor) {
                thumbOffColorInitial = thumbOffColor;
                setThumbColor();
            },
            enumerable: true
        });

        var toggleOnColorInitial = initialColorChecked;
        Object.defineProperty(this, 'toggleOnColor', {
            get: function() {
                return thumbOnColorInitial;
            },
            set: function(toggleOnColor) {
                toggleOnColorInitial = toggleOnColor;
                setTrackColor();
            },
            enumerable: true
        });

        var toggleOffColorInitial = initialColorUnchecked;
        this.android = {}
        Object.defineProperty(this.android, 'toggleOffColor', {
            get: function() {
                return thumbOnColorInitial;
            },
            set: function(toggleOffColor) {
                toggleOffColorInitial = toggleOffColor;
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
                onToggleChangedCallback = onToggleChanged;
            },
            enumerable: true
        });

        self.nativeObject.setOnCheckedChangeListener(android.widget.CompoundButton.OnCheckedChangeListener.implement({
            onCheckedChanged: function(buttonView, isChecked){
                setThumbColor();
                setTrackColor();
                onToggleChangedCallback && onToggleChangedCallback(isChecked);
            }
        }));

        function setThumbColor(){
            if(self.nativeObject.isChecked()){
                self.nativeObject.getThumbDrawable().setColorFilter(thumbOnColorInitial,android.graphics.PorterDuff.Mode.SRC_ATOP);
            }
            else{
                self.nativeObject.getThumbDrawable().setColorFilter(thumbOffColorInitial,android.graphics.PorterDuff.Mode.SRC_ATOP);
            }
        }

        function setTrackColor(){
            if(self.nativeObject.isChecked()){
                self.nativeObject.getTrackDrawable().setColorFilter(toggleOnColorInitial,android.graphics.PorterDuff.Mode.SRC_ATOP);
            }
            else{
                self.nativeObject.getTrackDrawable().setColorFilter(toggleOffColorInitial,android.graphics.PorterDuff.Mode.SRC_ATOP);
            }
        }


    }
);

module.exports = Switch;