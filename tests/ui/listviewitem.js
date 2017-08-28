var assert  = require("chai").assert;

const ListViewItem = require('../../ui/listviewitem');
const System = require('../../device/system');

salep.test("sf-core/ui/listviewitem Unit Test", function () {
    var testObject = null;

    this.beforeEach(function(){
        testObject = new ListViewItem();
    });
    
    this.afterEach(function(){
        testObject = null;
    });
    
    this.case("[height] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.height = 10; }, Error);
    	assert.equal(testObject.height, 10, "height must be 10");
    });
    
    this.case("[width] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.width = 10; }, Error);
    	assert.equal(testObject.width, 10, "width must be 10");
    });
    
    if(System.OS === "Android"){
        this.case("[nativeInner] getter/setter.", function() {
        	assert.isNotNull(testObject.nativeInner, "nativeInner must NOT be null");
        });
    }
});