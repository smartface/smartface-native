import { PageEvents } from '../page/page-events';

export const TabBarControllerEvents = {
  /**
   * This event called when a tab is chosen by the user.
   *
   * @event onSelected
   * @param index
   * @android
   * @ios
   * @since 3.2.0
   */
  Selected: 'selected',
  ...PageEvents
} as const;

export type TabBarControllerEvents = ExtractValues<typeof TabBarControllerEvents>;
