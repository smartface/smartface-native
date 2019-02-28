const WebView = {};
WebView.REQUEST_CODE_LOLIPOP = 1111;
WebView.RESULT_CODE_ICE_CREAM = 2222;

const EmailComposer = {};
EmailComposer.EMAIL_REQUESTCODE = 57;

const Sound = {};
Sound.PICK_SOUND = 1004;

const Multimedia = {};
Multimedia.CAMERA_REQUEST = 1002;
Multimedia.PICK_FROM_GALLERY = 1003;
Multimedia.CropImage.CROP_IMAGE_ACTIVITY_REQUEST_CODE = 203;
Multimedia.CropImage.CROP_IMAGE_ACTIVITY_RESULT_ERROR_CODE = 204;

const Contacts = {};
Contacts.PICK_REQUEST_CODE = 1001;

module.exports = {
    WebView,
    EmailComposer,
    Sound,
    Multimedia,
    Contacts
};