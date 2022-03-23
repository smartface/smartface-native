import { HTTPRequestMethods, IXHR } from ".";

import NativeEventEmitterComponent from "../../core/native-event-emitter-component";
import { MobileOSProps } from "../../core/native-mobile-component";


export const XHREventsEvents = {
    load: 'load',
} as const;

export type XHREventsEvents = ExtractValues<typeof XHREventsEvents>;



export default class XHR<TEvent extends string = XHREventsEvents, TProps extends MobileOSProps = MobileOSProps> extends NativeEventEmitterComponent<TEvent | XHREventsEvents, any, TProps> implements IXHR {
    timeOut: number;

    protected createNativeObject() {
        return new __SF_Http();
    }

    open(method: HTTPRequestMethods, url: string) {
        this.emit("load")

        // throw new Error("Method not implemented.");
    }
    send(body: string) {
        // throw new Error("Method not implemented.");


        

    }

};
