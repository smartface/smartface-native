const extend = require('js-base/core/extend');
const View = require('nf-core/ui/view');

const Picker = extend(View)(
    function (_super, params) {
        var self = this;
        
        if(!self.nativeObject) {
            self.nativeObject = new UIPickerView();
        }
        
        _super(this);
        
        var _items = [];
        Object.defineProperty(this, 'items', {
            get: function() {
                return _items;  // todo: Returns self.nativeObject.getDisplayValues()
            },                  // after string problem is solved.
            set: function(items) {
                _items = items;
            },
            enumerable: true
        });
        
        var _valueIndex;
        Object.defineProperty(this, 'valueIndex', {
            get: function() {
                return _valueIndex;
            },
            set: function(valueIndex) {
                _valueIndex = valueIndex;
                self.nativeObject.selectRowInComponentAnimated(_valueIndex, _component, true);
            },
            enumerable: true
        });
        
        // Object.defineProperty(this, 'enabled', {
        //     get: function() {
        //         return self.nativeObject.isEnabled();
        //     },
        //     set: function(enabled) {
        //         self.nativeObject.setEnabled(enabled);
        //     },
        //     enumerable: true
        // });
        
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
        var pickerDataSource = new SMFUIPickerViewDataSource();
        pickerDataSource.numberOfComponents = function(){
            return _component;
        };
        pickerDataSource.numberOfRowsInComponent = function(component){
            return _items.length;
        };
        self.nativeObject.dataSource = pickerDataSource;
        
        //////////////////////////////////////////////////////
        // UIPickerViewDelegate
        var pickerDelegate = new SMFUIPickerViewDelegate();
        pickerDelegate.titleForRow = function(e){
            return _items[e.row];
        };
        pickerDelegate.didSelectRow = function(e){
            _valueIndex = e.row;
            _onSelectedCallback(e.row);
        };
        self.nativeObject.delegate = pickerDelegate;
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = Picker;