import { IEventEmitter } from "core/eventemitter";
import View from "../view";

export declare enum ViewGroupEvents {
    ViewAdded = "viewAdded",
    ViewRemoved = "viewRemoved",
    ChildViewAdded = "childViewAdded",
    ChildViewRemoved = "childViewRemoved"
}
declare namespace ViewGroup {
    const Events: typeof ViewGroupEvents & typeof View.Events
    type Events = typeof Events
}

export = ViewGroup;