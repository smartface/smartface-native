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
            var activity = new UIActivityViewController([text],undefined);
            activity.excludedActivityTypes = blacklist;
            page.nativeObject.presentViewController(activity);
        }
    },
    'shareImage': {
        value: function(image, page, blacklist) {
            var activity = new UIActivityViewController([image.nativeObject],undefined);
            activity.excludedActivityTypes = blacklist;
            page.nativeObject.presentViewController(activity);
        }
    },
    'shareFile': {
        value: function(file, page ,blacklist) {
            var actualPath = file.nativeObject.getActualPath();
            var url = NSURL.fileURLWithPath(actualPath);
            var activity = new UIActivityViewController([url],undefined);
            activity.excludedActivityTypes = blacklist;
            page.nativeObject.presentViewController(activity);
        }
    },
});

Share.Facebook = UIActivityType.postToFacebook;

Share.Twitter = UIActivityType.postToTwitter;

Share.Flickr = UIActivityType.postToFlickr;

Share.Message = UIActivityType.message;

Share.Mail = UIActivityType.mail;

Share.Vimeo = UIActivityType.postToVimeo;

module.exports = Share;