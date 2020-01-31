/* globals requireClass */
const NativeRecyclerView = requireClass("androidx.recyclerview.widget.RecyclerView");
const NativeSwipeRefreshLayout = requireClass("androidx.swiperefreshlayout.widget.SwipeRefreshLayout");
const AndroidUnitConverter = require("../../util/Android/unitconverter");

function Scrollable(childJsClass, nativeScrollableObject) {
    var self = childJsClass;
    if (!self.android) {
        self.android = {};
    }

    var _overScrollMode = 0,
        _onGesture;
    Object.defineProperties(self.android, {
        'overScrollMode': {
            get: function() {
                return _overScrollMode;
            },
            set: function(mode) {
                nativeScrollableObject.setOverScrollMode(mode);
                _overScrollMode = mode;
            },
            enumerable: true,
            configurable: true
        }
    });

    if (!self.__isRecyclerView)
        return;

    Object.defineProperties(self, {
        /* 
         ToDo: There are a few known bugs which comes in front when ListView's items are big.
        */
        'contentOffset': {
            get: function() {
                return {
                    x: AndroidUnitConverter.pixelToDp(self.nativeInner.computeHorizontalScrollOffset()),
                    y: AndroidUnitConverter.pixelToDp(self.nativeInner.computeVerticalScrollOffset())
                };
            },
            enumerable: true
        },
        'indexByListViewItem': {
            value: (listViewItem) => self.nativeInner.getChildAdapterPosition(listViewItem.nativeObject),
            enumerable: true
        },
        'deleteRowRange': {
            value: function(params = {}) {
                const {
                    positionStart,
                    itemCount
                } = params;
                self.nativeDataAdapter.notifyItemRangeRemoved(positionStart, itemCount);
            },
            enumerable: true
        },
        'insertRowRange': {
            value: function(params = {}) {
                const {
                    positionStart,
                    itemCount
                } = params;
                self.nativeDataAdapter.notifyItemRangeInserted(positionStart, itemCount);
            },
            enumerable: true
        },
        'refreshRowRange': {
            value: function(params = {}) {
                const {
                    positionStart,
                    itemCount
                } = params;
                self.nativeDataAdapter.notifyItemRangeChanged(positionStart, itemCount);
            },
            enumerable: true
        },
    });

    let _onAttachedToWindow, _onDetachedFromWindow;
    Object.defineProperties(self.android, {
        'onGesture': {
            get: function() {
                return _onGesture;
            },
            set: function(value) {
                _onGesture = value;
                if (_onGesture) {
                    self.nativeInner.setJsCallbacks({
                        onScrollGesture: function(distanceX, distanceY) {
                            let returnValue = true;
                            _onGesture && (returnValue = _onGesture({
                                distanceX: distanceX,
                                distanceY: distanceY
                            }));
                            return !!returnValue;
                        }
                    });
                } else {
                    self.nativeInner.setJsCallbacks(null);
                }
            },
            enumerable: true,
            configurable: true
        },
        'saveInstanceState': {
            value: function() {
                return {
                    nativeObject: self.layoutManager.nativeObject.onSaveInstanceState()
                };
            },
            enumerable: true
        },
        'restoreInstanceState': {
            value: function(savedInstance) {
                self.layoutManager.nativeObject.onRestoreInstanceState(savedInstance.nativeObject);
            },
            enumerable: true
        },
        'onAttachedToWindow': {
            get: function() {
                return _onAttachedToWindow;
            },
            set: function(onAttachedToWindow) {
                _onAttachedToWindow = onAttachedToWindow;
            },
            enumerable: true
        },
        'onDetachedFromWindow': {
            get: function() {
                return _onDetachedFromWindow;
            },
            set: function(onDetachedFromWindow) {
                _onDetachedFromWindow = onDetachedFromWindow;
            },
            enumerable: true
        }
    });


    self.nativeObject.setOnRefreshListener(NativeSwipeRefreshLayout.OnRefreshListener.implement({
        onRefresh: function() {
            self.onPullRefresh && self.onPullRefresh();
        }
    }));

    self.nativeInner.addOnItemTouchListener(NativeRecyclerView.OnItemTouchListener.implement({
        onInterceptTouchEvent: function(recyclerView, motionEvent) {
            return !self.touchEnabled;
        },
        onRequestDisallowInterceptTouchEvent: function(disallowIntercept) {},
        onTouchEvent: function(recyclerView, motionEvent) {}
    }));
}

module.exports = Scrollable;