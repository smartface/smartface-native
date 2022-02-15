import { Point2D } from "sf-core/primitive/point2d";
import Color from "../color";
import { ViewEvents } from "./view-event";
import View, {ViewBase} from "./view";
import { EventType } from "core/eventemitter/EventType";

const Exception = require("../../util").Exception;
const Invocation = require('../../util').Invocation;
const YGUnit = require('../../util').YogaEnums.YGUnit;
const { EventEmitterCreator } = require("../../core/eventemitter");

declare const myLabelTitle: any;


function isInside(frame, point) {
    var x = point.x;
    var y = point.y;
    var w = frame.width;
    var h = frame.height;
    return !(x > w || x < 0 || y > h || y < 0);
}

type ViewIOSParams = {};

export default class ViewIOS<TEvent extends EventType = EventType> extends ViewBase<TEvent> implements View<TEvent> {
    android: {[key: string]: any} = {};
    protected _uniqueId: string;
    protected _maskedBorders = [ViewIOS.Border.TOP_LEFT, ViewIOS.Border.TOP_RIGHT, ViewIOS.Border.BOTTOM_LEFT, ViewIOS.Border.BOTTOM_RIGHT];
    private _rotation: number = 0;
    private _rotationX: number = 0;
    private _rotationY: number = 0;
    private _scale: Point2D = {
        x: 1.0,
        y: 1.0
    };
    onTouchHandler = (e: {point: Point2D}) => {
        const point = {
            x: e ? e.point.x : null,
            y: e ? e.point.y : null
        };
        this._onTouch?.(point);
        this.emitter.emit(ViewEvents.Touch, point);
    };
    onTouchEndedHandler = (e: {point: Point2D}) => {
        const inside = isInside(this.nativeObject.frame, e.point);
        const event = {
            x: e && e.point ? e.point.x : null,
            y: e && e.point ? e.point.y : null,
            isInside: inside
        };
        this._onTouchEnded?.(inside, event);
        this.emitter.emit(ViewEvents.TouchEnded, event);
    };
    onTouchCancelledHandler = (e: {point: Point2D}) => {
        const point = {
            x: e && e.point ? e.point.x : null,
            y: e && e.point ? e.point.y : null
        };
        this._onTouchCancelled?.(point);
        this.emitter.emit(ViewEvents.TouchCancelled, point);
    }
    onTouchMovedHandler = (e: {point: Point2D}) => {
        const inside = isInside(this.nativeObject.frame, e.point);
        const event = {
            x: e && e.point ? e.point.x : null,
            y: e && e.point ? e.point.y : null,
            isInside: inside
        };
        this._onTouchMoved?.(inside, event)
        this.emitter.emit(ViewEvents.TouchMoved, event);
    };
    private gradientColor: any;
    private _parent: View;
    // private EventFunctions = {
    //     // [ViewEvents.Touch]: () => {
    //     //     const onTouchHandler = (e) => {
    //     //         const options = {
    //     //             x: e && e.point ? e.point.x : null,
    //     //             y: e && e.point ? e.point.y : null
    //     //         };
    //     //         this.emitter.emit(ViewEvents.Touch, options);
    //     //     };
    //     //     this.nativeObject.onTouch = onTouchHandler;
    //     // },
    //     // [ViewEvents.TouchCancelled]: () => {
    //     //     const onTouchCancelledHandler = (e) => {
    //     //         const options = {
    //     //             x: e && e.point ? e.point.x : null,
    //     //             y: e && e.point ? e.point.y : null
    //     //         };
    //     //         this.emitter.emit(ViewEvents.TouchCancelled, options);
    //     //     };
    //     //     this.nativeObject.onTouchCancelled = onTouchCancelledHandler;
    //     // },
    //     // [ViewEvents.TouchEnded]: () => {
    //     //     const onTouchEndedHandler = (e) => {
    //     //         const inside = isInside(this.nativeObject.frame, e.point);
    //     //         const options = {
    //     //             x: e && e.point ? e.point.x : null,
    //     //             y: e && e.point ? e.point.y : null,
    //     //             isInside: inside
    //     //         };
    //     //         this.emitter.emit(ViewEvents.TouchEnded, options);
    //     //     };
    //     //     this.nativeObject.onTouchEnded = onTouchEndedHandler;
    //     // },
    //     // [ViewEvents.TouchMoved]: () => {
    //     //     const onTouchMoveHandler = (e) => {
    //     //         const inside = isInside(this.nativeObject.frame, e.point);
    //     //         const options = {
    //     //             x: e && e.point ? e.point.x : null,
    //     //             y: e && e.point ? e.point.y : null,
    //     //             isInside: inside
    //     //         };
    //     //         this.emitter.emit(ViewEvents.TouchMoved, options);
    //     //     };
    //     //     this.nativeObject.onTouchMoved = onTouchMoveHandler;
    //     // }
    // };

    static Border = {
        TOP_LEFT: 1 << 0,
        TOP_RIGHT: 1 << 1,
        BOTTOM_LEFT: 1 << 2,
        BOTTOM_RIGHT: 1 << 3
    } as const;
    
    constructor(params?: Partial<View>) {
        super();

        // EventEmitterCreator(this, this.EventFunctions);
        if (!this.nativeObject) {
            if (params && params.nativeObject) {
                this._nativeObject = params.nativeObject;
            } else {
                this._nativeObject = new __SF_UIView();
            }
        }

        this._uniqueId = this.nativeObject.uuid;

        // Defaults
        this.nativeObject.yoga.isEnabled = true;
        this.nativeObject.layer.masksToBounds = true;
        this.nativeObject.layer.rotationZ = 0;
        this.nativeObject.layer.rotationX = 0;
        this.nativeObject.layer.rotationY = 0;

        this.nativeObject.onTouch = this.onTouchHandler;
        this.nativeObject.onTouchCancelled = this.onTouchCancelledHandler;
        this.nativeObject.onTouchMoved = this.onTouchMovedHandler;
        this.nativeObject.onTouchEnded = this.onTouchEndedHandler;

        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }

    get uniqueId() {
        return this._uniqueId;
    }

    get parent(){
        return this._parent;
    }

    set parent(view: View){
        this._parent = view;
    }

    // get shadowOffset() {
    //     return this.shadowOffset;
    // }

    get nativeObject(){
        return this._nativeObject;
    }

    get accessibilityLabel(){
        return Invocation.invokeInstanceMethod(this.nativeObject, "accessibilityLabel", [], "NSString");
    }
    set accessibilityLabel(value) {
        new Invocation.Argument({
            type: "NSString",
            value: value
        });
        Invocation.invokeInstanceMethod(this.nativeObject, "setAccessibilityLabel:", [this.accessibilityLabel]);
    }

    // TODO: Check that Where does myLabelTitle come from?
    get accessible() {
        return Invocation.invokeInstanceMethod(myLabelTitle.nativeObject, "isAccessibilityElement", [], "BOOL");
    }
    set accessible(value) {
        const isAccessibility = new Invocation.Argument({
            type: "BOOL",
            value: value
        });
        Invocation.invokeInstanceMethod(this.nativeObject, "setIsAccessibilityElement:", [isAccessibility]);
    }


    get ios(){
        const self = this;
        return {
            get shadowOffset() {
                return  self.shadowOffset;
            },
            set shadowOffset(shadowOffset: Point2D) {
                self.shadowOffset  = shadowOffset;
            },
            get shadowRadius() {
                return  self.shadowRadius;
            },
            set shadowRadius(shadowRadius: number) {
                self.shadowRadius = shadowRadius;
            },
            get shadowOpacity() {
                return  self.shadowRadius;
            },
            set shadowOpacity(shadowOpacity: number) {
                self.shadowOpacity = shadowOpacity;
            },
            get shadowColor() {
                return  self.shadowRadius;
            },
            set shadowColor(shadowColor: Color) {
                self.shadowColor = shadowColor;
            },
        }
    };

    // ios
    private get shadowOffset() {
        this.ios.shadowOffset = {x: 10, y: 10};
        var size = Invocation.invokeInstanceMethod(this.nativeObject.layer, "shadowOffset", [], "CGSize");
        return {
            x: size.width,
            y: size.height
        };
    }
    private set shadowOffset(shadowOffset: Point2D) {
        var argShadowOffset = new Invocation.Argument({
            type: "CGSize",
            value: {
                width: shadowOffset.x,
                height: shadowOffset.y
            }
        });
        Invocation.invokeInstanceMethod(this.nativeObject.layer, "setShadowOffset:", [argShadowOffset]);
    }

    // ios
    private get shadowRadius() {
        return Invocation.invokeInstanceMethod(this.nativeObject.layer, "shadowRadius", [], "CGFloat");
    }
    private set shadowRadius(shadowRadius) {
        var argShadowRadius = new Invocation.Argument({
            type: "CGFloat",
            value: shadowRadius
        });
        Invocation.invokeInstanceMethod(this.nativeObject.layer, "setShadowRadius:", [argShadowRadius]);
    }

    // ios
    private get shadowOpacity() {
        return Invocation.invokeInstanceMethod(this.nativeObject.layer, "shadowOpacity", [], "float");
    }
    private set shadowOpacity(shadowOpacity) {
        var argShadowOpacity = new Invocation.Argument({
            type: "float",
            value: shadowOpacity
        });
        Invocation.invokeInstanceMethod(this.nativeObject.layer, "setShadowOpacity:", [argShadowOpacity]);
    }

    // ios
    private get shadowColor() {
        var color = Invocation.invokeInstanceMethod(this.nativeObject.layer, "shadowColor", [], "CGColor");
        return new Color({
            color: color
        });
    }
    private set shadowColor(shadowColor: Color) {
        var argShadowColor = new Invocation.Argument({
            type: "CGColor",
            value: shadowColor.nativeObject
        });
        Invocation.invokeInstanceMethod(this.nativeObject.layer, "setShadowColor:", [argShadowColor]);
    }

    // ios 
    private get exclusiveTouch() {
        return Invocation.invokeInstanceMethod(this.nativeObject, "isExclusiveTouch", [], "BOOL");
    }
    private set exclusiveTouch(value) {
        var argExclusiveTouch = new Invocation.Argument({
            type: "BOOL",
            value: value
        });
        Invocation.invokeInstanceMethod(this.nativeObject, "setExclusiveTouch:", [argExclusiveTouch]);
    }

    // TODO: ios da olacak
    // private get masksToBounds() {
    //     return this.masksToBounds;
    // }
    // private set masksToBounds(value) {
    //     this.masksToBounds = value;
    // }


    get masksToBounds() {
        return this.nativeObject.layer.masksToBounds;
    }
    set masksToBounds(value) {
        this.nativeObject.layer.masksToBounds = value;
    }

    // ios
    private get clipsToBounds() {
        return this.nativeObject.valueForKey("clipsToBounds");
    }
    private set clipsToBounds(value) {
        this.nativeObject.setValueForKey(value, "clipsToBounds");
    }



    get borderColor() {
        return new Color({
            color: this.nativeObject.layer.borderUIColor
        });
    }
    set borderColor(value) {
        this.nativeObject.layer.borderUIColor = value.nativeObject;
    }

    get alpha() {
        return this.nativeObject.alpha;
    }
    set alpha(value) {
        if (typeof value === "number") {
            this.nativeObject.alpha = value;
        } else {
            throw new TypeError(Exception.TypeError.NUMBER);
        }
    }

    get borderRadius() {
        return this.nativeObject.layer.cornerRadius;
    }
    set borderRadius(value) {
        this.nativeObject.layer.cornerRadius = value;
    }

    get maskedBorders() {
        return this._maskedBorders;
    }
    set maskedBorders(value) {
        var corners = 0;
        for (var i = 0; i < value.length; i++) {
            corners = corners | value[i];
        }
        this._maskedBorders = value;
        this.nativeObject.layer.maskedCorners = corners;
    }

    get backgroundColor() {
        
            return new Color({
                color: this.nativeObject.backgroundColor
            });
        }
    set backgroundColor(value) {
        if (value.nativeObject.constructor.name === "CAGradientLayer") {
            if (!this.gradientColor) {
                this.nativeObject.addFrameObserver();
                this.nativeObject.frameObserveHandler = function (e) {
                    if (this.nativeObject.frame.width === 0 || this.nativeObject.frame.height === 0) {
                        return;
                    }
                    this.gradientColor.frame = e.frame;
                    this.nativeObject.backgroundColor = this.gradientColor.layerToColor();
                }
            }
            this.gradientColor = value.nativeObject;
            if (this.nativeObject.frame.width === 0 || this.nativeObject.frame.height === 0) {
                return;
            }
            this.gradientColor.frame = this.nativeObject.frame;
            this.nativeObject.backgroundColor = this.gradientColor.layerToColor();
        } else {
            if (this.gradientColor) {
                this.nativeObject.removeFrameObserver();
                this.gradientColor = undefined;
            }
            this.nativeObject.backgroundColor = value.nativeObject;
        }
    }


    get id() {
        return this.nativeObject.tag;
    }
    set id(value) {
        this.nativeObject.tag = value;
    }

    get transitionId() {
        return this.nativeObject.valueForKey("heroID");
    }
    set transitionId(value) {
        if (typeof value === "string") {
            this.nativeObject.setValueForKey(value, "heroID");
        }
    }

    get rotation() {
        return this._rotation;
    }
    set rotation(value) {
        this._rotation = value;
        this.nativeObject.layer.rotationZ = this._rotation * (Math.PI / 180);
        this.nativeObject.layer.rotate();
    }

    get rotationX() {
        return this._rotationX;
    }
    set rotationX(value) {
        this._rotationX = value;
        this.nativeObject.layer.rotationX = this._rotationX * (Math.PI / 180);
        this.nativeObject.layer.rotate();
    }

    // var _rotationY = 0;
    get rotationY() {
        return this._rotationY;
    }
    set rotationY(value) {
        this._rotationY = value;
        this.nativeObject.layer.rotationY = this._rotationY * (Math.PI / 180);
        this.nativeObject.layer.rotate();
    }

    get visible() {
        return this.nativeObject.visible;
    }
    set visible(value) {
        this.nativeObject.visible = value;
    }

    get scale() {
        return this._scale;
    }
    set scale(value) {
        this._scale = value;
        this.nativeObject.scale({
            scaleX: value.x,
            scaleY: value.y
        });
    }

    get touchEnabled() {
        return this.nativeObject.touchEnabled;
    }
    set touchEnabled(value) {
        this.nativeObject.touchEnabled = value;
    }


    getPosition() {
        return {
            left: this.left,
            top: this.top,
            width: this.width,
            height: this.height
        };
    }

    flipHorizontally() {
        this.nativeObject.flipHorizontally();
    }


    flipVertically() {
        this.nativeObject.flipVertically();
    }

    setPosition(position) {
        this.left = position.left;
        this.top = position.top;
        this.width = position.width;
        this.height = position.height;
    }

    //Issue: IOS-2340
    bringToFront() {
        var parent = this.getParent();
        if (parent) {
            var maxZPosition = 0;
            for (var subview in parent.nativeObject.subviews) {
                var zPosition = Invocation.invokeInstanceMethod(parent.nativeObject.subviews[subview].layer, "zPosition", [], "CGFloat");
                if (zPosition > maxZPosition) {
                    maxZPosition = zPosition
                }
            }
            var argZPosition = new Invocation.Argument({
                type: "CGFloat",
                value: maxZPosition + 1
            });
            Invocation.invokeInstanceMethod(this.nativeObject.layer, "setZPosition:", [argZPosition]);
        }
    };

    getParent() {
        return this._parent ? this._parent : null;
    };

    getScreenLocation(){
        var viewOrigin = {
            x: this.nativeObject.bounds.x,
            y: this.nativeObject.bounds.y
        };
        var origin = new Invocation.Argument({
            type: "CGPoint",
            value: viewOrigin
        });

        var view = new Invocation.Argument({
            type: "id",
            value: undefined
        });

        var screenOrigin = Invocation.invokeInstanceMethod(this.nativeObject, "convertPoint:toView:", [origin, view], "CGPoint");
        return screenOrigin;
    }

    get onTouch() {        
        return this._onTouch;
    }
    set onTouch(value) {
        if (typeof value !== 'function') {
            return;
        };
        this._onTouch = value;
        var onTouchHandler = function (e) {
            if (e && e.point) {
                var object = {
                    x: e.point.x,
                    y: e.point.y
                };
                return value.call(this, object);
            } else {
                return value.call(this);
            }
        };
        this.nativeObject.onTouch = onTouchHandler.bind(this);
    }

    get onTouchEnded() {
        return this._onTouchEnded;
    }
    
    set onTouchEnded(value) {
        if (typeof value !== 'function') {
            return;
        };
        this._onTouchEnded = value;
        var onTouchEndedHandler = function (e) {
            if (e && e.point) {
                var inside = isInside(this.nativeObject.frame, e.point);
                var object = {
                    isInside: inside,
                    x: e.point.x,
                    y: e.point.y
                };
                return value.call(this, inside, object);
            } else {
                return value.call(this);
            }
        };
        this.nativeObject.onTouchEnded = onTouchEndedHandler.bind(this);
    }

    get onTouchMoved() {
        return this._onTouchMoved;
    }
    set onTouchMoved(value) {
        if (typeof value !== 'function') {
            return;
        };
        var onTouchMoveHandler = function (e) {
            if (e && e.point) {
                var inside = isInside(this.nativeObject.frame, e.point);
                var object = {
                    isInside: inside,
                    x: e.point.x,
                    y: e.point.y
                };
                return value.call(this, inside, object);
            } else {
                return value.call(this);
            }
        };
        this.nativeObject.onTouchMoved = onTouchMoveHandler.bind(this);
    }
    get onTouchCancelled() {
        return this._onTouchCancelled;
    }
    set onTouchCancelled(value) {
        if (typeof value !== 'function') {
            return;
        };
        var onTouchCancelledHandler = function (e) {
            if (e && e.point) {
                var object = {
                    x: e.point.x,
                    y: e.point.y
                };
                return value.call(this, object);
            } else {
                value.call(this);
            }
        };
        this.nativeObject.onTouchCancelled = onTouchCancelledHandler.bind(this);
    }


    //////////////////////////////////////////////////////////////////////////
    // YOGA STUFF START
    //////////////////////////////////////////////////////////////////////////

    /*
     The property that decides if we should include this view when calculating layout. Defaults to YES.
     */
    get isIncludedInLayout() {
        return this.nativeObject.yoga.isIncludedInLayout;
    }
    set isIncludedInLayout(value) {
        this.nativeObject.yoga.isIncludedInLayout = value;
    }

    /*
     The property that decides during layout/sizing whether or not styling properties should be applied. Defaults to NO.
     */
    get flexEnabled() {
        return this.nativeObject.yoga.isEnabled;
    }
    set flexEnabled(value) {
        this.nativeObject.yoga.isEnabled = value;
    }

    get direction() {
        return this.nativeObject.yoga.direction;
    }
    set direction(value) {
        this.nativeObject.yoga.direction = value;
    }

    get flexDirection() {
        return this.nativeObject.yoga.flexDirection;
    }

    set flexDirection(value) {
        this.nativeObject.yoga.flexDirection = value;
    }

    get justifyContent() {
        return this.nativeObject.yoga.justifyContent;
    }

    set justifyContent(value) {
        this.nativeObject.yoga.justifyContent = value;
    }

    get alignContent() {
        return this.nativeObject.yoga.alignContent;
    }

    set alignContent(value) {
        this.nativeObject.yoga.alignContent = value;
    }

    get alignItems() {
        return this.nativeObject.yoga.alignItems;
    }

    set alignItems(value) {
        this.nativeObject.yoga.alignItems = value;
    }

    get alignSelf() {
        return this.nativeObject.yoga.alignSelf;
    }

    set alignSelf(value) {
        this.nativeObject.yoga.alignSelf = value;
    }

    get positionType() {
        return this.nativeObject.yoga.position;
    }

    set positionType(value) {
        this.nativeObject.yoga.position = value;
    }

    get flexWrap() {
        return this.nativeObject.yoga.flexWrap;
    }

    set flexWrap(value) {
        this.nativeObject.yoga.flexWrap = value;
    }

    get display() {
        return this.nativeObject.yoga.display;
    }
    
    set display(value) {
        this.nativeObject.yoga.display = value;
    }
    get flexGrow() {
        return this.nativeObject.yoga.flexGrow;
    }

    set flexGrow(value) {
        this.nativeObject.yoga.flexGrow = value;
        if (value > 0) {
            this.flexBasis = 1;
        } else if (value === 0) { // Workaround Bug iOS / IOS-2406
            this.flexBasis = NaN;
            if (this.nativeObject.superview && this.nativeObject.superview.yoga.isEnabled) {
                if (this.nativeObject.superview.yoga.flexDirection === 0 || this.nativeObject.superview.yoga.flexDirection === 1) {
                    var height = this.nativeObject.yoga.getYGValueForKey("height");
                    if (isNaN(height)) {
                        this.nativeObject.frame = {
                            x: this.left,
                            y: this.top,
                            width: this.width,
                            height: 0
                        };
                    }
                } else {
                    var width = this.nativeObject.yoga.getYGValueForKey("width");
                    if (isNaN(width)) {
                        this.nativeObject.frame = {
                            x: this.left,
                            y: this.top,
                            width: 0,
                            height: this.height
                        };
                    }
                }
            }
        } else {
            this.flexBasis = NaN;
        }
    }

    get flexShrink() {
        return this.nativeObject.yoga.flexShrink;
    }
    
    set flexShrink(value) {
        this.nativeObject.yoga.flexShrink = value;
    }

    get flexBasis() {
        return this.nativeObject.yoga.getYGValueForKey("flexBasis");
    }

    set flexBasis(value) {
        this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "flexBasis");
    }

    /*
    // Left and Top can delete or added after tests
    */

    get left() {
        return this.nativeObject.frame.x;
    }
    set left(value) {
        if (typeof value === "number") {
            this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "left");
        } else {
            throw new TypeError(Exception.TypeError.NUMBER);
        }
    }

    get top() {
        return this.nativeObject.frame.y;
    }
    
    set top(value) {
        if (typeof value === "number") {
            this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "top");
        } else {
            throw new TypeError(Exception.TypeError.NUMBER);
        }
    }
    get right() {
        return this.nativeObject.yoga.getYGValueForKey("right");
    }
    set right(value) {
        if (typeof value === "number") {
            this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "right");
        } else {
            throw new TypeError(Exception.TypeError.NUMBER);
        }
    }

    get bottom() {
        return this.nativeObject.yoga.getYGValueForKey("bottom");
    }

    set bottom(value) {
        if (typeof value === "number") {
            this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "bottom");
        } else {
            throw new TypeError(Exception.TypeError.NUMBER);
        }
    }

    get marginLeft() {
        return this.nativeObject.yoga.getYGValueForKey("marginLeft");
    }

    set marginLeft(value) {
        if (typeof value === "number") {
            this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "marginLeft");
        } else {
            throw new TypeError(Exception.TypeError.NUMBER);
        }
    }

    get marginTop() {
        return this.nativeObject.yoga.getYGValueForKey("marginTop");
    }

    set marginTop(value) {
        if (typeof value === "number") {
            this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "marginTop");
        } else {
            throw new TypeError(Exception.TypeError.NUMBER);
        }
    }

    get marginRight() {
        return this.nativeObject.yoga.getYGValueForKey("marginRight");
    }

    set marginRight(value) {
        if (typeof value === "number") {
            this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "marginRight");
        } else {
            throw new TypeError(Exception.TypeError.NUMBER);
        }
    }

    get marginBottom() {
        return this.nativeObject.yoga.getYGValueForKey("marginBottom");
    }

    set marginBottom(value) {
        if (typeof value === "number") {
            this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "marginBottom");
        } else {
            throw new TypeError(Exception.TypeError.NUMBER);
        }
    }

    get marginStart() {
        return this.nativeObject.yoga.getYGValueForKey("marginStart");
    }

    set marginStart(value) {
        if (typeof value === "number") {
            this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "marginStart");
        } else {
            throw new TypeError(Exception.TypeError.NUMBER);
        }
    }

    get marginEnd() {
        return this.nativeObject.yoga.getYGValueForKey("marginEnd");
    }

    set marginEnd(value) {
        if (typeof value === "number") {
            this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "marginEnd");
        } else {
            throw new TypeError(Exception.TypeError.NUMBER);
        }
    }   

    get marginHorizontal() {
        return this.nativeObject.yoga.getYGValueForKey("marginHorizontal");
    }

    set marginHorizontal(value) {
        if (typeof value === "number") {
            this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "marginHorizontal");
        } else {
            throw new TypeError(Exception.TypeError.NUMBER);
        }
    }

    get marginVertical() {
        return this.nativeObject.yoga.getYGValueForKey("marginVertical");
    }

    set marginVertical(value) {
        if (typeof value === "number") {
            this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "marginVertical");
        } else {
            throw new TypeError(Exception.TypeError.NUMBER);
        }
    }

    get margin() {
        return this.nativeObject.yoga.getYGValueForKey("margin");
    }

    set margin(value) {
        if (typeof value === "number") {
            this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "margin");
        } else {
            throw new TypeError(Exception.TypeError.NUMBER);
        }
    }

    get paddingLeft() {
        return this.nativeObject.yoga.getYGValueForKey("paddingLeft");
    }

    set paddingLeft(value) {
        this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "paddingLeft");
    }

    get paddingTop() {
        return this.nativeObject.yoga.getYGValueForKey("paddingTop");
    }

    set paddingTop(value) {
        this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "paddingTop");
    }

    get paddingRight() {
        return this.nativeObject.yoga.getYGValueForKey("paddingRight");
    }

    set paddingRight(value) {
        this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "paddingRight");
    }

    get paddingBottom() {
        return this.nativeObject.yoga.getYGValueForKey("paddingBottom");
    }

    set paddingBottom(value) {
        this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "paddingBottom");
    }

    get paddingStart() {
        return this.nativeObject.yoga.getYGValueForKey("paddingStart");
    }

    set paddingStart(value) {
        this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "paddingStart");
    }

    get paddingEnd() {
        return this.nativeObject.yoga.getYGValueForKey("paddingEnd");
    }

    set paddingEnd(value) {
        this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "paddingEnd");
    }

    get paddingHorizontal() {
        return this.nativeObject.yoga.getYGValueForKey("paddingHorizontal");
    }

    set paddingHorizontal(value) {
        this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "paddingHorizontal");
    }

    get paddingVertical() {
        return this.nativeObject.yoga.getYGValueForKey("paddingVertical");
    }

    set paddingVertical(value) {
        this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "paddingVertical");
    }

    get padding() {
        return this.nativeObject.yoga.getYGValueForKey("padding");
    }

    set padding(value) {
        this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "padding");
    }

    get borderLeftWidth() {
        return this.nativeObject.yoga.borderLeftWidth;
    }

    set borderLeftWidth(value) {
        this.nativeObject.yoga.borderLeftWidth = value;
    }

    get borderTopWidth() {
        return this.nativeObject.yoga.borderTopWidth;
    }

    set borderTopWidth(value) {
        this.nativeObject.yoga.borderTopWidth = value;
    }

    get borderRightWidth() {
        return this.nativeObject.yoga.borderRightWidth;
    }

    set borderRightWidth(value) {
        this.nativeObject.yoga.borderRightWidth = value;
    }

    get borderBottomWidth() {
        return this.nativeObject.yoga.borderBottomWidth;
    }

    set borderBottomWidth(value) {
        this.nativeObject.yoga.borderBottomWidth = value;
    }

    get borderStartWidth() {
        return this.nativeObject.yoga.borderStartWidth;
    }

    set borderStartWidth(value) {
        this.nativeObject.yoga.borderStartWidth = value;
    }

    get borderEndWidth() {
        return this.nativeObject.yoga.borderEndWidth;
    }

    set borderEndWidth(value) {
        this.nativeObject.yoga.borderEndWidth = value;
    }

    get borderWidth() {
        return this.nativeObject.yoga.borderWidth;
    }

    set borderWidth(value) {
        // Native object's layer must be updated!
        // Yoga's borderWidth property only effects positioning of its child view.
        this.nativeObject.layer.borderWidth = value;
        this.nativeObject.yoga.borderWidth = value;
    }

    /*
    // Width and Height can delete or added after tests
    */

    get width() {
        return this.nativeObject.frame.width;
    }
    
    set width(value) {
        if (typeof value === "number") {
            this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "width");
        } else {
            throw new TypeError(Exception.TypeError.NUMBER);
        }
    }

    get height() {
        return this.nativeObject.frame.height;
    }

    set height(value) {
        if (typeof value === "number") {
            this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "height");
        } else {
            throw new TypeError(Exception.TypeError.NUMBER);
        }
    }

    get minWidth() {
        return this.nativeObject.yoga.getYGValueForKey("minWidth");
    }
    set minWidth(value) {
        if (typeof value === "number") {
            this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "minWidth");
        } else {
            throw new TypeError(Exception.TypeError.NUMBER);
        }
    }

    get minHeight() {
        return this.nativeObject.yoga.getYGValueForKey("minHeight");
    }

    set minHeight(value) {
        if (typeof value === "number") {
            this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "minHeight");
        } else {
            throw new TypeError(Exception.TypeError.NUMBER);
        }
    }

    get maxWidth() {
        return this.nativeObject.yoga.getYGValueForKey("maxWidth");
    }

    set maxWidth(value) {
        if (typeof value === "number") {
            this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "maxWidth");
        } else {
            throw new TypeError(Exception.TypeError.NUMBER);
        }
    }

    get maxHeight() {
        return this.nativeObject.yoga.getYGValueForKey("maxHeight");
    }

    set maxHeight(value) {
        if (typeof value === "number") {
            this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "maxHeight");
        } else {
            throw new TypeError(Exception.TypeError.NUMBER);
        }
    }

    get testId() {
        return this.nativeObject.valueForKey("accessibilityIdentifier");
    }

    set testId(value) {
        this.nativeObject.setValueForKey(value, 'accessibilityIdentifier');
    }

    // Yoga specific properties, not compatible with flexbox specification
    get aspectRatio() {
        return this.nativeObject.yoga.aspectRatio;
    }

    set aspectRatio(value) {
        this.nativeObject.yoga.aspectRatio = value;
    }

    /*
     Get the resolved direction of this node. This won't be YGDirectionInherit
     */
    get resolvedDirection() {
        return this.nativeObject.yoga.resolvedDirection;
    }

    /*
     Perform a layout calculation and update the frames of the views in the hierarchy with the results
     */
    applyLayout() {
        this.nativeObject.yoga.applyLayoutPreservingOrigin(false);
    }

    /*
     Returns the size of the view if no constraints were given. This could equivalent to calling [self sizeThatFits:CGSizeMake(CGFLOAT_MAX, CGFLOAT_MAX)];
     */
    get intrinsicSize() {
        return this.nativeObject.yoga.intrinsicSize;
    }

    /*
     Returns the number of children that are using Flexbox.
     */
    get numberOfChildren() {
        return this.nativeObject.yoga.numberOfChildren;
    }

    /*
     Return a BOOL indiciating whether or not we this node contains any subviews that are included in Yoga's layout.
     */
    get isLeaf() {
        return this.nativeObject.yoga.isLeaf;
    }

    /*
     Mark that a view's layout needs to be recalculated. Only works for leaf views.
     */
    dirty(){
        this.nativeObject.yoga.markDirty();
    }

    //////////////////////////////////////////////////////////////////////////
    // YOGA STUFF END
    //////////////////////////////////////////////////////////////////////////

    static readonly ios = {
        get viewAppearanceSemanticContentAttribute(){
            return __SF_UIView.viewAppearanceSemanticContentAttribute();
        },
        set viewAppearanceSemanticContentAttribute(value) {
            var userDefaults = new __SF_NSUserDefaults("SF_USER_DEFAULTS"); // For application-iOS.js Application Direction Manager
            userDefaults.setObjectForKey(value, "smartface.ios.viewAppearanceSemanticContentAttribute");
            userDefaults.synchronize();
    
            // __SF_UIView.setViewAppearanceSemanticContentAttribute(value);
        },
        performWithoutAnimation(functionWithoutAnimation) {
            __SF_UIView.performWithoutAnimationWrapper(functionWithoutAnimation);
        }
    };
    static readonly iOS = {
        SemanticContentAttribute: {
            AUTO: 0,
            FORCELEFTTORIGHT: 3,
            FORCERIGHTTOLEFT: 4
        } as const
    }
}
