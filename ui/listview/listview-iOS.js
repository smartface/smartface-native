const View = require('../view');
const extend = require('js-base/core/extend');
const UIControlEvents = require("sf-core/util").UIControlEvents;
const Color = require('sf-core/ui/color');
const Direction = require('sf-core/ui/listview/direction');

const UITableViewRowAnimation = {
    fade : 0,
    right : 1,// slide in from right (or out to right)
    left : 2,
    top : 3,
    bottom : 4,
    none : 5, // available in iOS 3.0
    middle : 6, // available in iOS 3.2.  attempts to keep cell centered in the space it will/did occupy
    automatic : 7 // available in iOS 5.0.  chooses an appropriate animation style for you
}


const ListView = extend(View)(
   function (_super, params) {
        var self = this;

        if(!self.nativeObject){
            self.nativeObject = new __SF_UITableView();
            self.refreshControl = new __SF_UIRefreshControl();
            self.nativeObject.addSubview(self.refreshControl);
            self.nativeObject.separatorStyle = 0;
        }

        _super(this);

        self.onRowCreate = function(){};

        self.onRowBind = function (listViewItem, index){};
        self.onRowSelected = function (listViewItem, index){};
        

        self.ios = {}
        
        Object.defineProperty(self.ios, 'leftToRightSwipeEnabled', {
            get: function() {
                return self.nativeObject.leftToRightSwipeEnabled;
            },
            set: function(value) {
                self.nativeObject.leftToRightSwipeEnabled = value;
            },
            enumerable: true
         });
          
        Object.defineProperty(self.ios, 'rightToLeftSwipeEnabled', {
          get: function() {
              return self.nativeObject.rightToLeftSwipeEnabled;
          },
          set: function(value) {
              self.nativeObject.rightToLeftSwipeEnabled = value;
          },
          enumerable: true
        });
        
        self.ios.onRowSwiped = function(direction){};
        
        self.ios.swipeItem = function(title,color,padding,action){
            return __SF_MGSwipeButton.createMGSwipeButton(title,color,padding,action);
        }

        self.nativeObject.onRowSwiped = function(e){
            return self.ios.onRowSwiped(e.direction,e.expansionSettings);
        }

        self.stopRefresh = function(){
            self.refreshControl.endRefreshing();
        }

        var _refreshEnabled = true;
        Object.defineProperty(self, 'refreshEnabled', {
            get: function() {
                return _refreshEnabled;
            },
            set: function(value) {
                _refreshEnabled = value;
                if (value){
                    self.nativeObject.addSubview(self.refreshControl);
                }else{
                    self.refreshControl.removeFromSuperview();
                }
            },
            enumerable: true
         });

         Object.defineProperty(self, 'onPullRefresh', {
            set: function(value) {
                self.refreshControl.addJSTarget(value.bind(this),UIControlEvents.valueChanged);
            },
            enumerable: true
          });

        Object.defineProperty(self, 'itemCount', {
            get: function() {
                return self.nativeObject.itemCount;
            },
            set: function(value) {
                self.nativeObject.itemCount = value;
            },
            enumerable: true
          });

        Object.defineProperty(self, 'rowHeight', {
            get: function() {
                return self.nativeObject.tableRowHeight;
            },
            set: function(value) {
                self.nativeObject.tableRowHeight = value;
            },
            enumerable: true
          });

        self.nativeObject.cellForRowAt = function(e){
             var listItem = self.createTemplate(e);
             self.onRowBind(listItem,e.index);
             listItem.applyLayout();
         }

         var templateItem;
         self.nativeObject.onRowCreate =  function(e){
             var lisviewItem = self.onRowCreate();
             templateItem = lisviewItem;
             return lisviewItem.nativeObject;
         }

        self.createTemplate = function(e){
            templateItem.nativeObject = e.contentView;
            setAllChilds(templateItem);
            return templateItem;
        }

        function setAllChilds(item){
            for (var child in item.childs){
                 if (item.childs[child].id){
                    item.childs[child].nativeObject = item.nativeObject.viewWithTag(item.childs[child].id);
                    setAllChilds(item.childs[child]);
                 }
            }
        }

        self.nativeObject.didSelectRowAt = function(e){
           var listItem = self.createTemplate(e);
           self.onRowSelected(listItem,e.index);
        };

        self.refreshData = function(){
            self.nativeObject.reloadData();
        };

        self.deleteRow = function(index){
            self.nativeObject.deleteRowIndexAnimation(index,UITableViewRowAnimation.left);
        }

        self.getFirstVisibleIndex = function(){
            var visibleIndexArray =  self.nativeObject.getVisibleIndexArray();
            return visibleIndexArray[0];
        };

        this.getLastVisibleIndex = function(){
            var visibleIndexArray =  self.nativeObject.getVisibleIndexArray();
            return visibleIndexArray[visibleIndexArray.length-1];
        };

        this.scrollTo = function(index){
            self.nativeObject.scrollTo(index);
        };

        Object.defineProperty(self, 'verticalScrollBarEnabled', {
            get:function() {
                return self.nativeObject.showsVerticalScrollIndicator;
            },
            set:function(value) {
                self.nativeObject.showsVerticalScrollIndicator = value;
            },
            enumerable: true
        });

        self.android = {};

        self.setPullRefreshColors = function(param){
            if( Object.prototype.toString.call( param ) === '[object Array]' ) {
                self.refreshControl.tintColor = param[0];
            }else{
                self.refreshControl.tintColor = param;
            }
        }
        
        Object.defineProperty(self, 'onScroll', {
            set: function(value) {
                self.nativeObject.didScroll = value;
            },
            enumerable: true
        });
          
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = ListView;
