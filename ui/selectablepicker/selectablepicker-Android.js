/*globals requireClass*/
const TypeUtil = require('../../util/type');
const Color = require("../../ui/color");
const AndroidConfig = require("../../util/Android/androidconfig");

const NativeAlertDialog = requireClass("android.app.AlertDialog");
const NativeDialogInterface = requireClass("android.content.DialogInterface");

const ParentPicker = require("../../ui/picker/parentPicker");

function SelectablePicker(params) {
    var self = this;
    var activity = AndroidConfig.activity;

    if (!self.nativeObject) {
        self.nativeObject = new NativeAlertDialog.Builder(activity);
    }

    ParentPicker(self);

    var _items = [];
    var _multiSelectEnabled = false;
    var _cancelable = true;
    var _checkedItem = -1;
    var _checkedItems = [];
    var _backgroundColor;
    var _selectedItems = [];
    var _onSelected;
    var _listeners = {};
    var _isShowed = false;
    var _doneButtonText = "Ok";
    var _doneButtonFont, _doneButtonColor;
    var _cancelButtonText = "Cancel";
    var _cancelButtonFont, _cancelButtonColor;

    Object.defineProperties(this, {
        'items': {
            get: function() {
                return _items;
            },
            set: function(items) {
                if (TypeUtil.isArray(items))
                    _items = items;
            },
            enumerable: true
        },
        'multiSelectEnabled': {
            get: function() {
                return _multiSelectEnabled;
            },
            set: function(multiSelectEnabled) {
                if (TypeUtil.isBoolean(multiSelectEnabled) && !_isShowed)
                    _multiSelectEnabled = multiSelectEnabled;
            },
            enumerable: true
        },
        'cancelable': {
            get: function() {
                return _cancelable;
            },
            set: function(cancelable) {
                if (TypeUtil.isBoolean(cancelable))
                    _cancelable = cancelable;
            },
            enumerable: true
        },
        'checkedItems': {
            get: function() {
                if (_multiSelectEnabled) return _checkedItems;
                else return _checkedItem;
            },
            set: function(checkedItems) {
                if (_multiSelectEnabled && TypeUtil.isArray(checkedItems)) {
                    _checkedItems = checkedItems;
                } else if (TypeUtil.isNumeric(checkedItems) && (checkedItems > -1)) {
                    _checkedItem = checkedItems;
                }
            },
            enumerable: true
        },
        'backgroundColor': {
            get: function() {
                return _backgroundColor;
            },
            set: function(color) {
                if (color instanceof Color)
                    _backgroundColor = color;
            },
            enumerable: true
        },
        'onSelected': {
            get: function() {
                return _onSelected;
            },
            set: function(onSelected) {
                if (TypeUtil.isFunction(onSelected))
                    _onSelected = onSelected;
            },
            enumerable: true
        },
        'show': {
            value: function(doneCallback, cancelCallback) {
                var checkedItemsBoolean = Array(_items.length).fill(false);
                var doneButtonListener = createDoneButtonListener(doneCallback);
                var cancelButtonListener = createCancelButtonListener(cancelCallback);
                var choosingItemListener = _multiSelectEnabled ? createMultiSelectListener() : createSingleSelectListener();

                _selectedItems = [];
                _isShowed = true;
                self.nativeObject.setPositiveButton(self.doneButtonText, doneButtonListener);
                self.nativeObject.setNegativeButton(self.cancelButtonText, cancelButtonListener);

                if (_multiSelectEnabled) {
                    for (let i = 0; i < _checkedItems.length; ++i) {
                        if (_checkedItems[i] > -1) {
                            checkedItemsBoolean[_checkedItems[i]] = true;
                            _selectedItems.push(_checkedItems[i]);
                        }
                    }

                    self.nativeObject.setMultiChoiceItems(array(_items, "java.lang.String"), array(checkedItemsBoolean, "boolean"), choosingItemListener);
                } else {
                    if (_checkedItem > -1)
                        _selectedItems[0] = _checkedItem;
                    self.nativeObject.setSingleChoiceItems(array(_items, "java.lang.String"), _checkedItem, choosingItemListener);
                }

                self.title && self.nativeObject.setCustomTitle(self.__createTitleView());
                self.nativeObject.setCancelable(_cancelable);

                var alertDialog = self.nativeObject.show();
                customizeDialog(alertDialog);
            },
            enumerable: true
        },
        'cancelButtonColor': {
            get: function() {
                return _cancelButtonColor;
            },
            set: function(color) {
                if (color instanceof Color)
                    _cancelButtonColor = color;
            },
            enumerable: true
        },
        'cancelButtonFont': {
            get: function() {
                return _cancelButtonFont;
            },
            set: function(font) {
                const Font = require('../../ui/font');
                if (font instanceof Font)
                    _cancelButtonFont = font;
            },
            enumerable: true
        },
        'cancelButtonText': {
            get: function() {
                return _cancelButtonText;
            },
            set: function(text) {
                if (TypeUtil.isString(text))
                    _cancelButtonText = text;
            },
            enumerable: true
        },
        'doneButtonColor': {
            get: function() {
                return _doneButtonColor;
            },
            set: function(color) {
                if (color instanceof Color)
                    _doneButtonColor = color;
            },
            enumerable: true
        },
        'doneButtonText': {
            get: function() {
                return _doneButtonText;
            },
            set: function(text) {
                if (TypeUtil.isString(text))
                    _doneButtonText = text;
            },
            enumerable: true
        },
        'doneButtonFont': {
            get: function() {
                return _doneButtonFont;
            },
            set: function(font) {
                const Font = require('../../ui/font');
                if (font instanceof Font)
                    _doneButtonFont = font;
            },
            enumerable: true
        },
        'toString': {
            value: function() {
                return 'SelectablePicker';
            },
            enumerable: true,
            configurable: true
        }
    });


    self.__makeCustomizeButton = function(negativeButton, positiveButton) {
        self.cancelButtonText && negativeButton.setText(self.cancelButtonText);
        self.doneButtonText && positiveButton.setText(self.doneButtonText);
        self.cancelButtonColor && negativeButton.setTextColor(self.cancelButtonColor.nativeObject);
        self.doneButtonColor && positiveButton.setTextColor(self.doneButtonColor.nativeObject);
        self.cancelButtonFont && negativeButton.setTypeface(self.cancelButtonFont.nativeObject);
        self.doneButtonFont && positiveButton.setTypeface(self.doneButtonFont.nativeObject);
    };

    function customizeDialog(alertDialog) {
        const NativeColorDrawable = requireClass("android.graphics.drawable.ColorDrawable");
        self.backgroundColor && alertDialog.getWindow().setBackgroundDrawable(new NativeColorDrawable(_backgroundColor.nativeObject));

        var negativeButton = alertDialog.getButton(NativeDialogInterface.BUTTON_NEGATIVE);
        var positiveButton = alertDialog.getButton(NativeDialogInterface.BUTTON_POSITIVE);

        self.__makeCustomizeButton(negativeButton, positiveButton);
    }

    function createCancelButtonListener(cancelCallback) {
        if (!_listeners['cancelButtonListener']) {
            _listeners['cancelButtonListener'] = NativeDialogInterface.OnClickListener.implement({
                onClick: function(dialogInterface, i) {
                    cancelCallback && cancelCallback();
                }
            });
        }
        return _listeners['cancelButtonListener'];
    }

    function createDoneButtonListener(doneCallback) {
        if (!_listeners['doneButtonListener']) {
            _listeners['doneButtonListener'] = NativeDialogInterface.OnClickListener.implement({
                onClick: function(dialogInterface, i) {
                    let items = _multiSelectEnabled ? _selectedItems : _selectedItems[0];
                    doneCallback && doneCallback({
                        items: items
                    });
                }
            });
        }
        return _listeners['doneButtonListener'];
    }

    function createSingleSelectListener() {
        if (!_listeners["singleSelectListener"]) {
            _listeners['singleSelectListener'] = NativeDialogInterface.OnClickListener.implement({
                onClick: function(dialogInterface, i) {
                    _onSelected && _onSelected(i, true);
                    _selectedItems[0] = i;
                }
            });
        }
        return _listeners["singleSelectListener"];
    }

    function createMultiSelectListener() {
        if (!_listeners["multiSelectListener"]) {
            _listeners['multiSelectListener'] = NativeDialogInterface.OnMultiChoiceClickListener.implement({
                onClick: function(dialogInterface, i, selected) {
                    _onSelected && _onSelected(i, selected);
                    if (selected) {
                        _selectedItems.push(i);
                    } else {
                        if (_selectedItems.indexOf(i) > -1)
                            _selectedItems.splice(_selectedItems.indexOf(i), 1);
                    }
                }
            });
        }
        return _listeners["multiSelectListener"];
    }

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }

}
module.exports = SelectablePicker;