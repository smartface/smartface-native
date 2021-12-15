const System = require("../../device/system");
const Data = require("../../global/data");
const ServiceCall = require("../service");
const Network = require("../../device/network");
const TABLE_NAMES = Object.freeze({
    CACHED_REQUESTS: "SF_EXTENSION_UTILS_OFFLINE_ALL_CACHED_REQUESTS",
    PENDING_REQUESTS: "SF_EXTENSION_UTILS_OFFLINE_ALL_PENDING_REQUESTS"
});
var sameReturner = e => e;
var encryptFunction;
var decryptFunction;
var isConfigured;

function copy(e) {
    return JSON.parse(JSON.stringify(e));
}

function guid() {
    var result, i, j;
    result = '';
    for(j=0; j<32; j++) {
      if( j == 8 || j == 12 || j == 16 || j == 20)
        result = result + '-';
      i = Math.floor(Math.random()*16).toString(16).toUpperCase();
      result = result + i;
    }
    return result;
  }

const isOnline = () => {
    return new Promise((resolve, reject) => {
        Network.connectionType === Network.ConnectionType.NONE ? reject() : resolve();
    });
};

class OfflineRequestServiceCall extends ServiceCall {
    constructor(options) {
        if (!isConfigured)
            throw Error("First you need to configure");

        super(options);
        this.offlineRequestHandler = options.offlineRequestHandler;
    }

    request(endpointPath, options) {
        let requestOptions = this.createRequestOptions(endpointPath, options);
        return isOnline()
            .then(() => ServiceCall.request(requestOptions))
            .catch(() => {
                let requestID = guid();
                saveToTable({
                    tableID: TABLE_NAMES.PENDING_REQUESTS,
                    requestID,
                    data: JSON.stringify(requestOptions)
                });
                return Promise.resolve(null);
            });
    }

    /**
     * Perform all pending requests in DB
     * @static
     * @method
     * @returns {Promise} 
     */
    static sendAll() {
        return Promise.resolve().then(() => {
            let allPendingRequests = Data.getStringVariable(TABLE_NAMES.PENDING_REQUESTS);
            allPendingRequests = allPendingRequests ? JSON.parse(allPendingRequests) : [];
            return Promise.all(allPendingRequests
                .map(requestID => {
                    let requestOptions = Data.getStringVariable(requestID);
                    requestOptions = JSON.parse(requestOptions);
                    let requestHandlerPromise = this.offlineRequestHandler ?
                        this.offlineRequestHandler(copy(requestOptions)) :
                        Promise.resolve(requestOptions);
                    return requestHandlerPromise.then(o => ServiceCall.request(o));
                }));
        });
    }

    static clearJobs() {
        return new Promise(resolve => {
            let allPendingRequests = Data.getStringVariable(TABLE_NAMES.PENDING_REQUESTS);
            allPendingRequests = allPendingRequests ? JSON.parse(allPendingRequests) : [];
            allPendingRequests.forEach(requestID => {
                Data.removeVariable(requestID);
            });
        });
    }
}

class OfflineResponseServiceCall extends ServiceCall {
    constructor(options) {
        if (!isConfigured)
            throw Error("First you need to configure");

        super(options);
        this.requestCleaner = options.requestCleaner;
    }

    request(endpointPath, options) {
        const requestOptions = this.createRequestOptions(endpointPath, options);
        let cleanedRequestOptions = this.requestCleaner ? this.requestCleaner(copy(requestOptions)) : requestOptions;
        cleanedRequestOptions = JSON.stringify(cleanedRequestOptions);

        let offlineRequest = () => {
            return new Promise((resolve, reject) => {
                let cachedResponse = Data.getStringVariable(cleanedRequestOptions);
                cachedResponse ? resolve(JSON.parse(cachedResponse)) : reject("No records found");
            });
        };

        let onlineRequest = () => {
            return ServiceCall.request(requestOptions)
                .then(response => {
                    saveToTable({
                        tableID: TABLE_NAMES.CACHED_REQUESTS,
                        requestID: cleanedRequestOptions,
                        data: JSON.stringify(response)
                    });
                    return response;
                });
        };

        return new Promise((resolve, reject) => {
            return offlineRequest()
                .then(e => {
                    onlineRequest(); // Make sure cache is uptodate
                    resolve(e);
                })
                .catch(e => {
                    onlineRequest()
                        .then(resolve)
                        .catch(reject);
                });
        });
    }
}

const errorHandler = err => {
    if (err instanceof Error)
        return {
            title: err.type || global.lang.applicationError,
            message: System.OS === "Android" ? err.stack : (err.message + "\n\n*" + err.stack)
        };
    else
        return err;
};

function init(options = {}) {
    isConfigured = true;

    encryptFunction = options.encryptionFunction || sameReturner;
    decryptFunction = options.decryptionFunction || sameReturner;

    var notifier = new Network.createNotifier();
    var networkListener = connectionType => {
        isOnline()
            .then(() => OfflineRequestServiceCall.sendAll())
            .then(() => OfflineRequestServiceCall.clearJobs());
    };
    networkListener();
    notifier.subscribe(networkListener);
}

function clearOfflineDatabase() {
    return new Promise((resolve, reject) => {
        try {
            let allCachedRequests = Data.getStringVariable(TABLE_NAMES.CACHED_REQUESTS);
            let allPendingRequests = Data.getStringVariable(TABLE_NAMES.PENDING_REQUESTS);
            allCachedRequests = allCachedRequests ? JSON.parse(allCachedRequests) : [];
            allPendingRequests = allPendingRequests ? JSON.parse(allPendingRequests) : [];
            allCachedRequests.forEach(r => Data.removeVariable(r));
            allPendingRequests.forEach(r => Data.removeVariable(r));
            resolve();
        }
        catch (e) {
            reject(e);
        }
    });
}

function saveToTable({ tableID, requestID, data }) {
    return new Promise((resolve, reject) => {
        try {
            let allRequests = Data.getStringVariable(tableID);
            allRequests = allRequests ? JSON.parse(allRequests) : [];
            allRequests.push(requestID);
            allRequests = JSON.stringify(allRequests);
            Data.setStringVariable(tableID, allRequests);
            Data.setStringVariable(requestID, data);
            resolve();
            console.info("[SC_OFFLINE] Successfully saved ", requestID, data);
        }
        catch (ex) {
            console.error("[SC_OFFLINE] Failed to save ", requestID, data, errorHandler(ex));
            reject(ex);
        }
    });
}

Object.assign(exports, {
    init,
    OfflineRequestServiceCall,
    OfflineResponseServiceCall,
    clearOfflineDatabase,
    closeOfflineDatabase: sameReturner
});
