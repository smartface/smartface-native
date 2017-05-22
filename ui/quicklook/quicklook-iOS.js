const File = require("sf-core/io/file");
const Color = require("sf-core/ui/color");

function QuickLook (params) {
    var self = this;
        
    if(!self.nativeObject){
        self.nativeObject = new __SF_QLPreviewController();
    }
    
    var _document = [];
    Object.defineProperty(self, 'document', {
            get:function() {
                return _document;
            },
            set:function(value) {
                _document = value;
                var uRLArray = [];
                for (var i = 0; i < value.length; i++){
                    var filePath = new File({
                        path: value[i]
                    });
                    var actualPath = filePath.nativeObject.getActualPath();
                    uRLArray.push(__SF_NSURL.fileURLWithPath(actualPath));
                }
                self.nativeObject.document = uRLArray;
            },
            enumerable: true
     });
     
     Object.defineProperty(self, 'barColor', {
            get:function() {
                return new Color({color : self.nativeObject.barColor});
            },
            set:function(value) {
                self.nativeObject.barColor = value.nativeObject;
            },
            enumerable: true
     });
     
     Object.defineProperty(self, 'itemColor', {
            get:function() {
                return new Color({color : self.nativeObject.itemColor});
            },
            set:function(value) {
                self.nativeObject.itemColor = value.nativeObject;
            },
            enumerable: true
     });
    
    self.statusBar = {};
    
    Object.defineProperty(self.statusBar, 'visible', {
        get: function() {
            return !self.nativeObject.statusBarHidden;
        },
        set: function(value) {
            self.nativeObject.statusBarHidden = !value;
            self.nativeObject.setNeedsStatusBarAppearanceUpdate();
        },
        enumerable: true
    });
    
    Object.defineProperty(self.statusBar, 'style', {
        get: function() {
            return self.nativeObject.statusBarStyle;
        },
        set: function(value) {
            self.nativeObject.statusBarStyle = value;
            self.nativeObject.setNeedsStatusBarAppearanceUpdate();
        },
        enumerable: true
    });
    
    self.show = function(Page){
        Page.nativeObject.presentViewController(self.nativeObject);
    };
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = QuickLook;