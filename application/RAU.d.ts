import RemoteUpdateServiceUpdateResult from "./RemoteUpdateServiceUpdateParamters";

declare const RemoteUpdateService: {
	firstUrl: string;
	secondUrl: string;
	checkUpdate(
		callback: (
			status: null | "No update" | "Unknown Response" | "Unknown Error",
			result: RemoteUpdateServiceUpdateResult | null
		) => void,
		userInfo: string | null
	): void;
};

export = RemoteUpdateService;
