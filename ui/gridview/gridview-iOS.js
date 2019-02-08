const FlexLayout = require("sf-core/ui/flexlayout");
const View = require('../view');
const extend = require('js-base/core/extend');
const UIControlEvents = require("sf-core/util").UIControlEvents;

const LayoutManager = require("../layoutmanager");

//NativeAccess
const Invocation = require('sf-core/util/iOS/invocation.js');
const NSIndexPath = SF.requireClass("NSIndexPath");
const UIScrollViewInheritance = require('sf-core/util').UIScrollViewInheritance;

const GridView = extend(View)(
    function(_super, params) {
        var sfSelf = this;

        sfSelf.registeredIndentifier = [];

        var CollectionViewClass = __SF_UICollectionView;

        var defaultflowLayout;
        if (params && params.layoutManager) {
            defaultflowLayout = params.layoutManager;
        }
        else {
            throw new Error('GridView constructor must have layoutManager.');
        }

        // CollectionViewClass Init Scope Using Invocation
        var alloc = Invocation.invokeClassMethod(CollectionViewClass.name, "alloc", [], "id");
        var argument = new Invocation.Argument({
            type: "NSObject",
            value: defaultflowLayout.nativeObject
        });

        var frame = new Invocation.Argument({
            type: "CGRect",
            value: { x: 0, y: 0, width: 0, height: 0 }
        });

        var smfcollectionView = Invocation.invokeInstanceMethod(alloc, "initWithFrame:collectionViewLayout:", [frame, argument], "NSObject");
        smfcollectionView.numberOfSectionsCallback = function(collectionView) {
            return _sectionCount;
        };
        smfcollectionView.numberOfItemsInSectionCallback = function(collectionView, section) {
            var retval;
            if (_numberOfItemsInSection) {
                retval = _numberOfItemsInSection(section);
            }
            else {
                retval = _itemCount;
            }
            return retval;
        };

        smfcollectionView.cellForItemAtIndexPathCallback = function(collectionView, indexPath) {
            // Cell dequeing for type
            var type = sfSelf.onItemType(indexPath.row, indexPath.section).toString();

            if (sfSelf.registeredIndentifier.indexOf(type) === -1) {
                collectionView.registerClassForCellWithReuseIdentifier(__SF_UICollectionViewCell, type);
                sfSelf.registeredIndentifier.push(type);
            }

            var cell = collectionView.dequeueReusableCellWithReuseIdentifierForIndexPath(type, indexPath);
            // onItemCreate and onItemBind callback pairs
            if (cell.contentView.subviews.length > 0) {
                if (sfSelf.onItemBind) {
                    sfSelf.onItemBind(collectionViewItems[cell.uuid], indexPath.row, indexPath.section);
                }
            }
            else {
                collectionViewItems[cell.uuid] = sfSelf.onItemCreate(parseInt(cell.reuseIdentifier));
                
                // Bug ID : IOS-2750
                (collectionViewItems[cell.uuid].nativeObject.yoga.direction == 0) && smfcollectionView.superview && (collectionViewItems[cell.uuid].nativeObject.yoga.direction = smfcollectionView.superview.yoga.resolvedDirection);
                ///////
                
                cell.contentView.addSubview(collectionViewItems[cell.uuid].nativeObject);
                if (sfSelf.onItemBind) {
                    sfSelf.onItemBind(collectionViewItems[cell.uuid], indexPath.row, indexPath.section);
                }
            }

            return cell;
        };
        smfcollectionView.didSelectItemAtIndexPathCallback = function(collectionView, indexPath) {
            var cell = collectionView.cellForItemAtIndexPath(indexPath);
            if (cell) {
                if (sfSelf.onItemSelected) {
                    sfSelf.onItemSelected(collectionViewItems[cell.uuid], indexPath.row, indexPath.section);
                }
            }
        };

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // INITIALIZATION

        if (!sfSelf.nativeObject) {
            sfSelf.nativeObject = smfcollectionView;
            defaultflowLayout.collectionView = smfcollectionView;
            defaultflowLayout.jsCollectionView = sfSelf;
            sfSelf.refreshControl = new __SF_UIRefreshControl();
        }

        var collectionViewItems = {};

        _super(this);

        UIScrollViewInheritance.addPropertiesAndMethods.call(this);

        sfSelf.android.saveInstanceState = function() {};
        sfSelf.android.restoreInstanceState = function() {};

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // PROPERTIES

        Object.defineProperty(sfSelf, 'onScroll', {
            set: function(value) {
                sfSelf.nativeObject.didScroll = value;
            },
            enumerable: true
        });

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

        var _itemLength = 50;
        Object.defineProperty(sfSelf, 'itemLength', {
            get: function() {
                return _itemLength;
            },
            set: function(value) {
                _itemLength = value;
            },
            enumerable: true
        });

        Object.defineProperty(sfSelf, 'layoutManager', {
            get: function() {
                return defaultflowLayout;
            },
            enumerable: true
        });


        var _scrollBarEnabled = true;
        Object.defineProperty(sfSelf, 'scrollBarEnabled', {
            get: function() {
                return _scrollBarEnabled;
            },
            set: function(value) {
                if (typeof value === "boolean") {
                    if (typeof sfSelf.layoutManager.scrollDirection === "number") {
                        _scrollBarEnabled = value;
                        switch (sfSelf.layoutManager.scrollDirection) {
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
                if (value) {
                    sfSelf.nativeObject.addSubview(sfSelf.refreshControl);
                }
                else {
                    sfSelf.refreshControl.removeFromSuperview();
                }
            },
            enumerable: true
        });

        var _pagingEnabled = false;
        Object.defineProperty(sfSelf, 'pagingEnabled', {
            get: function() {
                return _pagingEnabled;
            },
            set: function(value) {
                if (typeof value === "boolean") {
                    _pagingEnabled = value;
                    sfSelf.nativeObject.pagingEnabled = _pagingEnabled;
                }
            },
            enumerable: true
        });

        Object.defineProperty(sfSelf, 'scrollEnabled', {
            get: function() {
                return sfSelf.nativeObject.valueForKey("scrollEnabled");
            },
            set: function(value) {
                sfSelf.nativeObject.setValueForKey(value, "scrollEnabled");
            },
            enumerable: true
        });

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // METHODS

        sfSelf.getFirstVisibleIndex = function() {
            var retval;
            var visibleIndexArray = sfSelf.nativeObject.indexPathsForVisibleItems();

            // visibleIndexArray unordered list needs to sort
            visibleIndexArray.sort(function(a, b) { return a.row - b.row });
            visibleIndexArray.sort(function(a, b) { return a.section - b.section });

            var visibleindex = sfSelf.nativeObject.indexPathsForVisibleItems()[0];
            if (sfSelf.sectionCount > 1) {
                retval = {
                    index: visibleindex.row,
                    section: visibleindex.section
                };
            }
            else {
                retval = visibleindex.row;
            }
            return retval;
        };

        sfSelf.getLastVisibleIndex = function() {
            var retval;
            var visibleIndexArray = sfSelf.nativeObject.indexPathsForVisibleItems();

            // visibleIndexArray unordered list needs to sort
            visibleIndexArray.sort(function(a, b) { return a.row - b.row });
            visibleIndexArray.sort(function(a, b) { return a.section - b.section });

            var visibleindex = visibleIndexArray[visibleIndexArray.length - 1];
            if (sfSelf.sectionCount > 1) {
                retval = {
                    index: visibleindex.row,
                    section: visibleindex.section
                };
            }
            else {
                retval = visibleindex.row;
            }
            return retval;
        };

        sfSelf.setPullRefreshColors = function(param) {
            if (Object.prototype.toString.call(param) === '[object Array]') {
                sfSelf.refreshControl.tintColor = param[0].nativeObject;
            }
            else {
                sfSelf.refreshControl.tintColor = param.nativeObject;
            }
        }

        sfSelf.refreshData = function() {
            sfSelf.nativeObject.reloadData();
        };

        sfSelf.scrollTo = function(index, animate, section) {
            var indexPath;
            if (typeof section === "number") {
                indexPath = NSIndexPath.indexPathForItemInSection(index, section);
            }
            else {
                indexPath = NSIndexPath.indexPathForItemInSection(index, 0);
            }
            if (sfSelf.layoutManager) {
                if (sfSelf.layoutManager.scrollDirection == LayoutManager.ScrollDirection.VERTICAL) {
                    sfSelf.nativeObject.scrollToItemAtIndexPathAtScrollPositionAnimated(indexPath, 1 << 0, (animate === false) ? false : true); // 1 << 0 means UICollectionViewScrollPositionTop
                }
                else {
                    sfSelf.nativeObject.scrollToItemAtIndexPathAtScrollPositionAnimated(indexPath, 1 << 3, (animate === false) ? false : true); // 1 << 3 means UICollectionViewScrollPositionLeft
                }
            }
        };

        sfSelf.stopRefresh = function() {
            sfSelf.refreshControl.endRefreshing();
        }

        sfSelf.itemByIndex = function(index, section) {
            var _section = 0;
            if (typeof section === "number") {
                _section = section;
            }

            var indexPath = NSIndexPath.indexPathForRowInSection(index, _section);
            var cell = sfSelf.nativeObject.cellForItemAtIndexPath(indexPath);

            var retval = null;
            if (cell) {
                retval = collectionViewItems[cell.uuid];
            }
            return retval;
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
                sfSelf.refreshControl.addJSTarget(value.bind(this), UIControlEvents.valueChanged);
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

        var _itemTypeForSection = function() { return "0"; };
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
module.exports = GridView;
