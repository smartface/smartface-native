import { INativeMobileComponent, MobileOSProps } from '../../core/native-mobile-component';
import { IFlexLayout } from '../flexlayout/flexlayout';

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
 *     import { DialogStyle } from "@smartface/native/ui/dialog/dialog";
 *     import Button from "@smartface/native/ui/button";
 *     import Color from "@smartface/native/ui/color";
 *
 *     const myDialog = new Dialog({
 *      android: {
 *          themeStyle: DialogStyle.ThemeNoHeaderBar.
 *     }    cancelable: true,
 *          isTransparent: false
 *        }
 *     });
 *
 *     const myButton = new Button({
 *         width: 100,
 *         height: 80,
 *         backgroundColor: Color.BLUE,
 *         text: "Hide Dialog",
 *         onPress: () => {
 *             myDialog.hide();
 *         }
 *     });
 *
 *     myDialog.layout.addChild(myButton);
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
  ThemeDefault = 16974402, //android.R.style.Theme_Material_Light_NoActionBar_Fullscreen
  /**
   * This theme with no header bar.
   *
   * @android
   * @since 3.0.2
   */
  ThemeNoHeaderBar = 16974401, //android.R.style.Theme_Material_Light_NoActionBar
  /**
   * This theme has no title bar and fills the entire screen and extends into the display overscan region.
   *
   * @android
   * @since 3.0.2
   * @deprecated
   */
  ThemeNoHeaderBarWithOverscan = 16974403, //android.R.style.Theme_Material_Light_NoActionBar_Overscan
  /**
   * This theme  has no title bar and translucent system decor.
   *
   * @android
   * @since 3.0.2
   */
  ThemeNoHeaderBarWithTranslucentDecor = 16974404 //android.R.style.Theme_Material_Light_NoActionBar_TranslucentDecor
}

export interface IDialog<TNative = any, TProps extends MobileOSProps<{}, DialogAndroidProps> = MobileOSProps<{}, DialogAndroidProps>> extends INativeMobileComponent<TNative, TProps> {
  /**
   * Gets the layout of Dialog. You should add views to the layout of the dialog instance.
   *
   * @android
   * @ios
   * @since 0.1
   */
  readonly layout: IFlexLayout;
  /**
   * Hides the dialog.
   *
   * @android
   * @ios
   * @since 0.1
   */
  hide(): void;
  /**
   * Shows the dialog.
   *
   * @since 0.1
   * @android
   * @ios
   */
  show(): void;
}
