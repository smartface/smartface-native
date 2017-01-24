var expect  = require("chai").expect;
var assert  = require("chai").assert;

const Button        = require('nf-core/ui/button');
const Color         = require('nf-core/ui/color');
const StateList     = require('nf-core/util/statelist');
const TextAlignment = require('nf-core/ui/textalignment');

const colorList1 = new StateList({
    normal:   Color.WHITE,
    disabled: Color.BLACK,
    selected: Color.LIGHTGRAY,
    pressed:  Color.DARKGRAY,
    focused:  Color.DARKGRAY
});

const colorList2 = new StateList({
    normal:   Color.RED,
    disabled: Color.WHITE,
    selected: Color.GRAY,
    pressed:  Color.BLUE,
    focused:  Color.YELLOW
});

const imageList = new StateList({
    normal:   "assets://normal.png",
    disabled: "assets://disabled.png",
    selected: "assets://selected.png",
    pressed:  "assets://pressed.png",
    focused:  "assets://focused.png"
});

salep.test("nf-core/ui/label Unit Test", function () {
    this.case("[backgroundColors] setter/getter.", function () {
        var myButton = new Button();
        myButton.backgroundColors = colorList1;
        assert.deepEqual(myButton.backgroundColors, colorList1, "mismatch in color list.");
        assert.notDeepEqual(myButton.backgroundColors, colorList2, "colorList2 cannot be equal to backgroundColors");
    });

    this.case("[backgroundImages] setter/getter.", function () {
        var myButton = new Button();
        myButton.backgroundImages = imageList;
        assert.deepEqual(myButton.backgroundImages, imageList, "mismatch in image list.");
    });

    this.case("[text] setter/getter.", function () {
        var myButton = new Button();
        var defaultValue = myButton.text;
        assert.equal(myButton.text, defaultValue, "mismatch in defaultValue.");
        assert.equal(myButton.text, defaultValue, "default value must be empty string.");

        myButton.text = "one salep pls";
        assert.equal   (myButton.text, "one salep pls", "text must be 'one salep pls'.");
        assert.notEqual(myButton.text, defaultValue   , "text cannot be defaultValue.");
    });

    this.case("[textAlignment] setter/getter.", function () {
        var myButton = new Button();
        myButton.textAlignment = TextAlignment.MIDCENTER;
        assert.equal   (myButton.textAlignment, TextAlignment.MIDCENTER, "mismatching textalignment.");
        assert.notEqual(myButton.textAlignment, TextAlignment.TOPLEFT  , "alignment cannot be TOPLEFT.");
    });

    salep.skipNext(); // TODO: fails with array index
    this.case("[textColors] setter/getter.", function () {
        var myButton = new Button();
        myButton.textColors = colorList1;
        assert.deepEqual   (myButton.textColors, colorList1, "textColors must match with colorList1");
        assert.notDeepEqual(myButton.textColors, colorList2, "textColors CANNOT match with colorList2");
    });
});