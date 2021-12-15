const Timer = require('../../../global/timer');

const definedTimers = [];

module.exports = exports = {
  setTimeout: global.setTimeout,
  setInterval: global.setInterval,
  clearInterval: global.clearInterval,
  clearTimeout: global.clearTimeout,
};

function setTimeout(fn, duration) {
  const timer = Timer.setTimeout({
    task: fn,
    delay: duration,
  });
  return definedTimers.push(timer) - 1;
}

function setInterval(fn, duration) {
  const timer = Timer.setInterval({
    task: fn,
    delay: duration,
  });
  return definedTimers.push(timer) - 1;
}

function clearTimer(id) {
  const timer = definedTimers[id];
  if (!timer) {
    return;
  }
  Timer.clearTimer(timer);
  definedTimers[id] = null; // Empty timer
}

global.setTimeout = setTimeout;
global.setInterval = setInterval;
global.clearInterval = global.clearTimeout = clearTimer;
