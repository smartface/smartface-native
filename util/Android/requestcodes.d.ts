/**
 * @type {{
 *   REQUEST_CODE_LOLIPOP:1111,
 *   RESULT_CODE_ICE_CREAM: 2222
 * }}
 */
declare type WebView = {
    REQUEST_CODE_LOLIPOP: 1111;
    RESULT_CODE_ICE_CREAM: 2222;
};
/**
 * @type {{
 *   EMAIL_REQUESTCODE: 57
 * }}
 */
declare type EmailComposer = {
    EMAIL_REQUESTCODE: 57;
};
/**
 * @type {{
 *   PICK_SOUND: 1004
 * }}
 */
declare type Sound = {
    PICK_SOUND: 1004;
};

declare type Multimedia = {
    CAMERA_REQUEST: 1002;
    PICK_FROM_GALLERY: 1003;
    CropImage: {
        CROP_IMAGE_ACTIVITY_REQUEST_CODE: 203;
        CROP_IMAGE_ACTIVITY_RESULT_ERROR_CODE: 204;
    };
};

declare type Contacts = {
    PICK_REQUEST_CODE: 1001;
};

declare type Location = {
    CHECK_SETTINGS_CODE: any;
};

declare const _exports: {
    Location: Location,
    Contacts: Contacts,
    Multimedia: Multimedia,
    Sound: Sound,
    EmailComposer: EmailComposer,
    WebView: WebView
}


export = _exports;