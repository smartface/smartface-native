var expect = require("chai").expect;
var assert = require("chai").assert;

const Image = require("../../ui/image");

salep.test("sf-core/ui/label Unit Test", function() {

    this.case("[createFromFile] function.", function() {
        var myImage = Image.createFromFile("images://smartface.png");
        assert.isNotNull(myImage, 'image must NOT be null');
    });
    
    this.case("[height] getter.", function() {
        var myImage = Image.createFromFile("images://smartface.png");
        assert.isNumber(myImage.height, 'height must be number');
    });
    
    this.case("[width] getter.", function() {
        var myImage = Image.createFromFile("images://smartface.png");
        assert.isNumber(myImage.width, 'width must be number');
    });
});