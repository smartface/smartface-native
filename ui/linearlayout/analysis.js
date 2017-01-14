const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');
/**
 * @class UI.LinearLayout
 * @since 0.1
 * @extends UI.ViewGroup
 * LinearLayout is a layout that aligns all children in a single direction, vertically or horizontally
 * defined with UI.LayoutOrientation. All children of a LinearLayout will be displayed as one after the
 * other, so for vertical orientation will only have one child per row, no matter how wide they are,
 * and for horizontal orientation will only one child per column, no matter how high they are.
 * 
 *     @example
 *     const LinearLayout = require('sf-core/ui/linearlayout');
 *     const LayoutOrientation = require('sf-core/ui/layoutorientation');
 *     const Label = require('sf-core/ui/label');
 *     var myLinearLayout = new LinearLayout();
 *     myLinearLayout.orientation = LayoutOrientation.VERTICAL;
 *     var myLabel1 = new Label({
 *          text: "Smartface Label 1"
 *     });
 *     var myLabel2 = new Label({
 *          text: "Smartface Label 2"
 *     });
 *     myLinearLayout.addChild(myLabel1);
 *     myLinearLayout.addChild(myLabel2);
 *
 */
const LinearLayout = extend(ViewGroup)(
    function (_super, params) {
        _super(this);

        this.orientation = UI.LayoutOrientation.VERTICAL;

        this.alignment = UI.LayoutAlignment.LEFT;

        this.spacing = 0;

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = LinearLayout;