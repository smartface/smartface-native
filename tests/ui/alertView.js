var expect = require("chai").expect;
var assert = require("chai").assert;

const AlertView       = require("nf-core/ui/alertView").AlertView;
const AlertButtonType = require("nf-core/ui/alertView").AlertButtonType;

const buttonParameters = {
    index: AlertButtonType.POSITIVE,
    text: "MyButton",
    onClick: function(){}
};

salep.test("nf-core/ui/alertView Unit Test", function () {
    this.case("[isShowing] test default.", function () {
        var myAlertView = new AlertView();
        assert.isFalse(myAlertView.isShowing, "Default value must be false.");
    });

    this.case("[isShowing] test readOnly.", function () {
        var myAlertView = new AlertView();
        myAlertView.isShowing = true; // this shouldn't change the value
        assert.isFalse(myAlertView.isShowing, "isShowing must be readOnly.");
    });

    this.case("[messsage] test default value.", function () {
        var myAlertView = new AlertView();
        assert.isString(myAlertView.message, "Default value type must be a string.");
        assert.equal(myAlertView.message, "", "Default value must be an empty string.");
    });

    this.case("[messsage] test setters/getters.", function () {
        var text = "My Alert rocks!";

        var myAlertView = new AlertView();
        myAlertView.message = text;
        assert.equal(myAlertView.message, text, "message must match with the set value.");
    });

    salep.skipNext(); // TODO: remove this after exception throws are implemented.
    this.case("[messsage] test setting invalid type.", function () {
        var myAlertView = new AlertView();
        assert.throws(function() {
            myAlertView.message = -1;
        }, "message expects string only.");
    });

    this.case("[title] test default value.", function () {
        var myAlertView = new AlertView();
        assert.isString(myAlertView.title, "Default value type must be a string.");
        assert.lengthOf(myAlertView.title, 0, "Default value must be an empty string.");
    });

    this.case("[title] test setters/getters.", function () {
        var myAlertView = new AlertView();
        myAlertView.title = "I am a title";

        assert.equal(myAlertView.title, "I am a title", "mismatch in title.");
        assert.notEqual(myAlertView.title, "I am a BETTER title", "title cannot be 'BETTER'.");
    });

    this.case("[addButton] test adding a button.", function () {
        var myAlertView = new AlertView();
        myAlertView.addButton(buttonParameters);
    });

    this.case("[dismiss] test dismiss event.", function () {
        var dismissed = false;
        var onDismiss = function() {
            dismissed = true;
        };
        var myAlertView = new AlertView();
        myAlertView.addButton(buttonParameters);
        myAlertView.onDismiss = onDismiss;
        myAlertView.show();

        assert.isFalse(dismissed, "onDismiss has not been called yet.");
        myAlertView.dismiss();
        assert.isTrue(dismissed, "onDismiss sets dismissed to True.");
    });
});