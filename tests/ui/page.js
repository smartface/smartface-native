var assert = require("chai").assert;

const Router = require("../../router");
const Page = require("../../ui/page");
const extend = require('js-base/core/extend');

salep.test("sf-core/ui/page Unit Test", function() {
    var isLoad = false;
    var pageInstance;
    const page1 = extend(Page)(
        function (_super, params) {
            pageInstance = this;
            _super(this, {
                onLoad: function() {isLoad = true;}
            });
        }
    );
    
    this.case("Page onLoad test.", function() {
        assert.doesNotThrow(function(){Router.add("page1", page1);}, Error);
        assert.doesNotThrow(function(){Router.go("page1");}, Error);
        assert.isTrue(isLoad, "isLoad must be true.");
    });
    
    this.case("Page headerBar getter.", function() {
        assert.doesNotThrow(function(){Router.add("page1", page1);}, Error);
        assert.doesNotThrow(function(){Router.go("page1");}, Error);
        
        assert.isNotNull(pageInstance.headerBar, "headerBar cannot be null.");
    });
    
    this.case("Page statusBar getter", function() {
        assert.isNotNull(pageInstance.statusBar, "statusBar cannot be null.");
    });
    
    this.case("Page default orientation getter", function() {
        assert.equal(pageInstance.orientation, Page.Orientation.PORTRAIT, "orientation must be equal to Page.Orientation.PORTRAIT.");
    });
    
    this.case("Page orientation getter/setter", function() {
        pageInstance.orientation = Page.Orientation.LANDSCAPELEFT;
        assert.equal(pageInstance.orientation, Page.Orientation.LANDSCAPELEFT, "orientation must be equal to Page.Orientation.LANDSCAPELEFT.");
    
        pageInstance.orientation = Page.Orientation.PORTRAIT;
    });
});