const View = require('../view');
const extend = require('js-base/core/extend');
const UIControlEvents = require("nf-core/util").UIControlEvents;
 
const ListView = extend(View)(
   function (_super, params) {
        var self = this;
        
        if(!self.nativeObject){
            self.nativeObject = new SMFUITableView();
            self.refreshControl = new UIRefreshControl();
            self.nativeObject.addSubview(self.refreshControl);
        }
        
        _super(this);
        
        self.onRowCreate = function(){};
    
        self.onRowBind = function (listViewItem, index){};
        self.onRowSelected = function (listViewItem, index){};
        
        self.ios = {}
        
        self.ios.swipeItem = function(title,action){
            return UITableViewRowAction.create(title,action);
        }
        
        self.stopRefresh = function(){
            self.refreshControl.endRefreshing();
        }
        
        Object.defineProperty(self.ios, 'swipeItems', {
            get: function() {
                return self.nativeObject.rowActions;
            },
            set: function(value) {
                self.nativeObject.rowActions = value;
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
         }
         
         var templateItem;
         self.nativeObject.onRowCreate =  function(e){
             var lisviewItem = self.onRowCreate();
             templateItem = lisviewItem;
             return lisviewItem.nativeObject;
         }
         
         self.createTemplate = function(e){
            var tempTemplateItem = templateItem;
            templateItem.nativeObject = e.contentView;
                for (var template in templateItem.childs){
                  tempTemplateItem.childs[template].nativeObject = e.contentView.viewWithTag(tempTemplateItem.childs[template].id);
                }
            return tempTemplateItem;
         }
         
        self.nativeObject.didSelectRowAt = function(e){
           var listItem = self.createTemplate(e);
           self.onRowSelected(listItem,e.index);
        };
        
        self.refreshData = function(){
            self.nativeObject.reloadData();
        };
        
        self.firstVisibleIndex = function(){
            var visibleIndexArray =  self.nativeObject.getVisibleIndexArray();
            return visibleIndexArray[0];
        };
        
        this.lastVisibleIndex = function(){
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

        self.android.setPullRefreshColors = function(){}
         if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = ListView;