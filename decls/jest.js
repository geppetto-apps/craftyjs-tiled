// @flow

declare var jest: {
  unmock(path: string): void;
  mock(path: string, fn: () => any): void;
  disableAutomock(): void;
  useRealTimers(): void;
};
