import { ITextView } from './textview';
import { Size } from '../../primitive/size';
import LabelAndroid from '../label/label.android';
import TextAlignment from '../shared/textalignment';
import { TextViewEvents } from './textview-events';
import * as TextViewSizeCalculator from '../../util/Android/textviewsizecalculator';
import AndroidUnitConverter from '../../util/Android/unitconverter';

const NativeHtml = requireClass('android.text.Html');
const NativeBuild = requireClass('android.os.Build');
const NativeSpannableStringBuilder = requireClass('android.text.SpannableStringBuilder');
const NativeLineHeightSpan = requireClass('android.text.style.LineHeightSpan');
const NativeLinkMovementMethod = requireClass('android.text.method.LinkMovementMethod');
const NativeScrollingMovementMethod = requireClass('android.text.method.ScrollingMovementMethod');

const TextAlignmentDic = {
  [TextAlignment.TOPLEFT]: 48 | 3, // Gravity.TOP | Gravity.LEFT
  [TextAlignment.TOPCENTER]: 48 | 1, //Gravity.TOP | Gravity.CENTER_HORIZONTAL
  [TextAlignment.TOPRIGHT]: 48 | 5, //Gravity.TOP | Gravity.RIGHT
  [TextAlignment.MIDLEFT]: 16 | 3, // Gravity.CENTER_VERTICAL | Gravity.LEFT
  [TextAlignment.MIDCENTER]: 17, //Gravity.CENTER
  [TextAlignment.MIDRIGHT]: 16 | 5, // Gravity.CENTER_VERTICAL | Gravity.RIGHT
  [TextAlignment.BOTTOMLEFT]: 80 | 3, // Gravity.BOTTOM | Gravity.LEFT
  [TextAlignment.BOTTOMCENTER]: 80 | 1, // Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL
  [TextAlignment.BOTTOMRIGHT]: 80 | 5 // Gravity.BOTTOM | Gravity.RIGHT
};

const MAX_INT_VALUE = 2147483647;
const SPAN_EXCLUSIVE_EXCLUSIVE = 33;

export default class TextViewAndroid<TEvent extends TextViewEvents, TProps extends ITextView = ITextView> extends LabelAndroid<TEvent | TextViewEvents, any, TProps> implements ITextView {
  private _attributedStringBuilder;
  private _attributedStringArray: ITextView['attributedText'];
  private _onLinkClick: ITextView['onLinkClick'];
  private _letterSpacing = 0;
  private _lineSpacing = 0;
  private _scrollEnabled = false;
  private _htmlText: ITextView['htmlText'];
  private linkMovementMethodCreated: boolean;
  private scrollableMovementMethodCreated: boolean;
  constructor(params: Partial<TProps> = {}) {
    super(params);
  }

  get htmlText(): ITextView['htmlText'] {
    return this._htmlText || '';
  }
  set htmlText(value: ITextView['htmlText']) {
    this._htmlText = value;
    const htmlTextNative = NativeHtml.fromHtml(`${value}`);

    this.scrollEnabled = this._scrollEnabled;
    this.nativeObject.setText(htmlTextNative);
  }
  get maxLines(): ITextView['maxLines'] {
    const mMaxLines = this.nativeObject.getMaxLines();
    return mMaxLines === MAX_INT_VALUE ? 0 : mMaxLines;
  }
  set maxLines(value: ITextView['maxLines']) {
    this.nativeObject.setMaxLines(value === 0 ? MAX_INT_VALUE : value);
    // This one is added to match same behavior of multiline.
    this.scrollEnabled = this._scrollEnabled;
  }
  get selectable(): boolean {
    return this.nativeObject.isTextSelectable();
  }
  set selectable(value: boolean) {
    this.nativeObject.setTextIsSelectable(value);
  }
  get attributedText(): ITextView['attributedText'] {
    return this._attributedStringArray;
  }
  set attributedText(value: ITextView['attributedText']) {
    this._attributedStringArray = value;

    if (this._attributedStringBuilder) {
      this._attributedStringBuilder.clear();
    } else {
      this._attributedStringBuilder = new NativeSpannableStringBuilder();
    }

    //Sets the spans according to given properties
    this._attributedStringArray.forEach((attributedString: any) => {
      attributedString.textView = this;
      attributedString.setSpan(this._attributedStringBuilder);
    });

    //Sets the given line space
    this.lineSpacing = this._lineSpacing;
    this.nativeObject.setText(this._attributedStringBuilder);
    this.multiline = this.multiline;
    this.scrollEnabled = this._scrollEnabled;
    this.nativeObject.setHighlightColor(0); //TRANSPARENT COLOR
  }
  getAttributeTextSize(maxWidth: number): Size | null {
    if (!this._attributedStringBuilder) {
      return null;
    }
    return TextViewSizeCalculator.calculateStringSize({
      text: this,
      maxWidth
    });
  }
  get onLinkClick(): ITextView['onLinkClick'] {
    return this._onLinkClick;
  }
  set onLinkClick(value: ITextView['onLinkClick']) {
    this._onLinkClick = value;
  }
  get letterSpacing(): ITextView['letterSpacing'] {
    return this._letterSpacing;
  }
  set letterSpacing(value: ITextView['letterSpacing']) {
    this._letterSpacing = value;
    if (NativeBuild.VERSION.SDK_INT >= 21) {
      this.nativeObject.setLetterSpacing(value);
    }
  }
  get lineSpacing(): ITextView['lineSpacing'] {
    return this._lineSpacing;
  }
  set lineSpacing(value: ITextView['lineSpacing']) {
    this._lineSpacing = value;
    if (!this._attributedStringBuilder) {
      return;
    }
    const lineSpan = NativeLineHeightSpan.implement({
      chooseHeight: function (text, start, end, spanstartv, v, fm) {
        fm.ascent -= AndroidUnitConverter.dpToPixel(this._lineSpacing);
        fm.descent += AndroidUnitConverter.dpToPixel(this._lineSpacing);
      }
    });
    this._attributedStringBuilder.setSpan(lineSpan, 0, this._attributedStringBuilder.length(), SPAN_EXCLUSIVE_EXCLUSIVE);
  }
  get textAlignment(): ITextView['textAlignment'] {
    return this._textAlignment;
  }
  set textAlignment(value: ITextView['textAlignment']) {
    this._textAlignment = value in TextAlignmentDic ? value : (this._textAlignment = this.viewNativeDefaultTextAlignment);
    this.nativeObject.setGravity(TextAlignmentDic[this._textAlignment]);
  }
  get scrollEnabled(): ITextView['scrollEnabled'] {
    return this._scrollEnabled;
  }
  set scrollEnabled(value: ITextView['scrollEnabled']) {
    this._scrollEnabled = value;
    this.nativeObject.setGravity(TextAlignmentDic[this._textAlignment]);
    this.enableScrollable(value);
  }

  /*
ToDo: LinkMovementMethod makes the links clickable and scrollable but this case is restricted to mutually directed each other. 
To prevent, we need to customize BaseMovementMethod
*/
  private enableScrollable(scrollEnabled: boolean) {
    if (scrollEnabled) {
      if (this.htmlText.length > 0 || this.attributedText.length > 0) {
        if (this.linkMovementMethodCreated) {
          return;
        }
        this.nativeObject.setMovementMethod(NativeLinkMovementMethod.getInstance());
        this.linkMovementMethodCreated = true;
      } else {
        if (this.scrollableMovementMethodCreated) {
          return;
        }
        this.nativeObject.setMovementMethod(NativeScrollingMovementMethod.getInstance());
        this.scrollableMovementMethodCreated = true;
      }
    } else {
      this.linkMovementMethodCreated = false;
      this.scrollableMovementMethodCreated = false;
      this.nativeObject.setMovementMethod(null);
    }
  }
}
