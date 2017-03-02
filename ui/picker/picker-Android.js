const extend = require('js-base/core/extend');
const View = require('nf-core/ui/view');
const Pages = require('nf-core/ui/pages');

const NativeNumberPicker = requireClass("android.widget.NumberPicker");
const NativeFrameLayout = requireClass("android.widget.FrameLayout");
const NativeAlertDialog = requireClass("android.app.AlertDialog");
const NativeDialogInterface = requireClass("android.content.DialogInterface");

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

        Object.defineProperty(this, 'currentIndex', {
            get: function() {
                return self.nativeObject.getValue();
            },
            set: function(currentIndex) {
                self.nativeObject.setValue(currentIndex);
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
                if(scrollState == NativeNumberPicker.OnScrollListener.SCROLL_STATE_IDLE) {
                    if(_onSelectedCallback)
                        _onSelectedCallback(self.currentIndex);
                }
            }
        }));
        
        self.show = function(done, cancel) {
            var layout = addViewToLayout();
            
            var cancelListener = NativeDialogInterface.OnClickListener.implement({
                onClick: function(dialogInterface, i) {
                    if(cancel)
                        cancel();
                }
            });
            
            var doneListener = NativeDialogInterface.OnClickListener.implement({
                onClick: function(dialogInterface, i) {
                    if(done)
                        done({index: self.currentIndex});
                }
            });
            
            const NativeRString = requireClass("android.R").string;
            var builder = new NativeAlertDialog.Builder(Android.getActivity());
            builder = builder.setView(layout);
            builder = builder.setNegativeButton(NativeRString.cancel, cancelListener);
            builder = builder.setPositiveButton(NativeRString.ok, doneListener);
            builder.show();
        };
        
        function addViewToLayout() {
            var layout = new NativeFrameLayout(Android.getActivity());
            var parent = self.nativeObject.getParent();
            if(parent) {
                parent.removeView(self.nativeObject);
            }
            layout.addView(self.nativeObject, new NativeFrameLayout.LayoutParams(
                -2 , // FrameLayout.LayoutParams.WRAP_CONTENT
                -2 , // FrameLayout.LayoutParams.WRAP_CONTENT
                17)); // Gravity.CENTER
            return layout;
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
