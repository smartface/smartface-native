const File = require('sf-core/io/file');

var Path = {};

Path.android = {};

Object.defineProperty(Path.android, 'storages', {
    get: function(){},
    enumerable: true
});

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