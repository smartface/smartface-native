const extend = require('js-base/core/extend');
const View = require('sf-core/ui/view');
const Image = require('sf-core/ui/image');

const UISearchBarStyle = {
    default : 0,
    prominent : 1,
    minimal: 2
}

const UISearchBarIcon = {
    search : 0,
    clear : 1,
    bookmark: 2,
    resultsList: 3
}

const SearchView = extend(View)(
    function (_super, params) {
        var self = this;
        
        if(!self.nativeObject) {
            self.nativeObject = new __SF_UISearchBar();
        }
        
        _super(this);
        
        var _text = "";
        Object.defineProperty(this, 'text', {
            get: function() {
                return _text;
            },
            set: function(text) {
                _text = text;
                self.nativeObject.text = _text;
            },
            enumerable: true
        });
        
        var _hint = "";
        Object.defineProperty(this, 'hint', {
            get: function() {
                return _hint;
            },
            set: function(hint) {
                _hint = hint;
                self.nativeObject.placeholder = _hint;
            },
            enumerable: true
        });
        
        var _textColor = self.nativeObject.textColor;
        Object.defineProperty(this, 'textColor', {
            get: function() {
                return _textColor;
            },
            set: function(textColor) {
                _textColor = textColor;
                self.nativeObject.textColor = _textColor;
            },
            enumerable: true
        });
        
        var _backgroundColor = self.nativeObject.barTintColor;
        Object.defineProperty(this, 'backgroundColor', {
            get: function() {
                return _backgroundColor;
            },
            set: function(backgroundColor) {
                _backgroundColor = backgroundColor;
                self.nativeObject.barTintColor = _backgroundColor;
            },
            enumerable: true
        });
        
        var _backgroundImage;
        Object.defineProperty(this, 'backgroundImage', {
            get: function() {
                return _backgroundImage;
            },
            set: function(backgroundImage) {
                _backgroundImage = backgroundImage;
                self.nativeObject.backgroundImage = _backgroundImage.nativeObject;
            },
            enumerable: true
        });
        
        var _iconImage;
        Object.defineProperty(this, 'iconImage', {
            get: function() {
                return _iconImage;
            },
            set: function(iconImage) {
                _iconImage = iconImage;
                self.nativeObject.setIconImage(_iconImage.nativeObject, UISearchBarIcon.search, __SF_UIControlStateNormal);
            },
            enumerable: true
        });
        
        this.addToHeaderBar = function(page){
            page.nativeObject.navigationItem.titleView = self.nativeObject;
        };
        
        this.removeFromHeaderBar = function(page){
            page.nativeObject.navigationItem.titleView = undefined;
        };
        
        this.showKeyboard = function(){
            self.nativeObject.becomeFirstResponder();
        };
       
        this.hideKeyboard = function(){
            self.nativeObject.resignFirstResponder();
        };
        
        this.ios = {};
        var _searchViewStyle = UISearchBarStyle.default;
        Object.defineProperty(this.ios, 'searchViewStyle', {
            get: function() {
                return _searchViewStyle;
            },
            set: function(searchViewStyle) {
                _searchViewStyle = searchViewStyle;
                self.nativeObject.searchBarStyle = _searchViewStyle;
            },
            enumerable: true
        });
        
        var _showsCancelButton = self.nativeObject.showsCancelButton;
        Object.defineProperty(this.ios, 'showsCancelButton', {
            get: function() {
                return _showsCancelButton;
            },
            set: function(showsCancelButton) {
                _showsCancelButton = showsCancelButton;
                self.nativeObject.showsCancelButton = _showsCancelButton;
            },
            enumerable: true
        });
        
        var _onCancelButtonClicked;
        Object.defineProperty(this.ios, 'onCancelButtonClicked', {
            get: function() {
                return _onCancelButtonClicked;
            },
            set: function(onCancelButtonClicked) {
                _onCancelButtonClicked = onCancelButtonClicked;
            },
            enumerable: true
        });

        var _onSearchBegin;
        Object.defineProperty(this, 'onSearchBegin', {
            get: function() {
                return _onSearchBegin;
            },
            set: function(onSearchBegin) {
                _onSearchBegin = onSearchBegin;
            },
            enumerable: true
        });
        
        var _onSearchEnd;
        Object.defineProperty(this, 'onSearchEnd', {
            get: function() {
                return _onSearchEnd;
            },
            set: function(onSearchEnd) {
                _onSearchEnd = onSearchEnd;
            },
            enumerable: true
        });
        
        var _onTextChanged;
        Object.defineProperty(this, 'onTextChanged', {
            get: function() {
                return _onTextChanged;
            },
            set: function(onTextChanged) {
                _onTextChanged = onTextChanged;
            },
            enumerable: true
        });
        
        var _onSearchButtonClicked;
        Object.defineProperty(this, 'onSearchButtonClicked', {
            get: function() {
                return _onSearchButtonClicked;
            },
            set: function(onSearchButtonClicked) {
                _onSearchButtonClicked = onSearchButtonClicked;
            },
            enumerable: true
        });
        
        //////////////////////////////////////////////////////
        // UISearchBarDelegate
        self.searchBarDelegate = new __SF_UISearchBarDelegate();
        self.searchBarDelegate.cancelButtonClicked = function(e){
            if (typeof self._onCancelButtonClicked === "function"){
                    self._onCancelButtonClicked();
            }
        };
        self.searchBarDelegate.didBeginEditing = function(){
            if (typeof self._onSearchBegin === "function"){
                    self._onSearchBegin();
            }
        };
        self.searchBarDelegate.didEndEditing = function(){
            if (typeof self._onSearchEnd === "function"){
                    self._onSearchEnd();
            }
        };
        self.searchBarDelegate.textDidChange = function(searchText){
            if (typeof self._onTextChanged === "function"){
                    self._onTextChanged();
            }
        };
        self.searchBarDelegate.searchButtonClicked = function(){
            if (typeof self._onSearchButtonClicked === "function"){
                    self._onSearchButtonClicked();
            }
        };
        self.nativeObject.delegate = self.searchBarDelegate;
        
        // Handling android specific properties
        self.android = {};
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

SearchView.iOS = {};
SearchView.iOS.Style = {};
Object.defineProperty(SearchView.iOS.Style, 'DEFAULT', {
    get: function() {
        return UISearchBarStyle.default;
    },
});
Object.defineProperty(SearchView.iOS.Style, 'PROMINENT', {
    get: function() {
        return UISearchBarStyle.prominent;
    },
});
Object.defineProperty(SearchView.iOS.Style, 'MINIMAL', {
    get: function() {
        return UISearchBarStyle.minimal;
    },
});

module.exports = SearchView;