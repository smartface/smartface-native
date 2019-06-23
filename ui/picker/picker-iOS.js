const extend = require('js-base/core/extend');
const View = require('sf-core/ui/view');

const Picker = extend(View)(
    function(_super, params) {
        var self = this;

        if (!self.nativeObject) {
            self.nativeObject = new __SF_UIPickerView();
        }

        _super(this);

        var _items = [];
        Object.defineProperty(this, 'items', {
            get: function() {
                return _items; // todo: Returns self.nativeObject.getDisplayValues()
            }, // after string problem is solved.
            set: function(items) {
                _items = items;
            },
            enumerable: true
        });

        var _currentIndex = 0;
        Object.defineProperty(this, 'currentIndex', {
            get: function() {
                return _currentIndex;
            },
            set: function(currentIndex) {
                _currentIndex = currentIndex;
                var defaultComponentIndex = 0; // sf-core does not support multi components.
                self.nativeObject.selectRowInComponentAnimated(_currentIndex, defaultComponentIndex, true);
            },
            enumerable: true
        });

        var _onSelectedCallback;
        Object.defineProperty(this, 'onSelected', {
            get: function() {
                return _onSelectedCallback;
            },
            set: function(onSelected) {
                _onSelectedCallback = onSelected;
            },
            enumerable: true
        });

        //////////////////////////////////////////////////////
        // UIPickerViewDataSource
        var _component = 1;
        self.pickerDataSource = new __SF_UIPickerViewDataSource();
        self.pickerDataSource.numberOfComponents = function() {
            return _component;
        };
        self.pickerDataSource.numberOfRowsInComponent = function(component) {
            return _items.length;
        };
        self.nativeObject.dataSource = self.pickerDataSource;

        //////////////////////////////////////////////////////
        // UIPickerViewDelegate
        self.pickerDelegate = new __SF_UIPickerViewDelegate();
        self.pickerDelegate.titleForRow = function(e) {
            return _items[e.row];
        };
        self.pickerDelegate.didSelectRow = function(e) {
            _currentIndex = e.row;
            if (typeof _onSelectedCallback === "function") {
                _onSelectedCallback(e.row);
            }
        };
        self.nativeObject.delegate = self.pickerDelegate;

        this.ios = {};
        this.android = {};

        Object.defineProperty(this.ios, 'rowHeight', {
            get: function() {
                return self.nativeObject.delegate.rowHeight;
            },
            set: function(onSelected) {
                self.nativeObject.delegate.rowHeight = onSelected;
            },
            enumerable: true
        });

        var _title;
        Object.defineProperty(this, 'title', {
            get: function() {
                return _title;
            },
            set: function(value) {
                _title = value;
            },
            enumerable: true
        });

        var _titleColor;
        Object.defineProperty(this, 'titleColor', {
            get: function() {
                return _titleColor;
            },
            set: function(value) {
                _titleColor = value;
            },
            enumerable: true
        });

        var _titleFont;
        Object.defineProperty(this, 'titleFont', {
            get: function() {
                return _titleFont;
            },
            set: function(value) {
                _titleFont = value;
            },
            enumerable: true
        });

        var _cancelButtonColor;
        Object.defineProperty(this, 'cancelButtonColor', {
            get: function() {
                return _cancelButtonColor;
            },
            set: function(value) {
                _cancelButtonColor = value;
            },
            enumerable: true
        });

        var _cancelButtonHighlightedColor;
        Object.defineProperty(this.ios, 'cancelButtonHighlightedColor', {
            get: function() {
                return _cancelButtonHighlightedColor;
            },
            set: function(value) {
                _cancelButtonHighlightedColor = value;
            },
            enumerable: true
        });

        var _cancelButtonFont;
        Object.defineProperty(this, 'cancelButtonFont', {
            get: function() {
                return _cancelButtonFont;
            },
            set: function(value) {
                _cancelButtonFont = value;
            },
            enumerable: true
        });

        var _doneButtonColor;
        Object.defineProperty(this, 'doneButtonColor', {
            get: function() {
                return _doneButtonColor;
            },
            set: function(value) {
                _doneButtonColor = value;
            },
            enumerable: true
        });

        var _doneButtonHighlightedColor;
        Object.defineProperty(this.ios, 'doneButtonHighlightedColor', {
            get: function() {
                return _doneButtonHighlightedColor;
            },
            set: function(value) {
                _doneButtonHighlightedColor = value;
            },
            enumerable: true
        });

        var _doneButtonFont;
        Object.defineProperty(this, 'doneButtonFont', {
            get: function() {
                return _doneButtonFont;
            },
            set: function(value) {
                _doneButtonFont = value;
            },
            enumerable: true
        });

        var _doneButtonText;
        Object.defineProperty(this, 'doneButtonText', {
            get: function() {
                return _doneButtonText;
            },
            set: function(value) {
                _doneButtonText = value;
            },
            enumerable: true
        });

        var _cancelButtonText;
        Object.defineProperty(this, 'cancelButtonText', {
            get: function() {
                return _cancelButtonText;
            },
            set: function(value) {
                _cancelButtonText = value;
            },
            enumerable: true
        });

        self.show = function(done, cancel) {
            var doneFunc = function(e) {
                if (typeof done === "function") {
                    done({
                        index: e.index
                    });
                }
            };
            var cancelFunc = function(e) {
                if (typeof cancel === "function") {
                    cancel();
                }
            };

            self.nativeObject.show(self.nativeObject,
                (self.title === undefined) ? "" : self.title,
                cancelFunc,
                doneFunc,
                self.titleColor ? self.titleColor.nativeObject : undefined,
                self.titleFont ? self.titleFont : undefined,
                self.cancelButtonColor ? self.cancelButtonColor.nativeObject : undefined,
                self.ios.cancelButtonHighlightedColor ? self.ios.cancelButtonHighlightedColor.nativeObject : undefined,
                self.cancelButtonFont ? self.cancelButtonFont : undefined,
                self.doneButtonColor ? self.doneButtonColor.nativeObject : undefined,
                self.ios.doneButtonHighlightedColor ? self.ios.doneButtonHighlightedColor.nativeObject : undefined,
                self.doneButtonFont ? self.doneButtonFont : undefined,
                self.doneButtonText ? self.doneButtonText : undefined,
                self.cancelButtonText ? self.cancelButtonText : undefined
            );
        }
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = Picker;