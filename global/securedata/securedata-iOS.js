function SecureData(params) {
    
    if (params.identifier && typeof params.identifier === "string") {
        var self = this;
        
        if(!self.nativeObject){
            self.nativeObject = new __SF_KeychainWrapper(params.identifier);
        }
        
        Object.defineProperty(self, 'keychainData', {
            get: function() {
                return self.nativeObject.keychainData;
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'genericPasswordQuery', {
            get: function() {
                return self.nativeObject.genericPasswordQuery;
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'identifier', {
            get: function() {
                return self.nativeObject.kKeychainItemIdentifier;
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'label', {
            get: function() {
                return self.nativeObject.attrLabel;
            },
            set: function(value) {
                if (typeof value === "string") {
                    self.nativeObject.attrLabel = value;   
                }
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'description', {
            get: function() {
                return self.nativeObject.attrDescription;
            },
            set: function(value) {
                if (typeof value === "string") {
                    self.nativeObject.attrDescription = value;   
                }
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'account', {
            get: function() {
                return self.nativeObject.attrAccount;
            },
            set: function(value) {
                if (typeof value === "string") {
                    self.nativeObject.attrAccount = value;   
                }
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'service', {
            get: function() {
                return self.nativeObject.attrService;
            },
            set: function(value) {
                if (typeof value === "string") {
                    self.nativeObject.attrService = value;   
                }
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'comment', {
            get: function() {
                return self.nativeObject.attrComment;
            },
            set: function(value) {
                if (typeof value === "string") {
                    self.nativeObject.attrComment = value;   
                }
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'valueData', {
            get: function() {
                return self.nativeObject.valueData;
            },
            set: function(value) {
                if (typeof value === "string") {
                    self.nativeObject.valueData = value;   
                }
            },
            enumerable: true
        });
        
        
        ///////////////////////////////////////////////////////////////
        
        self.reset = function() {
            return self.nativeObject.resetKeychainItem();
        }
        
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
}

module.exports = SecureData;