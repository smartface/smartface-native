const View = require('../view');
const extend = require('js-base/core/extend');

 
const ListView = extend(View)(
   function (_super, params) {
        var self = this;
        
        if(!self.nativeObject){
            self.nativeObject = new SMFUITableView();
        }
        
        _super(this);
        
        self.onRowCreate = function(){};
    
        self.onRowBind = function (listViewItem, index){};
        self.onRowSelected = function (listViewItem, index){};
        
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
             return lisviewItem.cell;
         }
         
         self.createTemplate = function(e){
            var tempTemplateItem = templateItem;
                for (var template in templateItem.childs){
                  tempTemplateItem.childs[template].nativeObject = e.cell.contentView.viewWithTag(tempTemplateItem.childs[template].id);
                }
            return tempTemplateItem;
         }
         
        self.nativeObject.didSelectRowAt = function(e){
           var listItem = self.createTemplate(e);
           self.onRowSelected(listItem,e.index);
        }
        
        this.refreshData = function(){
            self.nativeObject.reloadData();
        };
        
        
         if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = ListView;