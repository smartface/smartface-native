import { eventCallbacksAssign } from '../../core/eventemitter/eventCallbacksAssign';
import Blob from '../../global/blob';
import { Invocation } from '../../util';

// import { EventEmitterCreator } from '../../core/eventemitter/';
import { IWebSocket, WebSocketBase } from './websocket';
import { WebSocketEvents } from './websocket-events';

enum SRReadyState {
  SR_CONNECTING,
  SR_OPEN,
  SR_CLOSING,
  SR_CLOSED
}

const Events = {
  ...WebSocketEvents
};

export default class WebSocketAndroid extends WebSocketBase {
  delegateInstance: any;
  constructor(params?: Partial<IWebSocket>) {
    super(params);

    if (!this.nativeObject) {
      var alloc;
      var invocationAlloc = __SF_NSInvocation.createClassInvocationWithSelectorInstance('alloc', 'SRWebSocket');
      if (invocationAlloc) {
        invocationAlloc.setClassTargetFromString('SRWebSocket');
        invocationAlloc.setSelectorWithString('alloc');
        invocationAlloc.retainArguments();

        invocationAlloc.invoke();
        alloc = invocationAlloc.getReturnValue();
      }

      if (!this.url) {
        throw new Error('invalid arguments');
      }

      let nsURL = __SF_NSURL.URLWithString(this.url);
      let nsURLRequest = __SF_NSURLRequest.requestWithURL(nsURL);

      if (this.headers) {
        const Invocation = require('../../util').Invocation;
        const mutableRequest = Invocation.invokeInstanceMethod(nsURLRequest, 'mutableCopy', [], 'NSObject');
        for (const key in this.headers) {
          const headerField = this.getHeaderKeyValue(key, this.headers[key]);
          Invocation.invokeInstanceMethod(mutableRequest, 'setValue:forHTTPHeaderField:', headerField);
        }

        nsURLRequest = Invocation.invokeInstanceMethod(mutableRequest, 'copy', [], 'NSObject');
      }

      let socket: any;
      var invocationInit = __SF_NSInvocation.createInvocationWithSelectorInstance('initWithURLRequest:', alloc);
      if (invocationInit) {
        invocationInit.target = alloc;
        invocationInit.setSelectorWithString('initWithURLRequest:');
        invocationInit.retainArguments();
        invocationInit.setNSObjectArgumentAtIndex(nsURLRequest, 2);

        invocationInit.invoke();
        socket = invocationInit.getReturnValue();
      }
      this.nativeObject = socket;
    }

    this.onOpen();

    const EventFunctions = {
      [Events.Close]: (e) => {
        this.emitter.emit(Events.Close, e);
      },
      [Events.Failure]: (e) => {
        this.emitter.emit(Events.Failure, e);
      },
      [Events.Message]: (e) => {
        this.emitter.emit(Events.Message, e);
      },
      [Events.Open]: (e) => {
        this.emitter.emit(Events.Open, e);
      }
    };
    eventCallbacksAssign(this, EventFunctions);

    var WebSocketDelegate = SF.defineClass('WebSocketControllerDelegate : NSObject <SRWebSocketDelegate>', {
      webSocketDidOpen: (webSocket) => {
        this.onOpen?.();
      },
      webSocketDidReceiveMessageWithString: (webSocket, string) => {
        this.onMessage?.({
          string: string
        });
      },
      webSocketDidReceiveMessageWithData: (webSocket, data) => {
        const blob = new Blob(data);
        this.onMessage?.({
          blob: blob
        });
      },
      webSocketDidFailWithError: (webSocket, error) => {
        this.onFailure?.({
          code: error.code,
          message: error.localizedDescription
        });
      },
      webSocketDidCloseWithCodeReasonWasClean: function (webSocket, code, reason, wasClean) {
        const tempReason = reason !== 'undefined' ? reason : undefined;
        this.onClose?.({
          code: code,
          reason: tempReason
        });
      }
    });

    this.delegateInstance = WebSocketDelegate.new();

    var invocationDelegate = __SF_NSInvocation.createInvocationWithSelectorInstance('setDelegate:', socket);
    if (invocationDelegate) {
      invocationDelegate.target = socket;
      invocationDelegate.setSelectorWithString('setDelegate:');
      invocationDelegate.retainArguments();
      invocationDelegate.setNSObjectArgumentAtIndex(this.delegateInstance, 2);

      invocationDelegate.invoke();
    }
  }

  get url(): string {
    let url: any;
    const invocationUrl = __SF_NSInvocation.createInvocationWithSelectorInstance('url', this.nativeObject);
    if (invocationUrl) {
      invocationUrl.target = this.nativeObject;
      invocationUrl.setSelectorWithString('url');
      invocationUrl.retainArguments();

      invocationUrl.invoke();
      url = invocationUrl.getReturnValue();
    }
    return url ? url.absoluteString : undefined;
  }

  onOpen(): void {
    let readyState;
    const invocationReadyState = __SF_NSInvocation.createInvocationWithSelectorInstance('readyState', this.nativeObject);
    if (invocationReadyState) {
      invocationReadyState.target = this.nativeObject;
      invocationReadyState.setSelectorWithString('readyState');
      invocationReadyState.retainArguments();

      invocationReadyState.invoke();
      readyState = invocationReadyState.getNSIntegerReturnValue();
    }

    if (readyState !== SRReadyState.SR_CONNECTING) {
      throw new Error('Cannot call open more than once.');
    }

    const invocationOpen = __SF_NSInvocation.createInvocationWithSelectorInstance('open', this.nativeObject);
    if (invocationOpen) {
      invocationOpen.target = this.nativeObject;
      invocationOpen.setSelectorWithString('open');
      invocationOpen.retainArguments();

      invocationOpen.invoke();
    }
  }

  close(params: { code: number; reason?: string }): void {
    var readyState;
    var invocationReadyState = __SF_NSInvocation.createInvocationWithSelectorInstance('readyState', this.nativeObject);
    if (invocationReadyState) {
      invocationReadyState.target = this.nativeObject;
      invocationReadyState.setSelectorWithString('readyState');
      invocationReadyState.retainArguments();

      invocationReadyState.invoke();
      readyState = invocationReadyState.getNSIntegerReturnValue();
    }

    if (params && params.code) {
      if (readyState === SRReadyState.SR_CONNECTING) {
        var invocationDelegate = __SF_NSInvocation.createInvocationWithSelectorInstance('setDelegate:', socket);
        if (invocationDelegate) {
          invocationDelegate.target = socket;
          invocationDelegate.setSelectorWithString('setDelegate:');
          invocationDelegate.retainArguments();
          invocationDelegate.setNSObjectArgumentAtIndex(undefined, 2);

          invocationDelegate.invoke();
        }
        if (typeof this.onClose === 'function') {
          this.onClose({
            code: params.code,
            reason: params.reason
          });
        }
      } else {
        var invocationcloseWithCode = __SF_NSInvocation.createInvocationWithSelectorInstance('closeWithCode:reason:', this.nativeObject);
        if (invocationcloseWithCode) {
          invocationcloseWithCode.target = this.nativeObject;
          invocationcloseWithCode.setSelectorWithString('closeWithCode:reason:');
          invocationcloseWithCode.retainArguments();
          invocationcloseWithCode.setNSIntegerArgumentAtIndex(params.code, 2);
          if (params.reason) {
            invocationcloseWithCode.setNSStringArgumentAtIndex(params.reason, 3);
          } else {
            invocationcloseWithCode.setNSStringArgumentAtIndex(undefined, 3);
          }

          invocationcloseWithCode.invoke();
        }
      }
    } else {
      throw new Error('Code parameter cannot be null');
    }
  }

  send(params: { data: any }): boolean {
    let error;
    if (params && params.data instanceof Blob) {
      const invocationSendData = __SF_NSInvocation.createInvocationWithSelectorInstance('sendData:', this.nativeObject);
      if (invocationSendData) {
        invocationSendData.target = this.nativeObject;
        invocationSendData.setSelectorWithString('sendData:');
        invocationSendData.retainArguments();
        invocationSendData.setNSObjectArgumentAtIndex(params.data.nativeObject, 2);

        invocationSendData.invoke();
        error = invocationSendData.getReturnValue();
      }
    } else {
      const invocationSendString = __SF_NSInvocation.createInvocationWithSelectorInstance('sendString:', this.nativeObject);
      if (invocationSendString) {
        invocationSendString.target = this.nativeObject;
        invocationSendString.setSelectorWithString('sendString:');
        invocationSendString.retainArguments();
        invocationSendString.setNSStringArgumentAtIndex(params.data, 2);

        invocationSendString.invoke();
        error = invocationSendString.getReturnValue();
      }
    }
    return !error;
  }

  getHeaderKeyValue(key: string, value: any) {
    const headerKey = new Invocation.Argument({
      type: 'NSString',
      value: key
    });
    const headerValue = new Invocation.Argument({
      type: 'NSString',
      value: value
    });
    return [headerValue, headerKey];
  }
}
