const AndroidConfig = require('../../util/Android/androidconfig');
/*
ToDo: This methods are deman. When Android provides this feature programmitically just remove. 
this method should be always being in consideration while updating support libraries of Android.
*/
const Reflection = function() {};

Object.defineProperties(Reflection, {
    'setCursorColor': {
        value: function(textbox, color) {
            /*
            ToDo: Keep until pragmatic solution available. Does not work for Android P and might a few devices.
            */
            try {
                const NativeTextView = requireClass("android.widget.TextView");
                const NativePorterDuff = requireClass("android.graphics.PorterDuff");

                var fCursorDrawableRes = NativeTextView.getDeclaredField("mCursorDrawableRes");
                fCursorDrawableRes.setAccessible(true);
                var mCursorDrawableRes = fCursorDrawableRes.getInt(textbox);
                var fEditor = NativeTextView.getDeclaredField("mEditor");
                fEditor.setAccessible(true);
                var editor = fEditor.get(textbox);
                var clazz = editor.getClass();
                var fCursorDrawable = clazz.getDeclaredField("mCursorDrawable");
                fCursorDrawable.setAccessible(true);
                var drawables = [];
                drawables[0] = textbox.getContext().getResources().getDrawable(mCursorDrawableRes);
                drawables[1] = textbox.getContext().getResources().getDrawable(mCursorDrawableRes);
                drawables[0].setColorFilter(color, NativePorterDuff.Mode.SRC_IN);
                drawables[1].setColorFilter(color, NativePorterDuff.Mode.SRC_IN);

                fCursorDrawable.set(editor, array(drawables, 'android.graphics.drawable.Drawable'));
            }
            catch (e) {
                const NativeLog = requireClass("android.util.Log");
                NativeLog.e("SMF", " This exception is comes from sf-core " + e.stack);
                //Ignore the exception for now.
            }
        },
        enumerable: true
    }
})

module.exports = Reflection;
