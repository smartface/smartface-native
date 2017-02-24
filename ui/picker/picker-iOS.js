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
        
        var _valueIndex = 0;
        Object.defineProperty(this, 'valueIndex', {
            get: function() {
                return _valueIndex;
            },
            set: function(valueIndex) {
                _valueIndex = valueIndex;
                var defaultComponentIndex = 0; // nf-core does not support multi components.
                self.nativeObject.selectRowInComponentAnimated(_valueIndex, defaultComponentIndex, true);
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
        self.pickerDataSource = new SMFUIPickerViewDataSource();
        self.pickerDataSource.numberOfComponents = function(){
            return _component;
        };
        self.pickerDataSource.numberOfRowsInComponent = function(component){
            return _items.length;
        };
        self.nativeObject.dataSource = self.pickerDataSource;
        
        //////////////////////////////////////////////////////
        // UIPickerViewDelegate
        self.pickerDelegate = new SMFUIPickerViewDelegate();
        self.pickerDelegate.titleForRow = function(e){
            return _items[e.row];
        };
        self.pickerDelegate.didSelectRow = function(e){
            _valueIndex = e.row;
            _onSelectedCallback(e.row);
        };
        self.nativeObject.delegate = self.pickerDelegate;
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = Picker;