declare class AlertView extends NativeComponent {
	constructor(params?: Partial<AlertView>);
	isShowing(): any;
	show(): void;
	dismiss(): void;
	addButton(params: any): void;
	addTextBox(params?: {}): void;
	toString(): string;
	set title(arg: string);
	get title(): string;
	set message(arg: string);
	get message(): string;
	set onDismiss(arg: any);
	get onDismiss(): any;
	readonly android: {
		cancellable?: boolean;
		isShowing?: boolean;
	};
	dismiss(): void;
	readonly textBoxes: { text: string }[];
	addButton(params: {
		type: AlertView.Android.ButtonType;
		text: string;
		onClick: () => void;
	}): void;
	addTextBox(params: {
		text: string;
		hint: string;
		isPassword: boolean;
		android: {
			width: number;
			height: number;
			viewSpacings: {
				left: number;
				top: number;
				right: number;
				bottom: number;
			};
		};
		onDismiss(alertView: AlertView): void;
		show(): void;
	}): void;
}
declare namespace AlertView {
	enum ButtonType {
		POSITIVE = 0,
		NEUTRAL = 1,
		NEGATIVE = 2
	}
	namespace Android {
		export enum ButtonType {
			POSITIVE = 0,
			NEUTRAL = 1,
			NEGATIVE = 2
		}
	}
}

export = AlertView;
