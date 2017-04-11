const Network = {};

Network.ConnectionType = {};

Network.ConnectionType.None   = 0;
Network.ConnectionType.Mobile = 1;
Network.ConnectionType.WIFI   = 2;

Object.defineProperty(Network, 'carrier', {
  get: function() {
      var info = new __SF_CTTelephonyNetworkInfo();
      return info.subscriberCellularProvider.carrierName;
     },
     enumerable: true
});

Object.defineProperty(Network, 'connectionType', {
  get: function() {
      return __SF_UIDevice.currentReachabilityStatus();
     },
     enumerable: true
});

Object.defineProperty(Network, 'connectionIP', {
  get: function() {
      return __SF_UIDevice.getIFAddresses()[0];
     },
     enumerable: true
});



module.exports = Network;