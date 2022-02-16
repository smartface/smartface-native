const SFLocationCallback = requireClass("io.smartface.android.sfcore.device.location.SFLocationCallback");

export const WebView = Object.freeze({
    REQUEST_CODE_LOLIPOP: 1111,
    RESULT_CODE_ICE_CREAM: 2222
});

export const EmailComposer = Object.freeze({
  EMAIL_REQUESTCODE: 57
});

export const Sound = Object.freeze({
  PICK_SOUND: 1004
});

export const Multimedia = Object.freeze({
  CAMERA_REQUEST: 1002,
  PICK_FROM_GALLERY: 1003,
  PICK_MULTIPLE_FROM_GALLERY: 1006,
  CropImage: {
    CROP_CAMERA_DATA_REQUEST_CODE : 203,
    CROP_GALLERY_DATA_REQUEST_CODE : 205
  }
});

export const Contacts = Object.freeze({
  PICK_REQUEST_CODE: 1001,
  PICKFROM_REQUEST_CODE: 1005
});

export const DocumentPicker = Object.freeze({
  PICK_DOCUMENT_CODE: 2000
});


export const Location = Object.freeze({
  CHECK_SETTINGS_CODE: SFLocationCallback.REQUEST_CHECK_SETTINGS
});

