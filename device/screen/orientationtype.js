
const OrientationType = {};
OrientationType.ios = {};

Object.defineProperty(OrientationType, 'PORTRAIT', {
  value: "portrait",
  enumerable: true 
});

Object.defineProperty(OrientationType, 'UPSIDEDOWN', {
  value: "upsidedown",
  enumerable: true
});

Object.defineProperty(OrientationType, 'LANDSCAPELEFT', {
  value: "landspaceleft",
  enumerable: true
});

Object.defineProperty(OrientationType, 'LANDSCAPERIGHT', {
  value: "landspaceright",
  enumerable: true
});

Object.defineProperty(OrientationType.ios, 'FACEUP', {
  value: "faceup",
  writable: false
});

Object.defineProperty(OrientationType.ios, 'FACEDOWN', {
  value: "facedown",
  writable: false
});

module.exports = OrientationType;
