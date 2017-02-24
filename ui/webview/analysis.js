const extend = require('js-base/core/extend');
const View = require('nf-core/ui/view');

/**
 * @class UI.WebView
 * @since 0.1
 * @extends UI.View
 *
 * 
 */
const WebView = extend(View)(
    function (_super, params) {
        var self = this;
        _super(this);

        Object.defineProperties(self, {
           /**
            *
            * @property {Boolean} openLinkInside
            * @since 0.1
            */
            'openLinkInside': {
                get: function() {},
                set: function(enabled) {}
            },
           /**
            *
            * @method refresh
            * @since 0.1
            */
            'refresh': {
                value: function() {}
            },
           /**
            *
            * @method goBack
            * @since 0.1
            */
            'goBack': {
                value: function() {}
            },
           /**
            *
            * @method goForward
            * @since 0.1
            */
            'goForward': {
                value: function() {}
            },
           /**
            *
            * @property {Boolean} zoomEnabled
            * @since 0.1
            */
            'zoomEnabled': {
                get: function() {},
                set: function(enabled) {}
            },
           /**
            *
            * @method loadURL
            * @param {String} url
            * @since 0.1
            */
            'loadURL': {
                value: function(url) {}
            },
           /**
            *
            * @method loadHTML
            * @param {String} htmlText
            * @since 0.1
            */
            'loadHTML': {
                value: function(htmlText) {}
            },
           /**
            *
            * @method evaluateJS
            * @param {String} javascript
            * @since 0.1
            */
            'evaluateJS': {
                value: function(javascript) {}
            },
           /**
            *
            * @event onChangedURL
            * @param {Function} callback
            * @since 0.1
            */
            'onChangedURL': {
                get: function() {},
                set: function(callback) {}
            },
           /**
            *
            * @event onLoad
            * @param {Function} callback
            * @since 0.1
            */
            'onLoad': {
                get: function() {},
                set: function(callback) {}
            },
           /**
            *
            * @event onError
            * @param {Function} callback
            * @since 0.1
            */
            'onError': {
                get: function() {},
                set: function(callback) {}
            },
           /**
            *
            * @event onShow
            * @param {Function} callback
            * @since 0.1
            */
            'onShow': {
                get: function() {},
                set: function(callback) {}
            }
        });

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);