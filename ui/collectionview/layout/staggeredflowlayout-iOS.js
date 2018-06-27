//NativeAccess
const Invocation = require('sf-core/util/iOS/invocation.js');
const UICollectionView = SF.requireClass("UICollectionView");
const UICollectionViewFlowLayout = SF.requireClass("UICollectionViewFlowLayout");

function StaggeredFlowLayout(params) {
    var sfSelf = this;
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // NATIVE FLOWLAYOUT CLASS IMPLEMENTATION
    
    var flowLayout = UICollectionViewFlowLayout.new(); // This will change to StaggeredFlowLayout class
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // INITIALIZATION
    if(!sfSelf.nativeObject){
        sfSelf.nativeObject = flowLayout;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // PROPERTIES
    
    // var _layout = collectionViewController.valueForKey("collectionView"); // TODO : IT MUST BE STAGGEREDFLOWLAYOUT JS Class object!!
    // Object.defineProperty(sfSelf, 'layout', {
    //     get: function() {
    //         return _layout;
    //     },
    //     set: function(value) {
    //         if (typeof value === "object") {
    //             _layout = value;   
    //         }
    //     },
    //     enumerable: true
    // });
    
    var _scrollDirection = 0;
    Object.defineProperty(sfSelf, 'scrollDirection', {
        get: function() {
            return _scrollDirection;
        },
        set: function(value) {
            if (typeof value === "number") {
                _scrollDirection = value;   
            }
        },
        enumerable: true
    });
     
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // METHODS
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CALLBACKS
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // HIDDEN
     
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}
module.exports = StaggeredFlowLayout;