const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');
const Invocation = require('sf-core/util/iOS/invocation.js');

const CollectionViewItem = extend(ViewGroup)(
    function (_super, params) {
        var sfSelf = this;
        
        _super(this);
        
        // Assign parameters given in constructor
        
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = CollectionViewItem;