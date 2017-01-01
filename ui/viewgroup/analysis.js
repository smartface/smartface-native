const View = require('../view');
const extend = require('js-base/core/extend');
/**
 * @class UI.ViewGroup
 * @since 0.1
 * @extends View
 * A ViewGroup is a special view that can contain other views (called children) like layouts and views.
 * ViewGroup is an abstract class. You can't create instance from it.
 */
const ViewGroup = extend(View)(
    function (_super, params) {
        _super(this);

        /**
        * Adds a child view to container. View will be added on native decided index.
        *
        *     @example
        *     const ViewGroup = require('sf-core/ui/viewgroup');
        *     const Label = require('sf-core/ui/label');
        *     var myViewGroup = new ViewGroup();
        *     var myLabel = new Label({
        *          text: "Smartface Label"
        *     });
        *     myViewGroup.addChild(myLabel);
        *
        * @param {View} view The child view to add.
        * @method addChild
        */
        this.addChild = function(view){};


        /**
        * Adds a child view at the specified position to the container.
        *
        *     @example
        *     const ViewGroup = require('sf-core/ui/viewgroup');
        *     const Label = require('sf-core/ui/label');
        *     var myViewGroup = new ViewGroup();
        *     var myLabel = new Label({
        *          text: "Smartface Label"
        *     });
        *     myViewGroup.addChildAt(myLabel,1);
        *
        * @param {View} view The child view to add.
        * @param {Number} index The position at which to add the child.
        * @method addChildAt
        */
        this.addChildAt = function(view, index){};

        /**
        * Remove a child view from container. For removing view must be exists inside the container.
        *
        *     @example
        *     const ViewGroup = require('sf-core/ui/viewgroup');
        *     const Label = require('sf-core/ui/label');
        *     var myViewGroup = new ViewGroup();
        *     var myLabel = new Label({
        *          text: "Smartface Label"
        *     });
        *     myViewGroup.addChild(myLabel);
        *     myViewGroup.removeChild(myLabel);
        *
        * @param {View} view The child view to remove.
        * @method removeChild
        */
        this.removeChild = function(view){};

        /**
        * Remove a child view at the specified position from container. For removing view must be exists on this index.
        *
        *     @example
        *     const ViewGroup = require('sf-core/ui/viewgroup');
        *     const Label = require('sf-core/ui/label');
        *     var myViewGroup = new ViewGroup();
        *     var myLabel = new Label({
        *          text: "Smartface Label"
        *     });
        *     myViewGroup.addChildAt(myLabel,2);
        *     myViewGroup.removeChildAt(2);
        *
        * @param {Number} index The position in the container of the view to remove
        * @method removeChildAt
        */
        this.removeChildAt = function(index){};

        /**
        * Removes all child views from the container.
        *
        *     @example
        *     const ViewGroup = require('sf-core/ui/viewgroup');
        *     const Label = require('sf-core/ui/label');
        *     var myViewGroup = new ViewGroup();
        *     var myLabel = new Label({
        *          text: "Smartface Label"
        *     });
        *     myViewGroup.addChild(myLabel);
        *     myViewGroup.removeAll();
        *
        * @method removeAll
        */
        this.removeAll = function(){};

        /**
        * Get the view position from container view hierarchy.
        *
        *     @example
        *     const ViewGroup = require('sf-core/ui/viewgroup');
        *     const Label = require('sf-core/ui/label');
        *     var myViewGroup = new ViewGroup();
        *     var myLabel = new Label({
        *          text: "Smartface Label"
        *     });
        *     myViewGroup.addChild(myLabel);
        *     var position = myViewGroup.getChildIndex(myLabel);
        *
        * @param {View} view The child view to get index.
        * @returns {Number} a positive number representing the position of the view in the container, or -1 if the view does not exist within the container
        * @method getChildIndex
        */
        this.getChildIndex = function(view){};

        /**
        * Get a child view at the specified position from container .
        *
        *     @example
        *     const ViewGroup = require('sf-core/ui/viewgroup');
        *     const Label = require('sf-core/ui/label');
        *     var myViewGroup = new ViewGroup();
        *     var myLabel = new Label({
        *          text: "Smartface Label"
        *     });
        *     myViewGroup.addChildAt(myLabel,1);
        *     var childView = myViewGroup.getChildIndex(1);
        *
        * @param {Number} The position at which to get the view from.
        * @returns {View} Child view at the specified position from container, or null if the view does not exist within the container
        * @method getChildIndex
        */
        this.getChildAtIndex = function(index){};

        /**
        * Get child view count from container.
        *
        *     @example
        *     const ViewGroup = require('sf-core/ui/viewgroup');
        *     const Label = require('sf-core/ui/label');
        *     var myViewGroup = new ViewGroup();
        *     var myLabel = new Label({
        *          text: "Smartface Label"
        *     });
        *     var childViewCount = myViewGroup.getChildCount();
        *
        * @returns {Number} The number of children in the container, or 0 if there is no child exists within the container.
        * @method getChildCount
        */
        this.getChildCount = function(){};

        /**
        * Finds a child view with specified id within the container.
        *
        *     @example
        *     const ViewGroup = require('sf-core/ui/viewgroup');
        *     const Label = require('sf-core/ui/label');
        *     var myViewGroup = new ViewGroup();
        *     var myLabel = new Label({
        *          text: "Smartface Label",
        *          id: 11235
        *     });
        *     var childView = myViewGroup.findChildById(11235);
        *
        * @param {Number} id The specified id of the view.
        * @returns {View} Founded view within the container, or null if view does not exists within the container.
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