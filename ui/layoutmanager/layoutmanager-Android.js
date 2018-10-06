/*globals requireClass*/
const AndroidUnitConverter = require("../../util/Android/unitconverter.js");
const NativeItemDecoration = requireClass("android.support.v7.widget.RecyclerView$ItemDecoration");
const NativeStaggeredGridLayoutManager = requireClass("android.support.v7.widget.StaggeredGridLayoutManager");
const LayoutChangeListener = requireClass("android.view.View$OnLayoutChangeListener");

function LayoutManager(params) {
    var self = this;
    this._lineDecoration = null;
    this._itemDecoration = null;
    this._itemLength = params && params.itemLength;
    this._spanCount = params && params.spanCount;
    this._lineSpacing = params && params.lineSpacing;
    this._itemSpacing = params && params.itemSpacing;
    this._scrollDirection = params && params.scrollDirection;
    this._contentInset = params && params.contentInset;
    this._onItemLength = params && params.onItemLength;
    this._nativeRecyclerView = null;
    this._spanSize = 0;

    this._createAndAddItemSpacingDecoration = function() {
        if (self._itemDecoration && self._nativeRecyclerView) {
            self._nativeRecyclerView.removeItemDecoration(self._itemDecoration);
        }
        if (!self._itemSpacing) {
            return;
        }
        self._itemDecoration = NativeItemDecoration.extend("SFItemDecoration", {
            getItemOffsets: function() {
                var outRect = arguments[0];
                var view;
                if (arguments.count === 4) {
                    view = arguments[1];
                }
                else {
                    var viewPosition = arguments[1];
                    view = self.nativeObject.findViewByPosition(viewPosition);
                }

                if (self._itemSpacing) {
                    var gridLayoutParams = view.getLayoutParams();
                    var spanPosition = gridLayoutParams.getSpanIndex();
                    var spacingStep = self._itemSpacing / self._spanCount;
                    var spacingStart = Math.floor(spanPosition * spacingStep);
                    var spacingEnd = Math.floor(spacingStep * (self._spanCount - spanPosition - 1));

                    if (self._scrollDirection == LayoutManager.ScrollDirection.HORIZONTAL) {
                        outRect.top = spacingStart;
                        outRect.bottom = spacingEnd;
                    }
                    else {
                        outRect.left = spacingStart;
                        outRect.right = spacingEnd;
                    }
                }
            }
        }, null);

        if (self._nativeRecyclerView) {
            self._nativeRecyclerView.addItemDecoration(self._itemDecoration);
        }


    };

    this._createAndAddLineSpacingDecoration = function() {
        if (self._lineDecoration && self._nativeRecyclerView) {
            self._nativeRecyclerView.removeItemDecoration(self._lineDecoration);
        }
        if (!self._lineSpacing) {
            return;
        }
        self._lineDecoration = NativeItemDecoration.extend("SFItemDecoration", {
            getItemOffsets: function() {
                var outRect = arguments[0];
                var viewPosition;
                var parent = arguments[2];
                if (arguments.count === 4) {
                    var view = arguments[1];
                    viewPosition = parent.getChildViewHolder(view).getAdapterPosition();
                }
                else {
                    viewPosition = arguments[1];
                }

                if (self._lineSpacing) {
                    var rowOrColumnIndex = Math.floor(viewPosition / self._spanCount);
                    if (rowOrColumnIndex == 0) {
                        if (self._scrollDirection == LayoutManager.ScrollDirection.HORIZONTAL) {
                            outRect.left = 0;
                        }
                        else {
                            outRect.top = 0;
                        }
                    }
                    else {
                        if (self._scrollDirection == LayoutManager.ScrollDirection.HORIZONTAL) {
                            outRect.left = self._lineSpacing;
                        }
                        else {
                            outRect.top = self._lineSpacing;
                        }
                    }
                }
            }
        }, null);

        if (self._nativeRecyclerView) {
            self._nativeRecyclerView.addItemDecoration(self._lineDecoration);
        }


    };


    if (!this.nativeObject) {
        this.nativeObject = new NativeStaggeredGridLayoutManager(this._spanCount, this._scrollDirection);
    }

}

function setContentInset(self) {
    var leftInset = 0;
    var rightInset = 0;
    var topInset = 0;
    var bottomInset = 0;
    var contentInset = self._contentInset;
    if (contentInset && self.nativeRecyclerView) {
        if (contentInset.left) {
            leftInset = AndroidUnitConverter.dpToPixel(contentInset.left);
        }
        if (contentInset.right) {
            rightInset = AndroidUnitConverter.dpToPixel(contentInset.right);
        }
        if (contentInset.top) {
            topInset = AndroidUnitConverter.dpToPixel(contentInset.top);
        }
        if (contentInset.bottom) {
            bottomInset = AndroidUnitConverter.dpToPixel(contentInset.bottom);
        }
    }
    if (self.nativeRecyclerView) {
        self.nativeRecyclerView.setPaddingRelative(leftInset, topInset, rightInset, bottomInset);
    }
}

function setLayoutChangeListener(self) {
    if (self._onItemLength) {
        if (self._scrollDirection == LayoutManager.ScrollDirection.HORIZONTAL) {
            var initialHeight = self._nativeRecyclerView.getHeight();
            if (initialHeight > 0) {
                setSpanSizeForHorizontal(self, initialHeight);
            }
        }
        else {
            var initialWidth = self._nativeRecyclerView.getWidth();
            if (initialWidth > 0) {
                setSpanSizeForVertical(self, initialWidth);
            }
        }
    }

    self._nativeRecyclerView.addOnLayoutChangeListener(LayoutChangeListener.implement({
        onLayoutChange: function(view, left, top, right, bottom, oldLeft, oldTop, oldRight, oldBottom) {
            if (self._onItemLength || self._spanSize == 0) {
                if (self._scrollDirection == LayoutManager.ScrollDirection.HORIZONTAL) {
                    var oldHeight = oldBottom - oldTop;
                    var newHeight = bottom - top;
                    if (newHeight != oldHeight) {
                        var heightInDp = AndroidUnitConverter.pixelToDp(newHeight);
                        setSpanSizeForHorizontal(self, heightInDp);
                    }
                }
                else {
                    var oldWidth = oldRight - oldLeft;
                    var newWidth = right - left;
                    if (newWidth != oldWidth) {
                        var widthInDp = AndroidUnitConverter.pixelToDp(newWidth);
                        setSpanSizeForVertical(self, widthInDp);
                    }
                }
            }
        }
    }))
}

function setSpanSizeForHorizontal(self, newHeight) {
    var paddingsVertical = 0;
    if (self._contentInset) {
        if (self._contentInset.top) {
            paddingsVertical += self._contentInset.top;
        }
        if (self._contentInset.bottom) {
            paddingsVertical += self._contentInset.bottom;
        }
    }
    self._spanSize = newHeight - (self._spanCount - 1) * self._itemSpacing - paddingsVertical;
}

function setSpanSizeForVertical(self, newWidth) {

    var paddingsHorizontal = 0;
    if (self._contentInset) {
        if (self._contentInset.left) {
            paddingsHorizontal += self._contentInset.left;
        }
        if (self._contentInset.right) {
            paddingsHorizontal += self._contentInset.right;
        }
    }
    self._spanSize = newWidth - (self._spanCount - 1) * self._itemSpacing - paddingsHorizontal;
}


LayoutManager.prototype = {
    get spanCount() {
        // Avoiding integer-float conflics of engine
        return this._spanCount;
    },
    set spanCount(spanCount) {
        this._spanCount = spanCount;
        this.nativeObject.setSpanCount(spanCount);
    },
    get lineSpacing() {
        return this._lineSpacing;
    },
    set lineSpacing(lineSpacing) {
        this._lineSpacing = lineSpacing;
        this._createAndAddLineSpacingDecoration();
    },
    get itemSpacing() {
        return this._itemSpacing;
    },
    set itemSpacing(itemSpacing) {
        this._itemSpacing = itemSpacing;
        this._createAndAddItemSpacingDecoration();
    },
    get contentInset() {
        return this._contentInset;
    },
    set contentInset(contentInset) {
        this._contentInset = contentInset;
        setContentInset(this);
    },
    get scrollDirection() {
        return this._scrollDirection;
    },
    set scrollDirection(scrollDirection) {
        this._scrollDirection = scrollDirection;
        this.nativeObject.setOrientation(scrollDirection);
    },
    get nativeRecyclerView() {
        return this._nativeRecyclerView;
    },
    set nativeRecyclerView(nativeRecyclerView) {
        this._nativeRecyclerView = nativeRecyclerView;
        if (nativeRecyclerView) {
            setLayoutChangeListener(this);
            this._createAndAddItemSpacingDecoration();
            this._createAndAddLineSpacingDecoration();
            setContentInset(this);
        }
    },
    get itemLength() {
        return this._itemLength;
    },
    set itemLength(value) {
        this._itemLength = value;
    },
    get onItemLength() {
        return this._onItemLength;
    },
    set onItemLength(value) {
        this._onItemLength = value;
    },
    get spanSize() {
        return this._spanSize;
    },
    set spanSize(value) {
        this._spanSize = value;
    },
    set viewWidth(value) {
        if (value > 0 && this._scrollDirection == LayoutManager.ScrollDirection.VERTICAL) {
            setSpanSizeForVertical(this, value);
        }
    },
    set viewHeight(value) {
        if (value > 0) {
            setSpanSizeForHorizontal(this, value);
        }
    }
};

Object.defineProperties(LayoutManager, {
    // properties
    'ScrollDirection': {
        value: {},
        enumerable: true
    }
});

Object.defineProperties(LayoutManager.ScrollDirection, {
    'HORIZONTAL': {
        value: 0,
        enumerable: true
    },
    'VERTICAL': {
        value: 1,
        enumerable: true
    }
});
LayoutManager.iOS = {};

module.exports = LayoutManager;
