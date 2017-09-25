var expect = require("chai").expect;
var assert = require("chai").assert;

const FileStream = require("../../io/filestream");
const File = require("../../io/file");

salep.test("sf-core/io/filestream Unit Test", function() {
    var myFile = new File({
        path: 'images://smartface.png'
    });
    var testFileStream = null;
    
    this.beforeEach(function(){
        testFileStream = myFile.openStream(FileStream.StreamType.READ, FileStream.ContentMode.BINARY);
    });
    
    this.afterEach(function(){
        testFileStream = null;
    });

    this.case("[mode] getter.", function() {
        assert.equal(testFileStream.mode, FileStream.StreamType.READ, 'mode must be FileStream.StreamType.READ');
    });
    
    this.case("[contentMode] getter.", function() {
        assert.equal(testFileStream.mode, FileStream.ContentMode.BINARY, 'mode must be FileStream.ContentMode.BINARY');
    });
    
    this.case("[isReadable] getter.", function() {
        assert.isBoolean(testFileStream.isReadable, 'isReadable must be boolean');
        assert.isTrue(testFileStream.isReadable, 'isReadable must be true');
    });
    
    this.case("[isWritable] getter.", function() {
        assert.isBoolean(testFileStream.isWritable, 'isWritable must be boolean');
        assert.isFalse(testFileStream.isWritable, 'isWritable must be false');
    });
    
    this.case("[name] getter.", function() {
        assert.equal(testFileStream.name, "smartface", 'creationDate must be smartface');
    });
    
    this.case("[path] getter.", function() {
        assert.equal(testFileStream.path, "images://smartface.png", 'path must be images://smartface.png');
    });
    
    this.case("[readBlob] function.", function() {
        var result = testFileStream.readBlob();
        assert.isNotNull(result, 'readBlob must NOT be null');
    });
    
    this.case("[readToEnd] function.", function() {
        var result = testFileStream.readToEnd();
        assert.isNotNull(result, 'readToEnd must NOT be null');
    });
});