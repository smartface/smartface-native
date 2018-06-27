if (Device.deviceOS === "iOS") {
  module.exports["CollectionView"] = require('./collectionview-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports["CollectionView"] = require('./collectionview-Android');
}

module.exports["layout"] = require('./layout');