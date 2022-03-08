import { ViewEvents } from '../view/view-event';

export const SwitchEvents = {
  ...ViewEvents,
  ToggleChanged: 'toggleChanged'
} as const;

export type SwitchEvents = ExtractValues<typeof SwitchEvents>;
