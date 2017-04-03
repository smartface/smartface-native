const FlexLayout = require('nf-core/ui/flexlayout');
const Color = require('nf-core/ui/color');

function Dialog(params) {

    var self = this;

    self.dialogView = new FlexLayout();
    self.dialogView.nativeObject.frame = UIScreen.mainScreen().bounds; 
    self.dialogView.backgroundColor = Color.create(150,0,0,0);
    
    
    self.calculatePosition = function(){
        self.dialogView.left = self.dialogView.nativeObject.frame.x;
        self.dialogView.top = self.dialogView.nativeObject.frame.y;
        self.dialogView.width = self.dialogView.nativeObject.frame.width;
        self.dialogView.height = self.dialogView.nativeObject.frame.height;

        self.dialogView.applyLayout();
    }

    self.dialogView.nativeObject.addObserver(function(){
                    self.dialogView.left =  UIApplication.sharedApplication().keyWindow.frame.x;
                    self.dialogView.top =  UIApplication.sharedApplication().keyWindow.frame.y;
                    self.dialogView.width =  UIApplication.sharedApplication().keyWindow.frame.width;
                    self.dialogView.height =  UIApplication.sharedApplication().keyWindow.frame.height;
                    SMFUIView.animation(0.2,0,function(){
                        self.dialogView.applyLayout();
                    },function(){
                        
                    });
                },UIDeviceOrientationDidChangeNotification);
                
    self.calculatePosition();
    
    Object.defineProperty(self, 'layout', {
        get: function() {
            return self.dialogView;
        },
        enumerable: true
    });
    
    self.hide = function (){
        SMFUIView.animation(0.2,0,function(){
            self.dialogView.alpha = 0;
        },function(){
            self.dialogView.nativeObject.removeFromSuperview();
        });
    };
    
    self.show = function (){
        UIApplication.sharedApplication().keyWindow.addSubview(self.dialogView.nativeObject);
        SMFUIView.animation(0.2,0,function(){
            self.dialogView.alpha = 1;
        },{

        });
    };
    
     if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

module.exports = Dialog;