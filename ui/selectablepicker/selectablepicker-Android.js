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
    var _enableMultiplePick = false;
    var _cancelable = true;
    var _checkedItem = -1;
    var _checkedItems = [];
    var _backgroundColor;
    var _selectedItems = [];
    var _onSelectedItems;
    
    Object.defineProperties(this, {
        'items': {
            get: function() {
                return _items;
            },
            set: function(items) {
                if(TypeUtil.isArray(items))
                    _items = items;
            },
            enumerable: true
        },
        'enableMultiplePick': {
            get: function() {
                return _enableMultiplePick;
            },
            set: function(enableMultiplePick) {
                if(TypeUtil.isBoolean(enableMultiplePick))
                    _enableMultiplePick = enableMultiplePick;
            },
            enumerable: true
        },
        'cancelable': {
            get: function() {
                return _cancelable;
            },
            set: function(cancelable) {
                if(TypeUtil.isBoolean(cancelable))
                    _cancelable = cancelable;
            },
            enumerable: true
        },
        'checkedItems': {
            get: function() {
                if(_enableMultiplePick) return _checkedItems;
                else return _checkedItem;
            },
            set: function(checkedItems) {
                if(_enableMultiplePick && TypeUtil.isArray(checkedItems)){
                    _checkedItems = checkedItems;
                }else if(TypeUtil.isNumeric(checkedItems) && (checkedItems > -1)){
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
                if(color instanceof Color)
                    _backgroundColor = color;
            },
            enumerable: true
        },
        'onSelectedItems': {
            get: function() {
                return _onSelectedItems;
            },
            set: function(onSelectedItems) {
                if(TypeUtil.isFunction(onSelectedItems))
                    _onSelectedItems = onSelectedItems;
            },
            enumerable: true
        },
        'show': {
            value: function(done, cancel) {
                var doneButtonListener = NativeDialogInterface.OnClickListener.implement({
                    onClick: function(dialogInterface, i) {
                        if(_enableMultiplePick) done && done({ items : _selectedItems });
                        else done && done({ items : _selectedItems[0] });
                    }
                });
                
                var cancelButtonListener = NativeDialogInterface.OnClickListener.implement({
                    onClick: function(dialogInterface, i) {
                        cancel && cancel();
                    }
                });

                var choosingItemListener;
                if(_enableMultiplePick){
                    choosingItemListener = NativeDialogInterface.OnMultiChoiceClickListener.implement({
                        onClick: function(dialogInterface, i, b) {
                            _onSelectedItems && _onSelectedItems(i,b);
                            if(b){
                                _selectedItems.push(i);
                            }else{
                                if(_selectedItems.indexOf(i) > -1)
                                    _selectedItems.splice(_selectedItems.indexOf(i), 1);
                            }
                        }
                    });
                }else{
                    choosingItemListener = NativeDialogInterface.OnClickListener.implement({
                        onClick: function(dialogInterface, i) {
                            _onSelectedItems && _onSelectedItems(i,true);
                            _selectedItems[0] = i;
                        }
                    });
                }
                
                self.nativeObject.setPositiveButton(self.doneButtonText, doneButtonListener);
                self.nativeObject.setNegativeButton(self.cancelButtonText, cancelButtonListener);
                
                if(_enableMultiplePick){
                    if(_checkedItems.length === 0){
                        for(var i = 0;i<_items.length;++i){
                            _checkedItems[i] = false;
                        }
                    }
                    self.nativeObject.setMultiChoiceItems(array(_items,"java.lang.String"), array(_checkedItems, "boolean"), choosingItemListener);
                } else { 
                    self.nativeObject.setSingleChoiceItems(array(_items,"java.lang.String"), _checkedItem, choosingItemListener);
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