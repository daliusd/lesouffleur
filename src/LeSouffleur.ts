import { Component } from './Component';
import { Page } from './types';

export class LeSouffleur {
  constructor(protected page: Page) {}

  getByTestId(dataHook: string) {
    return Component(this.page, [{ waitFor: 'data-hook', value: dataHook }]);
  }

  getByText(text: string) {
    return Component(this.page, [{ waitFor: 'text', value: text }]);
  }

  getByRole(role: string, attributes?: Record<string, string>) {
    return Component(this.page, [
      { waitFor: 'role', value: { role, attributes } },
    ]);
  }
}
