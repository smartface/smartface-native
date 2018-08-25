const TextBox = require('../textbox');
const extend = require('js-base/core/extend');
const KeyboardType = require('sf-core/ui/keyboardtype');
const ActionKeyType = require('sf-core/ui/actionkeytype');
const Animator = require('sf-core/ui/animator');
const Color = require('sf-core/ui/color');
const TextAlignment = require('sf-core/ui/textalignment');

const MaterialTextField = extend(TextBox)(
    function(_super, params) {
        var self = this;

        if (!self.nativeObject) {
            self.nativeObject = new __SF_SMFMaterialTextField();
        }

        _super(this);
        
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }

    }
);

module.exports = MaterialTextField;
