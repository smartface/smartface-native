var expect = require("chai").expect;
var assert = require("chai").assert;

const FlexLayout = require("../../ui/flexlayout");

salep.test("sf-core/ui/view Unit Test", function() {
    var testObject = null;
    
    this.beforeEach(function(){
        testObject = new FlexLayout();
    });
    
    this.afterEach(function(){
        testObject = null;
    });
    
    /** todo
     * All cases failed due to comparing native objects (Flex Probs). Example: 
     * Case Failed : [[alignContent] getter/setter.]. Reason : AssertionError: alignContent must be FlexLayout.AlignContent.STRETCH: expected [Function: [object Object]] to equal [Function: [object Object]]
     */
    this.case("[alignContent] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.alignContent = FlexLayout.AlignContent.STRETCH; }, Error);
    	assert.equal(testObject.alignContent, FlexLayout.AlignContent.STRETCH, "alignContent must be FlexLayout.AlignContent.STRETCH");
    });
    
    this.case("[alignItems] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.alignItems = FlexLayout.AlignItems.STRETCH; }, Error);
    	assert.equal(testObject.alignItems, FlexLayout.AlignItems.STRETCH, "alignItems must be FlexLayout.AlignItems.STRETCH");
    });
    
    this.case("[direction] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.direction = FlexLayout.Direction.RTL; }, Error);
    	assert.equal(testObject.direction, FlexLayout.Direction.RTL, "direction must be FlexLayout.Direction.RTL");
    });
    
    this.case("[flexDirection] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.flexDirection = FlexLayout.FlexDirection.ROW_REVERSE; }, Error);
    	assert.equal(testObject.flexDirection, FlexLayout.FlexDirection.ROW_REVERSE, "flexDirection must be FlexLayout.FlexDirection.ROW_REVERSE");
    });
    
    this.case("[flexWrap] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.flexWrap = FlexLayout.FlexWrap.WRAP; }, Error);
    	assert.equal(testObject.flexWrap, FlexLayout.FlexWrap.WRAP, "flexWrap must be FlexLayout.FlexWrap.WRAP");
    });
    
    this.case("[justifyContent] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.justifyContent = FlexLayout.JustifyContent.SPACE_BETWEEN; }, Error);
    	assert.equal(testObject.justifyContent, FlexLayout.JustifyContent.SPACE_BETWEEN, "justifyContent must be FlexLayout.JustifyContent.SPACE_BETWEEN");
    });
    
    this.case("[overFlow] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.overFlow = FlexLayout.Overflow.VISIBLE; }, Error);
    	assert.equal(testObject.overFlow, FlexLayout.Overflow.VISIBLE, "overFlow must be FlexLayout.Overflow.VISIBLE");
    });
    
    this.case("[applyLayout] function.", function() {
    	assert.doesNotThrow( function(){ testObject.applyLayout(); }, Error);
    });
    

});