import ViewState, { IViewState } from '../ui/shared/viewState';

export default function isViewState<Property>(value: ViewState<Property>): value is IViewState<Property> {
  return (value as IViewState<Property>).normal !== undefined;
}
