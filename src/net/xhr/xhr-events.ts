export const XHREvents = {
  abort: 'abort',
  error: 'error',
  load: 'load',
  loadend: 'loadend',
  loadstart: 'loadstart',
  progress: 'progress',
  readystatechange: 'readystatechange',
  timeout: 'timeout'
} as const;

export type XHREvents = ExtractValues<typeof XHREvents>;
