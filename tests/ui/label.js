var expect = require("chai").expect;
var assert = require("chai").assert;

const Label = require("../../ui/label");
const Color = require('../../ui/color');
const TextAlignment = require('../../ui/textalignment');
const Font = require('../../ui/font');

salep.test("sf-core/ui/label Unit Test", function() {
    var testObject = null;
    
    this.beforeEach(function(){
        testObject = new Label();
    });
    
    this.afterEach(function(){
        testObject = null;
    });
    
    
    this.case("[htmlText] setter/getter", function() {
        var value = "<a href='http://www.smartface.io'>Smartface Rocks!</a>";
        assert.doesNotThrow(function(){ testObject.htmlText = value; }, Error);
        assert.equal(testObject.htmlText, value, "htmlText must be "+ value +"");
    });
    
    this.case("[font] setter/getter.", function() {
        var myFont = Font.create("Arial", 16, Font.BOLD);
        assert.doesNotThrow(function(){ testObject.font = myFont; }, Error);
        assert.equal(testObject.font, myFont, "font must be match");
    });
    
    this.case("[multiline] setter/getter.", function() {
        assert.doesNotThrow(function(){ testObject.multiline = false; }, Error);
        assert.isFalse(testObject.multiline, "multiline must be false");
    });

    this.case("[selectable] setter/getter.", function() {
        assert.doesNotThrow(function(){ testObject.selectable = false; }, Error);
        assert.isFalse(testObject.selectable, "selectable must be false");
    });

    this.case("[text] setter/getter.", function() {
        assert.doesNotThrow(function(){ testObject.text = "Smartface"; }, Error);
        assert.equal("Smartface", testObject.text, "text must be 'Smartface'");
    });

    this.case("[textAlignment] setter/getter.", function() {
        assert.doesNotThrow(function(){ testObject.textAlignment = TextAlignment.MIDCENTER; }, Error);
        assert.equal(TextAlignment.MIDCENTER, testObject.textAlignment, "textAlignment must be TextAlignment.MIDCENTER");
    });

    this.case("[textColor] setter/getter.", function() {
        assert.doesNotThrow(function(){ testObject.textColor = Color.RED; }, Error);
        assert.equal(testObject.textColor, Color.RED, "textColor must be Color.RED");
    });
});
