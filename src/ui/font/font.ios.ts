/* eslint-disable eqeqeq */
import { AbstractFont, FontStyle } from './font';
import File from '../../io/file';

export default class FontIOS extends AbstractFont {
  static create(fontFamily: string, size: number, style: FontStyle): FontIOS | null {
    if (style === this.NORMAL) {
      if (fontFamily === FontIOS.DEFAULT) {
        return __SF_UIFont.systemFontOfSize(size);
      } else {
        let retval = null;
        if (getFileFont(fontFamily, size, '_n')) {
          retval = getFileFont(fontFamily, size, '_n');
        } else if (getFileFont(fontFamily, size, '-Regular')) {
          retval = getFileFont(fontFamily, size, '-Regular');
        } else {
          retval = __SF_UIFont.fontWithNameSize(fontFamily, size);
        }
        return retval;
      }
    } else if (style === this.BOLD) {
      if (fontFamily === FontIOS.DEFAULT) {
        return __SF_UIFont.boldSystemFontOfSize(size);
      } else {
        let retval = null;
        if (getFileFont(fontFamily, size, '_b')) {
          retval = getFileFont(fontFamily, size, '_b');
        } else if (getFileFont(fontFamily, size, '-Bold')) {
          retval = getFileFont(fontFamily, size, '-Bold');
        } else {
          retval = __SF_UIFont.fontWithNameSize(fontFamily, size).bold();
        }
        return retval;
      }
    } else if (style === this.ITALIC) {
      if (fontFamily === FontIOS.DEFAULT) {
        return __SF_UIFont.italicSystemFontOfSize(size);
      } else {
        let retval = null;
        if (getFileFont(fontFamily, size, '_i')) {
          retval = getFileFont(fontFamily, size, '_i');
        } else if (getFileFont(fontFamily, size, '-Italic')) {
          retval = getFileFont(fontFamily, size, '-Italic');
        } else {
          retval = __SF_UIFont.fontWithNameSize(fontFamily, size).italic();
        }
        return retval;
      }
    } else if (style === this.BOLD_ITALIC) {
      if (fontFamily === FontIOS.DEFAULT) {
        return __SF_UIFont.systemFontOfSize(size).boldItalic();
      } else {
        let retval = null;
        if (getFileFont(fontFamily, size, '_bi')) {
          retval = getFileFont(fontFamily, size, '_bi');
        } else if (getFileFont(fontFamily, size, '-BoldItalic')) {
          retval = getFileFont(fontFamily, size, '-BoldItalic');
        } else {
          retval = __SF_UIFont.fontWithNameSize(fontFamily, size).boldItalic();
        }
        return retval;
      }
    } else {
      if (fontFamily === FontIOS.DEFAULT || fontFamily === FontIOS.IOS_SYSTEM_FONT) {
        return __SF_UIFont.systemFontOfSize(size);
      } else {
        const font = getFileFont(fontFamily, size, '_n');
        if (font) {
          return font;
        } else {
          return __SF_UIFont.fontWithNameSize(fontFamily, size);
        }
      }
    }
  }

  static createFromFile(path: string, size: number): AbstractFont {
    if (!size) {
      size = 15;
    }
    const filePath = new File({
      path: path
    });
    const actualPath = filePath.nativeObject.getActualPath();
    return __SF_UIFont.createFromFileWithFilenameStringSize(actualPath, size);
  }

  static ios = {
    allFontNames() {
      let retval: string[] = [];
      const UIFont: typeof __SF_UIFont = requireClass('UIFont');
      const familyNames = UIFont.familyNames();
      for (const familyNameindex in familyNames) {
        const fontNames = UIFont.fontNamesForFamilyName(familyNames[familyNameindex]);
        retval = retval.concat(Object.values(fontNames));
      }
      return retval;
    }
  };

  static DEFAULT = AbstractFont.DEFAULT;
  static IOS_SYSTEM_FONT = AbstractFont.IOS_SYSTEM_FONT;
  static NORMAL = AbstractFont.NORMAL;
  static BOLD = AbstractFont.BOLD;
  static ITALIC = AbstractFont.ITALIC;
  static BOLD_ITALIC = AbstractFont.BOLD_ITALIC;
}

function getFileFont(fontFamily: string, size: number, fontSuffix: string): any {
  const convertedTTFFontName = `${fontFamily.split(' ').join('.')}${fontSuffix}.ttf`;
  const convertedOTFFontName = `${fontFamily.split(' ').join('.')}${fontSuffix}.otf`;

  const documentsTTF = `${File.getDocumentsDirectory()}/${convertedOTFFontName}`;
  const documentsOTF = `${File.getDocumentsDirectory()}/${convertedOTFFontName}`;

  const mainBundleTTF = `${File.getMainBundleDirectory()}/${convertedTTFFontName}`;
  const mainBundleOTF = `${File.getMainBundleDirectory()}/${convertedOTFFontName}`;

  const documentsTTFFont = __SF_UIFont.createFromFileWithFilenameStringSize(documentsTTF, size);
  const documentsOTFont = __SF_UIFont.createFromFileWithFilenameStringSize(documentsOTF, size);
  const mainBundleTTFFont = __SF_UIFont.createFromFileWithFilenameStringSize(mainBundleTTF, size);
  const mainBundleOTFFont = __SF_UIFont.createFromFileWithFilenameStringSize(mainBundleOTF, size);

  const systemFontOfSize = __SF_UIFont.systemFontOfSize(size);

  if (documentsTTFFont != systemFontOfSize) {
    return documentsTTFFont;
  }

  if (documentsOTFont != systemFontOfSize) {
    return documentsOTFont;
  }

  if (mainBundleTTFFont != systemFontOfSize) {
    return mainBundleTTFFont;
  }

  if (mainBundleOTFFont != systemFontOfSize) {
    return mainBundleOTFFont;
  }

  return undefined;
}
