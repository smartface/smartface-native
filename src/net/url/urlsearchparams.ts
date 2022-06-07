// from this MIT-licensed repo: https://github.com/facebook/react-native

export default class URLSearchParams {
  _searchParams: string[][] = [];

  constructor(params?: Record<string, any>) {
    if (typeof params === 'object') {
      Object.keys(params).forEach((key) => this.append(key, params[key]));
    }
  }

  append(key: string, value: string) {
    this._searchParams.push([key, value]);
  }

  delete(name: string) {
    throw new Error('URLSearchParams.delete is not implemented');
  }

  get(name: string) {
    throw new Error('URLSearchParams.get is not implemented');
  }

  getAll(name: string) {
    throw new Error('URLSearchParams.getAll is not implemented');
  }

  has(name: string) {
    throw new Error('URLSearchParams.has is not implemented');
  }

  set(name: string, value: string) {
    throw new Error('URLSearchParams.set is not implemented');
  }

  sort() {
    throw new Error('URLSearchParams.sort is not implemented');
  }

  // $FlowFixMe[unsupported-syntax]
  [Symbol.iterator]() {
    return this._searchParams[Symbol.iterator]();
  }

  toString(): string {
    if (this._searchParams.length === 0) {
      return '';
    }
    const last = this._searchParams.length - 1;
    return this._searchParams.reduce((acc, curr, index) => {
      return acc + encodeURIComponent(curr[0]) + '=' + encodeURIComponent(curr[1]) + (index === last ? '' : '&');
    }, '');
  }
}
