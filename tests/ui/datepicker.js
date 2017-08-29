var expect  = require("chai").expect;
var assert  = require("chai").assert;

const DatePicker = require('../../ui/datepicker');

salep.test("sf-core/ui/datepicker Unit Test", function () {
    var testObject = null;
    
    this.beforeEach(function(){
        testObject = new DatePicker();
    });
    
    this.afterEach(function(){
        testObject = null;
    });
    
    this.case("[setDate] function.", function() {
    	assert.doesNotThrow( function(){ testObject.setDate(new Date()); }, Error);
    });
    
    this.case("[setMaxDate] function.", function() {
    	assert.doesNotThrow( function(){ testObject.setMaxDate(new Date()); }, Error);
    });
    
    this.case("[setMinDate] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.setMinDate(new Date()); }, Error);
    });
    
    this.case("[show] getter/setter.", function() {
    	assert.doesNotThrow( function(){ testObject.show(); }, Error);
    });
});