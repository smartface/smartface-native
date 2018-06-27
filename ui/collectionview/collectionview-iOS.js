const View = require('../view');
const extend = require('js-base/core/extend');

const StaggeredFlowLayout = require("./layout");

//NativeAccess
const Invocation = require('sf-core/util/iOS/invocation.js');
const UICollectionViewController = SF.requireClass("UICollectionView");
const UICollectionView = SF.requireClass("UICollectionView");
// const UICollectionViewCell = SF.requireClass("UICollectionViewCell");
const UICollectionViewFlowLayout = SF.requireClass("UICollectionViewFlowLayout");
const NSIndexPath = SF.requireClass("NSIndexPath");

const CollectionView = extend(View)(
   function (_super, params) {
        var sfSelf = this;
        
        console.log("START!!");
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // NATIVE COLLECTION VIEW CONTROLLER CLASS IMPLEMENTATION
        var CollectionViewControllerClass = SF.defineClass('CollectionViewController : UICollectionViewController', 
        {
            viewDidLoad: function() {
                self.valueForKey("collectionView").registerClassForCellWithReuseIdentifier(__SF_UICollectionViewCell, 'Cell');
            },
            numberOfSectionsInCollectionView: function(collectionView) {
                return _sectionCount;
            },
            collectionViewNumberOfItemsInSection: function(collectionView, section) {
                var retval;
                if (_numberOfItemsInSection) {
                    retval = _numberOfItemsInSection(section);
                } else {
                    retval = _itemCount;
                }
                return retval;
            },
            collectionViewCellForItemAtIndexPath: function(collectionView, indexPath) {
                // Cell dequeing for type
                var type = sfSelf.onItemType ? sfSelf.onItemType(indexPath.row, indexPath.section).toString() : "Cell";
                console.log("type: " + type );
                var cell = collectionView.dequeueReusableCellWithReuseIdentifierForIndexPath(type, indexPath);
                if (!cell) {
                    collectionView.registerClassForCellWithReuseIdentifier(__SF_UICollectionViewCell, type);
                    cell = collectionView.dequeueReusableCellWithReuseIdentifierForIndexPath(type, indexPath);
                }
                
                // onItemCreate and onItemBind callback pairs
                if (cell.contentView.subviews.length > 0) {
                    SF.dispatch_async(SF.dispatch_get_main_queue(), function() {
                        if (sfSelf.onItemBind) {
                            sfSelf.onItemBind(collectionViewItems[cell.uuid], indexPath.row, indexPath.section);
                        }
                    });
                }else{
                    collectionViewItems[cell.uuid] = sfSelf.onItemCreate(cell.reuseIdentifier);
                    
                    SF.dispatch_async(SF.dispatch_get_main_queue(), function() {
                        cell.contentView.addSubview(collectionViewItems[cell.uuid].nativeObject);
                        if (sfSelf.onItemBind) {
                            sfSelf.onItemBind(collectionViewItems[cell.uuid], indexPath.row, indexPath.section);
                        }
                        cell.contentView.yoga.applyLayoutPreservingOrigin(false);
                    });
                }
                return cell;
            }
        });
        
        var defaultflowLayout = new StaggeredFlowLayout();
        
        // CollectionViewControllerClass Init Scope Using Invocation
        var alloc = Invocation.invokeClassMethod(CollectionViewControllerClass.name,"alloc",[],"id");
        var argument = new Invocation.Argument({
            type:"NSObject",
            value: defaultflowLayout.nativeObject
        });
        var collectionViewController = Invocation.invokeInstanceMethod(alloc,"initWithCollectionViewLayout:",[argument],"NSObject");
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // INITIALIZATION
        if(!sfSelf.nativeObject){
            sfSelf.nativeObject = collectionViewController.valueForKey("collectionView");
        }
        
        var collectionViewItems = {};
        
        _super(this);
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // PROPERTIES
        
        var _itemCount = 0;
        Object.defineProperty(sfSelf, 'itemCount', {
            get: function() {
                return _itemCount;
            },
            set: function(value) {
                if (typeof value === "number") {
                    _itemCount = value;   
                }
            },
            enumerable: true
        });
        
        var _layout = defaultflowLayout;
        Object.defineProperty(sfSelf, 'layout', {
            get: function() {
                return _layout;
            },
            // set: function(value) {
            //     if (typeof value === "object") {
            //         _layout = value;   
            //     }
            // },
            enumerable: true
        });
         
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // METHODS
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // CALLBACKS
        
        var _onItemCreate = null;
        Object.defineProperty(sfSelf, 'onItemCreate', {
            get: function() {
                return _onItemCreate;
            },
            set: function(value) {
                if (typeof value === "function") {
                    _onItemCreate = value; 
                }
            },
            enumerable: true
        });
        
        var _onItemBind = null;
        Object.defineProperty(sfSelf, 'onItemBind', {
            get: function() {
                return _onItemBind;
            },
            set: function(value) {
                if (typeof value === "function") {
                    _onItemBind = value; 
                }
            },
            enumerable: true
        });
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // HIDDEN
        
        var _sectionCount = 1;
        Object.defineProperty(sfSelf, 'sectionCount', {
            get: function() {
                return _sectionCount;
            },
            set: function(value) {
                if (typeof value === "number") {
                    _sectionCount = value;   
                }
            },
            enumerable: true
        });
         
        var _numberOfItemsInSection = null;
        Object.defineProperty(sfSelf, 'onItemCountForSection', {
            get: function() {
                return _numberOfItemsInSection;
            },
            set: function(value) {
                if (typeof value === "function") {
                    _numberOfItemsInSection = value;   
                }
            },
            enumerable: true
        });
        
        var _itemTypeForSection = null;
        Object.defineProperty(sfSelf, 'onItemType', {
            get: function() {
                return _itemTypeForSection;
            },
            set: function(value) {
                if (typeof value === "function") {
                    _itemTypeForSection = value;   
                }
            },
            enumerable: true
        });
         
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);
module.exports = CollectionView;