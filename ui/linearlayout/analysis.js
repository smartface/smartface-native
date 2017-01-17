const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');
/**
 * @class UI.LinearLayout
 * @since 0.1
 * @extends UI.ViewGroup
 * 
 * LinearLayout is a layout that aligns all children in a single direction, vertically or horizontally
 * defined with UI.LayoutOrientation. All children of a LinearLayout will be displayed as one after the
 * other, so for vertical orientation will only have one child per row, no matter how wide they are,
 * and for horizontal orientation will only one child per column, no matter how high they are.
 * 
 *     @example
 *     const LinearLayout = require('sf-core/ui/linearlayout');
 *     const LayoutOrientation = require('sf-core/ui/layoutorientation');
 *     const LayoutAligment = require('sf-core/ui/layoutalignment');
 *     const Label = require('sf-core/ui/label');
 *     var myLinearLayout = new LinearLayout();
 *     myLinearLayout.orientation = LayoutOrientation.VERTICAL;
 *     myLinearLayout.aligment = LayoutAligment.RIGHT;
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

        /**
         * Gets/sets layout orientation of the LinearLayout. 
         * Use "horizontal" for rows, "vertical" for columns.
         *
         *     @example
         *     const LinearLayout = require('sf-core/ui/linearlayout');
         *     const LayoutOrientation = require('sf-core/ui/layoutorientation');
         *     const Label = require('sf-core/ui/label');
         *     var myLabel1 = new Label({
         *          text: "Smartface Label 1"
         *     });
         *     var myLabel2 = new Label({
         *          text: "Smartface Label 2"
         *     });
         *     var myLinearLayout = new LinearLayout();
         *     myLinearLayout.orientation = LayoutOrientation.VERTICAL;
         *     myLinearLayout.addChild(myLabel1);
         *     myLinearLayout.addChild(myLabel2);
         *
         * @property {UI.LayoutOrientation} [orientation = UI.LayoutOrientation.HORIZONTAL]
         * @since 0.1
         */
        this.orientation = UI.LayoutOrientation.HORIZONTAL;

        /**
         * Gets/sets aligments of view inside the LinearLayout. Aligment 
         * describes how child views are positioned inside the LinearLayout.
         *
         *     @example
         *     const LinearLayout = require('sf-core/ui/linearlayout');
         *     const LayoutAlignment = require('sf-core/ui/layoutalignment');
         *     const Label = require('sf-core/ui/label');
         *     var myLabel1 = new Label({
         *          text: "Smartface Label 1"
         *     });
         *     var myLabel2 = new Label({
         *          text: "Smartface Label 2"
         *     });
         *     var myLinearLayout = new LinearLayout();
         *     myLinearLayout.alignment = LayoutAlignment.RIGHT;
         *     myLinearLayout.addChild(myLabel1);
         *     myLinearLayout.addChild(myLabel2);
         *
         * @property {UI.LayoutAlignment} [orientation = UI.LayoutAlignment.LEFT]
         * @since 0.1
         */
        this.alignment = UI.LayoutAlignment.LEFT;

        /**
         * Gets/sets space between rows for horizontal or columns for vertical
         * aligned ListView.
         *
         *     @example
         *     const LinearLayout = require('sf-core/ui/linearlayout');
         *     const LayoutAlignment = require('sf-core/ui/layoutalignment');
         *     const LayoutOrientation = require('sf-core/ui/layoutorientation');
         *     const Label = require('sf-core/ui/label');
         *     var myLabel1 = new Label({
         *          text: "Smartface Label 1"
         *     });
         *     var myLabel2 = new Label({
         *          text: "Smartface Label 2"
         *     });
         *     var myLinearLayout = new LinearLayout();
         *     myLinearLayout.spacing = 10;
         *     myLinearLayout.alignment = LayoutAlignment.RIGHT;
         *     myLinearLayout.orientation = LayoutOrientation.VERTICAL;
         *     myLinearLayout.addChild(myLabel1);
         *     myLinearLayout.addChild(myLabel2);
         *
         * @property {Number} [spacing = 0]
         * @since 0.1
         */
        this.spacing = 0;
    }
);

module.exports = LinearLayout;