/// <reference path="../../.types/typings.d.ts" />

import Color = require("../color");
import Font = require("../font");
import TextDirection = require("../android/textdirection");
import TextAlignment = require("../textalignment");
import View = require("../view");
/**
 * @class UI.Label
 * @since 0.1
 * @extends UI.View
 * Label is a view that displays read-only text on the screen.
 *
 *     @example
 *     const Label = require('sf-core/ui/label');
 *     const Color = require('sf-core/ui/color');
 *     var myLabel = new Label({
 *         text: "This is my label",
 *         visible: true
 *     });
 *     myLabel.width = 200,
 *     myLabel.height = 50,
 *     myLabel.top = 10,
 *     myLabel.left = 20,
 *     myLabel.backgroundColor = Color.GRAY;
 */
declare class Label extends View implements Label {
    constructor(params?: any);
/**
 * Gets/sets background color of a view. It allows setting background
 * color with UI.Color instance.
 *
 * @property {UI.Color} [backgroundColor = UI.Color.TRANSPARENT]
 * @android
 * @ios
 * @since 0.1
 */
    backgroundColor: Color;
/**
 * Gets/sets font of a Label. When set to null label uses system font.
 * It is set to null by default.
 *
 *     @example
 *     const Label = require('sf-core/ui/label');
 *     const Font = require('sf-core/ui/font')
 *     var myLabel = new Label({
 *         text: "This is my label",
 *         visible: true
 *     });
 *     myLabel.font = Font.create("Arial", 16, Font.BOLD);
 *
 * @property {UI.Font} [font = null]
 * @android
 * @ios
 * @since 0.1
 */
    font: Font;
/**
 * Enables/disables multiple line property of a Label. If set to true
 * and the text is long enough, text will be shown in multiline. Setting multiline will override the {@link UI.Label#ellipsizeMode ellipsizeMode} prop.
 *
 * @property {Boolean} [multiline = false]
 * @android
 * @ios
 * @since 0.1
 * @deprecated 4.0.2 Use {@link UI.Label#maxLines maxLines} instead 
 */
    multiline: boolean;
/**
 * Sets the height of the Label to be at most maxLines tall. Setting 0 indicates that maxLines will be as much as given content. 
 *
 * @property {Number} maxLines
 * @android
 * @ios
 * @since 4.0.2
 */
    maxLines: number;
/**
 * Causes words in the text that are longer than the view's width to be ellipsized instead of broken in the middle. If {@link UI.Label#maxLines maxLines} has been used to set two or more lines, only {@link UI.EllipsizeMode#END EllipsizeMode.END} is supported
 *
 * @property {UI.EllipsizeMode} ellipsizeMode
 * @android
 * @ios
 * @since 4.0.2
 */
    ellipsizeMode: number;
/**
 * Gets/sets the text direction.
 *
 * @property {UI.Android.TextDirection} textDirection
 * @android
 * @since 4.0.2
 */
    textDirection: TextDirection;
/**
 * Gets/sets text on Label.
 *
 * @property {String} [text = ""]
 * @android
 * @ios
 * @since 0.1
 */
    text: string;
/**
 * Gets/sets text alignment of a Label. UI.TextAlignment constants
 * can be used. Label textAlignment property only supports UI.TextAlignment.MIDLEFT, UI.TextAlignment.MIDCENTER, UI.TextAlignment.MIDRIGHT.
 *
 *     @example
 *     const Label = require('sf-core/ui/label');
 *     const TextAlignment = require('sf-core/ui/textalignment');
 *     var myLabel = new Label();
 *     myLabel.textAlignment = TextAlignment.MIDCENTER;
 *
 * @property {UI.TextAlignment} [textAlignment = UI.TextAlignment.MIDLEFT]
 * @android
 * @ios
 * @since 0.1
 */
    textAlignment: TextAlignment;
/**
 * Gets/sets text color of Label.
 *
 * @property {UI.Color} [textColor = UI.Color.BLACK]
 * @android
 * @ios
 * @since 0.1
 */
    textColor: Color;

/**
 * This property adjusts font size according to view's fixed width. The adjustment of font size happens according to {@link UI.Label#minimumFontSize minimumFontSize} , maximum font size (which is current label font size) & {@link UI.Label#adjustableFontSizeStep adjustableFontSizeStep}(just Android)
 *
 * @property {Boolean} [adjustFontSizeToFit = false]
 * @ios
 * @android
 * @since 4.2.2
 * @see {@link UI.Label#minimumFontSize minimumFontSize}
 * @see {@link UI.Label#adjustableFontSizeStep adjustableFontSizeStep}
 */
    adjustFontSizeToFit: Boolean;

/**
 * Gets/sets minimum font size of Label.
 *
 * @property {Number} [minimumFontSize = 1]
 * @ios
 * @android
 * @since 4.2.2
 */    
    minimumFontSize: Number;

    android :View["android"] & {

/**
 * Gets/sets adjustable-font step granularity. It is used in conjunction with the minimum and maximum text size in order to build the set of text sizes the system uses to choose from when auto-sizing
 *
 * @property {Number} [adjustableFontSizeStep = 1]
 * @android
 * @since 4.2.2
 */         
        adjustableFontSizeStep: Number;
    }
}

declare interface Label {
    backgroundColor: Color;
    font: Font;
    multiline: boolean;
    maxLines: number;
    ellipsizeMode: number;
    textDirection: TextDirection;
    text: string;
    textAlignment: TextAlignment;
    textColor: Color;
    adjustFontSizeToFit: Boolean;
    minimumFontSize: Number;
    android :View["android"] & {
        adjustableFontSizeStep: Number;
    }
}

export = Label;

