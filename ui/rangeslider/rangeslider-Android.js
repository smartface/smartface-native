/*globals requireClass*/
const View = require('../view');
const AndroidConfig = require('../../util/Android/androidconfig');
const NativeSFRangeSlider = requireClass('io.smartface.android.sfcore.ui.rangeslider.SFRangeSlider');
const AndroidUnitConverter = require("../../util/Android/unitconverter.js");
const Events = require('./events');
const { EventEmitterCreator } = require('../../core/eventemitter');
RangeSlider.Events = {...View.Events, ...Events};

RangeSlider.prototype = Object.create(View.prototype);
function RangeSlider(params) {
    if (!this.nativeObject) {
        this.nativeObject = new NativeSFRangeSlider(AndroidConfig.activity);
    }
    View.call(this);

    let _android = {}, _snapStepSize = 1,
        _minValue = 0, _maxValue = 5, _onValueChange, _isTrackRounded = true, _rangeEnabled = true, _maxValueChanged = false;
    Object.defineProperties(this, {
        value: {
            get: () => this.rangeEnabled  ? [this.nativeObject.getLeftPinValue(), this.nativeObject.getRightPinValue()] : [this.nativeObject.getRightPinValue()],
            set: (values = []) => {
                let valueSize = values.length;
                if(this.rangeEnabled  && valueSize === 2){
                    let leftItemValue = (values[0] - this.minValue) / this.snapStepSize,
                    rightItemValue = (values[1] - this.minValue) / this.snapStepSize;
                    this.nativeObject.setRangePinsByIndices(leftItemValue, rightItemValue);
                }
                else if(!this.rangeEnabled  && valueSize === 1){
                    let rightItemValue = (values[0] - this.minValue) / this.snapStepSize;
                    this.nativeObject.setRangePinsByIndices(0 , rightItemValue);
                }
                else
                    throw new Error("Value array length must be "  + (this.rangeEnabled ? "2" : "1"));
            },
            enumerable: true
        },
        snapStepSize: {
            get: () => _snapStepSize,
            set: (value) => {
                _snapStepSize = value;
                this.nativeObject.setTickInterval(value);
            },
            enumerable: true
        },
        minValue: {
            get: () => _minValue,
            set: (value) => { 
                _minValue = value;
                //This workaround is imp. to prevent min > max(default) exeption for first assign.
                if(!_maxValueChanged)
                    this.nativeObject.setTickEnd(_minValue + 5);
                this.nativeObject.setTickStart(_minValue);
            },
            enumerable: true
        },
        maxValue: {
            get: () => _maxValue,
            set: (value) => {
                _maxValue = value;
                this.nativeObject.setTickEnd(_maxValue);
                _maxValueChanged = true;
            },
            enumerable: true
        },
        trackWeight: {
            get: () => _trackWeight,
            set: (value) => {
                _trackWeight = value;
                this.nativeObject.setConnectingLineWeight(AndroidUnitConverter.dpToPixel(_trackWeight));
            },
            enumerable: true
        },
        isTrackRounded: {
            get: () => _isTrackRounded,
            set: (value) => {
                _isTrackRounded = value;
                this.nativeObject.setBarRounded(_isTrackRounded);
            },
            enumerable: true
        },
        rangeEnabled: {
            get: () => _rangeEnabled,
            set: (value) => {
                _rangeEnabled = value;
                this.nativeObject.setRangeBarEnabled(_rangeEnabled);
            },
            enumerable: true
        },
        trackColor: {
            get: () => _trackColor,
            set: (value) => {
                _trackColor = value;
                this.nativeObject.setConnectingLineColor(_trackColor.nativeObject);
            },
            enumerable: true
        },
        outerTrackColor: {
            get: () => _outerTrackColor,
            set: (value) => {
                _outerTrackColor = value;
                this.nativeObject.setBarColor(_outerTrackColor.nativeObject);
            },
            enumerable: true
        },
        onValueChange: {
            get: () => _onValueChange,
            set: (value) => {
                _onValueChange = value;
                this.nativeObject.setOnValueChange({
                    onValueChange: function(leftPinValue, rightPinValue){
                        let param = _rangeEnabled ? [leftPinValue, rightPinValue] : [rightPinValue];
                        _onValueChange && _onValueChange(param);
                    }
                });
            },
            enumerable: true
        },
        android: {
            get: () => _android,
            set: (value) => {
                Object.assign(this.android, value || {});
            }
        }
    });

    const EventFunctions = {
        [Events.ValueChange]: function() {
            _onValueChange = (state) => {
                this.emitter.emit(Events.ValueChange, state);
            }
            this.nativeObject.setOnValueChange({
                onValueChange: function(leftPinValue, rightPinValue){
                    let param = _rangeEnabled ? [leftPinValue, rightPinValue] : [rightPinValue];
                    _onValueChange && _onValueChange(param);
                }
            });
        }
    }
    EventEmitterCreator(this, EventFunctions);

    let _thumbSize = 5, _thumbColor, _thumbBorderColor,
        _thumbBorderWidth, _trackColor, _outerTrackColor,
        _trackWeight, _outerTrackWeight;
    Object.defineProperties(this.android, {
        thumbSize: {
            get: () => _thumbSize,
            set: (value) => {
                _thumbSize = value;
                this.nativeObject.setSelectorSize(AndroidUnitConverter.dpToPixel(_thumbSize));
            },
            enumerable: true
        },
        thumbColor: {
            get: () => _thumbColor,
            set: (value) => {
                _thumbColor = value;
                this.nativeObject.setSelectorColor(_thumbColor.nativeObject);
            },
            enumerable: true
        },
        thumbBorderColor: {
            get: () => _thumbBorderColor,
            set: (value) => {
                _thumbBorderColor = value;
                this.nativeObject.setSelectorBoundaryColor(_thumbBorderColor.nativeObject);
            },
            enumerable: true
        },
        thumbBorderWidth: {
            get: () => _thumbBorderWidth,
            set: (value) => {
                _thumbBorderWidth = value;
                this.nativeObject.setSelectorBoundarySize(AndroidUnitConverter.dpToPixel(_thumbBorderWidth));
            },
            enumerable: true
        },
        outerTrackWeight: {
            get: () => _outerTrackWeight,
            set: (value) => {
                _outerTrackWeight = value;
                this.nativeObject.setBarWeight(AndroidUnitConverter.dpToPixel(_outerTrackWeight));
            },
            enumerable: true
        }
    });

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}
module.exports = RangeSlider;