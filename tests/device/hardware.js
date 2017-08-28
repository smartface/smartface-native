var assert = require("chai").assert;

const Hardware = require('../../device/hardware');
salep.test("Hardware Unit Test", function () {
    this.case("Hardware IMEI property", function () {
        assert.isNotNull(Hardware.android.IMEI, "IMEI cannot be null.");
    });
    
    this.case("Hardware UID property.", function () {
        assert.isNotNull(Hardware.UID, "UID cannot be null.");
    });
    
    this.case("Hardware brandName property", function () {
        assert.isNotNull(Hardware.brandName, "brandName cannot be null.");
    });
    
    this.case("Hardware android.vendorID property", function () {
        assert.isNotNull(Hardware.android.vendorID, "android.vendorID cannot be null.");
    });
    
    this.case("Hardware brandModel property", function () {
        assert.isNotNull(Hardware.brandModel, "brandModel cannot be null.");
    });
});