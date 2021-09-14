var ViewEvents = (function () {
  function ViewEvents() {
  }
  ViewEvents.Touch = 'touch';
  ViewEvents.TouchCancelled = 'touchCancelled';
  ViewEvents.TouchEnded = 'touchEnded';
  ViewEvents.TouchMoved = 'touchMoved';
  return ViewEvents;
}());

module.exports = ViewEvents;