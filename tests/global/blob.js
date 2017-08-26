var expect = require("chai").expect;
var assert = require("chai").assert;

const FileStream = require("../../io/filestream");
const File = require("../../io/file");
const Blob = require("../../blob");

salep.test("sf-core/blob Unit Test", function() {
    var myFile = new File({
        path: 'images://smartface.png'
    });
    var myFileStream = myFile.openStream(FileStream.StreamType.READ, FileStream.ContentMode.BINARY);
    var testObject = myFileStream.readToEnd();
     

    this.case("[type] getter.", function() {
        assert.equal(testObject.type, 'file', 'type must be file');
    });
    
    this.case("[parts] getter.", function() {
        assert.isArray(testObject.parts, 'parts must be array');
    });
    
    this.case("[size] getter.", function() {
        assert.isNumber(testObject.size, 'size must be number');
    });
    
    this.case("[slice] function.", function() {
        var result = testObject.slice(0, 100, "sliced file");
        assert.isNotNull(result, 'slice must NOT be null');
        assert.equal(result.type, 'sliced file', 'type must be sliced file');
        assert.isArray(result.parts, 'slice parts must be array');
        assert.equal(result.size, 100, 'slice size must be number');
    });
    
    this.case("[toBase64] function.", function() {
        assert.isString(testObject.toBase64(), 'toBase64 must be string');
    });
    
    this.case("[toString] function.", function() {
        assert.isString(testObject.toString(), 'toString must be string');
    });
    
    this.case("[createFromBase64] function.", function() {
        var result = Blob.createFromBase64(testObject.toBase64());
        assert.isNotNull(result, 'createFromBase64 must NOT be null');
        assert.equal(testObject.size, result.size, 'size must be same with source');
    });
});