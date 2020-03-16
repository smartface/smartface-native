declare const KeyboardType: {
	DEFAULT: 0;
	NUMBER: 1;
	DECIMAL: 2;
	PHONE: 3;
	URL: 4;
	ios: { TWITTER: 5; WEBSEARCH: 6 };
	android: {
		DATETIME: 7;
		SIGNEDNUMBER: 8;
		SIGNEDDECIMAL: 9;
		TEXTAUTOCOMPLETE: 10;
		TEXTAUTOCORRECT: 11;
		TEXTCAPCHARACTERS: 12;
		TEXTCAPSENTENCES: 13;
		TEXTCAPWORDS: 14;
		TEXTEMAILSUBJECT: 15;
		TEXTLONGMESSAGE: 16;
		TEXTNOSUGGESTIONS: 17;
		TEXTPERSONNAME: 18;
		TEXTSHORTMESSAGE: 19;
		TIME: 20;
	};
	EMAILADDRESS: 21;
	iOS: { TWITTER: 5; WEBSEARCH: 6 };
	Android: {
		DATETIME: 7;
		SIGNEDNUMBER: 8;
		SIGNEDDECIMAL: 9;
		TEXTAUTOCOMPLETE: 10;
		TEXTAUTOCORRECT: 11;
		TEXTCAPCHARACTERS: 12;
		TEXTCAPSENTENCES: 13;
		TEXTCAPWORDS: 14;
		TEXTEMAILSUBJECT: 15;
		TEXTLONGMESSAGE: 16;
		TEXTNOSUGGESTIONS: 17;
		TEXTPERSONNAME: 18;
		TEXTSHORTMESSAGE: 19;
		TIME: 20;
	};
};

type KeyboardType = ExtractValues<typeof KeyboardType>;
export = KeyboardType;