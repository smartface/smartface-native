var expect = require("chai").expect;
var assert = require("chai").assert;

const FloatingMenu = require("../../ui/floatingmenu");
const Image = require("../../ui/image");
const Color = require("../../ui/color");

salep.test("sf-core/ui/floatingmenuitem Unit Test", function() {
    var testObject = null;

    this.beforeEach(function(){
        testObject = new FloatingMenu.Item();
    });
    
    this.afterEach(function(){
        testObject = null;
    });
    
    this.case("[color] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.color = Color.RED; }, Error);
    	assert.equal(testObject.color, Color.RED, "color must be Color.RED");
    });
    
    this.case("[icon] getter/setter.", function() {
        var myImage = Image.createFromFile("images://smartface.png");
    	assert.doesNotThrow( function(){ testObject.icon = myImage; }, Error);
    	assert.equal(testObject.icon, myImage, "icon must be myImage");
    });
    
    this.case("[title] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.title = "Smartface"; }, Error);
    	assert.equal(testObject.title, "Smartface", "title must be 'Smartface'");
    });
    
    this.case("[titleColor] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.titleColor = Color.RED; }, Error);
    	assert.equal(testObject.titleColor, Color.RED, "titleColor must be Color.RED");
    });
});

salep.test("sf-core/ui/floatingmenu Unit Test", function() {
    var testObject = null;
    var floatingMenuItems = [
    new FloatingMenu.Item({
            title: "red",
            color: Color.RED,
            onClick: function() {
                console.log("clicked: RED");
            }
        }),
        new FloatingMenu.Item({
            title: "yellow",
            titleColor: Color.YELLOW,
            color: Color.YELLOW,
            onClick: function() {
                console.log("clicked: YELLOW");
            }
        }),
        new FloatingMenu.Item({
            title: "default",
            onClick: function() {
                console.log("clicked: DEFAULT");
            }
        })];
    
    this.beforeEach(function(){
        testObject = new FloatingMenu();
    });
    
    this.afterEach(function(){
        testObject = null;
    });
    
    this.case("[color] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.color = Color.RED; }, Error);
    	assert.equal(testObject.color, Color.RED, "color must be Color.RED");
    });
    
    this.case("[icon] getter/setter.", function() {
        var myImage = Image.createFromFile("images://smartface.png");
    	assert.doesNotThrow( function(){ testObject.icon = myImage; }, Error);
    	assert.equal(testObject.icon, myImage, "icon must be myImage");
    });

    this.case("[items] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.items = floatingMenuItems; }, Error);
    	assert.equal(testObject.items, floatingMenuItems, "items must be floatingMenuItems");
    });
    
    this.case("[rotateEnabled] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.rotateEnabled = true; }, Error);
    	assert.isTrue(testObject.rotateEnabled, "rotateEnabled must be true");
    });
    
    this.case("[visible] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.visible = true; }, Error);
    	assert.equal(testObject.visible, true, "visible must be true");
    });
    
    this.case("[open] function.", function() {
    	assert.doesNotThrow( function(){ testObject.open(); }, Error);
    });
    
    this.case("[close] function.", function() {
    	assert.doesNotThrow( function(){ testObject.close(); }, Error);
    });
});