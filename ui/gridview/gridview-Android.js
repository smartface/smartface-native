/* globals requireClass, array */
const View = require('../view');
const extend = require('js-base/core/extend');
const GridViewItem = require('../gridviewitem');
const TypeUtil = require("../../util/type");
const AndroidConfig = require("../../util/Android/androidconfig");
const GridViewLayoutManager = require('../layoutmanager');
const AndroidUnitConverter = require("../../util/Android/unitconverter");
const scrollableSuper = require("../../util/Android/scrollable");

const NativeView = requireClass("android.view.View");
const NativeRecyclerView = requireClass("android.support.v7.widget.RecyclerView");
const NativeSwipeRefreshLayout = requireClass("android.support.v4.widget.SwipeRefreshLayout");
const NativeContextThemeWrapper = requireClass("android.view.ContextThemeWrapper");

const NativeR = requireClass(AndroidConfig.packageName + ".R");

const GridView = extend(View)(
    function(_super, params) {

        var self = this;

        if (!this.nativeObject) {
            this.nativeObject = new NativeSwipeRefreshLayout(AndroidConfig.activity);
        }

        if (!this.nativeInner) {
            // For creating RecyclerView with android:scrollbar=vertical attribute
            if (NativeR.style.ScrollBarRecyclerView) {
                var themeWrapper = new NativeContextThemeWrapper(AndroidConfig.activity, NativeR.style.ScrollBarRecyclerView);
                this.nativeInner = new NativeRecyclerView(themeWrapper);
            }
            else {
                this.nativeInner = new NativeRecyclerView(AndroidConfig.activity);
            }
            //this.nativeInner.setItemViewCacheSize(0);
            //Set Scrollbar Style as SCROLLBARS_OUTSIDE_INSET
            this.nativeInner.setScrollBarStyle(50331648);
            this.nativeInner.setHorizontalScrollBarEnabled(false);
            this.nativeInner.setVerticalScrollBarEnabled(false);
        }

        this._layoutManager = params.layoutManager;

        this.nativeObject.addView(this.nativeInner);

        _super(this);
        scrollableSuper(this, this.nativeInner);

        var _gridViewItems = {};
        const SFRecyclerViewAdapter = requireClass("io.smartface.android.sfcore.ui.listview.SFRecyclerViewAdapter");
        var callbacks = {
            onCreateViewHolder: function(parent, viewType) {
                var holderViewLayout;
                try {
                    holderViewLayout = _onItemCreate(viewType);
                }
                catch (e) {
                    const Application = require("../../application");
                    Application.onUnhandledError && Application.onUnhandledError(e);
                    holderViewLayout = new GridViewItem();
                }
                var spanSize = self._layoutManager.spanSize;
                if (spanSize == 0) {
                    self._layoutManager.viewWidth = self.width;
                    self._layoutManager.viewHeight = self.height;
                    spanSize = self._layoutManager.spanSize;
                }
                if (self._layoutManager.onItemLength && spanSize) {
                    if (self._layoutManager.scrollDirection == GridViewLayoutManager.ScrollDirection.VERTICAL) {
                        holderViewLayout.height = self._layoutManager.onItemLength(spanSize);
                    }
                    else {
                        holderViewLayout.width = self._layoutManager.onItemLength(spanSize);
                    }
                }
                else if (self._layoutManager.itemLength) {
                    if (self._layoutManager.scrollDirection == GridViewLayoutManager.ScrollDirection.VERTICAL) {
                        holderViewLayout.height = self._layoutManager.itemLength;
                    }
                    else {
                        holderViewLayout.width = self._layoutManager.itemLength;
                    }
                }
                _gridViewItems[holderViewLayout.nativeInner.itemView.hashCode()] = holderViewLayout;
                return holderViewLayout.nativeInner;
            },
            onBindViewHolder: function(nativeHolderView, position) {
                var itemHashCode = nativeHolderView.itemView.hashCode();
                var _holderViewLayout = _gridViewItems[itemHashCode];

                var spanSize = self._layoutManager.spanSize;
                if (spanSize == 0) {
                    self._layoutManager.viewWidth = self.width;
                    self._layoutManager.viewHeight = self.height;
                    spanSize = self._layoutManager.spanSize;
                }
                if (self._layoutManager && ((typeof(self._layoutManager.itemLength) === "number") || self._layoutManager.onItemLength)) {
                    if (self._layoutManager.scrollDirection == GridViewLayoutManager.ScrollDirection.VERTICAL) {

                        if (self._layoutManager.onItemLength) {
                            var calculatedItemHeight = self._layoutManager.onItemLength(spanSize);
                            if (_holderViewLayout.height != calculatedItemHeight) {
                                _holderViewLayout.height = calculatedItemHeight;
                            }
                        }
                        else if (self._layoutManager.itemLength && self._layoutManager.itemLength != _holderViewLayout.height) {
                            _holderViewLayout.height = self._layoutManager.itemLength;
                        }
                        if (self.width < _holderViewLayout.width) {
                            _holderViewLayout.width = self.width;
                        }
                    }
                    else {
                        if (self._layoutManager.onItemLength) {
                            var calculatedItemWidth = self._layoutManager.onItemLength(spanSize);
                            if (_holderViewLayout.width != calculatedItemWidth) {
                                _holderViewLayout.width = calculatedItemWidth;
                            }
                        }
                        else if (self._layoutManager.itemLength && self._layoutManager.itemLength != _holderViewLayout.width) {
                            _holderViewLayout.width = self._layoutManager.itemLength;
                        }
                        if (self.height < _holderViewLayout.height) {
                            _holderViewLayout.height = self.height;
                        }
                    }
                }


                if (_onItemBind) {
                    _onItemBind(_holderViewLayout, position);

                    nativeHolderView.itemView.setOnClickListener(NativeView.OnClickListener.implement({
                        onClick: function(view) {
                            var selectedItem = _gridViewItems[view.hashCode()];
                            _onItemSelected && _onItemSelected(selectedItem, position);
                        }
                    }));

                    nativeHolderView.itemView.setOnLongClickListener(NativeView.OnLongClickListener.implement({
                        onLongClick: function(view) {

                            if (typeof _onItemLongSelected === 'function') {
                                var selectedItem = _gridViewItems[view.hashCode()];
                                _onItemLongSelected && _onItemLongSelected(selectedItem, position);
                                return true;
                            }
                            return false;
                        }
                    }));
                }
            },
            getItemCount: function() {
                if (isNaN(_itemCount))
                    return 0;
                else if (typeof(_itemCount) !== "number")
                    throw new Error("itemCount must be an number.");
                return _itemCount;
            },
            getItemViewType: function(position) {
                if (_onItemType)
                    return _onItemType(position);
                return 0;
            }
        };
        var dataAdapter = new SFRecyclerViewAdapter(callbacks);

        var _onScroll;
        var _onItemCreate;
        var _onItemSelected;
        var _onItemType;
        var _onItemLongSelected;
        var _onPullRefresh;
        var _onItemBind;
        var _itemCount = 0;
        var _scrollBarEnabled = false;
        var _contentOffset = { x: 0, y: 0 };
        var _scrollEnabled;
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
                        }
                        else {
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
                        }
                        else {
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
                    }
                    else {
                        this.nativeInner.scrollToPosition(index);
                    }
                },
                enumerable: true
            },
            'refreshData': {
                value: function() {
                    // this.nativeInner.setLayoutManager(linearLayoutManager);
                    // this.nativeInner.setAdapter(dataAdapter);
                    dataAdapter.notifyDataSetChanged();
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
                    _onScroll = onScroll.bind(this);
                    if (onScroll) {
                        this.nativeInner.setOnScrollListener(onScrollListener);
                    }
                    else {
                        this.nativeInner.removeOnScrollListener(onScrollListener);
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
                    return 'GridView';
                },
                enumerable: true,
                configurable: true
            },
            'contentOffset': {
                get: function() {
                    return { x: AndroidUnitConverter.pixelToDp(_contentOffset.x), y: AndroidUnitConverter.pixelToDp(_contentOffset.y) };
                },
                enumerable: true
            }
        });
        const SFOnScrollListener = requireClass("io.smartface.android.sfcore.ui.listview.SFOnScrollListener");
        var overrideMethods = {
            onScrolled: function(recyclerView, dx, dy) {
                _contentOffset.x += dx;
                _contentOffset.y += dy;

                var offsetX = AndroidUnitConverter.pixelToDp(_contentOffset.x);
                var offsetY = AndroidUnitConverter.pixelToDp(_contentOffset.y);
                _onScroll && _onScroll({ contentOffset: { x: offsetX, y: offsetY } });
            },
            onScrollStateChanged: function(recyclerView, newState) {},
        };
        var onScrollListener = new SFOnScrollListener(overrideMethods);

        // android-only properties
        var _snapToAlignment, _paginationEnabled = null,
            _nativeLinearSnapHelper, _paginationAssigned = false;
        Object.defineProperties(this.android, {
            'onItemLongSelected': {
                get: function() {
                    return _onItemLongSelected;
                },
                set: function(onItemLongSelected) {
                    _onItemLongSelected = onItemLongSelected.bind(this);
                },
                enumerable: true,
                configurable: true
            },
            'paginationEnabled': {
                get: function() {
                    return _paginationEnabled;
                },
                set: function(value) {
                    if (typeof value !== 'boolean')
                        return;
                    _paginationEnabled = value;
                    if (_nativeLinearSnapHelper) {
                        _nativeLinearSnapHelper.disablePagination(!_paginationEnabled);
                        _paginationAssigned = true;
                    }
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
                    const NativeSFCustomizedPagerSnapHelper = requireClass("io.smartface.android.sfcore.ui.listview.SFCustomizedPagerSnapHelper");
                    _nativeLinearSnapHelper = new NativeSFCustomizedPagerSnapHelper(alignment);
                    _nativeLinearSnapHelper.attachToRecyclerView(self.nativeInner);

                    if (self.android.paginationEnabled !== null && !_paginationAssigned) {
                        self.android.paginationEnabled = _paginationEnabled ;
                    }
                },
                enumerable: true
            },
        });

        // ios-only properties
        this.ios = {};
        this.ios.swipeItems = {};
        this.ios.swipeItem = function(title, action) {
            return {};
        };

        if (!this.skipDefaults) {
            this.nativeInner.setAdapter(dataAdapter);
            this.nativeObject.setOnRefreshListener(NativeSwipeRefreshLayout.OnRefreshListener.implement({
                onRefresh: function() {
                    _onPullRefresh && _onPullRefresh();
                }
            }));
        }

        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);
GridView.Android = {};
GridView.Android.SnapAlignment = {
    SNAPTO_START: 0,
    SNAPTO_CENTER: 1,
    SNAPTO_END: 2
};
Object.freeze(GridView.Android.SnapAlignment);

GridView.iOS = {};

module.exports = GridView;
