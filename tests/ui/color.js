var expect  = require("chai").expect;
var assert  = require("chai").assert;

const Color = require("../../ui/color");

salep.test("sf-core/ui/color Unit Test", function() {
    this.case("[create] create a color instance with integer values.", function() {
        var myColor1 = Color.create(255, 0, 100);
        assert.equal(255, Color.red(myColor1), "Red value must be 255.");
        assert.equal(0, Color.green(myColor1), "Green value must be 0.");
        assert.equal(100, Color.blue(myColor1) , "Blue value must be 100.");
        
        var myColor2 = Color.create(100, 0, 0, 100);
        assert.notEqual(0, Color.alpha(myColor2), "Alpha value must not be 0.");
        assert.notEqual(255, Color.red(myColor2), "Red value must not be 255.");
        assert.notEqual(255, Color.green(myColor2), "Green value must not be 255.");
        assert.notEqual(0, Color.blue(myColor2) , "Blue value must not be 0.");
    });

    this.case("[create] create a color instance with hexadecimal.", function() {
        var myColor1 = Color.create("#00FF0000"); // ARGB(0, 255, 0, 0)
        assert.equal(0, Color.alpha(myColor1), "Alpha value must be 0.");
        assert.equal(255, Color.red(myColor1), "Red value must be 255.");
        assert.equal(0, Color.green(myColor1), "Green value must be 0.");
        assert.equal(0, Color.blue(myColor1) , "Blue value must be 0.");
        
        var myColor2 = Color.create("#FF000000"); // ARGB(255, 0, 0, 0)
        assert.notEqual(0, Color.alpha(myColor2), "Alpha value must not be 0.");
        assert.notEqual(255, Color.red(myColor2), "Red value must not be 255.");
        assert.notEqual(255, Color.green(myColor2), "Green value must not be 255.");
        assert.notEqual(255, Color.blue(myColor2) , "Blue value must not be 255.");
    });

    this.case("[alpha] getter.", function() {
        var myColor1 = Color.create(0, 255, 255, 255);
        assert.equal(0, Color.alpha(myColor1), "Alpha value must be 0.");
        
        var myColor2 = Color.create("#FF000000"); // ARGB(255, 0, 0, 0)
        assert.notEqual(0, Color.alpha(myColor2), "Alpha value must not be 0.");
    });

    this.case("[red] getter.", function() {
        var myColor1 = Color.create(255, 0, 0);
        assert.equal(255, Color.red(myColor1), "Red value must be 255.");
        
        var myColor2 = Color.create(0, 255, 255);
        assert.notEqual(255, Color.red(myColor2), "Red value must not be 255.");
    });

    this.case("[green] getter.", function() {
        var myColor1 = Color.create(255, 100, 255);
        assert.equal(100, Color.green(myColor1), "Green value must be 100.");
        
        var myColor2 = Color.create(50, 255, 50);
        assert.notEqual(50, Color.green(myColor2), "Green value must not be 50.");
    });

    this.case("[blue] getter.", function() {
        var myColor1 = Color.create(150, 150, 255);
        assert.equal(255, Color.blue(myColor1), "Blue value must be 255.");
        
        var myColor2 = Color.create(50, 50, 100);
        assert.notEqual(50, Color.blue(myColor2), "Blue value must not be 50.");
    });
});