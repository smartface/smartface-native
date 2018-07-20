function EmailComposer(params){
    
    var self = this;
    
    self.nativeObject = new __SF_MFMailComposeViewController();
    
    self.android = {};
    self.android.addAttachmentForAndroid = function(){};
    
    Object.defineProperties(self,{
        "setCC" : {
            value : function(cc){
                self.nativeObject.setCcRecipients(cc);
            },
            enumerable : true
        },
        "setBCC" : {
            value : function(bcc){
                self.nativeObject.setBccRecipients(bcc);
            },
            enumerable : true
        },
        "setTO" : {
            value : function(to){
                self.nativeObject.setToRecipients(to);
            },
            enumerable : true
        },
        "setMessage" : {
            value : function(message,isHtmlText){
                self.nativeObject.setMessageBodyIsHTML(message,isHtmlText ? isHtmlText : false);
            },
            enumerable : true
        },
        "setSubject" : {
            value : function(subject){
                self.nativeObject.setSubject(subject);
            },
            enumerable : true
        },
        "show" : {
            value : function(page){
                page.nativeObject.presentViewController(self.nativeObject);
            },
            enumerable : true
        }
    });
    
    self.onClose = function(){};
    
    self.ios = {};
    self.ios.addAttachmentForiOS = function(blob,mimeType,fileName){
        self.nativeObject.addAttachmentDataMimeTypeFileName(blob.nativeObject,mimeType,fileName);
    };
    
    self.mainViewControllerDelegate = new __SF_SMFMFMailComposeViewControllerDelegate();
    self.mainViewControllerDelegate.didFinishWithResult = function(e){
        self.nativeObject.dismissViewController(function(){
            self.onClose();
        });
    }
    
    self.nativeObject.mailComposeDelegate = self.mainViewControllerDelegate;
                
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

EmailComposer.canSendMail = function(){
    return __SF_MFMailComposeViewController.canSendMail();
};

module.exports = EmailComposer;