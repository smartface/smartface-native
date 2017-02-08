const File = require('nf-core/io/file');

const Image = {}

Image.createFromFile = function(path) { 
    var imageFile = new File({path:path});
    return new UIImage(imageFile.nativeObject.getActualPath());
}

Image.createFromName = function(name) {
    return UIImage.createName(name);
}

module.exports = Image;
