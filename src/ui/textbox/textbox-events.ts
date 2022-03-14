import { ViewEvents } from '../view/view-event';

export const TextBoxEvents = {
  ActionButtonPress: 'actionButtonPress',
  ClearButtonPress: 'clearButtonPress',
  EditBegins: 'editBegins',
  EditEnds: 'editEnds',
  TextChanged: 'textChanged',
  ...ViewEvents
} as const;

export type TextBoxEvents = ExtractValues<typeof TextBoxEvents>;
