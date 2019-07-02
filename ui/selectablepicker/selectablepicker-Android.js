/*globals requireClass*/
const TypeUtil = require('../../util/type');
const Color = require("sf-core/ui/color");
const AndroidConfig = require("../../util/Android/androidconfig");

const NativeAlertDialog = requireClass("android.app.AlertDialog");
const NativeDialogInterface = requireClass("android.content.DialogInterface");

const ParentPicker = require("./parentPicker");

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
                if (TypeUtil.isBoolean(multiSelectEnabled) &&
                    !('choosingItemListenerMulti' in _listeners) &&
                    !('choosingItemListenerSingle' in _listeners))
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
            value: function(done, cancel) {

                var checkedItemsBoolean = [];
                for (let i = 0; i < _items.length; ++i)
                    checkedItemsBoolean[i] = false;

                var doneButtonListener;
                if('doneButtonListener' in _listeners){
                    doneButtonListener = _listeners['doneButtonListener'];
                }else{
                    doneButtonListener = NativeDialogInterface.OnClickListener.implement({
                        onClick: function(dialogInterface, i) {
                            if (_multiSelectEnabled) done && done({
                                items: _selectedItems
                            });
                            else done && done({
                                items: _selectedItems[0]
                            });
                        }
                    });
                    _listeners['doneButtonListener'] = doneButtonListener;
                }
                
                var cancelButtonListener;
                if('cancelButtonListener' in _listeners){
                    cancelButtonListener = _listeners['cancelButtonListener'];
                }else{
                    cancelButtonListener = NativeDialogInterface.OnClickListener.implement({
                        onClick: function(dialogInterface, i) {
                            cancel && cancel();
                        }
                    });
                    _listeners['cancelButtonListener'] = cancelButtonListener;
                }

                var choosingItemListener;
                if (_multiSelectEnabled) {
                    if('choosingItemListenerMulti' in _listeners){
                        _selectedItems = [];
                        choosingItemListener = _listeners['choosingItemListenerMulti'];
                    }else{
                        choosingItemListener = NativeDialogInterface.OnMultiChoiceClickListener.implement({
                            onClick: function(dialogInterface, i, b) {
                                _onSelected && _onSelected(i, b);
                                if (b) {
                                    _selectedItems.push(i);
                                } else {
                                    if (_selectedItems.indexOf(i) > -1)
                                        _selectedItems.splice(_selectedItems.indexOf(i), 1);
                                }
                            }
                        });
                        _listeners['choosingItemListenerMulti'] = choosingItemListener;
                    }
                } else {
                    if('choosingItemListenerSingle' in _listeners){
                        _selectedItems = [];
                        choosingItemListener = _listeners['choosingItemListenerSingle'];
                    }else{
                        choosingItemListener = NativeDialogInterface.OnClickListener.implement({
                            onClick: function(dialogInterface, i) {
                                _onSelected && _onSelected(i, true);
                                _selectedItems[0] = i;
                            }
                        });
                        _listeners['choosingItemListenerSingle'] = choosingItemListener;
                    }
                }

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

                self.nativeObject.setCustomTitle(self.createTitleView.call(self));
                self.nativeObject.setCancelable(_cancelable);

                var alertDialog = self.nativeObject.show();

                const NativeColorDrawable = requireClass("android.graphics.drawable.ColorDrawable");
                self.backgroundColor && alertDialog.getWindow().setBackgroundDrawable(new NativeColorDrawable(_backgroundColor.nativeObject));

                var negativeButton = alertDialog.getButton(NativeDialogInterface.BUTTON_NEGATIVE);
                var positiveButton = alertDialog.getButton(NativeDialogInterface.BUTTON_POSITIVE);

                self.makeCustomizeButton.call(self, negativeButton, positiveButton);
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

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }

}
module.exports = SelectablePicker;