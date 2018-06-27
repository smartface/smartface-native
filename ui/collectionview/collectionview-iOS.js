const View = require('../view');
const extend = require('js-base/core/extend');
const UIControlEvents = require("sf-core/util").UIControlEvents;

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
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // NATIVE COLLECTION VIEW CONTROLLER CLASS IMPLEMENTATION
        var CollectionViewControllerClass = SF.defineClass('CollectionViewController : UICollectionViewController', 
        {
            viewDidLoad: function() {
                self.valueForKey("collectionViewLayout").itemSize = {width: 75, height: 100};
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
                    });
                }
                return cell;
            },
            collectionViewDidSelectItemAtIndexPath : function(collectionView, indexPath){
                var cell = collectionView.cellForItemAtIndexPath(indexPath);
                if (cell) {
                    if (sfSelf.onItemSelected) {
                        sfSelf.onItemSelected(collectionViewItems[cell.uuid], indexPath.row, indexPath.section);
                    }
                }
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
            
            sfSelf.refreshControl = new __SF_UIRefreshControl();
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
        
        var _scrollBarEnabled = true;
        Object.defineProperty(sfSelf, 'scrollBarEnabled', {
            get: function() {
                return _scrollBarEnabled;
            },
            set: function(value) {
                if (typeof value === "boolean") {
                    if (typeof sfSelf.layout.scrollDirection === "number") {
                        _scrollBarEnabled = value;
                        switch (sfSelf.layout.scrollDirection) {
                            case 0:
                                sfSelf.nativeObject.showsVerticalScrollIndicator = _scrollBarEnabled;
                                break;
                            case 1:
                                sfSelf.nativeObject.showsHorizontalScrollIndicator = _scrollBarEnabled;
                                break;
                            default:
                                break;
                        }
                    }
                }
            },
            enumerable: true
        });
        
        var _refreshEnabled = false;
        Object.defineProperty(sfSelf, 'refreshEnabled', {
            get: function() {
                return _refreshEnabled;
            },
            set: function(value) {
                _refreshEnabled = value;
                if (value){
                    sfSelf.nativeObject.addSubview(sfSelf.refreshControl);
                }else{
                    sfSelf.refreshControl.removeFromSuperview();
                }
            },
            enumerable: true
        });
         
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // METHODS
        
        sfSelf.getFirstVisibleIndex = function(){
            var retval;
            var visibleIndexArray = sfSelf.nativeObject.indexPathsForVisibleItems();
            
            // visibleIndexArray unordered list needs to sort
            visibleIndexArray.sort(function(a, b){return a.row - b.row});
            visibleIndexArray.sort(function(a, b){return a.section - b.section});
            
            var visibleindex = sfSelf.nativeObject.indexPathsForVisibleItems()[0];
            if (sfSelf.sectionCount > 1) {
                retval = {
                    index : visibleindex.row,
                    section : visibleindex.section
                };
            } else {
                retval = visibleindex.row;
            }
            return retval;
        };
        
        sfSelf.getLastVisibleIndex = function(){
            var retval;
            var visibleIndexArray = sfSelf.nativeObject.indexPathsForVisibleItems();
            
            // visibleIndexArray unordered list needs to sort
            visibleIndexArray.sort(function(a, b){return a.row - b.row});
            visibleIndexArray.sort(function(a, b){return a.section - b.section});
            
            var visibleindex = visibleIndexArray[visibleIndexArray.length - 1];
            if (sfSelf.sectionCount > 1) {
                retval = {
                    index : visibleindex.row,
                    section : visibleindex.section
                };
            } else {
                retval = visibleindex.row;
            }
            return retval;
        };
        
        sfSelf.setPullRefreshColors = function(param){
            if( Object.prototype.toString.call( param ) === '[object Array]' ) {
                sfSelf.refreshControl.tintColor = param[0].nativeObject;
            } else {
                sfSelf.refreshControl.tintColor = param.nativeObject;
            }
        }
        
        sfSelf.refreshData = function(){
            sfSelf.nativeObject.reloadData();
        };
        
        sfSelf.scrollTo = function(index, section){
            var indexPath;
            if (typeof section === "number") {
                indexPath = NSIndexPath.indexPathForRowInSection(index, section);
            } else {
                indexPath = NSIndexPath.indexPathForRowInSection(index, 0);
            }
            
            sfSelf.nativeObject.scrollToItemAtIndexPathAtScrollPositionAnimated(indexPath, 1 << 0, true); // 1 << 0 means UICollectionViewScrollPositionTop
        };
        
        sfSelf.stopRefresh = function(){
            sfSelf.refreshControl.endRefreshing();
        }
        
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
        
        var _onItemSelected = null;
        Object.defineProperty(sfSelf, 'onItemSelected', {
            get: function() {
                return _onItemSelected;
            },
            set: function(value) {
                if (typeof value === "function") {
                    _onItemSelected = value; 
                }
            },
            enumerable: true
        });
        
        Object.defineProperty(sfSelf, 'onPullRefresh', {
            set: function(value) {
                sfSelf.refreshControl.addJSTarget(value.bind(this),UIControlEvents.valueChanged);
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