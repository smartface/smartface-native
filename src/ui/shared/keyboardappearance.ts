/**
 * @since 0.1
 * @ios
 *
 * KeyboardAppearance is an enum. It defines keyboard appearance theme on iOS devices only.
 *
 *     @example
 *     import Color from '@smartface/native/ui/color';
 *     import TextBox from '@smartface/native/ui/textbox';
 *     import KeyboardAppearance from '@smartface/native/ui/keyboardappearance';
 *
 *     const myTextBox = new TextBox({
 *         top: 50, left:50, width: 100, height: 80,
 *         hint: "your hint text",
 *         backgroundColor: Color.create("#67fcaa")
 *     });
 *     myTextBox.ios.keyboardAppearance = KeyboardAppearance.DARK;
 *     myPage.layout.addChild(myTextBox);
 *
 */
enum KeyboardAppearance {
  /**
   * @ios
   * Default colored keyboard appearance. This constant corresponds to UI.KeyboardAppearance.LIGHT.
   * @since 0.1
   */
  DEFAULT,

  /**
   * @ios
   * Dark colored keyboard appearance.
   * @since 0.1
   */
  DARK,

  /**
   * @ios
   * Light colored keyboard appearance.
   * @since 0.1
   */
  LIGHT
}

export default KeyboardAppearance;
