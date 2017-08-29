var assert = require("chai").assert;

const ScrollView = require('../../ui/scrollview');

salep.test("sf-core/ui/scrollview Unit Test", function() {
    var testObject = null;

    this.beforeEach(function() {
        testObject = new ScrollView();
    });

    this.afterEach(function() {
        testObject = null;
    });
    
    this.case("[align] getter/setter.", function() {
        assert.equal(testObject.align, ScrollView.Align.VERTICAL, "align must be ScrollView.Align.VERTICAL");
    });

    this.case("[contentOffset] getter/setter.", function() {
        assert.isObject(testObject.contentOffset, {x: 0, y:0}, "contentOffset must be object");
    });

    this.case("[layout] getter/setter.", function() {
        assert.instanceOf(testObject.layout, require("../../ui/flexlayout"), "layout must be ");
    });

    this.case("[scrollBarEnabled] getter/setter.", function() {
        assert.doesNotThrow(function() { testObject.scrollBarEnabled = true; }, Error);
        assert.isTrue(testObject.scrollBarEnabled, "scrollBarEnabled must be true");
    });

    this.case("[scrollToCoordinate] getter/setter.", function() {
        assert.doesNotThrow(function() { testObject.scrollToCoordinate(100) ; }, Error);
    });

    this.case("[scrollToEdge] getter/setter.", function() {
        assert.doesNotThrow(function() { testObject.scrollToEdge(ScrollView.Edge.BOTTOM) ; }, Error);
    });
});
