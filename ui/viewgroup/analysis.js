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
        *     const LinearContainer = require('sf-core/ui/linearcontainer');
        *     var myLinearContainer = new LinearContainer();
        *     myLinearContainer.addChild(myLabel);
        *
        * @param {View} view The child view to add.
        * @method addChild
        */
        this.addChild = function(view){};


        /**
        * Adds a child view at the specified position to the container.
        *
        *     @example
        *     const LinearContainer = require('sf-core/ui/linearcontainer');
        *     var myLinearContainer = new LinearContainer();
        *     myLinearContainer.addChildAt(myLabel,1);
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
        *     const LinearContainer = require('sf-core/ui/linearcontainer');
        *     var myLinearContainer = new LinearContainer();
        *     myLinearContainer.removeChild(myLabel);
        *
        * @param {View} view The child view to remove.
        * @method removeChild
        */
        this.removeChild = function(view){};

        /**
        * Remove a child view at the specified position from container. For removing view must be exists on this index.
        *
        *     @example
        *     const LinearContainer = require('sf-core/ui/linearcontainer');
        *     var myLinearContainer = new LinearContainer();
        *     myLinearContainer.removeChildAt(2);
        *
        * @param {Number} index The position in the container of the view to remove
        * @method removeChildAt
        */
        this.removeChildAt = function(index){};

        /**
        * Removes all child views from the container.
        *
        *     @example
        *     const LinearContainer = require('sf-core/ui/linearcontainer');
        *     var myLinearContainer = new LinearContainer();
        *     myLinearContainer.removeAll();
        *
        * @method removeAll
        */
        this.removeAll = function(){};

        /**
        * Get the view position from container view hierarchy.
        *
        *     @example
        *     const LinearContainer = require('sf-core/ui/absolutecontainer');
        *     var myLinearContainer = new LinearContainer();
        *     var position = myLinearContainer.getChildIndex(myLabel);
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
        *     const LinearContainer = require('sf-core/ui/absolutecontainer');
        *     var myLinearContainer = new LinearContainer();
        *     var childView = myLinearContainer.getChildIndex(1);
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
        *     const LinearContainer = require('sf-core/ui/absolutecontainer');
        *     var myLinearContainer = new LinearContainer();
        *     var childViewCount = myLinearContainer.getChildCount();
        *
        * @returns {Number} The number of children in the container, or 0 if there is no child exists within the container.
        * @method getChildCount
        */
        this.getChildCount = function(){};

        /**
        * Finds a child view with specified id within the container.
        *
        *     @example
        *     const LinearContainer = require('sf-core/ui/absolutecontainer');
        *     var myLinearContainer = new LinearContainer();
        *     var childView = myLinearContainer.findChildById(11235);
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