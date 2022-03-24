import { ViewEvents } from '../view/view-events';

export const SwitchEvents = {
  ...ViewEvents,
  ToggleChanged: 'toggleChanged'
} as const;

export type SwitchEvents = ExtractValues<typeof SwitchEvents>;
