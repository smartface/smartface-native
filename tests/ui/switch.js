var assert  = require("chai").assert;

const Switch = require('../../ui/switch');
const Color = require('../../ui/color');

salep.test("sf-core/ui/switch Unit Test", function () {
    var testObject = null;

    this.beforeEach(function(){
        testObject = new Switch();
    })
    
    this.afterEach(function(){
        testObject = null;
    })
    
    this.case("[enabled] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.enabled = true; }, Error);
    	assert.isTrue(testObject.enabled, "enabled must be true");
    });
    
    this.case("[android.thumbOffColor] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.android.thumbOffColor = Color.RED; }, Error);
    	assert.equal(testObject.android.thumbOffColor, Color.RED, "android.thumbOffColor must be Color.RED");
    });
    
    this.case("[thumbOnColor] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.thumbOnColor = Color.RED; }, Error);
    	assert.equal(testObject.thumbOnColor, Color.RED, "thumbOnColor must be Color.RED");
    });
    
    this.case("[toggle] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.toggle = true; }, Error);
    	assert.isTrue(testObject.toggle, "toggle must be true");
    });
    
    this.case("[android.toggleOffColor] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.android.toggleOffColor = Color.RED; }, Error);
    	assert.equal(testObject.android.toggleOffColor, Color.RED, "android.toggleOffColor must be Color.RED");
    });
    
    this.case("[toggleOnColor] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.toggleOnColor = Color.RED; }, Error);
    	assert.equal(testObject.toggleOnColor, Color.RED, "toggleOnColor must be Color.RED");
    });
});