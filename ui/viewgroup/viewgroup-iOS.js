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
        
        var self = this;
        _super(this);

        this.addChild = function(view){
            self.nativeObject.addSubview(view.nativeObject);
        };

        this.addChildAt = function(view, index){
            self.nativeObject.insertSubviewAtIndex(view.nativeObject,index);
        };

        this.removeChild = function(view){
            view.nativeObject.removeFromSuperview();
        };

         this.removeChildAt = function(index){
             var subviews = self.nativeObject.subviews;
             subviews[index].removeFromSuperview();
         };

        this.removeAll = function(){
            var subviews = self.nativeObject.subviews;
            for (subview in subviews) { 
                 subviews[subview].removeFromSuperview();
            }
        };

        this.getChildIndex = function(view){
            var subviews = self.nativeObject.subviews;
            for (i = 0; i < subviews.length; i++) {
                if (subviews[i] == view.nativeObject) {
                    return i;
                }
            }
        };

        this.getChildAtIndex = function(index){
            var subviews = self.nativeObject.subviews;
            return subviews[index];
        };

        this.getChildCount = function(){
            var subviews = self.nativeObject.subviews;
            return subviews.length;
        };

     
        this.findChildById = function(id){
            return self.nativeObject.viewWithTag(id);
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