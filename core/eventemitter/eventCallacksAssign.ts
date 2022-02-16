import { INativeComponent } from '../../core/inative-component';
import { IEventEmitter } from './event-emitter';

export function eventCallacksAssign(targetInstance: INativeComponent & IEventEmitter, eventFunctions: { [key: string]: (...params: any[]) => void; }, eventCallback = () => { }) {
  Object.keys(eventFunctions).forEach(event => {
    targetInstance.nativeObject[`on${event}`] = (...params: any[]) => {
      eventFunctions[event].bind(targetInstance);
      targetInstance.emit(event, ...params);
    };
  });
}
