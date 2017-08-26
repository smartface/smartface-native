var expect = require("chai").expect;
var assert = require("chai").assert;

const SearchView = require("../../ui/searchview");

salep.test("sf-core/io/file Unit Test", function() {
    var testObject = null;
    
    this.beforeEach(function(){
        testObject = new SearchView();
    });
    
    this.afterEach(function(){
        testObject = null;
    });

    this.case("[text] getter/setter.", function() {
        assert.doesNotThrow(function(){testObject.text = "Smartface Text";}, Error);
        assert.equal(testObject.text, "Smartface Text", 'text must be "Smartface Text"');
    });
    
    this.case("[hint] getter/setter.", function() {
        assert.doesNotThrow(function(){testObject.hint = "Smartface Hint";}, Error);
        assert.equal(testObject.hint, "Smartface Hint", 'hint must be "Smartface Hint"');
    });
    
    this.case("[textColor] getter/setter.", function() {
        assert.doesNotThrow(function(){testObject.textColor = require("../../ui/color").RED;}, Error);
        assert.equal(testObject.textColor, require("../../ui/color").RED, 'textColor must be "Color.RED"');
    });
    
    this.case("[iconImage] getter/setter.", function() {
        assert.doesNotThrow(function(){testObject.iconImage = require("../../ui/image").createFromFile("images://smartface.png");}, Error);
        assert.isNotNull(testObject.iconImage, 'iconImage must NOT be null');
    });
    
    this.case("[addToHeaderBar] function.", function() {
        assert.doesNotThrow(function(){testObject.addToHeaderBar();}, Error);
    });
    
    this.case("[removeFromHeaderBar] function.", function() {
        assert.doesNotThrow(function(){testObject.removeFromHeaderBar();}, Error);
    });
    
    this.case("[requestFocus] function.", function() {
        assert.doesNotThrow(function(){testObject.requestFocus();}, Error);
    });
    
    this.case("[removeFocus] function.", function() {
        assert.doesNotThrow(function(){testObject.removeFocus();}, Error);
    });
    
    this.case("[android.hintTextColor] getter/setter.", function() {
        assert.doesNotThrow(function(){testObject.android.hintTextColor = require("../../ui/color").RED;}, Error);
        assert.equal(testObject.android.hintTextColor, require("../../ui/color").RED, 'android.hintTextColor must be "Color.RED"');
    });
    
    this.case("[android.font] getter/setter.", function() {
        const Font = require("../../ui/font");
        var font = Font.create(Font.DEFAULT, 20, Font.NORMAL);
        assert.doesNotThrow(function(){testObject.android.font = font;}, Error);
        assert.equal(testObject.android.font, font, 'android.font must be "Font.DEFAULT"');
    });
    
    this.case("[android.textalignment] getter/setter.", function() {
        assert.doesNotThrow(function(){testObject.android.textalignment = require("../../ui/textalignment").BOTTOMRIGHT;}, Error);
        assert.equal(testObject.android.textalignment, require("../../ui/textalignment").BOTTOMRIGHT, 'android.textalignment must be "TextAlignment.BOTTOMRIGHT"');
    });
    
    this.case("[android.closeImage] getter/setter.", function() {
        assert.doesNotThrow(function(){testObject.android.closeImage = require("../../ui/image").createFromFile("images://smartface.png");}, Error);
        assert.isNotNull(testObject.android.closeImage, 'android.closeImage must NOT be null');
    });
    
    this.case("[android.keyboardType] getter/setter.", function() {
        assert.doesNotThrow(function(){testObject.android.keyboardType = require("../../ui/keyboardtype").EMAILADDRESS;}, Error);
        assert.equal(testObject.android.keyboardType, require("../../ui/keyboardtype").EMAILADDRESS, 'android.keyboardType must be "KeyboardType.EMAILADDRESS"');
    });
});