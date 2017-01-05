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
        var childs = [];
        
        var self = this;
        _super(this);

        this.addChild = function(view){
            self.nativeObject.addSubview(view.nativeObject);
            view.parent = self;
            childs.push(view);
        };

        this.removeChild = function(view){
            var index = childs.indexOf(view);
            if (index != -1) {
                view.nativeObject.removeFromSuperview();  
                childs.splice(index, 1);
            }
        };

        this.removeAll = function(){
            childs = [];
            var subviews = self.nativeObject.subviews;
            for (subview in subviews) { 
                 subviews[subview].removeFromSuperview();
            }
        };


        this.getChildCount = function(){
            var subviews = self.nativeObject.subviews;
            return subviews.length;
        };

     
        this.findChildById = function(id){
            var view = childs.filter(function( child ) {
                return child.id == id;
            });
            return view;
        };

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = ViewGroup;