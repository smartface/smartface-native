var expect = require("chai").expect;
var assert = require("chai").assert;

const Share = require("../../share");

salep.test("sf-core/global/share Unit Test", function() {
    var myImage = require("../../ui/image").createFromFile('images://smartface.png');
    
    this.case("[shareText] function.", function() {
        assert.doesNotThrow(function(){ Share.shareText("Smartface"); }, Error);
    });
    
    this.case("[shareImage] function.", function() {
        assert.doesNotThrow(function(){ Share.shareImage(myImage); }, Error);
    });
    
});