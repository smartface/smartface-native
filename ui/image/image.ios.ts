import NativeComponent from "../../core/native-component";
const File = require("../../io/file");
const TypeUtil = require("../../util/type");
const Blob = require("../../blob");

enum Format {
  JPEG,
  PNG
};

class Image extends NativeComponent {
  static createFromFile = function (path) {
    const imageFile = new File({
      path: path,
    });
    let retval;
    if (typeof imageFile.nativeObject.getActualPath() === "undefined") {
      retval = null;
    } else {
      retval = new Image({
        path: imageFile.nativeObject.getActualPath(),
      });
    }
    return retval;
  };

  static readonly Format = Format;

  static createFromName = function (name) {
    return new Image({
      name: name,
    });
  };

  static createFromImage(image) {
    return new Image({
      image: image,
    });
  }

  static createFromBlob = function (blob) {
    return new Image({
      blob: blob,
    });
  };

  static readandroid = {
    createRoundedImage: function () {},
  };

  static readonly iOS = {
    RenderingMode: {
      AUTOMATIC: 0,
      ORIGINAL: 1,
      TEMPLATE: 2,
    },
  } as const;

  private _flippedImage;
  private _nativeImage;
  private _autoMirrored: boolean = false;

  constructor(params: any) {
    super();
    if (params.path) {
      if (params.path.includes(".app")) {
        // Publish project image caching.
        // For using [UIImage imageNamed:] function.
        const array = params.path.split("/");
        const fileName = array.pop();
        this.nativeObject = __SF_UIImage.createName(fileName);
      } else {
        this.nativeObject = new __SF_UIImage(params.path);
      }
    } else if (params.name) {
      this.nativeObject = new __SF_UIImage.createName(params.name);
    } else if (params.blob) {
      this.nativeObject = __SF_UIImage.createNSData(params.blob.nativeObject);
    } else if (params.image) {
      this.nativeObject = params.image;
    }
    this._nativeImage = this.nativeObject;
  }

  get height(): number {
    return this.nativeObject.size.height;
  }
  get width(): number {
    return this.nativeObject.size.width;
  }

  createSystemIcon(id) {
    return this;
  }

  get android() {
    return {
      round: (radius) => {
        return this;
      },
    };
  }

  get ios() {
    const self = this;
    return {
      resizableImageWithCapInsetsResizingMode: (capinsets, resizingMode) => {
        let image;
        const invocationResizeable =
          __SF_NSInvocation.createInvocationWithSelectorInstance(
            "resizableImageWithCapInsets:resizingMode:",
            this.nativeObject
          );
        if (invocationResizeable) {
          invocationResizeable.target = this.nativeObject;
          invocationResizeable.setSelectorWithString(
            "resizableImageWithCapInsets:resizingMode:"
          );
          invocationResizeable.retainArguments();
          invocationResizeable.setUIEdgeInsetsArgumentAtIndex(capinsets, 2);
          invocationResizeable.setNSIntegerArgumentAtIndex(resizingMode, 3);

          invocationResizeable.invoke();
          image = invocationResizeable.getReturnValue();
        }
        return Image.createFromImage(image);
      },
      imageWithRenderingMode(value) {
        return Image.createFromImage(
          this.nativeObject.imageWithRenderingMode(value)
        );
      },
      imageFlippedForRightToLeftLayoutDirection() {
        return Image.createFromImage(
          self.nativeObject.imageFlippedForRightToLeftLayoutDirection()
        );
      },
      get renderingMode() {
        return self.nativeObject.valueForKey("renderingMode");
      },
      get flipsForRightToLeftLayoutDirection() {
        return self.nativeObject.valueForKey(
          "flipsForRightToLeftLayoutDirection"
        );
      },
    };
  }

  resize(
    width: number,
    height: number,
    onSuccess: ({ image: Image }) => void,
    onFailure: () => void
  ) {
    if (TypeUtil.isNumeric(width) && TypeUtil.isNumeric(height)) {
      // TODO: Recheck new Image.createFromImage(...)
      const resizedImage = Image.createFromImage(
        this.nativeObject.resizeImage({
          width: width,
          height: height,
        })
      );
      if (onSuccess) {
        onSuccess({
          image: resizedImage,
        });
      }
      return resizedImage;
    }

    if (onFailure) {
      onFailure();
    }
    return false;
  }

  crop(
    x: number,
    y: number,
    width: number,
    height: number,
    onSuccess: ({ image: Image }) => void,
    onFailure: () => void
  ) {
    if (
      TypeUtil.isNumeric(width) &&
      TypeUtil.isNumeric(height) &&
      TypeUtil.isNumeric(x) &&
      TypeUtil.isNumeric(y)
    ) {
      const resizedImage = Image.createFromImage(
        this.nativeObject.cropToBounds({
          x: x,
          y: y,
          width: width,
          height: height,
        })
      );
      if (onSuccess) {
        onSuccess({
          image: resizedImage,
        });
      }
      return resizedImage;
    }

    if (onFailure) {
      onFailure();
    }
    return false;
  }

  rotate(
    angle: number,
    onSuccess: ({ image: Image }) => void,
    onFailure: () => void
  ) {
    if (TypeUtil.isNumeric(angle)) {
      // TODO: Recheck usage of new Image.createFromImage(...)
      const resizedImage = Image.createFromImage(
        this.nativeObject.imageRotatedByDegrees(angle, false)
      );
      if (onSuccess) {
        onSuccess({
          image: resizedImage,
        });
      }
      return resizedImage;
    }

    if (onFailure) {
      onFailure();
    }
    return false;
  }

  compress(
    format: Format,
    quality: number,
    onSuccess: ({ blob: Blob }) => void,
    onFailure: () => void
  ) {
    if (TypeUtil.isNumeric(quality)) {
      const blob = new Blob(this.nativeObject.compress(format, quality / 100));
      if (onSuccess) {
        onSuccess({
          blob: blob,
        });
      }
      return blob;
    }

    if (onFailure) {
      onFailure();
    }
    return false;
  }

  toBlob() {
    let retval = null;
    const imageData = this.nativeObject.convertToData();
    if (imageData) {
      retval = new Blob(imageData);
    }
    return retval;
  }

  set autoMirrored(value) {
    this._autoMirrored = value;
    if (this._autoMirrored) {
      if (this._flippedImage) {
        this.nativeObject = this._flippedImage;
      } else {
        this._flippedImage =
          this.nativeObject.imageFlippedForRightToLeftLayoutDirection();
        this.nativeObject = this._flippedImage;
      }
    } else {
      this.nativeObject = this._nativeImage;
    }
  }

  get autoMirrored() {
    return this._autoMirrored;
  }
}

module.exports = Image;
