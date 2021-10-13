const FlexLayout = require("../../ui/flexlayout");
const View = require('../view');
const UIControlEvents = require("../../util").UIControlEvents;
const Events = require('./events');
const { EventEmitterCreator } = require('../../core/eventemitter');

const LayoutManager = require("../layoutmanager");

//NativeAccess
const Invocation = require('../../util/iOS/invocation.js');
const NSIndexPath = SF.requireClass("NSIndexPath");
const UIScrollViewInheritance = require('../../util').UIScrollViewInheritance;

GridView.prototype = Object.create(View.prototype);
function GridView(params) {
    var sfSelf = this;
    EventEmitterCreator(this, EventFunctions);
    sfSelf.registeredIndentifier = [];

    var defaultflowLayout;
    if (params && params.layoutManager) {
        defaultflowLayout = params.layoutManager;
    } else {
        throw new Error('GridView constructor must have layoutManager.');
    }

    var smfcollectionView = new __SF_UICollectionView(defaultflowLayout.nativeObject);
    smfcollectionView.numberOfSectionsCallback = function(collectionView) {
        return _sectionCount;
    };
    smfcollectionView.numberOfItemsInSectionCallback = function(collectionView, section) {
        var retval;
        if (_numberOfItemsInSection) {
            retval = _numberOfItemsInSection(section);
        } else {
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
        } else {
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

    View.call(this);

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
                _scrollBarEnabled = value;
                sfSelf.nativeObject.showsHorizontalScrollIndicator = _scrollBarEnabled;
                sfSelf.nativeObject.showsVerticalScrollIndicator = _scrollBarEnabled;
            }
        },
        enumerable: true
    });
    sfSelf.scrollBarEnabled = false;

    var _refreshEnabled = false;
    Object.defineProperty(sfSelf, 'refreshEnabled', {
        get: function() {
            return _refreshEnabled;
        },
        set: function(value) {
            _refreshEnabled = value;
            if (value) {
                sfSelf.nativeObject.addSubview(sfSelf.refreshControl);
            } else {
                sfSelf.refreshControl.removeFromSuperview();
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
        visibleIndexArray.sort(function(a, b) {
            return a.row - b.row
        });
        visibleIndexArray.sort(function(a, b) {
            return a.section - b.section
        });

        var visibleindex = visibleIndexArray[0];

        if (visibleindex === undefined) {
            return undefined;
        } else if (sfSelf.sectionCount > 1) {
            retval = {
                index: visibleindex.row,
                section: visibleindex.section
            };
        } else {
            retval = visibleindex.row;
        }
        return retval;
    };

    sfSelf.getLastVisibleIndex = function() {
        var retval;
        var visibleIndexArray = sfSelf.nativeObject.indexPathsForVisibleItems();

        // visibleIndexArray unordered list needs to sort
        visibleIndexArray.sort(function(a, b) {
            return a.row - b.row
        });
        visibleIndexArray.sort(function(a, b) {
            return a.section - b.section
        });

        var visibleindex = visibleIndexArray[visibleIndexArray.length - 1];

        if (visibleindex === undefined) {
            return undefined;
        } else if (sfSelf.sectionCount > 1) {
            retval = {
                index: visibleindex.row,
                section: visibleindex.section
            };
        } else {
            retval = visibleindex.row;
        }
        return retval;
    };

    sfSelf.setPullRefreshColors = function(param) {
        if (Object.prototype.toString.call(param) === '[object Array]') {
            sfSelf.refreshControl.tintColor = param[0].nativeObject;
        } else {
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
        } else {
            indexPath = NSIndexPath.indexPathForItemInSection(index, 0);
        }
        if (sfSelf.layoutManager) {
            if (sfSelf.layoutManager.scrollDirection == LayoutManager.ScrollDirection.VERTICAL) {
                sfSelf.nativeObject.scrollToItemAtIndexPathAtScrollPositionAnimated(indexPath, 1 << 0, (animate === false) ? false : true); // 1 << 0 means UICollectionViewScrollPositionTop
            } else {
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

    var _itemTypeForSection = function() {
        return "0";
    };
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

    const EventFunctions = {
        [Events.AttachedToWindow]: function() {
            //Android Only

        },
        [Events.DetachedFromWindow]: function() {
            //Android Only
        },
        [Events.Gesture]: function() {
            //Android Only
        },
        [Events.PullRefresh]: function() {
            sfSelf.onPullRefresh = function (state) {
                sfSelf.emitter.emit(Events.PullRefresh, state);
            } 
        },
        [Events.ItemBind]: function() {
            sfSelf.onItemBind = function (state) {
                sfSelf.emitter.emit(Events.ItemBind, state);
            } 
        },
        [Events.ItemCreate]: function() {
            sfSelf.onItemCreate = function (state) {
                sfSelf.emitter.emit(Events.ItemCreate, state);
            } 
        },
        [Events.ItemLongSelected]: function() {
            //Android Only
        },
        [Events.ItemSelected]: function() {
            _onItemSelected = function (state) {
                this.emitter.emit(Events.ItemSelected, state);
            } 
        },
        [Events.ItemType]: function() {
            sfSelf.onItemType = function (state) {
                sfSelf.emitter.emit(Events.ItemType, state);
            } 
        },
        [Events.Scroll]: function() {
            sfSelf.onScroll = function (state) {
                this.emitter.emit(Events.Scroll, state);
            } 
        },
        [Events.ScrollBeginDecelerating]: function() {
            const onScrollBeginDeceleratingHandler = function(scrollView) {
                const contentOffset = {
                    x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
                    y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
                };
                this.emitter.emit(Events.ScrollBeginDecelerating, contentOffset)
            };
            nativeObject.onScrollBeginDecelerating = onScrollBeginDeceleratingHandler;
        },
        [Events.ScrollBeginDragging]: function() {
            const onScrollBeginDraggingHandler = function(scrollView) {
                const contentOffset = {
                    x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
                    y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
                };
                this.emitter.emit(Events.ScrollBeginDragging, contentOffset)
            };
            self.ios.nativeObject.onScrollViewWillBeginDragging = onScrollBeginDraggingHandler;
        },
        [Events.ScrollEndDecelerating]: function() {
            const onScrollEndDeceleratingHandler = function(scrollView) {
                const contentOffset = {
                    x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
                    y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
                };
                this.emitter.emit(Events.ScrollEndDecelerating, contentOffset)
            };
            nativeObject.onScrollEndDecelerating = onScrollEndDeceleratingHandler;
        },
        [Events.ScrollEndDraggingWillDecelerate]: function() {
            const onScrollEndDraggingWillDecelerateHandler = function(scrollView, decelerate) {
                const contentOffset = {
                    x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
                    y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
                };
                this.emitter.emit(Events.ScrollEndDraggingWillDecelerate, contentOffset)

            };
            nativeObject.onScrollViewDidEndDraggingWillDecelerate = onScrollEndDraggingWillDecelerateHandler;
        },
        [Events.ScrollEndDraggingWithVelocityTargetContentOffset]: function() {
            const onScrollEndDraggingWithVelocityTargetContentOffsetHandler = function(scrollView, velocity, targetContentOffset) {
                const contentOffset = {
                    x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
                    y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
                };
                targetContentOffset.x += +scrollView.contentInsetDictionary.left;
                targetContentOffset.y += +scrollView.contentInsetDictionary.top;
                this.emitter.emit(Events.ScrollEndDraggingWillDecelerate, contentOffset, velocity, targetContentOffset);
            };
            nativeObject.onScrollViewWillEndDraggingWithVelocityTargetContentOffset = onScrollEndDraggingWithVelocityTargetContentOffsetHandler;
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

GridView.Android = {};
GridView.Android.SnapAlignment = {};
module.exports = GridView;