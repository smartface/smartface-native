const NativeR = requireClass("android.R");

const STATE_NORMAL =  [
    NativeR.attr.state_enabled,
    -NativeR.attr.state_pressed,
    -NativeR.attr.state_selected
];
const STATE_DISABLED = [
    -NativeR.attr.state_enabled,
];
const STATE_SELECTED = [
    NativeR.attr.state_enabled,
    NativeR.attr.state_selected
];
const STATE_PRESSED = [
    NativeR.attr.state_pressed,
    NativeR.attr.state_enabled,
];
const STATE_FOCUSED = [
    NativeR.attr.state_focused,
    NativeR.attr.state_enabled,
];
module.exports = {STATE_NORMAL:STATE_NORMAL, STATE_DISABLED: STATE_DISABLED, STATE_SELECTED: STATE_SELECTED, STATE_PRESSED: STATE_PRESSED, STATE_FOCUSED: STATE_FOCUSED};