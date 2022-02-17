/* utf.js - UTF-8 <=> UTF-16 convertion
 *
 * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
 * Version: 1.0
 * LastModified: Dec 25 1999
 * This library is free.  You can redistribute it and/or modify it.
 *
 * Taken from https://weblog.rogueamoeba.com/2017/02/27/javascript-correctly-converting-a-byte-array-to-a-utf-8-string/
 */

const Base64Util = {
  UTf8ArrayToStr: (data: string[]) => {
    const extraByteMap = [1, 1, 1, 1, 2, 2, 3, 0];
    const count = data.length;
    let str = '';

    for (let index = 0; index < count; ) {
      let ch = data[index++] as unknown as number;
      if (ch & 0x80) {
        let extra = extraByteMap[(ch >> 3) & 0x07];
        if (!(ch & 0x40) || !extra || index + extra > count) return null;

        ch = ch & (0x3f >> extra);
        for (; extra > 0; extra -= 1) {
          const chx = data[index++] as unknown as number;
          if ((chx & 0xc0) != 0x80) return null;

          ch = (ch << 6) | (chx & 0x3f);
        }
      }

      str += String.fromCharCode(ch);
    }

    return str;
  },
  StrToUtf8Array: (str: string): string[] => {
    const utf8 = [];
    for (let i = 0; i < str.length; i++) {
      let charcode = str.charCodeAt(i);
      if (charcode < 0x80) utf8.push(charcode);
      else if (charcode < 0x800) {
        utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
      } else if (charcode < 0xd800 || charcode >= 0xe000) {
        utf8.push(0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
      }
      // surrogate pair
      else {
        i++;
        // UTF-16 encodes 0x10000-0x10FFFF by
        // subtracting 0x10000 and splitting the
        // 20 bits of 0x0-0xFFFFF into two halves
        charcode = 0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
        utf8.push(0xf0 | (charcode >> 18), 0x80 | ((charcode >> 12) & 0x3f), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
      }
    }
    return utf8;
  }
};

export default Base64Util;
