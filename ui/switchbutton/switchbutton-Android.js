const View = require('sf-core/ui/view');
const Color = require("sf-core/ui/color");
const extend = require('js-base/core/extend');

const SwitchButton = extend(View)(
    function (_super, params) {
    var self = this;
    if(!self.nativeObject){
        self.nativeObject = new android.widget.Switch(Android.getActivity());
    }
    _super(this);

    var STATE_CHECKED = [
        android.R.attr.state_checked
    ];
    var STATE_NORMAL =  [
        -android.R.attr.state_enabled
    ];

     // Getting default background color. Its themes default colorAccent and colorControlNormal on native
    var typedValue = new android.util.TypedValue();
    var a = Android.getActivity().obtainStyledAttributes(typedValue.data, [android.R.attr.colorAccent]);
    var colorTrackCheckedInitial = a.getColor(0, 0);
    var thumbColorInitial = colorTrackCheckedInitial;
    a = Android.getActivity().obtainStyledAttributes(typedValue.data, [android.R.attr.colorControlNormal]);
    var colorTrackUncheckedInitial = a.getColor(0, 0);
    a.recycle();

    // setting default backgrounds
    var switchNormalTrackDrawable = android.graphics.drawable.GradientDrawable()
    switchNormalTrackDrawable.setColor(colorTrackUncheckedInitial);
    switchNormalTrackDrawable.setCornerRadius(50);
    var switchCheckedTrackDrawable = new android.graphics.drawable.GradientDrawable();
    switchCheckedTrackDrawable.setColor(colorTrackCheckedInitial);
    switchCheckedTrackDrawable.setCornerRadius(50);

    var trackStates = new android.graphics.drawable.StateListDrawable();
    setTrackDrawable();

    Object.defineProperty(this, 'thumbColor', {
        get: function() {
            return thumbColorInitial;
        },
        set: function(thumbColor) {
            thumbColorInitial = thumbColor;
            self.nativeObject.getThumbDrawable().setColorFilter(thumbColor,android.graphics.PorterDuff.Mode.MULTIPLY);
        },
        enumerable: true
    });

    Object.defineProperty(this, 'checkedColor', {
        get: function() {
            return switchCheckedTrackDrawable.getColor();
        },
        set: function(checkedColor) {
            switchCheckedTrackDrawable.setColor(checkedColor);
            setTrackDrawable();
        },
        enumerable: true
    });

    self.nativeObject.setChecked(false);
    Object.defineProperty(this, 'checked', {
        get: function() {
            return self.nativeObject.isChecked();
        },
        set: function(checked) {
            self.nativeObject.setChecked(checked);
        },
        enumerable: true
    });

    var onChangedCallback;
    Object.defineProperty(this, 'onChanged', {
        get: function() {
            return onChangedCallback;
        },
        set: function(onChanged) {
            onChangedCallback = onChanged;
        },
        enumerable: true
    });

    // @todo its crashing because of "Created a new instance of className android.widget.Switch"
    self.nativeObject.setOnCheckedChangeListener(android.widget.CompoundButton.OnCheckedChangeListener.implement({
        onCheckedChanged: function(buttonView, isChecked){
            onChangedCallback && onChangedCallback(isChecked);
        }
    }));

    function setTrackDrawable(){
        trackStates.addState(STATE_CHECKED, switchCheckedTrackDrawable);
        trackStates.addState(STATE_NORMAL, switchNormalTrackDrawable);
        self.nativeObject.setTrackDrawable(trackStates);
    }
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
});
module.exports = SwitchButton;