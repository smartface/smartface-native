var expect = require("chai").expect;
var assert = require("chai").assert;

const AlertView = require("../../ui/alertview");

const buttonParameters = {
    index: AlertView.Android.ButtonType.POSITIVE,
    text: "MyButton",
    onClick: function(){}
};

salep.test("sf-core/ui/alertview Unit Test", function () {
    var testObject = new AlertView();;
    
    this.case("[android.cancellable] getter/setter.", function() {
    	assert.doesNotThrow( function(){testObject.android.cancellable = true; }, Error);
    	assert.isTrue(testObject.android.cancellable, "android.cancellable must be true");
    });
    
    this.case("[isShowing] function.", function() {
    	assert.isFalse(testObject.isShowing(), "isShowing must be false");
    });
    
    this.case("[message] getter/setter.", function() {
    	assert.doesNotThrow( function(){testObject.message = "Smartface"; }, Error);
    	assert.equal(testObject.message, "Smartface", "message must be 'Smartface'");
    });
    
    this.case("[title] getter/setter.", function() {
    	assert.doesNotThrow( function(){testObject.title = "Smartface"; }, Error);
    	assert.equal(testObject.title, "Smartface", "title must be 'Smartface'");
    });
    
    this.case("[addButton] function.", function() {
    	assert.doesNotThrow( function(){testObject.addButton(buttonParameters); }, Error);
    });
    
    this.case("[show] getter/setter.", function() {
    	assert.doesNotThrow( function(){testObject.show(); }, Error);
    });
    
    this.case("[dismiss] function.", function() {
    	assert.doesNotThrow( function(){testObject.dismiss(); }, Error);
    });
});