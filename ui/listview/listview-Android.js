const View                  = require('../view');
const extend                = require('js-base/core/extend');
const AndroidUnitConverter  = require("nf-core/util/Android/unitconverter.js");

const NativeView                    = requireClass("android.view.View");
const NativeRecyclerView            = requireClass("android.support.v7.widget.RecyclerView");
const NativeLinearLayoutManager     = requireClass("android.support.v7.widget.LinearLayoutManager");

const ListView = extend(View)(
    function (_super, params) {

        var self = this;
        var activity = Android.getActivity();

        self.nativeObject = new NativeRecyclerView(activity);
        var linearLayoutManager = new NativeLinearLayoutManager(activity);
        self.nativeObject.setLayoutManager(linearLayoutManager);

        _super(this);

        var holderViewLayout
        var dataAdapter = NativeRecyclerView.Adapter.extend("SFAdapter",{
            onCreateViewHolder: function(parent,viewType){
                holderViewLayout = _onRowCreate();
                holderViewLayout.height = self.rowHeight;
                return holderViewLayout.nativeInner;
            },
            onBindViewHolder: function(nativeHolderView,position){
                if(_onRowBind){
                    // @todo make performance improvements
                    createFromTemplate(holderViewLayout,nativeHolderView.itemView,self);
                    _onRowBind(holderViewLayout,position);
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

        self.nativeObject.setAdapter(dataAdapter);

        var onScrollListener = NativeRecyclerView.OnScrollListener.extend("SFScrollListener",{
            onScrolled : function(recyclerView, dx, dy){
                    _onScroll && _onScroll();
                },
            onScrollStateChanged: function(recyclerView, newState){
            },
        },null);

        var _onScroll;
        var _rowHeight = 0;
        var _onRowCreate;
        var _onRowSelected;
        var _onRowBind;
        var _itemCount = 0;
        Object.defineProperties(this, {
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
            'rowHeight': {
                get: function() {
                    return _rowHeight;
                },
                set: function(rowHeight) {
                    _rowHeight = rowHeight;
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
            'itemCount': {
                get: function() {
                    return _itemCount;
                },
                set: function(itemCount) {
                    _itemCount = itemCount;
                    self.refreshData();
                },
                enumerable: true
            },
            'verticalScrollBarEnabled': {
                get: function() {
                    return self.nativeObject.isVerticalScrollBarEnabled();
                },
                set: function(verticalScrollBarEnabled) {
                    self.nativeObject.setVerticalScrollBarEnabled(verticalScrollBarEnabled);
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
                        self.nativeObject.setOnScrollListener(onScrollListener);
                    }
                    else{
                        self.nativeObject.removeOnScrollListener(onScrollListener);
                    }
                },
                enumerable: true
            }
        });

        this.refreshData = function(){
            dataAdapter.notifyDataSetChanged();
        };

        this.scrollTo = function(index){
            self.nativeObject.smoothScrollToPosition(index);
        };

        this.getFirstVisibleIndex = function(){
            return self.nativeObject.getLayoutManager().findFirstVisibleItemPosition();
        };

        this.getLastVisibleIndex = function(){
            return self.nativeObject.getLayoutManager().findLastVisibleItemPosition();
        };

        function createFromTemplate(jsView, nativeView,parentJsView){
            jsView.nativeObject = nativeView;
            jsView.parent = parentJsView;
            if(jsView.childViews){
                for(var childViewKey in jsView.childViews){
                    var childId = jsView.childViews[childViewKey].id;
                    createFromTemplate(jsView.childViews[childViewKey],nativeView.findViewById(childId),jsView);
                }
            }
        }

        // ios-only properties
        this.ios = {};
        this.ios.swipeItems = {};
        this.ios.swipeItem = function(title,action){
            return {};
        };

        // @todo should remove these. Current we are not supporting this.
        this.android = {};
        this.stopRefresh = {};
        this.refreshEnabled = {};
        this.setPullRefreshColors = function(params){};

        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = ListView;
