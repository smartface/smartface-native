const Label                     = require("sf-core/ui/label");
const Color                     = require("sf-core/ui/color");
const extend                    = require('js-base/core/extend');
const TypeUtil                  = require("sf-core/util/type");

const NativeButton              = requireClass("android.widget.Button");
const NativeView                = requireClass("android.view.View");

const Button = extend(Label)(
    function (_super, params) {
        var self = this;
        var _onPress;
        var _onLongPress;
        if(!self.nativeObject){
            self.nativeObject = new NativeButton(Android.getActivity());
        }
        _super(this);
        
        Object.defineProperties(this, {
            'enabled': {
                get: function() {
                    return self.nativeObject.isEnabled();
                },
                set: function(enabled) {
                    if(TypeUtil.isBoolean(enabled)){
                        self.nativeObject.setEnabled(enabled);
                    }
                },
                enumerable: true
            },
            'onPress': {
                get: function() {
                    return _onPress;
                },
                set: function(onPress) {
                    _onPress = onPress;
                },
                enumerable: true
            },
            'onLongPress': {
                get: function() {
                    return _onLongPress;
                },
                set: function(onLongPress) {
                    _onLongPress = onLongPress;
                },
                enumerable: true
            },
            'toString': {
                value: function(){
                    return 'Button';
                },
                enumerable: true, 
                configurable: true
            }
        });
        
        // Default settings
        if(!this.isSetDefaults){
            self.nativeObject.setAllCaps(false); // enable lowercase texts
            this.backgroundColor = Color.create("#00A1F1"); // Smartface blue
            this.textColor = Color.WHITE;
            this.nativeObject.setOnClickListener(NativeView.OnClickListener.implement({
                onClick: function(view) {
                        _onPress && _onPress.apply(self);
                }
            }));
            this.nativeObject.setOnLongClickListener(NativeView.OnLongClickListener.implement({
                onLongClick : function(view){
                    if(_onLongPress) {
                        _onLongPress.apply(self);
                    }
                    return true; // Returns always true to solve AND-2713 bug.
                }
            }));
        }
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
});

module.exports = Button;