function EmailComposer(params){
    
    var self = this;
    
    self.android = {};
    self.android.addAttachmentForAndroid = function(){};
    
    var _cc;
    var _bcc;
    var _to;
    var _message;
    var _subject;
    var _attaches = [];
    Object.defineProperties(self,{
        "setCC" : {
            value : function(cc){
                _cc = cc;
            },
            enumerable : true
        },
        "setBCC" : {
            value : function(bcc){
                _bcc = bcc;
            },
            enumerable : true
        },
        "setTO" : {
            value : function(to){
                _to = to;
            },
            enumerable : true
        },
        "setMessage" : {
            value : function(message,isHtmlText){
                _message = {message:message,isHtmlText:isHtmlText};
            },
            enumerable : true
        },
        "setSubject" : {
            value : function(subject){
                _subject = subject;
            },
            enumerable : true
        },
        "show" : {
            value : function(page){
                self.nativeObject = new __SF_MFMailComposeViewController();
                if (_cc)        self.nativeObject.setCcRecipients(_cc); 
                if (_bcc)       self.nativeObject.setBccRecipients(_bcc);
                if (_to)        self.nativeObject.setToRecipients(_to);
                if (_message)   self.nativeObject.setMessageBodyIsHTML(_message.message,_message.isHtmlText ? _message.isHtmlText : false);
                if (_subject)   self.nativeObject.setSubject(_subject);
                for (var i = 0; i < _attaches.length; i++) {
                    self.nativeObject.addAttachmentDataMimeTypeFileName(_attaches[i].blob.nativeObject,_attaches[i].mimeType,_attaches[i].fileName);
                }
                self.nativeObjectDelegate = new __SF_SMFMFMailComposeViewControllerDelegate();
                self.nativeObjectDelegate.didFinishWithResult = function(e){
                    self.nativeObject.dismissViewController(function(){
                        self.onClose();
                    });
                }
                
                self.nativeObject.mailComposeDelegate = self.nativeObjectDelegate;
                page.nativeObject.presentViewController(self.nativeObject);
            },
            enumerable : true
        }
    });
    
    self.onClose = function(){};
    
    self.ios = {};
    self.ios.addAttachmentForiOS = function(blob,mimeType,fileName){
        _attaches.push({
            blob:blob,
            mimeType:mimeType,
            fileName:fileName
        });
    };
                
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