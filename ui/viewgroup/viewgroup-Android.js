const View = require('../view');
const TypeUtil = require("sf-core/util/type");
const extend = require('js-base/core/extend');

const ViewGroup = extend(View)(
    function (_super, params) {
        if(!this.nativeObject){
            throw new Error("Can't create instance from ViewGroup. It is an abstract class.");
        }
        
        this.childViews = {};
        _super(this);
        
        Object.defineProperties(this, {
            'addChild': {
                value: function(view){
                    view.parent = this;
                    this.childViews[view.id] = view;
                    if(this instanceof require("sf-core/ui/flexlayout")){
                        this.nativeObject.addView(view.nativeObject, view.yogaNode);
                    }
                    else{
                        this.nativeObject.addView(view.nativeObject);
                    }
                },
                enumerable: true
            },
            'removeChild': {
                value: function(view){
                    this.nativeObject.removeView(view.nativeObject);
                    if(this.childViews[view.id]){
                        delete this.childViews[view.id];
                    }
                },
                enumerable: true
            },
            'removeAll': {
                value: function(){
                    this.nativeObject.removeAllViews();
                    this.childViews = {};
                },
                enumerable: true
            },
            'getChildCount': {
                value: function(){
                    return this.nativeObject.getChildCount();
                },
                enumerable: true
            },
            'findChildById': {
                value: function(id){
                    return this.childViews[id] ? this.childViews[id] : null;
                },
                enumerable: true
            },
            'toString': {
                value: function(){
                    return 'ViewGroup';
                },
                enumerable: true, 
                configurable: true
            }
        });

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = ViewGroup;