

function File(params) {
    var self = this;
    
    Object.defineProperties(Path, {
        'creationDate': {
            get: function(){
                return self.nativeObject.getCreationDate();
            },
            writable: false
        },
        'exists': {
            get: function(){
                return self.nativeObject.exist();
            },
            writable: false
        },
        'extension': {
            get: function(){
                return self.nativeObject.getExtension();
            },
            writable: false
        },
        'isDirectory': {
            get: function(){
                return self.nativeObject.isDirectory();
            },
            writable: false
        },
        'isFile': {
            get: function(){
                return self.nativeObject.isFile();
            },
            writable: false
        },
        'modifiedDate': {
            get: function(){
                return self.nativeObject.getModifiedDate();
            },
            writable: false
        },
        'name': {
            get: function(){
                return self.nativeObject.getName();
            },
            writable: false
        },
        'parent': {
            get: function(){
                return self.nativeObject.getParent();
            },
            writable: false
        },
        'path': {
            get: function(){
                return self.nativeObject.getPath();
            },
            set: function(value){
                self.nativeObject = SMFFile.create(value);
            }
        },
        'size': {
            get: function(){
                return self.nativeObject.getSize();
            },
            writable: false
        },
        'writable': {
            get: function(){
                return self.nativeObject.isWritable();
            },
            writable: false
        },
    };
    
    this.copy = function(destination){
        return self.nativeObject.copy(destination);
    }
    
    this.createDirectory = function(withParents){
        return self.nativeObject.createDirectory(withParents);
    };
    
    this.createFile = function(createParents){
        return self.nativeObject.createFile(createParents);
    };
    
    this.remove = function(withChilds){
        return self.nativeObject.remove(withChilds);
    };
    
    this.getFiles = function(nameFilter, typeFilter){
        return self.nativeObject.getFiles(nameFilter, typeFilter);
    };
    
    this.move = function(destination){
        return self.nativeObject.move(destination);
    };
    
    this.rename = function(newName){
        return self.nativeObject.rename(newName);
    };
    
    this.openStream = function(mode){
        // ?????????????????????????
    };
    
 // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = File;