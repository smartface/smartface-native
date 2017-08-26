var expect = require("chai").expect;
var assert = require("chai").assert;

const Data = require("../../data");

salep.test("sf-core/blob Unit Test", function() {
    
    this.case("[string-variable] function.", function() {
        Data.setStringVariable("string-key","string-value");
        assert.equal(Data.getStringVariable("string-key"), 'string-value', 'string-variable must be "string-value"');
    });
    
    this.case("[boolean-variable] function.", function() {
        Data.setBooleanVariable("boolean-key", true);
        assert.equal(Data.getBooleanVariable("boolean-key"), true, 'boolean-variable must be true');
    });
    
    this.case("[int-variable] function.", function() {
        Data.setIntVariable("int-key",2017);
        assert.equal(Data.getIntVariable("int-key"), 2017, 'int-variable must be 2017');
    });
    
    this.case("[float-variable] function.", function() {
        Data.setFloatVariable("float-key",2017.2017);
        assert.equal(Data.getFloatVariable("float-key"), 2017.2017, 'float-variable must be 2017.2017');
    });
    
    this.case("[long-variable] function.", function() {
        Data.setLongVariable("long-key",20172017)
        assert.equal(Data.getLongVariable("long-key"), 20172017, 'long-variable must be 20172017');
    });
    
    this.case("[containsVariable] function.", function() {
        assert.isTrue(Data.containsVariable("string-key"), 'string-variable must exists');
        assert.isTrue(Data.containsVariable("boolean-key"), 'boolean-variable must be exists');
        assert.isTrue(Data.containsVariable("int-key"), 'int-variable must be exists');
        assert.isTrue(Data.containsVariable("float-key"), 'float-variable must be exists');
        assert.isTrue(Data.containsVariable("long-key"), 'long-variable must be exists');
        assert.isFalse(Data.containsVariable("double-key"), 'double-variable must NOT be exists');
    });
    
});