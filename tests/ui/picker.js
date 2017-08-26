var assert = require("chai").assert;

const Picker = require("../../ui/picker");

var Creator = {picker: new Picker()};

salep.test("sf-core/ui/picker Unit Test", function () {
    this.case("[currentIndex] test default.", function () {
        assert.equal(Creator.picker.currentIndex,  0, "Default currentIndex must be equal to zero.");
    });
    
    this.case("[index] test.", function () {
        Creator.picker.index = 5;
        assert.equal(Creator.picker.index,  5, "index must be equal to 5.");
    });
    
    this.case("[enabled] test.", function () {
        Creator.picker.android.enabled = false;
        assert.isFalse(Creator.picker.android.enabled,  "android.enabled must be false.");
    });
    
    
    this.case("[items] test.", function () {
        Creator.picker.items = [
            "item 1",
            "item 2",
            "item 3",
            "item 4",
            "item 5"
        ];
        assert.equal(Creator.picker.items[1],  "item 2", "items[1] must be equal to 'item 2'.");
    });
});