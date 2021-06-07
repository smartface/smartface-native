import View from "../view";
import Color from "../color";
import Font from "../font";
import EllipsizeMode from "../ellipsizemode";
import TextAlignment from "../textalignment";
import AttributedString from "sf-core/global/attributedstring";
import TextDirection from "../android/textdirection";
/**
 * @class UI.TextView
 * @since 3.0.0
 * @extends UI.View
 * TextView is a view that displays read-only text on the screen.
 *
 *     @example
 *     const TextView = require('sf-core/ui/textview');
 *     const Color = require('sf-core/ui/color');
 *     var myTextview = new TextView({
 *         text: "This is my textview",
 *         visible: true
 *     });
 *     myTextview.width = 200,
 *     myTextview.height = 50,
 *     myTextview.top = 10,
 *     myTextview.left = 20,
 *     myTextview.backgroundColor = Color.GRAY;
 */
declare class TextView extends View {
/**
 * Gets/sets background color of a view. It allows setting background
 * color with UI.Color instance.
 *
 * @property {UI.Color} [backgroundColor = UI.Color.TRANSPARENT]
 * @android
 * @ios
 * @since 3.0.0
 */
  backgroundColor: Color;
/**
 * Gets/sets HTML text value of TextView. This property helps user showing HTML
 * texts on the screen. In Android, you must avoid to using selectable property to make the links clickable. 
 *
 *     @example
 *     // In this example 'This link' text inside TextView will shown underlined.
 *     const TextView = require('sf-core/ui/textview');
 *     var myTextView = new TextView();
 *     myTextView.htmlText = "<a href='http://www.smartface.io'>This link</a> will redirect you to Smartface website.";
 *
 * @property {String} [htmlText = ""]
 * @android
 * @ios
 * @since 3.0.0
 */
  htmlText: string;
/**
 * Gets/sets font of a TextView. When set to null textview uses system font.
 * It is set to null by default.
 *
 *     @example
 *     const TextView = require('sf-core/ui/textview');
 *     const Font = require('sf-core/ui/font')
 *     var myTextview = new TextView({
 *         text: "This is my textview",
 *         visible: true
 *     });
 *     myTextview.font = Font.create("Arial", 16, Font.BOLD);
 *
 * @property {UI.Font} [font = null]
 * @android
 * @ios
 * @since 3.0.0
 */
  font: Font;
/**
 * Enables/disables multiple line property of a TextView. If set to true
 * and the text is long enough, text will be shown in multiline. Setting multiline will override the {@link UI.TextView#ellipsizeMode ellipsizeMode} prop.
 *
 * @property {Boolean} [multiline = false]
 * @android
 * @ios
 * @since 3.0.0
 * @deprecated 4.0.2 Use {@link UI.TextView#maxLines maxLines} instead 
 */
  multiline: boolean;
/** 
 * Sets the height of the TextView to be at most maxLines tall. Assigning  0 indicates that maxLines will be as much as given content. 
 *
 * @property {Number} maxLines
 * @android
 * @ios
 * @since 4.0.2
 */
  maxLines: number;
/**
 * Causes words in the text that are longer than the view's width to be ellipsized instead of broken in the middle. 
 *
 * @property {UI.EllipsizeMode}  ellipsizeMode
 * @android
 * @ios
 * @since 4.0.2
 */
  ellipsizeMode: EllipsizeMode;
/**
 * Enables/disables selectable status of the TextView. If set to true
 * the text inside the TextView will be selectable.
 *
 * @property {Boolean} [selectable = false]
 * @android
 * @ios
 * @since 3.0.0
 */
  selectable: boolean;
/**
 * Gets/sets text on TextView.
 *
 * @property {String} [text = ""]
 * @android
 * @ios
 * @since 3.0.0
 */
  text: string;
/**
 * Gets/sets text alignment of a TextView. UI.TextAlignment constants
 * can be used.
 *
 *     @example
 *     const TextView = require('sf-core/ui/textview');
 *     const TextAlignment = require('sf-core/ui/textalignment');
 *     var myTextView = new TextView();
 *     myTextView.textAlignment = TextAlignment.MIDCENTER;
 *
 * @property {UI.TextAlignment} [textAlignment = UI.TextAlignment.MIDLEFT]
 * @android
 * @ios
 * @since 3.0.0
 */
  textAlignment: TextAlignment;
/**
 * Gets/sets text color of TextView.
 *
 * @property {UI.Color} [textColor = UI.Color.BLACK]
 * @android
 * @ios
 * @since 3.0.0
 */
  textColor: Color;
  ios: View['ios'] & {
/**
 * Sets/gets visibiliy of scroll bar when text is too long.
 *
 * @property {Boolean} [showScrollBar = false]
 * @ios
 * @since 3.0.0
 */
    showScrollBar: boolean;
  }
/**
 * Enable/Disable scroll bar when text is too long. If this property is "false", text alignment mid & bottom doesn't work and in Android, it will lose ability of click in attributed string.
 *
 * @property {Boolean} [scrollEnabled = true]
 * @ios
 * @android
 * @since 4.0.2
 */
  scrollEnabled: boolean;
/**
 * Sets/Gets the bounce effect when scrolling.
 *
 * @property {Boolean} bounces
 * @ios
 * @since 3.2.1
 */
  bounces: boolean;
/**
 * Gets/sets attributedText on TextView.
 *
 *     @example
 *     const System = require('sf-core/device/system');
 *     const TextView = require('sf-core/ui/textview');
 *     const Color = require('sf-core/ui/color');
 *     const Font = require('sf-core/ui/font');
 *     const AttributedString = require('sf-core/ui/attributedstring');
 *  
 *     var textView = new TextView({
 *         flexGrow: 1,
 *         lineSpacing : 20
 *     });
 * 
 *     if (System.OS === "iOS") {
 *         textView.letterSpacing = 5;
 *     }else{
 *         // letterSpacing working on ANDROID Lollipop (API-21) AND UPPER
 *         textView.letterSpacing = 0.3;
 *     }
 *      
 *     textView.onClick = function(string){
 *         console.log("String " + string);
 *     };
 *     
 *     var attributeString = new AttributedString();
 *     attributeString.string = "First\n";
 *     attributeString.foregroundColor = Color.GREEN;
 *     
 *     var attributeString2 = new AttributedString();
 *     attributeString2.string = "Second";
 *     attributeString2.link = "Second Link ";
 *     
 *     var attributeString3 = new AttributedString();
 *     attributeString3.string = " Third";
 *     attributeString3.link = "Third Link";
 *     attributeString3.backgroundColor = Color.RED;
 *     attributeString3.underline = true;
 *     attributeString3.font = Font.create("Times New Roman",30,Font.NORMAL);
 *     attributeString3.ios.underlineColor = Color.YELLOW;
 *     
 *     textView.attributedText = [attributeString,attributeString2,attributeString3];
 * 
 * @property {Array} [attributedText = []]
 * @android
 * @ios
 * @since 3.0.0
 */
  attributedText: AttributedString[];
/**
 * This method returns height & width of given attributed text. This method should be
 * used after assigning all needed properties. If attributedText is not set, this method returns null.
 * 
 * @param {Number} maxWidth
 * @method getAttributeTextSize
 * @android
 * @ios
 * @return {Object} Size of attributedText
 * @return {Number} return.width
 * @return {Number} return.height
 * @since 3.2.1
 */
  getAttributeTextSize(maxWidth: number): {
    width: number;
    height: number;
  };
/**
 * This event is called when user click link string. onLinkClick just work with attributedText.
 *
 *     @example
 *     myTextView.onLinkClick = function(string) {
 *         console.log(string);
 *     };
 *
 * @param {String} string
 * @event onLinkClick
 * @android
 * @ios
 * @since 3.0.0
 */
  onLinkClick: (e: string) => void;
/**
 * Gets/sets letterSpacing on TextView. letterSpacing just work with attributedText.
 * 
 * For iOS,
 * This value specifies the number of points by which to adjust kern-pair characters. 
 * Kerning prevents unwanted space from occurring between specific characters and depends on the font. 
 * The value 0 means kerning is disabled. The default value for this attribute is 0.
 * 
 * For Android,
 * Sets text letterSpacing in em units. Typical values for slight expansion will be around 0.05. Negative values tighten text.
 * The em is simply the font size. In an element with a 2in font, 1em thus means 2in. 
 * Expressing sizes, such as margins and paddings, in em means they are related to the font size, and if the user has a big font (e.g., on a big screen) or a small font (e.g., on a handheld device), the sizes will be in proportion. 
 * Declarations such as 'text-indent: 1.5em' and 'margin: 1em' are extremely common in CSS.
 * 
 * @property {Number} [letterSpacing = 0]
 * @android
 * @ios
 * @since 3.0.0
 */
  letterSpacing: number;
/**
 * Gets/sets lineSpacing on TextView. lineSpacing just work with attributedText.
 * 
 * @property {Number} [lineSpacing = 0]
 * @android
 * @ios
 * @since 3.0.0
 */
  lineSpacing: number;
/**
 * Gets/sets the text direction.
 *
 * @property {UI.Android.TextDirection} textDirection
 * @android
 * @since 4.0.2
 */
  textDirection: TextDirection;
}
export = TextView;
