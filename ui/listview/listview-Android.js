const View                          = require('../view');
const extend                        = require('js-base/core/extend');
const ListViewItem                  = require("../listviewitem");
const TypeUtil                      = require("../../util/type");
const AndroidConfig                 = require("../../util/Android/androidconfig");
const NativeView                    = requireClass("android.view.View");
const NativeRecyclerView            = requireClass("android.support.v7.widget.RecyclerView");
const NativeSwipeRefreshLayout      = requireClass("android.support.v4.widget.SwipeRefreshLayout");
const NativeLinearLayoutManager     = requireClass("android.support.v7.widget.LinearLayoutManager");
const NativeContextThemeWrapper     = requireClass("android.view.ContextThemeWrapper");
const NativeR                       = requireClass(AndroidConfig.packageName + ".R");

const ListView = extend(View)(
    function (_super, params) {

        var self = this;

        if(!this.nativeObject){
            this.nativeObject = new NativeSwipeRefreshLayout(AndroidConfig.activity);
        }
        
        if(!this.nativeInner){
            // For creating RecyclerView with android:scrollbar=vertical attribute
            if(NativeR.style.ScrollBarRecyclerView){
                var themeWrapper = new NativeContextThemeWrapper(AndroidConfig.activity, NativeR.style.ScrollBarRecyclerView);
                this.nativeInner = new NativeRecyclerView(themeWrapper);
            }
            else{
                this.nativeInner = new NativeRecyclerView(AndroidConfig.activity);
            }
        }

        var linearLayoutManager = new NativeLinearLayoutManager(AndroidConfig.activity);
        this.nativeInner.setLayoutManager(linearLayoutManager);
        this.nativeObject.addView(this.nativeInner);

        _super(this);
        var holderViewLayout;
        var dataAdapter = NativeRecyclerView.Adapter.extend(string("SFAdapter"),{
            onCreateViewHolder: function(parent,viewType){
                try{
                    holderViewLayout = _onRowCreate();
                }
                catch(e){
                    const Application = require("../../application");
                    Application.onUnhandledError && Application.onUnhandledError(e);
                    holderViewLayout = new ListViewItem();
                }
                if(self.rowHeight){
                    holderViewLayout.height = self.rowHeight;
                }
                return holderViewLayout.nativeInner;
            },
            onBindViewHolder: function(nativeHolderView,position){
                var _holderViewLayout = self.createTemplate(nativeHolderView);
                
                if(!self.rowHeight && _onRowHeight){
                    _holderViewLayout.height = _onRowHeight(position);
                }
                
                if(_onRowBind){
                    _onRowBind(_holderViewLayout,position);
                    nativeHolderView.itemView.setOnClickListener(NativeView.OnClickListener.implement({
                        onClick: function(view) {
                            holderViewLayout.nativeObject = view;
                            var clickedView = createFromTemplate(holderViewLayout);
                            _onRowSelected && _onRowSelected(clickedView, position);
                        }
                    }));
                }
            },
            getItemCount: function(){
                return _itemCount;
            },
            getItemViewType: function(position){
                return position;
            }
        },null);

        var _onScroll;
        var _rowHeight = 0;
        var _onRowCreate;
        var _onRowSelected;
        var _onPullRefresh;
        var _onRowHeight;
        var _onRowBind;
        var _itemCount = 0;
        Object.defineProperties(this, {
            // properties
            'rowHeight': {
                get: function() {
                    return _rowHeight;
                },
                set: function(rowHeight) {
                    if(TypeUtil.isNumeric(rowHeight)){
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
                    if(TypeUtil.isNumeric(itemCount)){
                        _itemCount = itemCount;
                        this.refreshData();
                    }
                },
                enumerable: true
            },
            'verticalScrollBarEnabled': {
                get: function() {
                    return this.nativeInner.isVerticalScrollBarEnabled();
                },
                set: function(verticalScrollBarEnabled) {
                    if(TypeUtil.isBoolean(verticalScrollBarEnabled)){
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
                    if(TypeUtil.isBoolean(refreshEnabled)){
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
                value: function(index) {
                    this.nativeInner.smoothScrollToPosition(index);
                },
                enumerable: true
            },
            'refreshData': {
                value: function() {
                    this.nativeInner.setLayoutManager(linearLayoutManager);
                    this.nativeInner.setAdapter(dataAdapter);
                },
                enumerable: true
            },
            'setPullRefreshColors': {
                value: function(colors) {
                    var nativeColors = [];
                    colors.forEach(function(element){
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
            'onRowSelected': {
                get: function() {
                    return _onRowSelected;
                },
                set: function(onRowSelected) {
                    _onRowSelected = onRowSelected.bind(this);
                },
                enumerable: true
            },
            'onScroll': {
                get: function() {
                    return _onScroll;
                },
                set: function(onScroll) {
                    _onScroll = onScroll.bind(this);
                    if(onScroll){
                        this.nativeInner.setOnScrollListener(onScrollListener);
                    }
                    else{
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
                value: function(){
                    return 'ListView';
                },
                enumerable: true, 
                configurable: true
            }
        });

        var onScrollListener = NativeRecyclerView.OnScrollListener.extend("SFScrollListener",{
            onScrolled : function(recyclerView, dx, dy){
                    _onScroll && _onScroll();
                },
            onScrollStateChanged: function(recyclerView, newState){
            },
        },null);

        // ios-only properties
        this.ios = {};
        this.ios.swipeItems = {};
        this.ios.swipeItem = function(title,action){
            return {};
        };
        
        if(!this.isNotSetDefaults){
            this.nativeInner.setAdapter(dataAdapter);
            this.nativeObject.setOnRefreshListener(NativeSwipeRefreshLayout.OnRefreshListener.implement({
                onRefresh: function(){
                    _onPullRefresh && _onPullRefresh();
                }
            }));
        }
        
        self.createTemplate = function(e){
            holderViewLayout.nativeObject = e.itemView;
            holderViewLayout.nativeInner = e;
            createFromTemplate(holderViewLayout);
            return holderViewLayout;
        };
        
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

ListView.iOS = {};

function createFromTemplate(jsView){
    if(jsView.childViews){
        for (var child in jsView.childs){
             if (jsView.childs[child].id){
                jsView.childs[child].nativeObject = jsView.nativeObject.findViewById(jsView.childs[child].id);
                createFromTemplate(jsView.childs[child]);
             }
        }
    }
}

module.exports = ListView;