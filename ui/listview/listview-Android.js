const View = require('../view');
const extend = require('js-base/core/extend');
const Color = require('../color');

const SwipeRefreshLayout        = requireClass("android.support.v4.widget.SwipeRefreshLayout");
const RecyclerView              = requireClass("android.support.v7.widget.RecyclerView");
const ViewHolder                = requireClass("android.support.v7.widget.RecyclerView.ViewHolder");

const ListView = extend(View)(
    function (_super, params) {
        
        var self = this;
        var activity = Android.getActivity();
        var swipeLayoutParams = new SwipeRefreshLayout.LayoutParams(-1, -1);
        self.nativeObject = new SwipeRefreshLayout(activity);
        self.nativeInner = new RecyclerView(activity);
        self.nativeObject.addView(self.nativeInner,swipeLayoutParams);
        
        _super(this);

        this.onRowCreate = function onRowCreate(){};
    
        this.onRowBind = function onRowBind(listViewItem, index){};
        
        this.onRowSelected = function onRowSelected(listViewItem, index){};

        this.itemCount = 0;
        
        this.verticalScrollBarEnabled = false;

        this.refreshData = function(){};
        
        this.android = {};
        this.android.setPullRefreshColors = function(colors){};
        
        this.scrollTo = function(index){};
        
        this.firstVisibleIndex = function(){};
        
        this.lastVisibleIndex = function(){};

        this.onScroll = function onScroll(){};
        
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
        }
    }
);

module.exports = ListView;