const NativeTextView = requireClass('android.widget.TextView');
const NativeTypeface = requireClass('android.util.TypedValue');
const NativeView = requireClass('android.view.View');

const AndroidConverter = require("./unitconverter");
const AndroidConfig = require("./androidconfig.js");

function SizeCalculator(context) {};
Object.defineProperty(SizeCalculator, 'calculateStringSize', {
    value: function(params) {
        let text = params.text,
            maxWidth = params.maxWidth,
            textSize = params.textSize,
            typeface = params.textSize,
            padding = params.padding;
            
        let nativeTextView;
        if (typeof text !== 'object') {
            nativeTextView = new NativeTextView(AndroidConfig.activity);
            padding && nativeTextView.setPadding(padding, 0, padding, padding);
            typeface && nativeTextView.setTypeface(typeface);
            nativeTextView.setText(text, NativeTextView.BufferType.SPANNABLE);
            textSize !== undefined && nativeTextView.setTextSize(NativeTypeface.COMPLEX_UNIT_SP, textSize); //setTextSize's unit is SP by default
        }
        else
            nativeTextView = text.nativeObject;

        let widthMeasureSpec = NativeView.MeasureSpec.makeMeasureSpec(AndroidConverter.dpToPixel(maxWidth), NativeView.MeasureSpec.AT_MOST);
        let heightMeasureSpec = NativeView.MeasureSpec.makeMeasureSpec(0, NativeView.MeasureSpec.UNSPECIFIED);
        nativeTextView.measure(widthMeasureSpec, heightMeasureSpec);
        return {
            height: AndroidConverter.pixelToDp(nativeTextView.getMeasuredHeight()),
            width: AndroidConverter.pixelToDp(nativeTextView.getMeasuredWidth())
        }
    },
    enumerable: true,
    configurable: true
});

module.exports = SizeCalculator;
