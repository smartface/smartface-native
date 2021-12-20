import NavigationController from "../navigationcontroller";
import View from "../view";
import Page from "../page";
import BottomTabBar from "../bottomtabbar";
import { IEventEmitter } from "core/eventemitter";

declare enum Events {
    SelectByIndex = "selectByIndex",
    ShouldSelectByIndex = "shouldSelectByIndex"
}

/**
 * @class UI.BottomTabbarController
 * @since 3.2
 * 
 * BottomTabbarController is used for navigating between tab bar items with given tags.
 *
 *     @example
 *     const Page = require('@smartface/native/ui/page');
 *     const BottomTabbarController = require('@smartface/native/ui/bottomtabbarcontroller');
 *     
 *     var bottomTabBarController = new BottomTabBarController();
 *     bottomTabBarController.childControllers = [page1, page2, navigationController1, navigationController2];
 *     bottomTabBarController.selectedIndex = 2;
 *
 *     bottomTabBarController.shouldSelectByIndex = function (e){return true || false}
 *     bottomTabBarController.didSelectByIndex = function (e){}
 *
 * @see https://smartface.github.io/router/class/src/native/BottomTabBarRouter.js~BottomTabBarRouter.html
 */
declare class BottomTabBarController extends NativeComponent implements IEventEmitter<Events> {
	constructor(params?: any);
    on(eventName: Events, callback: (...args: any) => void): () => void;
    once(eventName: Events, callback: (...args: any) => void): () => void;
    off(eventName: Events, callback?: (...args: any) => void): void;
    emit(event: Events, detail?: any[]): void;
	getCurrentController: () => NavigationController | Page;
	shouldSelectViewController: (index: any) => boolean;
    didSelectViewController: (index: any) => void;
    /**
     * Gets/sets child controllers of BottomTabbarController instance.
     *
     * @property {Array} childControllers
     * @android
     * @ios
     * @since 3.2.0
     */
    childControllers: (NavigationController | Page)[];
    /**
     * Gets/sets tab bar view of BottomTabbarController instance.
     *
     * @property {UI.BottomTabBar} tabbar
     * @readonly
     * @android
     * @ios
     * @since 3.2.0
     */
    readonly tabBar: BottomTabBar;

    /**
     * Gets/sets the selected tab bar item.
     *
     * @property Number selectedIndex
     * @android
     * @ios
     * @since 3.2.0
     */
    selectedIndex: number;
    /**
     * Return true if you want the item to be displayed as the selected index.
     *
     * @event shouldSelectByIndex
     * @param params
     * @param Number params.index
     * @return Boolean
     * @android
     * @ios
     * @since 3.2.0
     */
    shouldSelectByIndex(params: { index: number }): boolean;
    /**
     *  Called when an item in the bottom tabbar item is selected.
     *
     * @event didSelectByIndex
     * @param params
     * @param Number params.index
     * @android
     * @ios
     * @since 3.2.0
     */
	didSelectByIndex(params: { index: number }): void;

    static Events: typeof Events;
}

export = BottomTabBarController;
