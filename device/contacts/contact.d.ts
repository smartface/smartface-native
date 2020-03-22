export declare class Contact {
	constructor(params?: any);
	contact: {
		displayName: string;
		phoneNumber: string | string[];
		email: string;
		address: string;
	};
	onSuccess: () => void;
	onFailure: () => void;
}
