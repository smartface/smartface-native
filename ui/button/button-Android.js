const Label                     = require("nf-core/ui/label");
const Color                     = require("nf-core/ui/color");
const View                      = require("nf-core/ui/view");
const extend                    = require('js-base/core/extend');
const TypeUtil                  = require("nf-core/util/type");

const NativeButton              = requireClass("android.widget.Button");
const NativeStateListDrawable   = requireClass("android.graphics.drawable.StateListDrawable");
const NativeDrawable            = requireClass("android.graphics.drawable.Drawable");
const NativeView                = requireClass("android.view.View");

const Button = extend(Label)(
    function (_super, params) {
        var self = this;
        if(!self.nativeObject){
            self.nativeObject = new NativeButton(Android.getActivity());
        }
        _super(this);
        
        self.nativeObject.setAllCaps(false); // enable lowercase texts

        var _backgroundImages = {
            normal: "",
            disabled: "",
            selected: "",
            pressed: "",
            focused: ""
        };
        Object.defineProperty(this, 'backgroundImage', {
            get: function() {
                return _backgroundImages;
            }, 
            set: function(backgroundImage) {
                // Assuming all paths are full path.
                _backgroundImages = backgroundImage;
                if(typeof(backgroundImage) === "string") {
                    var drawable = NativeDrawable.createFromPath(backgroundImage);
                    self.nativeObject.setBackground(drawable);
                }
                else{
                    var stateListSet = new NativeStateListDrawable();
                    var stateDrawable;
                    if(_backgroundImages.normal){
                        stateDrawable = NativeDrawable.createFromPath(_backgroundImages.normal);
                        stateListSet.addState(View.State.STATE_NORMAL,stateDrawable);
                    }
                    if(_backgroundImages.disabled){
                        stateDrawable = NativeDrawable.createFromPath(_backgroundImages.disabled);
                        stateListSet.addState(View.State.STATE_DISABLED,stateDrawable);
                    }
                    if(_backgroundImages.selected){
                        stateDrawable = NativeDrawable.createFromPath(_backgroundImages.selected);
                        stateListSet.addState(View.State.STATE_SELECTED,stateDrawable);
                    }
                    if(_backgroundImages.pressed){
                        stateDrawable = NativeDrawable.createFromPath(_backgroundImages.pressed);
                        stateListSet.addState(View.State.STATE_PRESSED,stateDrawable);
                    }
                    if(_backgroundImages.focused){
                        stateDrawable = NativeDrawable.createFromPath(_backgroundImages.focused);
                        stateListSet.addState(View.State.STATE_FOCUSED,stateDrawable);
                    }
                    self.nativeObject.setBackground(stateListSet);
                }
            },
            enumerable: true
        });
        
        Object.defineProperty(this, 'enabled', {
            get: function() {
                return self.nativeObject.isEnabled();
            },
            set: function(enabled) {
                if(TypeUtil.isBoolean(enabled)){
                    self.nativeObject.setEnabled(enabled);
                }
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
                if(onLongPressCallback) {
                    onLongPressCallback.apply(self);
                }
                return true; // Returns always true to solve AND-2713 bug.
            }
        }));
        
        // Default settings
        this.backgroundColor = Color.create("#00A1F1"); // Smartface blue
        this.textColor = Color.WHITE;
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
});

module.exports = Button;