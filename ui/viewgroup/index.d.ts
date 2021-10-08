import { IEventEmitter } from "core/eventemitter";
import View from "../view";

declare enum ViewGroupEvents {
    ViewAdded = "viewAdded",
    ViewRemoved = "viewRemoved",
    ChildViewAdded = "childViewAdded",
    ChildViewRemoved = "childViewRemoved"
}
declare namespace ViewGroup {
    const Events: typeof ViewGroupEvents & typeof View.Events
    type Events = typeof Events
}

/**
 * @class UI.ViewGroup
 * @since 0.1
 * @extends UI.View
 * A ViewGroup is a view that can contain other views (called children).
 * ViewGroup is parent class of all layouts. ViewGroup is an abstract class. You can't create instance from it.
 *
 *     @example
 *     const FlexLayout = require('@smartface/native/ui/flexlayout');
 *     const Label = require('@smartface/native/ui/label');
 *     var myFlexLayout = new FlexLayout();
 *     var myLabel = new Label({
 *          text: "Smartface Label"
 *     });
 *     myFlexLayout.addChild(myLabel);
 */
declare class ViewGroup<Tevents = ViewGroupEvents> extends View<ViewGroupEvents> {
	on(eventName: string, callback: (...args: any) => void): () => void;
	off(eventName: string, callback?: (...args: any) => void): void;
	emit(event: string, detail?: any[]): void;
    constructor(params?: any)
    /**
     * This function adds a child view to a viewgroup.
     *
     * @param {UI.View} view The child view to add.
     * @android
     * @ios
     * @method addChild
     * @since 0.1
     */
    addChild(view: View): void;
    /**
     * Remove a child view from viewgroup.
     *
     * @param {UI.View} view The child view to remove.
     * @android
     * @ios
     * @method removeChild
     * @since 0.1
     */
    removeChild(view: View): void;
    /**
     * Removes all child views from viewgroup.
     *
     * @method removeAll
     * @android
     * @ios
     * @since 0.1
     */
    removeAll(): void;
    /**
     * Gets the count of children in a viewgroup.
     *
     * @returns {Number} The number of children in the layout, or 0 if there is no child exists within the layout.
     * @method getChildCount
     * @android
     * @ios
     * @since 0.1
     */
    getChildCount(): number;
    /**
     * Gets the array of children inside viewgroup.
     *
     * @returns {UI.View[]}
     * @method getChildList
     * @android
     * @ios
     * @since 3.1.3
     */
    getChildList(): View[];
    /**
     * Called when a child does not want this parent and its ancestors to intercept touch events .
     * This parent should pass this call onto its parents. This parent must obey this request for the duration of the touch
     * 
     * @method requestDisallowInterceptTouchEvent
     * @param {Boolean} disallow
     * @android
     * @since 4.0.3
     */
    requestDisallowInterceptTouchEvent(disallow: boolean): void;
    /**
     * Finds a child view with specified id within the layout.
     *
     *     @example
     *     const FlexLayout = require('@smartface/native/ui/flexlayout');
     *     const Label = require('@smartface/native/ui/label');
     *     var myFlexLayout = new FlexLayout();
     *     var myLabel = new Label({
     *          text: "Smartface Label",
     *          id: 11235
     *     });
     *     myFlexLayout.addChild(myLabel);
     *     var childView = myFlexLayout.findChildById(11235);
     *
     * @param {Number} id The specified id of the view.
     * @returns {UI.View} Founded view within the layout, or null if view does not exists within the layout.
     * @method findChildById
     * @android
     * @ios
     * @since 0.1
     */
    findChildById(id: string): void;
    /**
     * This event is called when a view added to this view's hierarchy.
     *
     * @param {UI.View} view The subview that will be added.
     * @event onViewAdded
     * @android
     * @ios
     * @since 1.1.8
     */
    onViewAdded: (view: View) => void;
    /**
     * This event is called when a view removed from this view's hierarchy.
     *
     * @param {UI.View} view The subview that will be removed.
     * @event onViewRemoved
     * @android
     * @ios
     * @since 1.1.8
     */
    onViewRemoved: (view: View) => void;
}


export = ViewGroup;