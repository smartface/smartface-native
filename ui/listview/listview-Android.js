const View                  = require('../view');
const extend                = require('js-base/core/extend');
const TypeUtil              = require("sf-core/util/type");
const ListViewItem          = require("sf-core/ui/listviewitem");
const NativeView                    = requireClass("android.view.View");
const NativeRecyclerView            = requireClass("android.support.v7.widget.RecyclerView");
const NativeSwipeRefreshLayout      = requireClass("android.support.v4.widget.SwipeRefreshLayout");
const NativeLinearLayoutManager     = requireClass("android.support.v7.widget.LinearLayoutManager");

const ListView = extend(View)(
    function (_super, params) {

        var self = this;
        var activity = Android.getActivity();
        
        if(!this.nativeObject){
            this.nativeObject = new NativeSwipeRefreshLayout(activity);
        }
        
        if(!this.nativeInner){
            this.nativeInner = new NativeRecyclerView(activity); 
        }
        var linearLayoutManager = new NativeLinearLayoutManager(activity);
        this.nativeInner.setLayoutManager(linearLayoutManager);
        this.nativeObject.addView(this.nativeInner);

        _super(this);

        var holderViewLayout;
        var dataAdapter = NativeRecyclerView.Adapter.extend("SFAdapter",{
            onCreateViewHolder: function(parent,viewType){
                try{
                    holderViewLayout = _onRowCreate();
                }
                catch(e){
                    const Application = require("sf-core/application");
                    Application.onUnhandledError && Application.onUnhandledError(e);
                    holderViewLayout = new ListViewItem();
                }
                holderViewLayout.height = self.rowHeight;
                return holderViewLayout.nativeInner;
            },
            onBindViewHolder: function(nativeHolderView,position){
                if(_onRowBind){
                    // @todo make performance improvements
                    var _holderViewLayout = createFromTemplate(holderViewLayout,nativeHolderView.itemView, nativeHolderView,self);
                    _onRowBind(_holderViewLayout,position);
                    nativeHolderView.itemView.setOnClickListener(NativeView.OnClickListener.implement({
                        onClick: function(view){
                            _onRowSelected && _onRowSelected(holderViewLayout, position);
                        }
                    }));
                }
            },
            getItemCount: function(){
                return _itemCount;
            }
        },null);

        var _onScroll;
        var _rowHeight = 0;
        var _onRowCreate;
        var _onRowSelected;
        var _onPullRefresh;
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
                    dataAdapter.notifyDataSetChanged();
                },
                enumerable: true
            },
            'setPullRefreshColors': {
                value: function(colors) {
                    this.nativeObject.setColorSchemeColors(colors);
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

        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

function createFromTemplate(jsView, nativeObject, nativeInner, parentJsView){
    jsView.nativeObject = nativeObject;
    jsView.nativeInner = nativeInner;
    jsView.parent = parentJsView;
    
    if(jsView.childViews){
        var _childViews = {};
        
        Object.keys(jsView.childViews).forEach(function(key){
            _childViews[key] = createFromTemplate(jsView.childViews[key],nativeObject.findViewById(parseInt(key)), null, jsView);
        });
        jsView.childViews = _childViews;
    }
    return jsView;
}

function findConstructor(jsView){
    return require("sf-core/ui/"+jsView.toString().toLowerCase());
}

function cloneObject(jsView, nativeObject, nativeInner){
    const extend = require('js-base/core/extend');
    var jsViewConstructorCopy = extend(findConstructor(jsView))(
        function (_super, params) {
            this.nativeObject = params.nativeObject;
            this.nativeInner = params.nativeInner;
            this.isNotSetDefaults = true;
            _super(this);
            
            if (params) {
                for (var param in params) {
                    this[param] = params[param];
                }
            }
        }
    );
    return new jsViewConstructorCopy({
        nativeObject: nativeObject,
        nativeInner: nativeInner
    });
}

module.exports = ListView;
