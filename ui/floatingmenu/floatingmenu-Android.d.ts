export = FloatingMenu;
declare function FloatingMenu(params: any): void;
declare class FloatingMenu {
    constructor(params?: any);
    yogaNode: any;
    nativeObject: any;
    open: () => void;
    close: () => void;
}
declare namespace FloatingMenu {
    export const Item: typeof import("./floatingMenuItem");
}
