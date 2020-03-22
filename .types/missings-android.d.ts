declare module android {
  export module widget {
    export module TextView {
      export enum BufferType {
        SPANNABLE
      }
    }
    export class TextView {
      constructor(activity: any);
      setGravity(val: number): void;
      setTypeface(font: any): void;
      getTypeface(): any;
      setSingleLine(isSinglLine: boolean): void;
      setText(text: string, type: android.widget.TextView.BufferType): void;
      getText(): string;
      setTextSize(size: number): void;
      setGravity(gravity: number): void;
      getGravity(): number;
      measure(widthSpec: number, heightSpec: number): number;
      getMeasuredHeight(): number;
      getMeasuredWidth(): number;
      setPaddingRelative(
        param1: number,
        param2: number,
        param3: number,
        param4: number
      ): number;
    }
  }

  export namespace view {
    export module View {
      export class MeasureSpec {
        static AT_MOST: number;
        static UNSPECIFIED: number;
        static makeMeasureSpec(param1: any, param2: any): number;
      }
    }
    export class View {
      constructor();
    }
  }
}

declare namespace java {
  export namespace io {
    export class File {
      constructor(path: string);
      public exists(): boolean;
      public isDirectory(): boolean;
      public isFile(): boolean;
      public canWrite(): boolean;
      public mkdirs(): boolean;
      public mkdir(): boolean;
      public createNewFile(): boolean;
      public lastModified(): any;
      public getParent(): any;
      public length(): number;
      public listFiles(): File[];
      public getPath(): string;
      public getName(): string;
      public renameTo(destination: File): string;
    }
  }
}
