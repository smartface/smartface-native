
const View = require('../../ui/view');
const Image = require('../../ui/image');
const Color = require('../../ui/color');
const Screen = require('../../device/screen');
const KeyboardAnimationDelegate = require("../../util").KeyboardAnimationDelegate;
const Invocation = require('../../util').Invocation;
const System = require('../../device/system');

const UISearchBarStyle = {
    default: 0,
    prominent: 1,
    minimal: 2
}

const UISearchBarIcon = {
    search: 0,
    clear: 1,
    bookmark: 2,
    resultsList: 3
}

SearchView.prototype = Object.create(View.prototype);
function SearchView(params) {
    var self = this;

    if (!self.nativeObject) {
        self.nativeObject = new __SF_SMFUISearchBar();
    }

    View.apply(this);

    if (__SF_UIView.viewAppearanceSemanticContentAttribute() == 3) {
        self.nativeObject.setValueForKey(3, "semanticContentAttribute");
    } else if (__SF_UIView.viewAppearanceSemanticContentAttribute() == 4) {
        self.nativeObject.setValueForKey(4, "semanticContentAttribute");
    }

    if (parseInt(System.OSVersion) >= 11) {
        var heightAnchor = Invocation.invokeInstanceMethod(self.nativeObject, "heightAnchor", [], "NSObject");

        var argConstant = new Invocation.Argument({
            type: "CGFloat",
            value: 44
        });
        var layoutConstraint = Invocation.invokeInstanceMethod(heightAnchor, "constraintLessThanOrEqualToConstant:", [argConstant], "NSObject");

        var argIsActive = new Invocation.Argument({
            type: "BOOL",
            value: true
        });
        Invocation.invokeInstanceMethod(layoutConstraint, "setActive:", [argIsActive]);
    }

    self.textfield = self.nativeObject.valueForKey("searchField");
    self.textfield.addKeyboardObserver();

    self.keyboardanimationdelegate = new KeyboardAnimationDelegate({
        nativeObject: self.nativeObject
    });

    self.textfield.onShowKeyboard = function(e) {
        if (_isAddedHeaderBar) {
            return;
        }
        if (self.nativeObject.superview.className().indexOf("UINavigationBar") === -1) {
            self.keyboardanimationdelegate.keyboardShowAnimation(e.keyboardHeight, e);
        }
    }

    self.textfield.onHideKeyboard = function(e) {
        if (_isAddedHeaderBar) {
            return;
        }
        if (self.nativeObject.superview.className().indexOf("UINavigationBar") === -1) {
            self.keyboardanimationdelegate.keyboardHideAnimation(e);
        }
    }

    Object.defineProperty(this, 'textFieldBackgroundColor', {
        get: function() {
            return new Color({
                color: self.nativeObject.valueForKey("searchField").valueForKey("backgroundColor")
            });
        },
        set: function(color) {
            self.nativeObject.valueForKey("searchField").setValueForKey(color.nativeObject, "backgroundColor");
        },
        enumerable: true
    });
    this.textFieldBackgroundColor = Color.create(222, 222, 222);

    Object.defineProperty(this, 'font', {
        get: function() {
            return self.textfield.valueForKey("font");
        },
        set: function(value) {
            self.textfield.setValueForKey(value, "font");
        },
        enumerable: true
    });
    
    var _textAligment = 3;
    Object.defineProperty(this, 'textAlignment', {
        get: function() {
            return _textAligment;
        },
        set: function(value) {
            _textAligment = value;

            var vertical;
            if (parseInt(value / 3) === 0) {
                vertical = 1;
            } else if (parseInt(value / 3) === 1) {
                vertical = 0;
            } else {
                vertical = 2;
            }

            var horizontal;
            if (value % 3 === 0) {
                horizontal = 0;
            } else if (value % 3 === 1) {
                horizontal = 1;
            } else {
                horizontal = 2;
            }

            self.textfield.setValueForKey(vertical, "contentVerticalAlignment");
            self.textfield.setValueForKey(horizontal, "textAlignment");
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(this, 'text', {
        get: function() {
            return self.nativeObject.text;
        },
        set: function(text) {
            if (self.nativeObject.activityIndicatorTrailingConstraint) {
                var constant;
                (text === "") ? (constant = 0) : (constant = -20)
                if (constant != _constant) {
                    _constant = constant
                    var argConstant = new Invocation.Argument({
                        type: "CGFloat",
                        value: _constant
                    });
                    Invocation.invokeInstanceMethod(self.nativeObject.activityIndicatorTrailingConstraint, "setConstant:", [argConstant]);
                }
            }
            self.nativeObject.text = text;
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
            var allocNSAttributedString = Invocation.invokeClassMethod("NSAttributedString", "alloc", [], "id");

            var argString = new Invocation.Argument({
                type: "NSString",
                value: hint
            });

            var argAttributes = new Invocation.Argument({
                type: "id",
                value: {
                    "NSColor": _hintTextColor.nativeObject
                }
            });
            var nativeAttributeString = Invocation.invokeInstanceMethod(allocNSAttributedString, "initWithString:attributes:", [argString, argAttributes], "NSObject");
            self.textfield.setValueForKey(nativeAttributeString, "attributedPlaceholder");
        },
        enumerable: true
    });

    var _hintTextColor = Color.LIGHTGRAY;
    Object.defineProperty(this, 'hintTextColor', {
        get: function() {
            return _hintTextColor;
        },
        set: function(color) {
            _hintTextColor = color;
            self.hint = _hint;
        },
        enumerable: true
    });

    var _textColor = self.nativeObject.textColor;
    Object.defineProperty(this, 'textColor', {
        get: function() {
            return new Color({
                color: _textColor
            });
        },
        set: function(textColor) {
            _textColor = textColor.nativeObject;
            self.nativeObject.textColor = _textColor;
        },
        enumerable: true
    });

    var _backgroundColor = self.nativeObject.barTintColor;
    Object.defineProperty(this, 'backgroundColor', {
        get: function() {
            return new Color({
                color: _backgroundColor
            });
        },
        set: function(backgroundColor) {
            _backgroundColor = backgroundColor.nativeObject;
            self.nativeObject.barTintColor = _backgroundColor;
            if (self.borderWidth === 0) {
                self.borderColor = backgroundColor;
            }
        },
        enumerable: true
    });

    // ATTENTION: Removing this line causes the crash.
    this.backgroundColor = Color.WHITE;

    var _borderWidth = 0;
    Object.defineProperty(self, 'borderWidth', {
        get: function() {
            return _borderWidth;
        },
        set: function(value) {
            _borderWidth = value;
            // Native object's layer must be updated!
            // Yoga's borderWidth property only effects positioning of its child view.
            if (_borderWidth === 0) {
                self.nativeObject.layer.borderWidth = 1;
                self.nativeObject.yoga.borderWidth = 1;
                self.borderColor = self.backgroundColor;
            } else {
                self.nativeObject.layer.borderWidth = value;
                self.nativeObject.yoga.borderWidth = value;
            }
        },
        enumerable: true,
        configurable: true
    });

    var _backgroundImage;
    Object.defineProperty(this, 'backgroundImage', {
        get: function() {
            return _backgroundImage;
        },
        set: function(backgroundImage) {
            _backgroundImage = backgroundImage;
            self.nativeObject.setSearchFieldBackgroundImage(_backgroundImage.nativeObject, 0);
        },
        enumerable: true
    });

    var _iconImage;
    Object.defineProperty(this, 'iconImage', { //Depracted use searchIcon
        get: function() {
            return _iconImage;
        },
        set: function(iconImage) {
            _iconImage = iconImage;
            self.nativeObject.setIconImage(_iconImage.nativeObject, UISearchBarIcon.search, __SF_UIControlStateNormal);
        },
        enumerable: true
    });

    var _searchIcon;
    Object.defineProperty(this, 'searchIcon', {
        get: function() {
            return _searchIcon;
        },
        set: function(searchIcon) {
            _searchIcon = searchIcon;
            self.nativeObject.setIconImage(_searchIcon.nativeObject, UISearchBarIcon.search, __SF_UIControlStateNormal);
        },
        enumerable: true
    });

    var searchContainerView; // Workaround For iOS 13, increase height navbar issue
    var _isAddedHeaderBar = false;
    this.addToHeaderBar = function(page) {
        self.nativeObject.layer.borderWidth = 0;
        self.nativeObject.yoga.borderWidth = 0;
        _isAddedHeaderBar = true;
        if (parseInt(System.OSVersion) >= 13) { // Workaround For iOS 13, increase height navbar issue
            if (searchContainerView == undefined) {
                searchContainerView = __SF_SearchBarContainerView.createWithSearchBar(self.nativeObject);
            }
            page.nativeObject.navigationItem.titleView = searchContainerView;
        }else{
            page.nativeObject.navigationItem.titleView = self.nativeObject;
        }
        
    };

    this.removeFromHeaderBar = function(page) {
        _isAddedHeaderBar = false;
        self.removeFocus();
        if (parseInt(System.OSVersion) >= 13) {
            searchContainerView = undefined;
            self.nativeObject.removeFromSuperview();
        }
        page.nativeObject.navigationItem.titleView = undefined;
    };

    this.showKeyboard = function() {
        self.nativeObject.becomeFirstResponder();
    };

    this.hideKeyboard = function() {
        self.nativeObject.resignFirstResponder();
    };

    this.requestFocus = function() {
        self.nativeObject.becomeFirstResponder();
    };

    this.removeFocus = function() {
        self.nativeObject.resignFirstResponder();
    };

    Object.defineProperty(this.ios, 'keyboardAppearance', {
        get: function() {
            return self.nativeObject.valueForKey("keyboardAppearance");
        },
        set: function(value) {
            self.nativeObject.setValueForKey(value, "keyboardAppearance");
        },
        enumerable: true
    });
    
    self.ios.showLoading = function() {
        self.nativeObject.activityIndicator.startAnimating();
    };

    self.ios.hideLoading = function() {
        self.nativeObject.activityIndicator.stopAnimating();
    };

    Object.defineProperty(this.ios, 'loadingColor', {
        get: function() {
            return new Color({
                color: self.nativeObject.activityIndicator.color
            });
        },
        set: function(color) {
            self.nativeObject.activityIndicator.color = color.nativeObject;
        },
        enumerable: true
    });

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

    // self.textfield.setValueForKey(Color.create(0,122,255).nativeObject,"tintColor");
    Object.defineProperty(this.ios, 'cursorColor', {
        get: function() {
            return new Color({
                color: self.textfield.valueForKey("tintColor")
            });
        },
        set: function(color) {
            self.textfield.setValueForKey(color.nativeObject, "tintColor");
        },
        enumerable: true
    });

    // self.textfield.setValueForKey(Color.create(0,122,255).nativeObject,"tintColor");
    Object.defineProperty(this, 'cursorColor', {
        get: function() {
            return new Color({
                color: self.textfield.valueForKey("tintColor")
            });
        },
        set: function(color) {
            self.textfield.setValueForKey(color.nativeObject, "tintColor");
        },
        enumerable: true
    });

    Object.defineProperty(this.ios, 'cancelButtonColor', {
        get: function() {
            return new Color({
                color: self.nativeObject.valueForKey("tintColor")
            });
        },
        set: function(color) {
            self.nativeObject.setValueForKey(color.nativeObject, "tintColor");
        },
        enumerable: true
    });

    Object.defineProperty(this.ios, 'cancelButtonText', {
        get: function() {
            return self.nativeObject.valueForKey("cancelButtonText");
        },
        set: function(value) {
            self.nativeObject.setValueForKey(value, "cancelButtonText");
        },
        enumerable: true
    });

    var _showsCancelButton = false;
    Object.defineProperty(this.ios, 'showsCancelButton', {
        get: function() {
            return _showsCancelButton;
        },
        set: function(showsCancelButton) {
            _showsCancelButton = showsCancelButton;
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

    const EventFunctions = {
        [Events.CancelButtonClicked]: function() {
            _onSearchButtonClicked = function (state) {
                this.emitter.emit(Events.CancelButtonClicked, state);
            } 
        },
        [Events.SearchBegin]: function() {
            _onSearchBeginCallback = function (state) {
                this.emitter.emit(Events.SearchBegin, state);
            } 
        },
        [Events.SearchButtonClicked]: function() {
            _onSearchButtonClickedCallback = function (state) {
                this.emitter.emit(Events.SearchButtonClicked, state);
            } 
        },
        [Events.SearchEnd]: function() {
            _onSearchEndCallback = function (state) {
                this.emitter.emit(Events.SearchEnd, state);
            } 
        },
        [Events.TextChanged]: function() {
            _onTextChangedCallback = function (state) {
                this.emitter.emit(Events.TextChanged, state);
            } 
        }
    }
    
    const parentOnFunction = this.on;
    Object.defineProperty(this, 'on', {
        value: (event, callback) => {
            if (typeof EventFunctions[event] === 'function') {
                EventFunctions[event].call(this);
                this.emitter.on(event, callback);
            }
            else {
                parentOnFunction(event, callback);
            }
        },
        configurable: true
    });

    //////////////////////////////////////////////////////
    // UISearchBarDelegate
    self.searchBarDelegate = new __SF_UISearchBarDelegate();
    self.searchBarDelegate.cancelButtonClicked = function(e) {
        if (typeof _onCancelButtonClicked === "function") {
            _onCancelButtonClicked();
        }
    };
    self.searchBarDelegate.didBeginEditing = function() {
        if (self.ios.showsCancelButton) {
            self.nativeObject.setShowsCancelButtonAnimated(true, true);
        }

        if (typeof _onSearchBegin === "function") {
            _onSearchBegin();
        }
    };
    self.searchBarDelegate.didEndEditing = function() {
        if (self.ios.showsCancelButton) {
            self.nativeObject.setShowsCancelButtonAnimated(false, true);
        }

        if (typeof _onSearchEnd === "function") {
            _onSearchEnd();
        }
    };

    var _constant = 0;
    self.searchBarDelegate.textDidChange = function(searchText) {
        if (self.nativeObject.activityIndicatorTrailingConstraint) {
            var constant;
            (searchText === "") ? (constant = 0) : (constant = -20)
            if (constant != _constant) {
                _constant = constant
                var argConstant = new Invocation.Argument({
                    type: "CGFloat",
                    value: _constant
                });
                Invocation.invokeInstanceMethod(self.nativeObject.activityIndicatorTrailingConstraint, "setConstant:", [argConstant]);
            }
        }
        if (typeof _onTextChanged === "function") {
            _onTextChanged(searchText);
        }
    };
    self.searchBarDelegate.searchButtonClicked = function() {
        if (typeof _onSearchButtonClicked === "function") {
            _onSearchButtonClicked();
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