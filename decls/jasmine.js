// @flow

declare var describe: (name: string, fn: () => void) => void;
declare var beforeEach: (fn: (done: (err?: any) => void) => void) => void;
declare var afterEach: (fn: (done: (err?: any) => void) => void) => void;
declare var it: (name: string, fn: (done: (err?: any) => void) => void) => void;
declare var expect: <X>(actual: X) => {
  toBe(expected: X): bool;
  toEqual(expected: X): bool;
};

type JasmineType = {
  objectContaining: (object: Object) => any;
  Ajax: {
    install(): void;
    uninstall(): void;
    requests: {
      mostRecent(): {
        response(obj: {
          status: number,
          contentType: string,
          responseText: string,
        }): void;
      }
    }
  }
};

declare var jasmine: JasmineType;
