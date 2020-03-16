export = AndroidConfig;
declare function AndroidConfig(): void;
declare namespace AndroidConfig {
    export const isEmulator: boolean;
    export { packageName };
    export const sdkVersion: any;
    export namespace SDK {
        export const SDK_NOUGAT: number;
        export const SDK_MARSHMALLOW: number;
        export const SDK_LOLLIPOP: number;
        export const SDK_KITKAT: number;
    }
    export { SpratAndroidActivity as activity };
    export const activityResources: any;
}
declare const packageName: any;
declare const SpratAndroidActivity: any;
