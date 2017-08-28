var expect = require("chai").expect;
var assert = require("chai").assert;

const Accelerometer = require("../../device/accelerometer");

salep.test("sf-core/device/system Unit Test", function() {
    
    this.case("[onAccelerate] function.", function() {
        assert.doesNotThrow(function(){ Accelerometer.onAccelerate = function(e){console.log("onAccelerate: " + JSON.stringify(e));}; }, Error);
    });

    this.case("[start] function.", function() {
        assert.doesNotThrow(function(){ Accelerometer.start(); }, Error);
    });
    
    this.case("[stop] function.", function() {
        assert.doesNotThrow(function(){ Accelerometer.stop(); }, Error);
    });
});