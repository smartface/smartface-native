/*globals requireClass*/
const View = require('../view');
const ListViewItem = require("../listviewitem");
const TypeUtil = require("../../util/type");
const AndroidUnitConverter = require("../../util/Android/unitconverter");
const AndroidConfig = require("../../util/Android/androidconfig");
const scrollableSuper = require("../../util/Android/scrollable");
const LayoutParams = require("../../util/Android/layoutparams");

const NativeSwipeRefreshLayout = requireClass("androidx.swiperefreshlayout.widget.SwipeRefreshLayout");
const NativeSFLinearLayoutManager = requireClass("io.smartface.android.sfcore.ui.listview.SFLinearLayoutManager");
const NativeSFRecyclerView = requireClass("io.smartface.android.sfcore.ui.listview.SFRecyclerView");
const NativeContextThemeWrapper = requireClass("android.view.ContextThemeWrapper");

const NativeR = requireClass(AndroidConfig.packageName + ".R");
ListView.prototype = Object.create(View.prototype);
function ListView(params) {
    var self = this;

    if (!this.nativeObject) {
        this.nativeObject = new NativeSwipeRefreshLayout(AndroidConfig.activity);
    }

    let _callbacks = {
        onAttachedToWindow: function() {
            self.android.onAttachedToWindow && self.android.onAttachedToWindow();
        },
        onDetachedFromWindow: function() {
            self.android.onDetachedFromWindow && self.android.onDetachedFromWindow();
        }
    };

    if (!this.nativeInner) {
        if (NativeR.style.ScrollBarRecyclerView) {
            var themeWrapper = new NativeContextThemeWrapper(AndroidConfig.activity, NativeR.style.ScrollBarRecyclerView);
            this.nativeInner = new NativeSFRecyclerView(themeWrapper, _callbacks);
        } else {
            this.nativeInner = new NativeSFRecyclerView(AndroidConfig.activity, _callbacks);
        }
        this.nativeInner.setHasFixedSize(true);
        this.nativeInner.setDrawingCacheEnabled(true);
        this.nativeInner.setItemViewCacheSize(0);
        this.nativeInner.setClipToPadding(false);
    }

    this._layoutManager = {};
    this._layoutManager.nativeObject = new NativeSFLinearLayoutManager(AndroidConfig.activity);
    this.nativeInner.setLayoutManager(this._layoutManager.nativeObject);
    this.nativeObject.addView(this.nativeInner);
    this.__isRecyclerView = true;

    View.call(this);
    scrollableSuper(this, this.nativeInner);

    var _listViewItems = {};
    const SFRecyclerViewAdapter = requireClass("io.smartface.android.sfcore.ui.listview.SFRecyclerViewAdapter");
    var callbacks = {
        onCreateViewHolder: function(viewType) {
            var holderViewLayout;
            try {
                if(!_onRowCreate){
                    throw new Error("onRowCreate must be set.");
                }
                holderViewLayout = _onRowCreate(viewType);
                // INFO: If onRowCreate doesn't return ListViewItem, the app crashes.
                // This check handles this case.
                if (!holderViewLayout || !holderViewLayout.nativeInner) {
                    throw new Error("onRowCreate must be return an instanceof UI.ListViewItem");
                }
            } catch (e) {
                const Application = require("../../application");
                Application.onUnhandledError && Application.onUnhandledError(e);
                holderViewLayout = new ListViewItem();
            }

            if (self.rowHeight)
                holderViewLayout.height = self.rowHeight;
            holderViewLayout.nativeObject.getLayoutParams().width = LayoutParams.MATCH_PARENT;

            _listViewItems[holderViewLayout.nativeInner.itemView.hashCode()] = holderViewLayout;

            holderViewLayout.nativeInner.setRecyclerViewAdapter(self.nativeDataAdapter);
            return holderViewLayout.nativeInner;
        },
        onBindViewHolder: function(itemViewHashCode, position) {
            var _holderViewLayout = _listViewItems[itemViewHashCode];

            if (!self.rowHeight && _onRowHeight) {
                var rowHeight = _onRowHeight(position);
                _holderViewLayout.height = rowHeight;
            } else if (!_onRowHeight && self.rowHeight && self.rowHeight != _holderViewLayout.height) {
                _holderViewLayout.height = self.rowHeight;
            }
            _holderViewLayout.nativeObject.getLayoutParams().width = LayoutParams.MATCH_PARENT;

            _onRowBind && _onRowBind(_holderViewLayout, position);
        },
        getItemCount: function() {
            if (isNaN(_itemCount))
                return 0;
            else if (typeof(_itemCount) !== "number")
                throw new Error("itemCount must be an number.");
            return _itemCount;
        },
        getItemViewType: function(position) {
            let rowType;
            _onRowType && (rowType = _onRowType(position));
            return (typeof(rowType) === "number") ? rowType : 0;
        },
        onItemSelected: function(position, itemViewHashCode) {
            var selectedItem = _listViewItems[itemViewHashCode];
            _onRowSelected && _onRowSelected(selectedItem, position);
        },
        onItemLongSelected: function(position, itemViewHashCode) {
            var selectedItem = _listViewItems[itemViewHashCode];
            _onRowLongSelected && _onRowLongSelected(selectedItem, position);
        }
    };
    self.nativeDataAdapter = new SFRecyclerViewAdapter(callbacks);

    var _onScroll,
        _rowHeight, _onRowCreate, _onRowSelected, _onRowLongSelected, _onRowMoved, _onRowCanMove,
        _onPullRefresh, _onRowHeight, _onRowBind, _onRowType, _itemCount = 0,
        _onRowMove, _onRowCanSwipe,
        _contentInset = {},
        _onScrollListener = undefined,
        _scrollEnabled, isScrollListenerAdded = false,
        _rowMoveEnabled = false,
        _longPressDragEnabled = false, _swipeEnabled = false;
    Object.defineProperties(this, {
        'layoutManager': {
            get: function() {
                return self._layoutManager;
            },
            enumerable: true
        },
        // properties
        'listViewItemByIndex': {
            value: function(index) {
                var viewHolder = self.nativeInner.findViewHolderForAdapterPosition(index);
                if (!viewHolder) return undefined; // like ios

                return _listViewItems[viewHolder.itemView.hashCode()];
            },
            enumerable: true
        },
        'rowHeight': {
            get: function() {
                return _rowHeight;
            },
            set: function(rowHeight) {
                if (TypeUtil.isNumeric(rowHeight)) {
                    _rowHeight = rowHeight;
                }
            },
            enumerable: true
        },
        'scrollEnabled': {
            get: function() {
                return _scrollEnabled;
            },
            set: function(isScrollEnabled) {
                if (TypeUtil.isBoolean(isScrollEnabled)) {
                    _scrollEnabled = isScrollEnabled;
                    this.nativeInner.getLayoutManager().setCanScrollVerically(isScrollEnabled);
                }
            },
            enumerable: true
        },
        'itemCount': {
            get: function() {
                return _itemCount;
            },
            set: function(itemCount) {
                if (TypeUtil.isNumeric(itemCount)) {
                    _itemCount = itemCount;
                }
            },
            enumerable: true
        },
        'verticalScrollBarEnabled': {
            get: function() {
                return this.nativeInner.isVerticalScrollBarEnabled();
            },
            set: function(verticalScrollBarEnabled) {
                if (TypeUtil.isBoolean(verticalScrollBarEnabled)) {
                    this.nativeInner.setVerticalScrollBarEnabled(verticalScrollBarEnabled);
                }
            },
            enumerable: true
        },
        'refreshEnabled': {
            get: function() {
                return this.nativeObject.isEnabled();
            },
            set: function(refreshEnabled) {
                if (TypeUtil.isBoolean(refreshEnabled)) {
                    this.nativeObject.setEnabled(refreshEnabled);
                }
            },
            enumerable: true
        },
        'rowMoveEnabled': {
            get: () => _rowMoveEnabled,
            set: (value) => {
                _rowMoveEnabled = value;
                getItemTouchHelper().sfItemTouchHelperCallback.setEnableDragAndDrop(_rowMoveEnabled);
            },
            enumerable: true
        },
        'longPressDragEnabled': {
            get: () => _longPressDragEnabled,
            set: (value) => {
                _longPressDragEnabled = value;
                if (sfItemTouchHelperCallback)
                    sfItemTouchHelperCallback.setLongPressDragEnabled(_longPressDragEnabled);
            },
            enumerable: true
        },
        'swipeEnabled': {
            get: () => _swipeEnabled,
            set: (value) => {
                _swipeEnabled = value;
                getItemTouchHelper().sfItemTouchHelperCallback.setEnableSwipe(_swipeEnabled);
            },
            enumerable: true
        },
        //methods
        'getLastVisibleIndex': {
            value: function(colors) {
                return this.nativeInner.getLayoutManager().findLastVisibleItemPosition();
            },
            enumerable: true
        },
        'getFirstVisibleIndex': {
            value: function() {
                return this.nativeInner.getLayoutManager().findFirstVisibleItemPosition();
            },
            enumerable: true
        },
        'scrollTo': {
            value: function(index, animate) {
                if ((typeof(animate) === "undefined") || animate) {
                    this.nativeInner.smoothScrollToPosition(index);
                } else {
                    this.nativeInner.scrollToPosition(index);
                }
            },
            enumerable: true
        },
        'refreshData': {
            value: function() {
                // this.nativeInner.setLayoutManager(linearLayoutManager);
                // this.nativeInner.setAdapter(dataAdapter);
                self.nativeDataAdapter.notifyDataSetChanged();
                // dataAdapter.notifyItemInserted(_itemCount);
            },
            enumerable: true
        },
        'setPullRefreshColors': {
            value: function(colors) {
                var nativeColors = [];
                colors.forEach(function(element) {
                    nativeColors.push(element.nativeObject);
                })
                /** @todo
                 * Error: Method setColorSchemeColors with 1 parameters couldn\'t found.
                 * Invoking method with varargs parameter maybe caused this. 
                 */
                this.nativeObject.setColorSchemeColors(array(nativeColors, "int"));
            },
            enumerable: true
        },
        'startRefresh': {
            value: function() {
                this.nativeObject.setRefreshing(true);
            },
            enumerable: true
        },
        'stopRefresh': {
            value: function() {
                this.nativeObject.setRefreshing(false);
            },
            enumerable: true
        },
        // callbacks
        'onRowCreate': {
            get: function() {
                return _onRowCreate;
            },
            set: function(onRowCreate) {
                _onRowCreate = onRowCreate.bind(this);
            },
            enumerable: true
        },
        'onRowBind': {
            get: function() {
                return _onRowBind;
            },
            set: function(onRowBind) {
                _onRowBind = onRowBind.bind(this);
            },
            enumerable: true
        },
        'onRowType': {
            get: function() {
                return _onRowType;
            },
            set: function(onRowType) {
                _onRowType = onRowType.bind(this);
            },
            enumerable: true
        },
        'onRowSelected': {
            get: function() {
                return _onRowSelected;
            },
            set: function(onRowSelected) {
                _onRowSelected = onRowSelected.bind(this);
            },
            enumerable: true
        },
        'onRowMoved': {
            get: () => _onRowMoved,
            set: (onRowMovedCallback) => {
                _onRowMoved = onRowMovedCallback;
            },
            enumerable: true
        },
        'onRowMove': {
            get: () => _onRowMove,
            set: (onRowMoveCallback) => {
                _onRowMove = onRowMoveCallback;
            },
            enumerable: true
        },
        'onRowCanSwipe': {
            get: () => _onRowCanSwipe,
            set: (onRowCanSwipeCallback) => {
                _onRowCanSwipe = onRowCanSwipeCallback;
            },
            enumerable: true
        },
        'onRowCanMove': {
            get: () => _onRowCanMove,
            set: (onRowCanMoveCallback) => {
                _onRowCanMove = onRowCanMoveCallback;
            },
            enumerable: true
        },
        'contentInset': {
            get: function() {
                return _contentInset;
            },
            set: function(params) {
                _contentInset = params;
                setContentInset();
            },
            enumerable: true
        },
        'onRowHeight': {
            get: function() {
                return _onRowHeight;
            },
            set: function(onRowHeight) {
                _onRowHeight = onRowHeight.bind(this);
            },
            enumerable: true
        },
        'onScroll': {
            get: function() {
                return _onScroll;
            },
            set: function(onScroll) {
                _onScroll = onScroll;

                if (onScroll && isScrollListenerAdded === true)
                    return;

                let scrollListenerObject = _onScrollListener === undefined ? createAndSetScrollListener() : _onScrollListener;
                if (onScroll) {
                    self.nativeInner.setOnScrollListener(scrollListenerObject);
                    isScrollListenerAdded = true;
                } else if (!_onScrollStateChanged) {
                    self.nativeInner.removeOnScrollListener(scrollListenerObject);
                    isScrollListenerAdded = false;
                }
            },
            enumerable: true
        },
        'onPullRefresh': {
            get: function() {
                return _onPullRefresh;
            },
            set: function(onPullRefresh) {
                _onPullRefresh = onPullRefresh.bind(this);
            },
            enumerable: true
        },
        'toString': {
            value: function() {
                return 'ListView';
            },
            enumerable: true,
            configurable: true
        }
    });

    var _overScrollMode = 0,
        _onScrollStateChanged;
    // android-only properties
    Object.defineProperties(this.android, {
        'onScrollStateChanged': {
            get: function() {
                return _onScrollStateChanged;
            },
            set: function(onScrollStateChanged) {
                _onScrollStateChanged = onScrollStateChanged;

                if (onScrollStateChanged && isScrollListenerAdded === true)
                    return;

                let scrollListenerObject = _onScrollListener === undefined ? createAndSetScrollListener() : _onScrollListener;
                if (onScrollStateChanged) {
                    self.nativeInner.setOnScrollListener(scrollListenerObject);
                    isScrollListenerAdded = true;
                } else if (!_onScroll) {
                    self.nativeInner.removeOnScrollListener(scrollListenerObject);
                    isScrollListenerAdded = false;
                }
            },
            enumerable: true
        },
        'onRowLongSelected': {
            get: function() {
                return _onRowLongSelected;
            },
            set: function(onRowLongSelected) {
                _onRowLongSelected = onRowLongSelected.bind(this);
            },
            enumerable: true,
            configurable: true
        },
        'overScrollMode': {
            get: function() {
                return _overScrollMode;
            },
            set: function(mode) {
                self.nativeInner.setOverScrollMode(mode);
                _overScrollMode = mode;
            },
            enumerable: true,
            configurable: true
        },
        'startDrag': {
            value: (viewHolder) => {
                if (nItemTouchHelper)
                    nItemTouchHelper.startDrag(viewHolder.nativeInner);
            },
            enumerable: true,
            configurable: true
        }
    });

    function setContentInset() {
        var topInset = 0;
        var bottomInset = 0;
        var contentInset = self.contentInset;
        if (contentInset && self.nativeInner) {
            if (contentInset.top) {
                topInset = AndroidUnitConverter.dpToPixel(contentInset.top);
            }
            if (contentInset.bottom) {
                bottomInset = AndroidUnitConverter.dpToPixel(contentInset.bottom);
            }
        }

        if (self.nativeInner) {
            self.nativeInner.setPaddingRelative(0, topInset, 0, bottomInset);
        }
    }

    let nItemTouchHelper, sfItemTouchHelperCallback;

    function getItemTouchHelper() {
        if (!nItemTouchHelper) {
            const SFItemTouchHelperCallback = requireClass('io.smartface.android.sfcore.ui.listview.SFItemTouchHelperCallback');
            const SFItemTouchHelper = requireClass('io.smartface.android.sfcore.ui.listview.SFItemTouchHelper');

            sfItemTouchHelperCallback = new SFItemTouchHelperCallback({
                onRowMove: function(draggedItemIndex, targetItemIndex) {
                    let result = self.onRowMove && self.onRowMove(draggedItemIndex, targetItemIndex);
                    return result === undefined ? true : result;
                },
                onRowMoved: function(fromPos, toPos) {
                    self.onRowMoved && self.onRowMoved(fromPos, toPos);
                },
                onRowCanMove: function(index) {
                    let result = self.onRowCanMove && self.onRowCanMove(index);
                    return result === undefined ? true : result;
                },
                onRowSwipe: function(direction, index) {
                    let result = self.onRowSwipe && self.onRowSwipe({
                        direction,
                        index,
                        ios: {
                            expansionSettings: {}
                        }
                    });
                    if (!result || result.length === 0)
                        return null;
                    const {
                        font,
                        backgroundColor,
                        textColor,
                        text,
                        icon,
                        android: {
                            threshold: threshold = 0.5,
                            borderBottomLeftRadius: borderBottomLeftRadius = 0,
                            borderBottomRightRadius: borderBottomRightRadius = 0,
                            borderTopLeftRadius: borderTopLeftRadius = 0,
                            borderTopRightRadius: borderTopRightRadius = 0,
                            paddingLeft: paddingLeft = 0,
                            paddingRight: paddingRight = 0,
                            paddingTop: paddingTop = 0,
                            paddingBottom: paddingBottom = 0,
                        } = {},
                        onPress
                    } = result[0];
                    if (!self.sfSwipeItem)
                        self.sfSwipeItem = new SFItemTouchHelperCallback.SFSwipeItem();
                    self.sfSwipeItem.resetVariables();
                    let bitmap = icon ? icon.nativeObject.getBitmap() : null;
                    self.sfSwipeItem.setSwipeItemProps(font.nativeObject, font.size, backgroundColor.nativeObject, text, textColor.nativeObject, bitmap, threshold, {
                        onPress: function(index) {
                            onPress && onPress({
                                index
                            });
                        }
                    });
                    let borderRadii = array([borderTopLeftRadius, borderTopLeftRadius, borderTopRightRadius, borderTopRightRadius,
                        borderBottomRightRadius, borderBottomRightRadius, borderBottomLeftRadius, borderBottomLeftRadius
                    ].map(r => AndroidUnitConverter.dpToPixel(r)), "float");
                    let paddings = array([paddingLeft, paddingRight, paddingTop, paddingBottom].map(p => AndroidUnitConverter.dpToPixel(p)), "float")
                    self.sfSwipeItem.setSwipeItemDimensions(paddings, borderRadii);

                    return self.sfSwipeItem;
                },
                onRowCanSwipe: function(index) {
                    let result = self.onRowCanSwipe && self.onRowCanSwipe(index);
                    return (!result) ? ListView.SwipeDirection.LEFTTORIGHT | ListView.SwipeDirection.RIGHTTOLEFT : result.reduce((acc, cValue) => acc | cValue, 0);
                }
            });
            nItemTouchHelper = new SFItemTouchHelper(sfItemTouchHelperCallback);
            nItemTouchHelper.attachToRecyclerView(self.nativeInner);
        }
        return {
            nItemTouchHelper,
            sfItemTouchHelperCallback
        };
    }

    function createAndSetScrollListener() {
        const SFOnScrollListener = requireClass("io.smartface.android.sfcore.ui.listview.SFOnScrollListener");
        var overrideMethods = {
            onScrolled: function(dx, dy) {
                if (!self.touchEnabled) {
                    return;
                }
                //Remove  due to the incorrect onScrolled's return parameter. Such as scrollTo(0) causes it to return fault dx & dy parameters.
                var dY = AndroidUnitConverter.pixelToDp(dy);
                var dX = AndroidUnitConverter.pixelToDp(dx);
                // _contentOffset.x += dx;
                // _contentOffset.y += dy;

                // var offsetX = AndroidUnitConverter.pixelToDp(_contentOffset.x);
                // var offsetY = AndroidUnitConverter.pixelToDp(_contentOffset.y);
                _onScroll && _onScroll({
                    translation: {
                        x: dX,
                        y: dY
                    },
                    contentOffset: self.contentOffset
                });
            },
            onScrollStateChanged: function(newState) {
                if (!self.touchEnabled) {
                    return;
                }
                _onScrollStateChanged && _onScrollStateChanged(newState, self.contentOffset);
            },
        };
        _onScrollListener = new SFOnScrollListener(overrideMethods);
        return _onScrollListener;
    }

    // ios-only properties
    this.ios.swipeItems = {};
    this.ios.swipeItem = function(title, action) {
        return {};
    };

    this.nativeInner.setAdapter(self.nativeDataAdapter);

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

ListView.SwipeItem = require('./swipeitem.js');

ListView.SwipeDirection = {
    LEFTTORIGHT: 1 << 3,
    RIGHTTOLEFT: 1 << 2
};
Object.freeze(ListView.SwipeDirection);

ListView.iOS = {};
ListView.iOS.RowAnimation = {};

module.exports = ListView;