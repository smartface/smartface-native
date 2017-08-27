var expect = require("chai").expect;
var assert = require("chai").assert;

const extend = require("js-base/core/extend");
const MapView = require("../../ui/mapview");
const Router = require("../../ui/router");
const Page = require("../../ui/page");

salep.test("sf-core/ui/mapview Unit Test", function() {
    var testObject = new MapView();
    var myPin = new MapView.Pin({
        location: {
            latitude: 37.4488259,
            longitude: -122.1600047
        },
        title: 'Smartface Inc.',
        subtitle: '2nd Floor, 530 Lytton Ave, Palo Alto, CA 94301',
        color: require("../../ui/color").RED
    });
    
    // @todo mapview needs to shown on the page but its crashing. We should find why its crashing. 
    // Router.add("mappage",extend(Page)(
    //     function(_super) {
    //         var self = this;
    //         _super(self);
    //         this.layout.addChild(testObject);
            
    //     })
    // );
    // Router.go("mappage");

    this.case("[centerLocation] getter/setter.", function() {
        var centerLocation = {latitude: 10.10, longitude: 10.10};
        assert.doesNotThrow(function(){ testObject.centerLocation = centerLocation; }, Error);
        assert.equal(testObject.centerLocation, centerLocation, 'centerLocation must be latitude: 10.10, longitude: 10.10');
    });
    
    this.case("[compassEnabled] getter/setter.", function() {
        assert.doesNotThrow(function(){ testObject.compassEnabled = true; }, Error);
        assert.isTrue(testObject.compassEnabled, 'compassEnabled must be true');
    });
    
    this.case("[rotateEnabled] getter/setter.", function() {
        assert.doesNotThrow(function(){ testObject.rotateEnabled = true; }, Error);
        assert.isTrue(testObject.rotateEnabled, 'rotateEnabled must be true');
    });
    
    this.case("[scrollEnabled] getter/setter.", function() {
        assert.doesNotThrow(function(){ testObject.scrollEnabled = true; }, Error);
        assert.isTrue(testObject.scrollEnabled, 'scrollEnabled must be true');
    });
    
    this.case("[zoomEnabled] getter/setter.", function() {
        assert.doesNotThrow(function(){ testObject.zoomEnabled = true; }, Error);
        assert.isTrue(testObject.zoomEnabled, 'zoomEnabled must be true');
    });
    
    this.case("[zoomLevel] getter/setter.", function() {
        assert.doesNotThrow(function(){ testObject.zoomLevel = 10; }, Error);
        assert.equal(testObject.zoomLevel, 10, 'zoomLevel must be 10');
    });
    
    this.case("[userLocationEnabled] getter/setter.", function() {
        assert.doesNotThrow(function(){ testObject.userLocationEnabled = true; }, Error);
        assert.isTrue(testObject.userLocationEnabled, 'userLocationEnabled must be true');
    });
    
    this.case("[type] getter/setter.", function() {
        assert.doesNotThrow(function(){ testObject.type = MapView.Type.HYBRID; }, Error);
        assert.equal(testObject.type, MapView.Type.HYBRID, 'type must be MapView.Type.HYBRID');
    });
    
    this.case("[addPin] function.", function() {
        assert.doesNotThrow(function(){ testObject.addPin(myPin); }, Error);
    });
    
    this.case("[removePin] function.", function() {
        assert.doesNotThrow(function(){testObject.removePin(myPin); }, Error);
    });
});