var assert  = require("chai").assert;

const Slider = require('../../ui/slider');
const Color = require('../../ui/color');
const Image = require('../../ui/image');


salep.test("sf-core/ui/slider Unit Test", function () {
    var mySlider = null;
    var myImage = Image.createFromFile("images://smartface.png")
    
    this.beforeEach(function(){
        mySlider = new Slider();
    })
    
    this.afterEach(function(){
        mySlider = null;
    })
    
    //Test with default values
    this.case("[Slider] test defaults values.", function() {
        // Test thumbColor
        assert.equal(mySlider.thumbColor, Color.GRAY, "thumbColor must be equal to Color.GRAY");
        assert.notEqual(mySlider.thumbColor, Color.RED, "thumbColor is not equal to Color.RED"); 
        
        // Test thumbImage
        assert.isNull(mySlider.thumbImage, "thumbImage must be null");

        // Test maxTrackColor
        assert.equal(mySlider.maxTrackColor, Color.GREEN, "maxTrackColor must be equal to Color.GREEN");
        assert.notEqual(mySlider.maxTrackColor, Color.BLUE, "maxTrackColor is not equal to Color.BLUE");
    
        // Test minTrackColor
        assert.equal(mySlider.minTrackColor, Color.DARKGRAY, "minTrackColor must be equal to Color.DARKGRAY");
        assert.notEqual(mySlider.minTrackColor, Color.RED, "minTrackColor is not equal to Color.RED");
    
        // Test maxValue
        assert.equal(mySlider.maxValue, 100, "maxValue must be equal to 100");
        assert.notEqual(mySlider.maxValue, 50, "maxValue is not equal to 50");

        // Test minValue
        assert.equal(mySlider.minValue, 0, "minValue must be equal to 0");
        assert.notEqual(mySlider.minValue, 100, "minValue is not equal to 100");

        // Test value
        assert.equal(mySlider.value, 0, "value must be equal to 0");
        assert.notEqual(mySlider.value, 100, "value is not equal to 100");
    });
    
    // Test with assigned values 
    this.case("[thumbColor] setter/getter with blue color.", function () {
        assert.doesNotThrow(function(){ mySlider.thumbColor = Color.BLUE; }, Error);
        assert.equal(mySlider.thumbColor, Color.BLUE, "thumbColor must be equal to Color.BLUE");
        assert.notEqual(mySlider.thumbColor, Color.RED, "thumbColor is not equal to Color.RED");
    });

    this.case("[thumbImage] setter/getter with blue color.", function () {
        assert.doesNotThrow(function(){ mySlider.thumbImage = myImage; }, Error);
        assert.isNotNull(mySlider.thumbImage, "thumbImage must NOT be null");
    });

    this.case("[minTrackColor] setter/getter with green color.", function () {
        assert.doesNotThrow(function(){ mySlider.minTrackColor = Color.GREEN; }, Error);
        assert.equal(mySlider.minTrackColor, Color.GREEN, "minTrackColor must be equal to Color.GREEN");
        assert.notEqual(mySlider.minTrackColor, Color.RED, "minTrackColor is not equal to Color.RED");
    });

    this.case("[maxTrackColor] setter/getter with red color.", function () {
        assert.doesNotThrow(function(){ mySlider.maxTrackColor = Color.RED; }, Error);
        assert.equal(mySlider.maxTrackColor, Color.RED, "maxTrackColor must be equal to Color.RED");
        assert.notEqual(mySlider.maxTrackColor, Color.BLUE, "maxTrackColor is not equal to Color.BLUE");
    });

    this.case("[maxValue] setter/getter with assigned to 200.", function () {
        assert.doesNotThrow(function(){ mySlider.maxValue = 200; }, Error);
        assert.equal(mySlider.maxValue, 200, "maxValue must be equal to 200");
        assert.notEqual(mySlider.maxValue, 50, "maxValue is not equal to 50");
    });

    this.case("[minValue] setter/getter with assigned to 50.", function () {
        assert.doesNotThrow(function(){ mySlider.minValue = 50; }, Error);
        assert.equal(mySlider.minValue, 50, "minValue must be equal to 50");
        assert.notEqual(mySlider.minValue, 100, "minValue is not equal to 100");
    });

    this.case("[value] setter/getter with assigned to 70.", function () {
        assert.doesNotThrow(function(){ mySlider.value = 70; }, Error);
        assert.equal(mySlider.value, 70, "value must be equal to 70");
        assert.notEqual(mySlider.value, 100, "value is not equal to 100");
    });
});