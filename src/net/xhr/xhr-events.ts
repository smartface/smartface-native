export const XHREvents = {
  /**
   * Fired when a request has been aborted, for example because the program called XMLHttpRequest.abort(). Also available via the onabort event handler property.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort_event
   */
  abort: 'abort',
  /**
   * Fired when the request encountered an error. Also available via the onerror event handler property.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/error_event
   */
  error: 'error',
  /**
   * Fired when an XMLHttpRequest transaction completes successfully. Also available via the onload event handler property.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/load_event
   */
  load: 'load',
  /**
   * Fired when a request has completed, whether successfully (after load) or unsuccessfully (after abort or error). Also available via the onloadend event handler property.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/loadend_event
   */
  loadend: 'loadend',
  /**
   * Fired when a request has started to load data. Also available via the onloadstart event handler property.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/loadstart_event
   */
  loadstart: 'loadstart',
  /**
   * Fired periodically when a request receives more data. Also available via the onprogress event handler property.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/progress_event
   */
  progress: 'progress',
  /**
   * Fired whenever the readyState property changes. Also available via the onreadystatechange event handler property.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readystatechange_event
   */
  readystatechange: 'readystatechange',
  /**
   * Fired when progress is terminated due to preset time expiring. Also available via the ontimeout event handler property.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout_event
   */
  timeout: 'timeout'
} as const;

export type XHREvents = ExtractValues<typeof XHREvents>;
