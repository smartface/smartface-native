const File = require("sf-core/io/file");

function Database(params){
    
    var self = this;

    if(!self.nativeObject){
        if(params.inMemory){
            self.nativeObject = new __SF_Database(":memory:");
        }
        else{
            self.nativeObject = new __SF_Database(params.file.nativeObject.getActualPath());
        }
    }
            
    if(self.nativeObject === null){
        throw new Error("Create or Read Database failed. Invalid file.");
    }
    
    self.nativeObject.errorHandler = function(e){
        throw new Error(e.message);
    }
    
    self.file = params.file;
    
    self.close = function(){};
    
    self.execute = function(sqlCommand){
        if(typeof sqlCommand === 'string'){
            self.nativeObject.run(sqlCommand);
        }
    };

    self.query = function(sqlCommand){
        if(typeof sqlCommand === 'string'){
            return new Database.QueryResult({
                        'data': self.nativeObject.prepare(sqlCommand)
                    });
        }
    };
}


Database.QueryResult = function(params){
    
    var self = this;
    
    self.data = params.data;

    self.count = function(){
        if (self.data.dataArray){
            return self.data.dataArray.length;
        }else{
            return null;
        }
    };
    
    self.getFirst = function(){
        if (self.data.dataArray){
            return new Database.DatabaseObject({
                'data': self.data.dataArray[0],
                'columNames' : self.data.columnNames
            });
        }
        return null;
    };
    
    self.getLast = function(){
        if (self.data.dataArray){
            return new Database.DatabaseObject({
                'data': self.data.dataArray[self.count()-1],
                'columNames' : self.data.columnNames
            });
        }
        return null;
    };
    
    self.get = function(location){
        if (self.data.dataArray){
            return new Database.DatabaseObject({
                'data': self.data.dataArray[location],
                'columNames' : self.data.columnNames
            });
        }
        return null;
    };
};

Database.DatabaseObject = function(params){
    var self = this;
    
    self.data = params.data;
    self.columNames = params.columNames;
    
    self.getString = function(columnName){
        return self.getData(columnName);
    };
    
    self.getInteger = function(columnName){
        return self.getData(columnName);
    };

    self.getBoolean = function(columnName){
        return self.getData(columnName);
    };
    
    self.getFloat = function(columnName){
        return self.getData(columnName);
    };
    
    self.getData = function(columnName){
        if(typeof columnName === 'string'){
            var index = self.columNames.indexOf(columnName);
            if (index != -1 && self.data && self.data.length > 0){
                return self.data[index];
            }
            return null;
        }else{
            throw new Error("Parameter mismatch. Parameter must be String");
        }
    };
};

module.exports = Database;