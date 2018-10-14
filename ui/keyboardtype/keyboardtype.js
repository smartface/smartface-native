var KeyboardType = {};
KeyboardType.ios = {};
KeyboardType.android = {};
KeyboardType.DEFAULT = 0;
KeyboardType.NUMBER = 1;
KeyboardType.DECIMAL = 2;
KeyboardType.PHONE = 3;
KeyboardType.URL = 4;
KeyboardType.ios.TWITTER = 5;
KeyboardType.ios.WEBSEARCH = 6;
KeyboardType.android.DATETIME = 7;
KeyboardType.android.SIGNEDNUMBER = 8;
KeyboardType.android.SIGNEDDECIMAL = 9;
KeyboardType.android.TEXTAUTOCOMPLETE = 10;
KeyboardType.android.TEXTAUTOCORRECT = 11;
KeyboardType.android.TEXTCAPCHARACTERS = 12;
KeyboardType.android.TEXTCAPSENTENCES = 13;
KeyboardType.android.TEXTCAPWORDS = 14;
KeyboardType.android.TEXTEMAILSUBJECT = 15;
KeyboardType.android.TEXTLONGMESSAGE = 16;
KeyboardType.android.TEXTNOSUGGESTIONS = 17;
KeyboardType.android.TEXTPERSONNAME = 18;
KeyboardType.android.TEXTSHORTMESSAGE = 19;
KeyboardType.android.TIME = 20;
KeyboardType.EMAILADDRESS = 21;

Object.freeze(KeyboardType);

module.exports = KeyboardType;