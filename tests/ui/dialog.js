var expect = require("chai").expect;
var assert = require("chai").assert;

const Dialog = require("../../ui/dialog");

salep.test("sf-core/ui/dialog Unit Test", function () {
    var testObject = new Dialog();
    
    this.case("[layout] getter.", function() {
    	assert.instanceOf(testObject.layout, require("../../ui/flexlayout"),"layout must be FlexLayout");
    });
    
    this.case("[show] function.", function() {
    	assert.doesNotThrow( function(){testObject.show(); }, Error);
    });
    
    this.case("[hide] function.", function() {
    	assert.doesNotThrow( function(){testObject.hide(); }, Error);
    });
});