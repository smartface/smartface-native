const Label = require("sf-core/ui/label");
const Color = require("sf-core/ui/color");
const StateList = require("sf-core/util/statelist");
const extend = require('js-base/core/extend');

const Button = extend(Label)(
    function (_super, params) {
        var self = this;
        if(!self.nativeObject){
            self.nativeObject = new android.widget.Button(Android.getActivity());
        }
        _super(this);
        
        
        var STATE_NORMAL =  [
            android.R.attr.state_enabled,
            -android.R.attr.state_pressed,
            -android.R.attr.state_selected
        ];
        var STATE_DISABLED = [
            -android.R.attr.state_enabled,
        ];
         var STATE_SELECTED = [
            android.R.attr.state_enabled,
            android.R.attr.state_selected
        ];
        var STATE_PRESSED = [
            android.R.attr.state_pressed,
            android.R.attr.state_enabled,
        ];
        var STATE_FOCUSED = [
            android.R.attr.state_focused,
            android.R.attr.state_enabled,
        ];
        
        
        // @todo property not working. Caused by issue AND-2427
        var textColorStateListDrawable;
        var textColorsInitial = new StateList(
            Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK
        );
        Object.defineProperty(this, 'textColors', {
            get: function() {
                return textColorsInitial;
            }, 
            set: function(textColors) {
                textColorsInitial = textColors;
                var statesSet = [[]];
                var colorsSets = [];
                if(textColors.normal){
                    statesSet.push(STATE_NORMAL);
                    colorsSets.push(textColors.normal);
                }
                if(textColors.disabled){
                    statesSet.push(STATE_DISABLED);
                    colorsSets.push(textColors.disabled);
                }
                if(textColors.highlighted){
                    statesSet.push(STATE_HIGHLIGTED);
                    colorsSets.push(textColors.highlighted);
                }
                if(textColors.pressed){
                    statesSet.push(STATE_PRESSED);
                    colorsSets.push(textColors.pressed);
                }
                if(textColors.focused){
                    statesSet.push(STATE_FOCUSED);
                    colorsSets.push(textColors.focused);
                }
                textColorStateListDrawable = new android.content.res.ColorStateList (statesSet, colorsSets);
                self.nativeObject.setTextColor(textColorStateListDrawable);
            },
            enumerable: true
        });
        
        var stateListSet;
        var backgroundColorsInitial = new StateList(
            Color.TRANSPARENT, Color.TRANSPARENT, Color.TRANSPARENT, Color.TRANSPARENT, Color.TRANSPARENT
        );
        Object.defineProperty(this, 'backgroundColors', {
            get: function() {
                return backgroundColorsInitial;
            }, 
            set: function(backgroundColors) {
                backgroundColorsInitial = backgroundColors;
                stateListSet = new android.graphics.drawable.StateListDrawable();
                if(backgroundColors.normal){
                    var stateDrawable = android.graphics.drawable.ColorDrawable(backgroundColors.normal);
                    stateListSet.addState(STATE_NORMAL,stateDrawable);
                }
                if(backgroundColors.disabled){
                    var stateDrawable = android.graphics.drawable.ColorDrawable(backgroundColors.disabled);
                    stateListSet.addState(STATE_DISABLED,stateDrawable);
                }
                if(backgroundColors.highlighted){
                    var stateDrawable = android.graphics.drawable.ColorDrawable(backgroundColors.highlighted);
                    stateListSet.addState(STATE_HIGHLIGTED,stateDrawable);
                }
                if(backgroundColors.pressed){
                    var stateDrawable = android.graphics.drawable.ColorDrawable(backgroundColors.pressed);
                    stateListSet.addState(STATE_PRESSED,stateDrawable);
                }
                if(backgroundColors.focused){
                    var stateDrawable = android.graphics.drawable.ColorDrawable(backgroundColors.focused);
                    stateListSet.addState(STATE_FOCUSED,stateDrawable);
                }
                self.nativeObject.setBackground(stateListSet);
            },
            enumerable: true
        });

        
        var backgroundImagesInitial = new StateList("", "", "", "", "");
        Object.defineProperty(this, 'backgroundImages', {
            get: function() {
                return backgroundImagesInitial;
            }, 
            set: function(backgroundImages) {
                // Assuming all paths are full path.
                backgroundImagesInitial = backgroundImages;
                stateListSet = new android.graphics.drawable.StateListDrawable();
                if(backgroundImages.normal){
                    var stateDrawable = android.graphics.drawable.Drawable.createFromPath(backgroundImages.normal);
                    stateListSet.addState(STATE_NORMAL,stateDrawable);
                }
                if(backgroundImages.disabled){
                    var stateDrawable = android.graphics.drawable.Drawable.createFromPath(backgroundImages.disabled);
                    stateListSet.addState(STATE_DISABLED,stateDrawable);
                }
                if(backgroundImages.highlighted){
                    var stateDrawable = android.graphics.drawable.Drawable.createFromPath(backgroundImages.highlighted);
                    stateListSet.addState(STATE_HIGHLIGTED,stateDrawable);
                }
                if(backgroundImages.pressed){
                    var stateDrawable = android.graphics.drawable.Drawable.createFromPath(backgroundImages.pressed);
                    stateListSet.addState(STATE_PRESSED,stateDrawable);
                }
                if(backgroundImages.focused){
                    var stateDrawable = android.graphics.drawable.Drawable.createFromPath(backgroundImages.focused);
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
        
        self.nativeObject.setOnClickListener(android.view.View.OnClickListener.implement({
            onClick: function(view) {
                onPressCallback && onPressCallback();
            }
        }));
        
        self.nativeObject.setOnLongClickListener(android.view.View.OnLongClickListener.implement({
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