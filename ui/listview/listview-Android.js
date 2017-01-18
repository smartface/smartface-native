const View          = require('../view');
const extend        = require('js-base/core/extend');
const Color         = require('../color');
const ListViewItem  = require('sf-core/ui/listviewitem');

const SwipeRefreshLayout    = requireClass("android.support.v4.widget.SwipeRefreshLayout");
const RecyclerView          = requireClass("android.support.v7.widget.RecyclerView");
const ViewHolder            = requireClass("android.support.v7.widget.RecyclerView.ViewHolder");
const LinearLayoutManager   = requireClass("android.support.v7.widget.LinearLayoutManager");

const ListView = extend(View)(
    function (_super, params) {
        
        var self = this;
        var activity = Android.getActivity();
        var swipeLayoutParams = new SwipeRefreshLayout.LayoutParams(-1, -1);
        self.nativeObject = new SwipeRefreshLayout(activity);
        self.nativeInner = new RecyclerView(activity);
        var linearLayoutManager = new LinearLayoutManager(activity);
        self.nativeInner.setLayoutManager(linearLayoutManager);
        self.nativeObject.addView(self.nativeInner,swipeLayoutParams);

        _super(this);
        
        var holderViewLayout;
        
        var dataAdapter = RecyclerView.Adapter.extend("SFAdapter",{
                            getItemId: function(position){
                                return position;
                            },
                            onCreateViewHolder: function(parent, viewType) {
                                if(_onRowCreate){
                                    holderViewLayout = _onRowCreate();
                                }
                                if(!holderViewLayout){
                                    holderViewLayout = new ListViewItem({
                                        width: "100%",
                                        height: "25%",
                                        backgroundColor: Color.LIGHTGRAY
                                    });
                                }
                                holderViewLayout.parent = self;
                                return holderViewLayout.nativeInner; //RecyclerView.ViewHolder
                            },
                            onBindViewHolder: function(holder, position){
                                if(_onRowBind){
                                    holderViewLayout.nativeObject = holder.itemView;
                                    holderViewLayout.nativeInner = holder;
                                    _onRowBind(holderViewLayout,position);
                                    holderViewLayout.invalidatePosition();
                                }
                            },
                            getItemCount: function(){
                                return _itemCount;
                            }
        }, null);

        self.nativeInner.setAdapter(dataAdapter);
        
        var _onRowCreate;
        Object.defineProperty(this, 'onRowCreate', {
            get: function() {
                return _onPullRefresh;
            },
            set: function(onRowCreate) {
                _onRowCreate = onRowCreate;
            },
            enumerable: true
        });
    
        var _onRowBind;
        Object.defineProperty(this, 'onRowBind', {
            get: function() {
                return _onRowBind;
            },
            set: function(onRowBind) {
                _onRowBind = onRowBind;
            },
            enumerable: true
        });
        
        var _onRowSelected;
        Object.defineProperty(this, 'onRowSelected', {
            get: function() {
                return _onRowSelected;
            },
            set: function(onRowSelected) {
                _onRowSelected = onRowSelected;
            },
            enumerable: true
        });
        
        var _itemCount = 0;
        Object.defineProperty(this, 'itemCount', {
            get: function() {
                return _itemCount;
            },
            set: function(itemCount) {
                _itemCount = itemCount;
            },
            enumerable: true
        });
        
        this.verticalScrollBarEnabled = false;
        Object.defineProperty(this, 'verticalScrollBarEnabled', {
            get: function() {
                return self.nativeInner.isVerticalScrollBarEnabled();
            },
            set: function(verticalScrollBarEnabled) {
                self.nativeInner.setVerticalScrollBarEnabled(verticalScrollBarEnabled);
            },
            enumerable: true
        });
        
        this.refreshData = function(){
            dataAdapter.notifyDataSetChanged();
        };
        
        this.android = {};
        this.android.setPullRefreshColors = function(colors){
            self.nativeObject.setColorSchemeColors(colors);
        };
        
        this.scrollTo = function(index){};
        
        this.firstVisibleIndex = function(){};
        
        this.lastVisibleIndex = function(){};

        var _onScroll;
        // @todo crashing 
            // Caused by: java.lang.NoClassDefFoundError: Class not found using the boot class loader; no stack available
            // JNI DETECTED ERROR IN APPLICATION: obj == null
            //     in call to SetLongField
            //     from void io.smartface.android.SpratAndroidActivity.initializeAfterSplash()
        // var onScrollListener = RecyclerView.OnScrollListener.implement({
        //     onScrolled : function(recyclerView, dx, dy){
        //             _onScroll && _onScroll();
        //         },
        //     onScrollStateChanged: function(recyclerView, newState){
        //     },
        // });
        Object.defineProperty(this, 'onScroll', {
            get: function() {
                return _onScroll;
            },
            set: function(onScroll) {
                _onScroll = onScroll;
                if(onScroll){
                    //self.nativeInner.setOnScrollListener(onScrollListener);
                }
                else{
                    //self.nativeInner.removeOnScrollListener(onScrollListener);
                }
            },
            enumerable: true
        });
        
        this.stopRefresh = function(){
            self.nativeObject.setRefreshing(false);
        }

        var _onPullRefresh;
        Object.defineProperty(this, 'onPullRefresh', {
            get: function() {
                return _onPullRefresh;
            },
            set: function(onPullRefresh) {
                _onPullRefresh = onPullRefresh;
            },
            enumerable: true
        });
        
        self.nativeObject.setOnRefreshListener(SwipeRefreshLayout.OnRefreshListener.implement({
            onRefresh : function(){
                    _onPullRefresh && _onPullRefresh();
                }
            })
        );
        
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
            dataAdapter.notifyDataSetChanged();
        }
    }
);

module.exports = ListView;