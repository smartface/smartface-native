declare function FragmentTransaction(): void;
declare namespace FragmentTransaction {
  export const pageCount: number;
  export namespace AnimationType {
    export const RIGHTTOLEFT: string;
    export const LEFTTORIGHT: string;
  }
}

export = FragmentTransaction;
