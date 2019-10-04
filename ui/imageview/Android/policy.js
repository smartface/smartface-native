const NativeNetworkPolicy = requireClass("com.squareup.picasso.NetworkPolicy");
const NativeMemoryPolicy = requireClass("com.squareup.picasso.MemoryPolicy");

const NetworkPolicy = {};
NetworkPolicy.NO_CACHE = 1;
NetworkPolicy.NO_STORE = 2;
NetworkPolicy.OFFLINE = 3;
Object.freeze(NetworkPolicy);

const ImageViewNetworkPolicy = {};
ImageViewNetworkPolicy[NetworkPolicy.NO_CACHE] = NativeNetworkPolicy.NO_CACHE;
ImageViewNetworkPolicy[NetworkPolicy.NO_STORE] = NativeNetworkPolicy.NO_STORE;
ImageViewNetworkPolicy[NetworkPolicy.OFFLINE] = NativeNetworkPolicy.OFFLINE;

const MemoryPolicy = {};
MemoryPolicy.NO_CACHE = 1;
MemoryPolicy.NO_STORE = 2;

const ImageViewMemoryPolicy = {};
ImageViewMemoryPolicy[MemoryPolicy.NO_CACHE] = NativeMemoryPolicy.NO_CACHE;
ImageViewMemoryPolicy[MemoryPolicy.NO_STORE] = NativeMemoryPolicy.NO_STORE;
Object.freeze(MemoryPolicy);

module.exports = {
    ImageViewMemoryPolicy,
    MemoryPolicy,
    ImageViewNetworkPolicy,
    NetworkPolicy
};