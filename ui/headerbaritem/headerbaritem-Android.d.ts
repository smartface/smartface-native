export = HeaderBarItem;
declare function HeaderBarItem(params: any): void;
declare class HeaderBarItem {
    constructor(params?: any);
    ios: {};
    assignRules: (badge: any) => void;
    addToHeaderView: (badge: any) => void;
    __setTitle: (title: any) => void;
    getScreenLocation: () => {
        x: any;
        y: any;
    };
}
declare namespace HeaderBarItem {
    export { itemColor, iOS };
}
declare var itemColor: any;
declare namespace iOS {
    export const SystemItem: {};
}
