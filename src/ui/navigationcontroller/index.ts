import { ControllerPresentParams } from '../../util/Android/transition/viewcontroller';
import { HeaderBar } from './headerbar';
import { AbstractNavigationController, Controller, IController, OperationType } from './navigationcontroller';

declare class NavigationControllerImpl extends AbstractNavigationController {
  present(params?: ControllerPresentParams): void;
  dismiss(params?: { onComplete: () => void }): void;
  push(params: { controller: IController<any>; animated?: boolean | undefined }): void;
  pop(params?: { animated?: boolean | undefined }): void;
  popTo(params: { controller: IController<any>; animated?: boolean | undefined }): void;
  getCurrentController(): IController<any> | null;
  show(params?: { controller: IController<any>; animated: any; isComingFromPresent?: boolean | undefined; onCompleteCallback?: (() => void) | undefined }): void;
  childControllers: Controller[];
  willShow: (params: { controller: Controller; animated?: boolean | undefined }) => void;
  onTransition: (e: { controller: Controller; operation: OperationType; currentController?: Controller | undefined; targetController?: Controller | undefined }) => void;
  headerBar: HeaderBar;
  get isActive(): boolean;
  set isActive(value: boolean);
  protected createNativeObject(params?: Partial<Record<string, any>>);
  constructor(params?: Partial<AbstractNavigationController>);
}

const NavigationController: typeof NavigationControllerImpl = require(`./navigationcontroller.${Device.deviceOS.toLowerCase()}`).default;
type NavigationController = NavigationControllerImpl;
export default NavigationController;
