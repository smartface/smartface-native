const extend = require('js-base/core/extend');
const View = require('nf-core/ui/view');
const Pages = require('nf-core/ui/pages');

const NativeNumberPicker = requireClass("android.widget.NumberPicker");

const Picker = extend(View)(
    function (_super, params) {
        var self = this;
        if(!self.nativeObject) {
            var page = Pages.currentPage;
            var pageNativeObject = page.nativeObject;
            var fragmentActivity = pageNativeObject.getActivity();
            self.nativeObject = new NativeNumberPicker(fragmentActivity);
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
        _super(this);
        
        var _items = [];
        Object.defineProperty(this, 'items', {
            get: function() {
                return _items;  // todo: Returns self.nativeObject.getDisplayValues()
            },                  // after string problem is solved.
            set: function(items) {
                _items = items;
                setNumberPicker();
            },
            enumerable: true
        });
        
        Object.defineProperty(this, 'valueIndex', {
            get: function() {
                return self.nativeObject.getValue();
            },
            set: function(valueIndex) {
                self.nativeObject.setValue(valueIndex);
            },
            enumerable: true
        });
        
        Object.defineProperty(this, 'enabled', {
            get: function() {
                return self.nativeObject.isEnabled();
            },
            set: function(enabled) {
                self.nativeObject.setEnabled(enabled);
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
        
        function setNumberPicker() {
            if(_items.length > 0) {
                self.nativeObject.setDisplayedValues(null);
                self.nativeObject.setMaxValue(_items.length -1);
                self.nativeObject.setMinValue(0);
                self.nativeObject.setDescendantFocusability(NativeNumberPicker.FOCUS_BLOCK_DESCENDANTS);
                self.nativeObject.setDisplayedValues(_items);
                self.nativeObject.setWrapSelectorWheel(true);
            }
        }
                
        self.nativeObject.setOnScrollListener(NativeNumberPicker.OnScrollListener.implement({
            onScrollStateChange: function(picker, scrollState) {
                _scrollState = scrollState;
                if(scrollState == NativeNumberPicker.OnScrollListener.SCROLL_STATE_IDLE) {
                    if(_onSelectedCallback) 
                        _onSelectedCallback(self.valueIndex);
                }
            }
        }));
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = Picker;