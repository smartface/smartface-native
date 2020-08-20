const TextBox = require('../textbox');
const Color = require('sf-core/ui/color');
const FlexLayout = require('sf-core/ui/flexlayout');

// const MaterialTextbox = extend(TextBox)(
MaterialTextbox.prototype = Object.create(TextBox.prototype);
function MaterialTextbox(params) {
    var self = this;

    if (!self.nativeObject) {
        if(params && params.multiline){
            self.nativeObject = new __SF_MDCMultilineTextField();
            self.mdcTextInputControllerUnderline = new __SF_MDCTextInputControllerUnderline(self.nativeObject);
            self.mdcTextInputControllerUnderline.expandsOnOverflow = false;
            self.mdcTextInputControllerUnderline.minimumLines = params.lineCount ? params.lineCount : 1;
        }else{
            self.nativeObject = new __SF_MDCTextField();
            self.mdcTextInputControllerUnderline = new __SF_MDCTextInputControllerUnderline(self.nativeObject);
        }
    }

    TextBox.call(this, params);

    self.nativeObject.layer.masksToBounds = false;
    self.ios.clearButtonEnabled = false;

    Object.defineProperty(self, 'cursorPosition', {
        get: function() {
            var selectedTextRange = this.valueForKey("selectedTextRange");

            var startPosition;
            var invocationStartPosition = __SF_NSInvocation.createInvocationWithSelectorInstance("start", selectedTextRange);
            if (invocationStartPosition) {
                invocationStartPosition.target = selectedTextRange;
                invocationStartPosition.setSelectorWithString("start");
                invocationStartPosition.retainArguments();

                invocationStartPosition.invoke();
                startPosition = invocationStartPosition.getReturnValue();
            }

            var endPosition;
            var invocationEndPosition = __SF_NSInvocation.createInvocationWithSelectorInstance("end", selectedTextRange);
            if (invocationEndPosition) {
                invocationEndPosition.target = selectedTextRange;
                invocationEndPosition.setSelectorWithString("end");
                invocationEndPosition.retainArguments();

                invocationEndPosition.invoke();
                endPosition = invocationEndPosition.getReturnValue();
            }

            var beginningOfDocument = this.valueForKey("beginningOfDocument");

            var offsetStart = 0;
            var invocationOffsetFromPosition = __SF_NSInvocation.createInvocationWithSelectorInstance("offsetFromPosition:toPosition:", this);
            if (invocationOffsetFromPosition) {
                invocationOffsetFromPosition.target = this;
                invocationOffsetFromPosition.setSelectorWithString("offsetFromPosition:toPosition:");
                invocationOffsetFromPosition.retainArguments();
                invocationOffsetFromPosition.setNSObjectArgumentAtIndex(beginningOfDocument, 2);
                invocationOffsetFromPosition.setNSObjectArgumentAtIndex(startPosition, 3);
                invocationOffsetFromPosition.invoke();
                offsetStart = invocationOffsetFromPosition.getNSIntegerReturnValue();
            }

            var offsetEnd = 0;
            var invocationEndOffsetFromPosition = __SF_NSInvocation.createInvocationWithSelectorInstance("offsetFromPosition:toPosition:", this);
            if (invocationEndOffsetFromPosition) {
                invocationEndOffsetFromPosition.target = this;
                invocationEndOffsetFromPosition.setSelectorWithString("offsetFromPosition:toPosition:");
                invocationEndOffsetFromPosition.retainArguments();
                invocationEndOffsetFromPosition.setNSObjectArgumentAtIndex(beginningOfDocument, 2);
                invocationEndOffsetFromPosition.setNSObjectArgumentAtIndex(endPosition, 3);
                invocationEndOffsetFromPosition.invoke();
                offsetEnd = invocationEndOffsetFromPosition.getNSIntegerReturnValue();
            }

            return {
                start: offsetStart,
                end: offsetEnd
            };
        }.bind((params && params.multiline) ? self.nativeObject.textView : self.nativeObject),
        set: function(value) {
            if (value && value.start === parseInt(value.start, 10) && value.end === parseInt(value.end, 10)) {

                var beginningOfDocument = this.valueForKey("beginningOfDocument");
                var startPosition;
                var invocationPositionFromPosition = __SF_NSInvocation.createInvocationWithSelectorInstance("positionFromPosition:offset:", this);
                if (invocationPositionFromPosition) {
                    invocationPositionFromPosition.target = this;
                    invocationPositionFromPosition.setSelectorWithString("positionFromPosition:offset:");
                    invocationPositionFromPosition.retainArguments();
                    invocationPositionFromPosition.setNSObjectArgumentAtIndex(beginningOfDocument, 2);
                    invocationPositionFromPosition.setNSIntegerArgumentAtIndex(value.start, 3);

                    invocationPositionFromPosition.invoke();
                    startPosition = invocationPositionFromPosition.getReturnValue();
                }

                var endPosition;
                var invocationEndPositionFromPosition = __SF_NSInvocation.createInvocationWithSelectorInstance("positionFromPosition:offset:", this);
                if (invocationEndPositionFromPosition) {
                    invocationEndPositionFromPosition.target = this;
                    invocationEndPositionFromPosition.setSelectorWithString("positionFromPosition:offset:");
                    invocationEndPositionFromPosition.retainArguments();
                    invocationEndPositionFromPosition.setNSObjectArgumentAtIndex(beginningOfDocument, 2);
                    invocationEndPositionFromPosition.setNSIntegerArgumentAtIndex(value.end, 3);

                    invocationEndPositionFromPosition.invoke();
                    endPosition = invocationEndPositionFromPosition.getReturnValue();
                }

                var characterRange;
                var invocationTextRangeFromPosition = __SF_NSInvocation.createInvocationWithSelectorInstance("textRangeFromPosition:toPosition:", this);
                if (invocationTextRangeFromPosition) {
                    invocationTextRangeFromPosition.target = this;
                    invocationTextRangeFromPosition.setSelectorWithString("textRangeFromPosition:toPosition:");
                    invocationTextRangeFromPosition.retainArguments();
                    invocationTextRangeFromPosition.setNSObjectArgumentAtIndex(startPosition, 2);
                    invocationTextRangeFromPosition.setNSObjectArgumentAtIndex(endPosition, 3);

                    invocationTextRangeFromPosition.invoke();
                    characterRange = invocationTextRangeFromPosition.getReturnValue();
                }

                this.setValueForKey(characterRange, "selectedTextRange");
            }
        }.bind((params && params.multiline) ? self.nativeObject.textView : self.nativeObject),
        enumerable: true,
        configurable: true
    });

    var _multiline = (params && params.multiline) ? true : false;
    Object.defineProperty(self, 'multiline', {
        get: function () {
            return _multiline;
        },
        enumerable: true,
        configurable: true
    });

    var _lineCount = (params && params.lineCount) ? params.lineCount : 1;
    Object.defineProperty(self, 'lineCount', {
        get: function () {
            return _lineCount;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(self, 'isPassword', {
        get: function () {
            return self.nativeObject.isSecureTextEntry;
        },
        set: function (value) {
            self.nativeObject.secureTextEntry = value;

        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(self.ios, 'clearButtonColor', {
        get: function () {
            return self.mdcTextInputControllerUnderline.textInputClearButtonTintColor;
        },
        set: function (value) {
            self.mdcTextInputControllerUnderline.textInputClearButtonTintColor = value.nativeObject;

        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(self, 'characterRestriction', {
        get: function () {
            return self.mdcTextInputControllerUnderline.characterCountMax;
        },
        set: function (value) {
            self.mdcTextInputControllerUnderline.characterCountMax = value;

        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(self, 'characterRestrictionColor', {
        get: function () {
            return new Color({
                color: self.mdcTextInputControllerUnderline.trailingUnderlineLabelTextColor
            });
        },
        set: function (value) {
            self.mdcTextInputControllerUnderline.trailingUnderlineLabelTextColor = value.nativeObject;

        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(self.ios, 'underlineLabelsFont', {
        get: function () {
            return self.mdcTextInputControllerUnderline.trailingUnderlineLabelFont;
        },
        set: function (value) {
            self.mdcTextInputControllerUnderline.leadingUnderlineLabelFont = value;
            self.mdcTextInputControllerUnderline.trailingUnderlineLabelFont  = value;
        },
        enumerable: true,
        configurable: true
    });

    // Object.defineProperty(self.ios, 'errorFont', {
    //     get: function () {
    //         return self.mdcTextInputControllerUnderline.leadingUnderlineLabelFont;
    //     },
    //     set: function (value) {
    //         self.mdcTextInputControllerUnderline.leadingUnderlineLabelFont  = value;
    //     },
    //     enumerable: true,
    //     configurable: true
    // });

    Object.defineProperty(self.ios, 'inlineHintFont', {
        get: function () {
            return self.mdcTextInputControllerUnderline.inlinePlaceholderFont;
        },
        set: function (value) {
            self.mdcTextInputControllerUnderline.inlinePlaceholderFont  = value;
        },
        enumerable: true,
        configurable: true
    });

    var _onLeftViewRightPadding = 0;
    Object.defineProperty(self.ios, 'leftLayoutRightPadding', {
        get: function () {
            return _onLeftViewRightPadding;
        },
        set: function (value) {
            _onLeftViewRightPadding = value;
            self.mdcTextInputControllerUnderline.leadingViewTrailingPaddingConstantJS = value;
        },
        enumerable: true,
        configurable: true
    });

    var _onRightViewLeftPadding = 0;
    Object.defineProperty(self.ios, 'rightLayoutLeftPadding', {
        get: function () {
            return _onRightViewLeftPadding;
        },
        set: function (value) {
            _onRightViewLeftPadding = value;
            self.mdcTextInputControllerUnderline.trailingViewTrailingPaddingConstantJS = value;
        },
        enumerable: true,
        configurable: true
    });

    var _onLeftViewRectForBounds;
    Object.defineProperty(self.ios, 'onLeftLayoutRectForBounds', {
        get: function () {
            return _onLeftViewRectForBounds;
        },
        set: function (value) {
            _onLeftViewRectForBounds = value;
            self.mdcTextInputControllerUnderline.leadingViewRectForBounds = value;
        },
        enumerable: true,
        configurable: true
    });

    var _onRightViewRectForBounds;
    Object.defineProperty(self.ios, 'onRightLayoutRectForBounds', {
        get: function () {
            return _onRightViewRectForBounds;
        },
        set: function (value) {
            _onRightViewRectForBounds = value;
            self.mdcTextInputControllerUnderline.trailingViewRectForBounds = value;
        },
        enumerable: true,
        configurable: true
    });

    // var isLTR_UserInterfaceLayoutDirection = __SF_UIApplication.sharedApplication().userInterfaceLayoutDirection == 0;
    // var isUnspecified = __SF_UIView.viewAppearanceSemanticContentAttribute() == 0;
    // var isLTR_ViewAppearance = __SF_UIView.viewAppearanceSemanticContentAttribute() == 3;

    var _rightLayout = undefined;
    var _rightLayoutMain;
    Object.defineProperty(self, 'rightLayout', {
        get: function () {
            return _rightLayout;
        },
        set: function (object) {
            _rightLayout = object;
            if (object === undefined) {
                // if (isLTR_UserInterfaceLayoutDirection && (isUnspecified || isLTR_ViewAppearance) || !isLTR_UserInterfaceLayoutDirection && (isUnspecified || !isLTR_ViewAppearance)) {
                    self.mdcTextInputControllerUnderline.textInput.setValueForKey(undefined, "trailingView");
                    self.mdcTextInputControllerUnderline.textInput.setValueForKey(0, "trailingViewMode");
                // } else {
                //     self.nativeObject.setValueForKey(undefined, "leftView");
                //     self.nativeObject.setValueForKey(0, "leftViewMode");
                // }
                return;
            }

            if (!_rightLayoutMain) {
                var flexMain = new FlexLayout();
                flexMain.nativeObject.yoga.isEnabled = false; // Bug : IOS-2714
                
                flexMain.nativeObject.translatesAutoresizingMaskIntoConstraints = false;
                flexMain.nativeObject.widthAnchor.constraintEqualToConstant(object.width ? object.width : 30).active = true;
                flexMain.nativeObject.heightAnchor.constraintEqualToConstant(object.height ? object.height : 30).active = true;

                var flexContent = new FlexLayout();
                flexContent.top = 0;
                flexContent.left = 0;
                flexContent.width = object.width ? object.width : 30;
                flexContent.height = object.height ? object.height : 30;
                flexMain.nativeObject.addFrameObserver();
                flexMain.nativeObject.frameObserveHandler = function (e) {
                    flexContent.top = 0;
                    flexContent.left = 0;
                    flexContent.width = e.frame.width;
                    flexContent.height = e.frame.height;
                    flexContent.applyLayout();
                };
                flexMain.addChild(flexContent);
                flexMain.content = flexContent;
                _rightLayoutMain = flexMain;
            } else {
                var childs = _rightLayoutMain.content.getChildList();
                for (var i in childs) {
                    _rightLayoutMain.content.removeChild(childs[i]);
                }
            }

            _rightLayoutMain.content.addChild(object.view);
            _rightLayoutMain.content.applyLayout();
            // if (isLTR_UserInterfaceLayoutDirection && (isUnspecified || isLTR_ViewAppearance) || !isLTR_UserInterfaceLayoutDirection && (isUnspecified || !isLTR_ViewAppearance)) {
                self.mdcTextInputControllerUnderline.textInput.setValueForKey(3, "trailingViewMode");
                self.mdcTextInputControllerUnderline.textInput.setValueForKey(_rightLayoutMain.nativeObject, "trailingView");
            // } else {
            //     self.nativeObject.setValueForKey(3, "leftViewMode");
            //     self.nativeObject.setValueForKey(_rightLayoutMain.nativeObject, "leftView");
            // }
        },
        enumerable: true
    });

    var _leftLayout = undefined;
    var _leftLayoutMain;
    Object.defineProperty(self.ios, 'leftLayout', {
        get: function () {
            return _leftLayout;
        },
        set: function (object) {
            if (self.multiline){
                throw new Error('leftlayout cannot be used with multiline.');
            }

            _leftLayout = object;
            if (object === undefined) {
                // if (isLTR_UserInterfaceLayoutDirection && (isUnspecified || isLTR_ViewAppearance) || !isLTR_UserInterfaceLayoutDirection && (isUnspecified || !isLTR_ViewAppearance)) {
                    self.mdcTextInputControllerUnderline.textInput.setValueForKey(undefined, "leadingView");
                    self.mdcTextInputControllerUnderline.textInput.setValueForKey(0, "leadingViewMode");
                // } else {
                //     self.nativeObject.setValueForKey(undefined, "leftView");
                //     self.nativeObject.setValueForKey(0, "leftViewMode");
                // }
                return;
            }

            if (!_leftLayoutMain) {
                var flexMain = new FlexLayout();
                flexMain.nativeObject.yoga.isEnabled = false; // Bug : IOS-2714
                
                flexMain.nativeObject.translatesAutoresizingMaskIntoConstraints = false;
                flexMain.nativeObject.widthAnchor.constraintEqualToConstant(object.width ? object.width : 30).active = true;
                flexMain.nativeObject.heightAnchor.constraintEqualToConstant(object.height ? object.height : 30).active = true;

                var flexContent = new FlexLayout();
                flexContent.top = 0;
                flexContent.left = 0;
                flexContent.width = object.width ? object.width : 30;
                flexContent.height = object.height ? object.height : 30;
                flexMain.nativeObject.addFrameObserver();
                flexMain.nativeObject.frameObserveHandler = function (e) {
                    flexContent.top = 0;
                    flexContent.left = 0;
                    flexContent.width = e.frame.width;
                    flexContent.height = e.frame.height;
                    flexContent.applyLayout();
                };
                flexMain.addChild(flexContent);
                flexMain.content = flexContent;
                _leftLayoutMain = flexMain;
            } else {
                var childs = _leftLayoutMain.content.getChildList();
                for (var i in childs) {
                    _leftLayoutMain.content.removeChild(childs[i]);
                }
            }

            _leftLayoutMain.content.addChild(object.view);
            _leftLayoutMain.content.applyLayout();
            // if (isLTR_UserInterfaceLayoutDirection && (isUnspecified || isLTR_ViewAppearance) || !isLTR_UserInterfaceLayoutDirection && (isUnspecified || !isLTR_ViewAppearance)) {
                self.mdcTextInputControllerUnderline.textInput.setValueForKey(3, "leadingViewMode");
                self.mdcTextInputControllerUnderline.textInput.setValueForKey(_leftLayoutMain.nativeObject, "leadingView");
            // } else {
            //     self.nativeObject.setValueForKey(3, "leftViewMode");
            //     self.nativeObject.setValueForKey(_rightLayoutMain.nativeObject, "leftView");
            // }
        },
        enumerable: true
    });

    var _labelsFont;
    Object.defineProperty(self, 'labelsFont', {
        get: function () {
            return _labelsFont;
        },
        set: function (value) {
            _labelsFont = value;
            self.mdcTextInputControllerUnderline.leadingUnderlineLabelFont = value;
            self.mdcTextInputControllerUnderline.trailingUnderlineLabelFont = value;
            self.mdcTextInputControllerUnderline.inlinePlaceholderFont = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'font', {
        get: function () {
            return self.mdcTextInputControllerUnderline.textInputFont;
        },
        set: function (value) {
            self.mdcTextInputControllerUnderline.textInputFont = value;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(self, 'selectedHintTextColor', {
        get: function () {
            return new Color({
                color: self.mdcTextInputControllerUnderline.floatingPlaceholderActiveColor
            });
        },
        set: function (value) {
            self.mdcTextInputControllerUnderline.floatingPlaceholderActiveColor = value.nativeObject;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'lineColor', {
        get: function () {
            return {
                normal: self.ios.normallineColor,
                selected: self.ios.selectedLineColor
            };
        },
        set: function (value) {
            if (value.normal) {
                self.ios.normallineColor = value.normal;
            }
            if (value.selected) {
                self.ios.selectedLineColor = value.selected;
            }
        },
        enumerable: true
    });

    Object.defineProperty(self.ios, 'normallineColor', {
        get: function () {
            return new Color({
                color: self.mdcTextInputControllerUnderline.normalColor
            });
        },
        set: function (value) {
            self.mdcTextInputControllerUnderline.normalColor = value.nativeObject;
        },
        enumerable: true
    });

    Object.defineProperty(self.ios, 'selectedLineColor', {
        get: function () {
            return new Color({
                color: self.mdcTextInputControllerUnderline.activeColor
            });
        },
        set: function (value) {
            self.mdcTextInputControllerUnderline.activeColor = value.nativeObject;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'errorColor', {
        get: function () {
            return new Color({
                color: self.mdcTextInputControllerUnderline.errorColor
            });
        },
        set: function (value) {
            self.mdcTextInputControllerUnderline.errorColor = value.nativeObject;
        },
        enumerable: true
    });

    var _errorMessage = "";
    Object.defineProperty(self, 'errorMessage', {
        get: function () {
            return _errorMessage;
        },
        set: function (value) {
            _errorMessage = value;
            if (value) {
                self.mdcTextInputControllerUnderline.setErrorTextErrorAccessibilityValue(_errorMessage, _errorMessage);
            } else {
                self.mdcTextInputControllerUnderline.setErrorTextNil();
            }
        },
        enumerable: true
    });

    Object.defineProperty(self.ios, 'lineHeight', {
        get: function () {
            return self.mdcTextInputControllerUnderline.underlineHeightNormal;
        },
        set: function (value) {
            self.mdcTextInputControllerUnderline.underlineHeightNormal = value;
        },
        enumerable: true
    });

    Object.defineProperty(self.ios, 'selectedLineHeight', {
        get: function () {
            return self.mdcTextInputControllerUnderline.underlineHeightActive;
        },
        set: function (value) {
            self.mdcTextInputControllerUnderline.underlineHeightActive = value;
        },
        enumerable: true
    });

    var _hintTextColor = Color.create(199, 199, 205);
    Object.defineProperty(self, 'hintTextColor', {
        get: function () {
            return _hintTextColor;
        },
        set: function (value) {
            _hintTextColor = value;
            self.mdcTextInputControllerUnderline.inlinePlaceholderColor = _hintTextColor.nativeObject;
            self.mdcTextInputControllerUnderline.floatingPlaceholderNormalColor = _hintTextColor.nativeObject;
        },
        enumerable: true,
        configurable: true
    });
    self.hintTextColor = _hintTextColor;

    var _hint;
    Object.defineProperty(self, 'hint', {
        get: function () {
            return _hint;
        },
        set: function (value) {
            _hint = value;
            self.mdcTextInputControllerUnderline.placeholderText = _hint;
        },
        enumerable: true,
        configurable: true
    });

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }

    //Handle android specific properties
    self.android = {};
}

module.exports = MaterialTextbox;