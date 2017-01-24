const Label = require("sf-core/ui/label");
const Color = require("sf-core/ui/color");
const StateList = require("sf-core/util/statelist");
const extend = require('js-base/core/extend');

const NativeButton = requireClass("android.widget.Button");
const NativeR = requireClass("android.R");
const NativeStateListDrawable = requireClass("android.graphics.drawable.StateListDrawable");
const NativeColorStateList = requireClass("android.content.res.ColorStateList");
const NativeColorDrawable = requireClass("android.graphics.drawable.ColorDrawable");
const NativeDrawable = requireClass("android.graphics.drawable.Drawable");
const NativeView = requireClass("android.view.View");

const Button = extend(Label)(
    function (_super, params) {
        var self = this;
        if(!self.nativeObject){
            self.nativeObject = new NativeButton(Android.getActivity());
        }
        _super(this);
        
        self.nativeObject.setAllCaps(false); // enable lowercase texts
        
        var STATE_NORMAL =  [
            NativeR.attr.state_enabled,
            -NativeR.attr.state_pressed,
            -NativeR.attr.state_selected
        ];
        var STATE_DISABLED = [
            -NativeR.attr.state_enabled,
        ];
         var STATE_SELECTED = [
            NativeR.attr.state_enabled,
            NativeR.attr.state_selected
        ];
        var STATE_PRESSED = [
            NativeR.attr.state_pressed,
            NativeR.attr.state_enabled,
        ];
        var STATE_FOCUSED = [
            NativeR.attr.state_focused,
            NativeR.attr.state_enabled,
        ];
        
        
        // @todo property not working. Caused by issue AND-2427
        var textColorStateListDrawable;
        var textColorsInitial = new StateList({
            normal: Color.BLACK,
            disabled: Color.BLACK,
            selected: Color.BLACK,
            pressed: Color.BLACK,
            focused: Color.BLACK
        });
        Object.defineProperty(this, 'textColors', {
            get: function() {
                return textColorsInitial;
            }, 
            set: function(textColors) {
                textColorsInitial = textColors;
                var statesSet = [];
                var colorsSets = [];
                if(textColors.normal){
                    statesSet.push(STATE_NORMAL);
                    colorsSets.push(textColors.normal);
                }
                if(textColors.disabled){
                    statesSet.push(STATE_DISABLED);
                    colorsSets.push(textColors.disabled);
                }
                if(textColors.selected){
                    statesSet.push(STATE_SELECTED);
                    colorsSets.push(textColors.selected);
                }
                if(textColors.pressed){
                    statesSet.push(STATE_PRESSED);
                    colorsSets.push(textColors.pressed);
                }
                if(textColors.focused){
                    statesSet.push(STATE_FOCUSED);
                    colorsSets.push(textColors.focused);
                }
                textColorStateListDrawable = new NativeColorStateList (statesSet, colorsSets);
                self.nativeObject.setTextColor(textColorStateListDrawable);
            },
            enumerable: true
        });
        
        var stateListSet;
        var backgroundColorsInitial = new StateList({
            normal: Color.WHITE,
            disabled: Color.WHITE,
            selected: Color.WHITE,
            pressed: Color.WHITE,
            focused: Color.WHITE
        });
        Object.defineProperty(this, 'backgroundColors', {
            get: function() {
                return backgroundColorsInitial;
            }, 
            set: function(backgroundColors) {
                backgroundColorsInitial = backgroundColors;
                stateListSet = new NativeStateListDrawable();
                if(backgroundColors.normal){
                    var stateDrawable = NativeColorDrawable(backgroundColors.normal);
                    stateListSet.addState(STATE_NORMAL,stateDrawable);
                }
                if(backgroundColors.disabled){
                    var stateDrawable = NativeColorDrawable(backgroundColors.disabled);
                    stateListSet.addState(STATE_DISABLED,stateDrawable);
                }
                if(backgroundColors.selected){
                    var stateDrawable = NativeColorDrawable(backgroundColors.selected);
                    stateListSet.addState(STATE_SELECTED,stateDrawable);
                }
                if(backgroundColors.pressed){
                    var stateDrawable = NativeColorDrawable(backgroundColors.pressed);
                    stateListSet.addState(STATE_PRESSED,stateDrawable);
                }
                if(backgroundColors.focused){
                    var stateDrawable = NativeColorDrawable(backgroundColors.focused);
                    stateListSet.addState(STATE_FOCUSED,stateDrawable);
                }
                self.nativeObject.setBackground(stateListSet);
            },
            enumerable: true
        });

        
        var backgroundImagesInitial = new StateList({
            normal: "",
            disabled: "",
            selected: "",
            pressed: "",
            focused: ""
        });
        Object.defineProperty(this, 'backgroundImages', {
            get: function() {
                return backgroundImagesInitial;
            }, 
            set: function(backgroundImages) {
                // Assuming all paths are full path.
                backgroundImagesInitial = backgroundImages;
                stateListSet = new NativeStateListDrawable();
                if(backgroundImages.normal){
                    var stateDrawable = NativeDrawable.createFromPath(backgroundImages.normal);
                    stateListSet.addState(STATE_NORMAL,stateDrawable);
                }
                if(backgroundImages.disabled){
                    var stateDrawable = NativeDrawable.createFromPath(backgroundImages.disabled);
                    stateListSet.addState(STATE_DISABLED,stateDrawable);
                }
                if(backgroundImages.selected){
                    var stateDrawable = NativeDrawable.createFromPath(backgroundImages.selected);
                    stateListSet.addState(STATE_SELECTED,stateDrawable);
                }
                if(backgroundImages.pressed){
                    var stateDrawable = NativeDrawable.createFromPath(backgroundImages.pressed);
                    stateListSet.addState(STATE_PRESSED,stateDrawable);
                }
                if(backgroundImages.focused){
                    var stateDrawable = NativeDrawable.createFromPath(backgroundImages.focused);
                    stateListSet.addState(STATE_FOCUSED,stateDrawable);
                }
                self.nativeObject.setBackground(stateListSet);
            },
            enumerable: true
        });
        
        var onPressCallback;
        Object.defineProperty(this, 'onPress', {
            get: function() {
                return onPressCallback;
            },
            set: function(onPress) {
                onPressCallback = onPress;
            },
            enumerable: true
        });
        
        var onLongPressCallback;
        Object.defineProperty(this, 'onLongPress', {
            get: function() {
                return onLongPressCallback;
            },
            set: function(onLongPress) {
                onLongPressCallback = onLongPress;
            },
            enumerable: true
        });
        
        self.nativeObject.setOnClickListener(NativeView.OnClickListener.implement({
            onClick: function(view) {
                    onPressCallback && onPressCallback.apply(self);
            }
        }));
        
        self.nativeObject.setOnLongClickListener(NativeView.OnLongClickListener.implement({
            onLongClick : function(view){
                onLongPressCallback && onLongPressCallback();
            }
        }));
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
});

module.exports = Button;