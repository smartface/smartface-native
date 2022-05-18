import { TextBoxEvents } from '../textbox/textbox-events';

export const MaterialTextBoxEvents = {
  LeftLayoutRectForBounds: 'leftLayoutRectForBounds',
  RightLayoutRectForBounds: 'rightLayoutRectForBounds',
  ...TextBoxEvents
} as const;

export type MaterialTextBoxEvents = ExtractValues<typeof MaterialTextBoxEvents>;
