var assert = require("chai").assert;

const Location = require("../../device/location");

salep.test("sf-core/device/location Unit Test", function() {

    this.case("Location start function", function() {
        assert.doesNotThrow(function(){Location.start(Location.android.Provider.AUTO); }, Error);
    });
    
    this.case("Location stop function", function() {
        assert.doesNotThrow(function(){Location.stop(); }, Error);
    });
});