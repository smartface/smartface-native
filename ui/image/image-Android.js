const NativeBitmapFactory  = requireClass("android.graphics.BitmapFactory");
const NativeBitmapDrawable = requireClass("android.graphics.drawable.BitmapDrawable");

const TypeUtil = require("sf-core/util/type");

function Image () {}

Image.createFromFile = function(path) {
    var image = new Image();

    if (TypeUtil.isString(path)) {
        var androidResources = Android.getActivity().getResources();
        var bitmap = NativeBitmapFactory.decodeFile(path);
        image.nativeObject = new NativeBitmapDrawable(androidResources, bitmap);
    }

    return image;
};

module.exports = Image;