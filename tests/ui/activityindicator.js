var expect  = require("chai").expect;
var assert  = require("chai").assert;

const ActivityIndicator = require('../../ui/activityindicator');
const Color = require('../../ui/color');

salep.test("sf-core/ui/activityindicator Unit Test", function () {
    var testObject = null;
    
    this.beforeEach(function(){
        testObject = new ActivityIndicator();
    });
    
    this.afterEach(function(){
        testObject = null;
    });
    
    this.case("[color] setter/getter.", function () {
        assert.doesNotThrow( function(){ testObject.color = Color.BLUE; }, Error);
        assert.equal(testObject.color, Color.BLUE, "color must be Color.BLUE");
        assert.notEqual(testObject.color, Color.RED, "color must NOT be Color.RED");
    });
});