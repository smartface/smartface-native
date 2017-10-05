var expect = require("chai").expect;
var assert = require("chai").assert;

const TabBarItem = require('../../ui/tabbaritem');
const Image = require('../../ui/image');
const Page = require('../..//ui/page');

salep.test("sf-core/ui/swipeview Unit Test", function() {
    var testObject = new TabBarItem();
    
    this.case("[icon] getter/setter.", function() {
        var myImage = Image.createFromFile("images://smartface.png");
    	assert.doesNotThrow( function(){ testObject.icon = myImage; }, Error);
    	assert.equal(testObject.icon, myImage, "icon must be myImage");
    });
    
    this.case("[route] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.route = Page; }, Error);
    	assert.equal(testObject.route, Page, "route must be Page");
    });
    
    this.case("[title] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.title = "Smartface"; }, Error);
    	assert.equal(testObject.title, "Smartface", "title must be 'Smartface'");
    });
});