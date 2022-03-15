import { INativeComponent } from '../../core/inative-component';
import Contacts from '../../device/contacts';
import File from '../../io/file';
import Page from '../../ui/page';
import Invocation from '../../util/iOS/invocation';
import { ShareBase } from './share';

const UIActivityType = {
  addToReadingList: 'com.apple.UIKit.activity.AddToReadingList',
  airDrop: 'com.apple.UIKit.activity.AirDrop',
  assignToContact: 'com.apple.UIKit.activity.AssignToContact',
  copyToPasteboard: 'com.apple.UIKit.activity.CopyToPasteboard',
  mail: 'com.apple.UIKit.activity.Mail',
  message: 'com.apple.UIKit.activity.Message',
  openInIBooks: 'com.apple.UIKit.activity.OpenInIBooks',
  postToFacebook: 'com.apple.UIKit.activity.PostToFacebook',
  postToFlickr: 'com.apple.UIKit.activity.PostToFlickr',
  postToTencentWeibo: 'com.apple.UIKit.activity.TencentWeibo',
  postToTwitter: 'com.apple.UIKit.activity.PostToTwitter',
  postToVimeo: 'com.apple.UIKit.activity.PostToVimeo',
  postToWeibo: 'com.apple.UIKit.activity.PostToWeibo',
  print: 'com.apple.UIKit.activity.Print',
  saveToCameraRoll: 'com.apple.UIKit.activity.SaveToCameraRoll'
};

export class ShareIOS implements ShareBase {
  static ios__presentViewController(page: INativeComponent, activity) {
    __SF_Dispatch.mainAsync(() => {
      page.nativeObject.presentViewController(activity);
    });
  }
  static createActivity(activityItems) {
    const alloc = __SF_UIActivityViewController.alloc();
    const argActivityItems = new Invocation.Argument({
      type: 'id',
      value: activityItems
    });
    const argApplicationActivities = new Invocation.Argument({
      type: 'NSObject',
      value: undefined
    });

    return Invocation.invokeInstanceMethod(alloc, 'initWithActivityItems:applicationActivities:', [argActivityItems, argApplicationActivities], 'id');
  }
  static shareText(text: INativeComponent, page: Page, blacklist: string[]) {
    //TODO: wrong usage?
    const activity = ShareIOS.createActivity([text.nativeObject]) as __SF_NSOBject;
    activity.excludedActivityTypes = blacklist;
    ShareIOS.ios__presentViewController(page, activity);
  }
  static shareImage() {}
  static shareContacts(object: { items: typeof Contacts.Contact[]; fileName?: string; page: Page; blacklist: string[] }) {
    const items = object.items;
    const page = object.page;
    const blacklist = object.blacklist;
    const fileName = object.fileName ? object.fileName + '.vcf' : 'Contacts.vcf';
    const _itemsNativeObject: __SF_CNMutableContact[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      //@ts-ignore TODO: contact need nativeObject
      _itemsNativeObject.push(item.nativeObject);
    }

    const path = __SF_CNMutableContact.getShareableFilePathWithContactArrayFileName(_itemsNativeObject, fileName);
    const activity = ShareIOS.createActivity([path]) as __SF_NSOBject;
    activity.excludedActivityTypes = blacklist;
    ShareIOS.ios__presentViewController(page, activity);
  }

  static shareFile(file: File, page: Page, blacklist: string[]) {
    //@ts-ignore TODO: file needs nativeObject
    const actualPath = file.nativeObject.getActualPath();
    const url = __SF_NSURL.fileURLWithPath(actualPath);
    const activity = ShareIOS.createActivity([url]) as __SF_NSOBject;
    activity.excludedActivityTypes = blacklist;
    ShareIOS.ios__presentViewController(page, activity);
  }
  static share(object: { items: INativeComponent[]; page: Page; blacklist: string[] }) {
    const items = object.items;
    const page = object.page;
    const blacklist = object.blacklist;

    const _itemsNativeObject: (__SF_NSURL | INativeComponent)[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item instanceof File) {
        const actualPath = item.nativeObject.getActualPath();
        const url = __SF_NSURL.fileURLWithPath(actualPath);
        _itemsNativeObject.push(url);
      } else if (item.constructor.name === 'Contacts') {
        const path = item.nativeObject.getShareableFilePath();
        _itemsNativeObject.push(path);
      } else {
        _itemsNativeObject.push(item);
      }
    }

    const activity = ShareIOS.createActivity(_itemsNativeObject) as __SF_NSOBject;
    activity.excludedActivityTypes = blacklist;
    ShareIOS.ios__presentViewController(page, activity);
  }
  static ios = {
    Facebook: UIActivityType.postToFacebook,
    Twitter: UIActivityType.postToTwitter,
    Flickr: UIActivityType.postToFlickr,
    Message: UIActivityType.message,
    Mail: UIActivityType.mail,
    Vimeo: UIActivityType.postToVimeo
  };
}

export default ShareIOS;
