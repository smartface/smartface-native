var expect = require("chai").expect;
var assert = require("chai").assert;

const Database = require("../../data").Database;
const Path = require("../../io/path");
const File = require("../../io/file");

salep.test("sf-core/blob Unit Test", function() {
    
    var dbFile = new File({path: Path.DataDirectory +'/database.sqlite'});
    var testObject = new Database({
		file: dbFile
	});
	var createPersonTableQuery = "CREATE TABLE 'person' ( 'id' INTEGER, 'name' TEXT DEFAULT 'Smartface', 'age' INTEGER DEFAULT 5, 'isWorker' INTEGER DEFAULT 0, 'rate' REAL DEFAULT 2.5, PRIMARY KEY('id') )";
	var dropPersonTableQuery = "DROP TABLE 'person'";
    
    this.case("[file] getter.", function() {
        assert.isNotNull(testObject.file, 'file must be NOT be null');
    });
	
    this.case("[execute] function.", function() {
        assert.doesNotThrow(function(){testObject.execute(createPersonTableQuery)}, Error);
        assert.doesNotThrow(function(){testObject.execute(createRandomPersonInsert())}, Error);
        assert.doesNotThrow(function(){testObject.execute(createRandomPersonInsert())}, Error);
    });
    
    this.case("[query] function.", function() {
        assert.equal(testObject.query('SELECT * FROM person').count(), 2, 'count must be 2');
        assert.isString(testObject.query('SELECT * FROM person').getFirst().getString('name'), 'getfirst getString("name") must be string');
        assert.isNumber(testObject.query('SELECT * FROM person').getFirst().getInteger('age'), 'getfirst getInteger("age") must be integer');
    });
    
    this.case("[execute] function.", function() {
        assert.doesNotThrow(function(){testObject.execute(dropPersonTableQuery)}, Error);
    });
    
});

function createRandomPersonInsert(){
    // Gettin random char for name
    var charCode = Math.floor((Math.random() * 25) + 65);
    var name = String.fromCharCode(charCode);
    var isWorker = Math.round(Math.random());
    var age = Math.floor((Math.random() * 62) + 18);
    var rate = Math.round((Math.random() * 5 + 1) *10 )/10;
    
    // Query will be like: INSERT INTO person (name, age, isWorker, rate) VALUES ('B', 66, 1, 2.1)
    return "INSERT INTO person (name, age, isWorker, rate) VALUES ('" + name +"', " + age + ", " + isWorker + ", " + rate + ")";
}