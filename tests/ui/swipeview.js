var expect = require("chai").expect;
var assert = require("chai").assert;

const SwipeView = require('../../ui/swipeview');
const Page = require('../../ui/page');

salep.test("sf-core/ui/swipeview Unit Test", function() {
    var pages = [Page, Page];
    var page = new Page();
    
    var testObject = new SwipeView({
        page: page,
    });
    
    this.case("[currentIndex] getter.", function() {
    	assert.equal(testObject.currentIndex, 0, "currentIndex must be 0");
    });
    
    this.case("[pages] getter.", function() {
    	assert.doesNotThrow( function(){ testObject.pages = pages; }, Error);
        assert.isNotNull(testObject.pages, "pages must NOT be null");
    });
    
    this.case("[swipeToIndex] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.swipeToIndex(1, true); }, Error);
    });
});