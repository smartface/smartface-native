const extend = require('js-base/core/extend');
const View = require('sf-core/ui/view');

const Picker = extend(View)(
    function (_super, params) {
        var self = this;

        if(!self.nativeObject) {
            self.nativeObject = new __SF_UIPickerView();
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
        self.pickerDataSource.numberOfComponents = function(){
            return _component;
        };
        self.pickerDataSource.numberOfRowsInComponent = function(component){
            return _items.length;
        };
        self.nativeObject.dataSource = self.pickerDataSource;

        //////////////////////////////////////////////////////
        // UIPickerViewDelegate
        self.pickerDelegate = new __SF_UIPickerViewDelegate();
        self.pickerDelegate.titleForRow = function(e){
            return _items[e.row];
        };
        self.pickerDelegate.didSelectRow = function(e){
            _currentIndex = e.row;
            if (typeof _onSelectedCallback === "function"){
                _onSelectedCallback(e.row);
            }
        };
        self.nativeObject.delegate = self.pickerDelegate;
        
        this.ios = {};
        
        Object.defineProperty(this.ios, 'rowHeight', {
            get: function() {
                return self.nativeObject.delegate.rowHeight;
            },
            set: function(onSelected) {
                self.nativeObject.delegate.rowHeight = onSelected;
            },
            enumerable: true
        });
        
        self.show = function(ok,cancel){
              var okFunc = function(e){
                if (typeof ok === "function"){
                    ok({index : e.index});
                }
              };
              var cancelFunc = function(e){
                if (typeof cancel === "function"){
                    cancel();
                }
              };
              self.nativeObject.show(self.nativeObject,cancelFunc,okFunc);
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
