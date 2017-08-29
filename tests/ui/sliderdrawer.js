var expect = require("chai").expect;
var assert = require("chai").assert;

const SliderDrawer = require("../../ui/sliderdrawer");

salep.test("sf-core/ui/sliderdrawer Unit Test", function() {
    var testObject = null;
    
    this.beforeEach(function(){
        testObject = new SliderDrawer();
    });
    
    this.afterEach(function(){
        testObject = null;
    });
    
    this.case("[drawerPosition] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.drawerPosition = SliderDrawer.Position.RIGHT; }, Error);
    	assert.equal(testObject.drawerPosition, SliderDrawer.Position.RIGHT, "drawerPosition must be SliderDrawer.Position.RIGHT");
    });
    
    this.case("[enabled] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.enabled = true; }, Error);
    	assert.isTrue(testObject.enabled, "enabled must be true");
    });
    
    this.case("[layout] getter/setter.", function() {
    	assert.isNotNull(testObject.layout, "layout must NOT be null");
    });
    
    this.case("[state] getter/setter.", function() {
    	assert.equal(testObject.state, SliderDrawer.State.CLOSED, "state must be SliderDrawer.State.CLOSED");
    });
    
    this.case("[hide] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.hide(); }, Error);
    });
    
    this.case("[show] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.show(); }, Error);
    });
});