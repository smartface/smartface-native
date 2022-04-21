import LabelIOS from '../label/label.ios';
import { ITextView } from './textview';
import Invocation from '../../util/iOS/invocation';
import { Size } from '../../primitive/size';
import { TextViewEvents } from './textview-events';
import NSLineBreakMode from '../../util/iOS/nslinebreakmode';
import Color from '../color';
import { Point2D } from '../../primitive/point2d';

enum NSUnderlineStyle {
  None = 0,
  Single = 1,
  Thick = 2,
  Double = 9
}

export default class TextViewIOS<TEvent extends TextViewEvents, TProps extends ITextView = ITextView>
  extends LabelIOS<TEvent | TextViewEvents, any, TProps>
  implements ITextView<TEvent | TextViewEvents>
{
  private _lastModifiedAttributedString: __SF_NSOBject;
  private __attributedText: ITextView['attributedText'];
  private _letterSpacing: ITextView['letterSpacing'];
  private _lineSpacing: ITextView['lineSpacing'];
  private _onLinkClick: ITextView['onLinkClick'];
  private _selectable: ITextView['selectable'];
  __createNativeObject__() {
    return new __SF_UITextView();
  }
  constructor(params: Partial<ITextView> = {}) {
    super();

    //TODO: Look at it after Cenk is done with Scrollable stuff
    // UIScrollViewInheritance.addPropertiesAndMethods.call(this);

    //Defaults
    this.nativeObject.setSelectable = false;
    this.nativeObject.setEditable = false;
    this.nativeObject.setDelaysContentTouches = true;
    this.nativeObject.textContainer.maximumNumberOfLines = 0;
    this.nativeObject.textContainer.lineBreakMode = 0;

    this.assignIOSSpecificParameters();

    this._nativeObject.didTapLinkWithURL = (e: { URL: string }) => {
      this.emit('linkClick', e.URL);
      if (typeof this.onLinkClick === 'function') {
        this.onLinkClick(e.URL);
      }
    };
  }
  getAttributeTextSize(maxWidth: number): Size | null {
    if (!this._lastModifiedAttributedString) {
      return null;
    }
    const argSize = new Invocation.Argument({
      type: 'CGSize',
      value: {
        width: maxWidth,
        height: Number.MAX_VALUE
      }
    });

    const argOptions = new Invocation.Argument({
      type: 'NSUInteger',
      value: 0o11 //(NSStringDrawingUsesLineFragmentOrigin | NSStringDrawingUsesFontLeading)
    });
    const argContext = new Invocation.Argument({
      type: 'NSObject',
      value: undefined
    });

    return Invocation.invokeInstanceMethod(this._lastModifiedAttributedString, 'boundingRectWithSize:options:context:', [argSize, argOptions, argContext], 'CGRect') as Size;
  }
  private assignIOSSpecificParameters() {
    const self = this;
    this.addIOSProps({
      get showScrollBar() {
        return self.nativeObject.showsHorizontalScrollIndicator;
      },
      set showScrollBar(value: ITextView['ios']['showScrollBar']) {
        self.nativeObject.showsHorizontalScrollIndicator = value;
        self.nativeObject.showsVerticalScrollIndicator = value;
      },
      get paginationEnabled(): boolean {
        return self.nativeObject.valueForKey('pagingEnabled');
      },
      set paginationEnabled(value: boolean) {
        self.nativeObject.setValueForKey(value, 'pagingEnabled');
      },
      get contentOffset(): Point2D {
        return {
          x: self.nativeObject.contentOffset.x + self.nativeObject.contentInsetDictionary.left,
          y: self.nativeObject.contentOffset.y + self.nativeObject.contentInsetDictionary.top
        };
      }
    });
  }
  set onLinkClick(value: ITextView['onLinkClick']) {
    this._onLinkClick = value;
  }
  get onLinkClick() {
    return this._onLinkClick;
  }
  get letterSpacing() {
    return this._letterSpacing;
  }
  set letterSpacing(value: ITextView['letterSpacing']) {
    this._letterSpacing = value;
  }
  get lineSpacing() {
    return this._lineSpacing;
  }
  set lineSpacing(value: ITextView['letterSpacing']) {
    this._lineSpacing = value;
  }
  get attributedText() {
    return this.__attributedText;
  }
  set attributedText(value: ITextView['attributedText']) {
    this.__attributedText = value;
    this.setText(value);
  }
  get selectable() {
    return this._selectable;
  }
  set selectable(value: ITextView['selectable']) {
    this._selectable = value;
    this.nativeObject.setSelectable = value;
  }
  get htmlText() {
    return this.nativeObject.htmlText;
  }
  set htmlText(value: ITextView['htmlText']) {
    this.nativeObject.htmlText = value;
  }
  get scrollEnabled(): boolean {
    return this.nativeObject.valueForKey('scrollEnabled');
  }
  set scrollEnabled(value: boolean) {
    this.nativeObject.setValueForKey(value, 'scrollEnabled');
  }
  get font(): ITextView['font'] {
    return this.nativeObject.font;
  }
  set font(value: ITextView['font']) {
    this.nativeObject.setEditable = true;
    this.nativeObject.font = value;
    this.nativeObject.setEditable = false;
    this.nativeObject.setSelectable = this.selectable;
  }
  get text(): ITextView['text'] {
    return this.nativeObject.text;
  }
  set text(value: ITextView['text']) {
    this.nativeObject.text = value;
  }
  get textAlignment(): ITextView['textAlignment'] {
    return this.nativeObject.textAlignmentNumber;
  }
  set textAlignment(value: ITextView['textAlignment']) {
    this.nativeObject.setEditable = true;
    this.nativeObject.textAlignmentNumber = value;
    this.nativeObject.setEditable = false;
    this.nativeObject.setSelectable = this.selectable;
  }
  get textColor(): ITextView['textColor'] {
    return this._textColor;
  }
  set textColor(value: ITextView['textColor']) {
    this._textColor = value;
    this.nativeObject.setEditable = true;
    if (value instanceof Color) this.nativeObject.textColor = value.nativeObject;
    this.nativeObject.setEditable = false;
    this.nativeObject.setSelectable = this.selectable;
  }
  get ellipsizeMode(): ITextView['ellipsizeMode'] {
    return NSLineBreakMode.nsLineBreakModeToEllipsizeMode(this.nativeObject.textContainer.lineBreakMode);
  }
  set ellipsizeMode(value: ITextView['ellipsizeMode']) {
    this.nativeObject.textContainer.lineBreakMode = NSLineBreakMode.ellipsizeModeToNSLineBreakMode(value);
  }
  get maxLines(): ITextView['maxLines'] {
    return this.nativeObject.textContainer.maximumNumberOfLines;
  }
  set maxLines(value: ITextView['maxLines']) {
    this.nativeObject.textContainer.maximumNumberOfLines = value;
  }

  private setText(value: ITextView['attributedText']) {
    const paragraphAlloc = Invocation.invokeClassMethod('NSMutableParagraphStyle', 'alloc', [], 'id');
    const paragraphStyle = Invocation.invokeInstanceMethod(paragraphAlloc!, 'init', [], 'NSObject') as __SF_NSOBject;
    const argLineSpacing = new Invocation.Argument({
      type: 'CGFloat',
      value: this.lineSpacing
    });
    Invocation.invokeInstanceMethod(paragraphStyle, 'setLineSpacing:', [argLineSpacing]);

    const alloc = Invocation.invokeClassMethod('NSMutableAttributedString', 'alloc', [], 'id');
    const mutableString = Invocation.invokeInstanceMethod(alloc!, 'init', [], 'NSObject') as __SF_NSOBject;

    for (const i in value) {
      const attributeString = value[i];

      const allocNSAttributedString = Invocation.invokeClassMethod('NSAttributedString', 'alloc', [], 'id');

      const argString = new Invocation.Argument({
        type: 'NSString',
        value: attributeString.string
      });

      const argAttributes = new Invocation.Argument({
        type: 'id',
        value: {
          NSColor: attributeString.foregroundColor.nativeObject,
          NSFont: attributeString.font,
          NSUnderline: attributeString.underline ? NSUnderlineStyle.Single : NSUnderlineStyle.None,
          NSStrikethrough: attributeString.strikethrough ? NSUnderlineStyle.Single : NSUnderlineStyle.None,
          NSLink: attributeString.link,
          NSBackgroundColor: attributeString.backgroundColor.nativeObject,
          NSUnderlineColor: attributeString.ios.underlineColor?.nativeObject,
          NSStrikethroughColor: attributeString.ios.strikethroughColor?.nativeObject,
          NSKern: this.letterSpacing,
          NSParagraphStyle: paragraphStyle
        }
      });
      const nativeAttributeString = Invocation.invokeInstanceMethod(allocNSAttributedString!, 'initWithString:attributes:', [argString, argAttributes], 'NSObject');

      const argAppend = new Invocation.Argument({
        type: 'NSObject',
        value: nativeAttributeString
      });
      Invocation.invokeInstanceMethod(mutableString, 'appendAttributedString:', [argAppend]);
    }

    this._lastModifiedAttributedString = mutableString;

    const argAttributeString = new Invocation.Argument({
      type: 'NSObject',
      value: mutableString
    });

    Invocation.invokeInstanceMethod(this.nativeObject, 'setAttributedText:', [argAttributeString]);
    this.textAlignment = this.textAlignment;
  }
}
