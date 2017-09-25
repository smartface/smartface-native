var expect = require("chai").expect;
var assert = require("chai").assert;

const Timer = require("../../timer");

salep.test("sf-core/global/timer Unit Test", function() {
    var myTimeout, myInterval; 
    
    this.case("[setTimeout] function.", function() {
        assert.doesNotThrow(function(){ myTimeout = Timer.setTimeout({
                task: function(){
                    console.log("Timer tick");
                },
                delay: 3000 
            }); 
        }, Error);
    });
    
    this.case("[setInterval] function.", function() {
        assert.doesNotThrow(function(){ myInterval = Timer.setInterval({
                task: function(){
                    console.log("Timer tick");
                },
                delay: 3000 
            }); 
        }, Error);
    });
    
    this.case("[clearTimer] function.", function() {
        assert.doesNotThrow(function(){ Timer.clearTimer(myTimeout); }, Error);
        assert.doesNotThrow(function(){ Timer.clearTimer(myInterval); }, Error);
    });
    
    this.case("[clearAllTimer] function.", function() {
        assert.doesNotThrow(function(){ Timer.clearAllTimer(); }, Error);
    });
});