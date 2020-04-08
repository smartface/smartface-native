export declare class Contact {
    constructor(params?: any);
    contact: {
        phoneNumbers: number[] | string[];
        emailAddresses: string[];
        addresses: string[];
        urlAddresses: string[];
        firstName: string,
        lastName: string,
        middleName: string,
        namePrefix: string,
        nameSuffix: string,
    };
    onSuccess: () => void;
    onFailure: () => void;
}
