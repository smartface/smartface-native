const View          = require('../view');
const extend        = require('js-base/core/extend');
const Color         = require('../color');
const Label         = require('../label');
const ListViewItem  = require('../listviewitem');
const TypeUtil      = require("sf-core/util/type");

const SwipeRefreshLayout    = requireClass("android.support.v4.widget.SwipeRefreshLayout");
const RecyclerView          = requireClass("android.support.v7.widget.RecyclerView");
const ViewHolder            = requireClass("android.support.v7.widget.RecyclerView.ViewHolder");
const LinearLayoutManager   = requireClass("android.support.v7.widget.LinearLayoutManager");
const OnScrollListener      = requireClass("android.support.v7.widget.RecyclerView.OnScrollListener");
const NativeView            = requireClass("android.view.View");

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
                                    var height = dpFromPx(_rowHeight);
                                    holderViewLayout.setPosition({width:listViewWidth, height: height });
                                }
                                if(!holderViewLayout){
                                    holderViewLayout = new ListViewItem({
                                        width: -1,
                                        height: 100,
                                        backgroundColor: Color.LIGHTGRAY
                                    });
                                }
                                //RecyclerView.ViewHolder
                                return holderViewLayout.nativeInner; 
                            },
                            onBindViewHolder: function(nativeHolderView, position){
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
        
                
        var _rowHeight = 0;
        Object.defineProperty(this, 'rowHeight', {
            get: function() {
                return _rowHeight;
            },
            set: function(rowHeight) {
                _rowHeight = rowHeight;
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
        
        this.scrollTo = function(index){
            self.nativeInner.scrollToPosition(index);
        };
        
        this.firstVisibleIndex = function(){
            return self.nativeInner.getLayoutManager().findFirstVisibleItemPosition();
        };

        this.lastVisibleIndex = function(){
            return self.nativeInner.getLayoutManager().findLastVisibleItemPosition();
        };

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
        
        var listViewHeight;
        var listViewWidth;
        var _invalidatePosition = self.invalidatePosition;
        this.invalidatePosition = function(parentWidth, parentHeight){
            _invalidatePosition(parentWidth, parentHeight);
            var initialPosition = self.getInitialPosition();
            
            if(!TypeUtil.isNumeric(initialPosition.height)){
                listViewHeight = (parentHeight ? parentHeight : (self.parent ? self.parent.height : 0) ) * (parseInt(initialPosition.height.replace("%")))/100;
            }
            else{
                listViewHeight = initialPosition.height;
            }
        
            if(!TypeUtil.isNumeric(initialPosition.width)){
                listViewWidth = (parentWidth ? parentWidth : (self.parent ? self.parent.width : 0) ) * (parseInt(initialPosition.width.replace("%")))/100;
            }
            else{
                listViewWidth = initialPosition.width;
            }
            // @todo find a way to invalidate for orientation change. 
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
            else if(jsView instanceof Label){
                jsView.nativeInner = nativeView.getChildAt(0);
            }
        }
        
        function dpFromPx(px){
            return px * activity.getResources().getDisplayMetrics().density;
        }
        
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = ListView;