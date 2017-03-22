const extend     = require('js-base/core/extend');
const FlexLayout = require('../flexlayout');

const AbsoluteLayout = extend(FlexLayout)(
    function (_super, params) {
        _super(this);

        var superAddChild = this.addChild;
        this.addChild = function(view){
            superAddChild(view);
            view.positionType = FlexLayout.PositionType.ABSOLUTE;
        };
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = AbsoluteLayout;