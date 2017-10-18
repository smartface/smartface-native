var expect = require("chai").expect;
var assert = require("chai").assert;

const TabBarItem = require('../../ui/tabbaritem');
const BottomTabBar = require('../../ui/bottomtabbar');
const Page = require('../../ui/page');
const Image = require('../../ui/image');
const Color = require('../../ui/color');

salep.test("sf-core/ui/bottomtabbar Unit Test", function() {
    var testObject = new BottomTabBar();
    var myImage = Image.createFromFile("images://smartface.png");

    var myTabbarItem = new TabBarItem({
        title: "Smartface",
        icon: myImage,
        route: Page
    });
    
    this.case("[backgroundColor] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.backgroundColor = Color.RED; }, Error);
    	assert.equal(testObject.backgroundColor, Color.RED, "backgroundColor must be Color.RED");
    });
    
    this.case("[itemColor] getter/setter.", function() {
        var itemColor = {normal: Color.RED, selected: Color.RED};
    	assert.doesNotThrow( function(){ testObject.itemColor = itemColor; }, Error);
    	assert.equal(testObject.itemColor, itemColor, "itemColor must be 'itemColor'");
    });
    
    this.case("[android.maxItemCount] getter/setter.", function() {
        if (Device.deviceOS === "Android") {
    	    assert.isNumber(testObject.android.maxItemCount, "android.maxItemCount must be number");
        }
    });
    
    this.case("[add] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.add('smartface', myTabbarItem); }, Error);
    });
    
    this.case("[setIndex] getter/setter.", function() {
    	assert.doesNotThrow( function(){  testObject.setIndex('smartface'); }, Error);
    });
    

});