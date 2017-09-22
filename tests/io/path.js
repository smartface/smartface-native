var expect = require("chai").expect;
var assert = require("chai").assert;

const Path = require("../../io/path");

salep.test("sf-core/io/path Unit Test", function() {

    this.case("[ImagesUriScheme] getter.", function() {
        assert.equal(Path.ImagesUriScheme, "images://", 'ImagesUriScheme must be images://');
    });
    
    this.case("[AssetsUriScheme] getter.", function() {
        assert.equal(Path.AssetsUriScheme, "assets://", 'AssetsUriScheme must be assets://');
    });
    
    this.case("[Separator] getter.", function() {
        assert.equal(Path.Separator, "/", 'Separator must be /');
    });
    
    this.case("[DataDirectory] getter.", function() {
        assert.isNotNull(Path.DataDirectory, 'DataDirectory must NOT be null');
        assert.isString(Path.DataDirectory, 'DataDirectory must be string');
    });
    
});