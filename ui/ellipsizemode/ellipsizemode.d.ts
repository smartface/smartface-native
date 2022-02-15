declare type EllipsizeMode = 'start' | 'middle' | 'end' | 'none' | 'ios_wordwrapping' | 'ios_charwrapping';
declare const EllipsizeMode: {
  START: 'start';
  MIDDLE: 'middle';
  END: 'end';
  NONE: 'none';
  iOS: {
    WORDWRAPPING: 'ios_wordwrapping';
    CHARWRAPPING: 'ios_charwrapping';
  };
  WORDWRAPPING: 'ios_wordwrapping';
  CHARWRAPPING: 'ios_charwrapping';
};

export = EllipsizeMode;
