const View = require('../view');
const extend = require('js-base/core/extend');
 
const ScrollView = extend(View)(
   function (_super, params) {
        var self = this;
        
        if(!self.nativeObject){
            //self.nativeObject = new SMFUITableView();
        }
    
        _super(this);
        
         if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = ScrollView;