import AttributedString from '../../ui/attributedstring';

const NativeSpannableStringBuilder = requireClass('android.text.SpannableStringBuilder');

export default class AttributedTitle {
  private _attributedTitle: AttributedString;
  constructor(private context: any) {}

  get attributedTitle(): AttributedString {
    return this._attributedTitle;
  }

  set attributedTitle(value: AttributedString) {
    if (value instanceof AttributedString) {
      this.context._attributedTitleBuilder ||= new NativeSpannableStringBuilder();
      const titleBuilder = this.context._attributedTitleBuilder;

      titleBuilder.clear();
      titleBuilder.setSpan(titleBuilder);
      this.context.__setTitle(titleBuilder);
    } else {
      this.context.__setTitle(null);
    }
  }
}
