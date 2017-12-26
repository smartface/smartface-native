var expect = require("chai").expect;
var assert = require("chai").assert;

const Network = require("../../device/network");

salep.test("sf-core/device/network Unit Test", function() {
    
    this.case("[IMSI] getter.", function() {
        assert((Network.IMSI === undefined || (typeof Network.IMSI === "string")), 'IMSI must be string');
    });
    
    this.case("[SMSEnabled] getter.", function() {
        assert.isBoolean(Network.SMSEnabled, 'SMSEnabled must be boolean');
    });
    
    this.case("[bluetoothMacAddress] getter.", function() {
        assert.isString(Network.bluetoothMacAddress, 'bluetoothMacAddress must be string');
    });
    
    this.case("[carrier] getter.", function() {
        assert.isString(Network.carrier, 'carrier must be string');
    });
    
    this.case("[connectionType] getter.", function() {
        assert.isNumber(Network.connectionType, 'connectionType must be string');
    });
    
    this.case("[connectionIP] getter.", function() {
        assert.isString(Network.connectionIP, 'connectionIP must be string');
    });
    
    this.case("[wirelessMacAddress] getter.", function() {
        assert.isString(Network.wirelessMacAddress, 'wirelessMacAddress must be string');
    });
    this.case("[COR-1407] Network.ConnectionType.[MOBILE],[WIFI],[NONE]", function() {
       assert.equal(Network.ConnectionType.MOBILE, 1, "Network.ConnectionType.MOBILE must be equal to 1");
       assert.equal(Network.ConnectionType.WIFI, 2, "Network.ConnectionType.WIFI must be equal to 2");
       assert.equal(Network.ConnectionType.NONE, 0, "Network.ConnectionType.NONE must be equal to 0");
    });
});