import { IEventEmitter } from 'core/eventemitter';
import Color from '../color';
import Font from '../font';
import Image from '../image';

declare enum Events {
  Press = 'press'
}
declare class SwipeItem implements IEventEmitter<typeof Events> {
  constructor(params?: Partial<SwipeItem>);
  on(eventName: typeof Events, callback: (...args: any) => void): () => void;
  once(eventName: typeof Events, callback: (...args: any) => void): () => void;
  off(eventName: typeof Events, callback?: (...args: any) => void): void;
  emit(event: typeof Events, detail?: any[]): void;
  text: string;
  backgroundColor: Color;
  textColor: Color;
  icon: undefined | Image;
  font: Font;
  onPress: (params: { index: number }) => void;
  public readonly ios: Partial<{
    isAutoHide: boolean;
    padding: number;
    iconTextSpacing: number;
  }>;
  public readonly android: Partial<{
    borderBottomLeftRadius: number;
    borderBottomRightRadius: number;
    borderTopLeftRadius: number;
    borderTopRightRadius: number;
    paddingTop: number;
    paddingBottom: number;
    paddingLeft: number;
    paddingRight: number;
    threshold: number;
  }>;
  static Events: Events;
}

export = SwipeItem;
