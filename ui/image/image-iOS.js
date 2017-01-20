const Image = {}

Image.createFromFile = function(path) { 
    return new UIImage(path)
}

module.exports = Image;
