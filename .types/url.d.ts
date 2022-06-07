declare class _URLSearchParams {
  constructor(params?: Record<string, any>);
  append(key: string, value: string): void;
  toString(): string;
}

declare class _URL {
  constructor(url: string, base?: string | URL);
  get href(): string;
  get searchParams(): URLSearchParams | null;
  toJSON(): string;
  toString(): string;
  validateBaseUrl(url: string): boolean;
}
