import { IEventEmitter } from "core/eventemitter";
import Color from "../color";
import Image from "../image";

declare enum Events {
  Click = "click"
}
declare class FloatingMenuItem implements IEventEmitter<Events> {
  constructor(params?: any);
  on(eventName: Events, callback: (...args: any) => void): () => void;
  off(eventName: Events, callback?: (...args: any) => void): void;
  emit(event: Events, detail?: any[]): void;
  title: string;
  titleColor: Color;
  icon: Image;
  color: Color;
  /**
   * @deprecated
   */
  onClick: () => void;
  static Events: typeof Events;
}

export = FloatingMenuItem;
