/* eslint-disable eqeqeq */
import { AbstractFont, FontStyle, IFont } from './font';
import File from '../../io/file';
import { Size } from '../../primitive/size';
const UIFont = SF.requireClass('UIFont');

export default class FontIOS extends AbstractFont implements IFont {
  constructor(params?: any) {
    super(params);
  }
  protected createNativeObject() {
    return null;
  }
  sizeOfString(string: string, maxWidth: number): Size {
    throw new Error('Method not implemented.');
  }
  static create(fontFamily: string, size: number, style: FontStyle): FontIOS | null {
    if (fontFamily === FontIOS.DEFAULT || fontFamily === FontIOS.IOS_SYSTEM_FONT) {
      return FontIOS.createDefaultFamilyFont(size, style);
    }
    const fallbackFont = __SF_UIFont.fontWithNameSize(fontFamily, size);
    if (style === FontIOS.NORMAL) {
      return FontIOS.checkFontFileWithSuffix(fontFamily, size, '_n', '-Regular') || fallbackFont;
    } else if (style === FontIOS.BOLD) {
      return FontIOS.checkFontFileWithSuffix(fontFamily, size, '_b', '-Bold') || fallbackFont.bold();
    } else if (style === FontIOS.ITALIC) {
      return FontIOS.checkFontFileWithSuffix(fontFamily, size, '_i', '-Italic') || fallbackFont.italic();
    } else if (style === FontIOS.BOLD_ITALIC) {
      return FontIOS.checkFontFileWithSuffix(fontFamily, size, '_bi', '-BoldItalic') || fallbackFont.boldItalic();
    } else {
      return FontIOS.getFileFont(fontFamily, size, '_n') || fallbackFont; //Fallback of fallback
    }
  }

  private static checkFontFileWithSuffix(fontFamily: string, size: number, firstSuffix: string, fallbackSuffix: string) {
    return FontIOS.getFileFont(fontFamily, size, firstSuffix) || FontIOS.getFileFont(fontFamily, size, fallbackSuffix);
  }

  private static createDefaultFamilyFont(size: number, style: FontStyle) {
    if (style === FontStyle.NORMAL) {
      return __SF_UIFont.systemFontOfSize(size);
    } else if (style === FontStyle.BOLD) {
      return __SF_UIFont.boldSystemFontOfSize(size);
    } else if (style === FontStyle.ITALIC) {
      return __SF_UIFont.italicSystemFontOfSize(size);
    } else if (style === FontStyle.BOLD_ITALIC) {
      return __SF_UIFont.systemFontOfSize(size).boldItalic();
    } else {
      return __SF_UIFont.systemFontOfSize(size);
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

  private static getFileFont(fontFamily: string, size: number, fontSuffix: string): any {
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

  static ios = {
    allFontNames() {
      let retval: string[] = [];
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
