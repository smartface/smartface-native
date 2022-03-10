import TextBox from '../textbox';
import KeyboardType from '../shared/keyboardtype';
import ActionKeyType from '../shared/android/actionkeytype';
/**
 * @class UI.TextArea
 * @since 1.1.10
 * @extends UI.TextBox
 * TextArea is a UI which users can edit the multiline text.
 *
 *     @example
 *     const TextArea = require('@smartface/native/ui/textarea');
 *     var myTextArea= new TextArea({
 *         left:10, top:10, width:200, height:200,
 *         borderWidth: 1
 *     });
 *     myPage.layout.addChild(myTextArea);
 *
 */
declare class TextArea extends TextBox {
  android: TextBox['android'] & {
    /**
     * Gets/sets hint text that will be displayed when TextBox is empty.
     *
     * @property {String} [hint = ""]
     * @android
     * @since 1.1.10
     */
    hint: string;
  };
  ios: TextBox['ios'] & {
    /**
     * Get/set showScrollBar property
     *
     * @property {Boolean} [showScrollBar = false]
     * @ios
     * @since 1.1.10
     */
    showScrollBar: boolean;
  };
  /**
   * Sets/Gets the bounce effect when scrolling.
   *
   * @property {Boolean} bounces
   * @ios
   * @since 3.2.1
   */
  bounces: true;
}
export = TextArea;
