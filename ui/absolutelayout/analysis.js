const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');
/**
 * @class UI.AbsoluteLayout
 * @since 0.1
 * @extends UI.ViewGroup
 * AbsoluteLayout is a layout that lets you specify exact positioning(x/y coordinates) of its child views.
 * 
 *     @example
 *     const AbsoluteLayout = require('sf-core/ui/absolutelayout');
 *     const Label = require('sf-core/ui/label');
 *     var myAbsoluteLayout = new AbsoluteLayout();
 *     var myLabel = new Label({
 *          text: "Smartface Label"
 *     });
 *     myAbsoluteLayout.addChild(myLabel);
 */
const AbsoluteLayout = extend(ViewGroup)(
    function (_super, params) {
        _super(this);

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = AbsoluteLayout;