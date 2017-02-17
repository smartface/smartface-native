const View = require('../view');
const TypeUtil = require("nf-core/util/type");
const extend = require('js-base/core/extend');

const ViewGroup = extend(View)(
    function (_super, params) {
        var self = this;
        self.childViews = {}
        if(!self.nativeObject){
            throw "Can't create instance from ViewGroup. It is an abstract class."
            return;
        }
        _super(this);

        this.addChild = function(view){
            view.parent = self;
            self.childViews[view.id] = view;
            self.nativeObject.addView(view.nativeObject);
        };

        this.removeChild = function(view){
            self.nativeObject.removeView(view.nativeObject);
            if(self.childViews[view.id]){
                delete self.childViews[view.id];
            }
        };

        this.removeAll = function(){
            self.nativeObject.removeAllViews();
            self.childViews = {};
        };

        this.getChildCount = function(){
            return self.nativeObject.getChildCount();
        };

        this.findChildById = function(id){
            return self.childViews[id] ? self.childViews[id] : null;
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