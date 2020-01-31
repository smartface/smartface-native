/* globals requireClass, array, toJSArray */
const View = require('../view');
const extend = require('js-base/core/extend');
const GridViewItem = require('../gridviewitem');
const TypeUtil = require("../../util/type");
const AndroidConfig = require("../../util/Android/androidconfig");
const GridViewLayoutManager = require('../layoutmanager');
const scrollableSuper = require("../../util/Android/scrollable");
const LayoutParams = require("../../util/Android/layoutparams");

const NativeSFRecyclerView = requireClass("io.smartface.android.sfcore.ui.listview.SFRecyclerView");
const NativeSwipeRefreshLayout = requireClass("androidx.swiperefreshlayout.widget.SwipeRefreshLayout");
const NativeContextThemeWrapper = requireClass("android.view.ContextThemeWrapper");

const NativeR = requireClass(AndroidConfig.packageName + ".R");

const GridView = extend(View)(
    function(_super, params) {
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
            // For creating RecyclerView with android:scrollbar=vertical attribute
            if (NativeR.style.ScrollBarRecyclerView) {
                var themeWrapper = new NativeContextThemeWrapper(AndroidConfig.activity, NativeR.style.ScrollBarRecyclerView);
                this.nativeInner = new NativeSFRecyclerView(themeWrapper, _callbacks);
            } else {
                this.nativeInner = new NativeSFRecyclerView(AndroidConfig.activity, _callbacks);
            }

            //this.nativeInner.setItemViewCacheSize(0);
            //Set Scrollbar Style as SCROLLBARS_OUTSIDE_INSET
            this.nativeInner.setScrollBarStyle(50331648);
            this.nativeInner.setHorizontalScrollBarEnabled(false);
            this.nativeInner.setVerticalScrollBarEnabled(false);
        }
        this._layoutManager = params.layoutManager;
        this.nativeObject.addView(this.nativeInner);
        this.__isRecyclerView = true;

        _super(this);
        scrollableSuper(this, this.nativeInner);

        var _gridViewItems = {};
        const SFRecyclerViewAdapter = requireClass("io.smartface.android.sfcore.ui.listview.SFRecyclerViewAdapter");
        var callbacks = {
            onCreateViewHolder: function(viewType) {
                var holderViewLayout;
                try {
                    holderViewLayout = _onItemCreate(viewType);
                    // INFO: If onItemCreate doesn't return GridViewItem, the app crashes.
                    // This check handles this case.
                    if (!holderViewLayout || !holderViewLayout.nativeInner) {
                        throw new Error("onItemCreate must be return an instanceof UI.GridViewItem");
                    }
                } catch (e) {
                    const Application = require("../../application");
                    Application.onUnhandledError && Application.onUnhandledError(e);
                    holderViewLayout = new GridViewItem();
                }
                var spanSize = self._layoutManager.spanSize;
                if (spanSize === 0) {
                    if (self._layoutManager.scrollDirection === GridViewLayoutManager.ScrollDirection.VERTICAL)
                        self._layoutManager.viewWidth = self.width;
                    else
                        self._layoutManager.viewHeight = self.height;
                    spanSize = self._layoutManager.spanSize;
                }

                assignSizeBasedOnDirection.call(self, holderViewLayout, viewType);

                holderViewLayout.viewType = viewType;
                _gridViewItems[holderViewLayout.nativeInner.itemView.hashCode()] = holderViewLayout;

                holderViewLayout.nativeInner.setRecyclerViewAdapter(self.nativeDataAdapter);
                return holderViewLayout.nativeInner;
            },
            onBindViewHolder: function(itemViewHashCode, position) {
                var _holderViewLayout = _gridViewItems[itemViewHashCode];

                assignSizeBasedOnDirection.call(self, _holderViewLayout, _holderViewLayout.viewType);

                _onItemBind && _onItemBind(_holderViewLayout, position);
            },
            getItemCount: function() {
                if (isNaN(_itemCount))
                    return 0;
                else if (typeof(_itemCount) !== "number")
                    throw new Error("itemCount must be an number.");
                return _itemCount;
            },
            getItemViewType: function(position) {
                let itemType;
                _onItemType && (itemType = _onItemType(position));
                return (typeof(itemType) === "number") ? itemType : 0;
            },
            onItemSelected: function(position, itemViewHashCode) {
                var selectedItem = _gridViewItems[itemViewHashCode];
                _onItemSelected && _onItemSelected(selectedItem, position);
            },
            onItemLongSelected: function(position, itemViewHashCode) {
                var selectedItem = _gridViewItems[itemViewHashCode];
                _onItemLongSelected && _onItemLongSelected(selectedItem, position);
            }
        };
        this.nativeDataAdapter = new SFRecyclerViewAdapter(callbacks);

        var _onScroll = undefined,
            isScrollListenerAdded = false,
            _onItemCreate, _onItemSelected, _onItemType,
            _onItemLongSelected, _onPullRefresh, _onItemBind, _itemCount = 0,
            _scrollBarEnabled = false,
            _scrollEnabled, _onScrollStateChanged = undefined,
            _nativePagerSnapHelper, _paginationEnabled = null;
        Object.defineProperties(this, {
            // properties
            'layoutManager': {
                get: function() {
                    return this._layoutManager;
                },
                set: function(layoutManager) {
                    if (this._layoutManager) {
                        this._layoutManager.nativeRecyclerView = null;
                    }
                    this._layoutManager = layoutManager;
                    if (this._layoutManager) {
                        this.nativeInner.setLayoutManager(this._layoutManager.nativeObject);
                        this._layoutManager.nativeRecyclerView = this.nativeInner;
                    }
                },
                enumerable: true
            },
            'itemByIndex': {
                value: function(index) {
                    var viewHolder = self.nativeInner.findViewHolderForAdapterPosition(index);
                    if (!viewHolder) return undefined; // like ios

                    return _gridViewItems[viewHolder.itemView.hashCode()];
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
            'scrollBarEnabled': {
                get: function() {
                    return _scrollBarEnabled;
                },
                set: function(value) {
                    if (TypeUtil.isBoolean(value)) {
                        _scrollBarEnabled = value;
                        if (!this.layoutManager)
                            return;
                        if (this.layoutManager.scrollDirection === 1) { // 1 = LayoutManager.ScrollDirection.VERTICAL
                            this.nativeInner.setVerticalScrollBarEnabled(value);
                        } else {
                            this.nativeInner.setHorizontalScrollBarEnabled(value);
                        }
                    }
                },
                enumerable: true
            },
            'scrollEnabled': {
                get: function() {
                    return _scrollEnabled;
                },
                set: function(isScrollEnabled) {
                    if (!this.layoutManager)
                        return;
                    if (TypeUtil.isBoolean(isScrollEnabled)) {
                        _scrollEnabled = isScrollEnabled;
                        if (this.layoutManager.scrollDirection === 1) { // 1 = LayoutManager.ScrollDirection.VERTICAL
                            this.nativeInner.getLayoutManager().setCanScrollVerically(isScrollEnabled);
                        } else {
                            this.nativeInner.getLayoutManager().setCanScrollHorizontally(isScrollEnabled);
                        }
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
            //methods
            'getLastVisibleIndex': {
                value: function() {
                    let lastVisibleItemPositions = toJSArray(this.nativeInner.getLayoutManager().findLastVisibleItemPositions(null));
                    return Math.max(...lastVisibleItemPositions);
                },
                enumerable: true
            },
            'getFirstVisibleIndex': {
                value: function() {
                    let firstVisibleItemPositions = toJSArray(this.nativeInner.getLayoutManager().findFirstVisibleItemPositions(null));
                    // -1 = RecyclerView.NO_POSITION
                    return Math.min(...(firstVisibleItemPositions.filter(x => x !== -1)));
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
                    });
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
            'onItemCreate': {
                get: function() {
                    return _onItemCreate;
                },
                set: function(onItemCreate) {
                    _onItemCreate = onItemCreate.bind(this);
                },
                enumerable: true
            },
            'onItemType': {
                get: function() {
                    return _onItemType;
                },
                set: function(callback) {
                    _onItemType = callback;
                },
                enumerable: true
            },
            'onItemBind': {
                get: function() {
                    return _onItemBind;
                },
                set: function(onItemBind) {
                    _onItemBind = onItemBind.bind(this);
                },
                enumerable: true
            },
            'onItemSelected': {
                get: function() {
                    return _onItemSelected;
                },
                set: function(onItemSelected) {
                    _onItemSelected = onItemSelected.bind(this);
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

                    let scrollListenerObject = _onScrollListener === null ? createOnScrollListernerObject() : _onScrollListener;
                    if (onScroll) {
                        this.nativeInner.setOnScrollListener(scrollListenerObject);
                        isScrollListenerAdded = true;
                    } else if (!_onScrollStateChanged) {
                        this.nativeInner.removeOnScrollListener(scrollListenerObject);
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
            'paginationEnabled': {
                get: function() {
                    return _paginationEnabled;
                },
                set: function(value) {
                    if (typeof value !== 'boolean')
                        return;
                    _paginationEnabled = value;

                    if (_paginationEnabled) {
                        if (!_nativePagerSnapHelper) {
                            const NativeSFCustomizedPagerSnapHelper = requireClass("androidx.recyclerview.widget.PagerSnapHelper");
                            _nativePagerSnapHelper = new NativeSFCustomizedPagerSnapHelper();
                        }
                        _nativePagerSnapHelper.attachToRecyclerView(self.nativeInner);
                    } else if (_nativePagerSnapHelper)
                        _nativePagerSnapHelper.attachToRecyclerView(null);

                },
                enumerable: true
            },
            'toString': {
                value: function() {
                    return 'GridView';
                },
                enumerable: true,
                configurable: true
            }
        });

        // android-only properties
        var _snapToAlignment, _nativeLinearSnapHelper;
        Object.defineProperties(this.android, {
            'onScrollStateChanged': {
                get: function() {
                    return _onScrollStateChanged;
                },
                set: function(onScrollStateChanged) {
                    _onScrollStateChanged = onScrollStateChanged;

                    if (onScrollStateChanged && isScrollListenerAdded === true)
                        return;

                    let scrollListenerObject = _onScrollListener === null ? createOnScrollListernerObject() : _onScrollListener;
                    if (onScrollStateChanged) {
                        this.nativeInner.setOnScrollListener(scrollListenerObject);
                        isScrollListenerAdded = true;
                    } else if (!_onScroll) {
                        this.nativeInner.removeOnScrollListener(scrollListenerObject);
                        isScrollListenerAdded = false;
                    }
                },
                enumerable: true
            },
            'onItemLongSelected': {
                get: function() {
                    return _onItemLongSelected;
                },
                set: function(onItemLongSelected) {
                    _onItemLongSelected = onItemLongSelected;
                },
                enumerable: true,
                configurable: true
            },
            //ToDo:[Deprecated] paginationEnabled is no more Android specific. 
            'paginationEnabled': {
                get: function() {
                    return self.paginationEnabled;
                },
                set: function(value) {
                    self.paginationEnabled = value;
                },
                enumerable: true
            },
            'snapToAlignment': {
                get: function() {
                    return _snapToAlignment;
                },
                set: function(alignment) {
                    if (typeof alignment !== 'number')
                        return;
                    _snapToAlignment = alignment;
                    if (alignment !== GridView.Android.SnapAlignment.SNAPTO_NONE) {
                        if (!_nativeLinearSnapHelper) {
                            const NativeSFCustomizedLinearSnapHelper = requireClass("io.smartface.android.sfcore.ui.listview.SFCustomizedLinearSnapHelper");
                            _nativeLinearSnapHelper = new NativeSFCustomizedLinearSnapHelper(alignment, self.nativeInner);
                        }
                        _nativeLinearSnapHelper.attachToRecyclerView(self.nativeInner);
                    } else if (_nativeLinearSnapHelper)
                        _nativeLinearSnapHelper.attachToRecyclerView(null);
                },
                enumerable: true
            },
        });

        var _onScrollListener = null;

        function createOnScrollListernerObject() {
            const SFOnScrollListener = requireClass("io.smartface.android.sfcore.ui.listview.SFOnScrollListener");
            var overrideMethods = {
                onScrolled: function(dx, dy) {
                    if (!self.touchEnabled) {
                        return;
                    }
                    //Remove  due to the incorrect onScrolled's return parameter. Such as scrollTo(0) causes it to return fault dx & dy parameters.
                    // _contentOffset.x += dx;
                    // _contentOffset.y += dy;
                    // var offsetX = AndroidUnitConverter.pixelToDp(_contentOffset.x);
                    // var offsetY = AndroidUnitConverter.pixelToDp(_contentOffset.y);

                    _onScroll && _onScroll({
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
        this.ios = {};
        this.ios.swipeItems = {};
        this.ios.swipeItem = function(title, action) {
            return {};
        };

        this.nativeInner.setAdapter(this.nativeDataAdapter);

        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

// TODO: Refactor this function. It is too complicated
function assignSizeBasedOnDirection(holderViewLayout, viewType) {
    const self = this;
    let spanSize = self._layoutManager.spanSize;
    let isVertical = (self._layoutManager.scrollDirection == GridViewLayoutManager.ScrollDirection.VERTICAL);
    let onFullSpan = self._layoutManager.onFullSpan;
    let onItemLength = self._layoutManager.onItemLength;

    if (!(self._layoutManager.onItemLength && spanSize) && !self._layoutManager.onFullSpan) {
        return;
    }

    let fullSpanLenght = onFullSpan ? onFullSpan(viewType) : null;
    let itemLenght = onItemLength ? onItemLength(spanSize) : null;
    if (isVertical) {
        if (TypeUtil.isNumeric(fullSpanLenght)) {
            holderViewLayout.height = fullSpanLenght;
            applyFullSpan(holderViewLayout);
        } else {
            if (holderViewLayout.height != itemLenght)
                holderViewLayout.height = itemLenght;
            holderViewLayout.nativeObject.getLayoutParams().width = LayoutParams.MATCH_PARENT;
        }

    } else {
        if (TypeUtil.isNumeric(fullSpanLenght)) {
            holderViewLayout.width = fullSpanLenght;
            applyFullSpan(holderViewLayout);
        } else {
            if (holderViewLayout.width != itemLenght)
                holderViewLayout.width = itemLenght;
            holderViewLayout.nativeObject.getLayoutParams().height = LayoutParams.MATCH_PARENT;
        }
    }
}

function applyFullSpan(viewHolderItem) {
    let layoutParams = viewHolderItem.nativeObject.getLayoutParams();
    layoutParams.setFullSpan(true);
}

GridView.Android = {};
GridView.Android.SnapAlignment = {
    SNAPTO_START: 0,
    SNAPTO_CENTER: 1,
    SNAPTO_END: 2,
    SNAPTO_NONE: 3
};
Object.freeze(GridView.Android.SnapAlignment);
GridView.iOS = {};

module.exports = GridView;