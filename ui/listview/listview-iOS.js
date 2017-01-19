const View = require('../view');
const extend = require('js-base/core/extend');

 
const ListView = extend(View)(
   function (_super, params) {
        var self = this;
        
        if(!self.nativeObject){
            self.nativeObject = new SMFUITableView();
        }
        
        _super(this);


        self.rowHeight = 0;
  
        self.itemCount = 0; 
        
        self.onRowCreate = function(){};
    
        self.onRowBind = function (listViewItem, index){};
        self.onRowSelected = function (listViewItem, index){};
        
        self.listViewItems = {};
        
        self.nativeObject.itemCount = function(){
            return self.itemCount;
        }
        
        self.nativeObject.cellForRowAt = function(e){
             var lisviewItem = self.onRowCreate();

             self.listViewItems[e.index] = lisviewItem;
             self.onRowBind(self.listViewItems[e.index],e.index);
             return lisviewItem.cell;
         }
          
        self.nativeObject.didSelectRowAt = function(e){
           self.onRowSelected(self.listViewItems[e.index],e.index);
        }

        self.nativeObject.tableRowHeight = function(e){
            return self.rowHeight;
        }
        
         if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = ListView;