import { TextViewEvents } from '../textview/textview-events';
import { ViewEvents } from '../view/view-events';

export const TextBoxEvents = {
  ActionButtonPress: 'actionButtonPress',
  ClearButtonPress: 'clearButtonPress',
  EditBegins: 'editBegins',
  EditEnds: 'editEnds',
  TextChanged: 'textChanged',
  ...TextViewEvents
} as const;

export type TextBoxEvents = ExtractValues<typeof TextBoxEvents>;
