var expect = require("chai").expect;
var assert = require("chai").assert;

const Notifications = require("../../notifications");
const Image = require("../../ui/image");
const Color = require("../../ui/color");

salep.test("sf-core/blob Unit Test", function() {
    
    var testObject = new Notifications.LocalNotification();

    this.case("[alertBody] getter/setter.", function() {
        assert.doesNotThrow(function(){ testObject.alertBody = "alertBody"; }, Error);
        assert.equal(testObject.alertBody, "alertBody", "alertBody must be 'alertBody'");
    });
    
    this.case("[alertAction] getter/setter.", function() {
        assert.doesNotThrow(function(){ testObject.alertAction = "alertAction"; }, Error);
        assert.equal(testObject.alertAction, "alertAction", "alertAction must be 'alertAction'");
    });
    
    this.case("[sound] getter/setter.", function() {
        assert.doesNotThrow(function(){ testObject.sound = "assets://sound.mp3"; }, Error);
        assert.equal(testObject.sound, "assets://sound.mp3", "sound must be 'assets://sound.mp3'");
    });
    
    this.case("[launchImage] getter/setter.", function() {
        assert.doesNotThrow(function(){ testObject.launchImage = "images://smartface.png"; }, Error);
        assert.equal(testObject.launchImage, "images://smartface.png", "launchImage must NOT be null");
    });
    
    this.case("[fireDate] getter/setter.", function() {
        var date = Date.now();
        assert.doesNotThrow(function(){ testObject.fireDate = date; }, Error);
        assert.equal(testObject.fireDate, date, "fireDate must be '" + date + "'");
    });
    
    this.case("[android.color] getter/setter.", function() {
        assert.doesNotThrow(function(){ testObject.android.color = Color.RED; }, Error);
        assert.equal(testObject.android.color, Color.RED, "android.color must be 'Color.RED'");
    });
    
    this.case("[android.indeterminate] getter/setter.", function() {
        assert.doesNotThrow(function(){ testObject.android.indeterminate = false; }, Error);
        assert.isFalse(testObject.android.indeterminate, "android.indeterminate must be 'false'");
    });
    
    this.case("[android.ticker] getter/setter.", function() {
        assert.doesNotThrow(function(){ testObject.android.ticker = "ticker"; }, Error);
        assert.equal(testObject.android.ticker, "ticker", "android.ticker must be 'ticker'");
    });
    
    this.case("[android.vibrate] getter/setter.", function() {
        assert.doesNotThrow(function(){ testObject.android.vibrate = true; }, Error);
        assert.isTrue(testObject.android.vibrate, "android.vibrate must be 'true'");
    });
    
    this.case("[android.priority] getter/setter.", function() {
        assert.doesNotThrow(function(){ testObject.android.priority = Notifications.Priority.HIGH; }, Error);
        assert.equal(testObject.android.priority, Notifications.Priority.HIGH, "android.priority must be 'Notifications.Priority.HIGH'");
    });
    
    this.case("[android.subText] getter/setter.", function() {
        assert.doesNotThrow(function(){ testObject.android.subText = "subText"; }, Error);
        assert.equal(testObject.android.subText, "subText", "android.color must be 'subText'");
    });
    
    this.case("[android.ongoing] getter/setter.", function() {
        assert.doesNotThrow(function(){ testObject.android.ongoing = true; }, Error);
        assert.isTrue(testObject.android.ongoing, "android.ongoing must be 'true'");
    });
    
    this.case("[repeatInterval] getter/setter.", function() {
        assert.doesNotThrow(function(){ testObject.repeatInterval = 0; }, Error);
        assert.equal(testObject.repeatInterval, 0, "repeatInterval must be '0'");
    });
    
    this.case("[schedule] function.", function() {
        assert.doesNotThrow(function(){ testObject.schedule(); }, Error);
    });
    
    this.case("[present] function.", function() {
        assert.doesNotThrow(function(){ testObject.present(); }, Error);
    });
    
    this.case("[cancel] function.", function() {
        assert.doesNotThrow(function(){ testObject.cancel(); }, Error);
    });
    
    this.case("[cancelAllLocalNotifications] function.", function() {
        assert.doesNotThrow(function(){ Notifications.cancelAllLocalNotifications(); }, Error);
    });
    
    this.case("[registerForPushNotifications] function.", function() {
        assert.doesNotThrow(function(){ Notifications.registerForPushNotifications(); }, Error);
    });
    
    this.case("[unregisterForPushNotifications] function.", function() {
        assert.doesNotThrow(function(){ Notifications.unregisterForPushNotifications(); }, Error);
    });
    
});