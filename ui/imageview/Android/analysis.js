const ImageView = {};
ImageView.Android = {};
/** 
 * @enum UI.ImageView.Android.NetworkPolicy 
 * @since 4.0.8
 * 
 * Designates the policy to use for network requests.
 * 
 *     @example
 *     myImageView.loadFromUrl({
 *         url: "IMAGEURL",
 *         android: { networkPolicy: ImageView.Android.NetworkPolicy.NO_CACHE }
 *     });
 * 
 */
ImageView.Android.NetworkPolicy = {};


/**
 * Skips checking the disk cache and forces loading through the network.
 *
 * @property NO_CACHE
 * @static
 * @readonly
 * @since 4.0.8
 */
ImageView.Android.NetworkPolicy.NO_CACHE;

/**
 * Skips storing the result into the disk cache.
 *
 * @property NO_STORE
 * @static
 * @readonly
 * @since 4.0.8
 */
ImageView.Android.NetworkPolicy.NO_STORE;


/**
 * Forces the request through the disk cache only, skipping network.
 *
 * @property OFFLINE
 * @static
 * @readonly
 * @since 4.0.8
 */
ImageView.Android.NetworkPolicy.OFFLINE;

/** 
 * @enum UI.ImageView.Android.MemoryPolicy 
 * @since 4.0.9
 * 
 * Designates the policy to use for memory cache.
 * 
 *     @example
 *     myImageView.loadFromUrl({
 *         url: "IMAGEURL",
 *         android: { memoryPolicy: ImageView.Android.MemoryPolicy.NO_CACHE }
 *     });
 * 
 */
ImageView.Android.MemoryPolicy = {};


/**
 * Skips memory cache lookup when processing a request.
 *
 * @property NO_CACHE
 * @static
 * @readonly
 * @since 4.0.8
 */
ImageView.Android.MemoryPolicy.NO_CACHE;

/**
 * Skips storing the final result into memory cache. Useful for one-off requests to avoid evicting other images from the cache..
 *
 * @property NO_STORE
 * @static
 * @readonly
 * @since 4.0.8
 */
ImageView.Android.MemoryPolicy.NO_STORE;

module.exports = ImageView;