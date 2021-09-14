import IViewEvents from '../../view/events';

declare interface IButtonEvents extends IViewEvents {
    Press: 'press';
    Android: {
        LongPress: 'longPress'
    }
}

export = IButtonEvents;