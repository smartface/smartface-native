import { EventType } from "./EventType";

export type ExtractEventValues<
  TEvent extends EventType
> = Uncapitalize<TEvent extends { [key: string]: string } ? ExtractValues<TEvent> : TEvent>;
