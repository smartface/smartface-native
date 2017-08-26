console.log("Picker.js");
var assert = require("chai").assert;

console.log("Before required picker.");
const Picker = require("../../ui/picker");
console.log("Required picker.");

// var Create = {picker: new Picker()};

salep.test("sf-core/ui/picker Unit Test", function () {
    this.case("[currentIndex] test default.", function () {
        console.log("currentIndex test");
        var picker = new Picker();
        console.log("Create.picker " + picker);
        var currentIndex = picker.currentIndex;
        assert.equal(currentIndex,  0, "Default currentIndex must be equal to zero.");
    });
    
    this.case("[index] test.", function () {
        console.log("index test");
        var picker = new Picker({index: 5});
        picker.index = 5;
        console.log("Create.picker " + picker);
        var index = picker.index;
        assert.equal(index,  5, "index must be equal to 5.");
    });
    
    this.case("[enabled] test.", function () {
        console.log("enabled test");
        var picker = new Picker();
        picker.android.enabled = false;
        console.log("Create.picker " + picker);
        assert.isFalse(picker.android.enabled,  "android.enabled must be false.");
    });
    
    
    this.case("[items] test.", function () {
        console.log("items test");
        var picker = new Picker();
        
        var items = [
            "item 1",
            "item 2",
            "item 3",
            "item 4",
            "item 5"
        ];
        picker.items = items;
        console.log("Create.picker " + picker.items[1]);
        assert.equal(picker.items[1],  items[1], "items[1] must be equal to 'item 1'.");
    });
});