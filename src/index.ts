// Default modules and global declarations
import XHR from './net/xhr';
import AlertOverride from './core/alert';
import * as TimerOverride from './core/timers';

global.XMLHttpRequest = XHR;
global.process = global.process || {
  env: {
    NODE_ENV: 'production'
  }
};
global.alert = AlertOverride;

global.setTimeout = TimerOverride.setTimeout as any;
global.setInterval = TimerOverride.setInterval as any;
global.clearInterval = TimerOverride.clearTimer as any;
global.clearTimeout = TimerOverride.clearTimer as any;
