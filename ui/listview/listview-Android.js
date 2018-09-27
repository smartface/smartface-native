/*globals requireClass*/
const View = require('../view');
const extend = require('js-base/core/extend');
const ListViewItem = require("../listviewitem");
const TypeUtil = require("../../util/type");
const AndroidUnitConverter = require("../../util/Android/unitconverter");
const AndroidConfig = require("../../util/Android/androidconfig");
const NativeView = requireClass("android.view.View");
const NativeRecyclerView = requireClass("android.support.v7.widget.RecyclerView");
const NativeSwipeRefreshLayout = requireClass("android.support.v4.widget.SwipeRefreshLayout");
const NativeLinearLayoutManager = requireClass("android.support.v7.widget.LinearLayoutManager");
const NativeContextThemeWrapper = requireClass("android.view.ContextThemeWrapper");

const NativeR = requireClass(AndroidConfig.packageName + ".R");

const ListView = extend(View)(
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
            this.nativeInner.setHasFixedSize(true);
            this.nativeInner.setDrawingCacheEnabled(true);
            this.nativeInner.setItemViewCacheSize(0);
            this.nativeInner.setClipToPadding(false);
        }

        var linearLayoutManager = new NativeLinearLayoutManager(AndroidConfig.activity);
        this.nativeInner.setLayoutManager(linearLayoutManager);
        this.nativeObject.addView(this.nativeInner);

        _super(this);

        var _listViewItems = {};
        const SFRecyclerViewAdapter = requireClass("io.smartface.android.sfcore.ui.listview.SFRecyclerViewAdapter");
        var callbacks = {
            onCreateViewHolder: function(parent, viewType) {
                var holderViewLayout;
                try {
                    holderViewLayout = _onRowCreate(viewType);
                }
                catch (e) {
                    const Application = require("../../application");
                    Application.onUnhandledError && Application.onUnhandledError(e);
                    holderViewLayout = new ListViewItem();
                }

                if (self.rowHeight) {
                    holderViewLayout.height = self.rowHeight;
                }
                _listViewItems[holderViewLayout.nativeInner.itemView.hashCode()] = holderViewLayout;
                return holderViewLayout.nativeInner;
            },
            onBindViewHolder: function(nativeHolderView, position) {
                var itemHashCode = nativeHolderView.itemView.hashCode();
                var _holderViewLayout = _listViewItems[itemHashCode];

                if (!self.rowHeight && _onRowHeight) {
                    var rowHeight = _onRowHeight(position);
                    _holderViewLayout.height = rowHeight;
                }
                else if (!_onRowHeight && self.rowHeight && self.rowHeight != _holderViewLayout.height) {
                    _holderViewLayout.height = self.rowHeight;
                }

                if (_onRowBind) {
                    _onRowBind(_holderViewLayout, position);

                    nativeHolderView.itemView.setOnClickListener(NativeView.OnClickListener.implement({
                        onClick: function(view) {
                            var selectedItem = _listViewItems[view.hashCode()];
                            _onRowSelected && _onRowSelected(selectedItem, position);
                        }
                    }));

                    nativeHolderView.itemView.setOnLongClickListener(NativeView.OnLongClickListener.implement({
                        onLongClick: function(view) {

                            if (typeof _onRowLongSelected === 'function') {
                                var selectedItem = _listViewItems[view.hashCode()];
                                _onRowLongSelected && _onRowLongSelected(selectedItem, position);
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
                if (_onRowType)
                    return _onRowType(position);
                return 0;
            }
        };
        var dataAdapter = new SFRecyclerViewAdapter(callbacks);

        var _onScroll;
        var _contentOffset = { x: 0, y: 0 };
        var _rowHeight;
        var _onRowCreate;
        var _onRowSelected;
        var _onRowLongSelected;
        var _onPullRefresh;
        var _onRowHeight;
        var _onRowBind;
        var _onRowType;
        var _itemCount = 0;
        var _contentInset = {};
        var _onScrollListener;
        Object.defineProperties(this, {
            // properties
            'listViewItemByIndex': {
                value: function(index) {
                    var viewHolder = self.nativeInner.findViewHolderForAdapterPosition(index);
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
                    _onScroll = onScroll.bind(this);
                    if (onScroll) {
                        !_onScrollListener && (createAndSetScrollListener());
                    }
                    else if (_onScrollListener) {
                        this.nativeInner.removeOnScrollListener(_onScrollListener);
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

        var _overScrollMode = 0;
        // android-only properties
        Object.defineProperties(this.android, {
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
                self.nativeInner.setPadding(0, topInset, 0, bottomInset);
            }
        }

        function createAndSetScrollListener() {
            const SFOnScrollListener = requireClass("io.smartface.android.sfcore.ui.listview.SFOnScrollListener");
            var overrideMethods = {
                onScrolled: function(recyclerView, dx, dy) {
                    var dY = AndroidUnitConverter.pixelToDp(dy);
                    var dX = AndroidUnitConverter.pixelToDp(dx);
                    _contentOffset.x += dx;
                    _contentOffset.y += dy;

                    var offsetX = AndroidUnitConverter.pixelToDp(_contentOffset.x);
                    var offsetY = AndroidUnitConverter.pixelToDp(_contentOffset.y);
                    _onScroll && _onScroll({ translation: { x: dX, y: dY }, contentOffset: { x: offsetX, y: offsetY } });
                },
                onScrollStateChanged: function(recyclerView, newState) {},
            };
            _onScrollListener = new SFOnScrollListener(overrideMethods);
            self.nativeInner.setOnScrollListener(_onScrollListener);
        }

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

ListView.iOS = {};

module.exports = ListView;