const EllipsizeMode = require("sf-core/ui/page");

const NSLineBreakMode = {};
NSLineBreakMode.byWordWrapping = 0;
NSLineBreakMode.byCharWrapping = 1;
NSLineBreakMode.byClipping = 2;
NSLineBreakMode.byTruncatingHead = 3;
NSLineBreakMode.byTruncatingTail = 4;
NSLineBreakMode.byTruncatingMiddle = 5;

NSLineBreakMode.ellipsizeModeToNSLineBreakMode = function(mode) {
    switch (mode) {
        case EllipsizeMode.START:
            return NSLineBreakMode.byTruncatingHead;
        case EllipsizeMode.MIDDLE:
            return NSLineBreakMode.byTruncatingMiddle;
        case EllipsizeMode.END:
            return NSLineBreakMode.byTruncatingTail;
        case EllipsizeMode.NONE:
            return NSLineBreakMode.byClipping;
        case EllipsizeMode.iOS.WORDWRAPPING:
            return NSLineBreakMode.byWordWrapping;
        case EllipsizeMode.iOS.CHARWRAPPING:
            return NSLineBreakMode.byCharWrapping;
    }
};

NSLineBreakMode.nsLineBreakModeToEllipsizeMode = function(mode) {
    switch (mode) {
        case NSLineBreakMode.byTruncatingHead:
            return EllipsizeMode.START;
        case NSLineBreakMode.byTruncatingMiddle:
            return EllipsizeMode.MIDDLE;
        case NSLineBreakMode.byTruncatingTail:
            return EllipsizeMode.END;
        case NSLineBreakMode.byClipping:
            return EllipsizeMode.NONE;
        case NSLineBreakMode.byWordWrapping:
            return EllipsizeMode.iOS.WORDWRAPPING;
        case NSLineBreakMode.byCharWrapping:
            return EllipsizeMode.iOS.CHARWRAPPING;
    }
};

Object.freeze(NSLineBreakMode);

module.exports = NSLineBreakMode;