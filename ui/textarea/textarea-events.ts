import { TextBoxEvents } from '../textbox/textbox-events';

export const TextAreaEvents = {
  ...TextBoxEvents
} as const;

export type TextAreaEvents = ExtractValues<typeof TextAreaEvents>;
