const SliderDrawerState = {};

Object.defineProperty(SliderDrawerState, 'OPEN', {
    value: 0,
    writable: false
});

Object.defineProperty(SliderDrawerState, 'CLOSED', {
    value: 1,
    writable: false
});

Object.defineProperty(SliderDrawerState, 'DRAGGED', {
    value: 2,
    writable: false
});

module.exports = SliderDrawerState;