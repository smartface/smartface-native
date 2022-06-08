import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { MobileOSProps } from '../../core/native-mobile-component';
import { IView, AbstractView, ViewAndroidProps, ViewIOSProps } from '../view/view';
import { ViewGroupEvents } from './viewgroup-events';

export interface ViewGroupIOSProps extends ViewIOSProps {}

export interface ViewGroupAndroidProps extends ViewAndroidProps {
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
}
/**
 * @class UI.ViewGroup
 * @since 0.1
 * @extends UI.View
 * A ViewGroup is a view that can contain other views (called children).
 * ViewGroup is parent class of all layouts. ViewGroup is an abstract class. You can't create instance from it.
 *
 *     @example
 *     import FlexLayout from '@smartface/native/ui/flexlayout';
 *     import Label from '@smartface/native/ui/label';
 *     var myFlexLayout = new FlexLayout();
 *     var myLabel = new Label({
 *          text: "Smartface Label"
 *     });
 *     myFlexLayout.addChild(myLabel);
 */

export interface IViewGroup<
  TEvent extends string = ViewGroupEvents,
  TNative = any,
  TMobileProps extends MobileOSProps<ViewGroupIOSProps, ViewGroupAndroidProps> = MobileOSProps<ViewGroupIOSProps, ViewGroupAndroidProps>
> extends IView<TEvent | ViewGroupEvents, TNative, TMobileProps> {
  /**
   * This function adds a child view to a viewgroup.
   *
   * @param {UI.View} view The child view to add.
   * @android
   * @ios
   * @method addChild
   * @since 0.1
   */
  addChild(view: IView): void;
  /**
   * Remove a child view from viewgroup.
   *
   * @param {UI.View} view The child view to remove.
   * @android
   * @ios
   * @method removeChild
   * @since 0.1
   */
  removeChild(view: IView): void;
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
  getChildList(): IView[];

  /**
   * Finds a child view with specified id within the layout.
   *
   *     @example
   *     import FlexLayout from '@smartface/native/ui/flexlayout';
   *     import Label from '@smartface/native/ui/label';
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
   * @deprecated
   * @example
   * ```
   * import ViewGroup from '@smartface/native/ui/viewgroup';
   *
   * const viewGroup = new ViewGroup();
   * viewGroup.on(ViewGroup.Events.ViewAdded, (params) => {
   *  console.info('onViewAdded', params);
   * });
   * ```
   */
  onViewAdded: (view: IView) => void;
  /**
   * This event is called when a view removed from this view's hierarchy.
   *
   * @param {UI.View} view The subview that will be removed.
   * @deprecated
   * @event onViewRemoved
   * @android
   * @ios
   * @since 1.1.8
   * @example
   * ```
   * import ViewGroup from '@smartface/native/ui/viewgroup';
   *
   * const viewGroup = new ViewGroup();
   * viewGroup.on(ViewGroup.Events.ViewRemoved, (params) => {
   *  console.info('onViewRemoved', params);
   * });
   * ```
   */
  onViewRemoved: (view: IView) => void;
  on(eventName: 'viewAdded', callback: (view: IView) => void): () => void;
  on(eventName: 'viewRemoved', callback: (view: IView) => void): () => void;
  on(eventName: ViewGroupEvents, callback: (...args: any[]) => void): () => void;

  off(eventName: 'viewAdded', callback: (view: IView) => void): void;
  off(eventName: 'viewRemoved', callback: (view: IView) => void): void;
  off(eventName: ViewGroupEvents, callback: (...args: any[]) => void): void;

  emit(eventName: 'viewAdded', view: IView): void;
  emit(eventName: 'viewRemoved', view: IView): void;
  emit(eventName: ViewGroupEvents, ...args: any[]): void;

  once(eventName: 'viewAdded', callback: () => void): (view: IView) => void;
  once(eventName: 'viewRemoved', callback: () => void): (view: IView) => void;
  once(eventName: ViewGroupEvents, callback: (...args: any[]) => void): () => void;

  prependListener(eventName: 'viewAdded', callback: (view: IView) => void): void;
  prependListener(eventName: 'viewRemoved', callback: (view: IView) => void): void;
  prependListener(eventName: ViewGroupEvents, callback: (...args: any[]) => void): void;

  prependOnceListener(eventName: 'viewAdded', callback: (view: IView) => void): void;
  prependOnceListener(eventName: 'viewRemoved', callback: (view: IView) => void): void;
  prependOnceListener(eventName: ViewGroupEvents, callback: (...args: any[]) => void): void;
}

export declare class AbstractViewGroup<TEvent extends string = ViewGroupEvents, TNative = any, TProps extends IViewGroup = IViewGroup>
  extends AbstractView<TEvent, TNative, TProps>
  implements IViewGroup<TEvent>
{
  addChild(view: IView): void;
  removeChild(view: IView): void;
  removeAll(): void;
  getChildCount(): number;
  getChildList(): IView[];
  findChildById(id: string): void;
  onViewAdded: (view: IView) => void;
  onViewRemoved: (view: any) => void;
}
