import { INativeComponent } from '../../core/inative-component';
import { NativeMobileComponent } from '../../core/native-mobile-component';
import { IContact } from '../../device/contacts/contact/contact';
import File from '../../io/file';
import { IImage } from '../../ui/image/image';
import { IPage } from '../../ui/page/page';
import Invocation from '../../util/iOS/invocation';
import { IShare } from './share';
const UIActivityViewController = SF.requireClass('UIActivityViewController');

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

export class ShareIOSClass extends NativeMobileComponent implements IShare {
  constructor(params?: any) {
    super(params);
    this.addIOSProps(this.getIOSProps());
  }
  protected createNativeObject(params?: Partial<Record<string, any>>) {
    return null;
  }
  shareText(text: string, page: IPage, blacklist: string[]) {
    const activity = this.createActivity([text]) as __SF_NSOBject;
    activity.excludedActivityTypes = blacklist;
    this.ios__presentViewController(page, activity);
  }
  shareImage(image: IImage, page: IPage, blacklist: any[]) {
    const activity = this.createActivity([image.nativeObject]);
    activity.excludedActivityTypes = blacklist;
    this.ios__presentViewController(page, activity);
  }
  shareContacts(object: { items: IContact[]; fileName?: string; page: IPage; blacklist: string[] }) {
    const items = object.items;
    const page = object.page;
    const blacklist = object.blacklist;
    const fileName = object.fileName ? object.fileName + '.vcf' : 'Contacts.vcf';
    const _itemsNativeObject: __SF_CNMutableContact[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      _itemsNativeObject.push(item.nativeObject as any);
    }

    const path = __SF_CNMutableContact.getShareableFilePathWithContactArrayFileName(_itemsNativeObject, fileName);
    const activity = this.createActivity([path]) as __SF_NSOBject;
    activity.excludedActivityTypes = blacklist;
    this.ios__presentViewController(page, activity);
  }

  shareFile(file: File, page: IPage, blacklist: string[]) {
    const actualPath = file.nativeObject.getActualPath();
    const url = __SF_NSURL.fileURLWithPath(actualPath);
    const activity = this.createActivity([url]) as __SF_NSOBject;
    activity.excludedActivityTypes = blacklist;
    this.ios__presentViewController(page, activity);
  }
  share(object: { items: INativeComponent[]; page: IPage; blacklist: string[] }) {
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

    const activity = this.createActivity(_itemsNativeObject) as __SF_NSOBject;
    activity.excludedActivityTypes = blacklist;
    this.ios__presentViewController(page, activity);
  }
  private getIOSProps() {
    return {
      Facebook: UIActivityType.postToFacebook,
      Twitter: UIActivityType.postToTwitter,
      Flickr: UIActivityType.postToFlickr,
      Message: UIActivityType.message,
      Mail: UIActivityType.mail,
      Vimeo: UIActivityType.postToVimeo
    };
  }

  private ios__presentViewController(page: INativeComponent, activity) {
    __SF_Dispatch.mainAsync(() => {
      page.nativeObject.presentViewController(activity);
    });
  }
  private createActivity(activityItems: any[]) {
    const alloc = UIActivityViewController.alloc();
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
}

const ShareIOS = new ShareIOSClass();
export default ShareIOS;
