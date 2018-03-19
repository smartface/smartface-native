/**
 * @class UI.View
 * @since 0.1
 *
 * View class represents a rectangular area on the screen and it is responsible
 * for event handling. View is the base of all UI classes.
 *
 *     @example
 *     const View = require('sf-core/ui/view');
 *     const Color = require('sf-core/ui/color');
 *     var myView = new View();
 *     myView.width = 300;
 *     myView.height = 500;
 *     myView.top = 50;
 *     myView.left = 50;
 *     myView.backgroundColor = Color.RED;
 * 
 */
function View(params) {}
    
/**
 * Defines the opacity of a view. The value of this property is a float number
 * between 0.0 and 1.0. 0 represents view is completely transparent and 1
 * represents view is completely opaque.
 *
 * @property {Number} [alpha = 1]
 * @android
 * @ios
 * @member UI.View
 * @since 0.1
 */
View.prototype.alpha = 1.0;

/**
 * Gets/sets background color of a view. It allows setting background
 * color with UI.Color instance.
 *
 * @property {UI.Color} [backgroundColor = UI.Color.WHITE]
 * @android
 * @ios
 * @member UI.View
 * @since 0.1
 */
View.prototype.backgroundColor = UI.Color.WHITE;

/**
 * Sets/gets border color of bounded view.
 *
 * @property {UI.Color} [borderColor = UI.Color.BLACK]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.borderColor = UI.Color.BLACK;


/**
 * Sets/gets border thickness of bounded view. Accepts unsigned
 * numbers, 0 means no border.
 *
 * @property {Number} [borderWidth = 0]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.borderWidth = 0;

/**
 * Sets/gets corner radius of a view. BorderRadius maximum value must be half of the shortest edge.
 *
 * @property {Number} [borderRadius = 0]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.borderRadius = 0;

/**
 * Gets/sets id of a view. It should be unique number for each object
 * inside page. Id will be generated unique by default.
 *
 * @property {Number} id
 * @android
 * @ios
 * @member UI.View
 * @since 0.1
 */
View.prototype.id;

/**
 * Gets/sets visibility of view. It is set to true as default.
 *
 * @property {Boolean} [visible = true]
 * @android
 * @ios
 * @member UI.View
 * @since 0.1
 */
View.prototype.visible = true;

/**
 * Gets/sets the degrees that the view is rotated around the pivot point.
 *
 * @property {Number} [rotation = 0]
 * @android
 * @ios
 * @member UI.View
 * @since 1.1.10
 */
View.prototype.rotation = 0;

/**
 * Gets/sets the degrees that the view is rotated around the horizontal axis through the pivot point. 
 * RotationX works different for iOS and Android. Android gives perpective to the view but iOS doesn't. 
 * This will cause difference on user interface.
 *
 * @property {Number} [rotationX = 0]
 * @android
 * @ios
 * @member UI.View
 * @since 1.1.10
 */
View.prototype.rotationX = 0;

/**
 * Gets/sets the degrees that the view is rotated around the vertical axis through the pivot point.
 * RotationY works different for iOS and Android. Android gives perpective to the view but iOS doesn't. 
 * This will cause difference on user interface.
 * 
 * @property {Number} [rotationY = 0]
 * @android
 * @ios
 * @member UI.View
 * @since 1.1.10
 */
View.prototype.rotationY = 0;

/**
 * Enables/disables touches to view. When set to false events
 * related to touches won't fire. It is set to true as default.
 *
 * @property {Boolean} [touchEnabled = true]
 * @android
 * @ios
 * @member UI.View
 * @since 0.1
 */
View.prototype.touchEnabled = true;

/**
 * Gets/sets left position of a view relative to its parent.
 *
 * @property {Number} [left = 0]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.left = 0;

/**
 * Gets/sets top position of a view relative to its parent.
 *
 * @property {Number} [top = 0]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.top = 0;

/**
 * Gets/sets right position of a view relative to its parent. This property works only if
 * view's positionType is UI.FlexLayout.PositionType.ABSOLUTE.
 *
 * @property {Number} [right = 0]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.right = 0;

/**
 * Gets/sets bottom position of a view relative to its parent. This property works only if
 * view's positionType is UI.FlexLayout.PositionType.ABSOLUTE.
 *
 * @property {Number} [bottom = 0]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.bottom = 0;


/**
 * Gets/sets height of a view.
 *
 * @property {Number} [height = 0]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.height = 0;

/**
 * Gets/sets width of a view.
 *
 * @property {Number} [width = 0]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.width = 0;

/**
 * Gets/sets minimum width of a view.
 *
 * @property {Number} [minWidth = 0]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.minWidth = 0;

/**
 * Gets/sets minimum height of a view.
 *
 * @property {Number} [minHeight = 0]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.minHeight = 0;

/**
 * Gets/sets maximum width of a view.
 *
 * @property {Number} [maxWidth = 0]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.maxWidth = 0;

/**
 * Gets/sets maximum height of a view.
 *
 * @property {Number} [maxHeight = 0]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.maxHeight = 0;

/**
 * Gets/Sets the padding space on the top side of a view.
 *
 * @property {Number} [paddingTop = 0]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.paddingTop = 0;

/**
 * Gets/Sets the padding space on the bottom side of a view.
 *
 * @property {Number} [paddingBottom = 0]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.paddingBottom = 0;

/**
 * Gets/Sets the padding space on the left side of a view.
 *
 * @property {Number} [paddingLeft = 0]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.paddingLeft = 0;

/**
 * Gets/Sets the padding space on the right side of a view.
 *
 * @property {Number} [paddingRight = 0]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.paddingRight = 0;

/**
 * Gets/Sets the padding space on the all sides of a view.
 *
 * @property {Number} [padding = 0]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.padding = 0;

/**
 * Gets/Sets the margin space on the top side of a view.
 *
 * @property {Number} [marginTop = 0]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.marginTop = 0;

/**
 * Gets/Sets the margin space on the bottom side of a view.
 *
 * @property {Number} [marginBottom = 0]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.marginBottom = 0;

/**
 * Gets/Sets the margin space on the left side of a view.
 *
 * @property {Number} [marginLeft = 0]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.marginLeft = 0;

/**
 * Gets/Sets the margin space required on the right side of a view.
 *
 * @property {Number} [marginRight = 0]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.marginRight = 0;


/**
 * Gets/Sets the margin space required on the all sides of a view.
 *
 * @property {Number} [margin = 0]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.margin = 0;

/**
 * This property specifies the type of positioning method used for a view.
 * To position a view relative to its parent with top,left,right and bottom
 * properties you must set the position type to absolute.
 *
 * @property {UI.FlexLayout.PositionType} [positionType = UI.FlexLayout.PositionType.RELATIVE]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.positionType;

/**
 * This property specifies how much a view will grow relative to the other views inside the same {@link UI.FlexLayout FlexLayout}.
 *
 * @property {Number} [flexGrow = 0]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.flexGrow = 0;

/**
 * AspectRatio keeps the ratio between the width and the height of a view. AspectRatio has higher priority than {@link UI.View#flexGrow flexGrow}.
 *
 * @property {Number} aspectRatio
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.aspectRatio;

/**
 * This property specifies how much a view will shrink relative to the other views inside the same {@link UI.FlexLayout FlexLayout}.
 *
 * @property {Number} [flexShrink = 1]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.flexShrink = 1;

/**
 * This property specifies the initial length of a view in a {@link UI.FlexLayout FlexLayout}.
 *
 * @property {Number} [flexBasis = -1]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.flexBasis = -1;

/**
 * This property specifies how a child view aligns in the cross-axis.
 * It overrides the {@link UI.FlexLayout.AlignItems FlexLayout.AlignItems} property of the parent.
 *
 * @property {UI.FlexLayout.AlignSelf} [alignSelf = UI.FlexLayout.AlignSelf.AUTO]
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.alignSelf = UI.FlexLayout.AlignSelf.AUTO;

/**
 * This method put a view to the top of other views in z-direction.
 *
 * @method bringToFront
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.bringToFront = function(){};

/**
 * Gets the parent view of a view.
 *
 *     @example
 *     const FlexLayout = require('sf-core/ui/flexlayout');
 *     const Label = require('sf-core/ui/label');
 *
 *     var myFlexLayout = new FlexLayout();
 *     myFlexLayout.id = 5432;
 *
 *     var myLabel = new Label({
 *          text: "Smartface Label"
 *     });
 *     myFlexLayout.addChild(myLabel);
 *     var parentId = myLabel.getParent().id; //is equal to 5432.
 *
 * @return {UI.ViewGroup} Parent view of a view, null if not exists.
 * @method getParent
 * @android
 * @ios
 * @since 0.1
 */
View.prototype.getParent = function(){};

/**
 * This event is called when a touch screen motion event starts.
 *
 * @event onTouch
 * @android
 * @ios
 * @member UI.View
 * @since 0.1
 */
View.prototype.onTouch = function onTouch(){ };

/**
 * This event is called when a touch screen motion event ends.
 *
 * @event onTouchEnded
 * @param {Boolean} isInside
 * @android
 * @ios
 * @member UI.View
 * @since 0.1
 */
View.prototype.onTouchEnded = function onTouchEnded(isInside){ };

/**
 * This event is called when a touch screen motion event moves.
 *
 * @event onTouchMove
 * @param {Boolean} isInside
 * @android
 * @ios
 * @member UI.View
 * @since 0.1
 */
View.prototype.onTouchMove = function onTouchMove(isInside){ };

/**
 * This event is called when a touch screen motion event cancels.
 *
 * @event onTouchCancel
 * @android
 * @ios
 * @member UI.View
 * @since 0.1
 */
View.prototype.onTouchCancel = function onTouchCancel(){ };

/**
 * Gets/Sets the elevation of the view. For the views that has 
 * StateListAnimator natively like Button, will lost its own 
 * StateListAnimation when elevation value changed.
 * For details : https://developer.android.com/training/material/shadows-clipping.html
 *
 * @property {Number} elevation
 * @android
 * @member UI.View
 * @see https://developer.android.com/training/material/shadows-clipping.html
 * @see https://developer.android.com/reference/android/view/View.html#setStateListAnimator(android.animation.StateListAnimator)
 * @since 1.1.12
 */
View.prototype.android.elevation;

/**
 * Gets/sets the depth location of the view relative to its elevation. To put view over button, 
 * you have to change zIndex value after Android Lollipop. On android, default elevation value of button is bigger than other view.
 * This property affects after Android Lollipop. No-op before api level 21.
 *
 * @property {Number} zIndex
 * @android
 * @member UI.View
 * @since 2.0.8
 */
View.prototype.android.zIndex;

/**
 * A Boolean indicating whether sublayers are clipped to the layer’s bounds.
 *
 * @property {Boolean} [masksToBounds = true]
 * @ios
 * @since 1.1.15
 */
View.prototype.ios.masksToBounds = 0;

/**
 * A Boolean value that determines whether subviews are confined to the bounds of the view.
 *
 * @property {Boolean} [clipsToBounds = false]
 * @ios
 * @since 1.1.15
 */
View.prototype.ios.clipsToBounds = 0;

/**
 * The offset (in points) of the shadow. "ios.masksToBounds" property must be false for shadow.
 *
 *     @example
 *     view.ios.masksToBounds = false;
 *     view.ios.shadowOffset = {x:10,y:10};
 *     view.ios.shadowRadius = 5;
 *     view.ios.shadowOpacity = 0.5;
 *     view.ios.shadowColor = Color.GRAY;
 * 
 * @property {Object} [shadowOffset = {x: 0.0,y: -3.0}]
 * @property {Number} shadowOffset.x
 * @property {Number} shadowOffset.y
 * @ios
 * @since 2.0.6
 */
View.prototype.ios.shadowOffset = {x: 0.0,y: -3.0};

/**
 * The blur radius (in points) used to render the shadow. "ios.masksToBounds" property must be false for shadow.
 *
 * @property {Number} [shadowRadius = 3]
 * @ios
 * @since 2.0.6
 */
View.prototype.ios.shadowRadius = 3;

/**
 * The value in this property must be in the range 0.0 (transparent) to 1.0 (opaque). "ios.masksToBounds" property must be false for shadow.
 *
 * @property {Number} [shadowOpacity = 0]
 * @ios
 * @since 2.0.6
 */
View.prototype.ios.shadowOpacity = 0;

/**
 * The color of the shadow. "ios.masksToBounds" property must be false for shadow.
 *
 * @property {UI.Color} [shadowColor = UI.Color.BLACK]
 * @ios
 * @since 2.0.6
 */
View.prototype.ios.shadowColor = UI.Color.BLACK;;

module.exports = View;
