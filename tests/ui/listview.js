var assert  = require("chai").assert;

const ListView = require('../../ui/listview');
const Color = require('../../ui/color');

salep.test("sf-core/ui/listview Unit Test", function () {
    var testObject = null;

    this.beforeEach(function(){
        testObject = new ListView();
    });
    
    this.afterEach(function(){
        testObject = null;
    });
    
    this.case("[itemCount] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.itemCount = 10; }, Error);
    	assert.equal(testObject.itemCount, 10, "itemCount must be 10");
    });
    
    this.case("[ios.leftToRightSwipeEnabled] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.ios.leftToRightSwipeEnabled = true; }, Error);
    	assert.isTrue(testObject.ios.leftToRightSwipeEnabled, "ios.leftToRightSwipeEnabled must be true");
    });
    
    this.case("[refreshEnabled] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.refreshEnabled = true; }, Error);
    	assert.isTrue(testObject.refreshEnabled, "refreshEnabled must be true");
    });
    
    this.case("[ios.rightToLeftSwipeEnabled] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.ios.rightToLeftSwipeEnabled = true; }, Error);
    	assert.isTrue(testObject.ios.rightToLeftSwipeEnabled, "ios.rightToLeftSwipeEnabled must be ");
    });
    
    this.case("[rowHeight] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.rowHeight = 10; }, Error);
    	assert.equal(testObject.rowHeight, 10, "rowHeight must be 10");
    });
    
    this.case("[verticalScrollBarEnabled] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.verticalScrollBarEnabled = true; }, Error);
    	assert.isTrue(testObject.verticalScrollBarEnabled, "verticalScrollBarEnabled must be true");
    });
    
    this.case("[getFirstVisibleIndex] function.", function() {
    	assert.isNumber(testObject.getFirstVisibleIndex(), Error);
    });
    
    this.case("[getLastVisibleIndex] function.", function() {
    	assert.isNumber(testObject.getLastVisibleIndex(), Error);
    });
    
    this.case("[refreshData] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.refreshData(); }, Error);
    });
    
    this.case("[scrollTo] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.scrollTo(0); }, Error);
    });
    
    this.case("[setPullRefreshColors] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.setPullRefreshColors([Color.RED, Color.BLACK]); }, Error);
    });
    
    this.case("[stopRefresh] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.stopRefresh(); }, Error);
    });
});