const ViewEvents = require("../../view/events");

class ButtonEvents extends ViewEvents {
  Press = 'press';
}

ButtonEvents.Android = {
  LongPress: 'longPress'
}

module.exports = ButtonEvents;