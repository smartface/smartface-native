import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { MobileOSProps } from '../../core/native-mobile-component';
import Blob from '../../global/blob';
import Invocation from '../../util/iOS/invocation';

import { IWebSocket } from './websocket';
import { WebSocketEvents } from './websocket-events';

enum SRReadyState {
  SR_CONNECTING,
  SR_OPEN,
  SR_CLOSING,
  SR_CLOSED
}
export default class WebSocketIOS<TEvent extends string = WebSocketEvents, TProps extends MobileOSProps = MobileOSProps>
  extends NativeEventEmitterComponent<TEvent | WebSocketEvents, any, TProps>
  implements IWebSocket
{
  private delegateInstance: any;
  private socket: any;
  constructor(params?: TProps) {
    super(params);

    if (!this.nativeObject) {
      let alloc: any;
      const invocationAlloc = __SF_NSInvocation.createClassInvocationWithSelectorInstance('alloc', 'SRWebSocket');
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

      const nsURL = __SF_NSURL.URLWithString(this.url);
      let nsURLRequest = __SF_NSURLRequest.requestWithURL(nsURL);

      if (this.headers) {
        const mutableRequest = Invocation.invokeInstanceMethod(nsURLRequest, 'mutableCopy', [], 'NSObject');
        for (const key in this.headers) {
          const headerField = this.getHeaderKeyValue(key, this.headers[key]);
          Invocation.invokeInstanceMethod(mutableRequest, 'setValue:forHTTPHeaderField:', headerField);
        }

        nsURLRequest = Invocation.invokeInstanceMethod(mutableRequest, 'copy', [], 'NSObject');
      }
      const invocationInit = __SF_NSInvocation.createInvocationWithSelectorInstance('initWithURLRequest:', alloc);
      if (invocationInit) {
        invocationInit.target = alloc;
        invocationInit.setSelectorWithString('initWithURLRequest:');
        invocationInit.retainArguments();
        invocationInit.setNSObjectArgumentAtIndex(nsURLRequest, 2);

        invocationInit.invoke();
        this.socket = invocationInit.getReturnValue();
      }
      this.nativeObject = this.socket;
    }

    this.onOpen?.();
    this.emit('open');

    const WebSocketDelegate = defineClass('WebSocketControllerDelegate : NSObject <SRWebSocketDelegate>', {
      webSocketDidOpen: (webSocket: WebSocketIOS) => {
        this.emit('open');
        this.onOpen?.();
      },
      webSocketDidReceiveMessageWithString: (webSocket: WebSocketIOS, string: string) => {
        const params = {
          string
        };
        this.onMessage?.(params);
        this.emit('message', params);
      },
      webSocketDidReceiveMessageWithData: (webSocket: WebSocketIOS, data: any) => {
        const params = {
          blob: new Blob(data)
        };
        this.onMessage?.(params);
        this.emit('message', params);
      },
      webSocketDidFailWithError: (webSocket: WebSocketIOS, error) => {
        const params = {
          code: error.code,
          message: error.localizedDescription
        };
        this.onFailure?.(params);
        this.emit('failure', params);
      },
      webSocketDidCloseWithCodeReasonWasClean: (webSocket: WebSocketIOS, code: number, reason?: number, wasClean?: boolean) => {
        this.onClose?.({
          code: code,
          reason: String(reason || 0)
        });
      }
    });

    this.delegateInstance = WebSocketDelegate.new();

    const invocationDelegate = __SF_NSInvocation.createInvocationWithSelectorInstance('setDelegate:', this.socket);
    if (invocationDelegate) {
      invocationDelegate.target = this.socket;
      invocationDelegate.setSelectorWithString('setDelegate:');
      invocationDelegate.retainArguments();
      invocationDelegate.setNSObjectArgumentAtIndex(this.delegateInstance, 2);

      invocationDelegate.invoke();
    }
  }
  headers: Record<string, string>;
  onMessage: (e: { string?: string | undefined; blob?: Blob | undefined }) => void;
  onClose: (e: { code: number; reason: string }) => void;
  onFailure: (e: { code: number; message: string }) => void;

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
    let readyState;
    const invocationReadyState = __SF_NSInvocation.createInvocationWithSelectorInstance('readyState', this.nativeObject);
    if (invocationReadyState) {
      invocationReadyState.target = this.nativeObject;
      invocationReadyState.setSelectorWithString('readyState');
      invocationReadyState.retainArguments();

      invocationReadyState.invoke();
      readyState = invocationReadyState.getNSIntegerReturnValue();
    }

    if (params && params.code) {
      if (readyState === SRReadyState.SR_CONNECTING) {
        const invocationDelegate = __SF_NSInvocation.createInvocationWithSelectorInstance('setDelegate:', this.socket);
        if (invocationDelegate) {
          invocationDelegate.target = this.socket;
          invocationDelegate.setSelectorWithString('setDelegate:');
          invocationDelegate.retainArguments();
          invocationDelegate.setNSObjectArgumentAtIndex(undefined, 2);

          invocationDelegate.invoke();
        }
        this.onClose?.({
          code: params.code,
          reason: params.reason || '0'
        });
      } else {
        const invocationcloseWithCode = __SF_NSInvocation.createInvocationWithSelectorInstance('closeWithCode:reason:', this.nativeObject);
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
    let error = true;
    if (params?.data instanceof Blob) {
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
