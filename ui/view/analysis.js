/**
 * @class UI.View
 * @since 0.1
 *
 * View class represents a rectangular area on the screen and it is responsible
 * for event handling. View is the base of all UI classes.
 *
 *     @example
 *     const View = require('nf-core/ui/view');
 *     const Color = require('nf-core/ui/color');
 *     var myView = new View();
 *     myView.width = 300;
 *     myView.height = 500;
 *     myView.top = 50;
 *     myView.left = 50;
 *     myView.backgroundColor = Color.RED;
 */
function View(params) {
    /**
     * Defines the opacity of a view. The value of this property is a float number
     * between 0.0 and 1.0. 0 represents view is completely transparent and 1
     * represents view is completely opaque.
     *
     * @property {Number} alpha
     * @android
     * @ios
     * @member UI.View
     * @since 0.1
     */
    this.alpha = 1.0;

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
    this.backgroundColor = UI.Color.WHITE;

    /**
     * Sets/gets border color of bounded view.
     *
     * @property {UI.Color} [borderColor = UI.Color.BLACK]
     * @android
     * @ios
     * @since 0.1
     */
    this.borderColor = UI.Color.BLACK;


    /**
     * Sets/gets border thickness of bounded view. Accepts unsigned
     * numbers, 0 means no border.
     *
     * @property {Number} borderWidth
     * @android
     * @ios
     * @since 0.1
     */
    this.borderWidth = 0;

    /**
     * Sets/gets corner radius of a view.
     *
     * @property {Number} borderRadius
     * @android
     * @ios
     * @since 0.1
     */
    this.borderRadius = 0;

    /**
     * Gets/sets id of a view. It should be unique number for each object
     * inside page.
     *
     * @property {Number} id
     * @android
     * @ios
     * @member UI.View
     * @since 0.1
     */
    this.id = 5421;

    /**
     * Gets/sets visibility of view. It is set to true as default.
     *
     * @property {Boolean} visible
     * @android
     * @ios
     * @member UI.View
     * @since 0.1
     */
    this.visible = true;

    /**
     * Enables/disables touches to view. When set to false events
     * related to touches won't fire. It is set to true as default.
     *
     * @property {Boolean} touchEnabled
     * @android
     * @ios
     * @member UI.View
     * @since 0.1
     */
    this.touchEnabled = true;

    /**
     * Gets/sets left position of a view relative to its parent.
     *
     * @property {Number} [left = 0]
     * @android
     * @ios
     * @since 0.1
     */
    this.left = 0;

    /**
     * Gets/sets top position of a view relative to its parent.
     *
     * @property {Number} [top = 0]
     * @android
     * @ios
     * @since 0.1
     */
    this.top = 0;

    /**
     * Gets/sets right position of a view relative to its parent. This property works only if
     * view's positionType is {@link UI.FlexLayout.PositionType.ABSOLUTE FlexLayout.PositionType.ABSOLUTE}.
     *
     * @property {Number} [right = 0]
     * @android
     * @ios
     * @since 0.1
     */
    this.right = 0;

    /**
     * Gets/sets bottom position of a view relative to its parent. This property works only if
     * view's positionType is {@link UI.FlexLayout.PositionType.ABSOLUTE FlexLayout.PositionType.ABSOLUTE}.
     *
     * @property {Number} [bottom = 0]
     * @android
     * @ios
     * @since 0.1
     */
    this.bottom = 0;


    /**
     * Gets/sets height of a view.
     *
     * @property {Number} [height = 0]
     * @android
     * @ios
     * @since 0.1
     */
    this.height = 0;

    /**
     * Gets/sets width of a view.
     *
     * @property {Number} [width = 0]
     * @android
     * @ios
     * @since 0.1
     */
    this.width = 0;

    /**
     * Gets/sets minimum width of a view.
     *
     * @property {Number} [minWidth = 0]
     * @android
     * @ios
     * @since 0.1
     */
    this.minWidth = 0;

    /**
     * Gets/sets minimum height of a view.
     *
     * @property {Number} [minHeight = 0]
     * @android
     * @ios
     * @since 0.1
     */
    this.minHeight = 0;

    /**
     * Gets/sets maximum width of a view.
     *
     * @property {Number} [maxWidth = 0]
     * @android
     * @ios
     * @since 0.1
     */
    this.maxWidth = 0;

    /**
     * Gets/sets maximum height of a view.
     *
     * @property {Number} [maxHeight = 0]
     * @android
     * @ios
     * @since 0.1
     */
    this.maxHeight = 0;

    /**
     * Gets/Sets the padding space on the top side of a view.
     *
     * @property {Number} [paddingTop = 0]
     * @android
     * @ios
     * @since 0.1
     */
    this.paddingTop = 0;

    /**
     * Gets/Sets the padding space on the bottom side of a view.
     *
     * @property {Number} [paddingBottom = 0]
     * @android
     * @ios
     * @since 0.1
     */
    this.paddingBottom = 0;


    /**
     * Gets/Sets the padding space on the left side of a view.
     *
     * @property {Number} [paddingLeft = 0]
     * @android
     * @ios
     * @since 0.1
     */
    this.paddingLeft = 0;

    /**
     * Gets/Sets the padding space on the right side of a view.
     *
     * @property {Number} [paddingRight = 0]
     * @android
     * @ios
     * @since 0.1
     */
    this.paddingRight = 0;

    /**
     * Gets/Sets the padding space on the all sides of a view.
     *
     * @property {Number} [padding = 0]
     * @android
     * @ios
     * @since 0.1
     */
    this.padding = 0;

    /**
     * Gets/Sets the margin space on the top side of a view.
     *
     * @property {Number} [marginTop = 0]
     * @android
     * @ios
     * @since 0.1
     */
    this.marginTop = 0;

    /**
     * Gets/Sets the margin space on the bottom side of a view.
     *
     * @property {Number} [marginBottom = 0]
     * @android
     * @ios
     * @since 0.1
     */
    this.marginBottom = 0;

    /**
     * Gets/Sets the margin space on the left side of a view.
     *
     * @property {Number} [marginLeft = 0]
     * @android
     * @ios
     * @since 0.1
     */
    this.marginLeft = 0;

    /**
     * Gets/Sets the margin space required on the right side of a view.
     *
     * @property {Number} [marginRight = 0]
     * @android
     * @ios
     * @since 0.1
     */
    this.marginRight = 0;


    /**
     * Gets/Sets the margin space required on the all sides of a view.
     *
     * @property {Number} [margin = 0]
     * @android
     * @ios
     * @since 0.1
     */
    this.margin = 0;


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
    this.positionType;

    /**
     * This property specifies how much a view will grow relative to the other views inside the same {@link UI.FlexLayout FlexLayout}.
     *
     * @property {Number} [flexGrow = 0]
     * @android
     * @ios
     * @since 0.1
     */
    this.flexGrow = 0;

    /**
     * This property specifies how much a view will shrink relative to the other views inside the same {@link UI.FlexLayout FlexLayout}.
     *
     * @property {Number} [flexShrink = 1]
     * @android
     * @ios
     * @since 0.1
     */
    this.flexShrink = 1;

    /**
     * This property specifies the initial length of a view in a {@link UI.FlexLayout FlexLayout}.
     *
     * @property {Number} [flexBasis = -1]
     * @android
     * @ios
     * @since 0.1
     */
    this.flexBasis = -1;

    /**
     * This property specifies how a child view aligns in the cross-axis.
     * It overrides the {@link UI.FlexLayout.AlignItems FlexLayout.AlignItems} property of the parent.
     *
     * @property {UI.FlexLayout.AlignSelf} [alignSelf = UI.FlexLayout.AlignSelf.AUTO]
     * @android
     * @ios
     * @since 0.1
     */
    this.alignSelf = UI.FlexLayout.AlignSelf.AUTO;

    /**
     * This method put a view to the top of other views in z-direction.
     *
     *     @example
     *     const Page = require('nf-core/ui/page');
     *     const FlexLayout = require('nf-core/ui/flexlayout')
     *     const Label = require('nf-core/ui/label');
     *     const Color = require('nf-core/ui/color');
     *     var myPage = new Page();
     *     var myLabelBehind = new Label({
     *         width: "300",
     *         height: "50",
     *         top: "10",
     *         left: "15",
     *         text: "Label at behind",
     *         backgroundColor: Color.BLUE,
     *         textColor: Color.WHITE,
     *         positionType: FlexLayout.PositionType.ABSOLUTE
     *     });
     *     var myLabelFront = new Label({
     *         width: "300",
     *         height: "50",
     *         top: "10",
     *         left: "15",
     *         text: "Label at front",
     *         backgroundColor: Color.BLACK,
     *         textColor: Color.CYAN,
     *         positionType: FlexLayout.PositionType.ABSOLUTE
     *     });
     *     myPage.layout.add(myLabelBehind);
     *     myPage.layout.add(myLabelFront);
     *     myLabelBehind.bringToFront();
     *
     * @method bringToFront
     * @android
     * @ios
     * @since 0.1
     */
    this.bringToFront = function(){};

    /**
     * Gets the parent view of a view.
     *
     *     @example
     *     const FlexLayout = require('nf-core/ui/flexlayout');
     *     const Label = require('nf-core/ui/label');
     *
     *     var myFlexLayout = new FlexLayout();
     *     myAbsoluteLayout.id = 5432;
     *
     *     var myLabel = new Label({
     *          text: "Smartface Label"
     *     });
     *     myFlexLayout.addChild(myLabel);
     *     var parentId = myLabel.getParent().id; //is equal to 5432.
     *
     * @return {UI.View} Parent view of a view, null if not exists.
     * @method getParent
     * @android
     * @ios
     * @since 0.1
     */
    this.getParent = function(){};

    /**
     * This event is called when a touch screen motion event starts.
     *
     * @event onTouch
     * @android
     * @ios
     * @member UI.View
     * @since 0.1
     */
    this.onTouch = function onTouch(){ }

    /**
     * This event is called when a touch screen motion event ends.
     *
     * @event onTouchEnded
     * @android
     * @ios
     * @member UI.View
     * @since 0.1
     */
    this.onTouchEnded = function onTouchEnded(){ }
}

module.exports = View;
