type RemoteUpdateServiceUpdateResult = {
		meta: string;
		newVersion: string;
		revision: string;
		download: (callback: (error: null | string, handlers: {
			updateAll: (calllback: (error: null, status: "success") => void) => void;
			updateCancel: () => void;
		}) => void) => void;
	};

	export = RemoteUpdateServiceUpdateResult;