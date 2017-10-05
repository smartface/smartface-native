var assert = require("chai").assert;

const Router = require("../../router");
const Page = require("../../ui/page");
const extend = require('js-base/core/extend');

salep.test("sf-core/router Unit Test", function() {
    this.case("Router add function", function() {
        const page1 = extend(Page)(
            function (_super, params) {
                _super(this);
            }
        );
        const page2 = extend(Page)(
            function (_super, params) {
                _super(this);
            }
        );
        assert.doesNotThrow(function(){Router.add("page1", page1)}, Error);
        assert.doesNotThrow(function(){Router.add("page2", page2, false)}, Error);
    });
    
    this.case("Router go function", function() {
        assert.doesNotThrow(function(){Router.go('page1'); }, Error);
        assert.doesNotThrow(function(){Router.go('page2'); }, Error);
    });
    
    this.case("Router goBack function", function() {
        assert.doesNotThrow(function(){Router.goBack(); }, Error);
    });
    
    this.case("Router getCurrent function", function() {
        var tag = Router.getCurrent();
        assert.equal(tag, "page1", "getCurrent must return 'page1'.");
    });
});