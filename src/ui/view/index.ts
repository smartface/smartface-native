import { ConstructorOf } from '../../core/constructorof';
import { WithMobileOSProps } from '../../core/native-mobile-component';
import { IView, IViewProps, ViewIOSProps, ViewAndroidProps, AbstractView } from './view';
import { ViewEvents } from './view-events';

const View: typeof AbstractView = require(`./view.${Device.deviceOS.toLowerCase()}`).default;
type View<
  TEvent extends string = ViewEvents,
  TNative extends { [key: string]: any } = { [key: string]: any },
  TMobile extends WithMobileOSProps<IViewProps, ViewIOSProps, ViewAndroidProps> = WithMobileOSProps<IViewProps, ViewIOSProps, ViewAndroidProps>
> = IView<TEvent, TNative, TMobile>;
export default View;
