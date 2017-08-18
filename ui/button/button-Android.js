const AndroidConfig             = require("sf-core/util/Android/androidconfig");
const Label                     = require("sf-core/ui/label");
const Color                     = require("sf-core/ui/color");
const extend                    = require('js-base/core/extend');
const TypeUtil                  = require("sf-core/util/type");

const NativeButton              = requireClass("android.widget.Button");
const NativeView                = requireClass("android.view.View");

const Button = extend(Label)(
    function (_super, params) {
        if(!this.nativeObject){
            this.nativeObject = new NativeButton(AndroidConfig.activity);
        }
        _super(this);
        
        Object.defineProperties(this, {
            'onPress': {
                get: function() {
                    return this.__onPress;
                },
                set: function(onPress) {
                    this.__onPress = onPress.bind(this);
                    if (!this.__didSetOnClickListener) setOnClickListener(this);
                },
                enumerable: true
            },
            'onLongPress': {
                get: function() {
                    return this.__onLongPress;
                },
                set: function(onLongPress) {
                    this.__onLongPress = onLongPress.bind(this);
                    if (!this.__didSetOnLongClickListener) setOnLongClickListener(this);
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
        if(!this.isNotSetDefaults){
            this.nativeObject.setAllCaps(bool(false)); // enable lowercase texts
            this.backgroundColor = Color.create("#00A1F1"); // Smartface blue
            this.textColor = Color.WHITE;
            this.padding = 0;
        }
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
});

function setOnClickListener(object) {
    object.nativeObject.setOnClickListener(NativeView.OnClickListener.implement({
        onClick: function(view) {
                this.__onPress && this.__onPress();
        }.bind(object)
    }));
    object.__didSetOnClickListener = true;
}

function setOnLongClickListener(object) {
    object.nativeObject.setOnLongClickListener(NativeView.OnLongClickListener.implement({
        onLongClick : function(view){
            if(this.__onLongPress) {
                this.__onLongPress();
            }
            return true; // Returns always true to solve AND-2713 bug.
        }.bind(object)
    }));
    object.__didSetOnLongClickListener = true;
}

module.exports = Button;