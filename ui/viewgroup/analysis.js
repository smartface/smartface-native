/**
 * @class UI.ViewGroup
 * @since 0.1
 * @extends UI.View
 * A ViewGroup is a view that can contain other views (called children).
 * ViewGroup is parent class of all layouts. ViewGroup is an abstract class. You can't create instance from it.
 *
 *     @example
 *     const FlexLayout = require('nf-core/ui/flexlayout');
 *     const Label = require('nf-core/ui/label');
 *     var myFlexLayout = new FlexLayout();
 *     var myLabel = new Label({
 *          text: "Smartface Label"
 *     });
 *     myFlexLayout.addChild(myLabel);
 */
const ViewGroup = extend(View)(
    function (_super, params) {
        _super(this);

        /**
         * This function adds a child view to a viewgroup.
         *
         * @param {UI.View} view The child view to add.
         * @android
         * @ios
         * @method addChild
         * @since 0.1
         */
        this.addChild = function(view){};

        /**
         * Remove a child view from viewgroup.
         *
         * @param {UI.View} view The child view to remove.
         * @android
         * @ios
         * @method removeChild
         * @since 0.1
         */
        this.removeChild = function(view){};

        /**
         * Removes all child views from viewgroup.
         *
         * @method removeAll
         * @android
         * @ios
         * @since 0.1
         */
        this.removeAll = function(){};

        /**
         * Gets the count of children in a viewgroup.
         *
         * @returns {Number} The number of children in the layout, or 0 if there is no child exists within the layout.
         * @method getChildCount
         * @android
         * @ios
         * @since 0.1
         */
        this.getChildCount = function(){};

        /**
         * Finds a child view with specified id within the layout.
         *
         *     @example
         *     const FlexLayout = require('nf-core/ui/flexlayout');
         *     const Label = require('nf-core/ui/label');
         *     var myFlexLayout = new FlexLayout();
         *     var myLabel = new Label({
         *          text: "Smartface Label",
         *          id: 11235
         *     });
         *     myFlexLayout.addChild(myLabel);
         *     var childView = myFlexLayout.findChildById(11235);
         *
         * @param {Number} id The specified id of the view.
         * @returns {UI.View} Founded view within the layout, or null if view does not exists within the layout.
         * @method findChildById
         * @android
         * @ios
         * @since 0.1
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
