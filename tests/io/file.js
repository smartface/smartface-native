var expect = require("chai").expect;
var assert = require("chai").assert;

const File = require("../../io/file");

salep.test("sf-core/io/file Unit Test", function() {
    var testFile = null;
    
    this.beforeEach(function(){
        testFile = new File({path: "images://smartface.png"});
    });
    
    this.afterEach(function(){
        testFile = null;
    });

    this.case("[creationDate] getter.", function() {
        assert.isNumber(testFile.creationDate, 'creationDate must be number');
    });
    
    this.case("[exists] getter.", function() {
        assert.isBoolean(testFile.exists, 'exists must be boolean');
        assert.isTrue(testFile.exists, 'exists must be true');
    });
    
    this.case("[extension] getter.", function() {
        assert.equal(testFile.extension, "png", 'extension must be png');
    });
    
    this.case("[isDirectory] getter.", function() {
        assert.isBoolean(testFile.isDirectory, 'isDirectory must be boolean');
        assert.isFalse(testFile.isDirectory, 'isDirectory must be false');
    });
    
    this.case("[isFile] getter.", function() {
        assert.isBoolean(testFile.isFile, 'isFile must be boolean');
        assert.isTrue(testFile.isFile, 'isFile must be false');
    });
    
    this.case("[modifiedDate] getter.", function() {
        assert.isNumber(testFile.modifiedDate, 'modifiedDate must be number');
    });
    
    this.case("[name] getter.", function() {
        assert.equal(testFile.name, "smartface", 'creationDate must be smartface');
    });
    
    this.case("[parent] getter.", function() {
        assert.isNull(testFile.parent, 'parent must be null');
    });
    
    this.case("[path] getter.", function() {
        assert.equal(testFile.path, "images://smartface.png", 'path must be images://smartface.png');
    });
    
    this.case("[size] getter.", function() {
        assert.isNumber(testFile.size, 'size must be number');
    });
    
    this.case("[writable] getter.", function() {
        assert.isBoolean(testFile.writable, 'writable must be boolean');
        assert.isFalse(testFile.writable, 'writable must be false');
    });
    
    this.case("[copy] function.", function() {
        var result = testFile.copy(require("sf-core/io/path").DataDirectory + '/myImage.png');
        assert.isBoolean(result, 'copy() must be boolean');
        assert.isTrue(result, 'copy() must be true');
    });
    
    this.case("[createFile] function.", function() {
        var result = testFile.createFile(true);
        assert.isBoolean(result, 'createFile() must be boolean');
        assert.isFalse(result, 'createFile() must be true');
    });
    
    this.case("[createDirectory] function.", function() {
        var result = testFile.createDirectory(true);
        assert.isBoolean(result, 'createDirectory() must be boolean');
        assert.isFalse(result, 'createDirectory() must be true');
    });
    
    this.case("[remove] function.", function() {
        var result = testFile.remove(true);
        assert.isBoolean(result, 'remove() must be boolean');
        assert.isFalse(result, 'remove() must be true');
    });
    
    this.case("[getFiles] function.", function() {
        var result = testFile.getFiles();
        assert.isNull(result, 'getFiles() must be null');
    });
    
    this.case("[move] function.", function() {
        var result = testFile.move();
        assert.isBoolean(result, 'move() must be boolean');
        assert.isFalse(result, 'move() must be true');
    });
    
    this.case("[rename] function.", function() {
        var result = testFile.rename("app");
        assert.isBoolean(result, 'rename() must be boolean');
        assert.isFalse(result, 'rename() must be true');
    });
});