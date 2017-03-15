const Network = {};

Network.ConnectionType = {};

Network.ConnectionType.None   = 0;
Network.ConnectionType.Mobile = 1;
Network.ConnectionType.WIFI   = 2;

Object.defineProperty(Network, 'carrier', {
  get: function() {
      var info = new CTTelephonyNetworkInfo();
      return info.subscriberCellularProvider.carrierName;
     },
     enumerable: true
});

Object.defineProperty(Network, 'connectionType', {
  get: function() {
      return UIDevice.currentReachabilityStatus();
     },
     enumerable: true
});

Object.defineProperty(Network, 'connectionIP', {
  get: function() {
      return UIDevice.getIFAddresses()[0];
     },
     enumerable: true
});



module.exports = Network;