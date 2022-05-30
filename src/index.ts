// Default modules and global declarations
import XHR from './net/xhr';
import FormData from './net/formdata';
import AlertOverride from './core/alert';
import * as TimerOverride from './core/timers';
import URL from './net/url';
import URLSearchParams from './net/url/urlsearchparams';

global.URL = URL;
global.URLSearchParams = URLSearchParams as any;
global.XMLHttpRequest = XHR as any;
global.FormData = FormData;
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
