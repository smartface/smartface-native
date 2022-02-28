import Color from "../color";


/**
 * @class UI.Toast
 * @since 4.4.1
 * Toast provide brief messages about app processes at the bottom of the screen.
 *
 *     @example
 *     const Toast = require('@smartface/native/ui/toast');
 *     var myToastMessage = new Toast({
 *         message: "This is a toast message",
 *         actionTextColor: Color.YELLOW,
 *         bottomOffset: 200,
 *         duration: 5
 *     });
 *     myToastMessage.createAction("Action Title", () => {console.log("Action Pressed!")})
 *     myToastMessage.show();
 *
 */

 declare enum ToastEvents {
	Dismissed = 'dismissed',
  }

  declare namespace Toast {
	const Events: typeof ToastEvents
	type Events = typeof Events
  }

declare class Toast <TEvents = ToastEvents> extends  NativeComponent<TEvents> {
    constructor(params?: Partial<Toast>)
	on(eventName: TEvents, callback: (...args: any[]) => void): () => void;

    /**
	 * Gets/sets the message of toast.
	 * @property {String} 
	 * @android
	 * @ios
	 * @since 4.4.1
	 */
    set message(arg: string)
    get message(): string;
    /**
	 * Gets/sets the background of toast message view.
	 * @property {UI.Color}
	 * @android
	 * @ios
	 * @since 4.4.1
	 */
    set backgroundColor(arg: Color)
    get backgroundColor(): Color;
    /**
	 * Gets/sets the actionTextColor of toast action text.
	 * @property {UI.Color}
	 * @android
	 * @ios
	 * @since 4.4.1
	 */
    set actionTextColor(arg: Color)
    get actionTextColor(): Color;
    /**
	 * Gets/sets the messageTextColor of toast message text.
	 * @property {UI.Color}
	 * @android
	 * @ios
	 * @since 4.4.1
	 */
    set messageTextColor(arg: Color)
    get messageTextColor(): Color;
    /**
	 * Gets/sets the bottom offset of toast message view from bottom.
	 * @property {Number}
	 * @android
	 * @ios
	 * @since 4.4.1
	 */
    set bottomOffset(arg: number)
    get bottomOffset(): number;
    
    /**
	 * Gets/sets how long it will stay on the screen. Value can bet set between 1 - 10 as integer
	 * @property {Number} [duration = Number]
	 * @android
	 * @ios
	 * @since 4.4.1
	 */
    set duration(arg: number)
    get duration(): number;
	
	/**
	 * Gets status of the toast. Returns true if the toast is currently displayed on the screen. 
	 * @property {Number} [duration = Number]
	 * @android
	 * @ios
	 * @since 4.4.1
	 */
	get isShowing(): boolean

    /**
	 * Add an action to toast.
	 * @param {String} title of action.
	 * @param {void} callback function called when user tapped action.
	 * @android
	 * @ios
	 * @since 4.4.1
	 */
    createAction(title: string, callback: () => void): void;
	/**
	 * This function called when displayed toast dismissed.
	 * @param {void} callback function called when toast dismissed.
	 * @android
	 * @ios
	 * @since 4.4.1
	 */
    onDismissed(callback: void);
	/**
	 *  This method shows the toast on the screen.
	 * @android
	 * @ios
	 * @since 4.4.1
	 */
    show(): void;
	/**
	 * Dismisses the Toast, isShowing property set to false after this operation.
	 * @android
	 * @ios
	 * @since 4.4.1
	 */
    dismiss(): void;
}



export = Toast;