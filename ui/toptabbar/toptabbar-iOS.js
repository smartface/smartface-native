const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
/**
 * @class UI.ViewGroup
 * @since 0.1
 * @extends View
 * A ViewGroup is a special view that can contain other views (called children) like layouts and views.
 * ViewGroup is an abstract class. You can't create instance from it.
 */
const TopTabBarPage = extend(Page)(
    function (_super, params) {
        
        var self = this;
        
        if (!self.nativeObject) {
            // console.log("Class : " + new __SF_TopTabViewController());
            self.nativeObject = new __SF_TopTabViewController();
        }
        
        _super(self);
        
        var _pageForIndex = function(e){}.bind(this);
        Object.defineProperty(self, 'pageForIndex', {
            get: function() {
                return _pageForIndex;
            },
            set: function(value) {
                _pageForIndex = value;
                self.nativeObject.viewControllerForIndex = function(index) {
                    var retval = undefined;
                    if (typeof self.pageForIndex === "function") {
                        retval = _pageForIndex.call(this, index).nativeObject;
                    }
                    return retval;
                }.bind(this);
            },
            enumerable: true,
            configurable : true
        });
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = TopTabBarPage;