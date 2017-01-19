const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');

const ListViewItem = extend(ViewGroup)(
    function (_super, params) {
        var self = this;
        
        if(!self.nativeObject){
            self.cell = new SMFUITableViewCell(0,"cell");
            self.nativeObject = self.cell.contentView;
        }
        
        _super(this);
        
        // Assign parameters given in constructor
        
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = ListViewItem;