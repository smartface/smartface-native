const View = require('../view');
const extend = require('js-base/core/extend');
/**
 * @class UI.ViewGroup
 * @since 0.1
 * @extends UI.View
 * A ViewGroup is a special view that can contain other views (called children) like layouts and views.
 * ViewGroup is parent class of all layouts. ViewGroup is an abstract class. You can't create instance from it.
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
const ViewGroup = extend(View)(
    function (_super, params) {
        _super(this);

        /**
         * Adds a child view to layout. View will be added on native decided index.
         *
         *     @example
         *     const AbsoluteLayout = require('sf-core/ui/absolutelayout');
         *     const Label = require('sf-core/ui/label');
         *     var myAbsoluteLayout = new AbsoluteLayout();
         *     var myLabel = new Label({
         *          text: "Smartface Label"
         *     });
         *     myAbsoluteLayout.addChild(myLabel);
         *
         * @param {View} view The child view to add.
         * @method addChild
         */
        this.addChild = function(view){};

        /**
         * Remove a child view from layout. For removing view must be exists inside the layout.
         *
         *     @example
         *     const AbsoluteLayout = require('sf-core/ui/absolutelayout');
         *     const Label = require('sf-core/ui/label');
         *     var myAbsoluteLayout = new AbsoluteLayout();
         *     var myLabel = new Label({
         *          text: "Smartface Label"
         *     });
         *     myAbsoluteLayout.addChild(myLabel);
         *     myAbsoluteLayout.removeChild(myLabel);
         *
         * @param {View} view The child view to remove.
         * @method removeChild
         */
        this.removeChild = function(view){};

        /**
         * Removes all child views from the layout.
         *
         *     @example
         *     const AbsoluteLayout = require('sf-core/ui/absolutelayout');
         *     const Label = require('sf-core/ui/label');
         *     var myAbsoluteLayout = new AbsoluteLayout();
         *     var myLabel = new Label({
         *          text: "Smartface Label"
         *     });
         *     myAbsoluteLayout.addChild(myLabel);
         *     myAbsoluteLayout.removeAll();
         *
         * @method removeAll
         */
        this.removeAll = function(){};

        /**
         * Get child view count from layout.
         *
         *     @example
         *     const AbsoluteLayout = require('sf-core/ui/absolutelayout');
         *     const Label = require('sf-core/ui/label');
         *     var myAbsoluteLayout = new AbsoluteLayout();
         *     var myLabel = new Label({
         *          text: "Smartface Label"
         *     });
         *     var childViewCount = myAbsoluteLayout.getChildCount();
         *
         * @returns {Number} The number of children in the layout, or 0 if there is no child exists within the layout.
         * @method getChildCount
         */
        this.getChildCount = function(){};

        /**
         * Finds a child view with specified id within the layout.
         *
         *     @example
         *     const AbsoluteLayout = require('sf-core/ui/absolutelayout');
         *     const Label = require('sf-core/ui/label');
         *     var myAbsoluteLayout = new AbsoluteLayout();
         *     var myLabel = new Label({
         *          text: "Smartface Label",
         *          id: 11235
         *     });
         *     myAbsoluteLayout.addChild(myLabel);
         *     var childView = myAbsoluteLayout.findChildById(11235);
         *
         * @param {Number} id The specified id of the view.
         * @returns {View} Founded view within the layout, or null if view does not exists within the layout.
         * @method findChildById
         */
        this.findChildById = function(id){};


        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = ViewGroup;