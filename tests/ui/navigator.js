var assert = require("chai").assert;

const Navigator = require("../../ui/navigator");
const Page = require("../../ui/page");
const extend = require('js-base/core/extend');

salep.test("sf-core/ui/navigator Unit Test", function() {
    this.case("Navigator add function", function() {
        const page1 = extend(Page)(
            function (_super, params) {
                _super(this);
            }
        );
        assert.doesNotThrow(function(){Navigator.add("page1", page1)}, Error);
    });
    
    this.case("Navigator go function", function() {
        assert.doesNotThrow(function(){Navigator.go('page1'); }, Error);
    });
});