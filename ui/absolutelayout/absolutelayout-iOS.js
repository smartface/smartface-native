const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');

const AbsoluteLayout = extend(ViewGroup)(
    function (_super, params) {
        _super(this);
        
        var superAddChild = this.addChild.bind(this);
        this.addChild = function(view){
            view.position = 1;
            superAddChild(view);
        }
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = AbsoluteLayout;