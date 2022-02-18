import AndroidConverter from './unitconverter';
import AndroidConfig from './androidconfig';
import TypeValue from './typevalue';

const NativeTextView = requireClass('android.widget.TextView');
const NativeView = requireClass('android.view.View');

export function calculateStringSize(params: any) {
  const text = params.text;
  const maxWidth = params.maxWidth;
  const textSize = params.textSize;
  const typeface = params.typeface?.nativeObject;

  let nativeTextView: any;
  if (typeof text !== 'object') {
    nativeTextView = new NativeTextView(AndroidConfig.activity);
    typeface && nativeTextView.setTypeface(typeface);
    nativeTextView.setText(text, NativeTextView.BufferType.SPANNABLE);
    textSize !== undefined && nativeTextView.setTextSize(TypeValue.COMPLEX_UNIT_DIP, textSize); //setTextSize's unit is SP by default
  } else {
    nativeTextView = text.nativeObject;
  }

  const widthMeasureSpec = NativeView.MeasureSpec.makeMeasureSpec(AndroidConverter.dpToPixel(maxWidth), NativeView.MeasureSpec.AT_MOST);
  const heightMeasureSpec = NativeView.MeasureSpec.makeMeasureSpec(0, NativeView.MeasureSpec.UNSPECIFIED);
  nativeTextView.measure(widthMeasureSpec, heightMeasureSpec);
  return {
    height: AndroidConverter.pixelToDp(nativeTextView.getMeasuredHeight()),
    width: AndroidConverter.pixelToDp(nativeTextView.getMeasuredWidth())
  };
}
