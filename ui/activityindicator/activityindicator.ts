import { EventType } from 'core/eventemitter/EventType';
import { ExtractEventValues } from 'core/eventemitter/extract-event-values';
import Color from '../color';
import View from '../view/view';
import { ViewEvents } from '../view/view-event';
import ActivityIndicatorIOSComponents from './ios';

export declare interface ActivityIndicator<TEvent extends EventType = typeof ViewEvents>
 extends View<
    TEvent extends string
      ? TEvent | ExtractEventValues<typeof ViewEvents>
      : TEvent & typeof ViewEvents> {
        
        color: Color;

        iOS: typeof ActivityIndicatorIOSComponents
}
