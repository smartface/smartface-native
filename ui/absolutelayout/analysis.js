const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');
/**
 * @class UI.AbsoluteLayout
 * @since 0.1
 * @extends UI.ViewGroup
 * @deprecated since 1.1.10, you may use UI.FlexLayout.PositionType#ABSOLUTE instead
 * 
 * AbsoluteLayout is a layout that lets you specify the exact positions of its child views.
 *
 *     @example
 *     const AbsoluteLayout = require('sf-core/ui/absolutelayout');
 *     const Label = require('sf-core/ui/label');
 *     const Color = require('sf-core/ui/color');
 *
 *     var myAbsoluteLayout = new AbsoluteLayout({
 *         width: 400,
 *         height: 500,
 *         backgroundColor: Color.create("#ff9900")
 *     });
 *     var myLabel1 = new Label({
 *         text: "Back",
 *         top: 20, left: 10, width: 100, height: 30,
 *         backgroundColor: Color.create("#3f5daf")
 *     });
 *     var myLabel2 = new Label({
 *         text: "Middle",
 *         top: 60, left: 30, width: 100, height: 30,
 *         backgroundColor: Color.create("#00aa08")
 *     });
 *     var myLabel3 = new Label({
 *         text: "Front",
 *         top: 100, left: 50, width: 100, height: 100,
 *         backgroundColor: Color.create("#af3f3f")
 *     });
 *
 *     myAbsoluteLayout.addChild(myLabel1);
 *     myAbsoluteLayout.addChild(myLabel2);
 *     myAbsoluteLayout.addChild(myLabel3);
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
