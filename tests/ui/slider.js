var assert  = require("chai").assert;

const Slider = require('sf-core/ui/slider');
const Color = require('sf-core/ui/color');

var mySlider = new Slider();

salep.test("sf-core/ui/slider Unit Test", function () {

    //Test with default values
    this.case("[thumbColor] setter/getter with default value.", function () {
        assert.equal(mySlider.thumbColor, Color.GRAY, "thumbColor must be equal to Color.GRAY");
        assert.notEqual(mySlider.thumbColor, Color.RED, "thumbColor is not equal to Color.RED");
    });

    this.case("[thumbImage] setter/getter with default value.", function () {
        assert.equal(mySlider.thumbImage, "images://smartface.png", "thumbImage must be equal to 'images://smartface.png'");
        assert.deepNotEqual(mySlider.thumbImage, "images://icon.png", "thumbImage is not equal to 'images://icon.png'");
    });

    this.case("[minTrackColor] setter/getter with default value.", function () {
        assert.equal(mySlider.minTrackColor, Color.BLUE, "minTrackColor must be equal to Color.BLUE");
        assert.notEqual(mySlider.minTrackColor, Color.RED, "minTrackColor is not equal to Color.RED");
    });

    this.case("[maxTrackColor] setter/getter with default value.", function () {
        assert.equal(mySlider.maxTrackColor, Color.GREEN, "maxTrackColor must be equal to Color.GREEN");
        assert.notEqual(mySlider.maxTrackColor, Color.BLUE, "maxTrackColor is not equal to Color.BLUE");
    });

    this.case("[maxValue] setter/getter with default value.", function () {
        assert.equal(mySlider.maxValue, 100, "maxValue must be equal to 100");
        assert.notEqual(mySlider.maxValue, 50, "maxValue is not equal to 50");
    });

    this.case("[minValue] setter/getter with default value.", function () {
        assert.equal(mySlider.minValue, 0, "minValue must be equal to 0");
        assert.notEqual(mySlider.minValue, 100, "minValue is not equal to 100");
    });

    this.case("[value] setter/getter with default value.", function () {
        assert.equal(mySlider.value, 30, "value must be equal to 30");
        assert.notEqual(mySlider.value, 100, "value is not equal to 100");
    });
    
    // Test with assigned values 
    this.case("[thumbColor] setter/getter with blue color.", function () {
        mySlider.thumbColor = Color.BLUE;

        assert.equal(mySlider.thumbColor, Color.BLUE, "thumbColor must be equal to Color.BLUE");
        assert.notEqual(mySlider.thumbColor, Color.RED, "thumbColor is not equal to Color.RED");
    });

    this.case("[thumbImage] setter/getter with blue color.", function () {
        mySlider.thumbImage = "images://smartface.png";

        assert.deepEqual(mySlider.thumbImage, "images://smartface.png", "thumbImage must be equal to 'images://smartface.png'");
        assert.deepNotEqual(mySlider.thumbImage, "images://icon.png", "thumbImage is not equal to 'images://icon.png'");
    });

    this.case("[minTrackColor] setter/getter with green color.", function () {
        mySlider.minTrackColor = Color.GREEN;

        assert.equal(mySlider.minTrackColor, Color.GREEN, "minTrackColor must be equal to Color.GREEN");
        assert.notEqual(mySlider.minTrackColor, Color.RED, "minTrackColor is not equal to Color.RED");
    });

    this.case("[maxTrackColor] setter/getter with red color.", function () {
        mySlider.maxTrackColor = Color.RED;

        assert.equal(mySlider.maxTrackColor, Color.RED, "maxTrackColor must be equal to Color.RED");
        assert.notEqual(mySlider.maxTrackColor, Color.BLUE, "maxTrackColor is not equal to Color.BLUE");
    });

    this.case("[maxValue] setter/getter with assigned to 100.", function () {
        mySlider.maxValue = 200;

        assert.equal(mySlider.maxValue, 200, "maxValue must be equal to 200");
        assert.notEqual(mySlider.maxValue, 50, "maxValue is not equal to 50");
    });

    this.case("[minValue] setter/getter with assigned to 50.", function () {
        mySlider.minValue = 50;

        assert.equal(mySlider.minValue, 50, "minValue must be equal to 50");
        assert.notEqual(mySlider.minValue, 100, "minValue is not equal to 100");
    });

    this.case("[value] setter/getter with assigned to 70.", function () {
        mySlider.value = 70;

        assert.equal(mySlider.value, 70, "value must be equal to 70");
        assert.notEqual(mySlider.value, 100, "value is not equal to 100");
    });
});