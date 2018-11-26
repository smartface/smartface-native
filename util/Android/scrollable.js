function Scrollable(childJsClass, nativeScrollableObject) {
    if(!childJsClass.android) {
        childJsClass.android = {};
    }
    
    var _overScrollMode = 0;
    Object.defineProperties(childJsClass.android, {
        'overScrollMode': {
            get: function() {
                return _overScrollMode;
            },
            set: function(mode) {
                nativeScrollableObject.setOverScrollMode(mode);
                _overScrollMode = mode;
            },
            enumerable: true,
            configurable: true
        }
    });
}

module.exports = Scrollable;