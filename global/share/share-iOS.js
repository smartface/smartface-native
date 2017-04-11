const Share = {};

const UIActivityType = {
    addToReadingList : "com.apple.UIKit.activity.AddToReadingList",
    airDrop : "com.apple.UIKit.activity.AirDrop",
    assignToContact : "com.apple.UIKit.activity.AssignToContact",
    copyToPasteboard : "com.apple.UIKit.activity.CopyToPasteboard",
    mail : "com.apple.UIKit.activity.Mail",
    message : "com.apple.UIKit.activity.Message",
    openInIBooks : "com.apple.UIKit.activity.OpenInIBooks",
    postToFacebook : "com.apple.UIKit.activity.PostToFacebook",
    postToFlickr : "com.apple.UIKit.activity.PostToFlickr",
    postToTencentWeibo : "com.apple.UIKit.activity.TencentWeibo",
    postToTwitter : "com.apple.UIKit.activity.PostToTwitter",
    postToVimeo : "com.apple.UIKit.activity.PostToVimeo",
    postToWeibo : "com.apple.UIKit.activity.PostToWeibo",
    print : "com.apple.UIKit.activity.Print",
    saveToCameraRoll : "com.apple.UIKit.activity.SaveToCameraRoll"
}
          
Object.defineProperties(Share, {
    'shareText': {
        value: function(text, page, blacklist) {
            var activity = new __SF_UIActivityViewController([text],undefined);
            activity.excludedActivityTypes = blacklist;
            page.nativeObject.presentViewController(activity);
        }
    },
    'shareImage': {
        value: function(image, page, blacklist) {
            var activity = new __SF_UIActivityViewController([image.nativeObject],undefined);
            activity.excludedActivityTypes = blacklist;
            page.nativeObject.presentViewController(activity);
        }
    },
    'shareFile': {
        value: function(file, page ,blacklist) {
            var actualPath = file.nativeObject.getActualPath();
            var url = __SF_NSURL.fileURLWithPath(actualPath);
            var activity = new __SF_UIActivityViewController([url],undefined);
            activity.excludedActivityTypes = blacklist;
            page.nativeObject.presentViewController(activity);
        }
    },
});

Share.ios = {};

Share.ios.Facebook = UIActivityType.postToFacebook;

Share.ios.Twitter = UIActivityType.postToTwitter;

Share.ios.Flickr = UIActivityType.postToFlickr;

Share.ios.Message = UIActivityType.message;

Share.ios.Mail = UIActivityType.mail;

Share.ios.Vimeo = UIActivityType.postToVimeo;

module.exports = Share;