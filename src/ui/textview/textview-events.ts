import { ViewEvents } from '../view/view-events';

export const TextViewEvents = {
  /**
   * This event is called when user click link string. onLinkClick just work with attributedText.
   *
   *     @example
   *     myTextView.on(Events.LinkClick, function(string) {
   *         console.log(string);
   *     });
   *
   * @param {String} string
   * @event onLinkClick
   * @android
   * @ios
   * @since 3.0.0
   */
  LinkClick: 'linkClick',
  ...ViewEvents
} as const;

export type TextViewEvents = ExtractValues<typeof TextViewEvents>;
