var assert  = require("chai").assert;

const ImageView = require('../../ui/imageview');
const Image = require('../../ui/image');

salep.test("sf-core/ui/imageview Unit Test", function () {
    var testObject = null;
    var myImage = Image.createFromFile("images://smartface.png")
    
    this.beforeEach(function(){
        testObject = new ImageView();
    });
    
    this.afterEach(function(){
        testObject = null;
    });
    
    this.case("[image] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.image = myImage; }, Error);
    	assert.equal(testObject.image, myImage, "image must be myImage");
    });
    
    this.case("[imageFillType] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.imageFillType = ImageView.FillType.NORMAL; }, Error);
    	assert.equal(testObject.imageFillType, ImageView.FillType.NORMAL, "imageFillType must be ImageView.FillType.NORMAL");
    });
    
    this.case("[loadFromUrl] function.", function() {
    	assert.doesNotThrow( function(){ testObject.loadFromUrl("https://www.smartface.io/smartface/images/sprite-images-sbf5b58144d.png"); }, Error);
    });
    

});