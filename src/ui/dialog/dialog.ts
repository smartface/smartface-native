import NativeComponent from '../../core/native-component';
import { MobileOSProps, NativeMobileComponent } from '../../core/native-mobile-component';
import FlexLayout from '../flexlayout';

export const DEFAULT_TRANSLUCENCY = 58;

export interface DialogAndroidProps {
  /**
   * Sets the theme style of dialog.
   *
   * @property {UI.Dialog.Android.Style} themeStyle
   * @android
   * @since 3.0.2
   */
  themeStyle: DialogStyle;
  /**
   * Sets whether the dialog is full transparent. This property must be given in constructor function.
   * If {@link UI.StatusBar statusBar} is visible, the dialog is drawn under status bar.
   *
   * @property {Boolean} isTransparent
   * @android
   * @since 3.2.0
   */
  isTransparent: boolean;
  /**
   * Sets whether this dialog is cancelable with the {@link Application#onBackButtonPressed BACK} key.
   *
   * @property {Boolean} cancelable
   * @android
   * @since 4.0.2
   */
  cancelable: boolean;
}

/**
 * @enum UI.Dialog.Android.Style
 * @android
 * @since 3.0.2
 *
 * According to your requirements, you should choose of the theme enums.
 *
 *     @example
 *     import Dialog from "@smartface/native/ui/dialog";
 *     import Button from "@smartface/native/ui/button";
 *     import Color from "@smartface/native/ui/color";
 *
 *     const myDialog = new Dialog({
 *      android: {
 *          themeStyle: Dialog.Android.Style.ThemeNoHeaderBar
 *        }
 *     });
 *
 *     const myButton = new Button({
 *         width: 100,
 *         height: 80,
 *         backgroundColor: Color.BLUE,
 *         text: "Hide Dialog",
 *         onPress: function() {
 *             myDialog.hide();
 *         }
 *     });
 *
 *     myDialog.layout.addChild(myButton);
 *     myDialog.layout.applyLayout();
 *     myDialog.show();
 *
 */
export enum DialogStyle {
  /**
   * This is default enum which will act as default when no themeStyle given.Default theme has no title bar and fills the entire screen.
   *
   * @android
   * @since 3.0.2
   */
  ThemeDefault = 16974065,
  /**
   * This theme with no header bar.
   *
   * @android
   * @since 3.0.2
   */
  ThemeNoHeaderBar = 16974064,
  /**
   * This theme has no title bar and fills the entire screen and extends into the display overscan region.
   *
   * @android
   * @since 3.0.2
   */
  ThemeNoHeaderBarWithOverscan = 16974302,
  /**
   * This theme  has no title bar and translucent system decor.
   *
   * @android
   * @since 3.0.2
   */
  ThemeNoHeaderBarWithTranslucentDecor = 16974306
}

export abstract class AbstractDialog<TNative = any, TProps extends MobileOSProps<{}, DialogAndroidProps> = MobileOSProps<{}, DialogAndroidProps>> extends NativeMobileComponent<TNative, TProps> {
  constructor(params?: Partial<AbstractDialog>) {
    super(params as any);
  }
  abstract setShowListener(): void;
  /**
   * Gets the layout of Dialog. You should add views to the layout of the dialog instance.
   *
   * @android
   * @ios
   * @since 0.1
   */
  abstract get layout(): FlexLayout;
  /**
   * Hides the dialog.
   *
   * @android
   * @ios
   * @since 0.1
   */
  abstract hide(): void;
  /**
   * Shows the dialog.
   *
   * @since 0.1
   * @android
   * @ios
   */
  abstract show(): void;

  static Style: DialogStyle;

  static Android: {
    Style: Partial<typeof DialogStyle>;
  };
  protected createNativeObject() {
    throw new Error('Method not implemented');
  }
}
