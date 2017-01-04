const View = require('../view');
const TypeUtil = require("sf-core/util/type");
const extend = require('js-base/core/extend');

var LayoutType.ViewGroup = 0;
var LayoutType.Linear = 1;
var LayoutType.Relative = 2;
var LayoutType.Absolute = 3;

const ViewGroup = extend(View)(
    function (_super, params) {
        var self = this;
        var layoutType;
        var layoutParamConstructor;
        if(!self.nativeObject){
            throw "Can't create instance from ViewGroup. It is an abstract class."
            return;
        }
        _super(this);

        if(self.nativeObject.toString().contains("Relative")){
            layoutType = LayoutType.Relative;
        }
        else if(self.nativeObject.toString().contains("Linear")){
            layoutType = LayoutType.Linear;
        }
        else if(self.nativeObject.toString().contains("Absolute"){
            layoutType = LayoutType.Absolute;
        }
        else{
            layoutType = LayoutType.ViewGroup;
        }

        this.addChild = function(view){
            addChildAt(view,-1);
        };


        this.addChildAt = function(view, index){
            var viewPosition = generateViewPosition(view.getInitialPosition());
            var layoutParams;
            if(layoutType == LayoutType.Linear){
                // @todo change after implementation of LinearLayout
                layoutParams = new android.widget.LinearLayout.LayoutParams(
                                            viewPosition.width, viewPosition.height);
            }
            else if(layoutType == LayoutType.Relative){
                // @todo change after implementation of RelativeLayout
                layoutParams = new android.widget.RelativeLayout.LayoutParams(
                                            viewPosition.width, viewPosition.height);
            }
            else if(layoutType == LayoutType.AbsoluteLayout){
                layoutParams = new android.widget.AbsoluteLayout.LayoutParams(
                                            viewPosition.width, viewPosition.height,
                                            viewPosition.left, viewPosition.top);
            }
            else{
                layoutParams = new android.view.ViewGroup.LayoutParams(
                                            viewPosition.width, viewPosition.height,
                                            viewPosition.left, viewPosition.top);
            }
            self.nativeObject.addView(view, index, layoutParams);
        };

        this.removeChild = function(view){
            self.nativeObject.removeView(view.nativeObject);
        };

        this.removeChildAt = function(index){
            self.nativeObject.removeViewAt(index);
        };

        this.removeAll = function(){
            self.nativeObject.removeAllViews();
        };

        this.getChildIndex = function(view){
            return self.nativeObject.indexOfChild(view.nativeObject);
        };

        this.getChildAtIndex = function(index){
            return self.nativeObject.getChildAt(index);
        };

        this.getChildCount = function(){
            return self.nativeObject.getChildCount();
        };

        this.findChildById = function(id){
            return self.nativeObject.findViewById(id);
        };

        function generateViewPosition(paramViewPosition){
            // % values must handle here. Im searching for getting parent height.width
            var viewPosition = {};

            for(var positionKey in paramViewPosition){
                if(paramViewPosition[positionKey]){
                    if(paramViewPosition[positionKey] < 0){
                        viewPosition[positionKey] = paramViewPosition[positionKey]
                    }
                    else{
                        if(!TypeUtil.isNumeric(paramViewPosition[positionKey])){
                            viewPosition[positionKey] = self[positionKey] * (parseInt(widthInitial.replace("%")))/100;
                        }
                        else{
                            viewPosition[positionKey] = paramViewPosition[positionKey];
                        }
                    }
                }
            }
            return viewPosition;
        }

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = ViewGroup;