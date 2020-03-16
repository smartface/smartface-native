export = HeaderBarItem;
declare function HeaderBarItem(params: any): void;
declare class HeaderBarItem {
    constructor(params?: any);
    ios: {};
    getScreenLocation: () => any;
}
declare namespace HeaderBarItem {
    export namespace iOS {
        export namespace SystemItem {
            export const DONE: number;
            export const CANCEL: number;
            export const EDIT: number;
            export const SAVE: number;
            export const ADD: number;
            export const FLEXIBLESPACE: number;
            export const FIXEDSPACE: number;
            export const COMPOSE: number;
            export const REPLY: number;
            export const ACTION: number;
            export const ORGANIZE: number;
            export const BOOKMARKS: number;
            export const SEARCH: number;
            export const REFRESH: number;
            export const STOP: number;
            export const CAMERA: number;
            export const TRASH: number;
            export const PLAY: number;
            export const PAUSE: number;
            export const REWIND: number;
            export const FASTFORWARD: number;
            export const UNDO: number;
            export const REDO: number;
        }
    }
}
