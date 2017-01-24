const Image = {}

Image.createFromFile = function(path) { 
    return new UIImage(path);
}

Image.createFromName = function(name) { 
    return UIImage.createName(name);
}

module.exports = Image;
