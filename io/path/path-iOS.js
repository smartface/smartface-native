const File = require('sf-core/io/file');

var Path = {};

Object.defineProperties(Path, {
    'ImagesUriScheme': {
        get: function(){
            return 'images://';
        },
    },
    'AssetsUriScheme': {
        get: function(){
            return 'assets://';
        },
    },
    'Separator': {
        get: function(){
            return '/';
        },
    },
    'DataDirectory': {
        get: function(){
            return File.getDocumentsDirectory();
        },
    }
});

module.exports = Path;