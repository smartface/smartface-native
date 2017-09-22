var assert = require("chai").assert;

const Menu = require("../../ui/menu");
const MenuItem = require("../../ui/menuitem");
const Page = require("../../ui/page");

salep.test("sf-core/ui/menu Unit Test", function () {
    var testObject = new Menu();
    
    this.case("[headerTitle] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.headerTitle = "Smartface"; }, Error);
    	assert.equal(testObject.headerTitle, "Smartface", "headerTitle must be 'Smartface'");
    });
    
    this.case("[items] getter/setter.", function() {
        var items = [ new MenuItem({title : "Menu Item 1"}), new MenuItem({title : "Menu Item 2"}) ];
    	assert.doesNotThrow( function(){ testObject.items = items; }, Error);
    	assert.equal(testObject.items, items, "items must be 'items'");
    });
    
    this.case("[show] getter/setter.", function() {
        var myPage = new Page();
    	assert.doesNotThrow( function(){ testObject.show(myPage); }, Error);
    });
});
