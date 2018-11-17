function UIScrollViewInheritance() {};

UIScrollViewInheritance.addPropertiesAndMethods = function(customNativeObject) {
    var self = this;
    
    var nativeObject = customNativeObject ? customNativeObject : self.nativeObject;
    
    Object.defineProperty(self.ios, 'bounces', {
        get: function() {
            return nativeObject.valueForKey("bounces");
        },
        set: function(value) {
            nativeObject.setValueForKey(value, "bounces");
        },
        enumerable: true
    });
};

module.exports = UIScrollViewInheritance;