var expect = require("chai").expect;
var assert = require("chai").assert;

const TextBox = require("../../ui/textbox");
const Color = require('../../ui/color');
const TextAlignment = require('../../ui/textalignment');
const Font = require('../../ui/font');
const ActionKeyType = require('../../ui/actionkeytype');
const KeyboardAppearance = require('../../ui/keyboardappearance');
const KeyboardType = require('../../ui/keyboardtype');

salep.test("sf-core/ui/textbox Unit Test", function() {
    var testObject = null;
    
    this.beforeEach(function(){
        testObject = new TextBox();
    });
    
    this.afterEach(function(){
        testObject = null;
    });
    
    this.case("[actionKeyType] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.actionKeyType = ActionKeyType.DEFAULT; }, Error);
    	assert.equal(testObject.actionKeyType, ActionKeyType.DEFAULT, "actionKeyType must be ActionKeyType.DEFAULT");
    });
    
    this.case("[ios.adjustFontSizeToFit] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.ios.adjustFontSizeToFit = true; }, Error);
    	assert.isTrue(testObject.ios.adjustFontSizeToFit, "ios.adjustFontSizeToFit must be true");
    });
    
    this.case("[ios.clearButtonEnabled] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.ios.clearButtonEnabled = true; }, Error);
    	assert.isTrue(testObject.ios.clearButtonEnabled, "ios.clearButtonEnabled must be true");
    });
    
    this.case("[font] getter/setter.", function() {
    	var myFont = Font.create("Arial", 16, Font.BOLD);
        assert.doesNotThrow(function(){ testObject.font = myFont; }, Error);
        assert.equal(testObject.font, myFont, "font must be match");
    });
    
    this.case("[hint] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.hint = "Smartface"; }, Error);
    	assert.equal(testObject.hint, "Smartface", "hint must be 'Smartface'");
    });
    
    this.case("[android.hintTextColor] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.android.hintTextColor = Color.RED; }, Error);
    	assert.equal(testObject.android.hintTextColor, Color.RED, "android.hintTextColor must be Color.RED");
    });
    
    this.case("[isPassword] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.isPassword = true; }, Error);
    	assert.isTrue(testObject.isPassword, "isPassword must be true");
    });
    
    this.case("[ios.keyboardAppearance] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.ios.keyboardAppearance = KeyboardAppearance.DARK; }, Error);
    	assert.equal(testObject.ios.keyboardAppearance, KeyboardAppearance.DARK, "ios.keyboardAppearance must be KeyboardAppearance.DARK");
    });
    
    this.case("[keyboardType] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.keyboardType = KeyboardType.NUMBER; }, Error);
    	assert.equal(testObject.keyboardType, KeyboardType.NUMBER, "keyboardType must be KeyboardType.NUMBER");
    });
    
    this.case("[ios.minimumFontSize] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.ios.minimumFontSize = 10; }, Error);
    	assert.equal(testObject.ios.minimumFontSize, 10, "ios.minimumFontSize must be 10");
    });
    
    this.case("[text] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.text = "Smartface"; }, Error);
    	assert.equal(testObject.text, "Smartface", "text must be 'Smartface'");
    });
    
    this.case("[textAlignment] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.textAlignment = TextAlignment.TOPRIGHT; }, Error);
    	assert.equal(testObject.textAlignment, TextAlignment.TOPRIGHT, "textAlignment must be TextAlignment.TOPRIGHT");
    });
    
    this.case("[textColor] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.textColor = Color.RED; }, Error);
    	assert.equal(testObject.textColor, Color.RED, "textColor must be Color.RED");
    });
    
    this.case("[hideKeyboard] function.", function() {
    	assert.doesNotThrow( function(){ testObject.hideKeyboard(); }, Error);
    });
    
    this.case("[removeFocus] function.", function() {
    	assert.doesNotThrow( function(){ testObject.removeFocus(); }, Error);
    });
    
    this.case("[requestFocus] function.", function() {
    	assert.doesNotThrow( function(){ testObject.requestFocus(); }, Error);
    });
    
    this.case("[showKeyboard] function.", function() {
    	assert.doesNotThrow( function(){ testObject.showKeyboard() ; }, Error);
    });
});
