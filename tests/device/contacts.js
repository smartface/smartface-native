var assert = require("chai").assert;

const Contacts = require("../../device/contacts");
const PermissionUtil = require('sf-extension-utils').permission;
const Application = require("sf-core/application");

const Page = require("../../ui/page");
const Router = require("../../ui/router");
const extend = require('js-base/core/extend');

var pageInstance = null;
const PageContacts = extend(Page)(
    function (_super, params) {
        _super(this);
        pageInstance = this;
    }
);
Router.add("contactsPage", PageContacts);
Router.go("contactsPage");

salep.test("sf-core/device/contacts Unit Test", function() {
    
    this.case("Contacts getAll function", function() {
        assert.doesNotThrow(function(){Contacts.getAll()}, Error);
    });
    
    this.case("Contacts add function", function() {
        var contact = {
            displayName: "Smartface Team",
            phoneNumber: "+16506173265",
            email: "info@smartface.io",
            address: "347 N Canon Dr Beverly Hills, CA 90210"
        };
        
        PermissionUtil.getPermission(Application.android.Permissions.RECORD_AUDIO, false, function(e) {
            assert.doesNotThrow(function(){Contacts.add(contact)}, Error);
        });
    });
    
    this.case("Contacts pick function", function() {
        assert.doesNotThrow(function(){Contacts.pick({page: pageInstance})}, Error);
    });
});