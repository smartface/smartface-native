var expect  = require("chai").expect;
var assert  = require("chai").assert;

const Font = require("../../ui/font");

salep.test("sf-core/ui/font Unit Test", function() {
    
    this.case("[create] function.", function() {
        var result;
        assert.doesNotThrow(function(){ result = Font.create(Font.DEFAULT, 17, Font.NORMAL); }, Error);
        assert.isNotNull(result, "create() must be NOT be null");
    });
    
    this.case("[createFromFile] function.", function() {
        var result;
        assert.doesNotThrow(function(){ result = Font.createFromFile("assets://nonExistsFont.ttf", 17); }, Error);
        assert.isNotNull(result, "createFromFile() must be NOT be null");
    });
});