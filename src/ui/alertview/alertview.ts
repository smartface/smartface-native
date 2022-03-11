import { INativeComponent } from "../../core/inative-component";
import { MobileOSProps } from "../../core/native-mobile-component";

/**
 * @enum {Number} UI.AlertView.Android.ButtonType
 * @since 0.1
 *
 * ButtonType is used to indicate the behaviors of buttons in UI.AlertView.
 * You can specify a button have negative, positive or neutral user experience.
 * According to operating system button appearance or positions may change.
 *
 *     @example
 *     import AlertView from '@smartface/native/ui/alertview';
 *
 *     const myAlertView = new AlertView({
 *         title: "Alert Title",
 *         message: "Alert Message"
 *     });
 *     myAlertView.addButton({
 *         type: AlertView.Android.ButtonType.NEUTRAL,
 *         text: "Ignore",
 *     });
 *     myAlertView.addButton({
 *         type: AlertView.Android.ButtonType.NEGATIVE,
 *         text: "Cancel"
 *     });
 *     myAlertView.addButton({
 *         type: AlertView.Android.ButtonType.POSITIVE,
 *         text: "Okay"
 *     });
 *
 *     myAlertView.show();
 */
export enum ButtonType {
  POSITIVE = 0,
  NEUTRAL = 1,
  NEGATIVE = 2
}

/**
 * @class UI.AlertView
 * @since 0.1
 *
 * AlertView is an alert box with buttons having custom behaviors. You can
 * use AlertView for informing user or asking for confirmations. AlertView
 * has buttons with callbacks that you can take action for each of them separately.
 *
 *     @example
 *     import AlertView from '@smartface/native/ui/alertview';
 *
 *     const myAlertView = new AlertView({
 *         title: "Alert Title",
 *         message: "Alert Message"
 *     });
 *     myAlertView.addButton({
 *         type: AlertView.Android.ButtonType.NEGATIVE,
 *         text: "Cancel"
 *     });
 *     myAlertView.addButton({
 *         type: AlertView.Android.ButtonType.POSITIVE,
 *         text: "Okay",
 *         onClick: () => {
 *             console.log("Okay clicked.");
 *         }
 *     });
 *
 *     myAlertView.show();
 */
export interface IAlertView extends INativeComponent, MobileOSProps {
  /**
   * Gets showing status of AlertView. It is set to true if AlertView is
   * currently displayed on screen, false otherwise.
   *
   * @property {boolean} isShowing
   * @android
   * @ios
   * @since 0.1
   * @readonly
   */
  isShowing(): void;
  /**
   * Shows AlertView on the screen with specified properties, isShowing property
   * set to true after this operation.
   *
   * @method show
   * @android
   * @ios
   * @since 0.1
   */
  show(): void;
  toString(): string;
  /**
   * Gets/sets title of AlertView.
   *
   * @android
   * @ios
   * @since 0.1
   */
  title: string;
  /**
   * Gets/sets message of AlertView.
   *
   * @android
   * @ios
   * @since 0.1
   */
  message: string;
  /**
   * Gets/sets dismiss callback function.
   *
   *     @example
   *     myAlertView.onDismiss = (alertView) =>  {
   *         console.log("Dismissed alert view with title: " + alertView.title);
   *     };
   *
   * @android
   * @ios
   * @param {UI.AlertView} alertView Dismissed AlertView object
   * @since 0.1
   */
  onDismiss: (alertView?: IAlertView) => void;
  readonly android: Partial<{
    /**
     * Gets/sets whether the alert view is cancelable or not when touched outside.
     *
     * @android
     * @since 0.1
     */
    cancellable: boolean;
  }>;
  /**
   * Dismisses the AlertView, isShowing property set to false after this
   * operation.
   *
   * @android
   * @ios
   * @since 0.1
   */
  dismiss(): void;
  /**
   * Returns object which contains text of added TextBox
   *
   * @android
   * @ios
   * @since 4.1.2
   * @readonly
   */
  get textBoxes(): { text: string }[];
  /**
   * Allows you to add button to AlertView. You can add maximum 3 buttons
   * on Android platform, on iOS there is no limitation.
   *
   *     @example
   *     myAlertView.addButton({
   *         type: AlertView.Android.ButtonType.POSITIVE,
   *         text: "Okay",
   *         onClick: function() {
   *             console.log("Okay clicked.");
   *         }
   *     });
   *
   * @android
   * @ios
   * @since 0.1
   */
  addButton(params: { type: ButtonType; text: string; onClick: () => void; index: number }): void;
  /**
   * Allows to add TextBox to AlertView. In iOS, maximum two textbox can be added. It is not applied to Android but 2 textboxes recommended.
   *
   *     @example
   *     myAlertView.addTextBox({
   *          text: "Hello!",
   *          hint: "Hint!",
   *          isPassword: false,
   *          android: {
   *              viewSpacings: { left: 50, right: 50 }
   *          }
   *     });
   * @android
   * @ios
   * @since 4.1.2
   */
  addTextBox(params: {
    text: string;
    hint: string;
    isPassword: boolean;
    android: Partial<{
      width: number;
      height: number;
      viewSpacings: {
        left: number;
        top: number;
        right: number;
        bottom: number;
      };
    }>;
  }): void;
}

export declare class AbstractAlertView implements IAlertView {
  constructor(params?: Partial<IAlertView>);
  ios: Partial<{ [key: string]: any; }>;
  isShowing(): void;
  show(): void;
  dismiss(): void;
  toString(): string;
  title: string;
  message: string;
  onDismiss: (alertView?: IAlertView) => void;
  android: Partial<{
    /**
     * Gets/sets whether the alert view is cancelable or not when touched outside.
     *
     * @android
     * @since 0.1
     */
    cancellable: boolean;
  }>;
  get textBoxes(): { text: string }[];
  addButton(params: { type: ButtonType; text: string; onClick?: () => void; index: number }): void;
  addTextBox(params: {
    text: string;
    hint: string;
    isPassword: boolean;
    android: Partial<{ width: number; height: number; viewSpacings: { left: number; top: number; right: number; bottom: number } }>;
  }): void;
  nativeObject: any;
  static Android: {
    ButtonType: typeof ButtonType;
  };
}
