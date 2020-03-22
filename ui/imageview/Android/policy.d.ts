declare enum ImageViewNetworkPolicy {
    NO_CACHE,
    NO_STORE,
    OFFLINE
}
declare enum MemoryPolicy {
    NO_CACHE = 1,
    NO_STORE = 2
}
declare enum NetworkPolicy {
    NO_CACHE = 1,
    NO_STORE = 2,
    OFFLINE = 3
}
declare enum ImageViewMemoryPolicy {
    NO_CACHE,
    NO_STORE,
}

declare const _export: {
    ImageViewNetworkPolicy: ImageViewNetworkPolicy,
    MemoryPolicy: MemoryPolicy,
    ImageViewMemoryPolicy: ImageViewMemoryPolicy,
    NetworkPolicy: NetworkPolicy
}

export = _export;