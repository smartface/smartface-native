export interface IViewState<Property = any> {
  normal?: Property;
  disabled?: Property;
  selected?: Property;
  pressed?: Property;
  focused?: Property;
}

type ViewState<Property = any> = IViewState<Property> | Property;

export default ViewState;
