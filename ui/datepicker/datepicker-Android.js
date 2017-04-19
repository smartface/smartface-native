const TypeUtil = require('sf-core/util/type');

function DatePicker(params) {
    var activity = Android.getActivity();

    const NativeDatePickerDialog = requireClass('android.app.DatePickerDialog');
    var today = new Date();
    
    if(!this.nativeObject){
        this.nativeObject = new NativeDatePickerDialog(activity, NativeDatePickerDialog.OnDateSetListener.implement({
            onDateSet: function(datePicker, year, month, day) {
                _onDateSelected && _onDateSelected(new Date(year, month, day));
            }
        }), today.getFullYear(), today.getMonth(), today.getDate());
    }
    
    var _onDateSelected;
    Object.defineProperties(this, {
        'onDateSelected': {
            get: function(){
                return _onDateSelected;
            },
            set: function(callback){
                if(TypeUtil.isFunction(callback)){
                    _onDateSelected = callback;
                }
            },
            enumerable: true
        },
        'show': {
            value: function() {
                this.nativeObject.show();
            }
        },
        'setMinDate': {
            value: function(date) {
                if (date && TypeUtil.isNumeric(date.getFullYear()) && TypeUtil.isNumeric(date.getMonth()) && TypeUtil.isNumeric(date.getDate())) {
                    var milliTime = date.getTime();

                    var nativeDatePicker = this.nativeObject.getDatePicker();
                    nativeDatePicker.setMinDate(milliTime);
                }
            }
        },
        'setMaxDate': {
            value: function(date) {
                if (date && TypeUtil.isNumeric(date.getFullYear()) && TypeUtil.isNumeric(date.getMonth()) && TypeUtil.isNumeric(date.getDate())) {
                    var milliTime = date.getTime();

                    var nativeDatePicker = this.nativeObject.getDatePicker();
                    nativeDatePicker.setMaxDate(milliTime);
                }
            }
        },
        'setDate': {
            value: function(date) {
                if (date && TypeUtil.isNumeric(date.getFullYear()) && TypeUtil.isNumeric(date.getMonth()) && TypeUtil.isNumeric(date.getDate())) {
                    this.nativeObject.updateDate(date.getFullYear(), date.getMonth(), date.getDate());
                }
            }
        },
        'toString': {
            value: function(){
                return 'DatePicker';
            },
            enumerable: true, 
            configurable: true
        }
    });
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

module.exports = DatePicker;