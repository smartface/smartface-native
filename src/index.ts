// Default modules and global declarations
import XHR from './net/xhr';
import FormData from './net/formdata';
import AlertOverride from './core/alert';
import * as TimerOverride from './core/timers';
import URL from './net/url';
import URLSearchParams from './net/url/urlsearchparams';
import { AbortController, AbortSignal } from 'abort-controller';

global.URL = URL;
global.URLSearchParams = URLSearchParams as any;
// TODO: abort-controller needs console.assert.
// It has to be implemented in framework-core like other console functions.
global.console.assert = function (param1, param2) {};
global.XMLHttpRequest = XHR as any;
global.FormData = FormData;
global.AbortController = AbortController as any;
global.AbortSignal = AbortSignal as any;
import 'whatwg-fetch';

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
