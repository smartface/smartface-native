var expect = require("chai").expect;
var assert = require("chai").assert;

const Page = require("../../ui/page");
const Router = require("../../ui/router");
const extend = require('js-base/core/extend');
const Multimedia = require("../../device/multimedia");

var pageInstance = null;
const PageMultimedia = extend(Page)(
    function (_super, params) {
        
        _super(this);
        pageInstance = this;
    }
);
Router.add("multimediaPage", PageMultimedia);
Router.go("multimediaPage");

salep.test("sf-core/device/multimedia Unit Test", function() {

    this.case("[startCamera] function.", function() {
        assert.doesNotThrow(function(){ Multimedia.startCamera({page: pageInstance}); }, Error);
    });

    this.case("[pickFromGallery] function.", function() {
        assert.doesNotThrow(function(){ Multimedia.pickFromGallery({page: pageInstance}); }, Error);
    });
    
    this.case("[android.getAllGalleryItems] function.", function() {
        assert.doesNotThrow(function(){ Multimedia.android.getAllGalleryItems({page: pageInstance, type: Multimedia.Type.IMAGE }); }, Error);
    });
});