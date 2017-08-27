var expect = require("chai").expect;
var assert = require("chai").assert;

const System = require("../../device/system");

salep.test("sf-core/device/system Unit Test", function() {
    
    this.case("[language] getter.", function() {
        assert.isString(System.language, 'language must be string');
    });
    
    this.case("[OS] getter.", function() {
        assert.isString(System.OS, 'OS must be string');
    });
    
    this.case("[OSVersion] getter.", function() {
        assert.isString(System.OSVersion, 'OSVersion must be string');
    });
    
    this.case("[isBatteryCharged] getter.", function() {
        assert.isBoolean(System.isBatteryCharged, 'isBatteryCharged must be boolean');
    });
    
    this.case("[batteryLevel] getter.", function() {
        assert.isNumber(System.batteryLevel, 'batteryLevel must be number');
    });
    
    this.case("[clipboard] getter/setter.", function() {
        assert.doesNotThrow(function(){System.clipboard = 'smartface'}, Error);
        assert.equal(System.clipboard, 'smartface', 'clipboard must be "smartface"');
    });
    
    this.case("[vibrate] function.", function() {
        assert.doesNotThrow(function(){System.vibrate()}, Error);
    });
    
    this.case("[fingerPrintAvailable] getter.", function() {
        assert.isBoolean(System.fingerPrintAvailable, 'fingerPrintAvailable must be boolean');
    });
    
    this.case("[validateFingerPrint] getter.", function() {
        assert.doesNotThrow(function(){System.validateFingerPrint()}, Error);
    });
    
    this.case("[apiLevel] getter.", function() {
        assert.isNumber(System.android.apiLevel, 'apiLevel must be number');
    });
    
    this.case("[menuKeyAvaliable] getter.", function() {
        assert.isBoolean(System.android.menuKeyAvaliable, 'menuKeyAvaliable must be boolean');
    });
    
    this.case("[isApplicationInstalled] getter.", function() {
        assert.isBoolean(System.android.isApplicationInstalled('io.smartface.SmartfaceApp'), 'isApplicationInstalled must be boolean');
    });
    
});