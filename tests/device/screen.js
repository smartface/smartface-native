var expect = require("chai").expect;
var assert = require("chai").assert;

const Screen = require("../../device/screen");

salep.test("sf-core/device/screen Unit Test", function() {
    
    this.case("[dpi] getter.", function() {
        assert.isNumber(Screen.dpi, 'dpi must be number');
    });
     
    this.case("[height] getter.", function() {
        assert.isNumber(Screen.height, 'height must be number');
    });
    
    this.case("[width] getter.", function() {
        assert.isNumber(Screen.width, 'width must be number');
    });
    
    this.case("[touchSupported] getter.", function() {
        assert.isBoolean(Screen.touchSupported, 'touchSupported must be boolean');
    });
    
    this.case("[orientation] getter.", function() {
        assert.isString(Screen.orientation, 'orientation must be Screen.OrientationType');
    });
    
    this.case("[capture] function.", function() {
        var result;
        assert.doesNotThrow(function(){ result = Screen.capture(); }, Error);
        assert.isNotNull(result, 'Screen.capture() must NOT be null');
    });
    
});