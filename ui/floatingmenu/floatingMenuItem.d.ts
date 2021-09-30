import { IEventEmitter } from "core/eventemitter";
import Color from "../color";
import Image from "../image";

declare enum Events {
  Click = "click"
}
declare class FloatingMenuItem implements IEventEmitter<typeof Events> {
  constructor(params?: any);
  on(eventName: typeof Events, callback: (...args: any) => void): () => void;
  off(eventName: typeof Events, callback?: (...args: any) => void): void;
  emit(event: typeof Events, detail?: any[]): void;
  title: string;
  titleColor: Color;
  icon: Image;
  color: Color;
  /**
   * @deprecated
   */
  onClick: () => void;
  static Events: Events;
}

export = FloatingMenuItem;
