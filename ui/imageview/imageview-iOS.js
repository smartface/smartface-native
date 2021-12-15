const View = require('../view');
const Image = require("../../ui/image");
const ImageCacheType = require('../../ui/imagecachetype');
const Color = require("../../ui/color");
const ViewGroup = require('../viewgroup');

const FillType = {
    NORMAL: 0,
    STRETCH: 1,
    ASPECTFIT: 2
};

FillType.ios = {
    REDRAW: 3,
    MIDCENTER: 4,
    TOPCENTER: 5,
    BOTTOMCENTER: 6,
    MIDLEFT: 7,
    MIDRIGHT: 8,
    TOPLEFT: 9,
    TOPRIGHT: 10,
    BOTTOMLEFT: 11,
    BOTTOMRIGHT: 12
};

ImageView.Events = { ...ViewGroup.Events };
ImageView.prototype = Object.create(View.prototype);
function ImageView(params) {
	var self = this;

	if (!self.nativeObject) {
		self.nativeObject = new __SF_UIImageView();
	}

	View.call(this);
	
	if (__SF_UIView.viewAppearanceSemanticContentAttribute() == 3) {
		self.nativeObject.setValueForKey(3, "semanticContentAttribute");
	}
	else if (__SF_UIView.viewAppearanceSemanticContentAttribute() == 4) {
		self.nativeObject.setValueForKey(4, "semanticContentAttribute");
	}
	
	//defaults
	self.nativeObject.contentMode = FillType.NORMAL;
	self.touchEnabled = true;

	Object.defineProperty(self, 'image', {
		get: function() {
			return self.nativeObject.image ? Image.createFromImage(self.nativeObject.image) : undefined;
		},
		set: function(value) {
			_imageTemplate = undefined;

			if (typeof value === "string") {
				var image = Image.createFromFile(value);
				if (_isSetTintColor) {
					image.nativeObject = image.nativeObject.imageWithRenderingMode(2);
					_imageTemplate = image.nativeObject;
				}
				self.nativeObject.loadImage(image.nativeObject);
			}
			else {
				if (value) {
					if (_isSetTintColor) {
						value.nativeObject = value.nativeObject.imageWithRenderingMode(2);
						_imageTemplate = value.nativeObject;
					}
					self.nativeObject.loadImage(value.nativeObject);
				}
				else {
					self.nativeObject.loadImage(undefined);
				}
			}
		},
		enumerable: true
	});

	self.loadFromFile = function(params) {
		if (params.file) {
			var file = params.file;
			var filePath = file.nativeObject.getActualPath();
			var image = Image.createFromFile(filePath);

			var fade = true;
			if (typeof params.fade === "boolean") {
				fade = params.fade;
			}

			if (fade) {
				self.nativeObject.loadImage(image.nativeObject);
				var alpha = self.nativeObject.alpha;
				self.nativeObject.alpha = 0;
				__SF_UIView.animation(0.3, 0, function() {
					self.nativeObject.alpha = alpha;
				}.bind(this), function() {});
			}
			else {
				self.nativeObject.loadImage(image.nativeObject);
			}
		}
	}

	self.loadFromUrl = function(url, placeholder, fade, headers = {}) {
		if (typeof url === "string") { // Deprecated: Use loadFromUrl(object);
			self.nativeObject.loadFromURL(__SF_NSURL.URLWithString(url), placeholder ? placeholder.nativeObject : undefined, headers, undefined, function(innerFade, image, error, cache, url) {
				if (!error) {
					if (cache == ImageCacheType.NONE && innerFade !== false) {
						var alpha = this.nativeObject.alpha;
						this.nativeObject.alpha = 0;
						__SF_UIView.animation(0.3, 0, function() {
							this.nativeObject.alpha = alpha;
						}.bind(this), function() {});
					}
				}
			}.bind(self, fade));
		}
		else if (typeof url === "object") {
			var options;
			url.ios && url.ios.isRefreshCached && (options = SDWebImageOptions.SDWebImageRefreshCached); // Deprecated: Use useHTTPCacheControl option.
			url.useHTTPCacheControl && (options = SDWebImageOptions.SDWebImageRefreshCached);
            
            const headers = url.headers
			self.nativeObject.loadFromURL(
				__SF_NSURL.URLWithString(url.url),
                url.placeholder ? url.placeholder.nativeObject : undefined,
                headers,
				options ? options : undefined,
				function(onSuccess, onError, innerFade, image, error, cache, url) {
					if (!error) {
						if (cache == ImageCacheType.NONE && innerFade !== false) {
							var alpha = this.nativeObject.alpha;
							this.nativeObject.alpha = 0;
							__SF_UIView.animation(0.3, 0, function() {
								this.nativeObject.alpha = alpha;
							}.bind(this), function() {});
						}
						if (typeof onSuccess === "function") {
							__SF_Dispatch.mainAsync(function(innerIndex) {
								onSuccess();
							});
						}
					}
					else {
						if (typeof onError === "function") {
							__SF_Dispatch.mainAsync(function(innerIndex) {
								onError();
							});
						}
					}
				}.bind(self, url.onSuccess, url.onError ? url.onError : url.onFailure, url.fade)
			); //onFailure COR-1817
		}
	}

	self.fetchFromUrl = function(object) {
		var options = SDWebImageOptions.SDWebImageAvoidAutoSetImage;
		object.ios && object.ios.isRefreshCached &&  (options = options | SDWebImageOptions.SDWebImageRefreshCached); // Deprecated: Use useHTTPCacheControl option.
		object.useHTTPCacheControl &&  (options = options | SDWebImageOptions.SDWebImageRefreshCached);
        
        const headers = object.headers || {};
		self.nativeObject.loadFromURL(__SF_NSURL.URLWithString(object.url), object.placeholder ? object.placeholder.nativeObject : undefined, headers, options ? options : undefined, function(onSuccess, onError, image, error, cache, url) {
			if (!error) {
				if (typeof onSuccess === "function") {
					__SF_Dispatch.mainAsync(function(innerIndex) {
						onSuccess(Image.createFromImage(image), cache);
					});
				}
			}
			else {
				if (typeof onError === "function") {
					__SF_Dispatch.mainAsync(function(innerIndex) {
						onError();
					});
				}
			}
		}.bind(self, object.onSuccess, object.onError ? object.onError : object.onFailure)); //onFailure COR-1817
	};

	Object.defineProperty(self, 'imageFillType', {
		get: function() {
			return self.nativeObject.contentMode;
		},
		set: function(value) {
			self.nativeObject.contentMode = value;
		},
		enumerable: true,
		configurable: true
	});

	var _imageTemplate;
	var _isSetTintColor = false;
	Object.defineProperty(self, 'tintColor', {
		get: function() {
			return new Color({
				color: self.nativeObject.tintColor
			});
		},
		set: function(value) {
			if (self.nativeObject.image) {
				if (_imageTemplate) {
					self.nativeObject.image = _imageTemplate;
				}
				else {
					_imageTemplate = self.nativeObject.image.imageWithRenderingMode(2);
					self.nativeObject.image = _imageTemplate;
				}
			}
			_isSetTintColor = true;
			self.nativeObject.tintColor = value.nativeObject;
		},
		enumerable: true
	});

    EventEmitterCreator(this, {});

	if (params) {
		for (var param in params) {
			this[param] = params[param];
		}
	}
}

Object.defineProperty(ImageView, "FillType", {
    value: {},
    enumerable: true
});

Object.defineProperties(ImageView.FillType, {
    'NORMAL': {
        value: 4,
        enumerable: true
    },
    'STRETCH': {
        value: 0,
        enumerable: true
    },
    'ASPECTFIT': {
        value: 1,
        enumerable: true
    },
    'ASPECTFILL': {
        value: 2,
        enumerable: true
    },
    'ios': {
        value: {},
        enumerable: true
    },
    'android': {
        value: {},
        enumerable: true
    }
});

Object.defineProperties(ImageView.FillType.ios, {
    'MIDCENTER': {
        value: 4,
        enumerable: true
    },
    'TOPCENTER': {
        value: 5,
        enumerable: true
    },
    'BOTTOMCENTER': {
        value: 6,
        enumerable: true
    },
    'MIDLEFT': {
        value: 7,
        enumerable: true
    },
    'MIDRIGHT': {
        value: 8,
        enumerable: true
    },
    'TOPLEFT': {
        value: 9,
        enumerable: true
    },
    'TOPRIGHT': {
        value: 10,
        enumerable: true
    },
    'BOTTOMLEFT': {
        value: 11,
        enumerable: true
    },
    'BOTTOMRIGHT': {
        value: 12,
        enumerable: true
    }
});

const SDWebImageOptions = {
    /**
     * By default, when a URL fail to be downloaded, the URL is blacklisted so the library won't keep trying.
     * This flag disable this blacklisting.
     */
    SDWebImageRetryFailed: 1 << 0,

    /**
     * By default, image downloads are started during UI interactions, this flags disable this feature,
     * leading to delayed download on UIScrollView deceleration for instance.
     */
    SDWebImageLowPriority: 1 << 1,

    /**
     * This flag disables on-disk caching after the download finished, only cache in memory
     */
    SDWebImageCacheMemoryOnly: 1 << 2,

    /**
     * This flag enables progressive download, the image is displayed progressively during download as a browser would do.
     * By default, the image is only displayed once completely downloaded.
     */
    SDWebImageProgressiveDownload: 1 << 3,

    /**
     * Even if the image is cached, respect the HTTP response cache control, and refresh the image from remote location if needed.
     * The disk caching will be handled by NSURLCache instead of SDWebImage leading to slight performance degradation.
     * This option helps deal with images changing behind the same request URL, e.g. Facebook graph api profile pics.
     * If a cached image is refreshed, the completion block is called once with the cached image and again with the final image.
     *
     * Use this flag only if you can't make your URLs static with embedded cache busting parameter.
     */
    SDWebImageRefreshCached: 1 << 4,

    /**
     * In iOS 4+, continue the download of the image if the app goes to background. This is achieved by asking the system for
     * extra time in background to let the request finish. If the background task expires the operation will be cancelled.
     */
    SDWebImageContinueInBackground: 1 << 5,

    /**
     * Handles cookies stored in NSHTTPCookieStore by setting
     * NSMutableURLRequest.HTTPShouldHandleCookies = YES;
     */
    SDWebImageHandleCookies: 1 << 6,

    /**
     * Enable to allow untrusted SSL certificates.
     * Useful for testing purposes. Use with caution in production.
     */
    SDWebImageAllowInvalidSSLCertificates: 1 << 7,

    /**
     * By default, images are loaded in the order in which they were queued. This flag moves them to
     * the front of the queue.
     */
    SDWebImageHighPriority: 1 << 8,

    /**
     * By default, placeholder images are loaded while the image is loading. This flag will delay the loading
     * of the placeholder image until after the image has finished loading.
     */
    SDWebImageDelayPlaceholder: 1 << 9,

    /**
     * We usually don't call transformDownloadedImage delegate method on animated images,
     * as most transformation code would mangle it.
     * Use this flag to transform them anyway.
     */
    SDWebImageTransformAnimatedImage: 1 << 10,

    /**
     * By default, image is added to the imageView after download. But in some cases, we want to
     * have the hand before setting the image (apply a filter or add it with cross-fade animation for instance)
     * Use this flag if you want to manually set the image in the completion when success
     */
    SDWebImageAvoidAutoSetImage: 1 << 11,

    /**
     * By default, images are decoded respecting their original size. On iOS, this flag will scale down the
     * images to a size compatible with the constrained memory of devices.
     * If `SDWebImageProgressiveDownload` flag is set the scale down is deactivated.
     */
    SDWebImageScaleDownLargeImages: 1 << 12,

    /**
     * By default, we do not query disk data when the image is cached in memory. This mask can force to query disk data at the same time.
     * This flag is recommend to be used with `SDWebImageQueryDiskSync` to ensure the image is loaded in the same runloop.
     */
    SDWebImageQueryDataWhenInMemory: 1 << 13,

    /**
     * By default, we query the memory cache synchronously, disk cache asynchronously. This mask can force to query disk cache synchronously to ensure that image is loaded in the same runloop.
     * This flag can avoid flashing during cell reuse if you disable memory cache or in some other cases.
     */
    SDWebImageQueryDiskSync: 1 << 14,

    /**
     * By default, when the cache missed, the image is download from the network. This flag can prevent network to load from cache only.
     */
    SDWebImageFromCacheOnly: 1 << 15,
    /**
     * By default, when you use `SDWebImageTransition` to do some view transition after the image load finished, this transition is only applied for image download from the network. This mask can force to apply view transition for memory and disk cache as well.
     */
    SDWebImageForceTransition: 1 << 16
};

module.exports = ImageView;